// SMM Question Rewriter — vanilla JS, proxied HuggingFace-backed rewrite tool
// Renders into a target container. Uses window.SMM_GAPS and window.SMM_REWRITES from smm-data.js.
// The gap labels are course practitioner labels, not a canonical Dervin taxonomy.

(function() {
  'use strict';

  const GAPS_BY_ID = {};
  (window.SMM_GAPS || []).forEach(g => { GAPS_BY_ID[g.id] = g; });

  function classifyGap(text) {
    const t = (text || '').toLowerCase();
    if (/choose|decide|which|pick|option|between|vs\.|or\b/.test(t)) return 'decision';
    if (/can\u2019?t|cannot|blocked|stuck|access|locked|won\u2019?t let/.test(t)) return 'barrier';
    if (/role|supposed to|expected|how do i|new here|onboard/.test(t)) return 'role';
    if (/lost|no idea|where to start|overwhelm|disorient/.test(t)) return 'spinout';
    if (/clear|helpful|useful|inform|recommend|likely|nps|satisfy/.test(t)) return 'washout';
    if (/wrong|off|something|weird|odd/.test(t)) return 'problematic';
    return 'washout';
  }

  function findLocalRewrite(input) {
    const t = (input || '').trim().toLowerCase();
    if (!t) return null;
    const samples = window.SMM_REWRITES || [];
    const match = samples.find(s => {
      const o = s.original.toLowerCase();
      const tokens = o.replace(/[^a-z\s]/g, '').split(/\s+/).filter(w => w.length > 4);
      const hits = tokens.filter(w => t.includes(w)).length;
      return hits >= Math.max(2, Math.floor(tokens.length * 0.4));
    });
    return match || null;
  }

  function buildFallbackRewrite(input) {
    const gapId = classifyGap(input);
    const gap = GAPS_BY_ID[gapId];
    return {
      id: 'synth',
      domain: 'Live rewrite',
      original: input.trim(),
      diagnosis: [
        'Asks for an evaluation rather than situating a moment.',
        'Reads as a possible ' + gap.label.toLowerCase() + '-oriented practitioner gap picture — but the stop is not surfaced in the participant\u2019s own terms, so the data may not resolve cleanly.',
        'Does not invite both helps and hurts.',
      ],
      rewrite: 'Walk me through a specific moment when this came up for you. What were you trying to do, what did you reach for, and what got in the way?',
      gap: gapId,
      why: 'Anchors the question in a specific micro-moment, leaves room for any bridge type the user actually used, and probes for hurts as well as helps. The gap label is a practitioner prompt for analysis, not a substitute for the participant\u2019s own account of the discontinuity.',
      diff: [
        { kind: 'cut', text: input.trim() },
        { kind: 'add', text: 'Walk me through a specific moment when this came up for you.' },
        { kind: 'add', text: 'What were you trying to do, what did you reach for, and what got in the way?' },
      ],
    };
  }

  function sanitizeErrorMessage(err) {
    const msg = String(err && err.message ? err.message : err || 'Unknown error');
    if (/Failed to fetch|NetworkError|Load failed/i.test(msg)) return 'network/CORS/preflight failure';
    if (/Could not parse response/i.test(msg)) return 'model returned non-JSON text';
    if (/No generated text/i.test(msg)) return 'proxy returned no generated text';
    const status = msg.match(/Rewriter API error:\s*(\d{3})/i);
    if (status) return 'proxy returned HTTP ' + status[1];
    return 'proxy/model error';
  }

  // Proxy call via writersroom.fredericlabadie.com
  const PROXY_URL = 'https://writersroom.fredericlabadie.com/api/rewrite';

  function buildSystemPrompt() {
    const gapList = (window.SMM_GAPS || []).map(g => g.label + ': ' + g.desc).join('; ');
    return `You are an expert practitioner using Brenda Dervin's Sense-Making Methodology (SMM). A user will give you a research question (survey, UX interview, A/B test hypothesis, etc). Your job:

Important accuracy constraint: use the gap labels below as this course's practitioner heuristic. They are grounded where possible in Dervin's movement-state / stop framing, but they are not a canonical six-part Dervin taxonomy. Do not claim that Dervin herself published these exact six categories.

1. DIAGNOSE: Give exactly 3 bullet points explaining what is wrong with the question from an SMM perspective. Focus on: what it presupposes, whether it asks about a moment or a generality, whether it leaves room for both helps and hurts.

2. REWRITE: Rewrite the question using SMM neutral questioning principles — anchor a specific moment, leave the gap type open, probe for both bridge and hurt.

3. GAP_LABEL: Suggest which practitioner gap label the rewrite may help surface: ${gapList}. Treat this as a tentative analytic prompt, not as the respondent's answer and not as a canonical taxonomy.

4. WHY: In 1-2 sentences, explain why the rewrite produces more useful data than the original.

5. DIFF: Show what was cut (the original) and what was added (your rewrite, split into 2-3 short prompt sentences).

Respond ONLY with valid JSON, no markdown, no preamble. Schema:
{"diagnosis":["...","...","..."],"rewrite":"...","gap":"decision|barrier|problematic|role|spinout|washout","why":"...","diff":[{"kind":"cut","text":"..."},{"kind":"add","text":"..."},{"kind":"add","text":"..."}]}`;
  }

  async function callProxy(question) {
    const prompt = '<|system|>\n' + buildSystemPrompt() + '\n<|user|>\n' + question + '\n<|assistant|>\n';
    const res = await fetch(PROXY_URL, {
      method: 'POST',
      body: prompt,
    });
    if (!res.ok) {
      let err = '';
      try {
        const payload = await res.json();
        err = payload && payload.error ? payload.error : JSON.stringify(payload);
      } catch {
        err = await res.text();
      }
      throw new Error('Rewriter API error: ' + res.status + ' ' + err);
    }
    const data = await res.json();
    const text = Array.isArray(data) ? data[0].generated_text : data.generated_text || '';
    if (!text) throw new Error('No generated text returned from proxy');
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Could not parse response from model');
    return JSON.parse(jsonMatch[0]);
  }

  // ── DOM Builder ────────────────────────────────

  const EXAMPLES = [
    { label: 'Pricing clarity', text: 'Did you find the pricing information clear?' },
    { label: 'NPS', text: 'How likely are you to recommend us to a friend?' },
    { label: 'Adoption', text: 'Why don\u2019t users adopt the new export feature?' },
    { label: 'Engagement', text: 'Do you have the information you need to do your job?' },
    { label: 'Onboarding', text: 'Was the onboarding helpful?' },
  ];

  function el(tag, cls, attrs) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (attrs) Object.keys(attrs).forEach(k => {
      if (k === 'text') e.textContent = attrs[k];
      else if (k === 'html') e.innerHTML = attrs[k];
      else e.setAttribute(k, attrs[k]);
    });
    return e;
  }

  window.initSMMRewriter = function(containerId) {
    const root = document.getElementById(containerId);
    if (!root) return;

    // ── Input section ──
    const shell = el('div', 'rewriter-shell');
    const inputWrap = el('div');
    inputWrap.style.cssText = 'display:flex;flex-direction:column;gap:8px';
    const label = el('span', 'rewriter-label', { text: '01 — Paste a research question' });
    const textarea = el('textarea', 'rewriter-textarea');
    textarea.placeholder = 'e.g. Did you find the pricing information clear?';
    textarea.rows = 3;

    const controls = el('div', 'rewriter-controls');
    const btnRun = el('button', 'btn-primary-smm', { text: 'Rewrite with SMM' });
    btnRun.disabled = true;
    const btnClear = el('button', 'btn-ghost-smm', { text: 'Clear' });
    const btnCopy = el('button', 'btn-ghost-smm', { text: 'Copy as markdown' });
    btnCopy.style.display = 'none';
    controls.append(btnRun, btnClear, btnCopy);

    const chipWrap = el('div', 'example-chips');
    const chipLabel = el('span', 'rewriter-label', { text: 'or try —' });
    chipLabel.style.fontSize = '10px';
    chipWrap.appendChild(chipLabel);
    EXAMPLES.forEach(ex => {
      const c = el('button', 'chip', { text: ex.label });
      c.onclick = () => { textarea.value = ex.text; textarea.dispatchEvent(new Event('input')); runRewrite(); };
      chipWrap.appendChild(c);
    });

    inputWrap.append(label, textarea, controls, chipWrap);

    // ── Output section ──
    const output = el('div', 'rewriter-output');
    output.id = 'rewriter-output';

    shell.append(inputWrap, output);
    root.appendChild(shell);

    textarea.addEventListener('input', () => { btnRun.disabled = !textarea.value.trim(); });
    textarea.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') runRewrite();
    });
    btnRun.onclick = runRewrite;
    btnClear.onclick = () => {
      textarea.value = '';
      btnRun.disabled = true;
      btnCopy.style.display = 'none';
      output.innerHTML = '';
    };

    let lastResult = null;

    async function runRewrite() {
      const q = textarea.value.trim();
      if (!q) return;
      output.innerHTML = '';
      btnCopy.style.display = 'none';
      btnRun.disabled = true;
      btnRun.textContent = 'ANALYZING…';

      let result;
      try {
        // Try local match first
        const local = findLocalRewrite(q);
        if (local) {
          result = local;
        } else {
          // Call proxy
          const aiResult = await callProxy(q);
          result = {
            original: q,
            diagnosis: aiResult.diagnosis || [],
            rewrite: aiResult.rewrite || '',
            gap: aiResult.gap || 'washout',
            why: aiResult.why || '',
            diff: aiResult.diff || [{ kind: 'cut', text: q }, { kind: 'add', text: aiResult.rewrite }],
          };
        }
      } catch (err) {
        console.error('Rewriter error:', err);
        result = buildFallbackRewrite(q);
        const reason = sanitizeErrorMessage(err);
        const errHint = el('div', 'rewriter-label', { text: 'AI unavailable — showing heuristic rewrite. Reason: ' + reason + '.' });
        errHint.style.cssText = 'color:#7c2424;font-size:10px;margin-bottom:8px';
        output.appendChild(errHint);
      }

      lastResult = result;
      btnRun.textContent = 'REWRITE WITH SMM';
      btnRun.disabled = false;
      btnCopy.style.display = 'inline-block';
      renderResult(result);
    }

    btnCopy.onclick = () => {
      if (!lastResult) return;
      const gap = GAPS_BY_ID[lastResult.gap];
      const md = [
        '# SMM Rewrite', '',
        '**Original**', '> ' + lastResult.original, '',
        '**Diagnosis**', ...lastResult.diagnosis.map(d => '- ' + d), '',
        '**Rewrite**', '> ' + lastResult.rewrite, '',
        '**Practitioner gap label:** ' + (gap ? gap.label : lastResult.gap) + (gap ? ' — ' + gap.desc : ''), '',
        '**Why this works**', lastResult.why,
      ].join('\n');
      navigator.clipboard.writeText(md).then(() => {
        btnCopy.textContent = 'Copied ✓';
        setTimeout(() => { btnCopy.textContent = 'Copy as markdown'; }, 1800);
      });
    };

    function renderResult(r) {
      const gap = GAPS_BY_ID[r.gap];
      const gapColor = gap ? gap.color : '#666';

      // Step 1: Diagnosis
      const s1 = el('div', 'reveal-step');
      const s1h = el('div', 'step-head');
      s1h.append(el('span', 'step-n', { text: '02 · Diagnosis' }), el('span', 'step-title', { text: 'What\u2019s wrong with the question' }));
      const s1list = el('ul', 'diag-list');
      (r.diagnosis || []).forEach(d => { const li = el('li', null, { text: d }); s1list.appendChild(li); });
      s1.append(s1h, s1list);
      output.appendChild(s1);

      // Step 2: Diff
      const s2 = el('div', 'reveal-step');
      const s2h = el('div', 'step-head');
      s2h.append(el('span', 'step-n', { text: '03 · Transformation' }), el('span', 'step-title', { text: 'Old → new' }));
      const diffBlock = el('div', 'diff-block');
      (r.diff || []).forEach(d => {
        const line = el('div', 'diff-line ' + (d.kind === 'cut' ? 'diff-cut' : 'diff-add'));
        line.append(el('span', 'diff-mark', { text: d.kind === 'cut' ? '–' : '+' }), el('span', null, { text: d.text }));
        diffBlock.appendChild(line);
      });
      s2.append(s2h, diffBlock);
      output.appendChild(s2);

      // Step 3: Rewrite + gap tag
      const s3 = el('div', 'reveal-step');
      const s3h = el('div', 'step-head');
      s3h.append(el('span', 'step-n', { text: '04 · Rewrite' }), el('span', 'step-title', { text: 'SMM-neutral framing' }));
      const rBox = el('div', 'rewrite-box', { text: '\u201C' + r.rewrite + '\u201D' });
      const gapMeta = el('div', 'gap-meta');
      const gapLabel = el('span', 'rewriter-label', { text: 'Practitioner label →' });
      gapLabel.style.fontSize = '10px';
      const gapTag = el('span', 'gap-tag');
      gapTag.style.color = gapColor;
      const dot = el('span', 'dot');
      dot.style.background = gapColor;
      gapTag.append(dot, document.createTextNode(' ' + (gap ? gap.label : r.gap)));
      const gapDesc = el('span', 'gap-desc', { text: gap ? gap.desc : '' });
      const gapCaveat = el('span', 'gap-desc', { text: 'Tentative analytic prompt; return to the participant\u2019s own words before coding.' });
      gapMeta.append(gapLabel, gapTag, gapDesc, gapCaveat);
      s3.append(s3h, rBox, gapMeta);
      output.appendChild(s3);

      // Step 4: Why
      const s4 = el('div', 'reveal-step');
      const s4h = el('div', 'step-head');
      s4h.append(el('span', 'step-n', { text: '05 · Why this works' }));
      const whyP = el('p', null, { text: r.why });
      whyP.style.cssText = 'font-family:var(--serif);font-size:15px;line-height:1.6;color:var(--ink);margin:0';
      s4.append(s4h, whyP);
      output.appendChild(s4);

      // Stagger reveal
      const steps = output.querySelectorAll('.reveal-step');
      steps.forEach((step, i) => {
        setTimeout(() => step.classList.add('visible'), 320 * (i + 1));
      });
    }
  };
})();
