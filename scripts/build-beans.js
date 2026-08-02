#!/usr/bin/env node
/* ============================================================
   ROOTS & ACRE — beans.rootsandacre.com builder

   Generates the link-in-bio page: one screen, four destinations,
   no scrolling. This is the URL in the Instagram bio.

   Usage:  node scripts/build-beans.js
           BEANS_DIR=/some/path node scripts/build-beans.js

   WHY THIS LIVES IN THE MAIN REPO
   GitHub Pages allows one custom domain per repository, so the
   subdomain has to be served from a second repo. But the business
   facts must not be duplicated (CLAUDE.md rule 1), so the generator
   stays here, next to scripts/site-facts.js, and writes its output
   into the second repo's working copy. That repo holds generated
   files only — never hand-edit anything in it.

   Design tokens are lifted out of css/styles.css at build time
   (TOKENS:START/END markers) rather than re-transcribed, so the bio
   page cannot drift from the main site's palette.

   Output (all generated unless noted):
     index.html  robots.txt  sitemap.xml  CNAME  .nojekyll
     assets/symbol.svg  assets/logo-full-apricot-trans.png
     assets/fonts/*.woff2  (subset — only what this page renders)
   ============================================================ */

'use strict';

const fs = require('fs');
const path = require('path');
const { SITE, WA_TEXT, waLink, businessNode, websiteNode } = require('./site-facts');

const ROOT = path.join(__dirname, '..');
const OUT = process.env.BEANS_DIR
  ? path.resolve(process.env.BEANS_DIR)
  : path.join(ROOT, '..', 'beans.rootsandacre.com');

