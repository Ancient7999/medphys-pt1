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

  function mapLine(valueText, symbol) {
    return valueText + ' → ' + symbol;
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

  /**
   * About 45% of questions in each family need a unit conversion while solving
   * the real formula (Math.random() < 0.45, not an every-N pattern).
   * The other 55% stay in consistent SI. There is no conversion-only family.
   */
  function rollConvert() {
    return Math.random() < 0.45;
  }

  function fmtCmLen(meters, digits) {
    return fmtWithUnit(meters * 100, 'cm', digits == null ? 3 : digits);
  }
  /** cm display that keeps the same significant figures as fmtSci(meters). */
  function fmtCmSig(meters, digits) {
    const d = digits == null ? 3 : digits;
    const cm = meters * 100;
    if (!Number.isFinite(cm) || cm === 0) return fmtWithUnit(cm, 'cm', d);
    const exp = Math.floor(Math.log10(Math.abs(cm)));
    const mant = cm / Math.pow(10, exp);
    const sciRounded = Number(mant.toFixed(d)) * Math.pow(10, exp);
    const fixed = Number(cm.toFixed(d));
    const scale = Math.max(Math.abs(sciRounded), 1e-15);
    if (Math.abs(cm) >= 1e-2 && Math.abs(cm) < 1e4 && Math.abs(fixed - sciRounded) / scale < 1e-9) {
      return fmtWithUnit(cm, 'cm', d);
    }
    const m = mant.toFixed(d).replace(/\.?0+$/, '');
    return m + ' × 10' + toSuperscript(exp) + ' cm';
  }
  function fmtCmArea(m2, digits) {
    return fmtWithUnit(m2 * 1e4, 'cm²', digits == null ? 3 : digits);
  }
  function fmtCmVol(m3, digits) {
    return fmtWithUnit(m3 * 1e6, 'cm³', digits == null ? 3 : digits);
  }
  function fmtGrams(kg, digits) {
    return fmtWithUnit(kg * 1000, 'g', digits == null ? 3 : digits);
  }
  function fmtGperCm3(kgm3, digits) {
    return fmtWithUnit(kgm3 / 1000, 'g/cm³', digits == null ? 3 : digits);
  }

  function leadWork(steps, explain, line) {
    if (!line) return { steps: steps, explain: explain };
    return { steps: [line].concat(steps), explain: line + '. ' + explain };
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
      formulaMap: meta.formulaMap || [],
      formulaPlugIn: meta.formulaPlugIn || '',
      formulaSteps: Array.isArray(meta.formulaSteps) ? meta.formulaSteps : [],
      formulaName: FORMULA_METADATA[meta.key] && FORMULA_METADATA[meta.key].name,
      formulaEq: FORMULA_METADATA[meta.key] && FORMULA_METADATA[meta.key].description,
      __formulaMode: true
    };
  }

  /* —— generators —— */

  function generateYoungsQuestion() {
    const variant = randInt(0, 4);
    const L = pick([0.2, 0.25, 0.3, 0.4, 0.5]); // m
    const A = pick([1e-4, 1.5e-4, 2e-4, 2.5e-4, 5e-4]); // m²
    const F = pick([500, 800, 1000, 1200, 1500, 2000]); // N
    const stress = F / A;
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
    let convKind = null;
    if (rollConvert()) {
      // Only convert a quantity that is given, never the unknown.
      if (variant === 3) convKind = 'A';
      else if (variant === 1) convKind = pick(['L', 'A']);
      else if (variant === 4) convKind = pick(['L', 'dL']);
      else convKind = pick(['L', 'A', 'dL']);
    }
    function showL() { return convKind === 'L' ? fmtCmLen(L, 2) : fmtWithUnit(L, 'm', 2); }
    function showA() { return convKind === 'A' ? fmtCmArea(A, 2) : fmtWithUnit(A, 'm²', 2); }
    function showDL() { return convKind === 'dL' ? fmtCmSig(dL, 3) : fmtWithUnit(dL, 'm', 3); }
    function mapL() {
      return convKind === 'L' ? (fmtCmLen(L, 2) + ' = ' + fmtWithUnit(L, 'm', 2)) : fmtWithUnit(L, 'm', 2);
    }
    function mapA() {
      return convKind === 'A' ? (fmtCmArea(A, 2) + ' = ' + fmtWithUnit(A, 'm²', 2)) : fmtWithUnit(A, 'm²', 2);
    }
    function mapDL() {
      return convKind === 'dL' ? (fmtCmSig(dL, 3) + ' = ' + fmtWithUnit(dL, 'm', 3)) : fmtWithUnit(dL, 'm', 3);
    }
    let q, ans, unit, digits, explain, formulaHint, formulaMap, formulaPlugIn, formulaSteps;
    if (variant === 0) {
      q = 'A specimen is ' + showL() + ' long with cross-section ' + showA() + '. Under a load of ' + fmtWithUnit(F, 'N', 2) + ' it stretches by ' + showDL() + '. What is Young\'s modulus?';
      ans = Y; unit = 'Pa'; digits = 3;
      formulaHint = 'Y = (F/A) ÷ (ΔL/L) = F L / (A ΔL)';
      formulaMap = [
        mapLine(mapL(), 'L'),
        mapLine(mapA(), 'A'),
        mapLine(fmtWithUnit(F, 'N', 2), 'F'),
        mapLine(mapDL(), 'ΔL')
      ];
      formulaPlugIn = fmtSci(F, 2) + '·' + fmtSci(L, 2) + ' / (' + fmtSci(A, 2) + '·' + fmtSci(dL, 3) + ')';
      formulaSteps = [
        'Stress = F/A = ' + fmtSci(stress, 3) + ' Pa',
        'Strain = ΔL/L = ' + fmtSci(strain, 3),
        'Y = stress/strain = ' + fmtSci(Y, 3) + ' Pa'
      ];
      explain = 'Stress = F/A = ' + fmtSci(stress, 3) + ' Pa. Strain = ΔL/L = ' + fmtSci(strain, 3) + '. Y = stress/strain = ' + fmtWithUnit(Y, 'Pa', 3) + '.';
    } else if (variant === 1) {
      q = 'A rod is ' + showL() + ' long with cross-section ' + showA() + ' and Young\'s modulus ' + fmtWithUnit(Y, 'Pa', 3) + '. If a load of ' + fmtWithUnit(F, 'N', 2) + ' is applied, what is the extension?';
      ans = dL; unit = 'm'; digits = 3;
      formulaHint = 'From Y = F L / (A ΔL)  →  ΔL = F L / (A Y)';
      formulaMap = [
        mapLine(mapL(), 'L'),
        mapLine(mapA(), 'A'),
        mapLine(fmtWithUnit(Y, 'Pa', 3), 'Y'),
        mapLine(fmtWithUnit(F, 'N', 2), 'F')
      ];
      formulaPlugIn = fmtSci(F, 2) + '·' + fmtSci(L, 2) + ' / (' + fmtSci(A, 2) + '·' + fmtSci(Y, 3) + ')';
      formulaSteps = [
        'ΔL = F L / (A Y)',
        '= ' + formulaPlugIn,
        '= ' + fmtSci(dL, 3) + ' m'
      ];
      explain = 'ΔL = F L / (A Y) = ' + fmtWithUnit(dL, 'm', 3) + '.';
    } else if (variant === 2) {
      q = 'A sample is ' + showL() + ' long with cross-section ' + showA() + ' and Young\'s modulus ' + fmtWithUnit(Y, 'Pa', 3) + '. It stretches by ' + showDL() + '. What axial force was applied?';
      ans = F; unit = 'N'; digits = 3;
      formulaHint = 'From Y = F L / (A ΔL)  →  F = Y A ΔL / L';
      formulaMap = [
        mapLine(mapL(), 'L'),
        mapLine(mapA(), 'A'),
        mapLine(fmtWithUnit(Y, 'Pa', 3), 'Y'),
        mapLine(mapDL(), 'ΔL')
      ];
      formulaPlugIn = fmtSci(Y, 3) + '·' + fmtSci(A, 2) + '·' + fmtSci(dL, 3) + ' / ' + fmtSci(L, 2);
      formulaSteps = [
        'F = Y A ΔL / L',
        '= ' + formulaPlugIn,
        '= ' + fmtSci(F, 3) + ' N'
      ];
      explain = 'F = Y A ΔL / L = ' + fmtWithUnit(F, 'N', 3) + '.';
    } else if (variant === 3) {
      q = 'A force of ' + fmtWithUnit(F, 'N', 2) + ' acts on a cross-section of ' + showA() + '. What is the stress?';
      ans = stress; unit = 'Pa'; digits = 3;
      formulaHint = 'Stress = F / A';
      formulaMap = [
        mapLine(fmtWithUnit(F, 'N', 2), 'F'),
        mapLine(mapA(), 'A')
      ];
      formulaPlugIn = fmtSci(F, 2) + ' / ' + fmtSci(A, 2);
      formulaSteps = [
        'Stress = F/A',
        '= ' + formulaPlugIn,
        '= ' + fmtSci(stress, 3) + ' Pa'
      ];
      explain = 'Stress = F/A = ' + fmtWithUnit(stress, 'Pa', 3) + '.';
    } else {
      q = 'A rod of original length ' + showL() + ' extends by ' + showDL() + '. What is the longitudinal strain?';
      ans = strain; unit = ''; digits = 3;
      formulaHint = 'Strain = ΔL / L';
      formulaMap = [
        mapLine(mapL(), 'L'),
        mapLine(mapDL(), 'ΔL')
      ];
      formulaPlugIn = fmtSci(dL, 3) + ' / ' + fmtSci(L, 2);
      formulaSteps = [
        'Strain = ΔL/L',
        '= ' + formulaPlugIn,
        '= ' + fmtSci(strain, 3) + ' (no unit)'
      ];
      explain = 'Strain = ΔL/L = ' + fmtSci(strain, 3) + ' (no unit).';
    }
    let convLine = '';
    if (convKind === 'L') convLine = 'L = ' + fmtCmLen(L, 2) + ' = ' + fmtWithUnit(L, 'm', 2);
    else if (convKind === 'A') convLine = 'A = ' + fmtCmArea(A, 2) + ' = ' + fmtWithUnit(A, 'm²', 2);
    else if (convKind === 'dL') convLine = 'ΔL = ' + fmtCmSig(dL, 3) + ' = ' + fmtWithUnit(dL, 'm', 3);
    const led = leadWork(formulaSteps, explain, convLine);
    const built = variant === 4
      ? buildOpts(ans, '', digits, [0.5, 2, 0.25, 4, 10, 0.1])
      : buildOpts(ans, unit, digits);
    return pack({
      key: 'youngs', variant: variant, q: q,
      options: built.options, correct: built.correct,
      explain: led.explain, formulaHint: formulaHint, formulaMap: formulaMap,
      formulaPlugIn: formulaPlugIn, formulaSteps: led.steps
    });
  }

  function generateDensityQuestion() {
    const variant = randInt(0, 3);
    const convert = rollConvert();
    const dimsCm = pick([
      [5, 6, 8], [3, 4, 5], [6, 7, 8], [4, 5, 6], [2, 5, 8], [8, 5, 3]
    ]);
    const Vcm3 = dimsCm[0] * dimsCm[1] * dimsCm[2];
    const Vm3 = Vcm3 * 1e-6;
    const rhoGcm = pick([0.25, 0.35, 0.5, 0.75, 0.8, 1.2, 2.5, 2.7, 4.0, 7.8, 8.0]);
    const rho = rhoGcm * 1000;
    const m = rho * Vm3;
    const eM = dimsCm.map(function (c) { return fmtSci(c / 100, 2); });
    const eC = dimsCm.map(function (c) { return String(c); });
    let q, ans, unit, digits, explain, formulaHint, formulaMap, formulaPlugIn, formulaSteps;
    digits = 3;
    if (variant === 0) {
      ans = rho; unit = 'kg/m³';
      formulaHint = 'ρ = m / V';
      formulaPlugIn = fmtSci(m, 3) + ' / ' + fmtSci(Vm3, 3);
      if (convert) {
        q = 'A block measures ' + eC[0] + ' cm × ' + eC[1] + ' cm × ' + eC[2] + ' cm and has mass ' + fmtGrams(m, 3) + '. What is its density in kg/m³?';
        formulaMap = [
          mapLine(fmtGrams(m, 3) + ' = ' + fmtSci(m, 3) + ' kg', 'm'),
          mapLine(Vcm3 + ' cm³ = ' + fmtSci(Vm3, 3) + ' m³', 'V')
        ];
        formulaSteps = [
          'm = ' + fmtGrams(m, 3) + ' = ' + fmtSci(m, 3) + ' kg',
          'V = ' + eC[0] + '×' + eC[1] + '×' + eC[2] + ' = ' + Vcm3 + ' cm³ = ' + fmtSci(Vm3, 3) + ' m³',
          'ρ = m/V = ' + formulaPlugIn + ' = ' + fmtSci(rho, 3) + ' kg/m³'
        ];
        explain = 'Convert mass and volume to SI. m = ' + fmtGrams(m, 3) + ' = ' + fmtSci(m, 3) + ' kg. V = ' + Vcm3 + ' cm³ = ' + fmtSci(Vm3, 3) + ' m³. ρ = m/V = ' + fmtWithUnit(rho, 'kg/m³', 3) + '.';
      } else {
        q = 'A block measures ' + eM[0] + ' m × ' + eM[1] + ' m × ' + eM[2] + ' m and has mass ' + fmtSci(m, 3) + ' kg. What is its density?';
        formulaMap = [
          mapLine(fmtSci(m, 3) + ' kg', 'm'),
          mapLine(fmtSci(Vm3, 3) + ' m³', 'V')
        ];
        formulaSteps = [
          'V = ' + eM[0] + '×' + eM[1] + '×' + eM[2] + ' = ' + fmtSci(Vm3, 3) + ' m³',
          'ρ = m/V = ' + formulaPlugIn,
          '= ' + fmtSci(rho, 3) + ' kg/m³'
        ];
        explain = 'V = ' + fmtSci(Vm3, 3) + ' m³. ρ = m/V = ' + fmtWithUnit(rho, 'kg/m³', 3) + '.';
      }
    } else if (variant === 1) {
      ans = m; unit = 'kg';
      formulaHint = 'From ρ = m/V  →  m = ρ V';
      formulaPlugIn = fmtSci(rho, 3) + ' · ' + fmtSci(Vm3, 3);
      if (convert) {
        q = 'A block measures ' + eC[0] + ' cm × ' + eC[1] + ' cm × ' + eC[2] + ' cm and has density ' + fmtSci(rhoGcm, 3) + ' g/cm³. What is its mass in kg?';
        formulaMap = [
          mapLine(fmtSci(rhoGcm, 3) + ' g/cm³ = ' + fmtSci(rho, 3) + ' kg/m³', 'ρ'),
          mapLine(Vcm3 + ' cm³ = ' + fmtSci(Vm3, 3) + ' m³', 'V')
        ];
        formulaSteps = [
          'ρ = ' + fmtSci(rhoGcm, 3) + ' g/cm³ = ' + fmtSci(rho, 3) + ' kg/m³',
          'V = ' + eC[0] + '×' + eC[1] + '×' + eC[2] + ' = ' + Vcm3 + ' cm³ = ' + fmtSci(Vm3, 3) + ' m³',
          'm = ρ V = ' + formulaPlugIn + ' = ' + fmtSci(m, 3) + ' kg'
        ];
        explain = 'ρ = ' + fmtSci(rhoGcm, 3) + ' g/cm³ = ' + fmtSci(rho, 3) + ' kg/m³. V = ' + Vcm3 + ' cm³ = ' + fmtSci(Vm3, 3) + ' m³. m = ρV = ' + fmtWithUnit(m, 'kg', 3) + '.';
      } else {
        q = 'A block measures ' + eM[0] + ' m × ' + eM[1] + ' m × ' + eM[2] + ' m and has density ' + fmtSci(rho, 3) + ' kg/m³. What is its mass?';
        formulaMap = [
          mapLine(fmtSci(rho, 3) + ' kg/m³', 'ρ'),
          mapLine(fmtSci(Vm3, 3) + ' m³', 'V')
        ];
        formulaSteps = [
          'm = ρ V',
          '= ' + formulaPlugIn,
          '= ' + fmtSci(m, 3) + ' kg'
        ];
        explain = 'V = ' + fmtSci(Vm3, 3) + ' m³. m = ρV = ' + fmtWithUnit(m, 'kg', 3) + '.';
      }
    } else if (variant === 2) {
      ans = Vm3; unit = 'm³';
      formulaHint = 'From ρ = m/V  →  V = m / ρ';
      formulaPlugIn = fmtSci(m, 3) + ' / ' + fmtSci(rho, 3);
      if (convert) {
        q = 'A sample has mass ' + fmtGrams(m, 3) + ' and density ' + fmtSci(rhoGcm, 3) + ' g/cm³. What is its volume in m³?';
        formulaMap = [
          mapLine(fmtGrams(m, 3) + ' = ' + fmtSci(m, 3) + ' kg', 'm'),
          mapLine(fmtSci(rhoGcm, 3) + ' g/cm³ = ' + fmtSci(rho, 3) + ' kg/m³', 'ρ')
        ];
        formulaSteps = [
          'm = ' + fmtGrams(m, 3) + ' = ' + fmtSci(m, 3) + ' kg',
          'ρ = ' + fmtSci(rhoGcm, 3) + ' g/cm³ = ' + fmtSci(rho, 3) + ' kg/m³',
          'V = m/ρ = ' + formulaPlugIn + ' = ' + fmtSci(Vm3, 3) + ' m³'
        ];
        explain = 'm = ' + fmtGrams(m, 3) + ' = ' + fmtSci(m, 3) + ' kg. ρ = ' + fmtSci(rhoGcm, 3) + ' g/cm³ = ' + fmtSci(rho, 3) + ' kg/m³. V = m/ρ = ' + fmtWithUnit(Vm3, 'm³', 3) + '.';
      } else {
        q = 'A sample has mass ' + fmtSci(m, 3) + ' kg and density ' + fmtSci(rho, 3) + ' kg/m³. What is its volume?';
        formulaMap = [
          mapLine(fmtSci(m, 3) + ' kg', 'm'),
          mapLine(fmtSci(rho, 3) + ' kg/m³', 'ρ')
        ];
        formulaSteps = [
          'V = m/ρ',
          '= ' + formulaPlugIn,
          '= ' + fmtSci(Vm3, 3) + ' m³'
        ];
        explain = 'V = m/ρ = ' + fmtWithUnit(Vm3, 'm³', 3) + '.';
      }
    } else {
      ans = rho / 1000; unit = '';
      formulaHint = 'SG = ρ_substance / ρ_water';
      formulaPlugIn = fmtSci(rho, 3) + ' / 1000';
      if (convert) {
        q = 'A substance has density ' + fmtSci(rhoGcm, 3) + ' g/cm³. Taking the density of water as 1000 kg/m³, what is its specific gravity?';
        formulaMap = [
          mapLine(fmtSci(rhoGcm, 3) + ' g/cm³ = ' + fmtSci(rho, 3) + ' kg/m³', 'ρ_substance'),
          mapLine('1000 kg/m³', 'ρ_water')
        ];
        formulaSteps = [
          'ρ = ' + fmtSci(rhoGcm, 3) + ' g/cm³ = ' + fmtSci(rho, 3) + ' kg/m³',
          'SG = ρ_substance / ρ_water = ' + formulaPlugIn,
          '= ' + fmtSci(ans, 3)
        ];
        explain = 'ρ = ' + fmtSci(rhoGcm, 3) + ' g/cm³ = ' + fmtSci(rho, 3) + ' kg/m³. SG = ' + fmtSci(rho, 3) + ' / 1000 = ' + fmtSci(ans, 3) + '.';
      } else {
        q = 'A substance has density ' + fmtSci(rho, 3) + ' kg/m³. Taking the density of water as 1000 kg/m³, what is its specific gravity?';
        formulaMap = [
          mapLine(fmtSci(rho, 3) + ' kg/m³', 'ρ_substance'),
          mapLine('1000 kg/m³', 'ρ_water')
        ];
        formulaSteps = [
          'SG = ρ_substance / ρ_water',
          '= ' + formulaPlugIn,
          '= ' + fmtSci(ans, 3)
        ];
        explain = 'SG = ' + fmtSci(rho, 3) + ' / 1000 = ' + fmtSci(ans, 3) + '.';
      }
    }
    const built = unit
      ? buildOpts(ans, unit, digits)
      : buildOpts(ans, '', digits, [0.5, 2, 0.25, 4, 10, 0.1]);
    return pack({
      key: 'density', variant: variant, q: q,
      options: built.options, correct: built.correct,
      explain: explain, formulaHint: formulaHint, formulaMap: formulaMap,
      formulaPlugIn: formulaPlugIn, formulaSteps: formulaSteps
    });
  }

  function generatePressureForceQuestion() {
    const variant = randInt(0, 2);
    const convert = rollConvert();
    const P = pick([1.013e5, 1.123e5, 1.368e5, 2.0e5, 8.0e4]);
    const L = pick([1, 1.5, 2, 2.5, 3, 4, 5]);
    const W = pick([1, 1.5, 2, 2.5, 3, 4, 5]);
    const A = L * W;
    const F = P * A;
    let q, ans, unit, digits, explain, formulaHint, formulaMap, formulaPlugIn, formulaSteps;
    digits = 3;
    if (variant === 0) {
      ans = F; unit = 'N';
      formulaHint = 'F = P × A';
      formulaPlugIn = fmtSci(P, 3) + ' · ' + A;
      if (convert) {
        q = 'Air pressure in a room is ' + fmtSci(P, 3) + ' Pa. What force acts on a surface measuring ' + fmtCmLen(L, 2) + ' × ' + fmtCmLen(W, 2) + '?';
        formulaMap = [
          mapLine(fmtWithUnit(P, 'Pa', 3), 'P'),
          mapLine(fmtCmLen(L, 2) + ' = ' + fmtWithUnit(L, 'm', 2), 'L'),
          mapLine(fmtCmLen(W, 2) + ' = ' + fmtWithUnit(W, 'm', 2), 'W'),
          mapLine(A + ' m²', 'A')
        ];
        formulaSteps = [
          'L = ' + fmtCmLen(L, 2) + ' = ' + L + ' m',
          'W = ' + fmtCmLen(W, 2) + ' = ' + W + ' m',
          'A = ' + L + '×' + W + ' = ' + A + ' m²',
          'F = P A = ' + formulaPlugIn + ' = ' + fmtSci(F, 3) + ' N'
        ];
        explain = 'L = ' + fmtCmLen(L, 2) + ' = ' + L + ' m. W = ' + fmtCmLen(W, 2) + ' = ' + W + ' m. A = ' + A + ' m². F = PA = ' + fmtWithUnit(F, 'N', 3) + '.';
      } else {
        q = 'Air pressure in a room is ' + fmtSci(P, 3) + ' Pa. What force acts on a surface measuring ' + L + ' m × ' + W + ' m?';
        formulaMap = [
          mapLine(fmtWithUnit(P, 'Pa', 3), 'P'),
          mapLine(L + ' m × ' + W + ' m (= ' + A + ' m²)', 'A')
        ];
        formulaSteps = [
          'A = ' + L + '×' + W + ' = ' + A + ' m²',
          'F = P A = ' + formulaPlugIn,
          '= ' + fmtSci(F, 3) + ' N'
        ];
        explain = 'A = ' + A + ' m². F = PA = ' + fmtWithUnit(F, 'N', 3) + '.';
      }
    } else if (variant === 1) {
      formulaHint = 'From P = F/A  →  A = F / P';
      if (convert) {
        ans = W; unit = 'm';
        q = 'A pressure of ' + fmtSci(P, 3) + ' Pa exerts a force of ' + fmtSci(F, 3) + ' N on a rectangular surface ' + fmtCmLen(L, 2) + ' long. What is the width of the surface in m?';
        formulaMap = [
          mapLine(fmtWithUnit(P, 'Pa', 3), 'P'),
          mapLine(fmtWithUnit(F, 'N', 3), 'F'),
          mapLine(fmtCmLen(L, 2) + ' = ' + fmtWithUnit(L, 'm', 2), 'L')
        ];
        formulaPlugIn = fmtSci(F, 3) + ' / ' + fmtSci(P, 3) + ' / ' + fmtSci(L, 2);
        formulaSteps = [
          'L = ' + fmtCmLen(L, 2) + ' = ' + fmtSci(L, 2) + ' m',
          'A = F/P = ' + fmtSci(F, 3) + ' / ' + fmtSci(P, 3) + ' = ' + fmtSci(A, 3) + ' m²',
          'width = A/L = ' + fmtSci(A, 3) + ' / ' + fmtSci(L, 2) + ' = ' + fmtSci(W, 3) + ' m'
        ];
        explain = 'L = ' + fmtCmLen(L, 2) + ' = ' + fmtSci(L, 2) + ' m. A = F/P = ' + fmtSci(A, 3) + ' m². Width = A/L = ' + fmtWithUnit(W, 'm', 3) + '.';
      } else {
        ans = A; unit = 'm²';
        q = 'A pressure of ' + fmtSci(P, 3) + ' Pa exerts a force of ' + fmtSci(F, 3) + ' N on a flat surface. What is the area of that surface?';
        formulaMap = [
          mapLine(fmtWithUnit(P, 'Pa', 3), 'P'),
          mapLine(fmtWithUnit(F, 'N', 3), 'F')
        ];
        formulaPlugIn = fmtSci(F, 3) + ' / ' + fmtSci(P, 3);
        formulaSteps = [
          'A = F/P',
          '= ' + formulaPlugIn,
          '= ' + fmtSci(A, 3) + ' m²'
        ];
        explain = 'A = F/P = ' + fmtWithUnit(A, 'm²', 3) + '.';
      }
    } else {
      ans = P; unit = 'Pa';
      formulaHint = 'P = F / A';
      formulaPlugIn = fmtSci(F, 3) + ' / ' + fmtSci(A, 3);
      if (convert) {
        q = 'A force of ' + fmtSci(F, 3) + ' N is distributed uniformly over ' + fmtCmArea(A, 3) + '. What is the pressure?';
        formulaMap = [
          mapLine(fmtWithUnit(F, 'N', 3), 'F'),
          mapLine(fmtCmArea(A, 3) + ' = ' + fmtWithUnit(A, 'm²', 3), 'A')
        ];
        formulaSteps = [
          'A = ' + fmtCmArea(A, 3) + ' = ' + fmtSci(A, 3) + ' m²',
          'P = F/A = ' + formulaPlugIn,
          '= ' + fmtSci(P, 3) + ' Pa'
        ];
        explain = 'A = ' + fmtCmArea(A, 3) + ' = ' + fmtSci(A, 3) + ' m². P = F/A = ' + fmtWithUnit(P, 'Pa', 3) + '.';
      } else {
        q = 'A force of ' + fmtSci(F, 3) + ' N is distributed uniformly over ' + fmtSci(A, 3) + ' m². What is the pressure?';
        formulaMap = [
          mapLine(fmtWithUnit(F, 'N', 3), 'F'),
          mapLine(fmtWithUnit(A, 'm²', 3), 'A')
        ];
        formulaSteps = [
          'P = F/A',
          '= ' + formulaPlugIn,
          '= ' + fmtSci(P, 3) + ' Pa'
        ];
        explain = 'P = F/A = ' + fmtWithUnit(P, 'Pa', 3) + '.';
      }
    }
    const built = buildOpts(ans, unit, digits);
    return pack({
      key: 'pressureForce', variant: variant, q: q,
      options: built.options, correct: built.correct,
      explain: explain, formulaHint: formulaHint, formulaMap: formulaMap,
      formulaPlugIn: formulaPlugIn, formulaSteps: formulaSteps
    });
  }

  function generateHydrostaticQuestion() {
    const variant = randInt(0, 2);
    const convert = rollConvert();
    const rho = pick([1000, 1025, 800, 850, 13600]);
    const h = pick([5, 8, 10, 15, 20, 25, 30, 45]);
    const PG = rho * G * h;
    let convRho = false;
    let convH = false;
    if (convert) {
      if (variant === 1) convRho = true;
      else if (variant === 2) convH = true;
      else if (Math.random() < 0.5) convRho = true;
      else convH = true;
    }
    const rhoGiven = convRho ? fmtGperCm3(rho, 3) : (fmtSci(rho, 3) + ' kg/m³');
    const hGiven = convH ? fmtCmLen(h, 2) : (h + ' m');
    const rhoMap = convRho ? (fmtGperCm3(rho, 3) + ' = ' + fmtSci(rho, 3) + ' kg/m³') : (fmtSci(rho, 3) + ' kg/m³');
    const hMap = convH ? (fmtCmLen(h, 2) + ' = ' + h + ' m') : (h + ' m');
    const fluidName = rho === 1000 ? 'fresh water' : (rho === 1025 ? 'seawater' : (rho === 13600 ? 'mercury' : 'a fluid'));
    let q, ans, unit, digits, explain, formulaHint, formulaMap, formulaPlugIn, formulaSteps;
    digits = 3;
    if (variant === 0) {
      q = 'What gauge pressure does ' + fluidName + ' of density ' + rhoGiven + ' produce at a depth of ' + hGiven + '?';
      ans = PG; unit = 'Pa';
      formulaHint = 'P_G = ρ g h';
      formulaMap = [
        mapLine(rhoMap, 'ρ'),
        mapLine(hMap, 'h'),
        mapLine('9.8 m/s²', 'g')
      ];
      formulaPlugIn = fmtSci(rho, 3) + ' · 9.8 · ' + h;
      formulaSteps = [
        'P_G = ρ g h',
        '= ' + formulaPlugIn,
        '= ' + fmtSci(PG, 3) + ' Pa'
      ];
      explain = 'P_G = ρgh = ' + fmtSci(rho, 3) + ' × 9.8 × ' + h + ' = ' + fmtWithUnit(PG, 'Pa', 3) + '.';
    } else if (variant === 1) {
      q = 'A diver\'s gauge reads ' + fmtSci(PG, 3) + ' Pa in ' + fluidName + ' of density ' + rhoGiven + '. How deep is the diver?';
      ans = h; unit = 'm';
      formulaHint = 'From P_G = ρ g h  →  h = P_G / (ρ g)';
      formulaMap = [
        mapLine(fmtWithUnit(PG, 'Pa', 3), 'P_G'),
        mapLine(rhoMap, 'ρ'),
        mapLine('9.8 m/s²', 'g')
      ];
      formulaPlugIn = fmtSci(PG, 3) + ' / (' + fmtSci(rho, 3) + ' · 9.8)';
      formulaSteps = [
        'h = P_G / (ρ g)',
        '= ' + formulaPlugIn,
        '= ' + fmtSci(h, 3) + ' m'
      ];
      explain = 'h = P_G/(ρg) = ' + fmtWithUnit(h, 'm', 3) + '.';
    } else {
      q = 'At a depth of ' + hGiven + ' the gauge pressure is ' + fmtSci(PG, 3) + ' Pa. What is the fluid density?';
      ans = rho; unit = 'kg/m³';
      formulaHint = 'From P_G = ρ g h  →  ρ = P_G / (g h)';
      formulaMap = [
        mapLine(fmtWithUnit(PG, 'Pa', 3), 'P_G'),
        mapLine(hMap, 'h'),
        mapLine('9.8 m/s²', 'g')
      ];
      formulaPlugIn = fmtSci(PG, 3) + ' / (9.8 · ' + h + ')';
      formulaSteps = [
        'ρ = P_G / (g h)',
        '= ' + formulaPlugIn,
        '= ' + fmtSci(rho, 3) + ' kg/m³'
      ];
      explain = 'ρ = P_G/(gh) = ' + fmtWithUnit(rho, 'kg/m³', 3) + '.';
    }
    let convLine = '';
    if (convRho) convLine = 'ρ = ' + fmtGperCm3(rho, 3) + ' = ' + fmtSci(rho, 3) + ' kg/m³';
    else if (convH) convLine = 'h = ' + fmtCmLen(h, 2) + ' = ' + h + ' m';
    const led = leadWork(formulaSteps, explain, convLine);
    const built = buildOpts(ans, unit, digits);
    return pack({
      key: 'hydrostatic', variant: variant, q: q,
      options: built.options, correct: built.correct,
      explain: led.explain, formulaHint: formulaHint, formulaMap: formulaMap,
      formulaPlugIn: formulaPlugIn, formulaSteps: led.steps
    });
  }

  function generateAbsolutePressureQuestion() {
    const variant = randInt(0, 2);
    const convert = rollConvert();
    const rho = 1000;
    const h = pick([5, 10, 15, 20, 25, 30]);
    const PG = rho * G * h;
    const Pabs = P_ATM + PG;
    let convRho = false;
    let convH = false;
    if (convert) {
      if (variant === 1) convRho = true;
      else if (variant === 2) convH = true;
      else if (Math.random() < 0.5) convRho = true;
      else convH = true;
    }
    const rhoGiven = convRho ? fmtGperCm3(rho, 3) : '1000 kg/m³';
    const hGiven = convH ? fmtCmLen(h, 2) : (h + ' m');
    const rhoMap = convRho ? (fmtGperCm3(rho, 3) + ' = 1000 kg/m³') : '1000 kg/m³';
    const hMap = convH ? (fmtCmLen(h, 2) + ' = ' + h + ' m') : (h + ' m');
    let q, ans, unit, digits, explain, formulaHint, formulaMap, formulaPlugIn, formulaSteps;
    digits = 3;
    if (variant === 0) {
      q = 'What absolute pressure acts on a swimmer ' + hGiven + ' below the surface of fresh water of density ' + rhoGiven + '?';
      ans = Pabs; unit = 'Pa';
      formulaHint = 'P_abs = P_atm + ρ g h';
      formulaMap = [
        mapLine(hMap, 'h'),
        mapLine(rhoMap, 'ρ'),
        mapLine('9.8 m/s²', 'g'),
        mapLine('1.013 × 10⁵ Pa', 'P_atm')
      ];
      formulaPlugIn = '1.013×10⁵ + 1000·9.8·' + h;
      formulaSteps = [
        'P_G = ρ g h = 1000·9.8·' + h + ' = ' + fmtSci(PG, 3) + ' Pa',
        'P_abs = P_atm + P_G',
        '= ' + formulaPlugIn + ' = ' + fmtSci(Pabs, 3) + ' Pa'
      ];
      explain = 'P_G = ρgh = ' + fmtSci(PG, 3) + ' Pa. P_abs = P_atm + P_G = ' + fmtWithUnit(Pabs, 'Pa', 3) + '.';
    } else if (variant === 1) {
      q = 'The absolute pressure at a depth in fresh water of density ' + rhoGiven + ' is ' + fmtSci(Pabs, 3) + ' Pa. What is the depth?';
      ans = h; unit = 'm';
      formulaHint = 'P_abs = P_atm + ρgh  →  h = (P_abs − P_atm) / (ρ g)';
      formulaMap = [
        mapLine(fmtWithUnit(Pabs, 'Pa', 3), 'P_abs'),
        mapLine(rhoMap, 'ρ'),
        mapLine('9.8 m/s²', 'g'),
        mapLine('1.013 × 10⁵ Pa', 'P_atm')
      ];
      formulaPlugIn = '(' + fmtSci(Pabs, 3) + ' − 1.013×10⁵) / (1000·9.8)';
      formulaSteps = [
        'h = (P_abs − P_atm) / (ρ g)',
        '= ' + formulaPlugIn,
        '= ' + fmtSci(h, 3) + ' m'
      ];
      explain = 'h = (P_abs − P_atm)/(ρg) = ' + fmtWithUnit(h, 'm', 3) + '.';
    } else {
      q = 'At a depth of ' + hGiven + ' in fresh water of density ' + rhoGiven + ', what is the gauge pressure?';
      ans = PG; unit = 'Pa';
      formulaHint = 'P_G = ρ g h';
      formulaMap = [
        mapLine(hMap, 'h'),
        mapLine(rhoMap, 'ρ'),
        mapLine('9.8 m/s²', 'g')
      ];
      formulaPlugIn = '1000 · 9.8 · ' + h;
      formulaSteps = [
        'P_G = ρ g h',
        '= ' + formulaPlugIn,
        '= ' + fmtSci(PG, 3) + ' Pa'
      ];
      explain = 'P_G = ρgh = ' + fmtWithUnit(PG, 'Pa', 3) + '.';
    }
    let convLine = '';
    if (convRho) convLine = 'ρ = ' + fmtGperCm3(rho, 3) + ' = 1000 kg/m³';
    else if (convH) convLine = 'h = ' + fmtCmLen(h, 2) + ' = ' + h + ' m';
    const led = leadWork(formulaSteps, explain, convLine);
    const built = buildOpts(ans, unit, digits);
    return pack({
      key: 'absolutePressure', variant: variant, q: q,
      options: built.options, correct: built.correct,
      explain: led.explain, formulaHint: formulaHint, formulaMap: formulaMap,
      formulaPlugIn: formulaPlugIn, formulaSteps: led.steps
    });
  }

  function generatePascalQuestion() {
    const variant = randInt(0, 2);
    const convert = rollConvert();
    const A1 = pick([0.01, 0.015, 0.02, 0.025]);
    const A2 = pick([0.2, 0.4, 0.8, 1.0, 1.2]);
    const F1 = pick([50, 100, 150, 200, 250]);
    const F2 = F1 * (A2 / A1);
    const convA1 = convert && variant !== 1;
    const convA2 = convert && variant === 1;
    function a1Txt() { return convA1 ? fmtCmArea(A1, 3) : fmtWithUnit(A1, 'm²', 3); }
    function a2Txt() { return convA2 ? fmtCmArea(A2, 3) : fmtWithUnit(A2, 'm²', 3); }
    function a1Map() { return convA1 ? (fmtCmArea(A1, 3) + ' = ' + fmtWithUnit(A1, 'm²', 3)) : fmtWithUnit(A1, 'm²', 3); }
    function a2Map() { return convA2 ? (fmtCmArea(A2, 3) + ' = ' + fmtWithUnit(A2, 'm²', 3)) : fmtWithUnit(A2, 'm²', 3); }
    let q, ans, unit, digits, explain, formulaHint, formulaMap, formulaPlugIn, formulaSteps;
    digits = 3;
    if (variant === 0) {
      q = 'A hydraulic press has a small piston of area ' + a1Txt() + ' and a large piston of area ' + a2Txt() + '. If a force of ' + fmtSci(F1, 2) + ' N is applied on the small piston, what output force appears on the large piston?';
      ans = F2; unit = 'N';
      formulaHint = 'Pascal: F₁/A₁ = F₂/A₂  →  F₂ = F₁ (A₂/A₁)';
      formulaMap = [
        mapLine(a1Map(), 'A₁'),
        mapLine(a2Map(), 'A₂'),
        mapLine(fmtWithUnit(F1, 'N', 2), 'F₁')
      ];
      formulaPlugIn = fmtSci(F1, 2) + ' · (' + fmtSci(A2, 3) + '/' + fmtSci(A1, 3) + ')';
      formulaSteps = [
        'F₂ = F₁ (A₂/A₁)',
        '= ' + formulaPlugIn,
        '= ' + fmtSci(F2, 3) + ' N'
      ];
      explain = 'F₂ = F₁ × (A₂/A₁) = ' + fmtWithUnit(F2, 'N', 3) + '.';
    } else if (variant === 1) {
      q = 'A hydraulic lift has pistons of area ' + a1Txt() + ' and ' + a2Txt() + '. What input force on the smaller piston is needed to produce ' + fmtSci(F2, 3) + ' N on the large piston?';
      ans = F1; unit = 'N';
      formulaHint = 'F₁ = F₂ (A₁/A₂)';
      formulaMap = [
        mapLine(a1Map(), 'A₁'),
        mapLine(a2Map(), 'A₂'),
        mapLine(fmtWithUnit(F2, 'N', 3), 'F₂')
      ];
      formulaPlugIn = fmtSci(F2, 3) + ' · (' + fmtSci(A1, 3) + '/' + fmtSci(A2, 3) + ')';
      formulaSteps = [
        'F₁ = F₂ (A₁/A₂)',
        '= ' + formulaPlugIn,
        '= ' + fmtSci(F1, 3) + ' N'
      ];
      explain = 'F₁ = F₂ × (A₁/A₂) = ' + fmtWithUnit(F1, 'N', 3) + '.';
    } else {
      q = 'In a hydraulic system, a force of ' + fmtSci(F1, 2) + ' N on a piston of area ' + a1Txt() + ' produces an output force of ' + fmtSci(F2, 3) + ' N. What is the area of the output piston?';
      ans = A2; unit = 'm²';
      formulaHint = 'A₂ = A₁ (F₂/F₁)';
      formulaMap = [
        mapLine(fmtWithUnit(F1, 'N', 2), 'F₁'),
        mapLine(a1Map(), 'A₁'),
        mapLine(fmtWithUnit(F2, 'N', 3), 'F₂')
      ];
      formulaPlugIn = fmtSci(A1, 3) + ' · (' + fmtSci(F2, 3) + '/' + fmtSci(F1, 2) + ')';
      formulaSteps = [
        'A₂ = A₁ (F₂/F₁)',
        '= ' + formulaPlugIn,
        '= ' + fmtSci(A2, 3) + ' m²'
      ];
      explain = 'A₂ = A₁ × (F₂/F₁) = ' + fmtWithUnit(A2, 'm²', 3) + '.';
    }
    let convLine = '';
    if (convA1) convLine = 'A₁ = ' + fmtCmArea(A1, 3) + ' = ' + fmtWithUnit(A1, 'm²', 3);
    else if (convA2) convLine = 'A₂ = ' + fmtCmArea(A2, 3) + ' = ' + fmtWithUnit(A2, 'm²', 3);
    const led = leadWork(formulaSteps, explain, convLine);
    const built = buildOpts(ans, unit, digits);
    return pack({
      key: 'pascal', variant: variant, q: q,
      options: built.options, correct: built.correct,
      explain: led.explain, formulaHint: formulaHint, formulaMap: formulaMap,
      formulaPlugIn: formulaPlugIn, formulaSteps: led.steps
    });
  }

  function generateBuoyancyQuestion() {
    const variant = randInt(0, 2);
    const convert = rollConvert();
    const rho = pick([1000, 1025, 850]);
    const V = pick([0.2, 0.24, 0.4, 0.5, 0.6, 0.9]);
    const FB = rho * V * G;
    let convV = false;
    let convRho = false;
    if (convert) {
      if (variant === 1) convRho = true;
      else if (variant === 2) convV = true;
      else if (Math.random() < 0.5) convV = true;
      else convRho = true;
    }
    function volTxt(v, digits) { return convV ? fmtCmVol(v, digits) : fmtWithUnit(v, 'm³', digits); }
    function rhoTxt(r) { return convRho ? fmtGperCm3(r, 3) : (fmtSci(r, 3) + ' kg/m³'); }
    let q, ans, unit, digits, explain, formulaHint, formulaMap, formulaPlugIn, formulaSteps;
    digits = 3;
    if (variant === 0) {
      q = 'What is the buoyant force on a box of volume ' + volTxt(V, 3) + ' fully submerged in a fluid of density ' + rhoTxt(rho) + '?';
      ans = FB; unit = 'N';
      formulaHint = 'F_B = ρ_fluid × V_displaced × g';
      formulaMap = [
        mapLine(convV ? (fmtCmVol(V, 3) + ' = ' + fmtWithUnit(V, 'm³', 3)) : fmtWithUnit(V, 'm³', 3), 'V_disp'),
        mapLine(convRho ? (fmtGperCm3(rho, 3) + ' = ' + fmtSci(rho, 3) + ' kg/m³') : (fmtSci(rho, 3) + ' kg/m³'), 'ρ_fluid'),
        mapLine('9.8 m/s²', 'g')
      ];
      formulaPlugIn = fmtSci(rho, 3) + ' · ' + fmtSci(V, 3) + ' · 9.8';
      formulaSteps = [
        'F_B = ρ V g',
        '= ' + formulaPlugIn,
        '= ' + fmtSci(FB, 3) + ' N'
      ];
      explain = 'F_B = ρVg = ' + fmtWithUnit(FB, 'N', 3) + '.';
    } else if (variant === 1) {
      q = 'A buoyant force of ' + fmtSci(FB, 3) + ' N acts on an object fully submerged in a fluid of density ' + rhoTxt(rho) + '. What volume of fluid is displaced?';
      ans = V; unit = 'm³';
      formulaHint = 'From F_B = ρ V g  →  V = F_B / (ρ g)';
      formulaMap = [
        mapLine(fmtWithUnit(FB, 'N', 3), 'F_B'),
        mapLine(convRho ? (fmtGperCm3(rho, 3) + ' = ' + fmtSci(rho, 3) + ' kg/m³') : (fmtSci(rho, 3) + ' kg/m³'), 'ρ'),
        mapLine('9.8 m/s²', 'g')
      ];
      formulaPlugIn = fmtSci(FB, 3) + ' / (' + fmtSci(rho, 3) + ' · 9.8)';
      formulaSteps = [
        'V = F_B / (ρ g)',
        '= ' + formulaPlugIn,
        '= ' + fmtSci(V, 3) + ' m³'
      ];
      explain = 'V = F_B/(ρg) = ' + fmtWithUnit(V, 'm³', 3) + '.';
    } else {
      const frac = pick([0.4, 0.5, 0.6, 0.75]);
      const Vtot = pick([0.02, 0.04, 0.05, 0.1]);
      const Vdisp = frac * Vtot;
      const FBf = 1000 * Vdisp * G;
      q = 'A wooden block of total volume ' + volTxt(Vtot, 3) + ' floats in fresh water with ' + Math.round(frac * 100) + '% of its volume submerged. What is the buoyant force?';
      ans = FBf; unit = 'N';
      formulaHint = 'Floating: F_B = ρ_water × V_submerged × g';
      formulaMap = [
        mapLine(convV ? (fmtCmVol(Vtot, 3) + ' = ' + fmtWithUnit(Vtot, 'm³', 3)) : fmtWithUnit(Vtot, 'm³', 3), 'V_total'),
        mapLine(Math.round(frac * 100) + '% submerged → ' + fmtWithUnit(Vdisp, 'm³', 4), 'V_submerged'),
        mapLine('1000 kg/m³', 'ρ_water'),
        mapLine('9.8 m/s²', 'g')
      ];
      formulaPlugIn = '1000 · ' + fmtSci(Vdisp, 4) + ' · 9.8';
      formulaSteps = [
        'V_disp = ' + Math.round(frac * 100) + '% × ' + fmtSci(Vtot, 3) + ' = ' + fmtSci(Vdisp, 4) + ' m³',
        'F_B = ρ V g = ' + formulaPlugIn,
        '= ' + fmtSci(FBf, 3) + ' N'
      ];
      explain = 'V_disp = ' + Math.round(frac * 100) + '% × ' + fmtSci(Vtot, 3) + ' = ' + fmtSci(Vdisp, 4) + ' m³. F_B = ρVg = ' + fmtWithUnit(FBf, 'N', 3) + '.';
      if (convV) {
        const line = 'V_total = ' + fmtCmVol(Vtot, 3) + ' = ' + fmtWithUnit(Vtot, 'm³', 3);
        formulaSteps = [line].concat(formulaSteps);
        explain = line + '. ' + explain;
      }
      const builtF = buildOpts(ans, unit, digits);
      return pack({
        key: 'buoyancy', variant: variant, q: q,
        options: builtF.options, correct: builtF.correct,
        explain: explain, formulaHint: formulaHint, formulaMap: formulaMap,
        formulaPlugIn: formulaPlugIn, formulaSteps: formulaSteps
      });
    }
    let convLine = '';
    if (convV) convLine = 'V = ' + fmtCmVol(V, 3) + ' = ' + fmtWithUnit(V, 'm³', 3);
    else if (convRho) convLine = 'ρ = ' + fmtGperCm3(rho, 3) + ' = ' + fmtSci(rho, 3) + ' kg/m³';
    const led = leadWork(formulaSteps, explain, convLine);
    const built = buildOpts(ans, unit, digits);
    return pack({
      key: 'buoyancy', variant: variant, q: q,
      options: built.options, correct: built.correct,
      explain: led.explain, formulaHint: formulaHint, formulaMap: formulaMap,
      formulaPlugIn: formulaPlugIn, formulaSteps: led.steps
    });
  }

  function generateContinuityQuestion() {
    const variant = randInt(0, 2);
    const convert = rollConvert();
    const A1 = pick([0.04, 0.08, 0.1, 0.12]);
    const factor = pick([2, 4, 5, 10]);
    const A2 = A1 / factor;
    const v1 = pick([0.25, 0.4, 0.5, 0.8, 1.0]);
    const v2 = v1 * (A1 / A2);
    const convA1 = convert && variant !== 2;
    const convA2 = convert && variant === 2;
    function a1Txt() { return convA1 ? fmtCmArea(A1, 3) : fmtWithUnit(A1, 'm²', 3); }
    function a2Txt() { return convA2 ? fmtCmArea(A2, 3) : fmtWithUnit(A2, 'm²', 3); }
    function a1Map() { return convA1 ? (fmtCmArea(A1, 3) + ' = ' + fmtWithUnit(A1, 'm²', 3)) : fmtWithUnit(A1, 'm²', 3); }
    function a2Map() { return convA2 ? (fmtCmArea(A2, 3) + ' = ' + fmtWithUnit(A2, 'm²', 3)) : fmtWithUnit(A2, 'm²', 3); }
    let q, ans, unit, digits, explain, formulaHint, formulaMap, formulaPlugIn, formulaSteps;
    digits = 3;
    if (variant === 0) {
      q = 'Blood flows through a vessel of area ' + a1Txt() + ' at ' + fmtSci(v1, 3) + ' m/s. The vessel narrows to ' + a2Txt() + '. What is the speed after the narrowing?';
      ans = v2; unit = 'm/s';
      formulaHint = 'Continuity: A₁ v₁ = A₂ v₂  →  v₂ = v₁ (A₁/A₂)';
      formulaMap = [
        mapLine(a1Map(), 'A₁'),
        mapLine(fmtWithUnit(v1, 'm/s', 3), 'v₁'),
        mapLine(a2Map(), 'A₂')
      ];
      formulaPlugIn = fmtSci(v1, 3) + ' · (' + fmtSci(A1, 3) + '/' + fmtSci(A2, 3) + ')';
      formulaSteps = [
        'v₂ = v₁ (A₁/A₂)',
        '= ' + formulaPlugIn,
        '= ' + fmtSci(v2, 3) + ' m/s'
      ];
      explain = 'v₂ = v₁ × (A₁/A₂) = ' + fmtWithUnit(v2, 'm/s', 3) + '.';
    } else if (variant === 1) {
      q = 'A fluid flows at ' + fmtSci(v1, 3) + ' m/s in a section of area ' + a1Txt() + ' and at ' + fmtSci(v2, 3) + ' m/s downstream. What is the downstream cross-sectional area?';
      ans = A2; unit = 'm²';
      formulaHint = 'A₂ = A₁ (v₁/v₂)';
      formulaMap = [
        mapLine(fmtWithUnit(v1, 'm/s', 3), 'v₁'),
        mapLine(a1Map(), 'A₁'),
        mapLine(fmtWithUnit(v2, 'm/s', 3), 'v₂')
      ];
      formulaPlugIn = fmtSci(A1, 3) + ' · (' + fmtSci(v1, 3) + '/' + fmtSci(v2, 3) + ')';
      formulaSteps = [
        'A₂ = A₁ (v₁/v₂)',
        '= ' + formulaPlugIn,
        '= ' + fmtSci(A2, 3) + ' m²'
      ];
      explain = 'A₂ = A₁ × (v₁/v₂) = ' + fmtWithUnit(A2, 'm²', 3) + '.';
    } else {
      q = 'A vessel narrows from ' + a1Txt() + ' to ' + a2Txt() + '. If the downstream speed is ' + fmtSci(v2, 3) + ' m/s, what was the velocity before the narrowing?';
      ans = v1; unit = 'm/s';
      formulaHint = 'v₁ = v₂ (A₂/A₁)';
      formulaMap = [
        mapLine(a1Map(), 'A₁'),
        mapLine(a2Map(), 'A₂'),
        mapLine(fmtWithUnit(v2, 'm/s', 3), 'v₂')
      ];
      formulaPlugIn = fmtSci(v2, 3) + ' · (' + fmtSci(A2, 3) + '/' + fmtSci(A1, 3) + ')';
      formulaSteps = [
        'v₁ = v₂ (A₂/A₁)',
        '= ' + formulaPlugIn,
        '= ' + fmtSci(v1, 3) + ' m/s'
      ];
      explain = 'v₁ = v₂ × (A₂/A₁) = ' + fmtWithUnit(v1, 'm/s', 3) + '.';
    }
    let convLine = '';
    if (convA1) convLine = 'A₁ = ' + fmtCmArea(A1, 3) + ' = ' + fmtWithUnit(A1, 'm²', 3);
    else if (convA2) convLine = 'A₂ = ' + fmtCmArea(A2, 3) + ' = ' + fmtWithUnit(A2, 'm²', 3);
    const led = leadWork(formulaSteps, explain, convLine);
    const built = buildOpts(ans, unit, digits);
    return pack({
      key: 'continuity', variant: variant, q: q,
      options: built.options, correct: built.correct,
      explain: led.explain, formulaHint: formulaHint, formulaMap: formulaMap,
      formulaPlugIn: formulaPlugIn, formulaSteps: led.steps
    });
  }

  function generateMassFlowQuestion() {
    const variant = randInt(0, 2);
    const convert = rollConvert();
    const rho = pick([1000, 1050, 1060]);
    const A = pick([0.01, 0.02, 0.04, 0.05]);
    const v = pick([0.2, 0.4, 0.5, 0.8]);
    const Q = A * v;
    const mdot = rho * Q;
    let convA = false;
    let convRho = false;
    if (convert) {
      if (variant === 0 && Math.random() < 0.5) convRho = true;
      else convA = true;
    }
    const aTxt = convA ? fmtCmArea(A, 3) : fmtWithUnit(A, 'm²', 3);
    const aMap = convA ? (fmtCmArea(A, 3) + ' = ' + fmtWithUnit(A, 'm²', 3)) : fmtWithUnit(A, 'm²', 3);
    const rhoTxt = convRho ? fmtGperCm3(rho, 3) : (fmtSci(rho, 3) + ' kg/m³');
    const rhoMap = convRho ? (fmtGperCm3(rho, 3) + ' = ' + fmtSci(rho, 3) + ' kg/m³') : (fmtSci(rho, 3) + ' kg/m³');
    let q, ans, unit, digits, explain, formulaHint, formulaMap, formulaPlugIn, formulaSteps;
    digits = 3;
    if (variant === 0) {
      q = 'Blood of density ' + rhoTxt + ' flows at ' + fmtSci(v, 3) + ' m/s through a vessel of area ' + aTxt + '. What is the mass flow rate?';
      ans = mdot; unit = 'kg/s';
      formulaHint = 'ṁ = ρ A v';
      formulaMap = [
        mapLine(rhoMap, 'ρ'),
        mapLine(fmtWithUnit(v, 'm/s', 3), 'v'),
        mapLine(aMap, 'A')
      ];
      formulaPlugIn = fmtSci(rho, 3) + ' · ' + fmtSci(A, 3) + ' · ' + fmtSci(v, 3);
      formulaSteps = [
        'ṁ = ρ A v',
        '= ' + formulaPlugIn,
        '= ' + fmtSci(mdot, 3) + ' kg/s'
      ];
      explain = 'ṁ = ρAv = ' + fmtWithUnit(mdot, 'kg/s', 3) + '.';
    } else if (variant === 1) {
      q = 'A fluid flows at ' + fmtSci(v, 3) + ' m/s through an area of ' + aTxt + '. What is the volume flow rate?';
      ans = Q; unit = 'm³/s';
      formulaHint = 'Q = A v';
      formulaMap = [
        mapLine(fmtWithUnit(v, 'm/s', 3), 'v'),
        mapLine(aMap, 'A')
      ];
      formulaPlugIn = fmtSci(A, 3) + ' · ' + fmtSci(v, 3);
      formulaSteps = [
        'Q = A v',
        '= ' + formulaPlugIn,
        '= ' + fmtSci(Q, 3) + ' m³/s'
      ];
      explain = 'Q = Av = ' + fmtWithUnit(Q, 'm³/s', 3) + '.';
    } else {
      q = 'The volume flow rate through a vessel is ' + fmtSci(Q, 3) + ' m³/s and the cross-sectional area is ' + aTxt + '. What is the flow speed?';
      ans = v; unit = 'm/s';
      formulaHint = 'From Q = A v  →  v = Q / A';
      formulaMap = [
        mapLine(fmtWithUnit(Q, 'm³/s', 3), 'Q'),
        mapLine(aMap, 'A')
      ];
      formulaPlugIn = fmtSci(Q, 3) + ' / ' + fmtSci(A, 3);
      formulaSteps = [
        'v = Q/A',
        '= ' + formulaPlugIn,
        '= ' + fmtSci(v, 3) + ' m/s'
      ];
      explain = 'v = Q/A = ' + fmtWithUnit(v, 'm/s', 3) + '.';
    }
    let convLine = '';
    if (convRho) convLine = 'ρ = ' + fmtGperCm3(rho, 3) + ' = ' + fmtSci(rho, 3) + ' kg/m³';
    else if (convA) convLine = 'A = ' + fmtCmArea(A, 3) + ' = ' + fmtWithUnit(A, 'm²', 3);
    const led = leadWork(formulaSteps, explain, convLine);
    const built = buildOpts(ans, unit, digits);
    return pack({
      key: 'massFlow', variant: variant, q: q,
      options: built.options, correct: built.correct,
      explain: led.explain, formulaHint: formulaHint, formulaMap: formulaMap,
      formulaPlugIn: formulaPlugIn, formulaSteps: led.steps
    });
  }

  function generateBernoulliQuestion() {
    const variant = randInt(0, 2);
    const convert = rollConvert();
    const rho = 1000;
    let q, ans, unit, digits, explain, formulaHint, formulaMap, formulaPlugIn, formulaSteps, built;
    digits = 3;
    if (variant === 0) {
      const v1 = pick([0.5, 1.0, 1.5, 2.0]);
      const v2 = pick([2.0, 3.0, 4.0, 5.0]);
      const v2u = Math.max(v2, v1 + 1);
      const dP = 0.5 * rho * (v2u * v2u - v1 * v1);
      const rhoTxt = convert ? fmtGperCm3(rho, 3) : '1000 kg/m³';
      const rhoMap = convert ? (fmtGperCm3(rho, 3) + ' = 1000 kg/m³') : '1000 kg/m³';
      q = 'Along a horizontal streamline, blood of density ' + rhoTxt + ' speeds up from ' + fmtSci(v1, 2) + ' m/s to ' + fmtSci(v2u, 2) + ' m/s. By how much does the pressure drop?';
      ans = dP; unit = 'Pa';
      formulaHint = 'Same height: P + ½ρv² = const  →  P₁ − P₂ = ½ρ(v₂² − v₁²)';
      formulaMap = [
        mapLine(fmtWithUnit(v1, 'm/s', 2), 'v₁'),
        mapLine(fmtWithUnit(v2u, 'm/s', 2), 'v₂'),
        mapLine(rhoMap, 'ρ')
      ];
      formulaPlugIn = '½·1000(' + fmtSci(v2u, 2) + '² − ' + fmtSci(v1, 2) + '²)';
      formulaSteps = [
        'P₁ − P₂ = ½ρ(v₂² − v₁²)',
        '= ' + formulaPlugIn,
        '= 500·(' + fmtSci(v2u * v2u, 3) + ' − ' + fmtSci(v1 * v1, 3) + ') = ' + fmtSci(dP, 3) + ' Pa'
      ];
      explain = 'P₁ − P₂ = ½ρ(v₂² − v₁²) = ' + fmtWithUnit(dP, 'Pa', 3) + '.';
      if (convert) {
        const line = 'ρ = ' + fmtGperCm3(rho, 3) + ' = 1000 kg/m³';
        formulaSteps = [line].concat(formulaSteps);
        explain = line + '. ' + explain;
      }
      built = buildOpts(ans, unit, digits);
    } else if (variant === 1) {
      const v1 = pick([0.5, 1.0, 1.5]);
      const dP = pick([2000, 4500, 8000, 13500, 24500]);
      const v2sq = v1 * v1 + (2 * dP) / rho;
      const v2 = Math.sqrt(v2sq);
      const rhoTxt = convert ? fmtGperCm3(rho, 3) : '1000 kg/m³';
      const rhoMap = convert ? (fmtGperCm3(rho, 3) + ' = 1000 kg/m³') : '1000 kg/m³';
      q = 'On a horizontal streamline in a fluid of density ' + rhoTxt + ', pressure falls by ' + fmtSci(dP, 3) + ' Pa as speed rises from ' + fmtSci(v1, 2) + ' m/s. What is the new speed?';
      ans = v2; unit = 'm/s';
      formulaHint = 'P₁ − P₂ = ½ρ(v₂² − v₁²)  →  v₂ = √(v₁² + 2(P₁−P₂)/ρ)';
      formulaMap = [
        mapLine(fmtWithUnit(dP, 'Pa', 3), 'P₁ − P₂'),
        mapLine(fmtWithUnit(v1, 'm/s', 2), 'v₁'),
        mapLine(rhoMap, 'ρ')
      ];
      formulaPlugIn = '√(' + fmtSci(v1, 2) + '² + 2·' + fmtSci(dP, 3) + '/1000)';
      formulaSteps = [
        'v₂ = √(v₁² + 2ΔP/ρ)',
        '= ' + formulaPlugIn,
        '= ' + fmtSci(v2, 3) + ' m/s'
      ];
      explain = 'v₂ = √(v₁² + 2ΔP/ρ) = ' + fmtWithUnit(v2, 'm/s', 3) + '.';
      if (convert) {
        const line = 'ρ = ' + fmtGperCm3(rho, 3) + ' = 1000 kg/m³';
        formulaSteps = [line].concat(formulaSteps);
        explain = line + '. ' + explain;
      }
      built = buildOpts(ans, unit, digits, [0.5, 2, 0.25, 4, 1.5, 0.75]);
    } else {
      const dh = pick([0.5, 1.0, 1.5, 2.0, 2.5]);
      const dP = rho * G * dh;
      const hTxt = convert ? fmtCmLen(dh, 2) : fmtWithUnit(dh, 'm', 2);
      const hMap = convert ? (fmtCmLen(dh, 2) + ' = ' + fmtWithUnit(dh, 'm', 2)) : fmtWithUnit(dh, 'm', 2);
      q = 'A fluid of density 1000 kg/m³ moves slowly up a height change of ' + hTxt + ', with kinetic terms negligible. Using Bernoulli, by how much does pressure fall?';
      ans = dP; unit = 'Pa';
      formulaHint = 'ΔP ≈ ρ g Δh';
      formulaMap = [
        mapLine(hMap, 'Δh'),
        mapLine('1000 kg/m³', 'ρ'),
        mapLine('9.8 m/s²', 'g')
      ];
      formulaPlugIn = '1000 · 9.8 · ' + fmtSci(dh, 2);
      formulaSteps = [
        'ΔP ≈ ρ g Δh',
        '= ' + formulaPlugIn,
        '= ' + fmtSci(dP, 3) + ' Pa'
      ];
      explain = 'ΔP ≈ ρgΔh = ' + fmtWithUnit(dP, 'Pa', 3) + '.';
      if (convert) {
        const line = 'Δh = ' + fmtCmLen(dh, 2) + ' = ' + fmtWithUnit(dh, 'm', 2);
        formulaSteps = [line].concat(formulaSteps);
        explain = line + '. ' + explain;
      }
      built = buildOpts(ans, unit, digits);
    }
    return pack({
      key: 'bernoulli', variant: variant, q: q,
      options: built.options, correct: built.correct,
      explain: explain, formulaHint: formulaHint, formulaMap: formulaMap,
      formulaPlugIn: formulaPlugIn, formulaSteps: formulaSteps
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
