# Area art brief — prompts for the three new places

These three places currently use clearly marked temporary pictures. Generate final art in ChatGPT, then follow the steps at the end.

**Attach both reference images to every prompt** so the style matches:
- `public/brand/quizzness-campus.png`
- `public/brand/student-room-pixel-v2.png`

Generate each image in **landscape, 3:2**. Don't worry if the first try isn't perfect: the most important things are the open floor and no people or text.

## Rules shared by all three

Paste this at the start of each prompt:

> Using the attached images as the exact style reference, create an original pixel-art game background that looks like it belongs in the same game: same crisp chunky pixels, same warm lighting and same angled top-down view. Use purple roofs and accents (#7A4E9D, #C9B6E4), deep and mid greens (#1B4332, #40916C) and cream stone (#EFE6DD). Landscape 3:2. The picture must be empty of people, characters, animals, text, letters, numbers, logos, signs with writing, and interface elements. Characters will be added by the game, so the lower half must be open, flat, uncluttered ground to walk on, with nothing standing in it.

## 1. Logic District

Save as `logic-district.png`.

> A small university town square for computer science students, in the same fantasy university world. Across the upper half, two separate stone-and-purple-roof buildings face the viewer: one on the left, one on the right, each with one clear central doorway at ground level. Small hints of technology fit the medieval style: glowing circuit-like patterns in stained glass, brass gears, small lanterns with teal light. A gap between the two buildings shows distant trees. The lower half is a wide, open, flat cobblestone plaza with nothing on it, with a small path leaving at the bottom centre.

## 2. QZ-COMP 101 lobby

Save as `comp-101-lobby.png`.

> The inside of a cosy university entrance hall, seen at the same angled view as the attached bedroom. Across the back wall, three evenly spaced wooden doors in stone arches: left, centre and right, with purple banners and warm lanterns between them, and no writing anywhere. Tall bookshelves or arched windows can fill the wall above and beside the doors. The lower half is a wide, open, flat wooden floor with a large purple rug and nothing standing on it. An open doorway or doormat sits at the bottom centre.

## 3. Variables and values

Save as `variables-topic.png`.

> A cosy study courtyard inside a university. Across the upper half, two large blank wooden mission boards stand against a stone wall with purple awnings: one on the left, one on the right, with empty pinned paper shapes and no writing. Between them, shelves hold rows of small labelled-looking boxes and crates with blank labels, hinting at values stored in boxes. Climbing plants and warm lanterns decorate the wall. The lower half is a wide, open, flat stone-and-grass courtyard floor with nothing standing on it, with an opening at the bottom centre.

## When you have the images

1. Save the PNGs in `quizzness-game/design/source/areas/`, using the exact file names above.
2. Tell Claude. The steps below finish the job:
   - Run `node scripts/optimize-art.cjs` to make the fast versions (needs `npm install --no-save sharp` first).
   - Refit the walls, doors, pins and arrival spots in `src/game/worldAreas.ts` to the real picture.
   - Set `temporaryArt` off and remove the temporary label.
   - Add background life with masks, as the campus and room have.
