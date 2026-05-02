# ForAI.md — Dervin's SMM Course
*Context for Claude, ChatGPT, and any AI agent working on this project*
*Last updated: May 2026 — cohesion review pass in progress*

---

## What This Is

An educational site and working instrument built around Brenda Dervin's Sense-Making Methodology (SMM) — a qualitative research framework from communication theory. The site is a tribute to Dervin (1938–2023) and a practical resource for practitioners who use qualitative research methods alongside quantitative analytics.

**Live site:** https://smm.fredericlabadie.com
**GitHub:** https://github.com/fredericlabadie/DervinsSMM_Course
**Deployed via:** GitHub Actions → GitHub Pages (auto-renders on push to main)
**Custom domain:** smm.fredericlabadie.com (CNAME → fredericlabadie.github.io)

---

## Who Built It and Why

**Frederic Labadie** — Senior Data Analyst & Analytics Architect, Amsterdam. Primary stack: BigQuery, GA4, dbt, Amplitude, GTM (client + server-side).

SMM is the qualitative layer underneath the quantitative work. Telemetry tells you *what* happened. SMM gives you the framework for diagnosing *why* — what gap the user was experiencing, what bridge they were trying to construct, and why the product did or did not help them across it.

The site was built after Dervin died in 2023. The intent, in Frederic's words: *"I wanted to make sure it reached the people whose research would be different if they'd ever encountered it."*

The personal voice on the site reflects genuine career experience — not academic study of Dervin's work but application of it across digital analytics, UX research, and product instrumentation contexts including a UX program built from scratch at Stanley Steemer.

---

## AI Development History

AI has been used in several roles. Do not collapse these into one generic implementation statement.

1. **Initial course development — Claude**  
   Claude was used to help draft the first version of the course, shape the pedagogical structure, and translate SMM into a practitioner-facing guide.

2. **Design direction — Claude Design**  
   Claude Design was used for visual direction, interface treatment, and the current design language.

3. **Subsequent build iteration — Claude**  
   Claude was used again for a later build pass, including site structure and implementation refinements.

4. **Implementation review — ChatGPT**  
   ChatGPT was used to evaluate implementation approaches and compare possible architectures.

5. **Academic accuracy review and remediation — ChatGPT**  
   ChatGPT is being used to review the site against Dervin's primary and secondary SMM literature and to revise places where the course overstates, collapses chronology, or presents practitioner heuristics as Dervin's own settled terminology.

Final responsibility for content, interpretation, implementation, and citations remains with the author.

---

## Architecture

**Rendered source files:**
```
_quarto.yml              ← project config, site-url, fonts, includes; renders five QMD pages
custom.scss              ← full visual design (DO NOT modify without reading carefully)
_includes/header.html    ← persistent nav header injected into every page
_includes/footer.html    ← persistent footer with attribution and nav links
bridge.qmd               ← visible page label: Orientation; URL remains bridge.html
theory.qmd               ← small wrapper; includes theory/*.qmd modules
theory/*.qmd             ← theory sections; edit these instead of a large raw-HTML file
method.qmd               ← practitioner gap labels, MMTLI, neutral questioning, analysis protocol, analytics applications
fieldwork.qmd            ← worked scenarios, practice projects, ethics, applied examples
index.qmd                ← visible page label: Practice; homepage, question rewriter, and active-recall practice
js/smm-data.js           ← support data: practitioner gap labels, scenarios, local rewrite examples
js/smm-rewriter.js       ← rewriter logic: local match → proxy AI → heuristic fallback
smm_guide.qmd            ← legacy single-file version (not rendered; not maintained source)
legacy/README.md         ← explains legacy/archive status
ACCURACY_REMEDIATION.md  ← durable academic-review state log
COHESION_REVIEW.md       ← durable navigation/page-flow review
```

**Current rendered pages in _quarto.yml:**
```
index.qmd      → practice / homepage
theory.qmd     → theory
method.qmd     → method
fieldwork.qmd  → fieldwork
bridge.qmd     → orientation
```

**Visible navigation order:**
```
Orientation · Theory · Method · Practice · Fieldwork
```

**Theory module map:**
```
theory/01-hero.qmd
theory/06-sgbo.qmd        ← rendered second to preserve Plate II display order
theory/02-assumptions.qmd
theory/03-sense-unmaking.qmd
theory/04-transmission-model.qmd
theory/05-comparative-analysis.qmd
theory/07-bibliography.qmd
theory/08-in-memoriam.qmd
```

**Render pipeline:**
GitHub Actions workflow (.github/workflows/render-deploy.yml) runs `quarto render` on push to main. Output goes to _site/. GitHub Pages serves from _site/. No build server — fully static after render.

---

## Visual Design Intent

**Aesthetic:** Academic rigour with practitioner accessibility. The design AI used a "witchy herbarium" concept — dark cabinet, botanical illustration quality, copper and sage palette — which works for this subject. Dervin herself had that energy: intellectually precise, pleasant, with an edge. The visual should carry that. Not a sterile textbook. Not a lifestyle brand.

