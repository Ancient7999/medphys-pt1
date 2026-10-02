# Product notes — Medical Physics PT1 portal

## Decisions

1. **Study = 3 chapter tabs** (not one tab per lecture section). Long chapters scroll inside the panel.
2. **Open Quiz Portal** sits next to **Fullscreen** on the study shell.
3. Quiz has **Return to study** on the hub and on the in-run header (Main Menu still returns to the quiz hub).
4. **Fonts** copied as design tokens from Hooke's practical reference only: Instrument Serif / Outfit / Space Mono. Do **not** include Hooke's practical lab worksheet as exam/study prose. Hooke's **law** theory remains in Ch1.
5. **Ch3 stops at Bernoulli** (continuity + Bernoulli + medical apps). Explicit exclusions: viscosity, Poiseuille, Laplace, Reynolds, surface tension / surfactant / alveoli deep dive.
6. **Bank** is the merged formative bank (`medical-physics-bank-final.json` → `data/bank.json`), 198 items, Form A.
7. **No GitHub push** in this pass — local folder (+ optional `git init` without remote).

## Quiz skeleton adaptation

Source skeleton attachment HTML was copied to `quiz/index.html` and adapted.

### Stripped / removed

- Hub **Load bank JSON** control (`<label class="fs-btn file-btn">` + `<input type="file" id="bankFile">`)
- `#bankFile` `change` listener + `FileReader` JSON ingest path
- Hub copy that asked the user to “load a bank / compatible JSON file”
- `renderHub` empty-state text that documented the load-JSON expected shape (replaced with a fetch / `file://` note)
- Default Inter + JetBrains Mono font import (replaced with Hooke tokens)

### Kept / wired

- Category / Form / Mixture mode tabs, shuffle prefs, solved progress, reset solved, matching + MCQ engine, mood/timer chrome from skeleton
- `ingestBank()` + hub card grid
- Auto-load: `fetch('../data/bank.json')` (fallbacks `./data/bank.json`, `/data/bank.json`)
- Return-to-study navigation to `../index.html`
- Title / hub branding for Medical Physics PT1

### file:// vs Pages

Browsers block `fetch` of local JSON/Markdown under `file://`. Use `python3 -m http.server` or GitHub Pages. Relative bank path from quiz page: `../data/bank.json`.

## Study content

Copied from `/workspace/study-content/chapter-{1,2,3}.md` (ready teaching Markdown). Study `index.html` fetches those files and runs a lightweight client Markdown renderer (tables/headings/lists/code). Polish / richer MD later.

## Out of scope for this folder pass

- Pushing a remote / enabling Pages
- Firebase / multiplayer / exam-form lockdown from other medphys portals
- Full visual polish parity with Hooke practical beyond font tokens
