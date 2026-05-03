# Codex Vibe Room Handoff — SMM Course
*Prepared after PR #20 · May 2026*

This file is the starting context for Codex or another engineering agent taking over technical work on the SMM course repo.

## Current production split

```text
smm.fredericlabadie.com      → GitHub Pages static Quarto course
smm-api.fredericlabadie.com  → Vercel serverless API project, root directory smm-api/
```

The course site is static after Quarto render. Runtime AI and feedback are handled by the Vercel API.

## What just changed

Recent merged PRs:

```text
#14  Scaffold dedicated SMM rewriter API
#15  Use Hugging Face router for SMM API
#16  Allow browser testing for SMM API
#17  Switch rewriter frontend to dedicated SMM API and add rewriter feedback UI
#18  Store feedback in Neon when available
#19  Add academic accuracy feedback control
#20  Fix footer and academic feedback spacing
```

The old Writers Room proxy is no longer the course frontend target. The current frontend calls the dedicated API:

```text
POST https://smm-api.fredericlabadie.com/api/rewrite
POST https://smm-api.fredericlabadie.com/api/feedback
```

## Current runtime architecture

```text
index.qmd / js/smm-rewriter.js
  1. local example matching from js/smm-data.js
  2. POST /api/rewrite on smm-api.fredericlabadie.com
  3. offline heuristic fallback if the API fails

_includes/footer.html
  site-wide academic accuracy feedback control
  POST /api/feedback with source = academic_content

smm-api/api/rewrite.js
  Vercel function
  Hugging Face Inference Providers router
  model from HF_MODEL env var
  returns stable JSON contract

smm-api/api/feedback.js
  Vercel function
  validates explicit user feedback
  writes to Neon/Postgres when DATABASE_URL / POSTGRES_URL / POSTGRES_PRISMA_URL is present
  logs to Vercel as fallback
```

## Required deployment environment

Vercel project:

```text
Repository: fredericlabadie/DervinsSMM_Course
Root Directory: smm-api
Production domain: smm-api.fredericlabadie.com
```

Expected environment variables:

```text
HF_TOKEN=...
HF_MODEL=deepseek-ai/DeepSeek-V3-0324:fastest
ALLOWED_ORIGINS=https://smm.fredericlabadie.com,http://localhost:4200,http://127.0.0.1:4200
PROMPT_VERSION=smm-rewriter-2026-05
DATABASE_URL=...              # or POSTGRES_URL / POSTGRES_PRISMA_URL from Neon/Vercel integration
```

GitHub Pages domain:

```text
smm.fredericlabadie.com CNAME fredericlabadie.github.io.
```

Repo `CNAME` file should contain:

```text
smm.fredericlabadie.com
```

## Feedback storage

The feedback table is created automatically on first successful DB-backed feedback submission. Schema is also stored at:

```text
smm-api/sql/feedback.sql
```

Useful SQL:

```sql
select created_at, type, gap, source, model, left(question, 80) as question, left(comment, 160) as comment
from smm_feedback
order by created_at desc
limit 25;
```

Feedback sources:

```text
source = ai                 → rewriter AI result feedback
source = local_example      → feedback on a local example rewrite
source = offline_heuristic  → feedback on fallback rewrite
source = academic_content   → footer academic accuracy report
```

## Academic accuracy constraints

Codex should avoid academic-content rewrites unless explicitly asked. This repo has a high risk of accidental overclaiming about Brenda Dervin's Sense-Making Methodology.

Do not change these without human review:

```text
- practitioner gap labels / six-gap heuristic framing
- SGBO caveats
- seven assumptions caveats
- footer attribution language
- bibliography entries
- claims about what Dervin herself published or canonically named
```

Important current framing:

```text
- Six gap labels are a practitioner heuristic, not Dervin's canonical taxonomy.
- Role is a course extension.
- SGBO is a course teaching shorthand / practitioner model, not a timeless exact Dervin formula.
- The seven assumptions are a course synthesis across sources, not a direct list from one paper.
- The rewriter is a practicum tool, not an academic authority.
```

## Files most likely to need technical work

```text
js/smm-rewriter.js          frontend rewriter + feedback UI
smm-api/api/rewrite.js      dedicated rewrite API
smm-api/api/feedback.js     feedback capture + Neon storage
smm-api/package.json        API dependencies/scripts
smm-api/sql/feedback.sql    manual feedback schema
_includes/footer.html       footer + academic accuracy feedback panel
custom.scss                 sitewide visual system
.github/workflows/render-deploy.yml
```

## First Codex task recommendation

Use this as the first Codex prompt:

```text
Review the DervinsSMM_Course repo after the dedicated SMM API, Neon feedback storage, and academic feedback footer were added. Do a technical sanity pass only. Do not make academic/content rewrites.

Please:
1. Inspect js/smm-rewriter.js, _includes/footer.html, smm-api/api/rewrite.js, smm-api/api/feedback.js, smm-api/package.json, and .github/workflows/render-deploy.yml.
2. Run any available syntax/build checks that are practical in the environment, especially quarto render if Quarto is available and npm install && npm run lint from smm-api if Node is available.
3. Identify deploy/runtime risks around CORS, Vercel root directory, Neon env vars, table creation, error fallback, and mobile footer layout.
4. Propose only a small PR for technical fixes. Do not alter Dervin academic claims, bibliography, or conceptual framing unless a separate content-review task is opened.
```

## Manual smoke test checklist

After any merge touching frontend/API:

```text
1. GitHub Pages deploy completes.
2. Vercel smm-api deploy completes.
3. Open https://smm.fredericlabadie.com.
4. Use a non-example question in the rewriter, such as: Why did users abandon the checkout flow?
5. Confirm no offline heuristic warning appears.
6. Submit Useful feedback under the rewriter.
7. Submit an academic issue from the footer.
8. Confirm Neon table smm_feedback receives both rows.
9. Confirm Vercel logs have no smm-feedback-db-error entries.
10. Resize to mobile width and check footer/report panel spacing.
```

## Known debt / cleanup candidates

```text
- Move footer inline style and academic feedback panel styling into custom.scss if desired.
- Add a tiny API health endpoint for smm-api.
- Add an authenticated review view for smm_feedback, or keep review in Neon console.
- Add a smoke script for /api/feedback as well as /api/rewrite.
- Consider a model bake-off for rewrite quality and JSON reliability.
- Consider stronger schema validation in /api/rewrite and /api/feedback.
```

## Do not do

```text
- Do not add API keys or tokens to the repo.
- Do not point smm.fredericlabadie.com at Vercel unless intentionally migrating the whole static site.
- Do not remove the GitHub Pages CNAME.
- Do not reintroduce the old Writers Room endpoint as the production rewriter API.
- Do not silently log every user rewrite. Feedback should remain explicit and opt-in.
- Do not weaken Brenda Dervin attribution.
```
