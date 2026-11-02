# Phase 2 status — reviewer checklist

Last updated: 2026-11-02. **Start here to see what is done.** The plan itself is in [PHASE_2_DESIGN.md](PHASE_2_DESIGN.md), and [PHASE_2_ADJUSTMENTS.md](PHASE_2_ADJUSTMENTS.md) overrides it where they conflict. Evidence for each step is in [IMPLEMENTATION_LEDGER.md](IMPLEMENTATION_LEDGER.md).

## Where the project is

- **Phase 1 (student foundation): complete**, confirmed by the user on a live Supabase project.
- **Phase 2 (worlds, maps, missions, ActivityRenderer): in progress. Stage 2 of 7 works end to end, with final art still needed for its three new places.** The world can be walked from room to topic, but **there is nothing to play or learn in it yet**. Missions and activities have not been started.
- Phases 3–6: not started.

## Phase 2 stages

| Stage | Status | Notes |
|---|---|---|
| 1. Art and movement proof | ✅ Done, with a limit | Walking, collision and controls work. Students have front views only. |
| 2. Connected exploration | 🟡 Working; final art needed | Room → campus → Logic District → QZ-COMP 101 lobby → Variables area all work, with temporary pictures for the last three. See [AREA_ART_BRIEF.md](AREA_ART_BRIEF.md). |
| 3. First mission route | ⬜ Not started | |
| 4. Full activities and routes | ⬜ Not started | Includes the Mathematics demo proving the engine works beyond computing. |
| 5. Attempts, gems and help | ⬜ Not started | Follow the adjustments file, not the original gem-spending answers. |
| 6. Results and persistence | ⬜ Not started | |
| 7. Acceptance pass | ⬜ Not started | |

## Completed checklist

### Phase 1
- [x] Landing page with slogan, signup, login, email confirmation, password recovery, logout (Supabase)
- [x] Owner-only profile data, checked with a second account by the user (manual check; no automated live query)
- [x] Onboarding: major, optional year of study, university dropdown, goals, courses, character
- [x] Seven subject worlds, 14 labelled sample courses, major → home world
- [x] Profile and settings, responsive navigation, font roles, favicon

### Phase 2 so far
- [x] Student sprites: 8-frame walk, 2-frame idle, separate day/night shadow layers, for all six characters
- [x] Reusable walkable-area engine: room and campus are data files sharing one scene and one page component
- [x] Walkable room on the supplied art, with collision fitted to the furniture and depth scaling
- [x] **The game is the Home base**: the walkable room replaced the still picture
- [x] Walkable campus on the paved paths, with clickable landmark labels
- [x] Keyboard (WASD/arrows), touch joystick, interact key/button, pause, and clickable alternatives to walking
- [x] Room ↔ campus travel; fountain/Panthy dialogues; market and plaza honestly marked as coming later

