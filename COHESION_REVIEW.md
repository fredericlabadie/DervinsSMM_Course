# Site Cohesion Review

*Project:* Dervin's Sense-Making Methodology course  
*Date:* May 2026  
*Purpose:* Track navigation, page-role, terminology, and contextual-cohesion decisions.

---

## Current navigation decision

Visible navigation is now:

1. **Orientation** — how to use the site and where each page fits
2. **Theory** — central metaphor, SGBO, assumptions, bibliography, in memoriam
3. **Method** — practitioner gap pictures, MMTLI, neutral questioning, analysis protocol, analytics application
4. **Practice** — live question rewriter and active recall; also the homepage
5. **Fieldwork** — worked scenarios, practice projects, ethics, applied examples

The URL for Orientation remains `bridge.html` for compatibility, but visible copy should use **Orientation**, not Bridge. "Bridge" should be reserved for the SMM concept: the resource, help, or construction used to move across a gap.

---

## Current site architecture tension

`index.qmd` is both the homepage and the Practice page. This is a valid product decision because the Question Rewriter is the primary interactive feature. It does create one asymmetry:

- first-time visitors may land on Practice first,
- but the conceptual path begins with Orientation.

Current mitigation: the Practice page callout says "New here? Read the Orientation for a one-minute map..." This is the right pattern. Do not make Orientation the homepage unless the project changes from tool-first to course-first.

---

## Page-role cohesion

### Orientation

Role: map the site and explain the two-layer design: practitioner top layer + academic depth.

Current status: coherent. The page uses the four-part path Theory → Method → Practice → Fieldwork while acknowledging that users can skip to the rewriter.

### Theory

Role: establish the central metaphor, the course SGBO shorthand, assumptions, sense-unmaking, contrast with transmission models, comparisons, and sources.

Current status: coherent after modularisation and plate-order fix. Watch for two risks:

- Do not let SGBO drift into being described as a timeless exact Dervin formulation.
- Keep visible plate order aligned with page flow, even though module file names are not alphabetically sequential.

### Method

Role: teach how to diagnose discontinuities and how to ask/study them.

Current status: conceptually coherent, but it carries two sub-roles: gap pictures and interview/analysis protocol. This is acceptable because both are methods, but the page should keep explaining that the gap labels are practitioner heuristics and that MMTLI/neutral questioning are the stronger methodological core.

Possible later improvement: if the Method page grows, split it into `method.qmd` for gap pictures and `fieldwork.qmd` for interviewing/analysis. Not necessary now.

### Practice

Role: let users do something immediately with the Question Rewriter, then practice recall.

Current status: coherent. Keep the practicum-tool warning close to the rewriter so the AI output does not appear to be an academic authority.

### Fieldwork

Role: applied examples, worked scenarios, practice projects, ethics.

Current status: coherent. The page is the applied lab of the site. It should continue to say examples are applied translations and practitioner labels, not formal Dervin categories.

---

## Terminology rules

Use these consistently:

- **Orientation** for the page / nav label.
- **Bridge** only for the SMM concept.
- **Practice** for the live tool and active-recall page.
- **Question Rewriter** for the tool itself.
- **Practitioner labels** or **gap pictures** for the six-label display.
- **Course synthesis** for seven assumptions and SGBO shorthand.
- **Applied translation** for examples, scenarios, and product/analytics mappings.

Avoid:

- "Dervin's taxonomy" for the six labels.
- "six gaps" without a nearby heuristic caveat.
- "Study gaps, not needs" as a slogan without explaining that needs are studied as situated gaps/questions.
- "Bridge" as a page title or generic navigation term.

---

## Remaining cohesion issues

1. **CSS class names still say bridge**
   - Classes like `bridge-intro`, `bridge-path`, and `bridge-step` remain in `bridge.qmd` and `custom.scss`.
   - This is technical debt only; it does not affect visible site cohesion.
   - Rename only in a dedicated styling/refactor pass to avoid CSS regressions.

2. **Legacy file warning**
   - `smm_guide.qmd` is marked as legacy in docs, but the file itself does not visibly warn readers.
   - Because the file is large and connector output truncates, add a top warning only from a local editor or after splitting/archiving it.

3. **Method page dual role**
   - The Method page includes both diagnostic labels and MMTLI/protocol sections.
   - This is acceptable now, but if the page becomes crowded, split the interview/protocol material into Fieldwork or a new `protocol.qmd`.

4. **Homepage vs. course path**
   - Practice is the homepage; Orientation is the conceptual start.
   - This is intentional. Keep the Practice callout visible for new visitors.

---

## Recommendation

Do not rename files yet. Keep the stable URLs:

- `bridge.html` for Orientation
- `index.html` for Practice / homepage

The next cohesion work should be small and visible:

1. Keep documentation aligned with the Orientation label.
2. Add page-level "what this page is for" copy only where a page's function is ambiguous.
3. Avoid broad URL restructures until the site has more external links or analytics data showing user confusion.
