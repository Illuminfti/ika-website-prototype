# Ika Marketing Site — Design System & Guidelines

## Positioning
- **Primary:** Ika — the control layer for Solana apps and agents
- **Not:** "fastest MPC network" or cryptography lab
- Product-forward, capability-first, research-backed
- Solana-first GTM, AI agents as primary use case

## Key Messages (preserve exactly)
- "The control layer for Solana apps and agents"
- "Solana decides. Ika signs."
- "Give agents rules, not keys."
- "Zero-trust. Usable. Decentralized."
- "Policy decides what can sign."

## Tone
- High-conviction, premium, product-forward
- Technical credibility underneath, not leading
- No empty crypto cliches, no jargon-first framing
- Capability and outcome first, cryptography second

## Visual Thesis
Everything derives from one system: **policy ring + control core + permission chips + route traces + chain endpoints**. Every important visual is a variation of: a central authority object, bounded rules around it, routes leaving it, checks/gates activating, native execution resolving.

## Design Principles
- Dark, premium, navy-dark backgrounds (not pure black)
- Sharp, precise, editorial — architectural surfaces, not bubbly SaaS
- Cinematic pacing with spacious layout and narrative flow
- Panel surface system (gradient + blur + stroke + shadow + 28px radius)
- Section variety — no two sections use identical layouts
- Grain texture overlay (SVG noise filter, ~2.5% opacity)
- 70% visual effort on three signature moments: Hero, AI Agents, Architecture
- Brand color: `#EE2B5B` (coral/crimson)
- Accent palette: cyan `#75f1ff`, violet `#b78cff`, mint `#5dffb7`, danger `#ff7c98`

## Typography
- **Headings:** Inter Tight (700–800) via Google Fonts
- **Body:** Inter (400–500) via Google Fonts
- **Mono:** JetBrains Mono (labels, badges, tags, technical metadata) via Google Fonts
- H1: `clamp(3.5rem, 8vw, 7rem)`, line-height `.92`, letter-spacing `-0.05em`
- H2: `clamp(2rem, 4vw, 3.5rem)`, line-height `.96`, letter-spacing `-0.04em`
- Body: 18–20px desktop, 16–18px mobile
- Labels/chips: mono, 11–12px, uppercase, letter-spacing `.14em`

## Visual Language
- **Policy rings:** Concentric SVG circles with dashed/dotted strokes + one rotating arc (cyan)
- **Route traces:** Curved bezier paths with animated stroke-dasharray, flowing dots via `<animateMotion>`
- **Chain endpoints:** Colored circles (NOT text labels) — identity through color: SOL=violet, BTC=orange, ETH=blue
- **Control core:** Central circle with brand gradient fill, glow filter, surrounding validator dots
- **Permission chips:** HTML overlay pills with dot + mono label, cycling active state (cyan highlight)
- **Glow effects:** SVG `<filter>` with `feGaussianBlur` + `feMerge`
- **Micro-diagrams:** Problem section uses bespoke SVG diagrams (broken bridge, custody bottleneck, unrestricted agent)

## Motion Principles
- Motion explains the product, not decorates
- GSAP 3.12.5 + ScrollTrigger for scroll-driven reveals and pinned sections
- Lenis smooth scroll (lerp: 0.1) connected to GSAP ticker + ScrollTrigger.update
- Three signature moments with distinct choreography:
  1. Hero: layered SVG entrance, mouse parallax, scroll departure, chip cycling
  2. AI Agents: state machine demo (idle → validating → approved → settled)
  3. Architecture: pinned scrollytelling with edge drawing and step activation
- Reduced motion: all animations respect `prefers-reduced-motion`
- No random particles, no constant spinning, no scroll-jacking

## Panel Surface System
```css
.panel {
  background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01)), var(--panel);
  border: 1px solid var(--stroke-1);
  box-shadow: var(--shadow-panel);
  backdrop-filter: blur(16px) saturate(135%);
  border-radius: 28px;
}
```

