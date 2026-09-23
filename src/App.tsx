import { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)
  const [draft, setDraft] = useState('')
  const [notes, setNotes] = useState<string[]>([])

  function addNote() {
    const text = draft.trim()
    if (!text) return
    setNotes((prev) => [...prev, text])
    setDraft('')
  }

  return (
    <main>
      <h1>Playground</h1>
      <nav aria-label="Primary">
        <a href="#counter">Counter</a>
        <a href="#notes">Notes</a>
      </nav>

      <section id="counter" aria-labelledby="counter-heading">
        <h2 id="counter-heading">Counter</h2>
        <p aria-live="polite">
          Count: <span data-testid="count">{count}</span>
        </p>
        <button type="button" data-testid="count-inc" onClick={() => setCount((c) => c + 1)}>
          Increment
        </button>
      </section>

      <section id="notes" aria-labelledby="notes-heading">
        <h2 id="notes-heading">Notes</h2>
        <label>
          Note
          <input
            data-testid="note-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') addNote()
            }}
          />
        </label>{' '}
        <button type="button" data-testid="note-add" onClick={addNote}>
          Add
        </button>
        <ul data-testid="note-list">
          {notes.map((n, i) => (
            <li key={`${i}-${n}`}>{n}</li>
          ))}
        </ul>
      </section>
    </main>
  )
}
