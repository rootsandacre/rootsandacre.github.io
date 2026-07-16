#!/usr/bin/env node
/* ============================================================
   ROOTS & ACRE — page builder
   Renders the EN (/) and ID (/id/) homepages plus sitemap.xml
   from one template, so the two languages can never drift.

   Usage:  node scripts/build-pages.js
   (No dependencies, nothing runs at deploy time — the generated
   static HTML is committed.)

   To change copy: edit T below (both languages, same commit).
   To change business facts: edit SITE below — it is the single
   source of truth for NAP/contact values across HTML and schema.
   ============================================================ */

'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.join(__dirname, '..');

// Short content hash for cache-busting static assets. The query string
// changes whenever the file changes, so browsers/CDNs can never serve a
// stale stylesheet against fresh HTML.
function assetVersion(relPath) {
  const buf = fs.readFileSync(path.join(ROOT, relPath));
  return crypto.createHash('sha256').update(buf).digest('hex').slice(0, 8);
}

/* ---------- Business facts (Phase 0.5 fact sheet) ---------- */

const SITE = {
  origin: 'https://rootsandacre.com',
  name: 'Roots & Acre',
  altName: 'Roots and Acre',
  waNumber: '6287870702024', // +62 878-7070-2024
  email: 'rootsandacre@gmail.com',
  instagram: 'https://www.instagram.com/rootsandacre/',
  tokopedia: 'https://www.tokopedia.com/roots-and-acre',
  shopee: 'https://shopee.co.id/rootsandacre',
  address: {
    street: 'Jl. Paradise 14, Blok M No.13, RT.3/RW.19, Sunter Agung',
    locality: 'Jakarta Utara',
    region: 'DKI Jakarta',
    postalCode: '14350',
    country: 'ID'
  },
  // Approximate (OSM street centroid) — confirm against GBP pin, see SEO-TODO.md
  geo: { lat: -6.13706, lng: 106.86763 },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(
    'Roots & Acre, Jl. Paradise 14, Blok M No.13, Sunter Agung, Tanjung Priok, Jakarta Utara 14350'
  ),
  foundingDate: '2024-04',
  priceRange: 'Rp 170.000–322.000',
  themeColor: '#28544b',
  ogImage: '/assets/images/og-image.jpg', // real 1200×630 photo pending — see SEO-TODO.md
  logo: '/assets/logo-full-apricot-trans.png'
};

const LASTMOD = new Date().toISOString().slice(0, 10);

/* ---------- Translations (canonical string source) ---------- */

