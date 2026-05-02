# Academic Accuracy Remediation Log

*Branch:* `accuracy/dervin-smm-remediation`  
*Project:* Dervin's Sense-Making Methodology course  
*Purpose:* Keep a durable handoff record for academic accuracy review and iteration.

---

## Current branch status

This branch starts from the current `main` state after the first academic-framing pass. At the time this log was added, `main` already included the major first-pass corrections discussed in the review:

- `README.md` describes the live site as a five-page Quarto site rather than a single `smm_guide.qmd` source.
- `ForAI.md` documents the Claude / Claude Design / ChatGPT development timeline and the current runtime AI architecture.
- `method.qmd` reframes the former "six gaps" section as **gap pictures for practice** rather than a canonical Dervin taxonomy.
- `js/smm-data.js` labels the six categories as practitioner gap labels, with `Role` marked as a course extension.
- `js/smm-rewriter.js` instructs the model to treat the labels as a course heuristic, not a canonical six-part Dervin taxonomy.
- `index.qmd` warns that the rewriter is a practicum tool rather than an academic authority.
- `_includes/footer.html` distinguishes Dervin's theoretical foundation from independent practitioner examples, teaching heuristics, diagrams, and applications.

---

## Six-gap framework decision

The six-label display is useful for practitioners because it gives analysts, UX researchers, and product teams a fast way to notice the **shape** of a user's discontinuity instead of coding only by topic. It should therefore remain in the course for now.

The accuracy constraint is that the course must not teach the six labels as Dervin's own settled taxonomy. The safer framing is:

> Dervin's primary texts describe movement states or stops, including decision, barrier, problematic, spin-out, and wash-out. This course uses a six-label practitioner display as a teaching heuristic grounded where possible in that framing. `Role` is retained as an applied course extension for organisational, UX, and product work.

This keeps the practical value while avoiding the strongest academic misalignment.

---

## Next remediation targets

1. **`theory.qmd`**
   - Ensure SGBO is presented as a practitioner teaching model, not a timeless formulation across all of Dervin's work.
   - Clarify the chronology: early situations-gaps-uses/helps; later bridge/outcome and sense-unmaking language.
   - Rename or reinforce the "seven assumptions" as a seven-point synthesis, not a direct Dervin enumeration.
   - Mark recursive sense-unmaking diagrams/applications as interpretive visualisations.
   - Soften any remaining transmission-model absolutism.

2. **`fieldwork.qmd`**
   - Add source notes for MMTLI and neutral questioning.
   - Mark worked examples as applied translations for UX/product/analytics practice.

3. **Bibliography / links**
   - Add light direct links to Dervin primary sources where the page makes high-confidence academic claims.
   - Keep the bibliography verification caveat until all formal details are checked against library databases.

---

## Editing principle

Preserve the site's practitioner voice. The goal is not to turn it into a cautious literature review. The goal is to add enough academic scaffolding that readers can tell the difference between:

- Dervin's own formulations,
- this course's synthesis of Dervin's work,
- and independent applied extensions for analytics, UX, product, and AI-tool practice.