const ORIGIN = SITE.beansOrigin;
const URL = `${ORIGIN}/`;
const LASTMOD = new Date().toISOString().slice(0, 10);
const HOST = ORIGIN.replace(/^https:\/\//, '');

/* ---------- Assets this page actually needs ----------
   Deliberately a subset. The main site self-hosts four families across
   ~30 files; this page renders Josefin Sans 600 (eyebrow, tile titles,
   badges) and Mulish 400 (body) and nothing else. Add a file here only
   when a rule below actually uses that family/weight — anything else is
   dead weight on the one page where time-to-tap matters most. */

const FONT_FILES = [
  'josefin-sans-600-latin.woff2',
  'josefin-sans-600-latin-ext.woff2',
  'mulish-400-latin.woff2',
  'mulish-400-latin-ext.woff2'
];

// Fetched first — the two faces above the fold in every viewport.
const PRELOAD_FONTS = ['josefin-sans-600-latin.woff2', 'mulish-400-latin.woff2'];

const COPIED_ASSETS = [
  ['assets/symbol.svg', 'assets/symbol.svg'],
  ['assets/logo-full-apricot-trans.png', 'assets/logo-full-apricot-trans.png']
];

const LOGO = { w: 662, h: 357 }; // intrinsic px — set on the <img> so the masthead can't shift

/* ---------- Copy ----------
   Language-neutral by design: three of four tiles are proper nouns,
   and the sub-labels reuse wording already approved in the main
   site's T.en. One page, one bio URL, no EN/ID toggle — the
   deviation from the both-languages rule is logged in SEO-TODO.md. */

const COPY = {
  title: 'Buy Roots & Acre Coffee — Tokopedia, Shopee & WhatsApp · Jakarta',
  desc: 'Every way to reach Roots & Acre, an Indonesian micro-roastery and reservation-only slow bar in Sunter, North Jakarta — order fresh-roasted single origins on Tokopedia or Shopee, message us on WhatsApp, or reserve a seat at the four-seat slow bar.',
  ogTitle: 'Roots & Acre — buy the harvest, book a seat',
  ogDesc: 'Tokopedia, Shopee, WhatsApp, and the slow bar. Indonesian micro-roastery in Sunter, North Jakarta.',
  ogImageAlt: 'Roots & Acre — Indonesian micro-roastery and slow bar in Jakarta',
  logoAlt: 'Roots & Acre — Indonesian micro-roastery, Jakarta',
  eyebrow: 'Micro-roastery · Jakarta',
  // Entity-definition opening (SEO-PLAYBOOK ground rule 5): gives the
  // answer engines one self-contained, citable sentence on a page that
  // would otherwise be nothing but link labels.
  lede: 'Roots & Acre is an Indonesian micro-roastery and reservation-only slow bar in Sunter, North Jakarta.'
};

const TILES = [
  {
    id: 'tokopedia',
    badge: 'T',
    title: 'Tokopedia',
    sub: 'This week’s lots, delivered',
    href: SITE.tokopedia
  },
  {
    id: 'shopee',
    badge: 'S',
    title: 'Shopee',
    sub: 'Same lots, same freshness',
    href: SITE.shopee
  },
  {
    id: 'whatsapp',
    badge: 'W',
    title: 'WhatsApp',
    sub: 'Not sure what to pick? Ask us',
    href: waLink(WA_TEXT.en.buy)
  },
  {
    id: 'bar-lab',
    badge: 'B',
    title: 'The Bar & Lab',
    sub: 'Reserve a slow bar seat',
    href: waLink(WA_TEXT.en.reserve)
  }
];

const FOOTER_LINKS = [
  { id: 'site', label: 'rootsandacre.com', href: `${SITE.origin}/` },
  { id: 'maps', label: 'Find us in Jakarta', href: SITE.mapsUrl },
  { id: 'wholesale', label: 'Wholesale & café enquiries', href: waLink(WA_TEXT.en.wholesale) }
];

/* ---------- Helpers ---------- */

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Lift the :root{} block straight out of the main stylesheet so a token
// change there propagates here on the next build.
function tokensCss() {
  const css = fs.readFileSync(path.join(ROOT, 'css', 'styles.css'), 'utf8');
  const m = css.match(/\/\* TOKENS:START \*\/([\s\S]*?)\/\* TOKENS:END \*\//);
  if (!m) {
    throw new Error('TOKENS:START/END markers not found in css/styles.css — restore them before building.');
  }
  return m[1].trim();
}

// Pull only the @font-face blocks for the files we ship, keeping the
// upstream unicode-range declarations intact. Throws rather than
// silently shipping a stylesheet that points at a missing file.
function fontFaceCss() {
  const src = fs.readFileSync(path.join(ROOT, 'assets', 'fonts', 'fonts.css'), 'utf8');
  const blocks = src.match(/@font-face\s*\{[^}]*\}/g) || [];
  const kept = FONT_FILES.map((file) => {
    const block = blocks.find((b) => b.includes(file));
    if (!block) throw new Error(`No @font-face block for "${file}" in assets/fonts/fonts.css`);
    if (!fs.existsSync(path.join(ROOT, 'assets', 'fonts', file))) {
      throw new Error(`Font file missing: assets/fonts/${file}`);
    }
    return block;
  });
  return kept.join('\n');
}

/* ---------- Structured data ----------
   businessNode() and websiteNode() keep their @id anchored on
   https://rootsandacre.com — identical to the main site's. That is
   what merges this host into the same business entity instead of
   creating a second one. Do not re-anchor them on the subdomain. */

function schema() {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      businessNode('en'),
      websiteNode(),
      {
        '@type': 'WebPage',
        '@id': `${URL}#webpage`,
        url: URL,
        name: COPY.title,
        description: COPY.desc,
        inLanguage: 'en',
        isPartOf: { '@id': `${SITE.origin}/#website` },
        about: { '@id': `${SITE.origin}/#business` },
        mainEntity: { '@id': `${URL}#links` }
      },
      {
        '@type': 'ItemList',
        '@id': `${URL}#links`,
        name: 'Where to buy Roots & Acre coffee and book the slow bar',
        itemListOrder: 'https://schema.org/ItemListOrderAscending',
        numberOfItems: TILES.length,
        itemListElement: TILES.map((tile, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: tile.title,
          description: tile.sub,
          url: tile.href
        }))
      }
    ]
  }, null, 2);
}

