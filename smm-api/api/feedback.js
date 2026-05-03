const DEFAULT_ALLOWED_ORIGINS = [
  'https://smm.fredericlabadie.com',
  'http://localhost:4200',
  'http://127.0.0.1:4200',
];

const VALID_TYPES = new Set(['useful', 'inaccuracy', 'issue']);

function getAllowedOrigins() {
  const configured = process.env.ALLOWED_ORIGINS;
  if (!configured) return DEFAULT_ALLOWED_ORIGINS;
  return configured.split(',').map((s) => s.trim()).filter(Boolean);
}

function applyCors(req, res) {
  const origin = req.headers.origin || '';
  const allowed = getAllowedOrigins();
  const allowOrigin = allowed.includes(origin) ? origin : allowed[0];
  res.setHeader('Access-Control-Allow-Origin', allowOrigin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store');
}

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 50_000) {
        reject(new Error('Request body too large.'));
        req.destroy();
      }
    });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

function clean(value, max = 4000) {
  return String(value || '').trim().slice(0, max);
}

function normalizePayload(payload, req) {
  const type = clean(payload.type, 40);
  if (!VALID_TYPES.has(type)) {
    const err = new Error('Feedback type must be useful, inaccuracy, or issue.');
    err.code = 'BAD_TYPE';
    throw err;
  }

  return {
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    type,
    question: clean(payload.question),
    rewrite: clean(payload.rewrite),
    gap: clean(payload.gap, 80),
    comment: clean(payload.comment, 2000),
    model: clean(payload.model, 160),
    prompt_version: clean(payload.prompt_version, 80),
    page: clean(payload.page, 240),
    user_agent: clean(req.headers['user-agent'], 500),
    source: clean(payload.source, 80),
  };
}

export default async function handler(req, res) {
  applyCors(req, res);

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    sendJson(res, 405, {
      ok: false,
      error: { code: 'METHOD_NOT_ALLOWED', message: 'Use POST.' },
    });
    return;
  }

  let parsed;
  try {
    const body = await readBody(req);
    parsed = body ? JSON.parse(body) : {};
  } catch {
    sendJson(res, 400, {
      ok: false,
      error: { code: 'BAD_JSON', message: 'Invalid JSON body.' },
    });
    return;
  }

  let feedback;
  try {
    feedback = normalizePayload(parsed, req);
  } catch (err) {
    sendJson(res, 400, {
      ok: false,
      error: { code: err.code || 'BAD_REQUEST', message: err.message },
    });
    return;
  }

  // Temporary storage strategy: explicit feedback is logged in Vercel runtime logs.
  // Upgrade path: write this object to Vercel Postgres / Neon with review status fields.
  console.log('smm-feedback', feedback);

  sendJson(res, 200, {
    ok: true,
    id: feedback.id,
    message: 'Feedback recorded.',
  });
}
