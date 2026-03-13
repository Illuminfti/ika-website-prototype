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

## Design Principles
- Dark, premium, high-contrast — flagship not template
- Sharp, precise, editorial — architectural surfaces, not bubbly SaaS
- Cinematic pacing with spacious layout and narrative flow
- Subtle luxury in detail, hierarchy, and motion
- Section variety — no two sections should have identical layouts or motion
- Grain texture overlay for depth (inline SVG noise filter, opacity 0.03)
- Brand color: `#EE2B5B` (coral/crimson)
- Solana purple `#9945FF` used for alignment sections only

## Typography
- **Headings:** Clash Display (variable, 600–700) via Fontshare CDN
- **Body:** Satoshi (variable, 400–500) via Fontshare CDN
- **Mono:** JetBrains Mono (labels, badges, tags, technical metadata) via Google Fonts
- Strong hierarchy: clamp-based responsive sizing
- Letter-spacing: tight on headings (-0.03em), wide on mono labels (0.12em)
- Hero headline: `clamp(2.8rem, 2rem + 4vw, 5.2rem)`, line-height 0.95
- Font loading: `<link>` tags in `<head>`, `font-display: swap`
- **CDN URLs:**
  - `https://api.fontshare.com/v2/css?f[]=clash-display@variable&display=swap`
  - `https://api.fontshare.com/v2/css?f[]=satoshi@variable&display=swap`
  - `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap`

## Visual Language
- **Policy rings:** Concentric SVG circles with dashed strokes representing security layers
- **Route traces:** Curved bezier paths with animated stroke-dashoffset for signing flows
- **Flow indicators:** Small circles with SVG `<animateMotion>` along flow paths
- **Chain badges:** Rounded rect groups with chain abbreviations (BTC, ETH, SOL) at path endpoints
- **Glow effects:** SVG `<filter>` with `feGaussianBlur` + `feMerge` for atmospheric depth
- **Permission chips:** Pill-shaped indicators for policy capabilities (scoped, revocable, etc.)

## Motion Principles
- Motion explains the product, not decorates
- GSAP 3.12.5 + ScrollTrigger for scroll-driven reveals and pinned sections
- Lenis smooth scroll (lerp: 0.1) connected to GSAP ticker + ScrollTrigger.update
- Three signature moments: Hero entrance, AI Agents step reveal, Architecture scrollytelling
- Staggered reveal animations with distinct choreography per element type
- Hero: word-by-word reveal, mouse-tracking parallax on SVG layers, scroll-linked departure
- Architecture: GSAP-pinned scrollytelling with edge drawing (strokeDashoffset), node activation
- Reduced motion: all animations respect `prefers-reduced-motion` — Lenis destroyed, GSAP skipped, content shown immediately
- No random particles, no constant spinning, no scroll-jacking

## Motion Vocabulary
- `.reveal` — fade-up on scroll enter via GSAP ScrollTrigger (y: 28, opacity: 0 → visible)
- `.rd-N` — stagger delay class (N * 0.1s delay)
- `.char-reveal` — word-level split animation with stagger 0.04s
- Route-trace — animated dash along SVG curved paths
- Chip-reveal — scale + opacity entrance for permission chips
- Step-activate — progressive step highlight in AI agents and architecture sections
- Marquee-scroll — infinite horizontal chain name scroll with edge gradient masks
- Mouse parallax — hero SVG layers shift based on cursor position (desktop only)
- Edge drawing — strokeDasharray/strokeDashoffset animation on architecture diagram edges
- ZUD letters — scale entrance from `scale(3)` with expo.out easing

## Component Patterns
- **Section structure:** `.tag` (mono, brand, uppercase) → `h2` (Clash Display) → `p` (Satoshi) → cards/content
- **Cards:** `rgba(255,255,255,0.02)` background, 1px border at `rgba(255,255,255,0.06)`, hover brightens border + subtle translateY(-2px)
- **Buttons:** `.btn-p` (primary — coral bg, rotating conic-gradient border via `@property --angle`, glow shadow), `.btn-s` (ghost with border)
- **Button hover:** rotating border animation using `conic-gradient(from var(--angle), ...)` with CSS `@property` for smooth animation
- **Badges/Tags:** `.tag` (pill, mono text, brand border, uppercase letter-spacing 0.12em)
- **Proof strip:** horizontal stat badges below hero with value + label pairs
- **Editorial grid:** varied card sizes, featured card spans full width or 2 columns

