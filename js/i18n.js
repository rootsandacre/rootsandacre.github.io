/* ============================================================
   ROOTS & ACRE — Language switching (EN / ID)
   From the design: first visit picks the language from the
   browser (Indonesian → ID, otherwise EN); an explicit choice
   via the nav toggle is saved and wins on later visits.
   ============================================================ */

(function () {
  'use strict';

  var WA_NUMBER = '6281200001234'; // placeholder — swap before launch

  var TRANSLATIONS = {
    en: {
      'nav.story': 'The Story',
      'nav.buy': 'Buy the Harvest',
      'nav.barlab': 'The Bar & Lab',
      'nav.wholesale': 'Wholesale',
      'nav.reserve': 'Reserve a Seat',

      'hero.eyebrow': 'Micro-roastery & slow bar · Jakarta',
      'hero.badge': 'harvest vol. 04',
      'hero.titleLine1': 'From the highlands',
      'hero.titleLine2': 'to the slow bar.',
      'hero.para': "We walk the islands' finest specialty farms and roast each lot by hand in micro-batches — poured at our twelve-seat slow bar, or shipped fresh to your door.",
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
      'buy.para': "This week's lots are stocked on Tokopedia and Shopee — or message us on WhatsApp and we'll help you pick a roast.",
      'buy.tokopedia.desc': 'Browse our full lineup and order for delivery anywhere in Indonesia.',
      'buy.tokopedia.cta': 'Visit our store',
      'buy.shopee.desc': "Same lineup, same freshness — checkout through Shopee if that's easier for you.",
      'buy.shopee.cta': 'Visit our store',
      'buy.whatsapp.desc': "Not sure what to pick? Message us directly and we'll walk you through this week's roast.",
      'buy.whatsapp.cta': 'Chat with us',

      'narrative.eyebrow': 'The sourcing',
      'narrative.titleLine1': "Indonesia's finest specialty grade,",
      'narrative.titleLine2': 'one small lot at a time.',
      'narrative.para': 'We walk the farms before we ever buy a bag — sitting with the growers, tasting at the wet mill, learning how each lot was raised. The relationships come first; the coffee follows.',
      'narrative.quote': "We'd rather know the name of the person who picked it than the score on the bag.",
      'narrative.grownBy': 'Grown by',
      'narrative.location': 'West Java · 1,400m',

      'pillar1.title': 'Traceability',
      'pillar1.body': 'Every lot names the grower, the village, and the wet mill. We buy what we have walked.',
      'pillar2.title': 'Micro-batch Roasting',
      'pillar2.body': '9kg at a time, profiled by hand. Small enough to chase the sweetness in each origin.',
      'pillar3.title': 'Sensory Excellence',
      'pillar3.body': 'Cupped, scored, and dialled in our lab before a single bag reaches the bar.',

      'barlab.title': 'Twelve seats. One pour at a time.',
      'barlab.para': "Our reservation-only slow bar seats twelve. Each session is a guided journey through the week's lots — brewed slowly, talked through gently.",
      'barlab.cta': 'Reserve a Slow Bar Seat',

      'wholesale.eyebrow': 'For cafés & green buyers',
      'wholesale.titleLine1': 'Pour our origins',
      'wholesale.titleLine2': 'in your house.',
      'wholesale.para': "International café owners and green buyers — we'll send a curated export sample kit of this season's lots, with full traceability sheets and roast notes.",
      'wholesale.badge': 'ships worldwide',
      'wholesale.cardTitle': "Let's talk wholesale",
      'wholesale.cardDesc': 'Five 100g samples · traceability dossier · indicative FOB pricing. No cost for qualified buyers.',
      'wholesale.cta': 'Message us on WhatsApp',
      'wholesale.emailPrefix': 'or email',

      'footer.tagline': "The bridge between Indonesia's coffee farmers and the people who love what they grow.",
      'footer.explore': 'Explore',
      'footer.explore1': 'The Story',
      'footer.explore2': 'Buy the Harvest',
      'footer.explore3': 'The Bar & Lab',
      'footer.visit': 'Visit',
      'footer.visit1': 'Reserve a seat',
      'footer.visit2': 'Opening hours',
      'footer.visit3': 'Find us in Jakarta',
      'footer.wholesale': 'Wholesale',
      'footer.wholesale1': 'For cafés & buyers',
      'footer.wholesale2': 'Get in touch',
      'footer.bottomNote': 'Reservation-only slow bar · Micro-roastery',

      'wa.reserve': "Hi Roots & Acre! I'd like to reserve a seat at the Bar & Lab.\n\nDate: \nTime: \nNumber of guests: \n\nThank you!",
      'wa.buy': "Hi Roots & Acre! I'd like to order some coffee. Could you help me pick this week's lot?",
      'wa.wholesale': "Hi Roots & Acre! I'm from [café / company name], interested in your wholesale/export sample kit."
    },
    id: {
      'nav.story': 'Kisah Kami',
      'nav.buy': 'Beli Hasil Panen',
      'nav.barlab': 'The Bar & Lab',
      'nav.wholesale': 'Grosir',
      'nav.reserve': 'Reservasi Kursi',

      'hero.eyebrow': 'Micro-roastery & slow bar · Jakarta',
      'hero.badge': 'panen vol. 04',
      'hero.titleLine1': 'Dari dataran tinggi',
      'hero.titleLine2': 'menuju slow bar.',
      'hero.para': 'Kami menyusuri kebun-kebun specialty terbaik di berbagai pulau, lalu meracik tiap lot secara manual dalam batch kecil — diseduh di slow bar berkapasitas dua belas kursi, atau dikirim segar ke depan pintumu.',
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
      'barlab.para': 'Slow bar kami menerima reservasi untuk dua belas kursi. Setiap sesi adalah perjalanan terpandu menjelajahi lot minggu ini — diseduh perlahan, dijelaskan dengan santai.',
      'barlab.cta': 'Reservasi Kursi Slow Bar',

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
      'footer.visit2': 'Jam buka',
      'footer.visit3': 'Temukan kami di Jakarta',
      'footer.wholesale': 'Grosir',
      'footer.wholesale1': 'Untuk kafe & pembeli',
      'footer.wholesale2': 'Hubungi kami',
      'footer.bottomNote': 'Slow bar khusus reservasi · Micro-roastery',

      'wa.reserve': 'Halo Roots & Acre! Saya ingin reservasi kursi di Bar & Lab.\n\nTanggal: \nJam: \nJumlah orang: \n\nTerima kasih!',
      'wa.buy': 'Halo Roots & Acre! Saya ingin memesan kopi. Bisa dibantu pilih lot minggu ini?',
      'wa.wholesale': 'Halo Roots & Acre! Saya dari [nama kafe/perusahaan], tertarik dengan sample kit wholesale/export.'
    }
  };

  function detectLang() {
    try {
      var saved = window.localStorage.getItem('ra_lang');
      if (saved === 'en' || saved === 'id') return saved;
    } catch (e) {}
    try {
      var nav = ((navigator.language || navigator.userLanguage || '') + '').toLowerCase();
      if (nav.indexOf('id') === 0) return 'id';
    } catch (e) {}
    return 'en';
  }

  function waLink(msg) {
    return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg);
  }

  function applyLang(lang) {
    var t = TRANSLATIONS[lang];
    document.documentElement.lang = lang;

    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute('data-i18n');
      if (t[key] !== undefined) nodes[i].textContent = t[key];
    }

    var waNodes = document.querySelectorAll('[data-wa]');
    for (var j = 0; j < waNodes.length; j++) {
      waNodes[j].href = waLink(t['wa.' + waNodes[j].getAttribute('data-wa')]);
    }

    var btns = document.querySelectorAll('.lang-switch button');
    for (var k = 0; k < btns.length; k++) {
      var active = btns[k].getAttribute('data-lang') === lang;
      btns[k].classList.toggle('is-active', active);
      btns[k].setAttribute('aria-pressed', active ? 'true' : 'false');
    }
  }

  function setLang(lang) {
    applyLang(lang);
    try { window.localStorage.setItem('ra_lang', lang); } catch (e) {}
  }

  function init() {
    var btns = document.querySelectorAll('.lang-switch button');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () {
        setLang(this.getAttribute('data-lang'));
      });
    }
    applyLang(detectLang());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
