#!/usr/bin/env node
/* ============================================================
   ROOTS & ACRE — page builder
   Renders the EN (/) and ID (/id/) homepages, the FAQ page pair
   (/faq/, /id/faq/), and sitemap.xml from one template, so the
   two languages can never drift.

   Usage:  node scripts/build-pages.js
   (No dependencies, nothing runs at deploy time — the generated
   static HTML is committed.)

   To change copy: edit T below (both languages, same commit).
   To change business facts: edit SITE below — it is the single
   source of truth for NAP/contact values across HTML and schema.
   To add a new page: give it a slug, add it to renderNav/renderFooter
   if it should be linked site-wide, add it to the `outputs` array,
   and add its slug to `PAGE_SLUGS` in renderSitemap().
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
    'nav.faq': 'FAQ',
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
    'footer.explore4': 'FAQ',
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
    'wa.wholesale': 'Hi Roots & Acre! I’m from [café / company name], interested in your wholesale/export sample kit.',

    /* ---------- FAQ page (Phase 4) ---------- */
    'faq.metaTitle': 'FAQ — Roots & Acre Micro-roastery & Slow Bar · Jakarta',
    'faq.metaDesc': 'Answers about reserving a seat, buying Roots & Acre coffee beans, wholesale & export sample kits, and what makes Indonesian specialty coffee distinct — from Jakarta’s reservation-only micro-roastery and slow bar.',
    'faq.ogTitle': 'Roots & Acre — Frequently Asked Questions',
    'faq.ogDesc': 'Everything you need to know about visiting, buying, and sourcing from Roots & Acre — Jakarta’s reservation-only micro-roastery and slow bar.',
    'faq.ogImageAlt': 'Roots & Acre — frequently asked questions',
    'faq.eyebrow': 'Answers, direct',
    'faq.h1': 'Frequently Asked Questions',
    'faq.lede': 'Straight answers about visiting the slow bar, buying the harvest, and sourcing wholesale or export lots from Roots & Acre — Jakarta’s reservation-only micro-roastery and slow bar.',
    'faq.breadcrumbHome': 'Home',
    'faq.ctaReserve': 'Reserve on WhatsApp →',

    'faq.group.visit': 'Visiting & Reservations',
    'faq.group.buy': 'Buying the Beans',
    'faq.group.wholesale': 'Wholesale & Export',
    'faq.group.about': 'About Roots & Acre & Indonesian Coffee',

    'faq.reserve.q': 'How do I reserve a seat at Roots & Acre?',
    'faq.reserve.a': 'Message us on WhatsApp or send an Instagram DM with your preferred date and session; we’ll confirm availability and reply with the details. Roots & Acre is reservation-only, so booking ahead is the only way to secure a seat at the slow bar.',
    'faq.walkins.q': 'Do you take walk-ins?',
    'faq.walkins.a': 'No — Roots & Acre’s slow bar is reservation-only, with no walk-in service except during occasional special events we announce on Instagram. Every session is private, so we don’t mix separate reservations in the same sitting; message us ahead on WhatsApp or Instagram to book a session.',
    'faq.location.q': 'Where is Roots & Acre located?',
    'faq.location.a': 'Roots & Acre’s roastery and slow bar are at Jl. Paradise 14, Blok M No.13, RT.3/RW.19, Sunter Agung, Tanjung Priok, Jakarta Utara, DKI Jakarta 14350.',
    'faq.groupSize.q': 'How many guests can I bring to a session?',
    'faq.groupSize.a': 'Each slow bar session is private and exclusive to your reservation — up to twelve guests can be seated at once. Let us know your group size on WhatsApp when you book so we can prepare the right pours.',
    'faq.sessionFlow.q': 'What happens during a slow bar session?',
    'faq.sessionFlow.a': 'Each of our four daily sessions is a guided pour-over journey through that week’s lots, led by our team at a twelve-seat bar — brewed slowly and talked through gently, never rushed and never shared with another group.',

    'faq.whereBuy.q': 'Where can I buy Roots & Acre coffee beans?',
    'faq.whereBuy.a': 'Our roasted beans are stocked on Tokopedia and Shopee for delivery anywhere in Indonesia, or you can order directly by messaging us on WhatsApp — we’ll help you pick this week’s roast and arrange payment and shipping.',
    'faq.shipInternational.q': 'Do you ship outside Indonesia?',
    'faq.shipInternational.a': 'Our retail beans currently ship only within Indonesia, via Tokopedia and Shopee. For cafés and green buyers outside Indonesia, our wholesale and export sample kits do ship worldwide — reach out on WhatsApp or email to arrange one.',
    'faq.price.q': 'How much do Roots & Acre coffee beans cost?',
    'faq.price.a': 'Our 187.5g bags of roasted single-origin coffee currently range from Rp 170.000 to Rp 322.000, depending on the lot. Check Tokopedia or Shopee for this week’s exact lineup and pricing, or message us on WhatsApp for a recommendation.',

    'faq.wholesaleSupply.q': 'Does Roots & Acre supply cafés?',
    'faq.wholesaleSupply.a': 'Yes — we work with café owners and green buyers through wholesale and export sample kits, sent with full traceability sheets and roast notes so you can evaluate a lot before committing to a larger order.',
    'faq.exportGreen.q': 'Do you export green coffee?',
    'faq.exportGreen.a': 'Yes. Alongside roasted wholesale lots, we offer green coffee for export to buyers outside Indonesia, with indicative FOB pricing provided once we understand your volume and lot preferences — message us on WhatsApp to start the conversation.',
    'faq.sampleKit.q': 'How do I request a wholesale sample kit?',
    'faq.sampleKit.a': 'Message us on WhatsApp or email us with your café or company name, and we’ll send a curated kit of five 100g samples from this season’s lots, along with a traceability dossier and indicative FOB pricing — free for qualified buyers.',

    'faq.whatIsSlowBar.q': 'What is a slow bar?',
    'faq.whatIsSlowBar.a': 'A slow bar is a reservation-only coffee bar built around unhurried, hand-poured brewing — usually pour-over or similar manual methods — rather than fast counter service. At Roots & Acre, each private session walks guests through that week’s lots one cup at a time, with no other tables sharing the room.',
    'faq.microRoastery.q': 'What does "micro-roastery" mean, and how is Roots & Acre one?',
    'faq.microRoastery.a': 'A micro-roastery roasts coffee in small batches rather than large industrial runs, allowing closer control over each lot’s profile. Roots & Acre roasts by hand in roughly 9kg batches — small enough to chase the specific sweetness and character of each single origin rather than blending for consistency at scale.',
    'faq.howSource.q': 'How does Roots & Acre source its coffee?',
    'faq.howSource.a': 'We buy directly from growers rather than through brokers, visiting farms and wet mills before committing to a lot so we know exactly how it was grown and processed. We currently work with more than twenty farmer groups and cooperatives across Indonesia, prioritizing small lots with room to grow and processors with honest, traceable post-harvest practices.',
    'faq.whatMakesIndoDifferent.q': 'What makes Indonesian specialty coffee different?',
    'faq.whatMakesIndoDifferent.a': 'Indonesia’s volcanic highlands and equatorial climate produce an unusually wide range of flavor profiles across a small number of islands, and much of the archipelago still uses wet-hulling (giling basah), a processing method rarely seen outside Indonesia that gives many Indonesian coffees their heavier body and earthy, low-acid character.',
    'faq.regions.q': 'What coffee-growing regions does Indonesia have?',
    'faq.regions.a': 'Indonesia grows specialty coffee across a wide range of islands and elevations, including Aceh’s Gayo highlands, North Sumatra’s Lintong area, West Java, Bali’s Kintamani highlands, Flores, Toraja in South Sulawesi, and parts of Papua — each with its own elevation range, common processing methods, and flavor tendencies.'
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
    'nav.faq': 'Pertanyaan Umum',
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
    'footer.explore4': 'Pertanyaan Umum',
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
    'wa.wholesale': 'Halo Roots & Acre! Saya dari [nama kafe/perusahaan], tertarik dengan sample kit wholesale/export.',

    /* ---------- FAQ page (Phase 4) ---------- */
    'faq.metaTitle': 'FAQ — Roots & Acre Micro-roastery & Slow Bar · Jakarta',
    'faq.metaDesc': 'Jawaban soal reservasi kursi, membeli biji kopi Roots & Acre, sample kit wholesale & ekspor, dan apa yang membuat kopi specialty Indonesia berbeda — dari micro-roastery dan slow bar khusus reservasi di Jakarta.',
    'faq.ogTitle': 'Roots & Acre — Pertanyaan yang Sering Diajukan',
    'faq.ogDesc': 'Semua yang perlu kamu tahu soal berkunjung, membeli, dan sourcing dari Roots & Acre — micro-roastery dan slow bar khusus reservasi di Jakarta.',
    'faq.ogImageAlt': 'Roots & Acre — pertanyaan yang sering diajukan',
    'faq.eyebrow': 'Jawaban langsung',
    'faq.h1': 'Pertanyaan yang Sering Diajukan',
    'faq.lede': 'Jawaban langsung soal reservasi slow bar, membeli hasil panen, serta sample kit wholesale & ekspor dari Roots & Acre — micro-roastery dan slow bar khusus reservasi di Jakarta.',
    'faq.breadcrumbHome': 'Beranda',
    'faq.ctaReserve': 'Reservasi via WhatsApp →',

    'faq.group.visit': 'Kunjungan & Reservasi',
    'faq.group.buy': 'Membeli Biji Kopi',
    'faq.group.wholesale': 'Grosir & Ekspor',
    'faq.group.about': 'Tentang Roots & Acre & Kopi Indonesia',

    'faq.reserve.q': 'Bagaimana cara reservasi kursi di Roots & Acre?',
    'faq.reserve.a': 'Chat kami di WhatsApp atau kirim DM Instagram dengan tanggal dan sesi yang kamu inginkan; kami akan konfirmasi ketersediaannya dan membalas dengan detailnya. Roots & Acre khusus reservasi, jadi memesan lebih dulu adalah satu-satunya cara untuk mengamankan kursi di slow bar kami.',
    'faq.walkins.q': 'Apakah bisa walk-in tanpa reservasi?',
    'faq.walkins.a': 'Tidak — slow bar kami khusus reservasi, tanpa layanan walk-in kecuali saat acara khusus yang kami umumkan di Instagram. Setiap sesi bersifat privat, jadi kami tidak menggabungkan reservasi berbeda dalam satu sesi; chat kami lebih dulu di WhatsApp atau Instagram untuk booking sesi.',
    'faq.location.q': 'Di mana lokasi Roots & Acre?',
    'faq.location.a': 'Roastery dan slow bar Roots & Acre berada di Jl. Paradise 14, Blok M No.13, RT.3/RW.19, Sunter Agung, Tanjung Priok, Jakarta Utara, DKI Jakarta 14350.',
    'faq.groupSize.q': 'Berapa banyak tamu yang bisa saya bawa dalam satu sesi?',
    'faq.groupSize.a': 'Setiap sesi slow bar bersifat privat dan eksklusif untuk reservasimu — hingga dua belas tamu bisa duduk sekaligus. Beri tahu jumlah rombonganmu saat booking di WhatsApp supaya kami bisa menyiapkan seduhan yang tepat.',
    'faq.sessionFlow.q': 'Apa yang terjadi selama sesi slow bar?',
    'faq.sessionFlow.a': 'Setiap sesi dari empat sesi harian kami adalah perjalanan pour-over terpandu menjelajahi lot minggu itu, dipandu langsung oleh tim kami di bar berkapasitas dua belas kursi — diseduh perlahan dan dijelaskan dengan santai, tanpa terburu-buru dan tanpa digabung dengan rombongan lain.',

    'faq.whereBuy.q': 'Di mana saya bisa membeli biji kopi Roots & Acre?',
    'faq.whereBuy.a': 'Biji kopi roasting kami tersedia di Tokopedia dan Shopee untuk pengiriman ke seluruh Indonesia, atau kamu bisa pesan langsung dengan chat kami di WhatsApp — kami bantu pilihkan roast minggu ini serta atur pembayaran dan pengirimannya.',
    'faq.shipInternational.q': 'Apakah kalian kirim ke luar Indonesia?',
    'faq.shipInternational.a': 'Biji kopi retail kami saat ini hanya dikirim dalam Indonesia, lewat Tokopedia dan Shopee. Untuk kafe dan pembeli green bean di luar Indonesia, sample kit wholesale dan ekspor kami memang kirim ke seluruh dunia — hubungi kami via WhatsApp atau email untuk mengaturnya.',
    'faq.price.q': 'Berapa harga biji kopi Roots & Acre?',
    'faq.price.a': 'Kemasan 187.5g biji kopi single origin kami saat ini berkisar Rp 170.000 hingga Rp 322.000, tergantung lot-nya. Cek Tokopedia atau Shopee untuk lineup dan harga minggu ini, atau chat kami di WhatsApp kalau ingin rekomendasi.',

    'faq.wholesaleSupply.q': 'Apakah Roots & Acre memasok kopi untuk kafe?',
    'faq.wholesaleSupply.a': 'Ya — kami bekerja sama dengan pemilik kafe dan pembeli green bean lewat sample kit wholesale dan ekspor, dikirim lengkap dengan lembar traceability dan catatan roast supaya kamu bisa mengevaluasi satu lot sebelum melakukan pemesanan lebih besar.',
    'faq.exportGreen.q': 'Apakah kalian ekspor green bean?',
    'faq.exportGreen.a': 'Ya. Selain lot wholesale yang sudah di-roasting, kami juga menyediakan green bean untuk ekspor ke pembeli di luar Indonesia, dengan indikasi harga FOB setelah kami memahami volume dan preferensi lot-mu — chat kami di WhatsApp untuk memulai obrolannya.',
    'faq.sampleKit.q': 'Bagaimana cara meminta sample kit wholesale?',
    'faq.sampleKit.a': 'Chat kami di WhatsApp atau kirim email dengan nama kafe atau perusahaanmu, dan kami akan kirimkan kit berisi lima sample 100g dari lot musim ini, lengkap dengan dokumen traceability dan indikasi harga FOB — tanpa biaya untuk pembeli yang memenuhi kriteria.',

    'faq.whatIsSlowBar.q': 'Apa itu slow bar?',
    'faq.whatIsSlowBar.a': 'Slow bar adalah bar kopi khusus reservasi yang dibangun di atas proses seduh manual yang tidak terburu-buru — biasanya pour-over atau metode manual sejenis — bukan layanan counter cepat. Di Roots & Acre, setiap sesi privat mengajak tamu menjelajahi lot minggu itu satu cangkir demi satu cangkir, tanpa meja lain untuk berbagi ruangan.',
    'faq.microRoastery.q': 'Apa arti "micro-roastery", dan bagaimana Roots & Acre menjadi salah satunya?',
    'faq.microRoastery.a': 'Micro-roastery me-roasting kopi dalam batch kecil, bukan produksi industri berskala besar, sehingga profil tiap lot bisa dikontrol lebih dekat. Roots & Acre meracik secara manual dalam batch sekitar 9kg, cukup kecil untuk mengejar rasa manis dan karakter khas tiap single origin, bukan mencampurnya demi konsistensi skala besar.',
    'faq.howSource.q': 'Bagaimana cara Roots & Acre bersumber kopinya?',
    'faq.howSource.a': 'Kami membeli langsung dari petani, bukan lewat broker, mengunjungi kebun dan wet mill sebelum memutuskan membeli satu lot supaya kami tahu persis bagaimana kopi itu ditanam dan diproses. Saat ini kami bekerja sama dengan lebih dari dua puluh kelompok tani dan koperasi di seluruh Indonesia, memprioritaskan small lot dengan potensi tumbuh dan prosesor dengan praktik pasca-panen yang jujur dan terlacak.',
    'faq.whatMakesIndoDifferent.q': 'Apa yang membuat kopi specialty Indonesia berbeda?',
    'faq.whatMakesIndoDifferent.a': 'Dataran tinggi vulkanik dan iklim khatulistiwa Indonesia menghasilkan variasi profil rasa yang luar biasa beragam dari sejumlah kecil pulau, dan sebagian besar Nusantara masih menggunakan giling basah (wet-hulling), metode pemrosesan yang jarang ditemukan di luar Indonesia dan memberi banyak kopi Indonesia body yang lebih berat serta karakter earthy dengan keasaman rendah.',
    'faq.regions.q': 'Daerah mana saja penghasil kopi specialty di Indonesia?',
    'faq.regions.a': 'Indonesia menanam kopi specialty di berbagai pulau dan ketinggian, termasuk dataran tinggi Gayo di Aceh, kawasan Lintong di Sumatra Utara, Jawa Barat, dataran tinggi Kintamani di Bali, Flores, Toraja di Sulawesi Selatan, hingga sebagian Papua — masing-masing dengan rentang ketinggian, metode proses umum, dan kecenderungan rasa tersendiri.'
  }
};

