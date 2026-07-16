# Roots & Acre — SEO / AEO / GEO Playbook

**v2 — audited against the repo 2026-07-14.** Status: OPEN. One more revision is
expected when final copy + real business facts land (see Phase 0.5 and the
"Final facts & copy sweep" section at the bottom — that's the command Dan will
run when the real address, WhatsApp number, etc. are ready).

Instructions for Claude Code. Execute phase by phase, in order. Each phase ends
with acceptance criteria — do not move to the next phase until they pass.
Commit at the end of each phase with a message like `seo: phase 2 — bilingual URLs + hreflang`.

## Context

- **Site:** Plain static HTML/CSS/JS on GitHub Pages, no build step. `index.html` at root, custom domain `rootsandacre.com` via CNAME.
- **Business:** Indonesian micro-roastery + 12-seat reservation-only slow bar in Jakarta. Sells beans online (Tokopedia/Shopee), takes wholesale/export inquiries, reservations via WhatsApp.
- **Audiences (equal priority):**
  - Indonesian consumers (Bahasa Indonesia): "coffee roaster Jakarta", "biji kopi specialty", "slow bar Jakarta", reservations, Tokopedia/Shopee buyers.
  - International (English): "Indonesian specialty coffee roaster", wholesale/green-buyer/export inquiries, travelers searching "specialty coffee Jakarta".
- **Strategic goal:** No roaster in Indonesia is doing serious AEO/GEO. We want to be the source AI engines (ChatGPT, Perplexity, Gemini, Google AI Overviews) cite for Indonesian specialty coffee questions, and rank conventionally for both language markets.
- **Constraint:** The homepage stays as the primary experience (quick launchability). New pages are allowed selectively where content doesn't belong on the homepage (FAQ, per-coffee pages, wholesale detail, guides).

## Ground rules for Claude Code

1. **Never invent business facts.** The site has placeholder contact values (WhatsApp `6281200001234`, `wholesale@rootsandacre.co`, marketplace URLs — see the comment at the top of `index.html`). Schema and content need the REAL address, phone, geo coordinates, opening hours, founding date, and social profile URLs. If a needed fact is not in the repo or this doc, ASK Dan — do not fabricate. Use `PLACEHOLDER-` prefixed values only if told to proceed without them, and log every placeholder in `SEO-TODO.md` at repo root.
2. **Preserve the design.** SEO changes must not visibly alter layout, typography, or the existing aesthetic unless a task explicitly says so.
3. **No build step.** Everything stays static HTML/CSS/JS. No frameworks, no generators, unless Dan approves one later.
4. **Both languages, always.** Any new page or content block ships in EN and ID together. If you can't write natural Bahasa Indonesia for something, draft it and flag it for review rather than shipping stiff machine-translation tone.
5. **Answer-first writing.** Every new section/page opens with a direct, self-contained answer (40–60 words) before elaborating. Prefer the entity-definition pattern: "[Entity] is a [category] that [differentiator]." Research (CMU GEO framework) shows definitional openings get retrieved and cited significantly more by LLM pipelines.
6. **Factual density over keyword density.** Specific numbers, names, places, dates (elevations, varietals, process methods, lot sizes, roast dates) are what make content citable. No filler.
7. **Verify structured data** after every schema change with `npx -y structured-data-testing-tool` or by validating the JSON-LD parses (`node -e` with JSON.parse on the extracted block). Also paste-check complex schema at validator.schema.org when possible.

---

## Phase 0 — Measurement first

You can't prove any of this worked without baselines.

