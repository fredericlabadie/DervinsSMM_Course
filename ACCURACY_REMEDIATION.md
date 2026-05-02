# Academic Accuracy Remediation Log

*Branch:* `accuracy/theory-fieldwork-pass`  
*Project:* Dervin's Sense-Making Methodology course  
*Purpose:* Keep a durable handoff record for academic accuracy review and iteration.

---

## Current status

The site has completed a first academic-framing pass and a follow-up inspection of the theory and fieldwork pages. The current live-source posture is now:

- `README.md` describes the live site as a five-page Quarto site rather than a single `smm_guide.qmd` source.
- `ForAI.md` documents the Claude / Claude Design / ChatGPT development timeline and the current runtime AI architecture.
- `method.qmd` reframes the former "six gaps" section as **gap pictures for practice** rather than a canonical Dervin taxonomy.
- `js/smm-data.js` labels the six categories as practitioner gap labels, with `Role` marked as a course extension.
- `js/smm-rewriter.js` instructs the model to treat the labels as a course heuristic, not a canonical six-part Dervin taxonomy.
- `index.qmd` warns that the rewriter is a practicum tool rather than an academic authority.
- `_includes/footer.html` distinguishes Dervin's theoretical foundation from independent practitioner examples, teaching heuristics, diagrams, and applications.
- `theory.qmd` now presents SGBO as a course teaching shorthand, identifies the seven assumptions as a course synthesis, softens the transmission-model critique, and labels the recursive loop as a course visualisation.
- `fieldwork.qmd` now frames worked scenarios and rewrite examples as applied translations using practitioner labels, not formal Dervin categories.

---

## Six-gap framework decision

The six-label display is useful for practitioners because it gives analysts, UX researchers, and product teams a fast way to notice the **shape** of a user's discontinuity instead of coding only by topic. It should therefore remain in the course for now.

The accuracy constraint is that the course must not teach the six labels as Dervin's own settled taxonomy. The safer framing is:

> Dervin's primary texts describe movement states or stops, including decision, barrier, problematic, spin-out, and wash-out. This course uses a six-label practitioner display as a teaching heuristic grounded where possible in that framing. `Role` is retained as an applied course extension for organisational, UX, and product work.

This keeps the practical value while avoiding the strongest academic misalignment.

---

## Theory-page remediation status

`theory.qmd` has already addressed the highest-risk conceptual issues:

- SGBO is framed as a **course teaching shorthand**, not a timeless exact formula across all stages of Dervin's writing.
- The page notes that earlier Dervin formulations foreground situations, gaps, and uses/helps, while later summaries and applications make bridge/outcome language more explicit.
- The "seven assumptions" are explicitly named as a **course synthesis across Dervin (1983, 1992, 1998)** rather than a direct enumeration from one source.
- Sense-unmaking is described as later Dervin work, while product/analytics examples are labeled as course applications.
- The dark SGBO loop identifies the recursion as a **course visualisation**.
- The transmission-model critique has been softened from absolutist language to the more defensible claim that a transfer-only design frame is inadequate.

---

## Fieldwork-page remediation status

`fieldwork.qmd` has also addressed the main applied-risk areas:

- Rewrite cards use **Practitioner labels** rather than claiming formal Dervin categories.
- Worked scenarios are described as **course S-G-B-O analyses** and **applied translations for practice**.
- Practice projects instruct users to apply practitioner labels only after the story is situated, avoiding premature classification.
- Ethics guidance acknowledges the vulnerability created by MMTLI-style interviews and requires specific, renewable, non-coercive consent.

---

## Remaining work

1. **Bibliography verification**
   - Verify the full formal citations for Dervin (1998), Dervin (1999), and the Dervin & Foreman-Wernet reader against library databases.
   - Keep the bibliography caveat until all details are checked.

2. **Primary-source links**
   - Add or verify light links where stable public versions exist.
   - Avoid over-linking every sentence; prefer source notes at section level.

3. **Local render / visual QA**
   - Run `quarto render` locally.
   - Check mobile rendering around 320px.
   - Confirm `$lime` accent colour does not bleed into light paper sections.

4. **Optional later pass**
   - Decide whether `smm_guide.qmd` should be updated as a legacy/PDF source or explicitly archived as no longer maintained.

---

## Editing principle

Preserve the site's practitioner voice. The goal is not to turn it into a cautious literature review. The goal is to add enough academic scaffolding that readers can tell the difference between:

- Dervin's own formulations,
- this course's synthesis of Dervin's work,
- and independent applied extensions for analytics, UX, product, and AI-tool practice.
