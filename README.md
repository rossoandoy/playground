# playground

Tiny Vite + React + TypeScript app for verification-skill experiments.

## Run locally

```bash
npm install
npm run dev
```

- Dev server: `http://127.0.0.1:5173` (port 5173, strict)
- Ready when the terminal prints the local URL and the browser shows **Playground** with Counter and Notes

## Features

- **Counter** — Increment button; live count at `data-testid="count"`
- **Notes** — input `note-input`, button `note-add`, list `note-list`

## Scripts

- `npm run dev` — Vite dev server
- `npm run build` — typecheck + production build
- `npm run preview` — preview the build
