# Dashboard refresh (Codédex-inspired type), recoloured characters, and Supabase walkthrough

## Context
The user dislikes much of the student dashboard (`/dashboard`, `/preview` → `src/screens/Hub.tsx`):
- one font everywhere
- tiny text
- a plain course list
- a heavy dark-green frame and header
- dated buttons
- missing info
- an overall "off" feeling

They asked for Codédex-style inspiration, especially **different fonts for different jobs**, without changing everything.

Codédex (checked live) uses:
- a chunky pixel font for the logo and big titles
- a second pixel font for section titles
- a friendly sans (Mulish) for nav, body and buttons
- small, widely spaced caps for labels ("START YOUR", "COURSE")
- course cards with a banner, a caps label, a sans title and a level pill
- buttons with a solid bottom shadow

Our app uses Pixelify Sans for almost everything plus a system Trebuchet fallback, with text as small as 9.6px.

The user also approved:
- importing the recoloured character sheet (`../ChatGPT Image Oct 8, 2026, 07_18_55 PM.png`, same 2×3 layout and 1024×1536 size as the current sheet, dark background)
- a walkthrough to finish Phase 1's real accounts

**Kept unchanged:**
- palette (#7A4E9D #C9B6E4 #1B4332 #40916C #EFE6DD)
- Panthy art
- room and campus art
- the room's clickable spots (the user didn't object to them)
- routes and screen structure

Fonts were already recorded as provisional in design/README.md, so this replaces provisional choices rather than approved ones. Nothing copies Codédex's fonts, art or wording.

## 1. Font roles (applies app-wide through CSS tokens)
- Add `@fontsource/silkscreen` and `@fontsource/nunito`: free (OFL), bundled locally like Pixelify, small. Import them in `src/main.tsx`.
- Tokens in `src/styles/pixel-ui.css` (`:root`):
  - `--font-logo`: Silkscreen 700. Used for the wordmark and page hero titles (`h1`).
  - `--font-display`: Pixelify Sans, kept. Used for section titles (`h2`/`h3`), buttons, room spots and Panthy's name.
  - `--font-label`: Silkscreen 400, uppercase, letter-spacing ~0.12em. Used for `.eyebrow` labels, card labels and pills.
  - `--font-body`: Nunito 400/600/800. Used for nav, body copy, Panthy's speech, form fields and descriptions.
- Minimum sizes: body 15–16px, labels ≥12px, small print ≥13px. This removes the 9.6–11px text (room progress, preview banner, course details, speech).

## 2. Header and buttons
- Header: on the room route (`.room-shell` in `src/styles/pixel-ui.css` / `student-room.css`), drop the dark-green slab and frame. Use the same light cream header as other pages: dark-green text, a thin bottom border, nav in Nunito 700, and a lavender "pill" for the active link. Keep the mid-width wrap rule added last time.
- Profile chip: avatar, name, and a small "Lv 4 · sample" (preview) or nothing (real).
- Buttons (`.button`):
  - 6px corners, 2px dark-green border, a solid **bottom** shadow (`0 4px 0`) in a darker shade made by mixing palette colours
  - hover lifts by 2px, pressed sinks
  - visible focus ring
  - Pixelify text
  - primary is purple; secondary is cream with a dark-green outline
- Room spots get the same treatment.
- Reduced-motion turns off the lift and sink.

## 3. Dashboard layout (`src/screens/Hub.tsx` + `student-room.css`)
- **Room:** sits on the cream page with a 3px dark-green border and 8px corners, with no dark surround. The greeting, spots and Panthy stay, using the new fonts and larger text.
- **New "Your status" row** under the room: three cards in a grid, stacking on mobile. They use only data that already exists; there are no new progression rules.
  1. **Level & XP**:
     - Preview: "Level 4 · 320 XP · sample" with a progress bar labelled "Sample progress".
     - Real account: "No XP yet · your first mission unlocks in a later update".
  2. **Next up**: the first selected course's code and title, plus a "Continue journey" button. If nothing is selected, a "Choose a course" button.
  3. **Goals & home world**: the student's chosen goals as pills (or "Add goals in your profile" linking there), plus "Home world: X · Visit campus".
- **Courses section:** replace the plain list with picture-style cards (see 4), headed "Your courses" in a section-title font, with a "Browse all worlds →" link.

## 4. Shared course card (reuse, used on the dashboard and the Your worlds page)
Upgrade the existing `CourseCard` in `src/screens/Worlds.tsx`, moving it to `src/components/CourseCard.tsx` so Hub and Worlds share it.
- **Banner:** the world's accent colour block with the world's symbol drawn large in pixel style. There's no per-world art yet, and no images are invented.
- `COURSE · QZ-MATH 101` label in `--font-label`.
- Title in Nunito 800, then the description.
- Pills: "Sample course" and the world name.
- "✓ In your courses" moves into the card as a pill.
- Card style matches the new buttons: border, bottom shadow, hover lift, visible focus.

## 5. Recoloured characters
- Copy the source unchanged to `design/source/student-characters-recoloured.png` for provenance.
- Use a one-off scratchpad `sharp` script (as before; no project dependency) to make the dark background transparent:
  - flood-fill from the image edges through dark, low-saturation pixels only, stopping at the black outlines
  - write `public/brand/student-characters-v2.png`
- **Visual check before use.** Compare cut-out previews on cream and on purple. If the outlines or glow are damaged, stop and tell the user rather than ship a messy sprite; the current sheet stays as the fallback.
- If clean, point `.student-art` in `src/styles/identity.css:169` at the v2 sheet. The positions and avatar IDs stay as they are; the labels Flower, Hoodie, Bow, Headphones, Books and Glasses still match.
- Keep the old sheet file.
- Update `design/README.md` (provenance, transparency method) and the Mascot/Avatar test if it asserts the file name.

## 6. Finish Phase 1: Supabase walkthrough (after design work lands)
I can't create accounts or enter keys, so this is a guided hand-off:
1. **You:**
   - create a free project at supabase.com
   - copy the Project URL and the **publishable** key into `.env.local`; I'll create the empty file with the two names, and you paste the values
2. **You:** paste `supabase/migrations/001`→`004` in order into the Supabase SQL editor. I'll give the exact clicks.
3. **You:** set the Auth Site URL and redirect URLs, as already listed in README.md.
4. **You:**
   - sign up, confirm the email and log in
   - refresh, edit your profile and log out
   - I'll watch the app and fix anything that breaks
5. **Me:** update README/ledger to say live verification is done (only after you've confirmed each step).

## Files
- `package.json` (2 font packages)
- `src/main.tsx`
- `src/styles/pixel-ui.css`, `identity.css`, `student-room.css`
- `src/screens/Hub.tsx`, `Worlds.tsx`
- new `src/components/CourseCard.tsx`
- `public/brand/student-characters-v2.png`
- `design/README.md`, `docs/DECISIONS.md`, ledger

## Verification
- `npm run typecheck`, `npm run test`, `npm run build`, `npm run test:e2e`.
- Update the e2e font assertion (h1 becomes Silkscreen; room background check unchanged) and any changed button labels.
- New unit tests:
  - the status row shows "sample" labels in preview and an honest empty state for a real profile
  - the course card shows its code label and world pill
- Browser pane at desktop (1280), 900 and mobile (375):
  - screenshots of the dashboard, worlds, landing and profile
  - no horizontal scroll
  - keyboard Tab order through header → room spots → status → course cards, with visible focus
  - reduced-motion check
- Character cut-out viewed on cream and purple backgrounds before switching.
- Commit on `jolicia` in steps: fonts/tokens → header/buttons → dashboard + cards → characters → docs.
