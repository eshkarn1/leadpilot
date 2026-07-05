# KINETIQ — Motion Studio Website

A motion-first marketing site for a studio that builds motion websites. The site is its own portfolio: every project "thumbnail" is a live canvas animation rendering in real time, not a screenshot.

## Design system

| Token | Value | Role |
|---|---|---|
| Ink | `#04070E` | Ground (near-black, blue bias) |
| Abyss | `#081226` | Deep navy panels |
| Signal | `#4D7CFF` | Single accent |
| Arctic | `#EFF3FA` | Type white |
| Steel | `#8B96AB` | Secondary type |
| Hairline | `#16233F` | Borders |

Type: **Archivo** (variable, 850 weight display) + **JetBrains Mono** (labels/data), with designed system fallbacks.

## Features

- **Scroll-scrubbed hero video** — a pinned 300vh hero where scroll drives the
  playhead of an 8s cinematic camera flight over a 3D wave-mesh "web"
  (`hero-flight.mp4` / `.webm`, rendered from the site's own WebGL scene and
  encoded with a 10-frame GOP for smooth seeking)
- Raw-WebGL 3D wave-mesh field as the live fallback wherever video can't load,
  with a 2D canvas constellation beneath that
- Preloader with tabular counter and curtain lift
- Staggered mask-reveal headline
- Custom dual cursor (dot + lagging ring) on fine pointers only
- Scroll progress hairline, blur-on-scroll nav
- Infinite marquee (pauses on hover)
- Four live generative portfolio scenes (orbits, waveform, grid pulse, kinetic type) — paused offscreen via IntersectionObserver
- Expanding capability rows, count-up metrics, scroll-ignited manifesto text
- Magnetic CTA button, 3D tilt cards
- Full `prefers-reduced-motion` support — the site stays composed, just still
- Zero dependencies, zero build step: one HTML file, vanilla JS

## Run it

```sh
open motion-studio/index.html        # or any static server:
npx serve motion-studio
```