/* ---------- FAQ content order (language-independent metadata) ----------
   Each item pulls its q/a text from T via `faq.<id>.q` / `faq.<id>.a`.
   `cta`, if present, adds one action link under the answer. */

const FAQ_ITEMS = [
  { id: 'reserve', group: 'visit', cta: { type: 'wa', msgKey: 'reserve', labelKey: 'faq.ctaReserve' } },
  { id: 'walkins', group: 'visit' },
  { id: 'location', group: 'visit', cta: { type: 'maps' } },
  { id: 'groupSize', group: 'visit' },
  { id: 'sessionFlow', group: 'visit' },

  { id: 'whereBuy', group: 'buy', cta: { type: 'wa', msgKey: 'buy', labelKey: 'buy.whatsapp.cta' } },
  { id: 'shipInternational', group: 'buy' },
  { id: 'price', group: 'buy' },

  { id: 'wholesaleSupply', group: 'wholesale' },
  { id: 'exportGreen', group: 'wholesale' },
  { id: 'sampleKit', group: 'wholesale', cta: { type: 'wa', msgKey: 'wholesale', labelKey: 'wholesale.cta' } },

  { id: 'whatIsSlowBar', group: 'about' },
  { id: 'microRoastery', group: 'about' },
  { id: 'howSource', group: 'about' },
  { id: 'whatMakesIndoDifferent', group: 'about' },
  { id: 'regions', group: 'about' }
];

