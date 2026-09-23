import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'
import { parseArgs } from 'node:util'
import path from 'node:path'

const { values } = parseArgs({
  options: {
    'base-url': { type: 'string', default: 'http://127.0.0.1:4173' },
    feature: { type: 'string', default: 'counter' },
    out: { type: 'string', default: 'evidence' },
  },
})

const baseUrl = values['base-url']
const feature = values.feature
const outDir = values.out

await mkdir(outDir, { recursive: true })
const browser = await chromium.launch({ headless: true })
const page = await browser.newPage()
await page.goto(baseUrl, { waitUntil: 'networkidle' })

let result
if (feature === 'counter') {
  const before = Number(await page.locator('[data-testid="count"]').innerText())
  await page.locator('[data-testid="count-inc"]').click()
  const after = Number(await page.locator('[data-testid="count"]').innerText())
  if (after !== before + 1) throw new Error(`expected ${before + 1}, got ${after}`)
  const shot = path.join(outDir, 'counter.png')
  await page.screenshot({ path: shot, fullPage: true })
  result = { feature, before, after, screenshot: shot, ok: true }
} else if (feature === 'notes') {
  const text = `note-${Date.now()}`
  await page.locator('[data-testid="note-input"]').fill(text)
  await page.locator('[data-testid="note-add"]').click()
  await page.locator('[data-testid="note-list"] li', { hasText: text }).waitFor()
  const shot = path.join(outDir, 'notes.png')
  await page.screenshot({ path: shot, fullPage: true })
  result = { feature, text, screenshot: shot, ok: true }
} else {
  throw new Error(`unknown feature: ${feature}`)
}

const resultPath = path.join(outDir, `${feature}-result.json`)
await writeFile(resultPath, JSON.stringify(result, null, 2))
console.log(JSON.stringify(result, null, 2))
await browser.close()