const T = {
  en: {
    'meta.title': 'Roots & Acre — Micro-roastery & Slow Bar · Jakarta',
    'meta.desc': 'Roots & Acre is an Indonesian micro-roastery and reservation-only slow bar in Sunter, North Jakarta. Fresh-roasted single origins from the archipelago’s finest specialty farms — on Tokopedia, Shopee, and at our twelve-seat bar.',
    'meta.ogTitle': 'Roots & Acre — Micro-roastery & Slow Bar · Jakarta',
    'meta.ogDesc': 'From the highlands to the slow bar. Indonesian micro-roastery & reservation-only slow bar in Sunter, North Jakarta.',
    'meta.ogImageAlt': 'Roots & Acre — Indonesian micro-roastery and slow bar in Jakarta',
    'nav.ariaPrimary': 'Primary',
    'nav.ariaLang': 'Language',

    'nav.story': 'The Story',
    'nav.buy': 'Buy the Harvest',
    'nav.barlab': 'The Bar & Lab',
    'nav.wholesale': 'Wholesale',
    'nav.reserve': 'Reserve a Seat',

    'hero.eyebrow': 'Micro-roastery & slow bar · Jakarta',
    'hero.badge': 'harvest vol. 04',
    'hero.titleLine1': 'From the highlands',
    'hero.titleLine2': 'to the slow bar.',
    'hero.para': 'Roots & Acre is an Indonesian micro-roastery and reservation-only slow bar in North Jakarta. We walk the islands’ finest specialty farms and roast each lot by hand in micro-batches — poured at our twelve-seat slow bar, or shipped fresh to your door.',
    'hero.cta1': 'Buy the Harvest',
    'hero.cta2': 'Reserve a Slow Bar Seat',
    'hero.wholesaleLink': 'Cafés & green buyers — wholesale & export inquiries',

    'pw1.eyebrow': 'The harvest',
    'pw1.title': 'Buy the beans',
    'pw1.desc': 'Fresh-roasted single origins from across the islands — on Tokopedia, Shopee, or straight through WhatsApp.',
    'pw1.cta': 'See where to buy →',
    'pw2.eyebrow': 'The Bar & Lab',
    'pw2.title': 'Sit with us',
    'pw2.desc': 'Twelve seats, one pour at a time — reserve on WhatsApp for our slow bar in Jakarta.',
    'pw2.cta': 'Reserve a seat →',
    'pw3.eyebrow': 'Wholesale & export',
    'pw3.title': 'Pour us in your café',
    'pw3.desc': 'Wholesale lots and export sample kits for cafés and green buyers.',
    'pw3.cta': 'Get in touch →',

    'buy.eyebrow': 'Where to find us',
    'buy.titleLine1': 'Take the harvest',
    'buy.titleLine2': 'home.',
    'buy.para': 'This week’s lots are stocked on Tokopedia and Shopee — or message us on WhatsApp and we’ll help you pick a roast.',
    'buy.tokopedia.desc': 'Browse our full lineup and order for delivery anywhere in Indonesia.',
    'buy.tokopedia.cta': 'Visit our store',
    'buy.shopee.desc': 'Same lineup, same freshness — checkout through Shopee if that’s easier for you.',
    'buy.shopee.cta': 'Visit our store',
    'buy.whatsapp.desc': 'Not sure what to pick? Message us directly and we’ll walk you through this week’s roast.',
    'buy.whatsapp.cta': 'Chat with us',

    'narrative.eyebrow': 'The sourcing',
    'narrative.titleLine1': 'Indonesia’s finest specialty grade,',
    'narrative.titleLine2': 'one small lot at a time.',
    'narrative.para': 'We walk the farms before we ever buy a bag — sitting with the growers, tasting at the wet mill, learning how each lot was raised. The relationships come first; the coffee follows.',
    'narrative.quote': 'We’d rather know the name of the person who picked it than the score on the bag.',
    'narrative.grownBy': 'Grown by',
    'narrative.location': 'West Java · 1,400m',

    'pillar1.title': 'Traceability',
    'pillar1.body': 'Every lot names the grower, the village, and the wet mill. We buy what we have walked.',
    'pillar2.title': 'Micro-batch Roasting',
    'pillar2.body': '9kg at a time, profiled by hand. Small enough to chase the sweetness in each origin.',
    'pillar3.title': 'Sensory Excellence',
    'pillar3.body': 'Cupped, scored, and dialled in our lab before a single bag reaches the bar.',

    'barlab.title': 'Twelve seats. One pour at a time.',
    'barlab.para': 'Our reservation-only slow bar seats twelve, in four private sessions a day — the room is never shared with other guests. Each session is a guided journey through the week’s lots, brewed slowly and talked through gently.',
    'barlab.cta': 'Reserve a Slow Bar Seat',

    'visit.title': 'Visit the Bar & Lab',
    'visit.addressLabel': 'Address',
    'visit.hoursLabel': 'Sessions',
    'visit.hoursLine': 'Open daily, by reservation only — four private sessions:',
    'visit.note': 'No walk-ins outside special events. Reserve via WhatsApp or Instagram DM.',
    'visit.mapCta': 'Open in Google Maps →',

    'wholesale.eyebrow': 'For cafés & green buyers',
    'wholesale.titleLine1': 'Pour our origins',
    'wholesale.titleLine2': 'in your house.',
    'wholesale.para': 'International café owners and green buyers — we’ll send a curated export sample kit of this season’s lots, with full traceability sheets and roast notes.',
    'wholesale.badge': 'ships worldwide',
    'wholesale.cardTitle': 'Let’s talk wholesale',
    'wholesale.cardDesc': 'Five 100g samples · traceability dossier · indicative FOB pricing. No cost for qualified buyers.',
    'wholesale.cta': 'Message us on WhatsApp',
    'wholesale.emailPrefix': 'or email',

    'footer.tagline': 'The bridge between Indonesia’s coffee farmers and the people who love what they grow.',
    'footer.explore': 'Explore',
    'footer.explore1': 'The Story',
    'footer.explore2': 'Buy the Harvest',
    'footer.explore3': 'The Bar & Lab',
    'footer.visit': 'Visit',
    'footer.visit1': 'Reserve a seat',
    'footer.visit2': 'Hours & sessions',
    'footer.visit3': 'Find us in Jakarta',
    'footer.wholesale': 'Wholesale',
    'footer.wholesale1': 'For cafés & buyers',
    'footer.wholesale2': 'Get in touch',
    'footer.follow': 'Follow',
    'footer.bottomLeft': '© 2026 Roots & Acre · Sunter, Jakarta Utara — roasting since April 2024',
    'footer.bottomNote': 'Reservation-only slow bar · Micro-roastery',

    'wa.reserve': 'Hi Roots & Acre! I’d like to reserve a seat at the Bar & Lab.\n\nDate: \nSession: \nNumber of guests: \n\nThank you!',
    'wa.buy': 'Hi Roots & Acre! I’d like to order some coffee. Could you help me pick this week’s lot?',
    'wa.wholesale': 'Hi Roots & Acre! I’m from [café / company name], interested in your wholesale/export sample kit.'
  },
  id: {
    'meta.title': 'Roots & Acre — Roastery Kopi Specialty & Slow Bar · Jakarta',
    'meta.desc': 'Roots & Acre adalah micro-roastery Indonesia dan slow bar khusus reservasi di Sunter, Jakarta Utara. Single origin fresh-roasted dari kebun specialty terbaik Nusantara — di Tokopedia, Shopee, dan bar dua belas kursi kami.',
    'meta.ogTitle': 'Roots & Acre — Roastery Kopi Specialty & Slow Bar · Jakarta',
    'meta.ogDesc': 'Dari dataran tinggi menuju slow bar. Micro-roastery Indonesia & slow bar khusus reservasi di Sunter, Jakarta Utara.',
    'meta.ogImageAlt': 'Roots & Acre — micro-roastery dan slow bar Indonesia di Jakarta',
    'nav.ariaPrimary': 'Utama',
    'nav.ariaLang': 'Bahasa',

    'nav.story': 'Kisah Kami',
    'nav.buy': 'Beli Hasil Panen',
    'nav.barlab': 'The Bar & Lab',
    'nav.wholesale': 'Grosir',
    'nav.reserve': 'Reservasi Kursi',

    'hero.eyebrow': 'Micro-roastery & slow bar · Jakarta',
    'hero.badge': 'panen vol. 04',
    'hero.titleLine1': 'Dari dataran tinggi',
    'hero.titleLine2': 'menuju slow bar.',
    'hero.para': 'Roots & Acre adalah micro-roastery Indonesia sekaligus slow bar khusus reservasi di Jakarta Utara. Kami menyusuri kebun-kebun specialty terbaik di berbagai pulau, lalu meracik tiap lot secara manual dalam batch kecil — diseduh di slow bar berkapasitas dua belas kursi, atau dikirim segar ke depan pintumu.',
    'hero.cta1': 'Beli Hasil Panen',
    'hero.cta2': 'Reservasi Kursi Slow Bar',
    'hero.wholesaleLink': 'Kafe & pembeli green bean — pertanyaan grosir & ekspor',

    'pw1.eyebrow': 'Hasil panen',
    'pw1.title': 'Beli bijinya',
    'pw1.desc': 'Single origin fresh-roasted dari berbagai pulau — lewat Tokopedia, Shopee, atau langsung via WhatsApp.',
    'pw1.cta': 'Lihat tempat membeli →',
    'pw2.eyebrow': 'The Bar & Lab',
    'pw2.title': 'Duduk bareng kami',
    'pw2.desc': 'Dua belas kursi, satu seduhan setiap kali — reservasi via WhatsApp untuk slow bar kami di Jakarta.',
    'pw2.cta': 'Reservasi kursi →',
    'pw3.eyebrow': 'Grosir & ekspor',
    'pw3.title': 'Sajikan kami di kafemu',
    'pw3.desc': 'Lot grosir dan sample kit ekspor untuk kafe dan pembeli green bean.',
    'pw3.cta': 'Hubungi kami →',

    'buy.eyebrow': 'Tempat membeli',
    'buy.titleLine1': 'Bawa hasil panen',
    'buy.titleLine2': 'pulang.',
    'buy.para': 'Lot minggu ini tersedia di Tokopedia dan Shopee — atau chat kami di WhatsApp, kami bantu pilihkan roast-nya.',
    'buy.tokopedia.desc': 'Lihat semua pilihan kami dan pesan untuk pengiriman ke seluruh Indonesia.',
    'buy.tokopedia.cta': 'Kunjungi toko kami',
    'buy.shopee.desc': 'Pilihan sama, kesegaran sama — checkout lewat Shopee kalau itu lebih mudah buatmu.',
    'buy.shopee.cta': 'Kunjungi toko kami',
    'buy.whatsapp.desc': 'Belum yakin mau pilih yang mana? Chat langsung, kami bantu jelaskan roast minggu ini.',
    'buy.whatsapp.cta': 'Chat dengan kami',

    'narrative.eyebrow': 'Asal usul biji',
    'narrative.titleLine1': 'Specialty grade terbaik Indonesia,',
    'narrative.titleLine2': 'satu small lot setiap kali.',
    'narrative.para': 'Kami menyusuri kebun sebelum membeli satu karung pun — duduk bersama petani, mencicipi langsung di wet mill, mempelajari cara tiap lot dirawat. Hubungan datang lebih dulu; kopinya menyusul.',
    'narrative.quote': 'Kami lebih ingin tahu nama orang yang memetiknya, daripada skor yang tertulis di karung.',
    'narrative.grownBy': 'Ditanam oleh',
    'narrative.location': 'Jawa Barat · 1.400 mdpl',

    'pillar1.title': 'Keterlacakan',
    'pillar1.body': 'Setiap lot mencantumkan nama petani, desa, dan wet mill-nya. Kami hanya membeli yang sudah kami datangi langsung.',
    'pillar2.title': 'Roasting Micro-batch',
    'pillar2.body': '9kg setiap batch, diprofil secara manual. Cukup kecil untuk mengejar rasa manis di setiap origin.',
    'pillar3.title': 'Kualitas Sensori',
    'pillar3.body': 'Di-cupping, dinilai, dan disempurnakan di lab kami sebelum satu karung pun sampai ke bar.',

    'barlab.title': 'Dua belas kursi. Satu seduhan setiap kali.',
    'barlab.para': 'Slow bar khusus reservasi kami berkapasitas dua belas kursi, dalam empat sesi privat setiap hari — ruangannya tak pernah digabung dengan tamu lain. Setiap sesi adalah perjalanan terpandu menjelajahi lot minggu ini, diseduh perlahan dan dijelaskan dengan santai.',
    'barlab.cta': 'Reservasi Kursi Slow Bar',

    'visit.title': 'Kunjungi Bar & Lab',
    'visit.addressLabel': 'Alamat',
    'visit.hoursLabel': 'Sesi',
    'visit.hoursLine': 'Buka setiap hari, khusus reservasi — empat sesi privat:',
    'visit.note': 'Tanpa walk-in di luar acara khusus. Reservasi via WhatsApp atau DM Instagram.',
    'visit.mapCta': 'Buka di Google Maps →',

    'wholesale.eyebrow': 'Untuk kafe & pembeli green bean',
    'wholesale.titleLine1': 'Sajikan origin kami',
    'wholesale.titleLine2': 'di tempatmu.',
    'wholesale.para': 'Pemilik kafe internasional dan pembeli green bean — kami kirimkan sample kit ekspor pilihan dari lot musim ini, lengkap dengan lembar traceability dan catatan roast.',
    'wholesale.badge': 'kirim ke seluruh dunia',
    'wholesale.cardTitle': 'Yuk bicara soal grosir',
    'wholesale.cardDesc': 'Lima sample 100g · dokumen traceability · indikasi harga FOB. Tanpa biaya untuk pembeli yang memenuhi kriteria.',
    'wholesale.cta': 'Chat Kami di WhatsApp',
    'wholesale.emailPrefix': 'atau email',

    'footer.tagline': 'Jembatan antara petani kopi Indonesia dan orang-orang yang mencintai apa yang mereka tanam.',
    'footer.explore': 'Jelajahi',
    'footer.explore1': 'Kisah Kami',
    'footer.explore2': 'Beli Hasil Panen',
    'footer.explore3': 'The Bar & Lab',
    'footer.visit': 'Kunjungi',
    'footer.visit1': 'Reservasi kursi',
    'footer.visit2': 'Jam & sesi',
    'footer.visit3': 'Temukan kami di Jakarta',
    'footer.wholesale': 'Grosir',
    'footer.wholesale1': 'Untuk kafe & pembeli',
    'footer.wholesale2': 'Hubungi kami',
    'footer.follow': 'Ikuti',
    'footer.bottomLeft': '© 2026 Roots & Acre · Sunter, Jakarta Utara — meroasting sejak April 2024',
    'footer.bottomNote': 'Slow bar khusus reservasi · Micro-roastery',

    'wa.reserve': 'Halo Roots & Acre! Saya ingin reservasi kursi di Bar & Lab.\n\nTanggal: \nSesi: \nJumlah orang: \n\nTerima kasih!',
    'wa.buy': 'Halo Roots & Acre! Saya ingin memesan kopi. Bisa dibantu pilih lot minggu ini?',
    'wa.wholesale': 'Halo Roots & Acre! Saya dari [nama kafe/perusahaan], tertarik dengan sample kit wholesale/export.'
  }
};

