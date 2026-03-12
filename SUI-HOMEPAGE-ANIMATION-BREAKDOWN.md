# Sui homepage animation breakdown

Target: `https://www.sui.io/`
Date: 2026-03-11
Method: live page inspection via browser + source inspection of loaded JS bundles and Slater modules.

## Stack used
- Webflow for layout/content delivery
- Slater.app for page-specific JS module loading
- GSAP 3.14.2 plugins explicitly loaded on page:
  - `ScrollTrigger`
  - `SplitText`
  - `CustomEase`
  - `InertiaPlugin`
  - `Observer`
  - `Draggable`
  - `DrawSVGPlugin`
  - `ScrambleTextPlugin`
  - `MorphSVGPlugin`
  - `Flip`
- `Lenis 1.3.15` for smooth scrolling
- `lottie-web 5.13.0`
- Weglot for translations, with animation-safe text re-splitting after language change

## Key code files
- Slater loader: `https://slater.app/17378.js`
- Home page module: `https://slater.app/17378/50689.js`
- Global/shared animation module: `https://slater.app/17378/50007.js`

## Global motion primitives from shared module (`50007.js`)
These are reused across the site and explain a lot of the "Sui feel":

1. **Character hover lifts**
   - `initTextStagger()`
   - Splits text into chars with `SplitText`
   - On hover, chars animate to `y: -100%`
   - `stagger: 0.01`, `duration: 0.4`, `ease: expo.out`

2. **Arrow/button text reveal**
   - `initArrowReveal()`
   - Text chars slide vertically while reveal layer scales in/out
   - `duration: 0.4`, `ease: expo.out`

3. **Dotted line reveals**
   - `initDotsReveal()`
   - Uses `clipPath: inset(0 100% 0 0) -> inset(0 0% 0 0)`
   - Trigger: `start: top bottom-=20%`
   - Duration: `1s`, ease `power3.out`

4. **Box + text reveal**
   - `initBlockTextReveal()`
   - Small block scales from `0.4 -> 1`
   - Text fades in while an overlay wipes away
   - Trigger when container reaches `bottom bottom-=20%`

5. **Grid item reveal**
   - `initGridsReveal()`
   - Items animate `opacity: 0 -> 1`, `y: 24 -> 0`
   - `duration: 0.6`, `stagger: 0.1`
   - Trigger: `top bottom-=20%`

6. **Parallax reveal system**
   - `initParalaxReveal()`
   - Reads custom attributes like `global-params-start` / `global-params-end`
   - Timeline scrubbed with `scrub: 0.8`
   - Trigger from `top bottom` to configurable end

7. **Scramble text effect**
   - `initMainScrumble()`
   - Uses `ScrambleTextPlugin`
   - Reveal delay scales with char index
   - `duration: 0.41`

8. **Hover fill overlays / nav treatment**
   - `initMainHover()` and `initNavbarReveal()`
   - Overlay blocks grow from partial height to full height on hover
   - Plus icon/path rotations on nav toggles

9. **Footer gradient scroll morph**
   - `_initRevealGradient()`
   - Background gradient changes with `ScrollTrigger`
   - `scrub: true` on desktop, `scrub: 1` on mobile

## Home page section-by-section breakdown (`50689.js`)

### 1) Intro loader + hero entry
**Visible effect**
- Starts with a fake load/progress sequence to 100%
- Hero text fades/settles in behind it
- Background plate slides upward
- Main headline lines reveal from below
- CTA enters just after the lines

**Code**
- Function: `initIntro()`
- `Lenis` is stopped during intro, restarted on completion
- Headline uses `SplitText('[data-split="lines"]', { type: "lines", mask: "lines" })`
- Progress bar animates width from `0em` to `15em` mobile / `25em` desktop
- Counter animates 0 -> 100 over `1.0s`
- Background intro moves `y: -50%` mobile / `-100%` desktop over `2s`
- Headline line reveal:
  - from `y: 100%, opacity: 0`
  - to `y: 0%, opacity: 1`
  - `duration: 0.8`
  - `stagger: 0.1`
- CTA reveal starts at `lastPart+=0.25`

**Takeaway**
- The hero does not just fade in.
- It uses staged authority: loading ritual -> environment shift -> masked line reveal -> CTA delayed slightly behind text.

### 2) Hero reactive blur / cursor-follow light field
**Visible effect**
- Big blue glow and blur field tracks pointer position
- Feels like the hero text is being revealed through moving glass/light
- On first entry it eases into place instead of snapping

