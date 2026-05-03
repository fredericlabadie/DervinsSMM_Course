# SMM Rewriter API

Dedicated Vercel API for the SMM Question Rewriter on `smm.fredericlabadie.com`.

This project is intentionally small and separate from the static Quarto course site. It owns the runtime model call, CORS policy, prompt, response validation, feedback capture, and response contract.

## Deploy as a Vercel project

Create a new Vercel project from this same GitHub repo and set the **Root Directory** to:

```text
smm-api
```

Add environment variables in Vercel:

```text
HF_TOKEN=hf_...
HF_MODEL=deepseek-ai/DeepSeek-V3-0324:fastest
ALLOWED_ORIGINS=https://smm.fredericlabadie.com,http://localhost:4200,http://127.0.0.1:4200
PROMPT_VERSION=smm-rewriter-2026-05
```

The Hugging Face token must include permission to make calls to **Inference Providers**. A token that can only read models may authenticate but still fail on chat-completion execution.

Recommended production domain:

```text
smm-api.fredericlabadie.com
```

The static course frontend should not be switched to this API until the endpoint is deployed and tested.

## Runtime provider

The API uses Hugging Face's Inference Providers OpenAI-compatible chat-completions router:

```text
https://router.huggingface.co/v1/chat/completions
```

This replaced the earlier prototype call to `https://api-inference.huggingface.co/models/...`, which is brittle for chat workloads and many larger LLMs.

## Rewrite request contract

Preferred request:

```json
{
  "question": "Did you find the pricing information clear?"
}
```

Compatibility request, useful while migrating from the old frontend:

```json
{
  "prompt": "<|system|>..."
}
```

Raw `text/plain` bodies are also accepted for legacy compatibility.

Browser-only test URL:

```text
https://smm-api.fredericlabadie.com/api/rewrite?question=Did%20you%20find%20the%20pricing%20information%20clear%3F
```

The browser test route exists for phone/debug convenience. The production course frontend should still use POST.

## Rewrite response contract

Success:

```json
{
  "ok": true,
  "source": "ai",
  "result": {
    "diagnosis": ["...", "...", "..."],
    "rewrite": "...",
    "gap": "decision",
    "why": "...",
    "diff": [
      { "kind": "cut", "text": "..." },
      { "kind": "add", "text": "..." }
    ]
  },
  "meta": {
    "model": "deepseek-ai/DeepSeek-V3-0324:fastest",
    "provider": "huggingface-router",
    "prompt_version": "smm-rewriter-2026-05",
    "latency_ms": 1234
  }
}
```

Failure:

```json
{
  "ok": false,
  "error": {
    "code": "MODEL_ERROR",
    "message": "Model request failed."
  },
  "meta": {
    "prompt_version": "smm-rewriter-2026-05",
    "provider_status": 401,
    "provider_message": "Invalid username or password."
  }
}
```

## Feedback endpoint

The course frontend can submit explicit, opt-in feedback to:

```text
POST /api/feedback
```

Accepted feedback types:

```text
useful
inaccuracy
issue
```

Example payload:

```json
{
  "type": "inaccuracy",
  "question": "Did you find the pricing information clear?",
  "rewrite": "Think about the last time you needed to use our pricing information to make a decision...",
  "gap": "decision",
  "comment": "This label should probably be washout, not decision.",
  "model": "deepseek-ai/DeepSeek-V3-0324:fastest",
  "prompt_version": "smm-rewriter-2026-05",
  "page": "https://smm.fredericlabadie.com/index.html",
  "source": "ai"
}
```

Current storage strategy:

```text
Vercel runtime logs only
```

Search Vercel logs for:

```text
smm-feedback
```

Upgrade path:

```text
Vercel Postgres / Neon table with id, created_at, type, question, rewrite, gap, comment, model, prompt_version, page, status.
```

Privacy rule: feedback is only sent after a user explicitly clicks a feedback action. The frontend warns users not to include personal or sensitive information.

## Local test

```bash
cd smm-api
npm install
cp .env.example .env.local
# edit .env.local with HF_TOKEN
npm run dev
```

Then in another terminal:

```bash
curl -i http://localhost:3000/api/rewrite \
  -H 'Content-Type: application/json' \
  -d '{"question":"Did you find the pricing information clear?"}'
```

PowerShell:

```powershell
Invoke-RestMethod `
  -Uri "http://localhost:3000/api/rewrite" `
  -Method Post `
  -ContentType "application/json" `
  -Body '{"question":"Did you find the pricing information clear?"}'
```

Browser:

```text
http://localhost:3000/api/rewrite?question=Did%20you%20find%20the%20pricing%20information%20clear%3F
```

## Frontend migration plan

The course frontend should call:

```js
const REWRITE_URL = 'https://smm-api.fredericlabadie.com/api/rewrite';
const FEEDBACK_URL = 'https://smm-api.fredericlabadie.com/api/feedback';
```

Rewrite requests use JSON:

```js
fetch(REWRITE_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ question })
})
```

The frontend should read `payload.result` when `payload.ok === true`, and fall back to local heuristic mode when `ok === false` or the request fails.
