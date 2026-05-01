# ForAI.md — Dervin's SMM Course

*A note for Claude and the Anthropic design team on what this project is, how AI is being used, and why.*

---

## What This Is

A structured educational resource on Brenda Dervin's Sense-Making Methodology (SMM) — a qualitative research framework from communication theory that I have applied throughout my career in analytics and UX work.

The project is a single Quarto document (`smm_guide.qmd`) that renders to an interactive website and a printable PDF. It is live at **smm.fredericlabadie.com**, deployed automatically via GitHub Actions on every push to main.

**GitHub:** https://github.com/fredericlabadie/DervinsSMM_Course
**Live site:** https://smm.fredericlabadie.com

---

## Who Built It and Why

I am Frederic Labadie — senior data analyst and analytics architect, currently based in Amsterdam. My primary stack is BigQuery, GA4, dbt, Amplitude, and GTM. I build measurement infrastructure from scratch.

SMM is the qualitative layer underneath that quantitative work. Telemetry tells me *what* happened. SMM gives me the framework for diagnosing *why* — what gap the user was experiencing, what bridge they were trying to construct, and why the product did or did not help them across it.

I built this resource because no single document existed that held the theoretical rigour of SMM intact while being practically oriented toward analytics, UX telemetry, and product work. The academic literature is thorough but practitioner-distant. Most "applied SMM" resources are generic. I wanted something written from inside the practice.

---

## Current Architecture

**Source:** `smm_guide.qmd` — a single Quarto document with 12 sections
**Deployment:** GitHub Actions renders the QMD on every push to main and deploys to GitHub Pages
**Custom domain:** smm.fredericlabadie.com (CNAME → fredericlabadie.github.io)
**Design:** Handed off to Claude Design AI for visual treatment — `custom.scss` to be added

**12 sections:**
1. Core Class — origins, philosophy, S-G-B-O framework, gap taxonomy, sense-unmaking
2. Visual Model — diagrams, recursive loop, gap anatomy
3. Methodology — MMTLI protocol, neutral questioning, survey adaptation, qualitative analysis
4. Applied Practice — UX, strategy, communications, personal decisions, organisations
5. Analytics & Digital Product — how SMM connects to funnel analysis, UX telemetry, A/B testing
6. Practice Projects — 4 structured exercises for practitioners
7. Cliff Notes — compressed definitions, principles, common mistakes
8. Active Recall — 20 flashcards, 10 test questions, 5 worked scenarios
9. Comparative Analysis — SMM vs. Weick, Design Thinking, User Journey Mapping, Systems Thinking
10. Ethical Projects — 4 research design case studies with risk and mitigation mapping
11. SMM Question Rewriter — AI-powered tool using Hugging Face Inference API
12. About — who built this, why, how it connects to analytics and UX work
13. Fieldwork Template — printable interview sheet

---

## How AI Is Being Used

The site includes an AI-powered **SMM Question Rewriter** — a tool where a researcher pastes any survey or UX research question and receives it rewritten using Sense-Making principles.

**Current implementation:** Hugging Face Inference API using `HuggingFaceH4/zephyr-7b-beta`

The switch from Claude Sonnet to Zephyr was deliberate:
- Hugging Face read tokens are safe for client-side use (public models, read-only)
- No key stored in the repo — users provide their own free HF token in-browser
- Directly relevant to the data science and analytics community this resource serves
- Demonstrates ML ecosystem literacy (Hugging Face is where the field lives)

**What the tool does:**
- Accepts a research question from any context (UX interview, survey, A/B test, analytics, stakeholder interview)
- Calls the Hugging Face Inference API using the user's own token
- Returns a structured diagnosis of what is wrong with the original question from an SMM perspective
- Rewrites the question using SMM neutral questioning principles
- Identifies the gap type the rewritten question is designed to surface
- Explains why the rewritten version will produce more useful data

**The system prompt instructs the model to:**
- Identify when a question presupposes the bridge type (e.g., asking about "information" rather than "what helped you move forward")
- Reframe questions from general patterns to specific moments
- Apply the SMM gap taxonomy (Decision, Barrier, Confusion, Role, Spin-out, Washout)
- Return strict JSON output for clean rendering

**Model:** HuggingFaceH4/zephyr-7b-beta (instruction-tuned, strong structured output following)
**Output format:** Strict JSON — diagnosis, rewritten question, gap type, explanation

