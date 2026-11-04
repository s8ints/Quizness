Quizzness - COMP1170 school prototype

Open index.html in a browser. Keep styles.css, games.js, tutoring.js, images and the HTML
pages together. This is a front-end demonstration; it needs no account or server.

Pages:
- index.html: introduction, course samples, opportunity and audience
- experience.html: percentage matching, ordering, demo XP and a fixed fictional leaderboard
- tutoring.html: sample tutor requests and tutor application demonstration
- feasibility.html: survey evidence, feasibility and proposed pilot
- business-model.html: revenue, costs and model comparison
- industry.html: competitors, market and launch proposal
- team.html: group members and proposed next step
- sources.html: references, artwork credits and aggregate survey results

Textbook scope: Learning Web Design, Fifth Edition, Chapters 4-22.
- Chapters 4-10: HTML structure, text, links, external images, tables and forms.
- Chapters 11-19: ordinary CSS values, box model, Flexbox, Grid, responsive
  layouts, transitions and form/table styling. Grid uses grid-gap; Flexbox
  spacing uses margins. Newer CSS colour variables and accent-color are removed.
- Chapters 21-22: variables, conditions, functions, events and DOM methods.
  Each JavaScript file has its own changeText function, using createTextNode
  and appendChild. Game styles use className. Animation events, forced layout reads and matchMedia
  are removed; short decorative motion is limited through ordinary CSS.

The homepage illustration is now images/panthy-percent-path.svg, referenced
with an img element (Chapter 7). SVG drawing markup is kept in the artwork
asset, rather than the page source. External artwork remains artwork, not
an exercise in authoring SVG (which is covered later in Chapter 25).

Match percentage runes, then order the bridge stones to finish Percent Path.
Scores, tutor details and GiveBack totals are fictional examples. No bookings,
applications or files are sent, and no progress is saved. GiveBack recognition
would require a formal university agreement.

Survey figures come from the updated group report: 30 anonymous responses,
8-10 October 2026.
No pilot results are claimed.

The separate quizzness-game directory is a separate application and is outside
the supplied static-site file list. Its source and dependencies are unchanged.

JavaScript files: games.js runs the games; tutoring.js runs the simple form review
and demo confirmations. Both work independently, without a shared script file.

The leaderboard is a fixed HTML table. The static site uses games.js and tutoring.js
with no arrays or loops. Responsive CSS is enabled; custom skip links and focus CSS
remain removed. The added signup.html page is retained as a non-submitting preview.

Updated business case: confirmed five-member team, institutional licensing proposal,
bootstrapping and sweat equity, and participant-feedback-led development. No fixed
pilot size, financial forecasts, confirmed partnership or live pilot results are claimed.
