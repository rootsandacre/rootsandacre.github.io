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
| `OG-IMAGE` | ⏳ Dan has real photos but not ready — **re-ask together with the other deferred items**. Needs 1200×630 `assets/images/og-image.jpg`; until then OG tags reference a file that must ship before launch |
| Real photos | ⏳ same batch as OG image — `.photo-slot` divs become `<img>`/`<picture>` with EN/ID alt text when they land |

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

## Flagged for Bahasa Indonesia review

New ID strings written 2026-07-14 (in `scripts/build-pages.js`, `T.id`) — drafted
to match the existing translations' tone, but should get a native read:

- `meta.title`, `meta.desc`, `meta.ogTitle`, `meta.ogDesc` (ID homepage title/description)
- `hero.para` (new entity-definition opening)
- `barlab.para` (rewritten for the four-private-sessions fact)
- `visit.*` (the whole visit/NAP block)
- `footer.bottomLeft` ("meroasting sejak April 2024" — is "meroasting" the voice we want, or "me-roasting"/"menyangrai"?)
- ID description string inside the JSON-LD schema (function `schema()`)

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
