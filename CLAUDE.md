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
- Dark, premium, high-contrast
- Sharp, precise, editorial — architectural surfaces, not bubbly SaaS
- Cinematic pacing with spacious layout and narrative flow
- Subtle luxury in detail, hierarchy, and motion
- Section variety — no two sections should have identical layouts
- Brand color: `#EE2B5B` (coral/crimson)
- Solana purple `#9945FF` used for alignment sections only

## Typography
- Headings: Inter Tight (700/800 for h1/h2, 600 for h3/h4)
- Body: Inter (400/500)
- Mono: JetBrains Mono (labels, badges, tags, technical metadata)
- Strong hierarchy: clamp-based responsive sizing
- Letter-spacing: tight on headings (-0.03em), wide on mono labels (0.12em)
- Hero headline: clamp(2.8rem, 2rem + 4vw, 5.2rem), line-height 0.95

## Motion Principles
- Motion explains the product, not decorates
- GSAP + ScrollTrigger for scroll-driven reveals and pinned sections
- Staggered reveal animations for text and cards
- Hero entrance sequence with staggered timing
- SVG orbit/pulse for hero policy diagram
- Route-trace animation (animated stroke-dashoffset) for signing flows
- Permission chip reveal animation
- Architecture section: GSAP-pinned scrollytelling with step activation
- Reduced motion: all animations respect prefers-reduced-motion
- No random particles, no constant spinning, no scroll-jacking

## Motion Vocabulary
- `.reveal` — fade-up on scroll enter (IntersectionObserver)
- `.reveal-delay-N` — staggered delays (1-4)
- route-trace — animated dash along SVG paths
- chip-reveal — scale + opacity entrance for permission chips
- orbit-spin — slow continuous rotation for orbit ring
- step-activate — highlight active architecture step
- marquee-scroll — infinite horizontal chain name scroll

## Component Patterns
- **Section structure:** .section-tag (mono, brand) → .section-headline (Inter Tight) → .section-body (Inter) → cards/content
- **Cards:** bg-card background, border-1 border, hover brightens border + subtle lift
- **Buttons:** .btn-primary (coral bg, glow shadow), .btn-secondary (ghost with border)
- **Badges:** .badge (pill, mono text, dot icon, border)
- **Proof strip:** horizontal badge rail below hero
- **Editorial grid:** varied card sizes, featured card spans 2 columns

## Page Hierarchy
1. Navbar (sticky, glass-dark on scroll, progress bar)
2. Hero (positioning + SVG policy diagram)
3. Proof badges (credibility strip)
4. Problem (3 cards — tension chapter)
5. Solution (4 numbered cards)
6. Solana alignment (3 cards with purple tags)
7. AI Agents (flow + guardrail grid — flagship section)
8. ZUD (3 architectural cards, plain language first)
9. Use cases (6-card editorial grid, featured first card)
10. Architecture (scrollytelling with GSAP pin — signature moment)
11. Chains marquee
12. Research (6 cards, featured first)
13. Backed by (logo strip)
14. Final CTA
15. Footer

## Technical Architecture
- Single-file HTML with inline CSS (`<style>`) and JS (`<script>`)
- GSAP 3.12.5 + ScrollTrigger via CDN (deferred)
- Fonts: Google Fonts (Inter, Inter Tight, JetBrains Mono)
- No build step, no framework, no package.json
- Assets in ./assets/ (logos, images)
- Deployed on Vercel (git push to main triggers deploy)
- Secondary pages: ai-agents.html, developers.html, use-cases.html, research.html, blog.html
- Shared styles: styles.css (imported by secondary pages)

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

## Responsive Breakpoints
- 1024px — grid adjustments, architecture diagram simplifies
- 768px — mobile layout, hamburger nav, stacked cards, no GSAP pinning
- 480px — compact padding, smaller type

## Rules for Future Sessions
- NEVER change the positioning to MPC-first or Sui-first
- NEVER remove the AI agents section or make it secondary
- NEVER add meaningless animation (particles, spinning, etc.)
- ALWAYS preserve the locked headlines listed above
- ALWAYS test on mobile before shipping
- ALWAYS respect prefers-reduced-motion
- Keep the single-file architecture for index.html (inline CSS/JS)
- Secondary pages use shared styles.css + page-specific inline styles