const FAQ_GROUP_ORDER = ['visit', 'buy', 'wholesale', 'about'];

/* ---------- Helpers ---------- */

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function makeT(lang) {
  return function t(key) {
    const v = T[lang][key];
    if (v === undefined) throw new Error(`Missing translation "${key}" for "${lang}"`);
    return escapeHtml(v);
  };
}

function wa(lang, msgKey) {
  return `https://wa.me/${SITE.waNumber}?text=${encodeURIComponent(T[lang]['wa.' + msgKey])}`;
}

// slug: '' for home, 'faq/' for the FAQ pair, etc. — always '' or ends in '/'.
function pageUrl(lang, slug) {
  return lang === 'en' ? `${SITE.origin}/${slug}` : `${SITE.origin}/id/${slug}`;
}

// Root-relative equivalent of pageUrl(lang, ''), for in-page nav/footer links.
function homeHref(lang) {
  return lang === 'en' ? '/' : '/id/';
}

/* ---------- Structured data (Phase 3) ---------- */

function businessNode(lang) {
  const description = lang === 'en'
    ? 'Roots & Acre is an Indonesian micro-roastery and reservation-only slow bar in Sunter, North Jakarta. It roasts single-origin lots sourced directly from farms across the archipelago in micro-batches, serves them in four private daily slow-bar sessions (reserve via WhatsApp or Instagram DM), and ships beans via Tokopedia and Shopee.'
    : 'Roots & Acre adalah micro-roastery Indonesia dan slow bar khusus reservasi di Sunter, Jakarta Utara. Kami me-roasting lot single origin yang bersumber langsung dari kebun di seluruh Nusantara dalam batch kecil, menyajikannya dalam empat sesi slow bar privat setiap hari (reservasi via WhatsApp atau DM Instagram), dan mengirim biji kopi via Tokopedia dan Shopee.';
  return {
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

function webPageNode(lang, url, name, description) {
  return {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: lang,
    isPartOf: { '@id': `${SITE.origin}/#website` },
    about: { '@id': `${SITE.origin}/#business` }
  };
}

function schema(lang, url) {
  const t = (k) => T[lang][k]; // raw text — JSON.stringify handles escaping
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      businessNode(lang),
      websiteNode(),
      webPageNode(lang, url, t('meta.title'), t('meta.desc'))
    ]
  }, null, 2);
}

