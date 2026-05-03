const DEFAULT_WINDOW_MS = 60_000;
const DEFAULT_LIMIT = 30;

const buckets = globalThis.__smmRateLimitBuckets || new Map();
globalThis.__smmRateLimitBuckets = buckets;

function getClientKey(req) {
  const forwarded = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  const realIp = String(req.headers['x-real-ip'] || '').trim();
  const ip = forwarded || realIp || req.socket?.remoteAddress || 'unknown';
  return ip.slice(0, 80);
}

function prune(now) {
  if (buckets.size < 5000) return;
  for (const [key, value] of buckets.entries()) {
    if (value.resetAt <= now) buckets.delete(key);
  }
}

export function checkRateLimit(req, options = {}) {
  const now = Date.now();
  const windowMs = Number(options.windowMs || process.env.RATE_LIMIT_WINDOW_MS || DEFAULT_WINDOW_MS);
  const limit = Number(options.limit || process.env.RATE_LIMIT_MAX || DEFAULT_LIMIT);
  const namespace = options.namespace || 'default';
  const key = `${namespace}:${getClientKey(req)}`;

  prune(now);

  let bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    bucket = { count: 0, resetAt: now + windowMs };
    buckets.set(key, bucket);
  }

  bucket.count += 1;
  const remaining = Math.max(0, limit - bucket.count);

  return {
    allowed: bucket.count <= limit,
    limit,
    remaining,
    resetAt: bucket.resetAt,
    retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
  };
}

export function applyRateLimitHeaders(res, rate) {
  res.setHeader('X-RateLimit-Limit', String(rate.limit));
  res.setHeader('X-RateLimit-Remaining', String(rate.remaining));
  res.setHeader('X-RateLimit-Reset', String(Math.ceil(rate.resetAt / 1000)));
  if (!rate.allowed) res.setHeader('Retry-After', String(rate.retryAfterSeconds));
}
