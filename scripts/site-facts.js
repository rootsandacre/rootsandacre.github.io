#!/usr/bin/env node
/* ============================================================
   ROOTS & ACRE — shared business facts & entity schema

   The single source of truth for NAP/contact values and for the
   business/website JSON-LD nodes, shared by every generator:

     - scripts/build-pages.js   → rootsandacre.com (EN + ID pages)
     - scripts/build-beans.js   → beans.rootsandacre.com (link-in-bio)

   Change a fact HERE and nowhere else. Both sites pick it up on
   their next build, so the visible NAP block, the schema, and the
   bio page can never disagree.

   Scope rule: business facts and the entity nodes built from them
   live here. Page copy and translations stay in each generator's
   own T object — except the three WhatsApp message templates below,
   which both sites send verbatim and so must not be duplicated.
   ============================================================ */

'use strict';

/* ---------- Business facts (Phase 0.5 fact sheet) ---------- */

const SITE = {
  origin: 'https://rootsandacre.com',
  beansOrigin: 'https://beans.rootsandacre.com',
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
  // Confirmed 2026-07-28 from the building pin. Previous value (-6.13706, 106.86763) was an
  // OSM street centroid ~67 m away — don't reintroduce it. 6dp ≈ 0.1 m, plenty of precision.
  geo: { lat: -6.137118, lng: 106.867027 },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(
    'Roots & Acre, Jl. Paradise 14, Blok M No.13, Sunter Agung, Tanjung Priok, Jakarta Utara 14350'
  ),
  foundingDate: '2024-04',
  priceRange: 'Rp 170.000–322.000',
  themeColor: '#28544b',
  ogImage: '/assets/images/og-image.jpg', // real 1200×630 photo pending — see SEO-TODO.md
  logo: '/assets/logo-full-apricot-trans.png',
  ga4Id: 'G-0M9TPP0BYN' // GA4 Measurement ID — referral traffic from AI search, see SEO-TODO.md
};

/* ---------- WhatsApp message templates ----------
   Prefilled into wa.me links. Shared because the bio page sends the
   exact same messages as the main site — a customer must not get a
   different template depending on which entry point they used.
   build-pages.js re-exposes these through its T object as
   `wa.reserve` / `wa.buy` / `wa.wholesale`. */

const WA_TEXT = {
  en: {
    reserve: 'Hi Roots & Acre! I’d like to reserve a seat at the Bar & Lab.\n\nDate: \nSession: \nNumber of guests: \n\nThank you!',
    buy: 'Hi Roots & Acre! I’d like to order some coffee. Could you help me pick this week’s lot?',
    wholesale: 'Hi Roots & Acre! I’m from [café / company name], interested in your wholesale/export sample kit.'
  },
  id: {
    reserve: 'Halo Roots & Acre! Saya ingin reservasi kursi di Bar & Lab.\n\nTanggal: \nSesi: \nJumlah orang: \n\nTerima kasih!',
    buy: 'Halo Roots & Acre! Saya ingin memesan kopi. Bisa dibantu pilih lot minggu ini?',
    wholesale: 'Halo Roots & Acre! Saya dari [nama kafe/perusahaan], tertarik dengan sample kit wholesale/export.'
  }
};

// Build a wa.me link from raw (unescaped) message text.
function waLink(text) {
  return `https://wa.me/${SITE.waNumber}?text=${encodeURIComponent(text)}`;
}

/* ---------- Structured data: the shared entity nodes ----------
   Both sites emit these with IDENTICAL @id values, anchored on the
   apex domain. That is what tells Google and the answer engines that
   beans.rootsandacre.com is the same business entity as the main
   site rather than a second one. Do not re-anchor these @ids on the
   subdomain — it would fork the entity. */

const BUSINESS_DESC = {
  en: 'Roots & Acre is an Indonesian micro-roastery and reservation-only slow bar in Sunter, North Jakarta. It roasts single-origin lots sourced directly from farms across the archipelago in micro-batches, serves them in four private daily slow-bar sessions (reserve via WhatsApp or Instagram DM), and ships beans via Tokopedia and Shopee.',
  id: 'Roots & Acre adalah micro-roastery Indonesia dan slow bar khusus reservasi di Sunter, Jakarta Utara. Kami me-roasting lot single origin yang bersumber langsung dari kebun di seluruh Nusantara dalam batch kecil, menyajikannya dalam empat sesi slow bar privat setiap hari (reservasi via WhatsApp atau DM Instagram), dan mengirim biji kopi via Tokopedia dan Shopee.'
};

function businessNode(lang) {
  return {
    '@type': ['CafeOrCoffeeShop', 'OnlineStore'],
    '@id': `${SITE.origin}/#business`,
    name: SITE.name,
    alternateName: SITE.altName,
    description: BUSINESS_DESC[lang],
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
    // No openingHoursSpecification on purpose. The 12.00–21.30 window is the envelope of
    // four reservation-only session slots, not public opening hours — declaring it here
    // made Google show "Open now" for a place with no walk-in service, and forced hours
    // onto the Google Business Profile. Session times stay visible on the page (visit
    // block, labelled "Sessions"); they're just not claimed as opening hours. See SEO-TODO.
    acceptsReservations: 'True',
    servesCuisine: 'Specialty coffee',
    priceRange: SITE.priceRange,
    currenciesAccepted: 'IDR',
    foundingDate: SITE.foundingDate,
    sameAs: [SITE.instagram, SITE.tokopedia, SITE.shopee]
  };
}

function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE.origin}/#website`,
    url: `${SITE.origin}/`,
    name: SITE.name,
    inLanguage: ['en', 'id'],
    publisher: { '@id': `${SITE.origin}/#business` }
  };
}

module.exports = { SITE, WA_TEXT, waLink, BUSINESS_DESC, businessNode, websiteNode };
