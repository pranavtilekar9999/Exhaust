const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_DIR = path.join(__dirname, '..', 'frontend');

app.use(express.json());
app.use(express.static(FRONTEND_DIR));

// In-memory store for contact submissions (swap for a real database in production)
const submissions = [];

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'name, email, and message are all required.' });
  }

  const submission = { name, email, message, receivedAt: new Date().toISOString() };
  submissions.push(submission);
  console.log('New contact submission:', submission);

  res.status(200).json({ ok: true, message: 'Message received.' });
});

// Simple endpoint to review submissions during development
app.get('/api/contact', (_req, res) => {
  res.status(200).json({ ok: true, count: submissions.length, submissions });
});

app.get('/health', (_req, res) => res.status(200).json({ status: 'ok' }));

// Fallback to index.html for any other route (single-page site)
app.get('*', (_req, res) => {
  res.sendFile(path.join(FRONTEND_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`EXHAUST server running at http://localhost:${PORT}`);
});
