# SMM Rewriter API

Dedicated Vercel API for the SMM Question Rewriter on `smm.fredericlabadie.com`.

This project is intentionally small and separate from the static Quarto course site. It owns the runtime model call, CORS policy, prompt, response validation, and response contract.

## Deploy as a Vercel project

Create a new Vercel project from this same GitHub repo and set the **Root Directory** to:

```text
smm-api
```

Add environment variables in Vercel:

```text
HF_TOKEN=hf_...
HF_MODEL=HuggingFaceH4/zephyr-7b-beta
ALLOWED_ORIGINS=https://smm.fredericlabadie.com,http://localhost:4200,http://127.0.0.1:4200
PROMPT_VERSION=smm-rewriter-2026-05
```

Recommended production domain:

```text
smm-api.fredericlabadie.com
```

The static course frontend should not be switched to this API until the endpoint is deployed and tested.

## Request contract

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

## Response contract

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
    "model": "HuggingFaceH4/zephyr-7b-beta",
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
    "prompt_version": "smm-rewriter-2026-05"
  }
}
```

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

## Frontend migration plan

After deployment, update `js/smm-rewriter.js` in the course site:

```js
const PROXY_URL = 'https://smm-api.fredericlabadie.com/api/rewrite';
```

and call it with JSON:

```js
fetch(PROXY_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ question })
})
```

The frontend should read `payload.result` when `payload.ok === true`, and fall back to local heuristic mode when `ok === false` or the request fails.