## Page Hierarchy
1. Navbar (sticky, glass-dark on scroll via backdrop-filter)
2. Hero (positioning headline + atmospheric SVG nexus diagram with glow/parallax)
3. Proof badges (credibility strip with stats)
4. Problem (3 cards — tension chapter)
5. Solution (4 numbered cards with counter animation)
6. Interlude (scroll-scrubbed cinematic breathing moment)
7. Solana alignment (3 cards with purple tags)
8. AI Agents (progressive step flow + guardrail grid — flagship section)
9. ZUD (3 architectural cards with dramatic letter entrance)
10. Use cases (6-card editorial grid, featured first card)
11. Architecture (scrollytelling with GSAP pin, edge drawing, step rail — signature moment)
12. Chains marquee (infinite scroll with edge gradient masks)
13. Research (cards with type labels)
14. Backed by (staggered logo strip)
15. Final CTA (pulsing glow, strong word-reveal)
16. Footer

## Technical Architecture
- Single-file HTML with inline CSS (`<style>`) and JS (`<script>`) for index.html
- GSAP 3.12.5 + ScrollTrigger via CDN (deferred)
- Lenis smooth scroll via CDN (deferred): `https://unpkg.com/lenis@1.1.18/dist/lenis.min.js`
- Fonts: Fontshare (Clash Display, Satoshi) + Google Fonts (JetBrains Mono)
- No build step, no framework, no package.json
- Assets in ./assets/ (logos, images)
- Deployed on Vercel (git push to main triggers deploy)
- Secondary pages: ai-agents.html, developers.html, use-cases.html, research.html, blog.html
- Shared styles: styles.css + main.js (imported by secondary pages)

## Color Tokens
- `--brand: #EE2B5B` — primary accent (coral)
- `--brand-light: #FF6B8A` — hover/light variant
- `--brand-dim: #C41E49` — darker accent
- `--brand-glow: rgba(238,43,91,0.25)` — glow effects
- `--solana: #9945FF` — Solana alignment sections only
- `--bg-0: #000000` — primary background
- `--bg-1: #050509` — alternating section background
- `--bg-2: #0A0A14` — deeper surface
- `--bg-card: rgba(255,255,255,0.02)` — card backgrounds
- `--text-1: #F5F5F7` — primary text
- `--text-2: rgba(255,255,255,0.55)` — secondary text
- `--text-3: rgba(255,255,255,0.25)` — tertiary/decorative text
- `--border-1: rgba(255,255,255,0.06)` — default borders
- `--border-2: rgba(255,255,255,0.1)` — hover borders

## Spacing Tokens
- `--space-section: clamp(100px, 12vw, 160px)` — between sections
- `--space-lg: clamp(48px, 6vw, 80px)` — large internal spacing
- `--space-md: 32px` — medium spacing
- `--space-sm: 16px` — small spacing
- `--space-xs: 8px` — extra small

## Radius Tokens
- `--r-sm: 8px` — small elements
- `--r-md: 12px` — cards
- `--r-lg: 16px` — large cards/containers
- `--r-pill: 100px` — tags, badges, buttons

## Responsive Breakpoints
- 1024px — grid adjustments, architecture diagram simplifies
- 768px — mobile layout, hamburger nav, stacked cards, no GSAP pinning, Lenis still active
- 480px — compact padding, smaller type

## Rules for Future Sessions
- NEVER change the positioning to MPC-first or Sui-first
- NEVER remove the AI agents section or make it secondary
- NEVER add meaningless animation (particles, spinning, etc.)
- NEVER revert to Inter/Inter Tight — Clash Display + Satoshi is the canonical type system
- ALWAYS preserve the locked headlines listed above
- ALWAYS test on mobile before shipping
- ALWAYS respect prefers-reduced-motion
- ALWAYS use Lenis smooth scroll on index.html
- Keep the single-file architecture for index.html (inline CSS/JS)
- Secondary pages use shared styles.css + main.js + page-specific inline styles
- Three signature moments must remain: Hero, AI Agents, Architecture scrollytelling
- SVG diagrams must use atmospheric glow filters, not flat shapes
- Buttons must use the rotating conic-gradient border system
