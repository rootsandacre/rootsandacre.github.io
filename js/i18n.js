/* ============================================================
   ROOTS & ACRE — language preference & suggestion
   Each language is a static page (/ = EN, /id/ = ID) generated
   by scripts/build-pages.js; nothing is swapped in place.
   This script only:
   1. remembers an explicit toggle choice (localStorage), and
   2. shows a dismissible "Lihat dalam Bahasa Indonesia?" banner
      to Indonesian-language browsers on the EN page.
   It NEVER auto-redirects — crawlers must reach both pages.
   ============================================================ */

(function () {
  'use strict';

  var lang = (document.documentElement.lang || 'en').slice(0, 2);

  function save(l) {
    try { window.localStorage.setItem('ra_lang', l); } catch (e) {}
  }
  function saved() {
    try { return window.localStorage.getItem('ra_lang'); } catch (e) { return null; }
  }

  // Remember explicit choices made via the nav toggle
  var links = document.querySelectorAll('.lang-switch a[data-lang]');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function () {
      save(this.getAttribute('data-lang'));
    });
  }

  // Suggest the ID page to Indonesian-language browsers (EN page only)
  if (lang === 'en' && !saved()) {
    var nav = ((navigator.language || navigator.userLanguage || '') + '').toLowerCase();
    if (nav.indexOf('id') === 0) {
      var banner = document.createElement('div');
      banner.className = 'lang-banner';
      banner.setAttribute('role', 'status');
      banner.innerHTML =
        '<span>Lihat dalam <a href="/id/">Bahasa Indonesia</a>?</span>' +
        '<button type="button" aria-label="Tutup">&times;</button>';
      banner.querySelector('a').addEventListener('click', function () { save('id'); });
      banner.querySelector('button').addEventListener('click', function () {
        save('en');
        banner.parentNode.removeChild(banner);
      });
      document.body.appendChild(banner);
    }
  }
})();