## Component Patterns
- **Section structure:** `.tag` (mono, brand) → `h2` (Inter Tight) → `.subhead` (Inter) → distinctive content
- **Panels:** gradient + blur surface with 28px radius (NOT generic flat cards)
- **Buttons:** `.btn-p` (primary — coral bg, glow shadow), `.btn-s` (ghost with stroke border)
- **Tags:** mono text, brand color, uppercase, tracked
- **Proof rail:** compact horizontal tokens with brand dots
- **Triptych:** three tall vertical panels (Solana section)
- **Console UI:** terminal-style panel for agent demo
- **Step rail:** numbered steps with progress indicator (architecture)
- **Editorial grid:** asymmetric card sizes, featured + panoramic + small cards

## Page Hierarchy
1. Navbar (72px, transparent → blur on scroll, progress bar)
2. Hero (5/7 grid, atmospheric SVG scene — SIGNATURE MOMENT)
3. Proof rail (compact credibility tokens)
4. Problem (sticky left + 3 right panels with micro-diagrams)
5. Solution (sticky left + 4 numbered steps)
6. Interlude (cinematic breathing moment)
7. Solana triptych (3 tall vertical panels, violet accent)
8. AI Agents demo (console + route map — SIGNATURE MOMENT)
9. ZUD pillars (monumental principles, giant background glyphs)
10. Use cases (asymmetric editorial grid)
11. Architecture scrollytelling (pinned SVG + step rail — SIGNATURE MOMENT)
12. Chains marquee (edge-masked infinite scroll)
13. Research library (featured + dossier cards)
14. Backed by (monochrome logo strip)
15. Final CTA (pulsing glow, strong headline)
16. Footer (4-column grid)

## Color Tokens
- `--bg-0: #050816` — primary background (navy-dark)
- `--bg-1: #0b1020` — alternating sections
- `--bg-2: #11182d` — deeper surface
- `--text-0: rgba(248,250,255,0.96)` — primary text
- `--text-1: rgba(211,220,238,0.74)` — secondary text
- `--text-2: rgba(160,170,200,0.45)` — tertiary text
- `--stroke-1: rgba(255,255,255,0.09)` — default borders
- `--stroke-2: rgba(120,140,190,0.18)` — hover/accent borders
- `--panel: rgba(10,15,30,0.62)` — panel fill
- `--panel-strong: rgba(14,20,38,0.86)` — strong panel fill
- `--brand: #EE2B5B` — primary accent (coral)
- `--cyan: #75f1ff` — active/validating states
- `--violet: #b78cff` — Solana-related elements
- `--mint: #5dffb7` — approved/success states
- `--danger: #ff7c98` — error/problem states

## Technical Architecture
- Single-file HTML with inline CSS + JS for index.html
- GSAP 3.12.5 + ScrollTrigger via CDN (deferred)
- Lenis 1.1.18 via CDN (deferred)
- Fonts: Google Fonts (Inter Tight, Inter, JetBrains Mono)
- No build step, no framework, no package.json
- Assets in ./assets/ (logos, images)
- Deployed on Vercel (git push to main triggers deploy)
- Secondary pages: ai-agents.html, developers.html, use-cases.html, research.html, blog.html
- Shared styles: styles.css + main.js (imported by secondary pages)

## Rules for Future Sessions
- NEVER change the positioning to MPC-first or Sui-first
- NEVER remove the AI agents section or make it secondary
- NEVER add meaningless animation (particles, spinning, etc.)
- NEVER express diagrams as text labels — use shapes, colors, motion
- NEVER build every section as "heading + paragraph + three equal cards"
- NEVER use generic glow fog as substitute for art direction
- ALWAYS preserve the locked headlines listed above
- ALWAYS test on mobile before shipping
- ALWAYS respect prefers-reduced-motion
- ALWAYS use Lenis smooth scroll on index.html
- ALWAYS maintain the visual thesis: policy ring + control core + permission chips + route traces + chain endpoints
- Keep the single-file architecture for index.html (inline CSS/JS)
- Secondary pages use shared styles.css + main.js + page-specific inline styles
- Three signature moments must remain: Hero scene, AI Agent demo, Architecture scrollytelling
- 70% of visual effort goes to the three signature moments
- SVG diagrams must use atmospheric glow filters and the visual thesis vocabulary
- Chain identity through COLOR, not text labels
