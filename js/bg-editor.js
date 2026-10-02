/* Live background-layer editor for Main Menu + Quiz.
   Console: editBackground()  or  BG.edit()
   Optional sessionStorage persistence. Study does not load this file. */
(function (global) {
  'use strict';

  var STORAGE_KEY = 'pt1_bg_layers_v1';
  var panel = null;
  var persistOn = false;

  var LAYER_DEFS = [
    { id: 'particles', label: 'Particle drifts (WebGL ambient)', group: 'shared', kind: 'toggle', api: 'particles', key: 'particles' },
    { id: 'particleDensity', label: 'Particle density', group: 'shared', kind: 'density', api: 'particles', key: 'particleDensity', depends: 'particles' },
    { id: 'grid', label: 'Grid overlay', group: 'shared', kind: 'toggle', api: 'particles', key: 'grid' },
    { id: 'calcOverlays', label: 'Calculator particle overlays', group: 'shared', kind: 'toggle', api: 'particles', key: 'calcOverlays' },
    { id: 'streams', label: 'Stream rain (falling lines)', group: 'quiz', kind: 'toggle', api: 'quiz', key: 'streams' },
    { id: 'streamDensity', label: 'Stream density', group: 'quiz', kind: 'density', api: 'quiz', densKey: 'streamDensity', depends: 'streams' },
    { id: 'orbs', label: 'Soft orbs', group: 'quiz', kind: 'toggle', api: 'quiz', key: 'orbs' },
    { id: 'orbDensity', label: 'Orb density', group: 'quiz', kind: 'density', api: 'quiz', densKey: 'orbDensity', depends: 'orbs' },
    { id: 'fireworks', label: 'Firework bursts', group: 'quiz', kind: 'toggle', api: 'quiz', key: 'fireworks' },
    { id: 'skinPattern', label: 'Skin pattern (body overlay)', group: 'quiz', kind: 'toggle', api: 'quiz', key: 'skinPattern' },
    { id: 'radialGlows', label: 'Ambient radial glows', group: 'quiz', kind: 'toggle', api: 'quiz', key: 'radialGlows' }
  ];

  function hasParticles() { return !!(global.BgParticles && typeof global.BgParticles.getState === 'function'); }
  function hasQuiz() { return !!(global.BgQuizFx && typeof global.BgQuizFx.getState === 'function'); }

  function availableLayers() {
    return LAYER_DEFS.filter(function (d) {
      if (d.api === 'particles') return hasParticles();
      if (d.api === 'quiz') return hasQuiz();
      return false;
    });
  }

  function readCombined() {
    var out = { persist: persistOn };
    if (hasParticles()) {
      var ps = global.BgParticles.getState();
      out.particles = !!ps.particles;
      out.particleDensity = ps.particleDensity;
      out.grid = !!ps.grid;
      out.calcOverlays = !!ps.calcOverlays;
    }
    if (hasQuiz()) {
      var qs = global.BgQuizFx.getState();
      out.streams = !!qs.streams;
      out.orbs = !!qs.orbs;
      out.fireworks = !!qs.fireworks;
      out.streamDensity = qs.streamDensity;
      out.orbDensity = qs.orbDensity;
      out.skinPattern = !!qs.skinPattern;
      out.radialGlows = !!qs.radialGlows;
    }
    return out;
  }

  function defaultsForPage() {
    var d = { persist: false };
    if (hasParticles()) {
      d.particles = true; d.particleDensity = 1; d.grid = true; d.calcOverlays = true;
    }
    if (hasQuiz()) {
      d.streams = true; d.streamDensity = 1; d.orbs = true; d.orbDensity = 1;
      d.fireworks = true; d.skinPattern = true; d.radialGlows = true;
    }
    return d;
  }

  function applyCombined(st) {
    if (!st) return;
    persistOn = !!st.persist;
    if (hasParticles()) {
      global.BgParticles.applyState({
        particles: st.particles !== false,
        particleDensity: st.particleDensity != null ? st.particleDensity : 1,
        grid: st.grid !== false,
        calcOverlays: st.calcOverlays !== false
      });
    }
    if (hasQuiz()) {
      global.BgQuizFx.applyState({
        streams: st.streams !== false,
        orbs: st.orbs !== false,
        fireworks: st.fireworks !== false,
        streamDensity: st.streamDensity != null ? st.streamDensity : 1,
        orbDensity: st.orbDensity != null ? st.orbDensity : 1,
        skinPattern: st.skinPattern !== false,
        radialGlows: st.radialGlows !== false
      });
    }
  }

  function saveIfPersisting() {
    if (!persistOn) return;
    try {
      var st = readCombined();
      st.persist = true;
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(st));
    } catch (e) {}
  }

  function loadPersisted() {
    try {
      var raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) { return null; }
  }

  function clearPersisted() {
    try { sessionStorage.removeItem(STORAGE_KEY); } catch (e) {}
  }

  function removedReport() {
    var cur = readCombined();
    var def = defaultsForPage();
    var lines = [];
    var labels = {};
    LAYER_DEFS.forEach(function (d) { labels[d.id] = d.label; });

    availableLayers().forEach(function (d) {
      if (d.kind === 'toggle') {
        var on = !!cur[d.key];
        var was = def[d.key] !== false;
        if (was && !on) lines.push('- OFF: ' + d.label + ' [' + d.id + ']');
      } else if (d.kind === 'density') {
        var key = d.densKey || d.key;
        var now = Number(cur[key]);
        var base = Number(def[key] != null ? def[key] : 1);
        if (Number.isFinite(now) && Math.abs(now - base) > 0.01) {
          lines.push('- DENSITY: ' + d.label + ' [' + key + '] = ' + now + ' (default ' + base + ')');
        }
      }
    });

    var page = hasQuiz() ? 'Quiz' : 'Main Menu';
    var header = 'Background layers removed / changed (' + page + '):';
    if (!lines.length) return header + '\n(none — all layers at defaults)';
    return header + '\n' + lines.join('\n');
  }

  function ensureStyles() {
    if (document.getElementById('bg-editor-styles')) return;
    var s = document.createElement('style');
    s.id = 'bg-editor-styles';
    s.textContent = [
      '#bg-editor-panel{position:fixed;top:72px;right:18px;z-index:200000;width:min(360px,92vw);',
      'background:linear-gradient(180deg,rgba(16,18,28,.98),rgba(8,10,16,.98));',
      'border:1.5px solid var(--accent-0,#ff8800);border-radius:14px;',
      'box-shadow:0 18px 50px rgba(0,0,0,.55),0 0 0 1px rgba(var(--accent-0-rgb,255,136,0),.25);',
      'color:#e8edf5;font:13px/1.4 system-ui,sans-serif;display:none;flex-direction:column;max-height:min(78vh,640px);overflow:hidden}',
      '#bg-editor-panel.open{display:flex}',
      '#bg-editor-panel header{display:flex;align-items:center;justify-content:space-between;gap:10px;',
      'padding:12px 14px;border-bottom:1px solid rgba(255,255,255,.08);flex-shrink:0}',
      '#bg-editor-panel header h2{margin:0;font-size:14px;font-weight:700;color:var(--accent-0,#ff8800);letter-spacing:.02em}',
      '#bg-editor-panel header button{background:transparent;border:none;color:#94a3b8;font-size:20px;line-height:1;cursor:pointer;padding:0 4px}',
      '#bg-editor-panel header button:hover{color:#fff}',
      '#bg-editor-panel .bg-ed-body{padding:10px 12px 12px;overflow:auto;flex:1}',
      '#bg-editor-panel .bg-ed-hint{font-size:11px;color:#94a3b8;margin:0 0 10px}',
      '#bg-editor-panel .bg-ed-row{display:flex;align-items:center;justify-content:space-between;gap:10px;',
      'padding:8px 8px;border-radius:8px;background:rgba(255,255,255,.03);margin-bottom:6px}',
      '#bg-editor-panel .bg-ed-row label.name{flex:1;font-size:12.5px;color:#e8edf5}',
      '#bg-editor-panel .bg-ed-row .dens{display:flex;align-items:center;gap:8px;width:100%;margin-top:4px}',
      '#bg-editor-panel .bg-ed-row .dens input[type=range]{flex:1}',
      '#bg-editor-panel .bg-ed-row .dens span{min-width:36px;text-align:right;font-variant-numeric:tabular-nums;color:var(--accent-1,#ffb968);font-size:12px}',
      '#bg-editor-panel .toggle{position:relative;width:42px;height:22px;flex-shrink:0}',
      '#bg-editor-panel .toggle input{opacity:0;width:0;height:0}',
      '#bg-editor-panel .toggle span{position:absolute;inset:0;background:#2a3142;border-radius:22px;cursor:pointer;transition:.2s;border:1px solid #3a4458}',
      '#bg-editor-panel .toggle span:before{content:"";position:absolute;width:16px;height:16px;left:2px;top:2px;background:#94a3b8;border-radius:50%;transition:.2s}',
      '#bg-editor-panel .toggle input:checked+span{background:rgba(var(--accent-0-rgb,255,136,0),.25);border-color:var(--accent-0,#ff8800)}',
      '#bg-editor-panel .toggle input:checked+span:before{transform:translateX(20px);background:var(--accent-0,#ff8800)}',
      '#bg-editor-panel .bg-ed-actions{display:flex;flex-wrap:wrap;gap:8px;padding:10px 12px 12px;border-top:1px solid rgba(255,255,255,.08);flex-shrink:0}',
      '#bg-editor-panel .bg-ed-actions button{flex:1 1 auto;min-width:0;padding:8px 10px;border-radius:8px;border:1px solid rgba(var(--accent-0-rgb,255,136,0),.4);',
      'background:rgba(var(--accent-0-rgb,255,136,0),.1);color:var(--accent-0,#ff8800);font-size:12px;font-weight:600;cursor:pointer}',
      '#bg-editor-panel .bg-ed-actions button:hover{background:rgba(var(--accent-0-rgb,255,136,0),.2)}',
      '#bg-editor-panel .bg-ed-actions button.secondary{border-color:#3a4458;background:rgba(255,255,255,.04);color:#cbd5e1}',
      '#bg-editor-panel .bg-ed-persist{display:flex;align-items:center;gap:8px;padding:0 12px 10px;font-size:12px;color:#94a3b8}',
      '#bg-editor-panel .bg-ed-toast{position:absolute;left:12px;right:12px;bottom:12px;padding:8px 10px;border-radius:8px;',
      'background:rgba(20,28,40,.96);border:1px solid var(--accent-0,#ff8800);color:#e8edf5;font-size:12px;display:none;z-index:2}'
    ].join('');
    document.head.appendChild(s);
  }

  function setToggle(def, on) {
    if (def.api === 'particles') global.BgParticles.setEnabled(def.key, on);
    else if (def.api === 'quiz') global.BgQuizFx.setEnabled(def.key, on);
    saveIfPersisting();
    refreshPanelValues();
  }

  function setDensity(def, val) {
    if (def.api === 'particles') global.BgParticles.setDensity(val);
    else if (def.api === 'quiz') global.BgQuizFx.setDensity(def.densKey, val);
    saveIfPersisting();
    refreshPanelValues();
  }

  function refreshPanelValues() {
    if (!panel) return;
    var st = readCombined();
    panel.querySelectorAll('[data-bg-toggle]').forEach(function (el) {
      var id = el.getAttribute('data-bg-toggle');
      el.checked = !!st[id];
    });
    panel.querySelectorAll('[data-bg-density]').forEach(function (el) {
      var id = el.getAttribute('data-bg-density');
      var v = st[id] != null ? st[id] : 1;
      el.value = String(v);
      var lab = panel.querySelector('[data-bg-density-label="' + id + '"]');
      if (lab) lab.textContent = Number(v).toFixed(2);
    });
    var p = panel.querySelector('[data-bg-persist]');
    if (p) p.checked = !!persistOn;
  }

  function buildPanel() {
    ensureStyles();
    if (panel) return panel;
    panel = document.createElement('aside');
    panel.id = 'bg-editor-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Background layer editor');

    var layers = availableLayers();
    var rows = layers.map(function (d) {
      if (d.kind === 'toggle') {
        return '<div class="bg-ed-row">' +
          '<label class="name" for="bg-ed-' + d.id + '">' + d.label + '</label>' +
          '<label class="toggle"><input type="checkbox" id="bg-ed-' + d.id + '" data-bg-toggle="' + d.id + '" checked>' +
          '<span></span></label></div>';
      }
      var densId = d.densKey || d.key;
      return '<div class="bg-ed-row" style="flex-direction:column;align-items:stretch">' +
        '<label class="name">' + d.label + '</label>' +
        '<div class="dens"><input type="range" min="0" max="2" step="0.05" value="1" data-bg-density="' + densId + '">' +
        '<span data-bg-density-label="' + densId + '">1.00</span></div></div>';
    }).join('');

    panel.innerHTML =
      '<header><h2>Background layers</h2><button type="button" data-bg-close title="Close">×</button></header>' +
      '<div class="bg-ed-body">' +
      '<p class="bg-ed-hint">Toggle animated layers live. Use Copy report to paste removed layers back to the agent.</p>' +
      (rows || '<p class="bg-ed-hint">No editable layers on this page.</p>') +
      '</div>' +
      '<label class="bg-ed-persist"><input type="checkbox" data-bg-persist> Persist toggles in sessionStorage</label>' +
      '<div class="bg-ed-actions">' +
      '<button type="button" data-bg-copy>Copy removed / report</button>' +
      '<button type="button" class="secondary" data-bg-reset>Reset defaults</button>' +
      '<button type="button" class="secondary" data-bg-all-off>All off</button>' +
      '</div>' +
      '<div class="bg-ed-toast" data-bg-toast></div>';

    document.body.appendChild(panel);

    panel.querySelector('[data-bg-close]').addEventListener('click', close);
    panel.addEventListener('change', function (e) {
      var t = e.target;
      if (t.matches('[data-bg-toggle]')) {
        var id = t.getAttribute('data-bg-toggle');
        var def = LAYER_DEFS.find(function (x) { return x.id === id; });
        if (def) setToggle(def, t.checked);
      }
      if (t.matches('[data-bg-persist]')) {
        persistOn = !!t.checked;
        if (persistOn) saveIfPersisting();
        else clearPersisted();
      }
    });
    panel.addEventListener('input', function (e) {
      var t = e.target;
      if (t.matches('[data-bg-density]')) {
        var id = t.getAttribute('data-bg-density');
        var def = LAYER_DEFS.find(function (x) { return (x.densKey || x.key) === id; });
        var lab = panel.querySelector('[data-bg-density-label="' + id + '"]');
        if (lab) lab.textContent = Number(t.value).toFixed(2);
        if (def) setDensity(def, t.value);
      }
    });
    panel.querySelector('[data-bg-copy]').addEventListener('click', function () {
      var report = removedReport();
      function done(ok) {
        var toast = panel.querySelector('[data-bg-toast]');
        toast.style.display = 'block';
        toast.textContent = ok ? 'Copied report to clipboard.' : 'Copy failed — report logged to console.';
        console.log(report);
        setTimeout(function () { toast.style.display = 'none'; }, 2200);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(report).then(function () { done(true); }).catch(function () { done(false); });
      } else {
        done(false);
      }
    });
    panel.querySelector('[data-bg-reset]').addEventListener('click', function () {
      var d = defaultsForPage();
      d.persist = persistOn;
      applyCombined(d);
      if (persistOn) saveIfPersisting();
      else clearPersisted();
      refreshPanelValues();
    });
    panel.querySelector('[data-bg-all-off]').addEventListener('click', function () {
      var st = readCombined();
      availableLayers().forEach(function (d) {
        if (d.kind === 'toggle') st[d.key] = false;
      });
      st.persist = persistOn;
      applyCombined(st);
      saveIfPersisting();
      refreshPanelValues();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel && panel.classList.contains('open')) close();
    });

    return panel;
  }

  function open() {
    buildPanel();
    refreshPanelValues();
    panel.classList.add('open');
    console.info('[BG] Background editor open. Copy removed / report when done.');
    return panel;
  }

  function close() {
    if (panel) panel.classList.remove('open');
  }

  function toggle() {
    buildPanel();
    if (panel.classList.contains('open')) close();
    else open();
  }

  function editBackground() { return open(); }

  var BG = {
    edit: open,
    open: open,
    close: close,
    toggle: toggle,
    report: function () { var r = removedReport(); console.log(r); return r; },
    state: readCombined,
    apply: function (st) { applyCombined(st); saveIfPersisting(); refreshPanelValues(); },
    reset: function () {
      var d = defaultsForPage();
      d.persist = persistOn;
      applyCombined(d);
      if (persistOn) saveIfPersisting();
      else clearPersisted();
      refreshPanelValues();
    }
  };

  global.editBackground = editBackground;
  global.BG = BG;

  // Restore session toggles after APIs are ready
  function boot() {
    var saved = loadPersisted();
    if (saved && saved.persist) {
      persistOn = true;
      applyCombined(saved);
    }
    console.info('[BG] editBackground() / BG.edit() — live background layer editor');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else setTimeout(boot, 0);
})(typeof window !== 'undefined' ? window : globalThis);