/* ---------- Styles ----------
   Inlined into <head>: one page, ~7KB, and it removes the render-blocking
   round trip that would otherwise show a flash of unstyled content right
   as the entrance animation runs.

   Layout contract: body is a 3-row grid at min-height 100svh. Sizing uses
   vh as well as vw, because vertical fit is what actually keeps the page
   on one screen across phone heights. min-height (not height + overflow
   hidden) is deliberate — at 200% OS text scale or on a 375px-tall
   landscape phone, clipping would hide a whole tile. It fits without
   scrolling everywhere realistic, and scrolls rather than truncating in
   the extremes. */

function css() {
  return `${tokensCss()}

${fontFaceCss()}

*, *::before, *::after { box-sizing: border-box; }
html { height: 100%; }

body {
  margin: 0;
  min-height: 100vh;
  min-height: 100svh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: clamp(12px, 2.4vh, 30px);
  padding: clamp(16px, 3.4vh, 44px) clamp(18px, 5vw, 32px);
  background: var(--ra-green-dark);
  color: var(--ra-text-on-dark);
  font-family: var(--ra-font-body);
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
  position: relative;
}

/* Phones keep the classic link-in-bio shape: masthead up top, quiet links
   pinned to the bottom edge. From tablet up there is far more slack than
   the content needs, and pinning just opens two large voids — so the whole
   stack becomes one centred composition instead. */
@media (min-width: 700px) {
  body {
    grid-template-rows: auto auto auto;
    align-content: center;
    gap: clamp(20px, 3.6vh, 44px);
  }
}

a { text-decoration: none; color: inherit; }
a:focus-visible { outline: 2px solid var(--ra-gold); outline-offset: 3px; border-radius: 4px; }

/* ---------- Ambient layer (decorative, low density per design-spec §4) ---------- */
.ambient { position: fixed; inset: 0; overflow: hidden; pointer-events: none; z-index: 0; }
.ambient::before {
  content: "";
  position: absolute;
  inset: -25%;
  background: radial-gradient(58% 46% at 50% 0%, rgba(56, 119, 106, .5) 0%, rgba(24, 49, 44, 0) 70%);
  animation: beans-breathe 15s ease-in-out infinite;
}
.shape { position: absolute; display: block; }
.shape--circle {
  top: 7%; right: -7%;
  width: clamp(130px, 27vw, 250px); aspect-ratio: 1;
  border: 2px solid rgba(255, 192, 109, .15);
  border-radius: 50%;
  animation: beans-drift-a 34s ease-in-out infinite;
}
.shape--quarter {
  bottom: 8%; left: -5%;
  width: clamp(84px, 18vw, 160px); aspect-ratio: 1;
  background: rgba(255, 214, 160, .06);
  border-radius: 50% 50% 50% 0;
  animation: beans-drift-b 43s ease-in-out infinite;
}

/* ---------- Masthead ---------- */
.mast { position: relative; z-index: 1; text-align: center; }
.mast__h1 { margin: 0; line-height: 0; }
.mast__logo-wrap { position: relative; display: inline-block; }
.mast__logo {
  display: block;
  width: clamp(150px, 34vw, 232px);
  height: auto;
  animation: beans-bloom .85s var(--ra-ease) backwards;
}
/* Gold ring that pulses out from behind the mark, once, on load. */
.mast__ring {
  position: absolute;
  left: 50%; top: 50%;
  width: 62%; aspect-ratio: 1;
  margin: -31% 0 0 -31%;
  border: 2px solid var(--ra-gold);
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
  animation: beans-ring 1.5s var(--ra-ease) .25s 1 backwards;
}
.mast__eyebrow {
  margin: clamp(10px, 1.6vh, 18px) 0 0;
  font-family: var(--ra-font-display);
  font-weight: 600;
  font-size: clamp(10px, 1.35vh, 12px);
  letter-spacing: .26em;
  text-transform: uppercase;
  color: var(--ra-gold);
}
.mast__lede {
  margin: clamp(7px, 1.1vh, 12px) auto 0;
  max-width: 44ch;
  font-size: clamp(12.5px, 1.6vh, 15px);
  line-height: 1.55;
  color: var(--ra-muted-on-dark);
  text-wrap: balance;
}

/* ---------- Tiles ---------- */
/* main fills the 1fr row; align-content centres the stack in whatever
   slack is left over once the masthead and footer have taken theirs. */
main { display: grid; align-content: center; min-width: 0; }

.tiles {
  position: relative;
  z-index: 1;
  display: grid;
  gap: clamp(9px, 1.5vh, 16px);
  width: 100%;
  max-width: 540px;
  margin: 0 auto;
}
/* Two columns once there is horizontal room, and on short-but-wide
   viewports (landscape phones, small windows) where four stacked rows
   would not fit. The min-width guard matters: a 320x568 phone is both
   narrow AND short, and two columns there squeezes the sub-labels onto
   three wrapped lines. */
@media (min-width: 700px), (min-width: 480px) and (max-height: 640px) {
  .tiles { max-width: 940px; grid-template-columns: 1fr 1fr; }
}

/* Short viewports: the masthead is the biggest block, so it gives up the
   room. The lede stays rendered — it is the page's only citable prose and
   hiding it would cost more in AI-search retrieval than it saves in pixels. */
@media (max-height: 640px) {
  .mast__logo { width: clamp(120px, 20vh, 190px); }
  .mast__eyebrow { margin-top: 8px; }
  .mast__lede { margin-top: 5px; font-size: clamp(11.5px, 2.6vh, 13px); max-width: 68ch; }
}

.tile {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: clamp(12px, 2.4vw, 18px);
  min-height: clamp(60px, 11vh, 104px);
  padding: clamp(12px, 1.9vh, 20px) clamp(16px, 3vw, 24px);
  background: var(--ra-green);
  border-radius: var(--ra-radius-md);
  box-shadow: var(--ra-shadow-md);
  /* backwards, NOT both: with a fill of both, the finished entrance keeps
     applying its transform:none end state, and animation origin outranks
     the hover rule — so the tile would never lift. backwards still covers
     the stagger delay, then gets out of the way once it has run. */
  animation: beans-rise .62s var(--ra-ease) backwards;
  animation-delay: calc(var(--i, 0) * 70ms);
  transition: transform var(--ra-duration) var(--ra-ease),
              background var(--ra-duration) var(--ra-ease),
              box-shadow var(--ra-duration) var(--ra-ease);
}
/* Gold rule that wipes down the leading edge on hover/focus/press. */
.tile__rule {
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 3px;
  background: var(--ra-gold);
  transform: scaleY(0);
  transform-origin: top;
  transition: transform .32s var(--ra-ease);
}
.tile__badge {
  flex: none;
  display: grid;
  place-items: center;
  width: clamp(34px, 4.6vh, 44px);
  aspect-ratio: 1;
  border-radius: 50%;
  font-family: var(--ra-font-display);
  font-weight: 600;
  font-size: clamp(14px, 1.9vh, 17px);
}
.tile--tokopedia .tile__badge { background: var(--ra-cream);    color: var(--ra-green-dark); }
.tile--shopee    .tile__badge { background: var(--ra-apricot);  color: var(--ra-green-dark); }
.tile--whatsapp  .tile__badge { background: var(--ra-whatsapp); color: #fff; }
.tile--bar-lab   .tile__badge { background: var(--ra-gold);     color: var(--ra-green-dark); }

.tile__body { flex: 1; min-width: 0; }
.tile__title {
  display: block;
  font-family: var(--ra-font-display);
  font-weight: 600;
  font-size: clamp(16px, 2.3vh, 21px);
  letter-spacing: .01em;
  color: #fffaf0;
}
.tile__sub {
  display: block;
  margin-top: 2px;
  font-size: clamp(12px, 1.6vh, 14.5px);
  line-height: 1.45;
  color: var(--ra-muted-on-dark);
}
.tile__arrow {
  flex: none;
  font-size: clamp(16px, 2.2vh, 20px);
  /* Apricot, not gold: gold on --ra-green measures 4.46:1, just under AA
     for normal-size text. Apricot is 6.25:1 and equally on-brand for dark
     surfaces. It also keeps gold reserved for the eyebrow and the hover
     rule rather than spreading it across five elements (design-spec §2). */
  color: var(--ra-apricot);
  transition: transform var(--ra-duration) var(--ra-ease);
}

/* Hover is gated so touch devices don't latch a stuck hover state;
   :active mirrors it so a tap still gives feedback. */
@media (hover: hover) {
  .tile:hover {
    transform: translateY(-3px);
    background: #2e6055;
    box-shadow: var(--ra-shadow-lg);
  }
  .tile:hover .tile__rule { transform: scaleY(1); }
  .tile:hover .tile__arrow { transform: translateX(5px); }
}
.tile:focus-visible .tile__rule { transform: scaleY(1); }
.tile:focus-visible .tile__arrow { transform: translateX(5px); }
.tile:active { transform: translateY(-1px) scale(.995); background: #2e6055; }
.tile:active .tile__rule { transform: scaleY(1); }

/* ---------- Quiet footer ---------- */
.quiet {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: clamp(6px, 1.4vw, 10px) clamp(10px, 2.4vw, 18px);
  font-size: clamp(11.5px, 1.45vh, 13.5px);
  color: var(--ra-muted-on-dark);
  animation: beans-rise .62s var(--ra-ease) backwards;
  animation-delay: 420ms;
}
.quiet a {
  color: var(--ra-muted-on-dark);
  padding: 4px 2px;
  transition: color var(--ra-duration) var(--ra-ease);
}
.quiet a:hover { color: var(--ra-gold); }
.quiet__sep { opacity: .38; }
/* Narrow screens wrap the footer onto two lines, which would leave a
   separator dangling at the end of the first. Drop them and let the
   wider gap do the separating. */
@media (max-width: 559px) {
  .quiet__sep { display: none; }
  .quiet { gap: 2px 16px; }
}

/* ---------- Motion ---------- */
@keyframes beans-rise {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: none; }
}
@keyframes beans-bloom {
  0%   { opacity: 0; transform: scale(.86); }
  62%  { opacity: 1; transform: scale(1.025); }
  100% { opacity: 1; transform: scale(1); }
}
@keyframes beans-ring {
  0%   { opacity: 0;   transform: scale(.55); }
  35%  { opacity: .45; }
  100% { opacity: 0;   transform: scale(1.75); }
}
@keyframes beans-drift-a {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  50%      { transform: translate(-20px, 16px) rotate(11deg); }
}
@keyframes beans-drift-b {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  50%      { transform: translate(15px, -18px) rotate(-13deg); }
}
@keyframes beans-breathe {
  0%, 100% { opacity: .55; }
  50%      { opacity: .95; }
}

/* Reduced motion: ambient loops stop entirely, the entrance collapses to
   nothing (elements are already at their final position — the keyframes
   only ever interpolated opacity/transform), interaction keeps colour. */
@media (prefers-reduced-motion: reduce) {
  .tile, .quiet, .mast__logo { animation: none; }
  .mast__ring, .ambient::before, .shape { animation: none; }
  .mast__ring { display: none; }
  .tile:hover, .tile:active { transform: none; }
  .tile:hover .tile__arrow, .tile:focus-visible .tile__arrow { transform: none; }
  *, *::before, *::after { transition-duration: .01ms !important; }
}`;
}