**Code**
- Function: `__initHeroBlur()`
- Sets CSS custom properties using `gsap.quickSetter()`:
  - `--mouse-x`
  - `--mouse-y`
  - `--text-x`
  - `--text-y`
- Uses lerp tracking with `TRACK_SMOOTH = 0.2`
- Uses timed easing for enter/snap state with `easeOutCubic`
- `TIMED_DURATION = 1000`
- Desktop and mobile target different `.sharp` text nodes

**Takeaway**
- This is a big reason the hero feels premium.
- It is not a canned particle background.
- It is reactive light/blur tied to text geometry and pointer position.

### 3) Hero scroll handoff into timeline/canvas sequence
**Visible effect**
- Scrolling the hero appears to charge/fill a frame
- At the end of the section the sequence locks, plays through, then hands off into the next content band

**Code**
- Function: `__initScrollTrigger()`
- Main wrapper width animates with scroll progress
- Trigger: `[home-trigger]`
- `start: top top`, `end: bottom bottom`, `scrub: true`
- `onLeave`:
  - stops `Lenis`
  - runs `player.playThrough()`
  - animates wrapper to `y: 0svh` over `1.133s`
  - scroll-jumps to timeline area with `lenis.scrollTo(... offset: 100)`
- `onEnterBack` resets everything and reverses player state

**Takeaway**
- This is not passive scroll decoration.
- It is a controlled handoff between scroll state and a scripted animation state machine.

### 4) Timeline / progress spine section
**Visible effect**
- Central progress line with cards activating left-right as you move down
- Progress clipping stretches dynamically based on position and velocity
- Feels like a guided story rail, not simple stacked cards

**Code**
- Function: `__initTimelineAnimation()`
- Desktop only: `if (window.innerWidth <= 768) return;`
- ScrollTrigger on `tlCurrent`
  - `start: center center`
  - `endTrigger: tlMain`
  - `end: bottom center`
- Cards tied to progress checkpoints:
  - `0.02`, `0.16`, `0.32`, `0.51`, `0.7`, `0.85`
- Uses `lenis.velocity` to modulate stretch/damper feel
- Progress area clipped with dynamic `clipPath`
- Heading and side columns also tween on entry/exit

**Takeaway**
- The section feels expensive because it uses velocity-aware state, not just scroll position.

### 5) "Ownable by design / Verifiable by default / Business ready / ..." benefits block
**Visible effect**
- Icon rows and supporting copy reveal progressively
- Supporting UI atoms, dots, and arrows sequence in with layered timing

**Code**
- Reuses global reveal helpers from `50007.js`
- Local CTA block animation comes from `_initHomeBenefitsCTA()`
- CTA block:
  - starts at `opacity: 0, scale: 0.7`
  - text width animates from `0px -> auto`
  - mask gradient is removed after expansion
  - Trigger: when CTA section hits `bottom bottom`

**Takeaway**
- Instead of animating the whole section uniformly, Sui stages micro-components separately.

### 6) "Innovation, engineered." stack section
**Visible effect**
- Stack cards/logos feel distributed in a compositional field
- TVL counter counts up on arrival
- Parallel columns drift at different rates
- Hovered stack items reveal internal content progressively

**Code**
- `_animateTracksGrid()`
  - Desktop only
  - Alternating items (`item2`, `item4`) animate `yPercent: 40 -> -20`
  - Trigger: `top bottom` to `bottom top`
  - `scrub: true`
- `initTVLCounter()`
  - Trigger: `top 80%`
  - Fetches live TVL from `https://api.llama.fi/v2/chains`
  - Counts from 80% of value to final over `1s`
- Global hover behavior in `50007.js` via `_initStackItemHover()`
  - hover progress bar expands from `10%`
  - child content rises from `y: 20, opacity: 0`

**Takeaway**
- The section feels alive because multiple motion systems overlap: parallax, hover reveal, and live numeric activation.

### 7) "Why builders choose Sui" / "How users benefit"
**Visible effect**
- Text and icon groups reveal in a controlled editorial rhythm
- The section is quieter than the hero and timeline, which creates pacing relief

**Code**
- Mostly driven by shared reveal utilities:
  - `initBlockTextReveal()`
  - `initGridsReveal()`
  - `initDotsReveal()`
- Standard triggers generally begin around `top/bottom -= 20%`

**Takeaway**
- Important pacing lesson: they intentionally lower motion intensity after the big hero/timeline set piece.

### 8) "Discover the Sui Stack" CTA / blue button interactions
**Visible effect**
- Blue CTA feels mechanically precise rather than floaty
- Text area unveils with masking instead of simple opacity

