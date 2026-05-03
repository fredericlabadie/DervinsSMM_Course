const baseUrl = (process.env.SMM_API_BASE_URL || 'http://localhost:3000').replace(/\/$/, '');

async function request(label, path, options = {}) {
  const response = await fetch(`${baseUrl}${path}`, options);
  const text = await response.text();
  console.log(`\n## ${label}`);
  console.log('status', response.status);
  console.log(text);

  if (!response.ok) {
    throw new Error(`${label} failed with status ${response.status}`);
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

await request('health', '/api/health');

await request('rewrite', '/api/rewrite', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    question: 'Did you find the pricing information clear?',
  }),
});

await request('feedback', '/api/feedback', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'issue',
    question: 'Smoke test feedback',
    rewrite: '',
    gap: '',
    category: 'smoke-test',
    comment: 'Automated local smoke test. Delete this row if it was sent to production by mistake.',
    model: '',
    prompt_version: 'smoke-test',
    page: baseUrl,
    source: 'smoke_test',
  }),
});