function faqSchema(lang, url) {
  const t = (k) => T[lang][k]; // raw text — JSON.stringify handles escaping
  const mainEntity = FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: t(`faq.${item.id}.q`),
    acceptedAnswer: {
      '@type': 'Answer',
      text: t(`faq.${item.id}.a`)
    }
  }));
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      businessNode(lang),
      websiteNode(),
      webPageNode(lang, url, t('faq.metaTitle'), t('faq.metaDesc')),
      {
        '@type': 'FAQPage',
        '@id': `${url}#faqpage`,
        mainEntity
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: t('faq.breadcrumbHome'), item: pageUrl(lang, '') },
          { '@type': 'ListItem', position: 2, name: t('nav.faq'), item: url }
        ]
      }
    ]
  }, null, 2);
}

/* ---------- Shared chrome: <head> tags, nav, footer ---------- */

function renderHeadCommon(lang, { slug, title, desc, ogTitle, ogDesc, ogImageAlt, schemaJson }) {
  const url = pageUrl(lang, slug);
  const locale = lang === 'en' ? 'en_US' : 'id_ID';
  const altLocale = lang === 'en' ? 'id_ID' : 'en_US';
  return `  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${desc}" />
  <meta name="theme-color" content="${SITE.themeColor}" />

  <link rel="canonical" href="${url}" />
  <link rel="alternate" hreflang="en" href="${pageUrl('en', slug)}" />
  <link rel="alternate" hreflang="id" href="${pageUrl('id', slug)}" />
  <link rel="alternate" hreflang="x-default" href="${pageUrl('en', slug)}" />

  <!-- Open Graph / social preview -->
  <meta property="og:site_name" content="Roots &amp; Acre" />
  <meta property="og:title" content="${ogTitle}" />
  <meta property="og:description" content="${ogDesc}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${url}" />
  <meta property="og:locale" content="${locale}" />
  <meta property="og:locale:alternate" content="${altLocale}" />
  <meta property="og:image" content="${SITE.origin}${SITE.ogImage}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="${ogImageAlt}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${ogTitle}" />
  <meta name="twitter:description" content="${ogDesc}" />
  <meta name="twitter:image" content="${SITE.origin}${SITE.ogImage}" />

  <link rel="icon" href="/assets/symbol.svg" type="image/svg+xml" />

  <link rel="stylesheet" href="/assets/fonts/fonts.css?v=${assetVersion('assets/fonts/fonts.css')}" />
  <link rel="stylesheet" href="/css/styles.css?v=${assetVersion('css/styles.css')}" />
  <script src="/js/i18n.js?v=${assetVersion('js/i18n.js')}" defer></script>

  <script type="application/ld+json">
${schemaJson}
  </script>`;
}