**What should be preserved:**
- The corner-bracket card styling on gap label cards
- The botanical SVG illustrations (.card-specimen class) — visual, not copy
- The details.plate progressive disclosure pattern
- The $ivy dark diagram sections for visual rhythm
- The copper accent system throughout

---

## The Question Rewriter

**Location:** index.qmd renders the rewriter UI. js/smm-rewriter.js handles all logic.

**How it works — three-tier fallback:**
1. Local match — checks js/smm-data.js for example rewrites matching the input pattern. Instant, no API call.
2. Proxy AI — calls https://writersroom.fredericlabadie.com/api/rewrite (Next.js serverless function in the separate Writers Room repo). Calls HuggingFace zephyr-7b-beta server-side. HF token stored in Vercel env vars — never in browser.
3. Heuristic fallback — if proxy fails, generates a reasonable SMM rewrite using pattern matching. Always produces output.

**For AI agents working on this project:**
- Do not add any HF token, Anthropic key, or credential to any file in this repo
- Do not modify the fetch URL in smm-rewriter.js without also updating the Writers Room API route
- The token input UI has been intentionally removed — do not re-add it
- Proxy endpoint: https://writersroom.fredericlabadie.com/api/rewrite (POST, body: { prompt: string })
- The rewriter's gap labels are practitioner prompts for analysis, not an academic source or canonical Dervin taxonomy

---

## Content Accuracy Status

**Practitioner top layer + academic depth:** The intended structure is a practitioner-facing guide on top, with academic caveats and primary-source reading paths beneath. Preserve the direct, practical voice, but use short academic notes when a course heuristic is being used.

**Page cohesion:** The visible navigation uses Orientation → Theory → Method → Practice → Fieldwork. `index.qmd` remains the homepage because the Question Rewriter is the main interactive feature, but `bridge.qmd` is the conceptual orientation page. Keep this distinction clear in docs and visible copy.

**Gap labels / six-gap framework:** The course keeps six labels because they are useful for UX, analytics, and product research. They are described as a practitioner heuristic grounded where possible in Dervin's movement-state / stop framing. Do not call them "Dervin's taxonomy." Decision, barrier, problematic, spin-out, and washout are better grounded in accessible primary-source discussions; **Role** is retained as an applied course extension.

**S-G-B-O:** Situation → Gap → Bridge → Outcome is presented as a course teaching shorthand / practitioner model. Do not imply that all stages of Dervin's work used the exact same four-part SGBO formulation.

**The seven assumptions:** `theory/02-assumptions.qmd` describes these as a seven-point course synthesis across Dervin (1983, 1992, 1998), not a direct enumeration from one paper.

**Sense-unmaking:** `theory/03-sense-unmaking.qmd` frames sense-unmaking as later Dervin work while labeling product/analytics examples as course applications.

**Transmission model:** `theory/04-transmission-model.qmd` uses the preferred claim that a transfer-only design frame is inadequate, not that every information-transfer design necessarily fails.

**Fieldwork examples:** `fieldwork.qmd` marks rewrite examples and scenarios as applied translations using practitioner labels. It also tells practitioners to return to participants' own words and avoid forcing stories into labels too early.

**Bibliography:** `README.md` and `theory/07-bibliography.qmd` contain verified citation tables for the core Dervin sources. Dervin (1998) and Dervin (1999) have DOI-backed records; the 2003 reader has library-backed publication, ISBN, and page-count details.

**Needs language:** Do not simply say "study gaps, not needs" as if Dervin abolished needs language. Prefer: study needs as situationally constructed gaps or questions, not static topic categories.

**The in memoriam:** Dates should be Brenda Dervin (1938–2023); institutional home Ohio State University.

---

## Attribution

Brenda Dervin (Ohio State University) is the intellectual source of the theoretical foundation. The footer carries a formal attribution statement on every page. Do not remove or weaken this attribution. Practitioner examples, teaching heuristics, diagrams, and applications are independent interpretations.

---

## What Remains To Do

- [ ] Run `quarto render` locally after cohesion edits.
- [ ] Check `theory.html` visually, especially SVG/callout/table spacing.
- [ ] Check `bridge.html`/Orientation wording after render.
- [ ] Test mobile rendering at 320px.
- [ ] Verify $lime (#c4ff3a) does not bleed into light paper sections.
- [ ] Resolve Dervin (1983) page-range discrepancy against the physical book or a library scan: some records list pp. 153–183; PhilPapers lists pp. 155–183.
- [ ] If a maintained PDF is needed, create a new `print.qmd` from live modular sections rather than reviving `smm_guide.qmd`.

---

*Frederic Labadie · Amsterdam · May 2026*
*smm.fredericlabadie.com · github.com/fredericlabadie · linkedin.com/in/fredericlabadie*