/* ---------- Helpers ---------- */

function makeT(lang) {
  return function t(key) {
    const v = T[lang][key];
    if (v === undefined) throw new Error(`Missing translation "${key}" for "${lang}"`);
    return v
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  };
}

function wa(lang, msgKey) {
  return `https://wa.me/${SITE.waNumber}?text=${encodeURIComponent(T[lang]['wa.' + msgKey])}`;
}

/* ---------- Structured data (Phase 3) ---------- */

function schema(lang, pageUrl) {
  const t = (k) => T[lang][k]; // raw (JSON handles escaping)
  const description = lang === 'en'
    ? 'Roots & Acre is an Indonesian micro-roastery and reservation-only slow bar in Sunter, North Jakarta. It roasts single-origin lots sourced directly from farms across the archipelago in micro-batches, serves them in four private daily slow-bar sessions (reserve via WhatsApp or Instagram DM), and ships beans via Tokopedia and Shopee.'
    : 'Roots & Acre adalah micro-roastery Indonesia dan slow bar khusus reservasi di Sunter, Jakarta Utara. Kami me-roasting lot single origin yang bersumber langsung dari kebun di seluruh Nusantara dalam batch kecil, menyajikannya dalam empat sesi slow bar privat setiap hari (reservasi via WhatsApp atau DM Instagram), dan mengirim biji kopi via Tokopedia dan Shopee.';
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['CafeOrCoffeeShop', 'OnlineStore'],
        '@id': `${SITE.origin}/#business`,
        name: SITE.name,
        alternateName: SITE.altName,
        description,
        url: `${SITE.origin}/`,
        logo: `${SITE.origin}${SITE.logo}`,
        image: `${SITE.origin}${SITE.logo}`,
        telephone: `+${SITE.waNumber}`,
        email: SITE.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: SITE.address.street,
          addressLocality: SITE.address.locality,
          addressRegion: SITE.address.region,
          postalCode: SITE.address.postalCode,
          addressCountry: SITE.address.country
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: SITE.geo.lat,
          longitude: SITE.geo.lng
        },
        hasMap: SITE.mapsUrl,
        openingHoursSpecification: [{
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '12:00',
          closes: '21:30'
        }],
        acceptsReservations: 'True',
        servesCuisine: 'Specialty coffee',
        priceRange: SITE.priceRange,
        currenciesAccepted: 'IDR',
        foundingDate: SITE.foundingDate,
        sameAs: [SITE.instagram, SITE.tokopedia, SITE.shopee]
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE.origin}/#website`,
        url: `${SITE.origin}/`,
        name: SITE.name,
        inLanguage: ['en', 'id'],
        publisher: { '@id': `${SITE.origin}/#business` }
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: t('meta.title'),
        description: t('meta.desc'),
        inLanguage: lang,
        isPartOf: { '@id': `${SITE.origin}/#website` },
        about: { '@id': `${SITE.origin}/#business` }
      }
    ]
  }, null, 2);
}