**Code**
- `_initHomeBenefitsCTA()` uses `Flip` state capture for positioning background block
- Expands background and text mask in sequenced steps
- Uses scale + width reveal instead of generic fade/slide

**Takeaway**
- Their buttons are tiny motion systems, not just styled links.

### 9) "Industry transformation powered by Sui" cards
**Visible effect**
- Large industry rows/cards have hover expansion on desktop
- Associated list icons, dots, and arrows reveal sequentially on scroll
- Tab/row interactions suppress and restore neighboring dot separators for a cleaner active state

**Code**
- `_initIndustryHover()`
  - Desktop only
  - Expands `.industryhover` width from `3em -> 100%` in `0.3s`
- `_initIndustryRowReveal()`
  - Trigger: `start: top bottom-=20%`
  - Main icons scale `0.4 -> 1` over `0.6s`
  - Dots animate width `0% -> 100%` over `1s`, ease `power3.out`
  - Grey icons stagger in with `duration: 0.5`, `each: 0.1`
  - Arrow and text reveal just after icons
  - List items animate `opacity: 0 -> 1`, `y: 100% -> 0%`
  - Their small list icons reveal with `clipPath` once each item is ~60% through its tween
- `_initTabsHoverV2()`
  - Arrow reveal uses `clipPath` wipe over `0.35s`
  - Neighboring dotted separators fade out while active

**Takeaway**
- This section is surgical. They animate the connective tissue, not just the card containers.

### 10) Start building / coding / earning / connecting cards
**Visible effect**
- Feels like a calmer conversion zone with interaction polish, not a dead tail section

**Code**
- Reuses shared hover and reveal patterns from `50007.js`
- Likely driven by grid/overlay hover systems and arrow/text reveal helpers

**Takeaway**
- Even lower-stakes sections inherit the same motion grammar, which keeps the site coherent.

### 11) Featured/news/resources area
**Visible effect**
- More restrained than upper page
- Motion budget shifts from spectacle to browsing clarity

**Code**
- Dominated by shared hover/reveal helpers rather than a bespoke home-only timeline

**Takeaway**
- Another pacing lesson: spectacle is concentrated above the fold and mid-page. Lower sections stay readable.

### 12) Footer gradient and footer reveal
**Visible effect**
- Footer gradient morphs with scroll and preserves the blue-to-dark brand atmosphere

**Code**
- `_initRevealGradient()` in `50007.js`
- Gradient background interpolates across scroll with `scrub`

## Mobile differences
- Intro background moves less on mobile: `-50%` instead of `-100%`
- Timeline interaction is disabled on small screens in `__initTimelineAnimation()`
- `_animateTracksGrid()` is disabled on mobile
- `_initIndustryHover()` is disabled on mobile
- Many shared helpers gate on `_isMobile` unless explicitly marked with mobile attributes
- Hero blur logic switches to `.sharp.mobileonly`
- In CSS, blur/mask complexity is reduced under `prefers-reduced-motion` and touch/no-hover cases

## Timing / trigger patterns worth copying
- Trigger baseline used repeatedly: `start: top bottom-=20%`
- Heavy storytelling sections use `scrub: true`
- Micro reveals usually live in the `0.3s` to `1.0s` range
- Text/char hover interactions tend to use `expo.out`
- Dotted line / wipe reveals often use `power3.out`
- Many sections avoid instant entry by using small scale starts like `0.4` or `0.7`

## What actually makes it feel "Sui-quality"
1. Motion is hierarchical, not uniform.
2. Scroll sections hand off between states instead of just fading blocks in.
3. Connectors, dividers, arrows, masks, and micro-elements animate too.
4. Text is often revealed by masks, line splits, or char systems, not raw opacity.
5. Desktop gets the full choreography. Mobile gets a reduced but intentional version.
6. They mix live/reactive systems with deterministic timelines.
7. They pace intensity: hero heavy, mid-page structured, lower page calmer.

## Best translation into the Ika redesign
- Build one major hero system, not three mediocre ones.
- Use masked line reveal for the H1, then delay CTA by ~200-300ms.
- Add a reactive light/blur field or equivalent pointer-linked focal effect.
- For section transitions, animate the connective tissue: dots, lines, arrows, dividers.
- Reserve scrubbed/pinned storytelling for one or two sections max.
- Use quieter reveal grammar for lower sections so the hero keeps its authority.
- On mobile, reduce complexity rather than trying to clone desktop 1:1.
