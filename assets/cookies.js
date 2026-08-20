/* ──────────────────────────────────────────────────────────────
   Switchback Security Training — cookie consent
   ──────────────────────────────────────────────────────────────
   The LinkedIn Insight Tag is NOT loaded until the visitor accepts.
   Declining stores the choice and loads nothing. The choice is kept
   in localStorage, so it is per-browser and never leaves the device.

   To stop all analytics site-wide, delete the reference to this file
   from the 15 HTML pages — nothing else loads the tag.
   ────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var PARTNER_ID = '9871172';
  var KEY = 'sst.consent.v1';       // bump the version to re-ask everyone
  var choice = null;

  try { choice = window.localStorage.getItem(KEY); } catch (e) { choice = null; }

  /* ── the tag itself, loaded only on consent ─────────────── */
  function loadInsightTag() {
    if (window._linkedin_data_partner_ids) return;   // already loaded
    window._linkedin_partner_id = PARTNER_ID;
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    window._linkedin_data_partner_ids.push(PARTNER_ID);
    if (!window.lintrk) {
      window.lintrk = function (a, b) { window.lintrk.q.push([a, b]); };
      window.lintrk.q = [];
    }
    var s = document.getElementsByTagName('script')[0];
    var b = document.createElement('script');
    b.type = 'text/javascript';
    b.async = true;
    b.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
    s.parentNode.insertBefore(b, s);
  }

  function remember(value) {
    try { window.localStorage.setItem(KEY, value); } catch (e) {}
  }

  /* ── banner ─────────────────────────────────────────────── */
  var CSS = [
    '.sst-cc{position:fixed;left:0;right:0;bottom:0;z-index:9999;',
    'background:#2B1915;color:#EFE9E1;border-top:2px solid #B49BE8;',
    'box-shadow:0 -8px 28px rgba(0,0,0,.28);',
    'font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;',
    'transform:translateY(110%);transition:transform .32s ease}',
    '.sst-cc.is-in{transform:none}',
    '.sst-cc__in{max-width:1080px;margin:0 auto;padding:18px 20px;',
    'display:flex;gap:18px;align-items:center;flex-wrap:wrap}',
    '.sst-cc__tx{flex:1 1 320px;min-width:260px;font-size:14px;line-height:1.5;margin:0;color:#D9D0C8}',
    '.sst-cc__tx b{color:#EFE9E1;font-weight:600}',
    '.sst-cc__bt{display:flex;gap:10px;flex:0 0 auto}',
    '.sst-cc__b{font:inherit;font-size:13px;font-weight:600;letter-spacing:.02em;',
    'padding:10px 20px;border-radius:3px;cursor:pointer;border:1px solid #B49BE8;',
    'background:transparent;color:#B49BE8;transition:background .15s ease,color .15s ease}',
    '.sst-cc__b:hover{background:rgba(180,155,232,.14)}',
    '.sst-cc__b--yes{background:#B49BE8;color:#2B1915;border-color:#B49BE8}',
    '.sst-cc__b--yes:hover{background:#C7B3EF}',
    '.sst-cc__b:focus-visible{outline:2px solid #E9A64F;outline-offset:2px}',
    '@media(max-width:560px){.sst-cc__in{padding:16px}.sst-cc__bt{width:100%}',
    '.sst-cc__b{flex:1 1 0}}',
    '@media(prefers-reduced-motion:reduce){.sst-cc{transition:none}}'
  ].join('');

  function injectCSS() {
    var st = document.createElement('style');
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  function showBanner() {
    injectCSS();

    var bar = document.createElement('div');
    bar.className = 'sst-cc';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-live', 'polite');
    bar.setAttribute('aria-label', 'Cookie notice');

    var inner = document.createElement('div');
    inner.className = 'sst-cc__in';

    var p = document.createElement('p');
    p.className = 'sst-cc__tx';
    p.innerHTML = '<b>Cookies.</b> This site uses the LinkedIn Insight Tag to measure ' +
      'which pages bring people to our trainings. It sets third-party cookies and is ' +
      'only loaded if you accept. Decline and nothing is set \u2014 the site works the same.';

    var wrap = document.createElement('div');
    wrap.className = 'sst-cc__bt';

    var no = document.createElement('button');
    no.type = 'button';
    no.className = 'sst-cc__b';
    no.textContent = 'Decline';

    var yes = document.createElement('button');
    yes.type = 'button';
    yes.className = 'sst-cc__b sst-cc__b--yes';
    yes.textContent = 'Accept';

    function close() {
      bar.classList.remove('is-in');
      window.setTimeout(function () {
        if (bar.parentNode) bar.parentNode.removeChild(bar);
      }, 340);
    }

    no.addEventListener('click', function () { remember('declined'); close(); });
    yes.addEventListener('click', function () {
      remember('accepted');
      loadInsightTag();
      close();
    });

    wrap.appendChild(no);
    wrap.appendChild(yes);
    inner.appendChild(p);
    inner.appendChild(wrap);
    bar.appendChild(inner);
    document.body.appendChild(bar);

    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () { bar.classList.add('is-in'); });
    });
  }

  /* ── decide what to do on load ──────────────────────────── */
  function start() {
    if (choice === 'accepted') { loadInsightTag(); return; }
    if (choice === 'declined') { return; }
    showBanner();
  }

  /* Lets a visitor change their mind: link to "#cookie-settings",
     or call window.sstCookiePrefs() from anywhere. */
  window.sstCookiePrefs = function () {
    try { window.localStorage.removeItem(KEY); } catch (e) {}
    if (!document.querySelector('.sst-cc')) showBanner();
  };
  if (window.location.hash === '#cookie-settings') {
    window.setTimeout(window.sstCookiePrefs, 0);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
