# Medical Physics Periodic Test 1 — Main Menu · Study · Quiz

GitHub Pages app for **Phys101 Medical Physics** Periodic Test 1.

**Scope:** Chapters 1–3 **through Bernoulli only**.

## Layout

```
medphys-pt1/
  index.html                 # Main menu (Quiz / Study / About)
  study.html                 # folded chapter study (Hooke demure; system cursor)
  quiz/index.html            # quiz portal (bank via fetch)
  css/
    theme-vars.css           # theme tokens (default accent #FF8800)
    colorizer.css            # vendor (unused on main menu)
    app.css                  # main menu + study chrome
  js/
    particles.js             # vendor (quiz mood FX path)
    colorizer-theme.js       # vendor theme engine (quiz; default amber)
    study-app.js             # markdown + accordion
    cursor-idle.js           # ATC brushCursor idle auto-hide (Main Menu only)
  assets/
    colorizer-panel.fragment.html  # vendor fragment (unused)
  data/bank.json
  content/chapter-1.md … chapter-3.md
```

## Main menu

Title: **Medical Physics · Periodic Test 1** · shared colorizer theme via `atc_theme_color_v1` (default **#FF8800**; change in Quiz ⚙ Settings — hub/study follow)

| Item | Behaviour |
|------|-----------|
| **Quiz Interface** | Hero CTA → `quiz/` · forms by chapter |
| **Study Interface** | Quiet → `study.html` (chapters collapsed) |
| **About** | How to use · scope · tips |

## Quiz forms

- Chapter 1: Matter and Mechanical Properties
- Chapter 1: Stress, Strain & Young's Modulus
- Chapter 2: Fluids at Rest (all Ch2 cats)
- Chapter 3: Mass Flow & Bernoulli
- **Formulas** — unlimited auto-generated calculation practice (Ch1–3 through Bernoulli). Separate card counters; does **not** affect chapter solved progress. Tap **Show formula** for the symbolic rearrangement.

Generator module: `quiz/formula-gen.js` (`FORMULA_METADATA` + `QUESTION_GENERATORS`). Storage: `pt1_formula_count`, `pt1_formula_mastery_v1`.

Shuffle prefs live under **Quiz settings**. From a run, **Return to interface** goes to the forms list (not the main menu).

## Run locally

```bash
cd medphys-pt1
python3 -m http.server 8080
# Main:  http://localhost:8080/
# Study: http://localhost:8080/study.html
# Quiz:  http://localhost:8080/quiz/
```

## GitHub Pages

- Main: `https://ancient7999.github.io/medphys-pt1/`
- Study: `https://ancient7999.github.io/medphys-pt1/study.html`
- Quiz: `https://ancient7999.github.io/medphys-pt1/quiz/`
