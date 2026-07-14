# SEO TODO — placeholders, external actions, review flags

Tracks: placeholder values awaiting real facts, items requiring Dan's action
outside the repo, and content flagged for Bahasa Indonesia review.
See `SEO-PLAYBOOK.md` for the full plan.

## Placeholders awaiting real values

Status of the Phase 0.5 business fact sheet. Until a row is filled, the site
uses the placeholder shown (or `PLACEHOLDER-<KEY>` in new content/schema).

| Key | Status | Current placeholder |
|---|---|---|
| `LEGAL-NAME` | ⏳ awaiting Dan | "Roots & Acre" (brand name only) |
| `ADDRESS` | ⏳ awaiting Dan | none on site |
| `GEO` | ⏳ awaiting Dan | none |
| `WHATSAPP` | ⏳ awaiting Dan | `6281200001234` (index.html + js/i18n.js) |
| `EMAIL` | ⏳ awaiting Dan — confirm .co vs .com | `wholesale@rootsandacre.co` |
| `HOURS` | ⏳ awaiting Dan | none |
| `FOUNDING-DATE` | ⏳ awaiting Dan | none |
| `FOUNDERS` | ⏳ awaiting Dan (public names OK?) | none |
| `INSTAGRAM-URL` | ⏳ awaiting Dan | none |
| `TOKOPEDIA-URL` | ⏳ awaiting Dan | `tokopedia.com/rootsandacre` |
| `SHOPEE-URL` | ⏳ awaiting Dan | `shopee.co.id/rootsandacre` |
| `GBP-MAPS-URL` | ⏳ blocked on GBP claim (see below) | none |
| `PRICE-RANGE` | ✅ from company profile deck | drinks Rp 30.000–50.000; beans Rp 150.000–240.000 → `priceRange` "Rp 30.000–240.000" (confirm with Dan) |
| `OG-IMAGE` | ⏳ needs a real 1200×630 photo | `assets/images/og-image.jpg` referenced but file missing |

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

_(none yet)_

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
