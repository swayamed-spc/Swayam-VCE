# Background engine (`SpaceCanvas.jsx`)

Fixed full-screen layer behind all content (`.space`, z-index -2). Two parts.

## 1. CSS star layers (from the Uiverse snippet)
Three layers of 1px, 2px and 3px dots made with one element each and a long `box-shadow` list, generated in JS
(`shadow()`), about 20% red. Each layer is duplicated 2000px lower and animated with `animStar` (translateY -2000px,
70s, 120s, 180s) so it loops seamlessly. A wrapper also moves with scroll using the CSS variable `--sy`
(scroll position) at different factors (`k`) for parallax.

## 2. Pixelated canvas
Drawn at 1/`S` resolution (`S = 2`) and scaled up with `image-rendering: pixelated`. Draw order each frame:
1. Nebulae: 7 red radial gradients at depth `z`, which grow as you approach.
2. Spiral galaxy: 560 particles on 3 arms that rotate and grow with page progress.
3. Planets: see below.
4. Warp stars: 650 stars with 3D positions projected to the screen, drawn as streaks.
5. Cursor sparks.

## Scroll force (tuning)
`vel` is the smoothed per-frame scroll distance, clamped to +-40.
- `dz = -(.0005 + vel * .001)`: depth change per frame. First number is the idle drift, second is how much scrolling pushes.
- `streak = 2 + |vel| * .45`: streak length.
- Scrolling down flies forward, scrolling up flies backward. To make it stronger or weaker change the two numbers in `dz`.

## Planets
`PLANETS` array. Fields: `t` position on the journey (0 top of page, 1 bottom), `x`/`y` screen position (0..1),
`r` radius in low-res pixels, `pal` palette (`red`, `ash`, `deep`) and `o` options: `ring`, `bands` (stripe frequency), `craters`.
Each planet is pre-rendered once with Bayer dithering. While scrolling, a planet grows and drifts outward as page progress
approaches `t`, then fades once passed. To add a planet add one object. Planets on short pages are mostly small because
progress barely changes.

## Interaction
Mouse or touch shifts the vanishing point (`cx`, `cy`) and nudges planets for parallax, and spawns sparks.

## Reduced motion
With `prefers-reduced-motion`, one frame is drawn and there are no listeners or animation.

## Performance notes
Canvas is 1/4 the pixel count of the screen. If a laptop struggles, reduce star count (650), nebulae (7) or galaxy particles (560),
or raise `S` to 3.