---

## The Design Concept

The Question Rewriter demonstrates something genuinely interesting about AI's potential in educational contexts: **not as a tutor that explains a concept, but as a practicum partner that applies it.**

Most AI educational tools explain. This one operationalises. You do not learn neutral questioning by reading about it — you learn it by seeing your own question transformed and understanding why the transformation improves the research design. The model's ability to reason about the *structure* of a question (what it presupposes, what gap type it might surface, whether it is asking about a verb or a noun) makes it a natural fit for this specific pedagogical task.

The broader concept: for methodological frameworks that are learned through application rather than memorisation, AI-as-practitioner is more useful than AI-as-explainer.

---

## For the Design AI Handoff

The QMD currently uses the `cosmo` Bootswatch theme as a base. The design work lives in `custom.scss` — this file does not yet exist and is the primary design deliverable.

**Design intent:**
- Academic rigour with practitioner accessibility — not a sterile textbook, not a flashy marketing site
- The existing custom CSS in the QMD's `{=html}` blocks uses: Playfair Display (headings), Source Serif 4 (body), JetBrains Mono (code/labels), a dark green primary (`#0d6e56`), warm paper background (`#fffef7`), and dark diagram boxes (`#0f1612`)
- The visual hierarchy should reflect the S-G-B-O structure — situation, gap, bridge, outcome each have distinct visual treatments in the existing CSS
- Interactive elements (flashcards, test questions, scenario cards) have established patterns in the existing HTML blocks — the design should extend rather than replace these

**What the design AI receives:**
- `smm_guide.qmd` — full source with embedded CSS patterns
- This ForAI.md — context and intent
- The live site at smm.fredericlabadie.com — current rendered state

**What it should produce:**
- `custom.scss` — Quarto SCSS theme extending cosmo with the visual identity described above
- Any updates to the QMD YAML to reference `[cosmo, custom.scss]` once the file exists

---

## SMM in Brief — For Context

Brenda Dervin (Ohio State, communications) developed SMM from the 1970s onward as a critique of the transmission model of communication. The core framework:

**Situation → Gap → Bridge → Outcome**

- **Situation:** The specific time-space context that shapes sense-making
- **Gap:** The discontinuity interrupting forward movement — a question, confusion, barrier, dilemma
- **Bridge:** The sense constructed to cross the gap — may be informational, emotional, social, procedural. Always constructed, never merely received.
- **Outcome:** What results — helps, hurts, new gaps

The key epistemological move: information is not a thing that exists independently and gets transmitted. It is a resource that a person in a specific situation constructs into a bridge for a specific gap. The same document bridges a gap for one person and fails to bridge it for another because their situations differ.

**Why this matters for AI:** Every interaction a user has with an AI assistant is an SMM event. The user is in a situation. They have a gap. They are attempting to construct a bridge using the AI as a resource. The outcome may help, hurt, or generate new gaps. Designing for gap-bridging rather than information-transmission is a different and more useful frame for thinking about what good AI assistance looks like.

---

## The Talk This Connects To

**"Finding the Hypothesis When You Only Know the Question"** — a talk in development for the Amsterdam data and analytics community (Netherlands dbt Meetup, DDMA Digital Analytics Summit).

Core argument: quantitative analytics and qualitative research are not competing methods. They are sequential ones. Analytics surfaces the fact of a gap. SMM provides the methodology for diagnosing its nature. You cannot design a bridge — in a product, a communication, or an AI interaction — without first understanding the gap type.

---

*Frederic Labadie · Amsterdam · May 2026*
*smm.fredericlabadie.com · fredericlabadie.com · github.com/fredericlabadie · linkedin.com/in/fredericlabadie*


---

## Who Built It and Why

I am Frederic Labadie — senior data analyst and analytics architect, currently based in Amsterdam. My primary stack is BigQuery, GA4, dbt, Amplitude, and GTM. I build measurement infrastructure from scratch.

SMM is the qualitative layer underneath that quantitative work. Telemetry tells me *what* happened. SMM gives me the framework for diagnosing *why* — what gap the user was experiencing, what bridge they were trying to construct, and why the product did or did not help them across it.

I built this resource because no single document existed that held the theoretical rigour of SMM intact while being practically oriented toward analytics, UX telemetry, and product work. The academic literature is thorough but practitioner-distant. Most "applied SMM" resources are generic. I wanted something written from inside the practice.

