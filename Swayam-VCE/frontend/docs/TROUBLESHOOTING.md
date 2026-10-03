# Troubleshooting

| Symptom | Cause and fix |
|---|---|
| Plain fonts (Impact, Arial Black) | Font files missing from `src/assets/fonts`. Add them and restart `npm run dev`. Stand-ins show if online |
| No galaxy, only black | `body` must stay transparent and `html` black. Check `index.css`. Also check the console for errors |
| Page looks frozen after navigating | Lenis height not refreshed. See `App.jsx` effect on `pathname` |
| Stars too fast or slow | Edit the `dz` and `streak` numbers in `SpaceCanvas.jsx` (see BACKGROUND_ENGINE.md) |
| Laptop fan spins up | Lower star, nebula and galaxy counts or raise `S` |
| Logo looks blurry | Source was 100x100. Supply a larger or SVG logo |
| Registrations vanished | Stored in browser `localStorage` (`sw_user`, `sw_regs`). Clearing site data removes them |
| `npm audit` warnings | Mostly dev tooling. Check with `npm audit --omit=dev`. Avoid `--force` |