### Stage 2: connected exploration
- [x] Logic District (subject region), QZ-COMP 101 lobby (course world) and Variables area (topic), all walkable
- [x] Campus bridge leads onward, and each place has a way back; returning arrives at the door you left through
- [x] Guide characters to talk to, and honest "not open yet" messages for unbuilt buildings and topics
- [x] Locked-mission previews: objective, exact prerequisite and location, time, difficulty, optional story teaser, learning preview
- [x] Mission path listed under the topic area; Start mission is disabled until Stage 3
- [x] Quick travel from the room to every connected place; old course page leads into the lobby
- [ ] Final art for the three new places, then refit walls and add background life
- [ ] The other six subject regions and other course worlds (the plan's first slice is one connected path)

### Animation
- [x] Campus: drifting clouds, moving water, waterfalls with foam, fountain spray, birds, butterflies, leaves, cloud shadows
- [x] Campus: trees rustling and banners waving, using a sway-map shader (the art is not cut up or changed)
- [x] Campus: three sample students walking set routes, with a walk/idle animation and pauses
- [x] Room: curtains and plants stirring, clouds through the window, sunlight on the floor, floating dust, laptop and lamp glow
- [x] Player: footstep dust, lean into sideways movement, direction changes without restarting the step
- [x] Interface: fade-in on arrival, labels and greeting animate in, nearby label nudges

### Loading, states and performance
- [x] Art converted to WebP: campus 2,730 → 452 KB, room 1,299 → 120 KB, character sheet 1,758 → 108 KB
- [x] Every page except the landing page downloads on first open; Phaser only loads with a walkable page
- [x] Loading state: tiny placeholder fills the space at once, with a real progress bar, so nothing jumps
- [x] Error state with Try again and working links; recovers from a lost graphics context by showing that state
- [x] Paused state; the game stops drawing when scrolled out of view and resumes on return
- [x] Reduced motion: no background effects and their files are not downloaded; walking still works
- [x] Lighter version for data-saver connections and low-memory devices
- [x] Heavy effects switch off automatically if the frame rate stays below 24 FPS for 4 seconds
- [x] No new runtime libraries. Phaser already covers animation, and CSS covers the interface

## Measurements

Production build, Microsoft Edge, throttled network, on the development PC (2026-11-02).

| Connection | Page | Page visible | Playable | Downloaded |
|---|---|---|---|---|
| Fast broadband | Home base | 0.6 s | 1.8 s | 900 KB |
| Fast broadband | Campus | 0.5 s | 1.5 s | 1,443 KB |
| 4G (9 Mbps) | Home base | 0.8 s | 2.1 s | 900 KB |
| 4G (9 Mbps) | Campus | 1.6 s | 3.4 s | 1,443 KB |
| Slow (1.6 Mbps) | Home base | 1.7 s | 6.7 s | 900 KB |
| Slow (1.6 Mbps) | Campus | 1.6 s | 9.1 s | 1,443 KB |
| 4G (9 Mbps) | Landing | settled by 1.5 s | n/a | 663 KB |

Before this work, an estimate from file sizes (not measured the same way): about 3.5 MB for Home base and 5 MB for campus.

Motion was checked by comparing screenshots 1.5 s apart: 18–33% of pixels changed in trees, banners, curtains and plants, 0% on a path and the wardrobe.

## Verification

```bash
npm run test
```
```bash
npm run build
```
```bash
npm run test:e2e
```

Latest result: see the newest entry in [IMPLEMENTATION_LEDGER.md](IMPLEMENTATION_LEDGER.md). Browser tests cover the full connected journey, the campus journey, loading progress, reduced motion, the low-memory version and stopping when scrolled away.

Browser tests occasionally failed on timeouts when 8 ran in parallel while the school site was being edited in the same repo. They render in software, so the config now uses 3 workers, a 60 s test limit and a 15 s assertion limit. The last three full runs passed 13/13. One early failure (student stayed idle after a key press) was never reproduced with diagnostics attached, so its cause is **probable, not proven**: a wait that was too short on a busy machine.

## Not verified

- **Real phones and low-end devices.** Everything above ran on a desktop; frame rate on phones is unmeasured.
- **Automatic quality drop.** The code exists, but no test has triggered it on a really slow device.
- **Real student play-testing.** Whether it is fun, and whether the visuals work, needs the user's review.
- **Live-project security.** Row access was confirmed by a manual two-account check only.

## Known limitations

- Students only face the camera, so walking sideways or away still shows their front. Fixing this needs side and back drawings.
- The player draws over scenery she should pass behind, such as the panther statue and some tree edges.
- Furniture and buildings do not move; only masked areas are animated.
- The three new places have temporary pictures and no background animation yet. Their walls fit those pictures and must be refit for final art.
- Mission names and text are demo content, not checked against a real course.
- There is no day/night cycle. The night shadow exists but nothing uses it; how day or night is decided is undecided.
- The main code chunk is still 144 KB compressed, mostly the Supabase client, and loads on every page.
- `node_modules`, `dist`, `test-results` and `.env.local` were tracked in Git as of the last check. `.env.local` holds a publishable key only, but they should be untracked.

## Decisions for the user

1. **Sample students on campus.** Planning said no background crowds. Three walkers were added after the user asked for campus sprites. They are decorative, not real players; delete the `npcs` list in `src/game/campus.ts` to remove them.
2. Side and back character art: who draws it, or keep the stopgap.
3. COMP-101's real programming language (planning says not to assume Python).
4. Panthy's free-use limit, gem prices and earn rates, Speed challenge times.
5. How day and night are decided.
6. Landmark and new world names are placeholders.

## Next

Generate the three pictures in [AREA_ART_BRIEF.md](AREA_ART_BRIEF.md) to finish Stage 2's look. Stage 3 can start at the same time, and adds the first thing students can actually learn from.
