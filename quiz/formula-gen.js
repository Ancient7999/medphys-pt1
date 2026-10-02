/**
 * Unlimited formula practice generators for Medical Physics PT1
 * Scope: Ch1–3 through Bernoulli only (no viscosity / Poiseuille / Laplace / Reynolds).
 * Architecture mirrors RP quiz pattern: FORMULA_METADATA + QUESTION_GENERATORS + variants.
 */
(function (global) {
  'use strict';

  const G = 9.8;
  const P_ATM = 1.013e5;

  const FORMULA_METADATA = {
    youngs: {
      name: "Young's modulus",
      description: "Y = (F/A) / (ΔL/L) = FL/(AΔL)",
      variants: ['Y', 'ΔL', 'F', 'stress', 'strain']
    },
    density: {
      name: 'Density',
      description: 'ρ = m / V',
      variants: ['ρ', 'm', 'V', 'SG']
    },
    pressureForce: {
      name: 'Pressure & force',
      description: 'P = F / A',
      variants: ['P', 'F', 'A']
    },
    hydrostatic: {
      name: 'Hydrostatic / gauge',
      description: 'P_G = ρ g h',
      variants: ['P_G', 'h', 'ρ']
    },
    absolutePressure: {
      name: 'Absolute pressure',
      description: 'P_abs = P_atm + ρ g h',
      variants: ['P_abs', 'h', 'P_G']
    },
    pascal: {
      name: "Pascal's principle",
      description: 'F₁/A₁ = F₂/A₂',
      variants: ['F₂', 'F₁', 'A₂']
    },
    buoyancy: {
      name: 'Buoyancy (Archimedes)',
      description: 'F_B = ρ_f V_disp g',
      variants: ['F_B', 'V', 'float mass']
    },
    continuity: {
      name: 'Continuity',
      description: 'A₁ v₁ = A₂ v₂',
      variants: ['v₂', 'A₂', 'v₁']
    },
    massFlow: {
      name: 'Mass & volume flow',
      description: 'ṁ = ρ A v · Q = A v',
      variants: ['ṁ', 'Q', 'v']
    },
    bernoulli: {
      name: "Bernoulli's equation",
      description: 'P + ½ρv² + ρgh = const',
      variants: ['ΔP same height', 'v from ΔP', 'full rearrange']
    }
  };

  /* —— helpers —— */
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function randInt(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  function shuffle(a) {
    const x = a.slice();
    for (let i = x.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = x[i]; x[i] = x[j]; x[j] = t;
    }
    return x;
  }

  function fmtSci(n, digits) {
    if (!Number.isFinite(n)) return String(n);
    const d = digits == null ? 3 : digits;
    const abs = Math.abs(n);
    if (abs !== 0 && (abs >= 1e4 || abs < 1e-2)) {
      const exp = Math.floor(Math.log10(abs));
      const mant = n / Math.pow(10, exp);
      let m = mant.toFixed(d).replace(/\.?0+$/, '');
      return m + ' × 10' + toSuperscript(exp);
    }
    if (Number.isInteger(n) || Math.abs(n - Math.round(n)) < 1e-9) return String(Math.round(n));
    const s = n.toFixed(d).replace(/\.?0+$/, '');
    return s;
  }

  function toSuperscript(exp) {
    const map = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻', '+': '⁺' };
    return String(exp).split('').map(function (c) { return map[c] || c; }).join('');
  }

  function fmtWithUnit(n, unit, digits) {
    return fmtSci(n, digits) + (unit ? ' ' + unit : '');
  }

  /** Build MCQ options from correct numeric answer + distractor multipliers. */
  function buildOpts(ans, unit, digits, multipliers) {
    const mults = multipliers || [0.25, 0.5, 2, 4, 0.1, 10, 0.2, 5, 1.5, 0.75];
    const vals = [ans];
    let tries = 0;
    while (vals.length < 4 && tries < 40) {
      tries++;
      const cand = ans * pick(mults);
      if (cand <= 0) continue;
      const minDiff = Math.max(Math.abs(ans) * 0.08, 1e-12);
      if (vals.every(function (v) { return Math.abs(v - cand) >= minDiff; })) vals.push(cand);
    }
    while (vals.length < 4) vals.push(ans * (1 + 0.3 * vals.length));
    const labels = vals.map(function (v) { return fmtWithUnit(v, unit, digits); });
    const order = shuffle([0, 1, 2, 3]);
    const options = order.map(function (i) { return labels[i]; });
    const correct = order.indexOf(0);
    return { options: options, correct: correct };
  }

  function buildStringOpts(correctLabel, wrongLabels) {
    const all = shuffle([correctLabel].concat(wrongLabels.slice(0, 3)));
    while (all.length < 4) all.push(wrongLabels[all.length] || ('— ' + all.length));
    return { options: all.slice(0, 4), correct: all.indexOf(correctLabel) };
  }

  function pack(meta) {
    return {
      type: 'mcq',
      id: 'FORM_' + meta.key + '_' + Date.now().toString(36) + '_' + Math.floor(Math.random() * 1e6).toString(36),
      cat: 'Formulas · ' + (FORMULA_METADATA[meta.key] && FORMULA_METADATA[meta.key].name || meta.key),
      q: meta.q,
      options: meta.options,
      correct: meta.correct,
      explain: meta.explain,
      formulaKey: meta.key,
      _formulaVariant: meta.variant,
      formulaHint: meta.formulaHint,
      formulaName: FORMULA_METADATA[meta.key] && FORMULA_METADATA[meta.key].name,
      formulaEq: FORMULA_METADATA[meta.key] && FORMULA_METADATA[meta.key].description,
      __formulaMode: true
    };
  }

  /* —— generators —— */

  function generateYoungsQuestion() {
    const variant = randInt(0, 4);
    // Choose nice values so Y comes out clean
    const L = pick([0.2, 0.25, 0.3, 0.4, 0.5]); // m
    const A = pick([1e-4, 1.5e-4, 2e-4, 2.5e-4, 5e-4]); // m²
    const F = pick([500, 800, 1000, 1200, 1500, 2000]); // N
    const stress = F / A;
    // pick strain so Y is a round-ish scientific value
    const Ytargets = [1e10, 1.5e10, 2e10, 2.5e10, 1.67e10, 1e11];
    let Y, dL, strain;
    if (variant === 0 || variant === 1 || variant === 2) {
      Y = pick(Ytargets);
      strain = stress / Y;
      dL = strain * L;
    } else {
      strain = pick([0.001, 0.002, 0.0025, 0.004, 0.005]);
      Y = stress / strain;
      dL = strain * L;
    }
    let q, ans, unit, digits, explain, formulaHint;
    if (variant === 0) {
      q = 'A specimen has L = ' + fmtSci(L, 2) + ' m, A = ' + fmtSci(A, 2) + ' m², F = ' + fmtSci(F, 2) + ' N, and ΔL = ' + fmtSci(dL, 3) + ' m. What is Young\'s modulus Y?';
      ans = Y; unit = 'Pa'; digits = 3;
      formulaHint = 'Y = (F/A) ÷ (ΔL/L) = F L / (A ΔL)';
      explain = 'Stress = F/A = ' + fmtSci(stress, 3) + ' Pa. Strain = ΔL/L = ' + fmtSci(strain, 3) + '. Y = stress/strain = ' + fmtSci(Y, 3) + ' Pa.';
    } else if (variant === 1) {
      q = 'A rod (L = ' + fmtSci(L, 2) + ' m, A = ' + fmtSci(A, 2) + ' m²) with Y = ' + fmtSci(Y, 3) + ' Pa is loaded by F = ' + fmtSci(F, 2) + ' N. What is the extension ΔL?';
      ans = dL; unit = 'm'; digits = 3;
      formulaHint = 'From Y = F L / (A ΔL)  →  ΔL = F L / (A Y)';
      explain = 'ΔL = F L / (A Y) = ' + fmtSci(dL, 3) + ' m.';
    } else if (variant === 2) {
      q = 'A sample (L = ' + fmtSci(L, 2) + ' m, A = ' + fmtSci(A, 2) + ' m², Y = ' + fmtSci(Y, 3) + ' Pa) stretches by ΔL = ' + fmtSci(dL, 3) + ' m. What axial force F was applied?';
      ans = F; unit = 'N'; digits = 3;
      formulaHint = 'From Y = F L / (A ΔL)  →  F = Y A ΔL / L';
      explain = 'F = Y A ΔL / L = ' + fmtSci(F, 3) + ' N.';
    } else if (variant === 3) {
      q = 'A force of ' + fmtSci(F, 2) + ' N acts on a cross-section of ' + fmtSci(A, 2) + ' m². What is the stress?';
      ans = stress; unit = 'Pa'; digits = 3;
      formulaHint = 'Stress = F / A';
      explain = 'Stress = F/A = ' + fmtSci(stress, 3) + ' Pa.';
    } else {
      q = 'A rod of original length ' + fmtSci(L, 2) + ' m extends by ' + fmtSci(dL, 3) + ' m. What is the longitudinal strain?';
      ans = strain; unit = ''; digits = 3;
      formulaHint = 'Strain = ΔL / L  (dimensionless)';
      explain = 'Strain = ΔL/L = ' + fmtSci(strain, 3) + ' (no unit).';
    }
    const built = variant === 4
      ? buildOpts(ans, '', digits, [0.5, 2, 0.25, 4, 10, 0.1])
      : buildOpts(ans, unit, digits);
    return pack({
      key: 'youngs', variant: variant, q: q,
      options: built.options, correct: built.correct,
      explain: explain, formulaHint: formulaHint
    });
  }

  function generateDensityQuestion() {
    const variant = randInt(0, 3);
    const dims = pick([
      [5, 6, 8], [3, 4, 5], [6, 7, 8], [4, 5, 6], [2, 5, 8], [8, 5, 3]
    ]);
    const V = dims[0] * dims[1] * dims[2]; // cm³
    const rho = pick([0.25, 0.35, 0.5, 0.75, 0.8, 1.2, 2.5, 2.7, 4.0, 7.8, 8.0]); // g/cm³
    const m = rho * V; // g
    let q, ans, unit, digits, explain, formulaHint, built;
    if (variant === 0) {
      q = 'A block measures ' + dims[0] + ' cm × ' + dims[1] + ' cm × ' + dims[2] + ' cm and has mass ' + fmtSci(m, 3) + ' g. What is its density?';
      ans = rho; unit = 'g/cm³'; digits = 3;
      formulaHint = 'ρ = m / V';
      explain = 'V = ' + V + ' cm³. ρ = m/V = ' + fmtSci(rho, 3) + ' g/cm³.';
      built = buildOpts(ans, unit, digits);
    } else if (variant === 1) {
      q = 'A block measures ' + dims[0] + ' cm × ' + dims[1] + ' cm × ' + dims[2] + ' cm and has density ' + fmtSci(rho, 3) + ' g/cm³. What is its mass?';
      ans = m; unit = 'g'; digits = 3;
      formulaHint = 'From ρ = m/V  →  m = ρ V';
      explain = 'V = ' + V + ' cm³. m = ρV = ' + fmtSci(m, 3) + ' g.';
      built = buildOpts(ans, unit, digits);
    } else if (variant === 2) {
      q = 'A sample has mass ' + fmtSci(m, 3) + ' g and density ' + fmtSci(rho, 3) + ' g/cm³. What is its volume?';
      ans = V; unit = 'cm³'; digits = 3;
      formulaHint = 'From ρ = m/V  →  V = m / ρ';
      explain = 'V = m/ρ = ' + fmtSci(V, 3) + ' cm³.';
      built = buildOpts(ans, unit, digits);
    } else {
      q = 'A substance has density ' + fmtSci(rho, 3) + ' g/cm³. Taking ρ_water = 1.00 g/cm³, what is its specific gravity?';
      ans = rho; unit = ''; digits = 3;
      formulaHint = 'SG = ρ_substance / ρ_water  (dimensionless)';
      explain = 'SG = ' + fmtSci(rho, 3) + ' / 1.00 = ' + fmtSci(rho, 3) + '.';
      built = buildOpts(ans, '', digits);
    }
    return pack({
      key: 'density', variant: variant, q: q,
      options: built.options, correct: built.correct,
      explain: explain, formulaHint: formulaHint
    });
  }

  function generatePressureForceQuestion() {
    const variant = randInt(0, 2);
    const P = pick([1.013e5, 1.123e5, 1.368e5, 2.0e5, 8.0e4]);
    const L = pick([1, 1.5, 2, 2.5, 3, 4, 5]);
    const W = pick([1, 1.5, 2, 2.5, 3, 4, 5]);
    const A = L * W;
    const F = P * A;
    let q, ans, unit, digits, explain, formulaHint;
    if (variant === 0) {
      q = 'Air pressure in a room is ' + fmtSci(P, 3) + ' Pa. What force acts on a surface measuring ' + L + ' m × ' + W + ' m?';
      ans = F; unit = 'N'; digits = 3;
      formulaHint = 'F = P × A';
      explain = 'A = ' + A + ' m². F = PA = ' + fmtSci(F, 3) + ' N.';
    } else if (variant === 1) {
      q = 'A pressure of ' + fmtSci(P, 3) + ' Pa exerts a force of ' + fmtSci(F, 3) + ' N on a flat surface. What is the area of that surface?';
      ans = A; unit = 'm²'; digits = 3;
      formulaHint = 'From P = F/A  →  A = F / P';
      explain = 'A = F/P = ' + fmtSci(A, 3) + ' m².';
    } else {
      q = 'A force of ' + fmtSci(F, 3) + ' N is distributed uniformly over ' + fmtSci(A, 3) + ' m². What is the pressure?';
      ans = P; unit = 'Pa'; digits = 3;
      formulaHint = 'P = F / A';
      explain = 'P = F/A = ' + fmtSci(P, 3) + ' Pa.';
    }
    const built = buildOpts(ans, unit, digits);
    return pack({
      key: 'pressureForce', variant: variant, q: q,
      options: built.options, correct: built.correct,
      explain: explain, formulaHint: formulaHint
    });
  }

  function generateHydrostaticQuestion() {
    const variant = randInt(0, 2);
    const rho = pick([1000, 1025, 800, 850, 13600]);
    const h = pick([5, 8, 10, 15, 20, 25, 30, 45]);
    const PG = rho * G * h;
    let q, ans, unit, digits, explain, formulaHint;
    const fluidName = rho === 1000 ? 'fresh water' : (rho === 1025 ? 'seawater' : (rho === 13600 ? 'mercury' : 'a fluid'));
    if (variant === 0) {
      q = 'What gauge pressure does ' + fluidName + ' (ρ = ' + fmtSci(rho, 3) + ' kg/m³) produce at a depth of ' + h + ' m? Take g = 9.8 m/s².';
      ans = PG; unit = 'Pa'; digits = 3;
      formulaHint = 'P_G = ρ g h';
      explain = 'P_G = ρgh = ' + fmtSci(rho, 3) + ' × 9.8 × ' + h + ' = ' + fmtSci(PG, 3) + ' Pa.';
    } else if (variant === 1) {
      q = 'A diver\'s gauge reads ' + fmtSci(PG, 3) + ' Pa in ' + fluidName + ' (ρ = ' + fmtSci(rho, 3) + ' kg/m³). How deep is the diver? Take g = 9.8 m/s².';
      ans = h; unit = 'm'; digits = 3;
      formulaHint = 'From P_G = ρ g h  →  h = P_G / (ρ g)';
      explain = 'h = P_G/(ρg) = ' + fmtSci(h, 3) + ' m.';
    } else {
      q = 'At depth ' + h + ' m the gauge pressure is ' + fmtSci(PG, 3) + ' Pa. Taking g = 9.8 m/s², what is the fluid density ρ?';
      ans = rho; unit = 'kg/m³'; digits = 3;
      formulaHint = 'From P_G = ρ g h  →  ρ = P_G / (g h)';
      explain = 'ρ = P_G/(gh) = ' + fmtSci(rho, 3) + ' kg/m³.';
    }
    const built = buildOpts(ans, unit, digits);
    return pack({
      key: 'hydrostatic', variant: variant, q: q,
      options: built.options, correct: built.correct,
      explain: explain, formulaHint: formulaHint
    });
  }

  function generateAbsolutePressureQuestion() {
    const variant = randInt(0, 2);
    const rho = 1000;
    const h = pick([5, 10, 15, 20, 25, 30]);
    const PG = rho * G * h;
    const Pabs = P_ATM + PG;
    let q, ans, unit, digits, explain, formulaHint;
    if (variant === 0) {
      q = 'What absolute pressure acts on a swimmer ' + h + ' m below the surface of fresh water (ρ = 1000 kg/m³)? Take g = 9.8 m/s² and P_atm = 1.013 × 10⁵ Pa.';
      ans = Pabs; unit = 'Pa'; digits = 3;
      formulaHint = 'P_abs = P_atm + ρ g h';
      explain = 'P_G = ρgh = ' + fmtSci(PG, 3) + ' Pa. P_abs = P_atm + P_G = ' + fmtSci(Pabs, 3) + ' Pa.';
    } else if (variant === 1) {
      q = 'The absolute pressure at a depth in fresh water is ' + fmtSci(Pabs, 3) + ' Pa. Taking P_atm = 1.013 × 10⁵ Pa, ρ = 1000 kg/m³, g = 9.8 m/s², what is the depth?';
      ans = h; unit = 'm'; digits = 3;
      formulaHint = 'P_abs = P_atm + ρgh  →  h = (P_abs − P_atm) / (ρ g)';
      explain = 'h = (P_abs − P_atm)/(ρg) = ' + fmtSci(h, 3) + ' m.';
    } else {
      q = 'At depth ' + h + ' m in fresh water (ρ = 1000 kg/m³, g = 9.8 m/s²), what is the gauge pressure? (Do not include atmosphere.)';
      ans = PG; unit = 'Pa'; digits = 3;
      formulaHint = 'P_G = ρ g h  (gauge excludes P_atm)';
      explain = 'P_G = ρgh = ' + fmtSci(PG, 3) + ' Pa.';
    }
    const built = buildOpts(ans, unit, digits);
    return pack({
      key: 'absolutePressure', variant: variant, q: q,
      options: built.options, correct: built.correct,
      explain: explain, formulaHint: formulaHint
    });
  }

  function generatePascalQuestion() {
    const variant = randInt(0, 2);
    const A1 = pick([0.01, 0.015, 0.02, 0.025]);
    const A2 = pick([0.2, 0.4, 0.8, 1.0, 1.2]);
    const F1 = pick([50, 100, 150, 200, 250]);
    const F2 = F1 * (A2 / A1);
    let q, ans, unit, digits, explain, formulaHint;
    if (variant === 0) {
      q = 'A hydraulic press has a small piston A₁ = ' + fmtSci(A1, 3) + ' m² and a large piston A₂ = ' + fmtSci(A2, 3) + ' m². If F₁ = ' + fmtSci(F1, 2) + ' N is applied on the small piston, what output force F₂ appears on the large piston?';
      ans = F2; unit = 'N'; digits = 3;
      formulaHint = 'Pascal: F₁/A₁ = F₂/A₂  →  F₂ = F₁ (A₂/A₁)';
      explain = 'F₂ = F₁ × (A₂/A₁) = ' + fmtSci(F2, 3) + ' N.';
    } else if (variant === 1) {
      q = 'A hydraulic lift has A₁ = ' + fmtSci(A1, 3) + ' m² and A₂ = ' + fmtSci(A2, 3) + ' m². What input force F₁ is needed to produce F₂ = ' + fmtSci(F2, 3) + ' N on the large piston?';
      ans = F1; unit = 'N'; digits = 3;
      formulaHint = 'F₁ = F₂ (A₁/A₂)';
      explain = 'F₁ = F₂ × (A₁/A₂) = ' + fmtSci(F1, 3) + ' N.';
    } else {
      q = 'In a hydraulic system, F₁ = ' + fmtSci(F1, 2) + ' N on A₁ = ' + fmtSci(A1, 3) + ' m² produces F₂ = ' + fmtSci(F2, 3) + ' N. What is A₂?';
      ans = A2; unit = 'm²'; digits = 3;
      formulaHint = 'A₂ = A₁ (F₂/F₁)';
      explain = 'A₂ = A₁ × (F₂/F₁) = ' + fmtSci(A2, 3) + ' m².';
    }
    const built = buildOpts(ans, unit, digits);
    return pack({
      key: 'pascal', variant: variant, q: q,
      options: built.options, correct: built.correct,
      explain: explain, formulaHint: formulaHint
    });
  }

  function generateBuoyancyQuestion() {
    const variant = randInt(0, 2);
    const rho = pick([1000, 1025, 850]);
    const V = pick([0.2, 0.24, 0.4, 0.5, 0.6, 0.9]);
    const FB = rho * V * G;
    let q, ans, unit, digits, explain, formulaHint;
    if (variant === 0) {
      q = 'What is the buoyant force on a box of volume ' + fmtSci(V, 3) + ' m³ fully submerged in a fluid of density ' + fmtSci(rho, 3) + ' kg/m³? Take g = 9.8 m/s².';
      ans = FB; unit = 'N'; digits = 3;
      formulaHint = 'F_B = ρ_fluid × V_displaced × g';
      explain = 'F_B = ρVg = ' + fmtSci(FB, 3) + ' N.';
    } else if (variant === 1) {
      q = 'A buoyant force of ' + fmtSci(FB, 3) + ' N acts on an object fully submerged in a fluid of density ' + fmtSci(rho, 3) + ' kg/m³. What volume of fluid is displaced? Take g = 9.8 m/s².';
      ans = V; unit = 'm³'; digits = 3;
      formulaHint = 'From F_B = ρ V g  →  V = F_B / (ρ g)';
      explain = 'V = F_B/(ρg) = ' + fmtSci(V, 3) + ' m³.';
    } else {
      const frac = pick([0.4, 0.5, 0.6, 0.75]);
      const Vtot = pick([0.02, 0.04, 0.05, 0.1]);
      const Vdisp = frac * Vtot;
      const FBf = 1000 * Vdisp * G;
      q = 'A wooden block of total volume ' + fmtSci(Vtot, 3) + ' m³ floats in fresh water with ' + Math.round(frac * 100) + '% of its volume submerged. What is the buoyant force? Take ρ = 1000 kg/m³, g = 9.8 m/s².';
      ans = FBf; unit = 'N'; digits = 3;
      formulaHint = 'Floating: F_B = ρ_water × V_submerged × g';
      explain = 'V_disp = ' + Math.round(frac * 100) + '% × ' + fmtSci(Vtot, 3) + ' = ' + fmtSci(Vdisp, 4) + ' m³. F_B = ρVg = ' + fmtSci(FBf, 3) + ' N.';
      const built = buildOpts(ans, unit, digits);
      return pack({
        key: 'buoyancy', variant: variant, q: q,
        options: built.options, correct: built.correct,
        explain: explain, formulaHint: formulaHint
      });
    }
    const built = buildOpts(ans, unit, digits);
    return pack({
      key: 'buoyancy', variant: variant, q: q,
      options: built.options, correct: built.correct,
      explain: explain, formulaHint: formulaHint
    });
  }

  function generateContinuityQuestion() {
    const variant = randInt(0, 2);
    const A1 = pick([0.04, 0.08, 0.1, 0.12]);
    const factor = pick([2, 4, 5, 8, 10]);
    const A2 = A1 / factor;
    const v1 = pick([0.25, 0.4, 0.5, 0.8, 1.0]);
    const v2 = v1 * (A1 / A2);
    let q, ans, unit, digits, explain, formulaHint;
    if (variant === 0) {
      q = 'Blood flows through a vessel of area A₁ = ' + fmtSci(A1, 3) + ' m² at v₁ = ' + fmtSci(v1, 3) + ' m/s. The vessel narrows to A₂ = ' + fmtSci(A2, 3) + ' m². What is v₂? (Incompressible.)';
      ans = v2; unit = 'm/s'; digits = 3;
      formulaHint = 'Continuity: A₁ v₁ = A₂ v₂  →  v₂ = v₁ (A₁/A₂)';
      explain = 'v₂ = v₁ × (A₁/A₂) = ' + fmtSci(v2, 3) + ' m/s.';
    } else if (variant === 1) {
      q = 'An incompressible fluid flows at v₁ = ' + fmtSci(v1, 3) + ' m/s in A₁ = ' + fmtSci(A1, 3) + ' m² and at v₂ = ' + fmtSci(v2, 3) + ' m/s downstream. What is A₂?';
      ans = A2; unit = 'm²'; digits = 3;
      formulaHint = 'A₂ = A₁ (v₁/v₂)';
      explain = 'A₂ = A₁ × (v₁/v₂) = ' + fmtSci(A2, 3) + ' m².';
    } else {
      q = 'A vessel narrows from A₁ = ' + fmtSci(A1, 3) + ' m² to A₂ = ' + fmtSci(A2, 3) + ' m². If the downstream speed is v₂ = ' + fmtSci(v2, 3) + ' m/s, what was v₁? (Incompressible.)';
      ans = v1; unit = 'm/s'; digits = 3;
      formulaHint = 'v₁ = v₂ (A₂/A₁)';
      explain = 'v₁ = v₂ × (A₂/A₁) = ' + fmtSci(v1, 3) + ' m/s.';
    }
    const built = buildOpts(ans, unit, digits);
    return pack({
      key: 'continuity', variant: variant, q: q,
      options: built.options, correct: built.correct,
      explain: explain, formulaHint: formulaHint
    });
  }

  function generateMassFlowQuestion() {
    const variant = randInt(0, 2);
    const rho = pick([1000, 1050, 1060]); // blood-ish / water
    const A = pick([0.01, 0.02, 0.04, 0.05]);
    const v = pick([0.2, 0.25, 0.4, 0.5, 0.8]);
    const Q = A * v;
    const mdot = rho * Q;
    let q, ans, unit, digits, explain, formulaHint;
    if (variant === 0) {
      q = 'Blood (ρ = ' + fmtSci(rho, 3) + ' kg/m³) flows at v = ' + fmtSci(v, 3) + ' m/s through a vessel of area A = ' + fmtSci(A, 3) + ' m². What is the mass flow rate ṁ?';
      ans = mdot; unit = 'kg/s'; digits = 3;
      formulaHint = 'ṁ = ρ A v';
      explain = 'ṁ = ρAv = ' + fmtSci(mdot, 3) + ' kg/s.';
    } else if (variant === 1) {
      q = 'An incompressible fluid flows at v = ' + fmtSci(v, 3) + ' m/s through area A = ' + fmtSci(A, 3) + ' m². What is the volume flow rate Q?';
      ans = Q; unit = 'm³/s'; digits = 3;
      formulaHint = 'Q = A v';
      explain = 'Q = Av = ' + fmtSci(Q, 3) + ' m³/s.';
    } else {
      q = 'Volume flow rate Q = ' + fmtSci(Q, 3) + ' m³/s through a vessel of area A = ' + fmtSci(A, 3) + ' m². What is the flow speed v?';
      ans = v; unit = 'm/s'; digits = 3;
      formulaHint = 'From Q = A v  →  v = Q / A';
      explain = 'v = Q/A = ' + fmtSci(v, 3) + ' m/s.';
    }
    const built = buildOpts(ans, unit, digits);
    return pack({
      key: 'massFlow', variant: variant, q: q,
      options: built.options, correct: built.correct,
      explain: explain, formulaHint: formulaHint
    });
  }

  function generateBernoulliQuestion() {
    const variant = randInt(0, 2);
    const rho = 1000;
    let q, ans, unit, digits, explain, formulaHint, built;
    if (variant === 0) {
      // same height: ΔP = ½ρ(v₂² − v₁²)  (pressure drop when speeding up)
      const v1 = pick([0.5, 1.0, 1.5, 2.0]);
      const v2 = pick([2.0, 3.0, 4.0, 5.0]);
      if (v2 <= v1) { /* ensure speed-up */ }
      const v2u = Math.max(v2, v1 + 1);
      const dP = 0.5 * rho * (v2u * v2u - v1 * v1);
      q = 'Along a horizontal streamline (same height), blood density ρ = 1000 kg/m³ speeds up from v₁ = ' + fmtSci(v1, 2) + ' m/s to v₂ = ' + fmtSci(v2u, 2) + ' m/s. By how much does the pressure drop (P₁ − P₂)?';
      ans = dP; unit = 'Pa'; digits = 3;
      formulaHint = 'Same height: P + ½ρv² = const  →  P₁ − P₂ = ½ρ(v₂² − v₁²)';
      explain = 'P₁ − P₂ = ½ρ(v₂² − v₁²) = ' + fmtSci(dP, 3) + ' Pa.';
      built = buildOpts(ans, unit, digits);
    } else if (variant === 1) {
      const v1 = pick([0.5, 1.0, 1.5]);
      const dP = pick([2000, 4500, 8000, 13500, 24500]);
      // P₁ − P₂ = ½ρ(v₂² − v₁²) → v₂² = v₁² + 2ΔP/ρ
      const v2sq = v1 * v1 + (2 * dP) / rho;
      const v2 = Math.sqrt(v2sq);
      q = 'On a horizontal streamline (ρ = 1000 kg/m³), pressure falls by ' + fmtSci(dP, 3) + ' Pa as speed rises from v₁ = ' + fmtSci(v1, 2) + ' m/s. What is v₂?';
      ans = v2; unit = 'm/s'; digits = 3;
      formulaHint = 'P₁ − P₂ = ½ρ(v₂² − v₁²)  →  v₂ = √(v₁² + 2(P₁−P₂)/ρ)';
      explain = 'v₂ = √(v₁² + 2ΔP/ρ) = ' + fmtSci(v2, 3) + ' m/s.';
      built = buildOpts(ans, unit, digits, [0.5, 2, 0.25, 4, 1.5, 0.75]);
    } else {
      // height change at negligible speed change: ΔP = ρgΔh
      const dh = pick([0.5, 1.0, 1.5, 2.0, 2.5]);
      const dP = rho * G * dh;
      q = 'A fluid (ρ = 1000 kg/m³) moves slowly (kinetic terms negligible) up a height change Δh = ' + fmtSci(dh, 2) + ' m. Using Bernoulli, by how much does pressure fall? Take g = 9.8 m/s².';
      ans = dP; unit = 'Pa'; digits = 3;
      formulaHint = 'Negligible speed change: ΔP ≈ ρ g Δh  (from P + ρgh = const)';
      explain = 'ΔP ≈ ρgΔh = ' + fmtSci(dP, 3) + ' Pa.';
      built = buildOpts(ans, unit, digits);
    }
    return pack({
      key: 'bernoulli', variant: variant, q: q,
      options: built.options, correct: built.correct,
      explain: explain, formulaHint: formulaHint
    });
  }

  const QUESTION_GENERATORS = {
    youngs: generateYoungsQuestion,
    density: generateDensityQuestion,
    pressureForce: generatePressureForceQuestion,
    hydrostatic: generateHydrostaticQuestion,
    absolutePressure: generateAbsolutePressureQuestion,
    pascal: generatePascalQuestion,
    buoyancy: generateBuoyancyQuestion,
    continuity: generateContinuityQuestion,
    massFlow: generateMassFlowQuestion,
    bernoulli: generateBernoulliQuestion
  };

  function allKeys() { return Object.keys(QUESTION_GENERATORS); }

  function generateQuestion(selectedKeys) {
    const keys = (selectedKeys && selectedKeys.length) ? selectedKeys.slice() : allKeys();
    const key = pick(keys.filter(function (k) { return QUESTION_GENERATORS[k]; }));
    const gen = QUESTION_GENERATORS[key] || generateYoungsQuestion;
    return gen();
  }

  global.Pt1FormulaGen = {
    FORMULA_METADATA: FORMULA_METADATA,
    QUESTION_GENERATORS: QUESTION_GENERATORS,
    generateQuestion: generateQuestion,
    allKeys: allKeys,
    fmtSci: fmtSci
  };
})(typeof window !== 'undefined' ? window : globalThis);
