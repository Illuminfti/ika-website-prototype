# Ika Marketing Site — Design System & Guidelines

## Positioning
- **Primary:** Ika — the control layer for Solana apps and agents
- **Not:** "fastest MPC network" or cryptography lab
- Product-forward, capability-first, research-backed

## Key Messages (preserve exactly)
- "The control layer for Solana apps and agents"
- "Solana decides. Ika signs."
- "Give agents rules, not keys."
- "Zero-trust. Usable. Decentralized."

## Tone
- High-conviction, premium, product-forward
- Technical credibility underneath, not leading
- No empty crypto cliches, no jargon-first framing
- Capability and outcome first, cryptography second

## Design Principles
- Dark, premium, high-contrast
- Sharp, precise, editorial
- Cinematic pacing with spacious layout
- Subtle luxury in detail, hierarchy, and motion
- Brand color: `#EE2B5B` (coral/crimson)
- Solana purple `#9945FF` used for alignment sections only

## Typography
- Headings: Clash Display (700 for h1/h2, 600 for h3/h4)
- Body: Satoshi (400/500)
- Mono: JetBrains Mono (labels, badges, tags, code)
- Strong hierarchy: clamp-based responsive sizing
- Letter-spacing: tight on headings (-0.03em), wide on mono labels (0.1-0.15em)

## Motion Principles
- Motion explains the product, not decorates
- GSAP + ScrollTrigger for scroll-driven reveals
- Word-by-word headline reveals on scroll
- Hero entrance sequence with staggered timing
- Orbit/pulse for the hero diagram
- Route-trace animation for signing flows
- Permission chip reveal animation
- Reduced motion: all animations respect prefers-reduced-motion

## Component Patterns
- **Section structure:** section-tag (mono) → section-headline (Clash) → section-body (Satoshi) → cards
- **Cards:** bg-card with card-border, hover raises border opacity, architectural feel
- **Buttons:** btn-primary (coral, spinning conic border), btn-secondary (ghost with border)
- **Badges:** proof-badge (pill, mono text, dot icon)
- **Reveal:** .reveal class + .reveal-delay-N + GSAP ScrollTrigger

## Page Hierarchy
1. Hero (positioning + flow diagram)
2. Proof badges (credibility strip)
3. Problem (3 cards)
4. Solution (4 cards)
5. Solana alignment (3 cards)
6. AI Agents (split: flow + guardrail cards)
7. ZUD (3 cards, plain language first)
8. Use cases (6-card bento grid)
9. Architecture (6-step flow)
10. Research (6 cards)
11. Backed by (logo strip)
12. Final CTA

## Architecture
- Single-file HTML with inline CSS and JS
- GSAP 3.12.5 + ScrollTrigger via CDN
- Fonts: Fontshare (Clash Display, Satoshi) + Google Fonts (JetBrains Mono)
- No build step required
- Assets in ./assets/

## Color Tokens
- `--brand: #EE2B5B` — primary accent
- `--brand-light: #FF6B8A` — hover/light variant
- `--solana-purple: #9945FF` — Solana alignment only
- `--bg-dark: #000000` — primary background
- `--bg-surface: #080810` — alternating sections
- `--bg-card: rgba(255,255,255,0.025)` — card backgrounds
- `--card-border: rgba(255,255,255,0.06)` — default borders