function renderNav(lang, slug) {
  const t = makeT(lang);
  const hh = homeHref(lang);
  return `  <header class="site-nav">
    <div class="site-nav__inner">
      <a class="site-nav__brand" href="${hh}#top">
        <img src="/assets/symbol.svg" alt="Roots and Acre" />
        <span class="site-nav__wordmark">Roots &amp; Acre</span>
      </a>
      <nav class="site-nav__links" aria-label="${t('nav.ariaPrimary')}">
        <a href="${hh}#top">${t('nav.story')}</a>
        <a href="${hh}#buy">${t('nav.buy')}</a>
        <a href="${hh}#bar-lab">${t('nav.barlab')}</a>
        <a href="${hh}#wholesale">${t('nav.wholesale')}</a>
        <a href="${hh}faq/">${t('nav.faq')}</a>
      </nav>
      <div class="site-nav__actions">
        <nav class="lang-switch" aria-label="${t('nav.ariaLang')}">
          <a data-lang="en" href="/${slug}"${lang === 'en' ? ' class="is-active" aria-current="page"' : ' hreflang="en"'}>EN</a>
          <a data-lang="id" href="/id/${slug}"${lang === 'id' ? ' class="is-active" aria-current="page"' : ' hreflang="id"'}>ID</a>
        </nav>
        <a class="btn btn--gold btn--sm" href="${wa(lang, 'reserve')}" target="_blank" rel="noopener">${t('nav.reserve')}</a>
      </div>
    </div>
  </header>`;
}

