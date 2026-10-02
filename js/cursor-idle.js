/*! ATC Math brushCursor — idle auto-hide after inactivity, show on move.
 * Main Menu only. Quiz keeps legacy #cursor ring; Study uses the system cursor.
 */
(function () {
  'use strict';

  function customCursorOn() {
    var v = document.documentElement.getAttribute('data-custom-cursor');
    return v !== 'off';
  }

  if (!customCursorOn()) return;

  var IDLE_MS = 1500;
  var HOVER_SEL = '.ps2-menu-item,.ps2-back-btn,.option-card,.variant-pill,.mode-btn,.btn,.opt,.card,.chapter-toggle,.nav-btn,.fs-btn,.portal-card,.settings-nav-btn,.settings-btn';

  /* Inject brush + idle helpers (Main Menu). Study/Quiz do not load this script. */
  if (!document.querySelector('style[data-atc-cursor-idle]')) {
    var style = document.createElement('style');
    style.setAttribute('data-atc-cursor-idle', '1');
    style.textContent =
      '*{cursor:none !important;}' +
      '.brushCursor{position:fixed;pointer-events:none;z-index:2147483647;width:20px;height:20px;border-radius:50%;' +
      'background:radial-gradient(circle,var(--accent-0) 0,var(--accent-0) 8px,rgba(var(--accent-0-rgb),0.8) 8px,rgba(var(--accent-0-rgb),0.8) 10px);' +
      'transform:translate(-50%,-50%);left:-100px;top:-100px;transition:opacity 0.2s ease;}' +
      '.brushCursor.hidden{opacity:0;}' +
      '.aura{position:absolute;width:100px;height:100px;left:calc(50% - 50px);top:calc(50% - 50px);' +
      'background:radial-gradient(circle,rgba(var(--accent-0-rgb),0.5) 0%,rgba(var(--accent-0-rgb),0) 70%);' +
      'opacity:0.5;pointer-events:none;animation:atc-brush-breathe 2s infinite;}' +
      '@keyframes atc-brush-breathe{0%{transform:scale(1);opacity:0.5;}50%{transform:scale(1.2);opacity:0.8;}100%{transform:scale(1);opacity:0.5;}}' +
      /* Idle: kill CSS :hover ghosts under the hover-blocker */
      'body.cursor-idle .ps2-menu-item:hover:not(.focused),' +
      'body.cursor-idle .ps2-menu-item:focus-visible:not(.focused){' +
      'transform:none!important;background:linear-gradient(90deg,rgba(var(--accent-0-rgb),0.09) 0%,rgba(var(--accent-0-rgb),0.02) 100%)!important;box-shadow:none!important;}' +
      'body.cursor-idle .ps2-back-btn:hover{border-color:var(--col-border)!important;color:var(--col-text-muted)!important;box-shadow:none!important;}' +
      'body.cursor-idle .ps2-menu-item,body.cursor-idle .ps2-back-btn,' +
      'body.cursor-idle .btn,body.cursor-idle .chapter-toggle,' +
      'body.cursor-idle .opt,body.cursor-idle .card,body.cursor-idle .nav-btn,body.cursor-idle .fs-btn,' +
      'body.cursor-idle .portal-card,body.cursor-idle .settings-nav-btn,body.cursor-idle .settings-btn{' +
      'pointer-events:none;}' +
      'body.cursor-idle .btn:hover,body.cursor-idle .btn.primary:hover,' +
      'body.cursor-idle .chapter-toggle:hover{transform:none!important;filter:none!important;box-shadow:none!important;}' +
      'body.cursor-idle .opt:hover,body.cursor-idle .card:hover,' +
      'body.cursor-idle .nav-btn:hover,body.cursor-idle .fs-btn:hover,' +
      'body.cursor-idle .portal-card:hover{transform:none!important;box-shadow:none!important;filter:none!important;}';
    (document.head || document.documentElement).appendChild(style);
  }

  function boot() {
    if (document.body.dataset.atcCursorIdle === '1') return;
    document.body.dataset.atcCursorIdle = '1';

    if (typeof window.mouseHoveredItem === 'undefined') window.mouseHoveredItem = null;

    var brush = document.createElement('div');
    brush.className = 'brushCursor';
    var aura = document.createElement('div');
    aura.className = 'aura';
    brush.appendChild(aura);
    document.body.appendChild(brush);

    var hoverBlocker = document.createElement('div');
    hoverBlocker.style.cssText = 'position:fixed;inset:0;z-index:2147483646;pointer-events:none;';
    document.body.appendChild(hoverBlocker);

    var idleTimer;
    var keyActive = false;

    function overlayPresent() {
      var o = document.getElementById('exit-confirm-overlay');
      if (!o) return false;
      var cs = getComputedStyle(o);
      return cs.display !== 'none' && cs.visibility !== 'hidden' && parseFloat(cs.opacity) > 0;
    }

    function updateBackBtn() {
      var backBtn = document.getElementById('floating-back-btn');
      if (!backBtn) return;
      var hide = keyActive || overlayPresent();
      backBtn.style.transition = 'opacity 0.2s ease';
      backBtn.style.opacity = hide ? '0' : '';
      backBtn.style.pointerEvents = hide ? 'none' : '';
    }

    function hideCursor() {
      clearTimeout(idleTimer);
      brush.classList.add('hidden');
      hoverBlocker.style.pointerEvents = 'auto';
      document.body.classList.add('cursor-idle');
      document.querySelectorAll(
        '.ps2-menu-item.focused,.ps2-back-btn.focused,.option-card.focused,' +
        '.variant-pill.focused,.mode-btn.focused,.btn.focused'
      ).forEach(function (el) { el.classList.remove('focused'); });
      window.mouseHoveredItem = null;
    }

    function showCursor() {
      if (!customCursorOn()) return;
      brush.classList.remove('hidden');
      hoverBlocker.style.pointerEvents = 'none';
      document.body.classList.remove('cursor-idle');
      keyActive = false;
      updateBackBtn();
      clearTimeout(idleTimer);
      idleTimer = setTimeout(hideCursor, IDLE_MS);
      var item = window.mouseHoveredItem;
      if (item && item.classList && item.classList.contains('ps2-menu-item')) {
        var items = Array.prototype.slice.call(
          document.querySelectorAll('#ps2-home .ps2-menu-item')
        );
        var idx = items.indexOf(item);
        if (idx !== -1 && typeof window.__ps2SetFocusIdx === 'function') {
          window.__ps2SetFocusIdx(idx);
        } else if (idx !== -1) {
          items.forEach(function (el, i) { el.classList.toggle('focused', i === idx); });
        }
      }
    }

    try {
      new MutationObserver(updateBackBtn).observe(document.body, { childList: true, subtree: true });
    } catch (e) { /* ignore */ }

    document.addEventListener('mousemove', function (e) {
      if (!customCursorOn()) return;
      brush.style.left = e.clientX + 'px';
      brush.style.top = e.clientY + 'px';
      showCursor();
    });
    document.addEventListener('keydown', function () {
      hideCursor();
      keyActive = true;
      updateBackBtn();
    });
    document.addEventListener('mousedown', showCursor, true);

    document.addEventListener('mouseover', function (e) {
      var item = e.target.closest(HOVER_SEL);
      window.mouseHoveredItem = item || null;
    }, true);
    document.addEventListener('mouseout', function (e) {
      var item = e.target.closest(HOVER_SEL);
      if (item && window.mouseHoveredItem === item) window.mouseHoveredItem = null;
    }, true);

    idleTimer = setTimeout(hideCursor, IDLE_MS);
  }

  if (document.body) boot();
  else document.addEventListener('DOMContentLoaded', boot);
})();