/* ---------- Page ---------- */

function renderTiles() {
  return TILES.map((tile, i) => `        <a class="tile tile--${tile.id}" href="${escapeHtml(tile.href)}" style="--i:${i + 1}" data-dest="${tile.id}">
          <span class="tile__rule" aria-hidden="true"></span>
          <span class="tile__badge" aria-hidden="true">${tile.badge}</span>
          <span class="tile__body">
            <span class="tile__title">${escapeHtml(tile.title)}</span>
            <span class="tile__sub">${escapeHtml(tile.sub)}</span>
          </span>
          <span class="tile__arrow" aria-hidden="true">→</span>
        </a>`).join('\n');
}

function renderFooter() {
  return FOOTER_LINKS
    .map((l) => `<a href="${escapeHtml(l.href)}" data-dest="${l.id}">${escapeHtml(l.label)}</a>`)
    .join('\n      <span class="quiet__sep" aria-hidden="true">·</span>\n      ');
}

function renderPage() {
  const preloads = PRELOAD_FONTS
    .map((f) => `  <link rel="preload" href="/assets/fonts/${f}" as="font" type="font/woff2" crossorigin />`)
    .join('\n');

  return `<!DOCTYPE html>
<!-- GENERATED by scripts/build-beans.js in the rootsandacre.github.io repo —
     do not edit by hand. Edit the generator there, run:
       node scripts/build-beans.js
     then commit the regenerated files in this repo. -->
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(COPY.title)}</title>
  <meta name="description" content="${escapeHtml(COPY.desc)}" />
  <meta name="theme-color" content="${SITE.themeColor}" />

  <link rel="canonical" href="${URL}" />

  <!-- Open Graph / social preview -->
  <meta property="og:site_name" content="Roots &amp; Acre" />
  <meta property="og:title" content="${escapeHtml(COPY.ogTitle)}" />
  <meta property="og:description" content="${escapeHtml(COPY.ogDesc)}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${URL}" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:image" content="${SITE.origin}${SITE.ogImage}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="${escapeHtml(COPY.ogImageAlt)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(COPY.ogTitle)}" />
  <meta name="twitter:description" content="${escapeHtml(COPY.ogDesc)}" />
  <meta name="twitter:image" content="${SITE.origin}${SITE.ogImage}" />

  <link rel="icon" href="/assets/symbol.svg" type="image/svg+xml" />
${preloads}

  <style>
${css()}
  </style>

  <script type="application/ld+json">
${schema()}
  </script>

  <!-- Google Analytics 4 — same property as rootsandacre.com. cookie_domain
       defaults to the registrable domain, so a visitor moving from this page
       to the main site stays in one session. -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=${SITE.ga4Id}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${SITE.ga4Id}');
  </script>
</head>
<body>
  <div class="ambient" aria-hidden="true">
    <span class="shape shape--circle"></span>
    <span class="shape shape--quarter"></span>
  </div>

  <header class="mast">
    <h1 class="mast__h1">
      <a class="mast__logo-wrap" href="${SITE.origin}/" data-dest="logo">
        <span class="mast__ring" aria-hidden="true"></span>
        <img class="mast__logo" src="/assets/logo-full-apricot-trans.png"
             width="${LOGO.w}" height="${LOGO.h}" fetchpriority="high"
             alt="${escapeHtml(COPY.logoAlt)}" />
      </a>
    </h1>
    <p class="mast__eyebrow">${escapeHtml(COPY.eyebrow)}</p>
    <p class="mast__lede">${escapeHtml(COPY.lede)}</p>
  </header>

  <main>
    <nav class="tiles" aria-label="Where to buy and how to visit">
${renderTiles()}
    </nav>
  </main>

  <footer class="quiet">
      ${renderFooter()}
  </footer>

  <script>
    /* Outbound-click events, so GA4 shows which destination the Instagram
       bio actually drives. Delegated, passive, and it never delays the
       navigation — gtag flushes via sendBeacon. */
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[data-dest]');
      if (!a || typeof gtag !== 'function') return;
      gtag('event', 'bio_link_click', {
        destination: a.getAttribute('data-dest'),
        link_url: a.href
      });
    });
  </script>
</body>
</html>
`;
}

