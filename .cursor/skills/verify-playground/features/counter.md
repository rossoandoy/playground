# Counter

## Sub-features

- Increment button
- Live count display

## How to get to it (user POV)

Open the app home page. The Counter section is below the primary nav link "Counter" (`#counter`).

## Driving it with Playwright

1. Goto base URL.
2. Read `[data-testid="count"]` text as N.
3. Click `[data-testid="count-inc"]`.
4. Assert count text is N+1.
5. Screenshot `evidence/counter.png`.

## Gotchas

- Count starts at 0 on fresh load; remount resets it.
