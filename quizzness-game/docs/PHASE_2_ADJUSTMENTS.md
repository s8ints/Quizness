# Phase 2 design: approved adjustments

Date: 2026-10-09. Status: **approved by the user** unless marked *proposed*. These adjust [PHASE_2_DESIGN.md](PHASE_2_DESIGN.md). Where they conflict, this file wins. Everything in the design that isn't mentioned here stays as the user answered it.

## Guiding rule

**Learning is always free. Money only buys cosmetics.** No currency can buy attempts, hints, explanations, answers or better grades. This matches PROJECT_CONTEXT.md (premium options must not interfere with learning) and GAME_DESIGN.md §37 (currency buys cosmetics, never explanations or essential learning).

## Approved changes

| # | Topic | Approved rule | Replaces in PHASE_2_DESIGN.md |
|---|---|---|---|
| 1 | **Gems** | Earned by learning and plentiful; **can also be bought**. Spent only on everyday cosmetics: basic outfits, colour swaps, simple room items, profile frames, celebration effects, Panthy accessories. Their main job is motivation. | Step 4 answers 2, 5, 6, 7, 16 (gems for attempts/refills/Panthy) |
| 2 | **Paw Tokens** (premium currency) | **Mostly bought**; rarely earned (milestones, course completion). Spent only on special cosmetics: animated outfits, rare room themes, Panthy costumes, seasonal collections. The name matches the existing paw badge art. | New |
| 3 | **Timers** | Activities are **untimed by default**. Optional **Speed challenge** versions give bonus gems. Accessibility settings still apply. | Step 3 answers 10–11 (required timed activities) |
| 4 | **Grades** | No letter grades. Show a **percentage + stars + friendly label** (e.g. "Great run!", "Solid", "Keep practising") and explain how it's calculated. | Step 5 answer 6, "Proposed grading" A–F bands |
| 5 | **Running out of attempts** | Keep 5 attempts per activity. When they run out, all 5 come back after **either** finishing a short related practice set **or** 1 hour, whichever is first. Free practice, lessons and worked examples stay open meanwhile. No gem refills. | Step 4 answers 2, 5, 6, 13 (gem-funded refills) |
| 6 | **Panthy's help** | A **limited number of free uses**; NPC help and worked examples stay free and unlimited. *Proposed limit: 3 Panthy conversations per mission route, resetting on replay. Exact number to confirm after playtesting.* | Step 4 answer 7 (one gem per Panthy conversation) |

## Phase boundaries

- **Phase 2 builds:** earning gems (and Paw Tokens from milestones, if any are reachable), showing balances, the attempt/refill rules above, limited Panthy uses, optional Speed challenges and the new result display.
- **Later, not Phase 2:** buying gems or Paw Tokens, the cosmetic shop, seasonal collections, and any real-money payments. Purchases need a secure server-side ledger first; local saves can be edited.

## Guardrails

- Paying never changes attempts, hints, explanations, answers, grades or progress.
- No loot boxes or random paid rewards.
- No fake urgency or countdown pressure on purchases; seasonal items have clearly announced dates.
- Every spend shows cost, current balance and resulting balance, and asks for confirmation.
- Keep prices affordable for the initial Caribbean student audience.

## Still to decide

- Panthy's free-use limit (proposed above).
- Gem and Paw Token earn rates and prices: playtest values, kept in one config file.
- Which short practice set counts for an attempt refill, per activity.
- Speed challenge time limits and bonus amounts.
