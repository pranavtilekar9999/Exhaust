# EXHAUST — Where Software Meets Hardware

```
exhaust-website/
├── frontend/          Static site: HTML, CSS, vanilla JS
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── assets/logo.png
└── backend/           Express server
    ├── server.js      Serves the frontend + POST/GET /api/contact
    └── package.json
```

## Run it

```
cd backend
npm install
npm start
```

Then open http://localhost:3000 — the backend serves the frontend directly and
handles contact form submissions at `/api/contact` (stored in memory; swap in
a real database for production).

To work on the frontend alone without the backend, you can also just open
`frontend/index.html` in a browser — only the contact form submit needs the
server running.
