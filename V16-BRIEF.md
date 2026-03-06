# V16 REDESIGN BRIEF — Ika Website Prototype

## Current State
- Single-file HTML at `index.html` (~68KB)
- Current rating: 6/10 (from Erina audit in AUDIT-v15.6.md)
- Deployed to: ika-prototype.vercel.app

## CRITICAL ISSUES TO FIX (in priority order)

### 1. HERO IS A DEAD ZONE (Highest Priority)
The right 50% of the hero viewport is completely empty — just a barely-visible gradient blob.
**FIX:** Add a WebGL/Canvas visualization on the right side of the hero. Ideas:
- An animated network graph with chain nodes (BTC, ETH, SOL, SUI) connected to a central IKA node
- Particles flowing along connection lines
- Or an abstract particle field that responds to mouse movement
- Think: something that feels ALIVE and premium, like the visual anchor on sui.io or solana.com
- Must be performant (requestAnimationFrame, not setTimeout)
- Must gracefully degrade (hide canvas if WebGL not supported)
- The hero should be a TWO-COLUMN layout: text left, visualization right

### 2. NAV LINKS INVISIBLE
The nav links exist in HTML but are NOT VISIBLE on screen. The logo appears centered.
**FIX:** Debug why `.nav-links` aren't rendering. Could be:
- z-index issue (nav is fixed, z-index 100, but links might be behind the hero)
- Color issue (white on transparent gradient)
- The `!important` overrides might conflict
Make nav links clearly visible: white text, 0.75 opacity, with underline-on-hover effect.

### 3. MORE VISUAL IMAGERY IN SECTIONS
Every section is just text + headings. No visual anchors.
**FIX:** Add SVG illustrations/abstract shapes:
- Bento cards: Add an abstract SVG icon above each card title (use inline SVG, geometric/abstract style)
- Solution section: The tech diagram is good but small — make it more prominent
- Problem section: Add a visual element (broken chain links, red warning elements)
- Use CSS gradients, blur effects, and subtle background shapes to add depth

### 4. SCROLL ANIMATION SOPHISTICATION
The char-reveal exists but is too uniform.
**FIX:**
- Variable delay on char-reveal (faster start, slight deceleration)
- Add parallax effect on hero content (moves slower than scroll)
- Bento cards: stagger from different directions (not all translateY)
- Add subtle scale transforms on scroll for section headlines
- Consider a smooth scroll progress indicator

### 5. BUTTON DEPTH AT REST
Spinning border exists but buttons look flat when not hovered.
**FIX:**
- Primary button: Add visible glow/shadow at rest (not just on hover)
- Secondary button: Make it more visible — slightly thicker border, subtle glow
- Both: Add a subtle pulse animation at rest to draw attention

### 6. MARQUEE ENHANCEMENT
Currently basic.
**FIX:**
- Fade masks on edges already exist in CSS — verify they're working
- Add pause-on-hover (slow down significantly, don't stop abruptly)
- Add subtle scale/opacity variation to create depth perception
- Speed should be smooth and measured

## DESIGN TOKENS (don't change these)
- Brand: #EE2B5B
- Brand light: #FF6B8A
- Font heading: "Clash Display"
- Font body: "Satoshi"
- Font mono: "JetBrains Mono"
- Background: #000000

## TECHNICAL CONSTRAINTS
- Single HTML file (no external JS/CSS files)
- CDN libraries allowed (Three.js, GSAP, etc.) but keep dependencies minimal
- Canvas/WebGL for hero only — rest should be CSS animations
- Must work at 1280px and 1440px viewports
- Mobile responsive (768px, 480px breakpoints)
- prefers-reduced-motion support required

## COPY (don't change the messaging)
- This is a SOLANA launch (not Sui)
- Headline: "Every chain is yours."
- Focus on programmable signatures, cross-chain signing
- Keep all existing section content

## REFERENCE SITES
- sui.io — immersive hero, letter-by-letter scroll reveals, multi-layer depth
- walrus.xyz — spinning border buttons, clean sections
- solana.com — left-aligned hero text, premium feel
- layerzero.network — dark theme, network visualization

## WHAT SUCCESS LOOKS LIKE
The site should feel IMMERSIVE, not like a styled document. Every section should have visual weight. The hero should make you pause. The scroll should feel crafted. Target: 8/10 rating.

## FILES
- index.html — the only file to edit
- assets/ — logo.svg and backer logos (don't modify)
- AUDIT-v15.6.md — latest audit for reference

## AFTER EDITING
1. Commit as "v16: [description]"
2. Do NOT run vercel deploy