/* ---------- robots.txt & sitemap.xml ----------
   Both are per-host: the copies at rootsandacre.com do not apply to this
   subdomain, so it needs its own. The crawler allowlist mirrors the main
   site's robots.txt — keep the two in step. */

function renderRobots() {
  return `User-agent: *
Allow: /

# AI/answer-engine crawlers — explicitly allowed
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Claude-SearchBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: CCBot
Allow: /
User-agent: Applebot-Extended
Allow: /
User-agent: meta-externalagent
Allow: /

Sitemap: ${ORIGIN}/sitemap.xml
`;
}

function renderSitemap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${URL}</loc>
    <lastmod>${LASTMOD}</lastmod>
  </url>
</urlset>
`;
}

function renderReadme() {
  return `# beans.rootsandacre.com

The Roots & Acre link-in-bio page — one screen, four destinations. This is the
URL in the Instagram bio.

## Everything here is generated

**Do not hand-edit \`index.html\`, \`robots.txt\`, or \`sitemap.xml\`.** They are
built by \`scripts/build-beans.js\` in the **rootsandacre.github.io** repo, which
also owns the business facts (\`scripts/site-facts.js\`) and the design tokens
(\`css/styles.css\`). Editing here would be overwritten on the next build, and
would let the WhatsApp number or store URLs drift from the main site.

To change anything:

\`\`\`bash
# in the rootsandacre.github.io repo
node scripts/build-beans.js
\`\`\`

Then commit and push the regenerated files **here**.

## Hosting

GitHub Pages project site on the same account as the main repo. \`CNAME\` claims
\`beans.rootsandacre.com\`; DNS needs one record:

\`\`\`
CNAME   beans   rootsandacre.github.io
\`\`\`

Settings → Pages → Source: \`main\` / root, custom domain \`beans.rootsandacre.com\`,
Enforce HTTPS on.
`;
}

