# Brenda Dervin's Sense-Making Methodology

A practitioner's guide and working instrument — built by [Frederic Labadie](https://www.linkedin.com/in/fredericlabadie), senior data analyst and analytics architect based in Amsterdam.

---

## Why This Exists

Dervin understood something most researchers spend careers avoiding: the question is the problem, not the user. She spent fifty years building a methodology for asking better ones. When she died in 2023 I wanted to make sure it reached the people whose research would be different if they'd ever encountered it.

**Live at [smm.fredericlabadie.com](https://smm.fredericlabadie.com)**

---

## What It Is

A five-page interactive site covering Sense-Making Methodology in full — orientation, theory, method, practice, fieldwork, and a working question rewriter. Built with Quarto, deployed via GitHub Actions to GitHub Pages.

**Rendered pages:**
- **Practice / Question Rewriter** (`index.qmd`) — the primary interactive tool and homepage
- **Orientation** (`bridge.qmd` → `bridge.html`) — how to use the site and where each page fits
- **Theory** (`theory.qmd` + `theory/*.qmd`) — S-G-B-O framework, seven-point synthesis of assumptions, bibliography, in memoriam
- **Method** (`method.qmd`) — practitioner gap labels, MMTLI, neutral questioning, analysis protocol, analytics applications
- **Fieldwork** (`fieldwork.qmd`) — worked scenarios, practice projects, ethics, applied examples

**The Question Rewriter** — paste any survey or UX question, get it rewritten using SMM principles. The frontend uses local example matching first, then calls the dedicated SMM API, then falls back to an offline heuristic if the API fails. The rewriter's gap labels are practitioner prompts for analysis, not a canonical Dervin taxonomy.

---

## Current Architecture

```text
smm.fredericlabadie.com      → GitHub Pages static Quarto course
smm-api.fredericlabadie.com  → Vercel API project, root directory smm-api/
```

The static site renders through GitHub Actions. Runtime AI and feedback are handled by the dedicated Vercel API under `smm-api/`.

Key runtime files:

```text
js/smm-rewriter.js          frontend rewriter + opt-in rewriter feedback
_includes/footer.html       footer, attribution, site-wide academic issue feedback
smm-api/api/rewrite.js      SMM rewrite API using Hugging Face Inference Providers router
smm-api/api/feedback.js     feedback endpoint with Neon/Postgres storage and Vercel-log fallback
smm-api/api/health.js       lightweight API health/configuration endpoint
smm-api/lib/rate-limit.js   in-memory per-instance rate-limit helper
smm-api/sql/feedback.sql    feedback table schema
CODEX_VIBE_ROOM_HANDOFF.md  engineering handoff for Codex / vibe-room work
```

Feedback is explicit and opt-in. Rewriter feedback and academic issue reports are stored in Neon/Postgres when the Vercel database env var is available; Vercel runtime logs remain the fallback.

The API includes a lightweight health endpoint and per-instance rate limiting. These are guardrails for a small public tool, not a full abuse-prevention system.

---

## The Argument

Quantitative analytics and qualitative research are not competing methods — they are sequential ones. Analytics surfaces the fact of a gap. SMM provides the methodology for diagnosing its nature.

Every time a developer says "our users would have to be idiots to not understand how to..." — that is not a user problem. That is a question problem.

---

## Contents

- Orientation and reading path for practitioners
- Origins and intellectual history of SMM
- 7 philosophical assumptions as a course synthesis across Dervin 1983, 1992, 1998 — not a direct enumeration from one paper
- S-G-B-O as a practitioner teaching model, with attention to earlier situation-gap-use/help formulations and later bridge/outcome language
- Practitioner gap labels / gap pictures for applied analysis
- Sense-making vs. sense-unmaking
- SMM vs. information-transfer models
- Micro-Moment Time-Line Interview (MMTLI) protocol in full
- Neutral questioning technique
- Analytics and digital product applications — funnel analysis, UX telemetry, A/B testing interpretation
- Practice projects and active-recall material
- Comparative analysis: Weick, Design Thinking, User Journey Mapping, Systems Thinking, Ethnographic Interviewing
- Ethical research design for SMM studies
- Full bibliography with primary and contextual sources
- In memoriam: Brenda Dervin (1938–2023)

---

## Source structure

The live site is intentionally modular. `theory.qmd` is now a small wrapper that includes smaller files under `theory/`, so academic and bibliography edits can be made without touching one large raw-HTML file.

`smm_guide.qmd` is a legacy single-file guide retained for archival reference only. It is not rendered by `_quarto.yml` and should not be treated as maintained source. See `legacy/README.md`.

---

## Primary Sources

| Work | Verified citation | Note |
|------|-------------------|------|
| [Dervin (1983)](https://philpapers.org/rec/DERIAA) | Dervin, B. (1983). “Information as a user construct: The relevance of perceived information needs to synthesis and interpretation.” In S. A. Ward & L. J. Reed (Eds.), *Knowledge Structure and Use: Implications for Synthesis and Interpretation* (pp. 155–183). Philadelphia, PA: Temple University Press. | Foundational statement of information as user construct and perceived information needs. Some secondary sources list pp. 153–183; PhilPapers lists pp. 155–183. |
| [Dervin (1992)](https://bibbase.org/network/publication/dervin-fromthemindseyeoftheuserthesensemakingqualitativequantitativemethodology-1992) | Dervin, B. (1992). “From the mind’s eye of the user: The Sense-Making qualitative-quantitative methodology.” In J. D. Glazier & R. R. Powell (Eds.), *Qualitative Research in Information Management* (pp. 61–84). Englewood, CO: Libraries Unlimited. | **Start here** for the qualitative-quantitative methodology and situational questioning. |
| [Dervin & Nilan (1986)](https://garfield.library.upenn.edu/histcomp/annualreviews/ann-rev-inform-sci-tech/index-tc.html) | Dervin, B., & Nilan, M. (1986). “Information needs and uses.” *Annual Review of Information Science and Technology*, 21, 3–33. | Paradigm critique of information needs and uses research. |
| [Dervin (1998)](https://doi.org/10.1108/13673279810249369) | Dervin, B. (1998). “Sense-making theory and practice: An overview of user interests in knowledge seeking and use.” *Journal of Knowledge Management*, 2(2), 36–46. https://doi.org/10.1108/13673279810249369 | Sense-making and sense-unmaking for knowledge seeking/use and knowledge-management contexts. |
| [Dervin (1999)](https://doi.org/10.1016/S0306-4573(99)00023-0) | Dervin, B. (1999). “On studying information seeking methodologically: The implications of connecting metatheory to method.” *Information Processing & Management*, 35(6), 727–750. https://doi.org/10.1016/S0306-4573(99)00023-0 | Methodology / metatheory-to-method article; useful for MMTLI and methodological cautions. |
| [Dervin & Foreman-Wernet (Eds.) (2003)](https://openlibrary.org/books/OL3690333M/Sense-making_methodology_reader) | Dervin, B., Foreman-Wernet, L., & Lauterbach, E. (Eds.). (2003). *Sense-Making Methodology Reader: Selected Writings of Brenda Dervin*. Cresskill, NJ: Hampton Press. ISBN 1-57273-508-2 / 1-57273-509-0. | Essential collection. Library records list xv, 397 pages; some retailer records list 384 pages, so library pagination should be preferred. |

---

## Technical

Built with [Quarto](https://quarto.org). Renders to static HTML via GitHub Actions on every push to main. The course itself is served by GitHub Pages. The runtime rewriter and feedback endpoints live in the Vercel `smm-api` project.

```bash
# Render locally
quarto render

# Preview
quarto preview
```

API checks:

```bash
cd smm-api
npm install
npm run lint
npm run test:local
```

`npm run test:local` calls:

```text
GET  /api/health
POST /api/rewrite
POST /api/feedback
```

To smoke-test production deliberately:

```bash
cd smm-api
SMM_API_BASE_URL=https://smm-api.fredericlabadie.com npm run test:local
```

PowerShell:

```powershell
cd smm-api
$env:SMM_API_BASE_URL="https://smm-api.fredericlabadie.com"
npm run test:local
```

Production API endpoints:

```text
GET  https://smm-api.fredericlabadie.com/api/health
POST https://smm-api.fredericlabadie.com/api/rewrite
GET  https://smm-api.fredericlabadie.com/api/rewrite?question=...
POST https://smm-api.fredericlabadie.com/api/feedback
```

The `GET /api/rewrite?question=...` route is retained for browser/mobile debugging; the course frontend uses POST.

For the next technical handoff, start with `CODEX_VIBE_ROOM_HANDOFF.md`.

---

## Attribution

Sense-Making Methodology is the intellectual work of Brenda Dervin (Ohio State University, early 1970s–2023). This site is an independent interpretive resource — commentary, application, and working instrument — not a reproduction of her texts. The theoretical foundation derives from her published work; practitioner examples, teaching heuristics, diagrams, and applications are independent interpretations.

---

*Frederic Labadie · Amsterdam · [linkedin.com/in/fredericlabadie](https://linkedin.com/in/fredericlabadie) · [fredericlabadie.com](https://fredericlabadie.com)*
