# Medical Physics Periodic Test 1 — Study + Quiz Portal

Local, GitHub-ready folder for **Phys101 Medical Physics** formative / Periodic Test 1 study material and a practice quiz portal.

**Scope:** Chapters 1–3 **through Bernoulli only** (no viscosity / Poiseuille / Laplace / Reynolds / surface tension deep content).

## Layout

```
medphys-pt1/
  README.md
  NOTES.md
  index.html              # study shell (3 chapter tabs + Open Quiz Portal)
  quiz/index.html         # quiz portal (adapted skeleton; bank via fetch)
  data/bank.json          # 198-item question bank
  content/
    chapter-1.md          # Matter & mechanical properties (incl. Hooke's law theory)
    chapter-2.md          # Fluids at rest
    chapter-3.md          # Fluid flow through Bernoulli
```

## Run locally

`fetch` for Markdown / JSON does **not** work reliably from `file://`. Use a static server:

```bash
cd medphys-pt1
python3 -m http.server 8080
# open http://localhost:8080/
# quiz: http://localhost:8080/quiz/
```

## GitHub Pages

If this repo is published at `https://<user>.github.io/<repo>/`:

- Study: `https://<user>.github.io/<repo>/`
- Quiz: `https://<user>.github.io/<repo>/quiz/`
- Bank fetch path used by the quiz: `../data/bank.json` → `https://<user>.github.io/<repo>/data/bank.json`

No remote is configured yet; this folder is prepared locally only.

## Product links

- Study header: **Open Quiz Portal** (next to Fullscreen) → `quiz/index.html`
- Quiz hub + quiz run header: **Return to study** → `../index.html`

## Fonts (design tokens only)

From the Hooke's Law **practical** HTML reference (not exam content):

- **Instrument Serif** — headings (`--head`)
- **Outfit** — body (`--body`)
- **Space Mono** — mono / UI chrome (`--mono`)

Hooke's **law theory** belongs in Chapter 1 study content; the practical worksheet itself is not study material.

## Quiz bank

- Source copy: `data/bank.json` (198 items: MCQ + matching)
- Categories align to the three chapters
- Load-JSON UI was removed from the skeleton; the bank loads automatically via `fetch`

See `NOTES.md` for decisions and what was stripped from the quiz skeleton.
