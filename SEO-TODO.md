# SEO TODO — placeholders, external actions, review flags

Tracks: placeholder values awaiting real facts, items requiring Dan's action
outside the repo, and content flagged for Bahasa Indonesia review.
See `SEO-PLAYBOOK.md` for the full plan.

## Placeholders awaiting real values

The Phase 0.5 fact sheet was filled by Dan on 2026-07-14 — real values now live
in `SEO-PLAYBOOK.md` (Phase 0.5 table). Remaining open rows:

| Key | Status |
|---|---|
| `LEGAL-NAME` | ⏸ deferred by Dan — site uses brand name "Roots & Acre"; revisit if a PT name should appear in schema `legalName` |
| `GEO` | ⚠️ approximate — `-6.13706, 106.86763` is the OSM street centroid for Jalan Paradise 14, Sunter Agung. Dan to confirm against the exact building / future GBP pin |
| `FOUNDERS` | ⏸ deferred — ask Dan again at the next revision whether founder names may be published (schema `founder`) |
| `GBP-MAPS-URL` | ⏳ blocked on GBP claim (see below) |
| `SESSION-PRICING` | ⏳ slow-bar session price not yet public — bean bags (187.5g) are Rp 170.000–322.000; ask Dan when pricing the Bar & Lab pages |
| `OG-IMAGE` | 🔶 branded placeholder shipped 2026-07-17 (logo on brand green, 1200×630, `assets/images/og-image.jpg`) so link previews work at launch. Swap for a real photo when Dan's material is ready — **re-ask together with the other deferred items** |
| Real photos | ⏳ same batch as OG image — `.photo-slot` divs become `<img>`/`<picture>` with EN/ID alt text when they land |
| `SOURCING-MATERIAL` | ⏳ farm stories + photos exist but unprocessed (Dan, 2026-07-16). Blocks the "process" page pair (playbook Phase 5.2b — URL TBD: `/process/` or `/sourcing/`). Homepage ships without the sourcing story block AND the philosophy pillars; both parked in `scripts/build-pages.js` (`renderSourcingStory`, `renderPillars`) |

## Owner: Dan — actions outside the repo

- [ ] Verify domain in **Google Search Console** (DNS TXT record); submit
      `sitemap.xml` once Phase 1 ships.
- [ ] Verify in **Bing Webmaster Tools** (one-click import from GSC; Bing powers
      ChatGPT search & Copilot retrieval).
- [ ] Create/claim **Google Business Profile** for the slow bar (category:
      Coffee roaster / Coffee shop). Name/address/phone must be character-identical
      to the site footer and schema.
- [ ] Add lightweight **analytics** (GA4 or Plausible — one script tag). Only way
      to see referral traffic from chatgpt.com / perplexity.ai / gemini.google.com.
- [ ] Record **GEO baseline** (below), re-run monthly.

## GEO baseline

Ask ChatGPT, Perplexity, and Gemini:
1. "best specialty coffee roasters in Jakarta"
2. "where to buy Indonesian specialty coffee beans"

Log here whether Roots & Acre is mentioned and who is. Re-run monthly.

| Date | Engine | Mentioned? | Who is cited |
|---|---|---|---|
| _baseline not yet run_ | | | |

## Deliberately-omitted FAQ facts (Phase 4, 2026-07-16)

One playbook-suggested FAQ question was left out rather than answered with
an invented number:

- **"How fresh is the coffee when it ships?"** — no confirmed roast-to-ship
  turnaround time. Ask Dan for a real number (e.g. "ships within N days of
  roasting") and add as `faq.freshness` in `scripts/build-pages.js`.

(Slow-bar session pricing was also deferred at first, but Dan clarified
2026-07-17 that it has no fixed number by design — it depends on the coffees
available and ordered that day. That's now answered honestly as `faq.sessionPrice`,
not a gap.)

## Flagged for Bahasa Indonesia review

New ID strings written 2026-07-14 (in `scripts/build-pages.js`, `T.id`) — drafted
to match the existing translations' tone, but should get a native read:

- `meta.title`, `meta.desc`, `meta.ogTitle`, `meta.ogDesc` (ID homepage title/description)
- `hero.para` (new entity-definition opening)
- `barlab.para` (rewritten for the four-private-sessions fact)
- `visit.*` (the whole visit/NAP block)
- `footer.bottomLeft` ("meroasting sejak April 2024" — is "meroasting" the voice we want, or "me-roasting"/"menyangrai"?)
- ID description string inside the JSON-LD schema (function `schema()`)

New FAQ page ID strings written 2026-07-16, updated 2026-07-17 (all `faq.*`
keys in `T.id`, `scripts/build-pages.js`) — 17 Q&A pairs plus intro/meta copy,
drafted to match the existing tone but not yet reviewed by a native speaker.

## Notes

- Reference material found locally (not in repo): company profile deck at
  `../Company Profile/Roots & Acre - COMPRO.pdf` — mission/vision, sourcing
  criteria, farmer/co-op list, Jacoweek 2025 menu prices. Usable for copy;
  contains no address/phone/hours.
- Playbook references `brand-voice-guidelines.md` and
  `april-2026-coffee-reference.md` in the parent folder — neither file exists
  there yet (April 2026 release assets exist as captions/images under
  `../April 2026 Coffee Releases/`).
- No real photos in the repo yet; `.photo-slot` divs are CSS backgrounds. When
  photos land they must become `<img>`/`<picture>` with EN/ID alt text.
