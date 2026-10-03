// Auto-registers any font files in src/assets/fonts, matched by name (file names can be anything).
const files = import.meta.glob('/src/assets/fonts/*.{otf,ttf,woff,woff2,OTF,TTF,WOFF,WOFF2}', { query: '?url', import: 'default', eager: true })
const map = { milker: 'Milker', graen: 'GraenMetal', pillar: 'Pillar', rush: 'RushDriverItalic', dystopian: 'DystopianCanticle', eroded: 'ErodedPersonalUse', dream: 'DreamKudos' }
let css = ''
for (const [path, url] of Object.entries(files)) {
  const n = path.split('/').pop().toLowerCase().replace(/[^a-z]/g, '')
  const k = Object.keys(map).find((k) => n.includes(k))
  if (k) css += `@font-face{font-family:'${map[k]}';src:url('${url}');font-display:swap}`
  else console.warn('Font file not recognised:', path)
}
const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s)
if (!Object.keys(files).length) console.warn('No font files found in src/assets/fonts - add your 7 font files there and restart npm run dev.')
