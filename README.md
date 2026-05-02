# Brenda Dervin's Sense-Making Methodology

A practitioner's guide and working instrument — built by [Frederic Labadie](https://www.linkedin.com/in/fredericlabadie), senior data analyst and analytics architect based in Amsterdam.

---

## Why This Exists

Dervin understood something most researchers spend careers avoiding: the question is the problem, not the user. She spent fifty years building a methodology for asking better ones. When she died in 2023 I wanted to make sure it reached the people whose research would be different if they'd ever encountered it.

**Live at [smm.fredericlabadie.com](https://smm.fredericlabadie.com)**

---

## What It Is

A four-page interactive site covering Sense-Making Methodology in full — theory, method, applied practice, and a working question rewriter. Built with Quarto, deployed via GitHub Actions to GitHub Pages.

**Four sections:**
- **Bridge** — orientation and entry point
- **Theory** — S-G-B-O framework, gap taxonomy, seven philosophical assumptions, full bibliography, in memoriam
- **Method** — six gap types, analytics and digital product applications, UX telemetry + SMM protocol, practice projects
- **Fieldwork** — MMTLI protocol, neutral questioning, worked examples, ethics, practice template

**The Question Rewriter** — paste any survey or UX question, get it rewritten using SMM principles. Three-tier system: local example matching → HuggingFace Zephyr-7B proxy → heuristic fallback. Works without any login or setup.

---

## The Argument

Quantitative analytics and qualitative research are not competing methods — they are sequential ones. Analytics surfaces the fact of a gap. SMM provides the methodology for diagnosing its nature.

Every time a developer says "our users would have to be idiots to not understand how to..." — that is not a user problem. That is a question problem.

---

## Contents

- Origins and intellectual history of SMM
- 7 philosophical assumptions (synthesised across Dervin 1983, 1992, 1998)
- Full S-G-B-O framework (Situation → Gap → Bridge → Outcome)
- Six gap types with structural characterisations
- Sense-making vs. sense-unmaking
- SMM vs. information-transfer models
- Micro-Moment Time-Line Interview (MMTLI) protocol in full
- Neutral questioning technique
- Analytics and digital product applications — funnel analysis, UX telemetry, A/B testing interpretation
- Practice projects — 4 structured exercises
- Comparative analysis: Weick, Design Thinking, User Journey Mapping, Systems Thinking, Ethnographic Interviewing
- Ethical research design for SMM studies
- Full bibliography with primary and contextual sources
- In memoriam: Brenda Dervin (1938–2023)

---

## Primary Sources

| Work | Note |
|------|------|
| Dervin (1983) — "Information as a User Construct" | Foundational |
| Dervin (1992) — "From the Mind's Eye of the User" | **Start here** |
| Dervin & Nilan (1986) — Annual Review of Information Science | Paradigm critique |
| Dervin (1998) — "Sense-Making Theory and Practice" | Sense-unmaking; power |
| Dervin (1999) — "On Studying Information Seeking Methodologically" | MMTLI deep dive |
| Dervin & Foreman-Wernet (Eds.) (2003) — SMM Reader | Essential collection |

---

## Technical

Built with [Quarto](https://quarto.org). Renders to static HTML via GitHub Actions on every push to main. The Question Rewriter proxies HuggingFace Zephyr-7B through a serverless function — no credentials needed to use the site.

```bash
# Render locally
quarto render

# Preview
quarto preview
```

---

## Attribution

Sense-Making Methodology is the intellectual work of Brenda Dervin (Ohio State University, early 1970s–2023). This site is an independent interpretive resource — commentary, application, and working instrument — not a reproduction of her texts.

---

*Frederic Labadie · Amsterdam · [linkedin.com/in/fredericlabadie](https://linkedin.com/in/fredericlabadie) · [fredericlabadie.com](https://fredericlabadie.com)*
