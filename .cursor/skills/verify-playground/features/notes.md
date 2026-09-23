# Notes

## Sub-features

- Text input
- Add button
- Note list

## How to get to it (user POV)

Home page, Notes section via nav "Notes" (`#notes`).

## Driving it with Playwright

1. Goto base URL.
2. Fill `[data-testid="note-input"]` with a unique string.
3. Click `[data-testid="note-add"]`.
4. Assert `[data-testid="note-list"]` contains that string.
5. Screenshot `evidence/notes.png`.

## Gotchas

- Empty/whitespace input is ignored.
- Notes are in-memory only; reload clears them.