/* ---------- Parked: "The Sourcing" story + philosophy pillars ----------
   Removed from the homepage for launch (2026-07-16) — the farm stories and
   photos exist but aren't processed yet. Dan's direction: both blocks become
   part of a big "Roots & Acre — the process" page (working idea; could be
   /process/ or /sourcing/ — decide when the material is ready, see
   SEO-PLAYBOOK.md Phase 5.2b). When that page ships, reinstate a teaser on
   the homepage linking to it. Neither function is called at build time on
   purpose; their translation keys stay in T so the EN/ID sync check keeps
   guarding them. */

// eslint-disable-next-line no-unused-vars
function renderSourcingStory(lang) {
  const t = makeT(lang);
  return `      <div class="narrative__split">
        <div>
          <span class="eyebrow">${t('narrative.eyebrow')}</span>
          <h2><span>${t('narrative.titleLine1')}</span> <strong>${t('narrative.titleLine2')}</strong></h2>
          <p class="narrative__body">${t('narrative.para')}</p>
          <p class="narrative__quote">&ldquo;<span>${t('narrative.quote')}</span>&rdquo;</p>
        </div>
        <div class="narrative__photo-wrap">
          <!-- Photo slot: swap the placeholder for a real grower / farm photo (4:5) -->
          <div class="narrative__photo photo-slot"></div>
          <div class="narrative__info-card">
            <div class="narrative__info-label">${t('narrative.grownBy')}</div>
            <div class="narrative__info-name">Pak Asep &amp; the Mekarsaluyu growers</div>
            <div class="narrative__info-meta">${t('narrative.location')}</div>
          </div>
        </div>
      </div>

`;
}

