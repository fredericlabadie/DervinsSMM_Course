const endpoint = process.env.SMM_API_URL || 'http://localhost:3000/api/rewrite';

const response = await fetch(endpoint, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    question: 'Did you find the pricing information clear?',
  }),
});

console.log('status', response.status);
console.log(await response.text());
