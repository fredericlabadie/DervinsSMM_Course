# Brenda Dervin's Sense-Making Methodology

A structured study guide and applied practice resource across three formats — built by [Frederic Labadie](https://www.linkedin.com/in/fredericlabadie), senior data analyst and analytics architect based in Amsterdam.

## Why I Built This

Dervin's Sense-Making Methodology (SMM) is the qualitative counterpart to the quantitative analytics work I do every day. The telemetry tells me *what* happened — where users dropped off, which variant won, which segment converts. SMM gives me the framework for understanding *why* — what gap the user was experiencing, what bridge they were trying to construct, and why the product did or didn't help them across it.

I couldn't find a single resource that had the theoretical rigour intact while being practically oriented toward the kind of work I actually do: analytics, UX telemetry, A/B testing, measurement planning. So I built one.

The talk this connects to: **Finding the Hypothesis When You Only Know the Question** — on the relationship between quantitative analytics and qualitative gap diagnosis.

---

## Files

### `smm_learning_package.html`
Standalone interactive HTML — open directly in any browser, no installation needed.

**10 sections:**
- Core Class — origins, philosophy, S-G-B-O framework, gap taxonomy, sense-unmaking
- Visual Model — diagrams, recursive loop, gap anatomy
- Methodology — MMTLI protocol, neutral questioning, survey adaptation, qualitative analysis
- Applied Practice — UX, strategy, communications, personal decisions, organizational problem-solving
- **Analytics & Digital Product** — how SMM connects to funnel analysis, UX telemetry, A/B testing, and measurement planning (my applied additions)
- **Practice Projects** — 4 structured exercises (gap-map a funnel, survey redesign, self-MMTLI, A/B test post-mortem)
- Cliff Notes — compressed definitions, principles, common mistakes
- Active Recall — 20 flashcards, 10 test questions, 5 worked scenarios
- Comparisons — SMM vs. Weick, Design Thinking, User Journey Mapping, Systems Thinking, Ethnographic Interviewing
- **SMM Question Rewriter** — AI-powered tool (Claude API): paste any survey or UX question, get it rewritten using SMM principles with gap diagnosis
- **About** — who built this, why, how it connects to analytics and UX work

**Interactive features:**
- AI question rewriter (Anthropic Claude Sonnet — requires API access in browser)
- 20 flip flashcards
- 10 test questions with reveal
- 5 worked scenarios with S-G-B-O breakdown
- 7-day mastery plan

### `dervin_smm_microsite.jsx`
React component — drop into any React/Next.js project.
- All content from the HTML version
- 9 sections including an Ethical Projects section
- Tailwind CSS styling (dark academia theme)

```bash
# In a React project with Tailwind configured
import DervinSMMMicrosite from './dervin_smm_microsite'
```

### `smm_guide.qmd`
Quarto document — renders to HTML or PDF.
- Full content across 10 sections
- Section 10 is a printable fieldwork interview template
- HTML render: interactive (flashcards, reveal questions, fillable form)
- PDF render: full print version (Q+A both visible, form as printed lines)

```bash
# Render to HTML
quarto render smm_guide.qmd --to html

# Render to PDF (requires LaTeX)
quarto install tinytex
quarto render smm_guide.qmd --to pdf
```

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