// eslint-disable-next-line no-unused-vars
function renderPillars(lang) {
  const t = makeT(lang);
  return `      <!-- Philosophy pillars -->
      <div class="pillars">
        <div class="pillars__grid">
          <div class="pillar">
            <div class="pillar__num">01</div>
            <h3>${t('pillar1.title')}</h3>
            <p>${t('pillar1.body')}</p>
          </div>
          <div class="pillar">
            <div class="pillar__num">02</div>
            <h3>${t('pillar2.title')}</h3>
            <p>${t('pillar2.body')}</p>
          </div>
          <div class="pillar">
            <div class="pillar__num">03</div>
            <h3>${t('pillar3.title')}</h3>
            <p>${t('pillar3.body')}</p>
          </div>
        </div>
      </div>

`;
}

/* ---------- Page template ---------- */

function renderHome(lang) {
  const t = makeT(lang);
  const pageUrl = lang === 'en' ? `${SITE.origin}/` : `${SITE.origin}/id/`;
  const locale = lang === 'en' ? 'en_US' : 'id_ID';
  const altLocale = lang === 'en' ? 'id_ID' : 'en_US';

  return `<!DOCTYPE html>
<!-- GENERATED by scripts/build-pages.js — do not edit by hand.
     Edit the template/translations there, then run: node scripts/build-pages.js
     Both language versions are rebuilt together and must ship in the same commit. -->
<html lang="${lang}" id="top">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${t('meta.title')}</title>
  <meta name="description" content="${t('meta.desc')}" />
  <meta name="theme-color" content="${SITE.themeColor}" />

  <link rel="canonical" href="${pageUrl}" />
  <link rel="alternate" hreflang="en" href="${SITE.origin}/" />
  <link rel="alternate" hreflang="id" href="${SITE.origin}/id/" />
  <link rel="alternate" hreflang="x-default" href="${SITE.origin}/" />

  <!-- Open Graph / social preview -->
  <meta property="og:site_name" content="Roots &amp; Acre" />
  <meta property="og:title" content="${t('meta.ogTitle')}" />
  <meta property="og:description" content="${t('meta.ogDesc')}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${pageUrl}" />
  <meta property="og:locale" content="${locale}" />
  <meta property="og:locale:alternate" content="${altLocale}" />
  <meta property="og:image" content="${SITE.origin}${SITE.ogImage}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="${t('meta.ogImageAlt')}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${t('meta.ogTitle')}" />
  <meta name="twitter:description" content="${t('meta.ogDesc')}" />
  <meta name="twitter:image" content="${SITE.origin}${SITE.ogImage}" />

  <link rel="icon" href="/assets/symbol.svg" type="image/svg+xml" />

  <link rel="stylesheet" href="/assets/fonts/fonts.css?v=${assetVersion('assets/fonts/fonts.css')}" />
  <link rel="stylesheet" href="/css/styles.css?v=${assetVersion('css/styles.css')}" />
  <script src="/js/i18n.js?v=${assetVersion('js/i18n.js')}" defer></script>

  <script type="application/ld+json">
${schema(lang, pageUrl)}
  </script>
</head>
<body>
  <!-- ====== NAV ====== -->
  <header class="site-nav">
    <div class="site-nav__inner">
      <a class="site-nav__brand" href="#top">
        <img src="/assets/symbol.svg" alt="Roots and Acre" />
        <span class="site-nav__wordmark">Roots &amp; Acre</span>
      </a>
      <nav class="site-nav__links" aria-label="${t('nav.ariaPrimary')}">
        <a href="#top">${t('nav.story')}</a>
        <a href="#buy">${t('nav.buy')}</a>
        <a href="#bar-lab">${t('nav.barlab')}</a>
        <a href="#wholesale">${t('nav.wholesale')}</a>
      </nav>
      <div class="site-nav__actions">
        <nav class="lang-switch" aria-label="${t('nav.ariaLang')}">
          <a data-lang="en" href="/"${lang === 'en' ? ' class="is-active" aria-current="page"' : ' hreflang="en"'}>EN</a>
          <a data-lang="id" href="/id/"${lang === 'id' ? ' class="is-active" aria-current="page"' : ' hreflang="id"'}>ID</a>
        </nav>
        <a class="btn btn--gold btn--sm" href="${wa(lang, 'reserve')}" target="_blank" rel="noopener">${t('nav.reserve')}</a>
      </div>
    </div>
  </header>

  <main>
    <!-- ====== HERO ====== -->
    <section class="hero">
      <!-- Photo slot: swap the placeholder for a real roastery / farm photo -->
      <div class="hero__photo photo-slot"></div>
      <div class="hero__scrim-v"></div>
      <div class="hero__scrim-d"></div>
      <span class="hero__shape-circle" aria-hidden="true"></span>
      <span class="hero__shape-quarter" aria-hidden="true"></span>
      <div class="hero__inner">
        <div class="hero__content">
          <div class="hero__eyebrow-row">
            <span class="hero__rule"></span>
            <span class="hero__eyebrow">${t('hero.eyebrow')}</span>
            <span class="hand-note hero__vol">${t('hero.badge')}</span>
          </div>
          <h1><span>${t('hero.titleLine1')}</span><br /><strong>${t('hero.titleLine2')}</strong></h1>
          <p class="hero__lede">${t('hero.para')}</p>
          <div class="hero__ctas">
            <a class="btn btn--gold btn--lg" href="#buy">${t('hero.cta1')}</a>
            <a class="btn btn--ghost btn--lg" href="${wa(lang, 'reserve')}" target="_blank" rel="noopener">${t('hero.cta2')}</a>
          </div>
          <a class="hero__wholesale-link" href="#wholesale"><span>${t('hero.wholesaleLink')}</span> <span class="arrow">→</span></a>
        </div>
      </div>
    </section>

    <!-- ====== THREE PATHWAYS ====== -->
    <section class="pathways">
      <div class="pathways__inner">
        <div class="pathways__grid">
          <a class="pathway" href="#buy">
            <div class="pathway__eyebrow">${t('pw1.eyebrow')}</div>
            <div class="pathway__title">${t('pw1.title')}</div>
            <p>${t('pw1.desc')}</p>
            <span class="pathway__cta">${t('pw1.cta')}</span>
          </a>
          <a class="pathway" href="${wa(lang, 'reserve')}" target="_blank" rel="noopener">
            <div class="pathway__eyebrow">${t('pw2.eyebrow')}</div>
            <div class="pathway__title">${t('pw2.title')}</div>
            <p>${t('pw2.desc')}</p>
            <span class="pathway__cta">${t('pw2.cta')}</span>
          </a>
          <a class="pathway" href="#wholesale">
            <div class="pathway__eyebrow">${t('pw3.eyebrow')}</div>
            <div class="pathway__title">${t('pw3.title')}</div>
            <p>${t('pw3.desc')}</p>
            <span class="pathway__cta">${t('pw3.cta')}</span>
          </a>
        </div>
      </div>
    </section>

    <!-- ====== BUY THE HARVEST ====== -->
    <section id="buy" class="buy">
      <div class="buy__inner">
        <div class="buy__header">
          <span class="eyebrow">${t('buy.eyebrow')}</span>
          <h2><span>${t('buy.titleLine1')}</span> <strong>${t('buy.titleLine2')}</strong></h2>
          <p>${t('buy.para')}</p>
        </div>
        <div class="buy__grid">
          <div class="buy-card">
            <div class="buy-card__badge buy-card__badge--tokopedia">T</div>
            <div class="buy-card__title">Tokopedia</div>
            <p>${t('buy.tokopedia.desc')}</p>
            <a class="btn btn--primary btn--md" href="${SITE.tokopedia}" target="_blank" rel="noopener">${t('buy.tokopedia.cta')}</a>
          </div>
          <div class="buy-card">
            <div class="buy-card__badge buy-card__badge--shopee">S</div>
            <div class="buy-card__title">Shopee</div>
            <p>${t('buy.shopee.desc')}</p>
            <a class="btn btn--primary btn--md" href="${SITE.shopee}" target="_blank" rel="noopener">${t('buy.shopee.cta')}</a>
          </div>
          <div class="buy-card">
            <div class="buy-card__badge buy-card__badge--whatsapp">W</div>
            <div class="buy-card__title">WhatsApp</div>
            <p>${t('buy.whatsapp.desc')}</p>
            <a class="btn btn--primary btn--md" href="${wa(lang, 'buy')}" target="_blank" rel="noopener">${t('buy.whatsapp.cta')}</a>
          </div>
        </div>
      </div>
    </section>

    <!-- (The sourcing story + philosophy pillars that used to sit here are
         parked in renderSourcingStory()/renderPillars() until the
         "process" page ships — see SEO-PLAYBOOK.md Phase 5.2b.) -->

    <!-- ====== TORN SEAM → BAR & LAB ======
         torn--paper-to-dark matches the .buy background; switch back to
         torn--cream-to-dark when a cream section returns above it. -->
    <div class="torn torn--paper-to-dark" aria-hidden="true"></div>
    <section id="bar-lab" class="bar-lab">
      <span class="bar-lab__shape-dashed" aria-hidden="true"></span>
      <span class="bar-lab__shape-triangle" aria-hidden="true"></span>
      <span class="bar-lab__shape-pill" aria-hidden="true"></span>
      <span class="bar-lab__shape-quarter" aria-hidden="true"></span>
      <div class="bar-lab__inner">
        <span class="eyebrow eyebrow--on-dark">The Bar &amp; Lab</span>
        <h2>${t('barlab.title')}</h2>
        <p>${t('barlab.para')}</p>
        <a class="btn btn--gold btn--lg" href="${wa(lang, 'reserve')}" target="_blank" rel="noopener">${t('barlab.cta')}</a>

        <!-- Visit / NAP block — keep character-identical to schema + Google Business Profile -->
        <div id="visit" class="visit">
          <div class="visit__title">${t('visit.title')}</div>
          <div class="visit__grid">
            <div>
              <div class="visit__label">${t('visit.addressLabel')}</div>
              <p class="visit__text">Jl. Paradise 14, Blok M No.13, RT.3/RW.19,<br />Sunter Agung, Tanjung Priok,<br />Jakarta Utara, DKI Jakarta 14350</p>
              <a class="visit__map" href="${SITE.mapsUrl}" target="_blank" rel="noopener">${t('visit.mapCta')}</a>
            </div>
            <div>
              <div class="visit__label">${t('visit.hoursLabel')}</div>
              <p class="visit__text">${t('visit.hoursLine')}</p>
              <p class="visit__text visit__sessions">12.00–14.00 &nbsp;·&nbsp; 14.30–16.30<br />17.00–19.00 &nbsp;·&nbsp; 19.30–21.30</p>
              <p class="visit__note">${t('visit.note')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ====== TORN SEAM → WHOLESALE ====== -->
    <div class="torn torn--dark-to-mid" aria-hidden="true"></div>
    <section id="wholesale" class="wholesale">
      <span class="wholesale__shape-circle" aria-hidden="true"></span>
      <span class="wholesale__shape-square" aria-hidden="true"></span>
      <div class="wholesale__split">
        <div class="wholesale__copy">
          <span class="eyebrow eyebrow--on-dark">${t('wholesale.eyebrow')}</span>
          <h2><span>${t('wholesale.titleLine1')}</span><br /><strong>${t('wholesale.titleLine2')}</strong></h2>
          <p>${t('wholesale.para')}</p>
        </div>
        <div class="wholesale__card">
          <div class="wholesale__ships">
            <span class="hand-note">${t('wholesale.badge')}</span>
          </div>
          <div class="wholesale__card-title">${t('wholesale.cardTitle')}</div>
          <p>${t('wholesale.cardDesc')}</p>
          <div class="wholesale__actions">
            <a class="btn btn--gold btn--lg" href="${wa(lang, 'wholesale')}" target="_blank" rel="noopener">${t('wholesale.cta')}</a>
            <a class="wholesale__email" href="mailto:${SITE.email}"><span>${t('wholesale.emailPrefix')}</span> ${SITE.email}</a>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- ====== FOOTER ====== -->
  <footer class="site-footer">
    <div class="site-footer__grid">
      <div>
        <img class="site-footer__logo" src="/assets/logo-full-apricot-trans.png" alt="Roots and Acre Coffee Roastery" />
        <p class="site-footer__mission">${t('footer.tagline')}</p>
        <div class="site-footer__social">
          <a href="${SITE.instagram}" target="_blank" rel="noopener">Instagram</a>
          <a href="${SITE.tokopedia}" target="_blank" rel="noopener">Tokopedia</a>
          <a href="${SITE.shopee}" target="_blank" rel="noopener">Shopee</a>
        </div>
      </div>
      <div class="site-footer__col">
        <div class="site-footer__col-title">${t('footer.explore')}</div>
        <a href="#top">${t('footer.explore1')}</a>
        <a href="#buy">${t('footer.explore2')}</a>
        <a href="#bar-lab">${t('footer.explore3')}</a>
      </div>
      <div class="site-footer__col">
        <div class="site-footer__col-title">${t('footer.visit')}</div>
        <a href="${wa(lang, 'reserve')}" target="_blank" rel="noopener">${t('footer.visit1')}</a>
        <a href="#visit">${t('footer.visit2')}</a>
        <a href="${SITE.mapsUrl}" target="_blank" rel="noopener">${t('footer.visit3')}</a>
      </div>
      <div class="site-footer__col">
        <div class="site-footer__col-title">${t('footer.wholesale')}</div>
        <a href="#wholesale">${t('footer.wholesale1')}</a>
        <a href="${wa(lang, 'wholesale')}" target="_blank" rel="noopener">${t('footer.wholesale2')}</a>
      </div>
    </div>
    <div class="site-footer__bottom">
      <span>${t('footer.bottomLeft')}</span>
      <span>${t('footer.bottomNote')}</span>
    </div>
  </footer>
</body>
</html>
`;
}

/* ---------- sitemap.xml ---------- */

function renderSitemap() {
  const alternates = `
    <xhtml:link rel="alternate" hreflang="en" href="${SITE.origin}/"/>
    <xhtml:link rel="alternate" hreflang="id" href="${SITE.origin}/id/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE.origin}/"/>`;
  const urls = [`${SITE.origin}/`, `${SITE.origin}/id/`].map((loc) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${LASTMOD}</lastmod>${alternates}
  </url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

/* ---------- Write everything ---------- */

const outputs = [
  ['index.html', renderHome('en')],
  [path.join('id', 'index.html'), renderHome('id')],
  ['sitemap.xml', renderSitemap()]
];

for (const [rel, content] of outputs) {
  const abs = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, content);
  console.log('wrote', rel);
}

// Sanity: every EN key must exist in ID and vice versa
const enKeys = Object.keys(T.en).sort();
const idKeys = Object.keys(T.id).sort();
const missing = enKeys.filter((k) => !idKeys.includes(k)).concat(idKeys.filter((k) => !enKeys.includes(k)));
if (missing.length) {
  console.error('TRANSLATION KEY MISMATCH:', missing.join(', '));
  process.exit(1);
}
console.log('translation keys in sync:', enKeys.length);