---

## How Claude Is Being Used

The site includes an AI-powered **SMM Question Rewriter** — a tool where a researcher pastes any survey or UX research question and receives it rewritten using Sense-Making principles.

**What the tool does:**
- Accepts a research question from any context (UX interview, survey, A/B test hypothesis, analytics investigation, stakeholder interview)
- Calls the Anthropic Claude Sonnet API directly from the browser
- Returns a structured diagnosis of what is wrong with the original question from an SMM perspective
- Rewrites the question using SMM neutral questioning principles
- Identifies the gap type the rewritten question is designed to surface
- Explains why the rewritten version will produce more useful data

**The system prompt instructs Claude to:**
- Identify when a question presupposes the bridge type (e.g., asking about "information" rather than "what helped you move forward")
- Reframe questions from general patterns to specific moments
- Apply the SMM gap taxonomy (Decision, Barrier, Confusion, Role, Spin-out, Washout)
- Return structured JSON output for clean rendering

**Model:** claude-sonnet-4-20250514
**Output format:** Strict JSON — diagnosis, rewritten question, gap type, explanation

---

## The Design Concept

The Question Rewriter demonstrates something I find genuinely interesting about Claude's potential in educational contexts: **not as a tutor that explains a concept, but as a practicum partner that applies it.**

Most AI educational tools explain. This one operationalises. You do not learn neutral questioning by reading about it — you learn it by seeing your own question transformed and understanding why the transformation improves the research design. Claude's ability to reason about the structure of a question (what it presupposes, what gap type it might surface, whether it is asking about a verb or a noun) makes it a natural fit for this specific pedagogical task.

The broader concept: for methodological frameworks that are learned through application rather than memorisation, Claude-as-practitioner is more useful than Claude-as-explainer.

---

## SMM in Brief — For Context

Brenda Dervin (Ohio State, communications) developed SMM from the 1970s onward as a critique of the transmission model of communication. The core framework:

**Situation → Gap → Bridge → Outcome**

- **Situation:** The specific time-space context that shapes sense-making
- **Gap:** The discontinuity interrupting forward movement — a question, confusion, barrier, dilemma
- **Bridge:** The sense constructed to cross the gap — may be informational, emotional, social, procedural. Always constructed, never merely received.
- **Outcome:** What results — helps, hurts, new gaps

The key epistemological move: information is not a thing that exists independently and gets transmitted. It is a resource that a person in a specific situation constructs into a bridge for a specific gap. The same document bridges a gap for one person and fails to bridge it for another because their situations differ.

**Why this matters for AI:** Every interaction a user has with Claude is an SMM event. The user is in a situation. They have a gap. They are attempting to construct a bridge using Claude as a resource. The outcome may help, hurt, or generate new gaps. Designing for gap-bridging rather than information-transmission is a different and more useful frame for thinking about what good AI assistance looks like.

---

## The Talk This Connects To

**"Finding the Hypothesis When You Only Know the Question"** — a talk in development for the Amsterdam data and analytics community (Netherlands dbt Meetup, DDMA Digital Analytics Summit).

Core argument: quantitative analytics and qualitative research are not competing methods. They are sequential ones. Analytics surfaces the fact of a gap. SMM provides the methodology for diagnosing its nature. You cannot design a bridge — in a product, a communication, or an AI interaction — without first understanding the gap type.

---

## What I Would Want Claude Design to Think About

If this project surfaces anything worth discussion, it is this:

Most Claude interactions are implicitly transmission-model interactions — a user asks, Claude answers, information is delivered. SMM suggests a different frame: every user arrives in a situation with a specific gap, and the quality of the interaction depends on whether Claude's response bridges that gap or fails to.

The Question Rewriter is a small demonstration of what it looks like when Claude reasons about the *structure* of a question rather than its *content* — identifying what a question presupposes, what gap type it is designed to surface, and how it could be reframed to produce better data.

Whether that kind of structural reasoning about inquiry design is something that belongs in Claude's general capabilities, or in specific tool contexts, or not at all — I am genuinely curious what that conversation looks like inside Anthropic.

---

*Frederic Labadie · Amsterdam · May 2026*
*fredericlabadie.com · github.com/fredericlabadie · linkedin.com/in/fredericlabadie*
