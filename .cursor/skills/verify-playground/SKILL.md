---
name: verify-playground
description: >-
  Drive the playground Vite+React web UI (Counter and Notes) with Playwright.
  Use when proving UI behavior in rossoandoy/playground, or after changing
  Counter/Notes.
---

# verify-playground

Surface: web UI at `http://127.0.0.1:4173` (preview) or `:5173` (dev).
Harness: Playwright Chromium.

## Launch

Prefer a production-like preview for verification:

```bash
npm install
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

Ready when `curl -sf http://127.0.0.1:4173/` returns 200 and the page title is Playground.

Dev alternative: `npm run dev` (port 5173, strict). Tear down with the PID you started; never kill by process name.

## Doctor

```bash
curl -sf -o /dev/null -w '%{http_code}\n' http://127.0.0.1:4173/
```

Expect `200`. Optionally open the page and confirm `h1` text is `Playground`.

## Drive

Use Playwright against the live URL. Stable selectors:

- Counter: `[data-testid="count"]`, `[data-testid="count-inc"]`
- Notes: `[data-testid="note-input"]`, `[data-testid="note-add"]`, `[data-testid="note-list"]`

Helper:

```bash
node scripts/verify-drive.mjs --base-url http://127.0.0.1:4173 --feature counter --out evidence
```

## Evidence

Write under `evidence/` (gitignored proofs are fine locally; keep the directory). Capture:

- screenshot after the action
- a short `result.json` with the observed count or note list text

Proof standards: exercise the real UI path (click Increment / Add), assert the resulting DOM, do not poke React state directly.

## Cleanup

Kill only the preview/dev server PID you started. Leave `evidence/` in place.

## Helpers

- `scripts/verify-drive.mjs` — launches Chromium, drives one feature, writes evidence.
