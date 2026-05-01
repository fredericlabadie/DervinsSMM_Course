# Brenda Dervin's Sense-Making Methodology

A practitioner's guide to theory, method, and applied analytics — built by [Frederic Labadie](https://www.linkedin.com/in/fredericlabadie), senior data analyst and analytics architect based in Amsterdam.

## Why I Built This

Dervin's Sense-Making Methodology (SMM) is the qualitative counterpart to the quantitative analytics work I do every day. The telemetry tells me *what* happened — where users dropped off, which variant won, which segment converts. SMM gives me the framework for understanding *why* — what gap the user was experiencing, what bridge they were trying to construct, and why the product did or didn't help them across it.

I couldn't find a resource with the theoretical rigour intact that was also practically oriented toward the work I actually do: analytics, UX telemetry, A/B testing, measurement planning. So I built one.

The talk this connects to: **Finding the Hypothesis When You Only Know the Question** — on the relationship between quantitative analytics and qualitative gap diagnosis.

---

## Files

### `smm_guide.qmd`

The primary source file. Renders to an interactive website (HTML) or a printable fieldwork guide (PDF).

```bash
# Render to HTML site
quarto render smm_guide.qmd --to html

# Render to PDF (requires LaTeX)
quarto install tinytex
quarto render smm_guide.qmd --to pdf
```

**12 sections:**
- Core Class — origins, philosophy, S-G-B-O framework, gap taxonomy, sense-unmaking
- Visual Model — diagrams, recursive loop, gap anatomy
- Methodology — MMTLI protocol, neutral questioning, survey adaptation, qualitative analysis
- Applied Practice — UX, strategy, communications, personal decisions, organisations
- **Analytics & Digital Product** — funnel analysis, UX telemetry, A/B testing, measurement planning
- **Practice Projects** — 4 structured exercises (gap-map a funnel, survey redesign, self-MMTLI, A/B post-mortem)
- Cliff Notes — compressed definitions, principles, common mistakes
- Active Recall — 20 flashcards, 10 test questions, 5 worked scenarios
- Comparative Analysis — SMM vs. Weick, Design Thinking, User Journey Mapping, Systems Thinking, Ethnographic Interviewing
- Ethical Projects — 4 research design case studies with risk and mitigation mapping
- **SMM Question Rewriter** — Claude Sonnet API: paste any survey or UX question, get it rewritten using SMM principles
- **About** — who built this, why, how it connects to analytics and UX work
- Fieldwork Template — printable interview sheet (print separately)

---

## Contents Covered

- Origins and intellectual history of SMM
- 7 philosophical assumptions
- Full S-G-B-O framework (Situation → Gap → Bridge → Outcome)
- Gap taxonomy (6 types)
- Sense-making vs. sense-unmaking
- SMM vs. information-transfer models
- Micro-Moment Time-Line Interview (MMTLI) protocol
- Neutral questioning technique
- Qualitative analysis methods
- Applied practice: UX, strategy, communications, personal decisions, organizations
- **Analytics and digital product applications** — funnel analysis, UX telemetry, A/B testing interpretation
- **Practice projects** — 4 structured exercises for practitioners
- Comparative analysis: Weick, Design Thinking, User Journey Mapping, Systems Thinking, Ethnographic Interviewing
- Ethical research design for SMM studies
- 7-day mastery plan + daily practice loop
- Primary sources reading list

---

## Primary Sources

| Work | Note |
|------|------|
| Dervin (1983) — "Information as a User Construct" | Foundational |
| Dervin (1992) — "From the Mind's Eye of the User" | **Start here** |
| Dervin & Nilan (1986) — Annual Review of Information Science | Paradigm critique |
| Dervin (1998) — "Sense-Making Theory and Practice" | Sense-unmaking; power |
| Dervin (1999) — "On Studying Information Seeking Methodologically" | MMTLI deep dive |

---

## About the Author

**Frederic Labadie** — Senior Data Analyst & Analytics Architect, Amsterdam.

Primary stack: BigQuery, GA4, dbt, Amplitude, GTM (client + server-side). SMM is the qualitative complement to quantitative analytics work — the framework for diagnosing gap types when the numbers surface a problem but can't explain its nature.

[LinkedIn](https://www.linkedin.com/in/fredericlabadie) · [GitHub](https://github.com/fredericlabadie) · [Writers Room](https://writersroom.fredericlabadie.com) · [VibeReader](https://vibereader.fredericlabadie.com)
