# ForAI.md — Dervin's SMM Course
*Context for Claude and any AI agent working on this project*
*Last updated: May 2026*

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

## Architecture

**Source files:**
```
_quarto.yml              ← project config, site-url, fonts, includes
custom.scss              ← full visual design (DO NOT modify without reading carefully)
_includes/header.html    ← persistent nav header injected into every page
_includes/footer.html    ← persistent footer with attribution and nav links
bridge.qmd               ← orientation / entry page (first thing visitors see)
theory.qmd               ← S-G-B-O framework, gap taxonomy, bibliography, in memoriam
method.qmd               ← gap types, analytics applications, practice projects
fieldwork.qmd            ← MMTLI protocol, worked examples, ethics
index.qmd                ← question rewriter tool (primary interactive feature)
js/smm-data.js           ← all content data: flashcards, scenarios, local rewrite examples
js/smm-rewriter.js       ← rewriter logic: local match → proxy AI → heuristic fallback
smm_guide.qmd            ← legacy single-file version (not rendered in live site)
```

**Render pipeline:**
GitHub Actions workflow (.github/workflows/render-deploy.yml) runs `quarto render` on push to main. Output goes to _site/. GitHub Pages serves from _site/. No build server — fully static after render.

**Fonts (Google Fonts, loaded in _quarto.yml):**
- Cormorant Garamond — display headings, large italic treatment
- EB Garamond — secondary display
- IBM Plex Serif — body text
- IBM Plex Mono — labels, eyebrows, monospace UI elements

**Colour palette (defined in custom.scss):**
- $paper-warm: #dde0cf — sage-green page background
- $ink: #0c1410 — primary text
- $copper: #a06a3a / $copper-deep: #7a4d22 — accent, labels, links
- $ivy: #0f1a14 — dark section backgrounds
- $lime: #c4ff3a — active state only in dark ivy nav (use sparingly)
- $rule: rgba(160,106,58,.25) — borders and dividers

---

## Visual Design Intent

**Aesthetic:** Academic rigour with practitioner accessibility. The design AI used a "witchy herbarium" concept — dark cabinet, botanical illustration quality, copper and sage palette — which works for this subject. Dervin herself had that energy: intellectually precise, pleasant, with an edge. The visual should carry that. Not a sterile textbook. Not a lifestyle brand.

**What has been cleaned:**
- All literal herbal/botanical copy removed from method.qmd (gap card Latin plant names replaced with structural characterisations)
- Header stamp changed from HERBAL · ANNO MMXXVI · LABADIE to SENSE-MAKING · ANNO MMXXVI · LABADIE
- Dead .hf-token-prompt CSS block removed from custom.scss
- "Materia" section eyebrow replaced with "Discontinuities"

**What should be preserved:**
- The corner-bracket card styling on gap type cards
- The botanical SVG illustrations (.card-specimen class) — visual, not copy
- The details.plate progressive disclosure pattern
- The $ivy dark diagram sections for visual rhythm
- The copper accent system throughout

---

## The Question Rewriter

**Location:** index.qmd renders the rewriter UI. js/smm-rewriter.js handles all logic.

**How it works — three-tier fallback:**
1. Local match — checks js/smm-data.js for example rewrites matching the input pattern. Instant, no API call.
2. Proxy AI — calls https://writersroom.fredericlabadie.com/api/rewrite (Next.js serverless function in the Writers Room repo). Calls HuggingFace zephyr-7b-beta server-side. HF token stored in Vercel env vars — never in browser.
3. Heuristic fallback — if proxy fails, generates a reasonable SMM rewrite using pattern matching. Always produces output.

**For AI agents working on this project:**
- Do not add any HF token, Anthropic key, or credential to any file in this repo
- Do not modify the fetch URL in smm-rewriter.js without also updating the Writers Room API route
- The token input UI has been intentionally removed — do not re-add it
- Proxy endpoint: https://writersroom.fredericlabadie.com/api/rewrite (POST, body: { prompt: string })

---

## Content Accuracy Notes

**The seven assumptions** in theory.qmd are a synthesis across Dervin (1983, 1992, 1998) — not a direct enumeration from any single paper. Noted inline. Do not present as a direct Dervin quotation.

**The 1972 date** has been corrected to "early 1970s" — methodology formalised in print from 1983.

**The in memoriam** gives her dates as 1938–2023 and institutional home as Ohio State University. Accurate.

**Citations** in the bibliography carry a caveat to verify against library databases before formal academic use. Do not remove this caveat.

**The NPS gap classification** in smm-data.js classifies NPS as a "washout" gap question. Defensible as pedagogy but not a precise taxonomic claim.

---

## Personal Voice on the Site

Three moments of personal voice are intentionally placed. Do not rewrite or generalise these — they are specific and autobiographical:

**bridge.qmd opening:**
"Dervin understood something most researchers spend careers avoiding: the question is the problem, not the user. She spent fifty years building a methodology for asking better ones. When she died in 2023 I wanted to make sure it reached the people whose research would be different if they'd ever encountered it."

**method.qmd analytics plate:**
"Sense-making is concrete once you see it. Every survey question that asks 'was this helpful?' is asking the researcher's question, not the user's. Early in my career I kept running into the gap between what we measured and what users were actually experiencing. At Stanley Steemer, when I built the UX program from scratch, it was the first thing I had to solve..."

**method.qmd talk concept:**
"Finding the Hypothesis When You Only Know the Question — Without Moving the Goal Posts. A talk for analysts who have learned to read data but not yet learned to question whether they asked for the right data in the first place."

---

## Attribution

Brenda Dervin (Ohio State University) is the intellectual source of all theoretical content. The footer carries a formal attribution statement on every page. Do not remove or weaken this attribution.

---

## What Remains To Do

- [ ] Verify bibliography citations against JSTOR/Google Scholar before sharing with academic audiences
- [ ] Test mobile rendering at 320px
- [ ] Verify $lime (#c4ff3a) does not bleed into light paper sections
- [ ] Submit talk proposal to Netherlands dbt Meetup and DDMA Digital Analytics Summit

---

*Frederic Labadie · Amsterdam · May 2026*
*smm.fredericlabadie.com · github.com/fredericlabadie · linkedin.com/in/fredericlabadie*
