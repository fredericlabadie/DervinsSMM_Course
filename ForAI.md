# ForAI.md — Dervin's SMM Course

*A note for Claude and the Anthropic design team on what this project is, how Claude is being used, and why.*

---

## What This Is

A structured educational resource on Brenda Dervin's Sense-Making Methodology (SMM) — a qualitative research framework from communication theory that I have applied throughout my career in analytics and UX work.

The project exists in three formats: a standalone HTML interactive course, a React component, and a Quarto document. The HTML version is the primary one.

**GitHub:** https://github.com/fredericlabadie/DervinsSMM_Course

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