/* ---------- Write ---------- */

function writeFile(rel, content) {
  const abs = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, content);
  console.log('wrote', rel);
}

function copyAsset(from, to) {
  const src = path.join(ROOT, from);
  if (!fs.existsSync(src)) throw new Error(`Missing source asset: ${from}`);
  const abs = path.join(OUT, to);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.copyFileSync(src, abs);
  console.log('copied', to);
}

fs.mkdirSync(OUT, { recursive: true });
console.log('output →', OUT, '\n');

writeFile('index.html', renderPage());
writeFile('robots.txt', renderRobots());
writeFile('sitemap.xml', renderSitemap());
writeFile('CNAME', `${HOST}\n`);
writeFile('.nojekyll', '');
writeFile('README.md', renderReadme());

for (const [from, to] of COPIED_ASSETS) copyAsset(from, to);
for (const file of FONT_FILES) copyAsset(`assets/fonts/${file}`, `assets/fonts/${file}`);

/* ---------- Sanity checks ---------- */

const html = fs.readFileSync(path.join(OUT, 'index.html'), 'utf8');

// JSON-LD must parse, and must keep the main site's entity @ids.
const ld = html.match(/<script type="application\/ld\+json">\n([\s\S]*?)\n  <\/script>/);
if (!ld) throw new Error('Could not locate the JSON-LD block in the output');
const graph = JSON.parse(ld[1])['@graph'];
const ids = graph.map((n) => n['@id']);
for (const required of [`${SITE.origin}/#business`, `${SITE.origin}/#website`]) {
  if (!ids.includes(required)) {
    throw new Error(`Entity @id "${required}" missing — the subdomain would fork the business entity`);
  }
}

// Exactly one non-empty <h1>.
const h1s = html.match(/<h1[\s>]/g) || [];
if (h1s.length !== 1) throw new Error(`Expected exactly one <h1>, found ${h1s.length}`);

// Every referenced local asset must exist in the output.
const refs = [...html.matchAll(/(?:href|src)="(\/[^"]+)"/g)].map((m) => m[1]);
for (const ref of [...new Set(refs)]) {
  if (!fs.existsSync(path.join(OUT, ref.replace(/^\//, '')))) {
    throw new Error(`Page references "${ref}" but it is not in the output`);
  }
}

console.log(`\nJSON-LD parses · ${graph.length} nodes · entity @ids match the main site`);
console.log(`${refs.length} local asset references, all present`);
console.log('one <h1>, ok');
