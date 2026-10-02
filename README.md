# Medical Physics Periodic Test 1 — Hub · Study · Quiz

GitHub Pages app for **Phys101 Medical Physics** Periodic Test 1.

**Scope:** Chapters 1–3 **through Bernoulli only**.

## Layout

```
medphys-pt1/
  index.html                 # ATC-style hub (Quiz / Study / Options)
  study.html                 # folded chapter study
  quiz/index.html            # quiz portal (bank via fetch)
  css/
    theme-vars.css           # COPIED from calculator (unchanged)
    colorizer.css            # COPIED from calculator (unchanged)
    app.css                  # hub + study chrome (Hooke fonts + accent bridge)
  js/
    particles.js             # COPIED from calculator (unchanged)
    colorizer-theme.js       # COPIED from calculator (unchanged)
    study-app.js             # markdown + accordion
  assets/
    colorizer-panel.fragment.html  # COPIED (unchanged)
  data/bank.json
  content/chapter-1.md … chapter-3.md
```

## Hub menu

Title: **Medical Physics · Periodic Test 1**

| Item | Behaviour |
|------|-----------|
| **Quiz Interface** | Hero CTA (flowing glow + glossy shine) → `quiz/` |
| **Study Interface** | Quiet / demure → `study.html` (chapters collapsed) |
| **Options** | Mounts calculator colorizer (presets, strength, `atc_theme_color_v1`) |

Script order on pages that theme: `particles.js` → `colorizer-theme.js`.

## Run locally

```bash
cd medphys-pt1
python3 -m http.server 8080
# Hub:   http://localhost:8080/
# Study: http://localhost:8080/study.html
# Quiz:  http://localhost:8080/quiz/
```

## GitHub Pages

- Hub: `https://ancient7999.github.io/medphys-pt1/`
- Study: `https://ancient7999.github.io/medphys-pt1/study.html`
- Quiz: `https://ancient7999.github.io/medphys-pt1/quiz/`

## Fonts

Instrument Serif · Outfit · Space Mono (Hooke demure), driven by colorizer `--accent-*`.
