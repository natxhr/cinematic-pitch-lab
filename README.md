# Cinematic Pitch Lab

A minimal, scroll-driven product presentation prototype — React + Vite + GSAP ScrollTrigger + Lenis.
Technical experiment, not a production site.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Structure

| Path | Purpose |
| --- | --- |
| `src/content.js` | **All copy, image paths and the scene list.** Edit this to re-skin the pitch. |
| `src/assets/product-placeholder.svg` | Placeholder product image — replace with a render (PNG/WebP/SVG). |
| `src/scenes/` | One component per scene: `Opening`, `ProductReveal`, `Details`. |
| `src/hooks/useSmoothScroll.js` | Lenis inertia scroll, synced to ScrollTrigger via the GSAP ticker. |
| `src/hooks/useSceneNav.js` | Keyboard scene navigation + active-scene tracking. |
| `src/styles.css` | Layout, typography, reduced-motion fallbacks. |

## Keyboard (live pitching)

| Key | Action |
| --- | --- |
| `↓` `→` `PageDown` `Space` | Next scene |
| `↑` `←` `PageUp` `Shift+Space` | Previous scene |
| `1`–`3` | Jump to scene |
| `Home` / `End` | First / last scene |

## Reduced motion

With `prefers-reduced-motion: reduce`, Lenis is skipped, nothing is pinned or scrubbed,
captions are laid out statically, and keyboard navigation jumps instantly.
