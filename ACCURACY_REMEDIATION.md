# Academic Accuracy Remediation Log

*Branch:* `refactor/theory-modules`  
*Project:* Dervin's Sense-Making Methodology course  
*Purpose:* Keep a durable handoff record for academic accuracy review and iteration.

---

## Current status

The site has completed a first academic-framing pass, a targeted bibliography verification pass, and a theory-page modularisation pass. The current live-source posture is now:

- `README.md` describes the live site as a five-page Quarto site rather than a single `smm_guide.qmd` source.
- `ForAI.md` documents the Claude / Claude Design / ChatGPT development timeline and the current runtime AI architecture.
- `method.qmd` reframes the former "six gaps" section as **gap pictures for practice** rather than a canonical Dervin taxonomy.
- `js/smm-data.js` labels the six categories as practitioner gap labels, with `Role` marked as a course extension.
- `js/smm-rewriter.js` instructs the model to treat the labels as a course heuristic, not a canonical six-part Dervin taxonomy.
- `index.qmd` warns that the rewriter is a practicum tool rather than an academic authority.
- `_includes/footer.html` distinguishes Dervin's theoretical foundation from independent practitioner examples, teaching heuristics, diagrams, and applications.
- `theory.qmd` is now a small include wrapper over `theory/*.qmd`, making future academic and bibliography edits safer.
- `theory/07-bibliography.qmd` now mirrors the verified citation details from `README.md`.
- `fieldwork.qmd` frames worked scenarios and rewrite examples as applied translations using practitioner labels, not formal Dervin categories.
- `legacy/README.md` marks `smm_guide.qmd` as archival / not maintained source.

---

## Six-gap framework decision

The six-label display is useful for practitioners because it gives analysts, UX researchers, and product teams a fast way to notice the **shape** of a user's discontinuity instead of coding only by topic. It should therefore remain in the course for now.

The accuracy constraint is that the course must not teach the six labels as Dervin's own settled taxonomy. The safer framing is:

> Dervin's primary texts describe movement states or stops, including decision, barrier, problematic, spin-out, and wash-out. This course uses a six-label practitioner display as a teaching heuristic grounded where possible in that framing. `Role` is retained as an applied course extension for organisational, UX, and product work.

This keeps the practical value while avoiding the strongest academic misalignment.

---

## Theory-page remediation status

The theory page is now modular:

- `theory.qmd` — include wrapper only
- `theory/01-hero.qmd` — page header, central metaphor, abstract front-matter card
- `theory/02-assumptions.qmd` — seven-point course synthesis of Dervin's methodological stance
- `theory/03-sense-unmaking.qmd` — later sense-unmaking framing and practitioner application
- `theory/04-transmission-model.qmd` — SMM vs. transmission-model comparison
- `theory/05-comparative-analysis.qmd` — neighbouring frameworks table
- `theory/06-sgbo.qmd` — course S-G-B-O teaching shorthand and diagram
- `theory/07-bibliography.qmd` — verified bibliography / recommended reading
- `theory/08-in-memoriam.qmd` — Dervin memorial note

This addresses the earlier connector problem where large raw-HTML files were being truncated and risky to edit.

---

## Bibliography verification status

The core bibliography entries have been checked against targeted public bibliographic records and DOI/library pages. `README.md` and `theory/07-bibliography.qmd` now contain verified citation details for:

- Dervin (1983), “Information as a user construct: The relevance of perceived information needs to synthesis and interpretation.”
- Dervin (1992), “From the mind’s eye of the user: The Sense-Making qualitative-quantitative methodology.”
- Dervin & Nilan (1986), “Information needs and uses.”
- Dervin (1998), “Sense-making theory and practice: An overview of user interests in knowledge seeking and use.”
- Dervin (1999), “On studying information seeking methodologically: The implications of connecting metatheory to method.”
- Dervin, Foreman-Wernet, & Lauterbach (Eds.) (2003), *Sense-Making Methodology Reader: Selected Writings of Brenda Dervin*.

Notes:

- Dervin (1983) has a page-range discrepancy in secondary records: some list pp. 153–183; PhilPapers lists pp. 155–183. Keep a note until checked against the physical book or a library scan.
- The 2003 reader has page-count discrepancies in retailer records; library records list xv, 397 pages and should be preferred.
- Dervin (1998) and Dervin (1999) have DOI-backed records.

---

## Remaining work

1. **Local render / visual QA**
   - Run `quarto render` locally.
   - Check `theory.html` after the modular include refactor.
   - Check mobile rendering around 320px.
   - Confirm `$lime` accent colour does not bleed into light paper sections.

2. **Primary-source links**
   - Add or verify light links where stable public versions exist.
   - Avoid over-linking every sentence; prefer source notes at section level.

3. **Optional later pass**
   - If a maintained PDF is needed, create a new `print.qmd` that includes the live modular sections rather than reviving `smm_guide.qmd`.

---

## Editing principle

Preserve the site's practitioner voice. The goal is not to turn it into a cautious literature review. The goal is to add enough academic scaffolding that readers can tell the difference between:

- Dervin's own formulations,
- this course's synthesis of Dervin's work,
- and independent applied extensions for analytics, UX, product, and AI-tool practice.
