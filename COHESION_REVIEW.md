# Site Cohesion Review

*Project:* Dervin's Sense-Making Methodology course  
*Date:* May 2026  
*Purpose:* Document naming, navigation, and contextual-cohesion observations after the theory modularisation pass.

---

## Current page roles

Current navigation:

1. **Bridge** — orientation / entry page
2. **Theory** — central metaphor, SGBO, assumptions, bibliography
3. **Method** — practitioner gap pictures, MMTLI, neutral questioning, analytics application
4. **Practice** — live question rewriter and active recall
5. **Fieldwork** — worked examples, ethics, practice template

The structure is conceptually sound, but the label **Bridge** is doing double duty. In Dervin's vocabulary, bridge is already a core theoretical term. As a page title, it can feel disembodied because it names a concept rather than the page's function. The page itself is an orientation and reading path.

---

## Recommended navigation names

### Preferred set

Use functional page names while preserving SMM language inside the pages:

- **Start** (`bridge.qmd`) — orientation / how to use the site
- **Theory** (`theory.qmd`) — central metaphor and academic grounding
- **Method** (`method.qmd`) — gap pictures, MMTLI, neutral questioning
- **Practice** (`index.qmd`) — rewriter + active recall
- **Fieldwork** (`fieldwork.qmd`) — applied examples, ethics, template

Why: this gives visitors a conventional entry point without flattening the conceptual language. "Start" says what the page does. "Bridge" can remain as a section idea or thematic metaphor.

### Alternate set

If the site should feel more like a course path:

- **Start**
- **Grounding**
- **Method**
- **Instrument**
- **Fieldwork**

Why: this is more instructional, but slightly less immediately recognizable than Theory / Practice.

### Keep as-is only if

Keep **Bridge** only if the intent is explicitly poetic / thematic navigation. If so, add a parenthetical label in the nav or page header, e.g. **Bridge / Start here**. Otherwise the term competes with SMM's own bridge concept.

---

## Cohesion observations

### 1. Entry route vs. homepage route

`index.qmd` is the homepage and the practice tool, while `bridge.qmd` is the orientation page. This is a valid product choice because the tool is the main interactive feature. But it creates a conceptual asymmetry: visitors land on Practice first, then are told to go to Bridge.

Recommendation: keep `index.qmd` as Practice if the rewriter is the primary feature, but rename Bridge to **Start** and keep the callout on Practice: "New here? Start with Start / Orientation."

### 2. Plate numbering across pages

Plate numbering is local to each page, not global. That is fine, but each page should keep its own internal sequence. Theory now displays Plate I → Plate II → Plate III... after the order fix.

Potential future improvement: add page-specific prefixes in comments only, not visible UI, to avoid confusing module file order with plate order.

### 3. Practitioner vs. academic layer

The site is now strongest when each section clearly signals one of three statuses:

- Dervin's formulation
- Course synthesis
- Practitioner application

This pattern is already present in the theory, method, and practice pages. It should remain the editorial rule for future additions.

### 4. Runtime tool vs. academic source

The Practice page correctly says the rewriter is a practicum tool, not an academic authority. Keep this language close to the tool, because the tool can otherwise make the practitioner labels feel more canonical than they are.

### 5. Legacy file risk

`smm_guide.qmd` is marked as legacy in `legacy/README.md`, but the file itself still renders if someone opens it directly. Future improvement: add a warning callout at the top of `smm_guide.qmd` if the file can be safely edited locally. The connector should avoid full-file edits to `smm_guide.qmd` because it is large and truncates.

---

## Recommended next naming change

Make a small, separate PR:

- Change nav label from **Bridge** to **Start** in `_includes/header.html` and `_includes/footer.html`.
- Keep the file path `bridge.html` for now to avoid breaking links.
- Change `bridge.qmd` `pagetitle` to `Start — Orientation`.
- Change visible eyebrow from `§ Bridge · Orientation` to `§ Start · Orientation`.
- Change the Practice callout from `Start with Bridge` to `Start here` or `Start with the orientation`.

This is low-risk and improves cohesion without restructuring URLs.
