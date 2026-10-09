# Quizzness identity system

Latest visual correction: the user identified the smooth scenery/rounded UI/mixed typography as inconsistent with pixel identity. The interface now bundles Pixelify Sans (400/700) locally for display text and game controls, with readable body text, hard-edged frames and a dark-green room shell. Full labelled navigation is restored in the game-styled header; duplicate room shortcuts are removed. The room backdrop is student-room-pixel-v2.png, a new original ImageGen environment with coarser pixel clusters. The previous room source remains archived unchanged. This supersedes Courier/rounded-control styling notes below, while original mascot/character/palette preservation still applies. Font source/license: https://fontsource.org/fonts/pixelify-sans/about (OFL-1.1).

## Dashboard direction selected by the user

The student hub is a cosy personal student room, inspired by the welcoming sense of entering a social game world. It uses an original generated pixel room scene, the existing player character and unchanged Panthy artwork. Desk → Continue Journey, bookshelf → course list, wardrobe → character/profile, and a small toolbar → courses/character/settings. Semantic links remain usable by keyboard and on mobile. It is a static illustrated home base; walking, room customisation and multiplayer are not implemented. Source scene design/archive/student-room.png (moved out of public/; no longer deployed) was generated with ImageGen on 2026-10-08; no existing brand artwork was replaced. Campus art remains on landing/account screens.

Room shell refinement: the user identified the boxed logo, large separate greeting and two-row navigation as visually inconsistent with the room. The room route uses a compact text wordmark/profile header, welcome/progress inside the scene and existing bottom shortcuts. Other routes retain their navigation. Preview status remains clearly visible. The room should be immediately visible on narrow screens.

The original identity is a Phase 1 requirement. Do not replace, remove, redesign or genericize Panthy, the supplied characters, campus artwork or approved palette. Inspect the original references before changing UI. Product category remains adaptive tertiary learning across subjects.

## Colours

| Token | Exact approved value |
| --- | --- |
| primary | #7A4E9D |
| secondary | #C9B6E4 |
| accent / success | #40916C |
| background / surface | #EFE6DD |
| text / muted text / border | #1B4332 |

Runtime tokens: src/styles/identity.css. Derived soft surfaces mix these colours only. Warning and error semantics use explicit words and icons/layout, not invented yellow/red brand colours: warning uses lavender, error text uses dark green. They are implementation roles, not additional approved palette values.

## Typography, spacing, buttons, cards, borders and shadows

No original font files or complete interface/button reference has been supplied in this real-product workspace. Courier display and Trebuchet body are temporary local fallbacks, not asserted approved typography. Squared controls, dark-green borders and offset shadows support the supplied pixel artwork; they are provisional interface treatments until the established UI reference is provided. Existing form spacing and accessible labels remain. Do not present invented styles as extracted facts.

## Assets, icons, mascot and characters

public/brand/palette-reference.png is the supplied five-swatch image. quizzness-campus.png and student-characters.png are unchanged copies of the two user-supplied images, preserving their source background/transparency. CSS displays individual sheet regions; these are still character concepts, not layered customisation or walk sprites.

panthy-pixel.svg is an unchanged copy of the mascot/tiger-pixel.svg file the user identified in ../Quizness. mascot-original-smooth.svg preserves the other supplied mascot file. No other school-project assets or implementation were imported. Legacy SVG metadata says Rory/tiger; current product naming follows the user: Panthy the Thinking Purple Panther. Preserve the artwork unless the user explicitly authorises a change.

No original logo file is available. The current text wordmark remains provisional. Course symbols are subject indicators, not an approved custom icon library.

## Mascot states and motion

src/components/Mascot.tsx supports default, welcome, thinking, happy, encouraging, celebrating, surprised and help. Each has meaningful guidance. The original pose is reused with restrained CSS movement for some states; these are contextual states, not eight newly drawn expressions. Original matching expression artwork is still required before claiming expression-complete integration. Never manufacture earned rewards just to show a celebration.

Use Panthy for welcome, account guidance, onboarding, hub encouragement, course guidance, empty states and recovery. Student characters represent the student; Panthy remains a separate guide. CSS movement honours device and account reduced-motion preferences. Phaser character movement awaits authored animation frames and Phase 2.

## Supplied guild badge concepts

design/archive/guild-rank-badges.png (moved out of public/ so it is not deployed until used) preserves the additional five-badge sheet supplied on 2026-10-08 unchanged. It shows paw emblems in bronze, silver/green, gold/purple, crystal/teal and ornate purple treatments. These descriptions identify their appearance, not confirmed rank names or ordering rules. Rank names, XP thresholds, eligibility and unlock conditions remain undecided. Do not display one as a student's earned rank until progression rules and saved learning evidence establish that award. These badges are progression artwork, not an approved replacement logo.