Tasks:
1. Create `SEO-TODO.md` at repo root. It tracks: placeholders awaiting real values, items requiring Dan's action outside the repo, and content flagged for Bahasa review.
2. Add to `SEO-TODO.md` these **owner: Dan** action items (they can't be done from the repo):
   - Verify domain in **Google Search Console** (DNS TXT record) and submit sitemap once Phase 1 ships.
   - Verify in **Bing Webmaster Tools** (imports from GSC; Bing powers ChatGPT search & Copilot retrieval — this matters more than it used to).
   - Create/claim **Google Business Profile** for the slow bar (category: Coffee roasters / Coffee shop). GBP is the single strongest local + AI-local signal. Keep name/address/phone EXACTLY consistent with what we put in schema.
   - Record current baseline: ask ChatGPT, Perplexity, and Gemini "best specialty coffee roasters in Jakarta" and "where to buy Indonesian specialty coffee beans" — save the answers (are we mentioned? who is?) in `SEO-TODO.md` under "GEO baseline <date>". Re-run monthly.
3. **Analytics (owner: Dan, log in `SEO-TODO.md`):** add lightweight analytics (GA4 or Plausible — one script tag, no design impact). Critical for GEO measurement: it's the only way to see referral traffic from `chatgpt.com`, `perplexity.ai`, `gemini.google.com` — the direct proof AI citations convert.

Acceptance: `SEO-TODO.md` exists with the above; nothing else changed (analytics snippet may land later).

---

## Phase 0.5 — Business fact sheet (collect ONCE, up front)

Every later phase stalls on missing real-world facts if we discover them mid-task.
Instead: this table is the single source of truth. Ask Dan to fill it in one pass.
Until a row is filled, use `PLACEHOLDER-<KEY>` in content/schema and log it in
`SEO-TODO.md`. When the real values arrive, run the **Final facts & copy sweep**
(bottom of this doc).

| Key | Value | Used in |
|---|---|---|
| `LEGAL-NAME` | DEFERRED — use brand name "Roots & Acre" for now (Dan, 2026-07-14) | schema `name`/`legalName` |
| `ADDRESS` | Jl. Paradise 14, Blok M No.13, RT.3/RW.19, Sunter Agung, Kec. Tj. Priok, Jakarta Utara, DKI Jakarta 14350 | footer NAP, schema, GBP |
| `GEO` | ≈ -6.13706, 106.86763 (street-level via OSM Nominatim for Jalan Paradise 14 — CONFIRM with Dan/GBP pin) | schema GeoCoordinates |
| `WHATSAPP` | `6287870702024` (+62 878-7070-2024) | all CTAs, schema `telephone` |
| `EMAIL` | `rootsandacre@gmail.com` (replaces wrong `wholesale@rootsandacre.co`) | wholesale section, schema |
| `HOURS` | Mon–Sun, reservation-only, 4 private sessions/day: 12.00–14.00 · 14.30–16.30 · 17.00–19.00 · 19.30–21.30. Sessions are private (patrons never mixed). No walk-ins except special events. Reserve via WhatsApp or Instagram DM | visible hours block, schema |
| `FOUNDING-DATE` | April 2024 (second anniversary was April 2026) | schema Organization |
| `FOUNDERS` | DEFERRED — ask Dan again at next revision whether names can be published | schema Organization |
| `INSTAGRAM-URL` | https://www.instagram.com/rootsandacre/ | footer, `sameAs` |
| `TOKOPEDIA-URL` | https://www.tokopedia.com/roots-and-acre | buy section, `sameAs` |
| `SHOPEE-URL` | https://shopee.co.id/rootsandacre | buy section, `sameAs` |
| `GBP-MAPS-URL` | ? (after GBP claimed) | footer map link, `sameAs` |
| `PRICE-RANGE` | B2C roasted beans (187.5g bags): Rp 170.000–322.000. Slow-bar session pricing TBD | schema `priceRange` |
| `OG-IMAGE` | DEFERRED — Dan has real photos, not ready yet; re-ask with other missing items | OG/Twitter cards |

**Consistency rule:** name, address, phone must be character-identical across
site footer, schema, GBP, Instagram bio, and marketplace store pages.

Acceptance: table filled (or rows explicitly deferred); `SEO-TODO.md` mirrors any deferred rows.

---

## Phase 1 — Technical foundations (bare-minimum best practice)

Tasks:

1. **robots.txt** at root. Allow everything, explicitly welcome AI crawlers, point to sitemap:
   ```
   User-agent: *
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

   Sitemap: https://rootsandacre.com/sitemap.xml
   ```
2. **sitemap.xml** at root listing every indexable URL with `<lastmod>`. Regenerate (by hand — it's a small site) whenever pages are added. Include hreflang `xhtml:link` alternates once Phase 2 ships.
3. **Head hygiene on `index.html`** (and every future page):
   - `<link rel="canonical" href="https://rootsandacre.com/">` (self-referencing, absolute, trailing-slash consistent — pick `https://rootsandacre.com/` as canonical form everywhere).
   - Complete Open Graph set: add `og:site_name`, `og:locale` (`en_US`) + `og:locale:alternate` (`id_ID`), `og:image:width/height/alt`. Verify `assets/images/og-image.jpg` actually exists — it's referenced but the images dir currently only has `favicon.svg`. If missing, flag in `SEO-TODO.md` (needs a real 1200×630 image).
   - Twitter card tags: `twitter:card` = `summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image`.
   - `<meta name="theme-color">` matching the brand palette in `css/styles.css`.
   - **Favicon consistency:** `index.html` uses `/assets/symbol.svg`, `404.html` uses `/assets/images/favicon.svg`. Both files exist — pick one path, use it everywhere.
4. ~~Heading audit~~ **(corrected in v2 audit: headings DO contain static EN text inside spans — not empty).** Reduced task: verify exactly one `<h1>` per page and logical h1→h2→h3 nesting on every new page. No restructuring needed on index.html.
5. **Visible NAP + hours block (NEW in v2 — high leverage).** Footer links "Opening hours" and "Find us in Jakarta" currently point to `#bar-lab`, which contains neither. Add a visit block (in/near the Bar & Lab section or footer, design-sympathetic): street address, per-day hours, Google Maps link — character-identical to schema and GBP (Phase 0.5 facts). Visible NAP on-page is a stronger local signal than schema alone. Use `PLACEHOLDER-` values + `SEO-TODO.md` if facts aren't in yet, but build the block now.
6. **Footer social/profile links (NEW in v2).** Add Instagram (+ Tokopedia/Shopee store links) to the footer. `sameAs` schema needs visible on-page corroboration, and there are currently zero profile links on the site.
7. **Performance & CWV quick wins:**
   - Self-host the Google Fonts (download WOFF2 into `assets/fonts/`, `@font-face` with `font-display: swap`) — removes 2 third-party connections; the README says fonts dir exists for this.
   - `loading="lazy"` + explicit `width`/`height` on all below-the-fold images; hero image (when added) gets `fetchpriority="high"` and a preload.
   - Serve images as WebP/AVIF with sensible sizes. Add a note to `SEO-TODO.md` if source images aren't in the repo yet.
   - **Images rule (NEW in v2):** the current photo slots (`.photo-slot`) are CSS-background divs — invisible to Google Images, no alt text possible. When real photos land, they go in as `<img>`/`<picture>` elements with descriptive alt (EN/ID per page), not backgrounds. Image search is real traffic for "coffee shop Jakarta" intent, and the same photos feed GBP.
8. **404 page:** confirm `404.html` links back home and carries the same nav (v2 audit: it currently has NO nav — add it).

Acceptance:
- [ ] `curl -s https://rootsandacre.com/robots.txt` returns the file (after deploy; locally, file exists and is valid).
- [ ] sitemap.xml validates (well-formed XML, absolute URLs).
- [ ] `index.html` has canonical, full OG + Twitter set; one non-empty `<h1>`.
- [ ] Visible address + hours + Maps link on the homepage (placeholder-flagged if needed).
- [ ] Footer carries Instagram/marketplace profile links.
- [ ] `www.rootsandacre.com` 301-redirects to the apex domain (check DNS/GH Pages after deploy — split indexing kills small sites).
- [ ] No render-blocking Google Fonts requests remain.
- [ ] Lighthouse (or PageSpeed Insights after deploy): SEO ≥ 95, Performance ≥ 90 mobile.

---

## Phase 2 — Bilingual architecture (the fix that matters most)

**Problem:** `js/i18n.js` swaps EN/ID text on the same URL. Search engines index one URL with the static EN fallback — **the Indonesian content is effectively invisible to Google, and Bahasa queries are half our market.** Client-side language swapping is explicitly the anti-pattern in Google's multilingual guidance.

**Fix — static ID mirror at `/id/`:**

1. Create `/id/index.html`: a full static copy of the homepage with all `data-i18n` strings resolved to the ID translations from `js/i18n.js` (they already exist — use them verbatim as the source of truth). `<html lang="id">`, ID `<title>`/meta description written for Bahasa search intent (e.g. "roastery kopi specialty & slow bar di Jakarta"), canonical `https://rootsandacre.com/id/`.
2. Hreflang cluster on BOTH pages (every page lists itself + all alternates + x-default):
   ```html
   <link rel="alternate" hreflang="en" href="https://rootsandacre.com/" />
   <link rel="alternate" hreflang="id" href="https://rootsandacre.com/id/" />
   <link rel="alternate" hreflang="x-default" href="https://rootsandacre.com/" />
   ```
   ⚠️ 75% of hreflang implementations contain errors and one error kills the whole cluster. Rules: absolute URLs, bidirectional (both pages carry the full set), self-referencing included, tags in static HTML (not JS-injected).
3. Repurpose the language toggle: on `/` the ID button links to `/id/` (real `<a>`, crawlable); on `/id/` the EN button links to `/`. Keep the localStorage preference + browser-language *suggestion* (e.g. a dismissible banner "Lihat dalam Bahasa Indonesia?") but **never auto-redirect** — Googlebot can't crawl through auto-redirects.
4. `js/i18n.js` slims down to: WhatsApp helpers + the language-suggestion banner. In-place text swapping is retired. Keep the translations object as the canonical string source for building future ID pages, or extract it to a build-notes comment.
5. Update sitemap.xml with both URLs + xhtml:link hreflang annotations.
6. Every future page ships as a pair: `/x/` and `/id/x/`, same hreflang pattern.

**Maintenance rule (add to README):** the two homepages are siblings — any content edit to one MUST be mirrored to the other in the same commit.

**Drift mitigation (v2 — recommended, needs Dan's OK):** hand-mirroring is fine for
one page pair, but by Phase 5 there will be 8–12 pairs and drift is this playbook's
biggest long-term failure mode. Recommended: a zero-dependency Node script in the
repo (`scripts/build-pages.js`, run manually, no CI) that renders both language
versions from one template using the existing `TRANSLATIONS` object, committing
plain static HTML. Output stays identical to hand-written pages — this honors the
no-build-step constraint in spirit (nothing runs at deploy time). Decide at the
latest when the FAQ pair ships (Phase 4).

Acceptance:
- [ ] `/id/index.html` exists, fully translated, `lang="id"`, own canonical.
- [ ] Both pages carry identical, complete hreflang clusters (validate with hreflang.org tester or manual check of bidirectionality).
- [ ] Language toggle is plain crawlable links; no auto-redirect anywhere.
- [ ] View-source (not rendered DOM) of each page shows its language's actual content.

---

## Phase 3 — Structured data

Honesty note: a May 2026 Ahrefs study found schema doesn't directly boost AI-engine citations (and slightly negatively correlates with AI Overviews inclusion). Schema's proven wins are rich results, the local Map Pack, and disambiguating the entity for knowledge graphs — which feeds AI answers indirectly. **v2 correction:** since Aug 2023 Google shows FAQ rich results only for government/health sites — do NOT expect FAQ rich results or the previously-cited "+35% lift". FAQPage schema is still worth adding for entity clarity and answer-engine extraction. Implement it correctly, don't stack spam.

All JSON-LD in a single `<script type="application/ld+json">` per page using `@graph`. Real values only (Ground rule 1).

1. **On both homepages — `CafeOrCoffeeShop` node** (most specific type; hierarchy LocalBusiness > FoodEstablishment > CafeOrCoffeeShop):
   - `@id`: `https://rootsandacre.com/#business` (stable, referenced everywhere)
   - `name`, `alternateName` ("Roots and Acre"), `description` (entity-definition sentence), `url`, `logo`, `image`
   - `address` (PostalAddress — REAL address needed), `geo` (GeoCoordinates), `telephone`, `email`
   - `openingHoursSpecification`, `priceRange`, `servesCuisine`: "Specialty coffee", `acceptsReservations`: true (+ note reservations via WhatsApp in description)
   - `currenciesAccepted`: "IDR", `paymentAccepted`
   - `sameAs`: Instagram, Tokopedia store, Shopee store, GBP/Maps URL — every official profile. This is the entity-consolidation backbone AI engines use to connect mentions of us across the web.
   - Parent `Organization` node `@id: https://rootsandacre.com/#org` with `founder`s, `foundingDate`, `areaServed`, linked via `parentOrganization`/`branchOf` or just make the CafeOrCoffeeShop double-typed `["CafeOrCoffeeShop","OnlineStore"]` if simpler — keep it minimal and valid.
2. **`WebSite` node** with `name`, `url`, `inLanguage`, `publisher` → `#org`.
3. **Per-coffee `Product` nodes** (Phase 5, when coffee pages exist): `name`, `description`, `image`, `brand` → `#org`, `offers` (price IDR, availability, `url` → Tokopedia/Shopee listing), and coffee-specific facts in `additionalProperty` (origin region, elevation, varietal, process, tasting notes, roast level). Nobody in the market does this.
4. **`FAQPage`** on the FAQ page only (Phase 4) — never on pages where the Q&A isn't visible on-page.
5. **`BreadcrumbList`** on all non-home pages.

Acceptance:
- [ ] JSON-LD parses, passes validator.schema.org with zero errors.
- [ ] Google Rich Results Test (after deploy) recognizes LocalBusiness + FAQ where present.
- [ ] Zero fabricated values; anything unknown is in `SEO-TODO.md`, not in schema.

---

## Phase 4 — AEO: own the answers

Goal: when someone asks Google/an AI assistant a question in our domain, our page is the extractable answer.

1. **FAQ page pair (`/faq/` + `/id/faq/`)** — the highest-leverage AEO artifact. Structure: each question is an `<h2>` phrased exactly as people ask it; the first paragraph under it is a complete 40–60 word answer; details follow. 12–20 questions covering real query intent, e.g.:
   - Reservation/visit: "How do I reserve a seat at Roots & Acre?" / "Do you take walk-ins?" / "Where is Roots & Acre located?" (ID: "Bagaimana cara reservasi di Roots & Acre?"…)
   - Buying: "Where can I buy Roots & Acre coffee beans?" / "Do you ship outside Indonesia?" / "How fresh is the coffee when it ships?"
   - Wholesale: "Does Roots & Acre supply cafés?" / "Do you export green coffee?"
   - Category questions we can win: "What is a slow bar?" / "What makes Indonesian specialty coffee different?" / "What coffee regions does Indonesia have?" — these are the GEO plays: category questions where an authoritative Indonesian source barely exists in either language.
   - Draft answers from the homepage copy + `brand-voice-guidelines.md` in the parent folder (authentic, specific, no marketing fluff). Flag facts you don't know.
2. **FAQPage schema** on both FAQ pages, mirroring on-page text exactly.
3. **Answer-first retrofit of the homepage:** ensure the first ~100 words of `<main>` textual content contain the entity definition: "Roots & Acre is an Indonesian micro-roastery and reservation-only slow bar in Jakarta that sources single-origin lots directly from farms across the archipelago and roasts them in micro-batches." (adapt to brand voice; mirror in ID). AI retrieval quotes openings.
4. **Speakable schema** (`speakable` on the entity-definition block and top FAQ answers) — **v2 caveat:** still beta and in practice only used for news publishers. Add only if it's truly 5 minutes; expect nothing from it.
5. Link FAQ prominently from nav/footer on all pages (crawl depth 1).

Acceptance:
- [ ] `/faq/` + `/id/faq/` live, hreflang'd, in sitemap, linked from nav/footer.
- [ ] Every answer is self-contained (makes sense with zero surrounding context — the lift-out test).
- [ ] FAQPage schema matches visible text 1:1; validates clean.

---

## Phase 5 — GEO: become the citable source

This is the "couple notches up" layer. AI engines cite sources with unique facts, clear entity structure, and freshness. Almost no Indonesian roaster publishes any of this.

1. **Per-coffee pages with proprietary data** (`/coffee/<slug>/` + ID pair). For each current release, publish what nobody else does: farm/producer name, region + elevation (masl), varietal, process, harvest window, lot size, cupping notes, roast approach, and price/availability with marketplace links. Product schema per Phase 3. Source facts from `april-2026-coffee-reference.md` in the parent folder and from Dan/B — never invent. When a coffee sells out, keep the page (mark unavailable) — it becomes the permanent archive that makes us THE reference for those farms/regions.
2. **The flagship citable asset:** one deeply factual reference page pair, e.g. "Indonesian Specialty Coffee Regions — a roaster's field guide" (`/guide/indonesian-coffee-regions/`): every major region (Gayo, Kintamani, Toraja, Flores Bajawa, Ijen, West Java…), elevations, harvest calendars, typical processes and flavor profiles, plus first-hand sourcing observations. First-hand experience + specificity is exactly what LLM retrieval rewards, and it earns the category citations ("Perplexity, what are Indonesia's coffee regions?") that build brand authority. This is one page, not a blog commitment.
2b. **"The Sourcing" page pair (`/sourcing/` + `/id/sourcing/`) — decided with Dan 2026-07-16.**
   The homepage's sourcing story block (grower photo slot, "Pak Asep & the
   Mekarsaluyu growers" card, narrative + quote) was **removed from the homepage
   for launch** — the material (farm stories, photos) exists but isn't processed
   yet. The three philosophy pillars stayed on the homepage. The removed block's
   template and translations are parked in `scripts/build-pages.js`
   (`renderSourcingStory`, unused at build time) so nothing is lost.
   When Dan's material is ready, build it as a big storytelling page:
   - Long-form, image-rich page pair: per-farm / per-co-op sections using the
     farmer list in the company profile deck (Kamanuru, Mekarsaluyu, Paratag,
     Rukun Saudara, Kayu Aro, Bener Meriah, Lebak Muncang, …) with names,
     villages/regions, elevations, processes, and first-person sourcing stories —
     this is first-hand-experience GEO material on par with the regions guide.
   - The sourcing criteria from the deck (small lots with growth potential /
     processors with honest post-harvest provenance / unions & co-ops with
     consistency) make a natural answer-first section.
   - Photos land as `<img>`/`<picture>` with EN/ID alt text (Phase 1 images rule),
     never CSS backgrounds.
   - Standard new-page kit: answer-first opening, hreflang pair, canonical,
     BreadcrumbList, sitemap entries, visible "last updated".
   - Relink on ship: reinstate the parked block on the homepage as a teaser
     linking to `/sourcing/`; retarget the nav/footer "The Story" links
     (currently `#top`) to the new page; add it to the FAQ where relevant.
   - Do NOT link to `/sourcing/` from anywhere until the page exists.
3. **llms.txt** at root: brief markdown map of the site (what Roots & Acre is, key pages with one-line descriptions, both languages). Evidence it's read in production is weak (near-zero fetch rates in bot-log audits; Google says it's unnecessary) — it costs 20 minutes and is a harmless forward bet. Do it last, expect nothing.
4. **Entity consistency sweep:** exact same business name, address, phone across site footer, schema, GBP, Instagram bio, Tokopedia/Shopee store pages, and any directory. Add an "About/colophon" block in the footer with the entity-definition sentence on every page. Log external profiles needing edits in `SEO-TODO.md` (owner: Dan).
5. **Freshness cadence** (add to README): visible "last updated" on guide + coffee pages, `<lastmod>` bumps in sitemap on real edits, review the flagship guide quarterly. Citation priority decays measurably within weeks on stale content.
6. **Off-site (owner: Dan, log in `SEO-TODO.md`):** GEO's other half is being mentioned in the places LLMs trust — coffee directories, "best roasters Jakarta" listicles, Reddit (r/espresso, r/pourover, Indonesian coffee communities), local press, Sprudge/Perfect Daily Grind pitches. One earned mention in a widely-scraped listicle can outweigh a month of on-site work.

Acceptance:
- [ ] ≥ 2 coffee page pairs + the regions guide pair live, schema'd, in sitemap, internally linked from the homepage.
- [ ] Every factual claim traceable to Dan/B or repo reference docs.
- [ ] llms.txt exists and matches actual site structure.

---

## Phase 6 — Verify, monitor, iterate

1. Full-site validation pass: every page → canonical ✓, hreflang cluster ✓, schema validates ✓, in sitemap ✓, mobile Lighthouse SEO ≥ 95.
2. Crawl the deployed site (e.g. `wget --spider -r` or a link checker) — zero broken internal links.
3. Add "SEO maintenance" section to README: the mirror-both-languages rule, sitemap lastmod discipline, quarterly guide review, monthly GEO baseline re-run (Phase 0.2), monthly GSC check (owner: Dan).
4. Re-run the GEO baseline prompts from Phase 0 monthly; log deltas in `SEO-TODO.md`. Success = Roots & Acre appearing in AI answers for "specialty coffee Jakarta" / "Indonesian coffee regions" queries within 3–6 months.

---

## Priority order if time-boxed

1. Phase 0.5 (fact sheet — 10 minutes of Dan's time, unblocks everything else)
2. Phase 2 (ID content is currently invisible — biggest single fix)
3. Phase 1 (foundations)
4. Phase 4 (FAQ pair)
5. Phase 3 (schema)
6. Phase 5 (citable assets)
7. Phase 0/6 (measurement wraps around everything — do Phase 0 first regardless, it's 15 minutes)

---

## Final facts & copy sweep (run on Dan's command)

This is the deliberately-open final revision. When Dan says some variant of
**"here are the real values / final copy — update the SEO"**, execute:

1. **Ingest.** Take whatever Dan provides (fact-sheet rows, final copy edits, real
   photos) and fill the Phase 0.5 table in this file. Anything still missing stays
   `PLACEHOLDER-` and stays in `SEO-TODO.md`.
2. **Sweep placeholders.** Grep the whole repo for every known placeholder — at
   minimum: `6281200001234`, `tokopedia.com/rootsandacre`, `shopee.co.id/rootsandacre`,
   `wholesale@rootsandacre.co`, and all `PLACEHOLDER-` strings — and replace with
   real values EVERYWHERE they occur (HTML pages in both languages, `js/i18n.js`,
   JSON-LD, sitemap). Placeholders live in multiple files; a partial replace is
   worse than none.
3. **Copy propagation.** Any final-copy edit applies to BOTH language versions in
   the same commit (or regenerate via the build script if adopted). Re-check that
   answer-first openings (Phase 4.3) survived the copy edits.
4. **Schema refresh.** Rebuild/complete the JSON-LD with real NAP, geo, hours,
   founding date, `sameAs` URLs. Re-validate (validator.schema.org, zero errors).
5. **Consistency check.** Confirm name/address/phone are character-identical
   across: footer NAP block, schema, and (owner: Dan) GBP, Instagram bio,
   Tokopedia/Shopee stores. Log external mismatches in `SEO-TODO.md`.
6. **Assets.** If real photos arrived: convert photo-slot divs to `<img>`/`<picture>`
   with alt text (both languages), create the real 1200×630 `og-image.jpg`,
   update OG/Twitter tags on every page.
7. **Freshness signals.** Bump `<lastmod>` in sitemap for every touched URL;
   update visible "last updated" dates where present.
8. **Verify.** Re-run the Phase 6 validation pass. Update remaining items in
   `SEO-TODO.md`. Commit as `seo: final facts & copy sweep`.
9. **Close out.** Mark this playbook's status header CLOSED (or note what's still
   deferred), and remind Dan to submit the sitemap in GSC/Bing and re-run the GEO
   baseline prompts a month later.
