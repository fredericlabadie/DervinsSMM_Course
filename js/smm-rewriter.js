// SMM Question Rewriter — vanilla JS, HuggingFace Inference API
// Renders into a target container. Uses window.SMM_GAPS and window.SMM_REWRITES from smm-data.js.

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
        'Reads as a ' + gap.label.toLowerCase() + '-gap framing — but the gap type isn\u2019t made explicit, so the data won\u2019t cleanly resolve.',
        'Does not invite both helps and hurts.',
      ],
      rewrite: 'Walk me through a specific moment when this came up for you. What were you trying to do, what did you reach for, and what got in the way?',
      gap: gapId,
      why: 'Anchors the question in a specific micro-moment, leaves room for any bridge type the user actually used, and probes for hurts as well as helps — the structural moves SMM uses to surface a ' + gap.label.toLowerCase() + '-gap honestly.',
      diff: [
        { kind: 'cut', text: input.trim() },
        { kind: 'add', text: 'Walk me through a specific moment when this came up for you.' },
        { kind: 'add', text: 'What were you trying to do, what did you reach for, and what got in the way?' },
      ],
    };
  }

  // HuggingFace Inference API call
  const HF_MODEL = 'HuggingFaceH4/zephyr-7b-beta';
  const HF_URL = 'https://api-inference.huggingface.co/models/' + HF_MODEL;

  function buildSystemPrompt() {
    const gapList = (window.SMM_GAPS || []).map(g => g.label + ': ' + g.desc).join('; ');
    return `You are an expert in Brenda Dervin's Sense-Making Methodology (SMM). A user will give you a research question (survey, UX interview, A/B test hypothesis, etc). Your job:

1. DIAGNOSE: Give exactly 3 bullet points explaining what is wrong with the question from an SMM perspective. Focus on: what it presupposes, whether it asks about a moment or a generality, whether it leaves room for both helps and hurts.

2. REWRITE: Rewrite the question using SMM neutral questioning principles — anchor a specific moment, leave the gap type open, probe for both bridge and hurt.

3. GAP: Classify which of these 6 gap types the rewrite is designed to surface: ${gapList}

4. WHY: In 1-2 sentences, explain why the rewrite produces more useful data than the original.

5. DIFF: Show what was cut (the original) and what was added (your rewrite, split into 2-3 short prompt sentences).

Respond ONLY with valid JSON, no markdown, no preamble. Schema:
{"diagnosis":["...","...","..."],"rewrite":"...","gap":"decision|barrier|problematic|role|spinout|washout","why":"...","diff":[{"kind":"cut","text":"..."},{"kind":"add","text":"..."},{"kind":"add","text":"..."}]}`;
  }

  async function callHuggingFace(question, token) {
    const prompt = '<|system|>\n' + buildSystemPrompt() + '\n<|user|>\n' + question + '\n<|assistant|>\n';
    const res = await fetch(HF_URL, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: { max_new_tokens: 800, temperature: 0.3, return_full_text: false },
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error('HuggingFace API error: ' + res.status + ' ' + err);
    }
    const data = await res.json();
    const text = Array.isArray(data) ? data[0].generated_text : data.generated_text || '';
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Could not parse JSON from model response');
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

    let hfToken = localStorage.getItem('smm_hf_token') || '';
    let useAI = !!hfToken;

    // ── Token prompt ──
    const tokenWrap = el('div', 'hf-token-prompt');
    tokenWrap.id = 'hf-token-section';
    const tLabel = el('span', 'hf-label', { text: 'AI-Powered Rewriting (Optional)' });
    const tDesc = el('div', 'hf-desc', {
      html: 'Enter a free <a href="https://huggingface.co/settings/tokens" target="_blank">HuggingFace token</a> for AI-powered rewrites. Without a token, the rewriter uses built-in examples and heuristic matching.'
    });
    const tInput = el('input', null, { type: 'password', placeholder: 'hf_...' });
    tInput.value = hfToken;
    const tRow = el('div', 'rewriter-controls');
    tRow.style.marginTop = '8px';
    const tSave = el('button', 'btn-ghost-smm', { text: hfToken ? '✓ TOKEN SAVED' : 'SAVE TOKEN' });
    const tStatus = el('span', 'rewriter-label', { text: '' });
    tStatus.style.fontSize = '10px';
    tRow.append(tSave, tStatus);
    tokenWrap.append(tLabel, tDesc, tInput, tRow);

    tSave.onclick = function() {
      const v = tInput.value.trim();
      if (v) {
        localStorage.setItem('smm_hf_token', v);
        hfToken = v;
        useAI = true;
        tSave.textContent = '✓ TOKEN SAVED';
        tStatus.textContent = 'AI rewriting enabled';
      } else {
        localStorage.removeItem('smm_hf_token');
        hfToken = '';
        useAI = false;
        tSave.textContent = 'SAVE TOKEN';
        tStatus.textContent = 'Using built-in examples';
      }
    };

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

    shell.append(tokenWrap, inputWrap, output);
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
        } else if (useAI && hfToken) {
          // Call HuggingFace
          const aiResult = await callHuggingFace(q, hfToken);
          result = {
            original: q,
            diagnosis: aiResult.diagnosis || [],
            rewrite: aiResult.rewrite || '',
            gap: aiResult.gap || 'washout',
            why: aiResult.why || '',
            diff: aiResult.diff || [{ kind: 'cut', text: q }, { kind: 'add', text: aiResult.rewrite }],
          };
        } else {
          result = buildFallbackRewrite(q);
        }
      } catch (err) {
        console.error('Rewriter error:', err);
        result = buildFallbackRewrite(q);
        // Show error hint
        const errHint = el('div', 'rewriter-label', { text: 'AI unavailable — showing heuristic rewrite. ' + err.message });
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
        '**Gap type:** ' + (gap ? gap.label : lastResult.gap) + (gap ? ' — ' + gap.desc : ''), '',
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
      const gapLabel = el('span', 'rewriter-label', { text: 'Designed to surface →' });
      gapLabel.style.fontSize = '10px';
      const gapTag = el('span', 'gap-tag');
      gapTag.style.color = gapColor;
      const dot = el('span', 'dot');
      dot.style.background = gapColor;
      gapTag.append(dot, document.createTextNode(' ' + (gap ? gap.label : r.gap) + ' gap'));
      const gapDesc = el('span', 'gap-desc', { text: gap ? gap.desc : '' });
      gapMeta.append(gapLabel, gapTag, gapDesc);
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
