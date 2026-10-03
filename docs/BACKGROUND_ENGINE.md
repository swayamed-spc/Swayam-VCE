# Background engine (`SpaceCanvas.jsx`)

A fixed full-screen layer behind all content (`.space`, z-index -2). It has two parts and is intentionally subtle.

## 1. CSS star layers
Three layers of 1px, 2px and 3px dots, each one element with a long `box-shadow` list generated in JS (`shadow()`), about 20% red.
Each layer is duplicated 2000px lower and animated with `animStar` (translateY -2000px; 70s, 120s, 180s) so it loops seamlessly.
A wrapper also moves with scroll via the CSS variable `--sy` (scroll position) at different factors `k` for parallax.

## 2. Pixelated canvas
Drawn at 1/`S` resolution (`S = 2`) and scaled up with `image-rendering: pixelated`. Draw order every frame:
1. **Hexagonal tessellation** (`tess()`): flat-top hexagons, radius 20 low-res px. Outline alpha is about 0.03 plus a slow radial wave
   (`sin(distance * .045 - t * .025)`, up to +0.045) plus a glow around the cursor (up to +0.16). The grid shifts slightly with scroll.
2. **Fractals** (`fractal()` and `tri()`): two Sierpinski triangles drawn by recursion (depth 4 and depth 3), one red at 10% opacity on the right
   and one white at 5% on the left. They rotate slowly in opposite directions and speed up with page progress.
3. **Warp stars**: 560 stars with 3D positions projected to the screen and drawn as streaks.
4. **Cursor sparks**: short-lived red pixels left by mouse or touch movement.

## Scroll force
`vel` is the smoothed per-frame scroll distance, clamped to +-40.
- `dz = -(.0005 + vel * .001)`: depth change per frame (first number idle drift, second the effect of scrolling).
- `streak = 2 + |vel| * .45`: streak length.
Scrolling down flies forward, scrolling up flies backward.

## Tuning the patterns
| Want | Change |
|---|---|
| Patterns fainter or stronger | The alpha numbers: `.03`, `.045`, `.16` in `tess()`, and `.10`, `.05` in the two `fractal()` calls |
| Bigger or smaller hexagons | `R` in `tess()` |
| More detailed fractal | Last argument (depth) of `fractal()`. Each level triples the work, 5 is the practical limit |
| Another pattern | Add a function (for example a Koch curve or Penrose tiling) and call it in `draw()` before the stars |
| Stars | Count (560), `dz`, `streak` |

## Other behaviour
The mouse shifts the vanishing point and lights the nearby hexagons. With `prefers-reduced-motion` one frame is drawn and nothing animates.
If a laptop struggles, raise `S` to 3 or lower the star count.