function renderFooter(lang) {
  const t = makeT(lang);
  const hh = homeHref(lang);
  return `  <footer class="site-footer">
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
        <a href="${hh}#top">${t('footer.explore1')}</a>
        <a href="${hh}#buy">${t('footer.explore2')}</a>
        <a href="${hh}#bar-lab">${t('footer.explore3')}</a>
        <a href="${hh}faq/">${t('footer.explore4')}</a>
      </div>
      <div class="site-footer__col">
        <div class="site-footer__col-title">${t('footer.visit')}</div>
        <a href="${wa(lang, 'reserve')}" target="_blank" rel="noopener">${t('footer.visit1')}</a>
        <a href="${hh}#visit">${t('footer.visit2')}</a>
        <a href="${SITE.mapsUrl}" target="_blank" rel="noopener">${t('footer.visit3')}</a>
      </div>
      <div class="site-footer__col">
        <div class="site-footer__col-title">${t('footer.wholesale')}</div>
        <a href="${hh}#wholesale">${t('footer.wholesale1')}</a>
        <a href="${wa(lang, 'wholesale')}" target="_blank" rel="noopener">${t('footer.wholesale2')}</a>
      </div>
    </div>
    <div class="site-footer__bottom">
      <span>${t('footer.bottomLeft')}</span>
      <span>${t('footer.bottomNote')}</span>
    </div>
  </footer>`;
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

/* ---------- Page template: home ---------- */

function renderHome(lang) {
  const t = makeT(lang);
  const url = pageUrl(lang, '');
  return `<!DOCTYPE html>
<!-- GENERATED by scripts/build-pages.js — do not edit by hand.
     Edit the template/translations there, then run: node scripts/build-pages.js
     Both language versions are rebuilt together and must ship in the same commit. -->
<html lang="${lang}" id="top">
<head>
${renderHeadCommon(lang, {
    slug: '',
    title: t('meta.title'),
    desc: t('meta.desc'),
    ogTitle: t('meta.ogTitle'),
    ogDesc: t('meta.ogDesc'),
    ogImageAlt: t('meta.ogImageAlt'),
    schemaJson: schema(lang, url)
  })}
</head>
<body>
  <!-- ====== NAV ====== -->
${renderNav(lang, '')}

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
${renderFooter(lang)}
</body>
</html>
`;
}

/* ---------- Page template: FAQ ---------- */

function renderFAQ(lang) {
  const t = makeT(lang);
  const slug = 'faq/';
  const url = pageUrl(lang, slug);

  const ctaLabel = (item) => {
    if (!item.cta) return '';
    if (item.cta.type === 'maps') return t('visit.mapCta');
    return t(item.cta.labelKey);
  };
  const ctaHref = (item) => {
    if (!item.cta) return '';
    if (item.cta.type === 'maps') return SITE.mapsUrl;
    return wa(lang, item.cta.msgKey);
  };

  const groupsHtml = FAQ_GROUP_ORDER.map((group) => {
    const items = FAQ_ITEMS.filter((i) => i.group === group);
    const itemsHtml = items.map((item) => {
      const lines = [
        `        <div class="faq-item">`,
        `          <h2>${t(`faq.${item.id}.q`)}</h2>`,
        `          <p>${t(`faq.${item.id}.a`)}</p>`
      ];
      if (item.cta) {
        lines.push(`          <a class="faq-item__cta" href="${ctaHref(item)}" target="_blank" rel="noopener">${ctaLabel(item)}</a>`);
      }
      lines.push(`        </div>`);
      return lines.join('\n');
    }).join('\n');
    return `      <div class="faq-group">
        <div class="eyebrow faq-group__label">${t(`faq.group.${group}`)}</div>
${itemsHtml}
      </div>`;
  }).join('\n');

  return `<!DOCTYPE html>
<!-- GENERATED by scripts/build-pages.js — do not edit by hand.
     Edit the template/translations there, then run: node scripts/build-pages.js
     Both language versions are rebuilt together and must ship in the same commit. -->
<html lang="${lang}">
<head>
${renderHeadCommon(lang, {
    slug,
    title: t('faq.metaTitle'),
    desc: t('faq.metaDesc'),
    ogTitle: t('faq.ogTitle'),
    ogDesc: t('faq.ogDesc'),
    ogImageAlt: t('faq.ogImageAlt'),
    schemaJson: faqSchema(lang, url)
  })}
</head>
<body>
  <!-- ====== NAV ====== -->
${renderNav(lang, slug)}

  <main>
    <section class="faq-hero">
      <span class="eyebrow eyebrow--on-dark">${t('faq.eyebrow')}</span>
      <h1>${t('faq.h1')}</h1>
      <p>${t('faq.lede')}</p>
    </section>

    <div class="torn torn--dark-to-paper" aria-hidden="true"></div>
    <section class="faq-body">
      <div class="faq-body__inner">
${groupsHtml}
      </div>
    </section>
  </main>

  <!-- ====== FOOTER ====== -->
${renderFooter(lang)}
</body>
</html>
`;
}

/* ---------- sitemap.xml ---------- */

const PAGE_SLUGS = ['', 'faq/'];

function renderSitemap() {
  const urls = [];
  for (const slug of PAGE_SLUGS) {
    for (const lang of ['en', 'id']) {
      urls.push({ loc: pageUrl(lang, slug), slug });
    }
  }
  const body = urls.map(({ loc, slug }) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${LASTMOD}</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="${pageUrl('en', slug)}"/>
    <xhtml:link rel="alternate" hreflang="id" href="${pageUrl('id', slug)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${pageUrl('en', slug)}"/>
  </url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${body}
</urlset>
`;
}

/* ---------- Write everything ---------- */

const outputs = [
  ['index.html', renderHome('en')],
  [path.join('id', 'index.html'), renderHome('id')],
  [path.join('faq', 'index.html'), renderFAQ('en')],
  [path.join('id', 'faq', 'index.html'), renderFAQ('id')],
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

// Sanity: every FAQ_ITEMS id must resolve to a q/a pair in both languages
for (const item of FAQ_ITEMS) {
  for (const lang of ['en', 'id']) {
    if (T[lang][`faq.${item.id}.q`] === undefined || T[lang][`faq.${item.id}.a`] === undefined) {
      console.error(`FAQ item "${item.id}" missing q/a for "${lang}"`);
      process.exit(1);
    }
  }
}
console.log('FAQ items in sync:', FAQ_ITEMS.length);
