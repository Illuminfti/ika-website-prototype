# Ika Website Motion Blueprint v2

**Document:** Motion Specification & Implementation Guidance  
**Project:** Ika Website Redesign  
**Workspace:** `/tmp/ika-prototype`  
**Generated:** 2026-03-11  
**Author:** Yuki (Designer/UX)

---

## Executive Summary

This document provides a comprehensive motion blueprint for the Ika website, converting QA deltas into explicit implementation guidance. The blueprint covers hero choreography, section transitions, mobile menu interaction safety, mobile compression, and section-specific motion upgrades.

**Current State:**
- Three.js hero blob with mouse-reactive deformation
- GSAP ScrollTrigger for scroll-based reveals
- CSS custom property `--scroll` tracks scroll position (currently underutilized)
- 9 sections: Hero, Metrics, Ika Is, Problem, Solution, Use Cases, Comparison, Chains Marquee, Backed By, Final CTA

---

## 1. Hero Choreography

### Current State
- Three.js morphing coral blob (IcosahedronGeometry with GLSL noise displacement)
- Fresnel rim glow in brand coral (#EE2B5B)
- Mouse-reactive deformation with lerp smoothing (0.05 factor)
- Breathing rotation animation

### Issues Identified
1. **Hero visual meaning is disconnected from programmable cross-chain signing** — The blob is aesthetically pleasing but doesn't communicate Ika's core value proposition
2. **Right 50% of hero viewport is underutilized** — Per prior audit, the hero lacks a strong visual anchor on the right side

### Motion Blueprint

#### 1.1 Visual Meaning Enhancement
**Priority: P0 (Critical)**

Replace the abstract coral blob with a **cross-chain signing visualization**:
- **Concept:** Particles/nodes representing different chains (BTC, ETH, SOL, SUI) flowing toward a central "Ika Core" that pulses with each "signature"
- **Implementation:**
  ```
  - Central icosahedron represents Ika's signing core
  - 4-6 orbiting nodes (chain icons) on elliptical paths
  - Connection lines draw between chain nodes and core on scroll
  - Each connection line pulses when "signing" (periodic animation cycle)
  - Mouse movement affects node orbit speed/direction (subtle)
  ```
- **Technical:**
  - Keep Three.js for 3D but refactor geometry
  - Use instancedMesh for particles (performance)
  - Graceful degradation: CSS gradient fallback if WebGL fails
  - Maintain current `heroBlobInitialized` guard pattern

#### 1.2 Entrance Animation
**Priority: P1**

```
Timeline (total: 2.5s):
├── 0.0s - Nav fades in (opacity 0→1, 0.4s, ease: power2.out)
├── 0.2s - Headline chars reveal (stagger: 0.03s per char)
├── 0.8s - Subheadline fade in (opacity 0→1, 0.5s)
├── 1.0s - CTA buttons slide up (translateY: 20→0, 0.5s)
├── 1.2s - Three.js scene fades in (opacity 0→1, 0.8s)
└── 1.5s - Blob breathing begins (loop, 4s cycle)
```

#### 1.3 Scroll Behavior
- **Parallax:** Hero content moves at 0.5x scroll speed (subtle, not disorienting)
- **Exit:** Hero fades and scales down slightly (scale: 1→0.95, opacity: 1→0) over first 300px of scroll
- **Connection:** The `--scroll` CSS property should drive parallax transforms, not just exist as dead state

---

## 2. Section Transitions

### Current State
- Generic `.reveal` class with translateY on scroll
- Per-word char reveals in headlines
- Timeline rows animate horizontally
- Bento cards stagger in

### Issues Identified
- Parallax (`--scroll`) is not being used meaningfully — it's a dead state
- Section transitions feel mechanical, not choreographed

### Motion Blueprint

#### 2.1 Transition Choreography
**Priority: P1**

Each section should have a distinct **entry behavior** and **exit behavior**:

| Section | Entry | Exit |
|---------|-------|------|
| Hero | Blob breathes, nodes orbit | Scale down, fade |
| Metrics | Numbers count up, cards slide from bottom | Fade, slight scale |
| Ika Is | Cards fan out from center | Collapse back |
| Problem | Red pulse on reveal, glitch effect | Wipe left |
| Solution | Tech diagram animates in parts | Fade |
| Use Cases | Cards stack sequentially | Unstack |
| Comparison | Table rows slide in from alternating sides | Fade |
| Chains Marquee | Continuous scroll, no entry | Continuous scroll |
| Backed By | Logos fade in sequentially | Fade |
| Final CTA | All elements converge to center | Hold |

#### 2.2 Purposeful Parallax
**Priority: P1**

Replace dead `--scroll` state with meaningful parallax:

```javascript
// In ScrollTrigger update or scroll listener:
const scrollY = window.scrollY;
const viewportHeight = window.innerHeight;

// Section-specific parallax
sections.forEach(section => {
  const speed = section.dataset.parallaxSpeed || 0.5;
  const yOffset = scrollY * speed;
  section.style.setProperty('--parallax-y', `${yOffset}px`);
});
```

**Application:**
- **Background layers:** Move at 0.2x-0.3x speed (creates depth)
- **Section content:** Move at 0.5x speed
- **Foreground elements:** Move at 0.8x speed or opposite direction

#### 2.3 Transition Timing
- **Entry duration:** 0.8s - 1.2s (slower = more premium)
- **Exit duration:** 0.4s - 0.6s (faster = cleaner)
- **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` (powerful ease-out)
- **Overlap:** Start next section entry 20% before current section exits

---

## 3. Mobile Menu Interaction Safety

### Current State
- Hamburger menu at mobile breakpoint
- Announcement bar (36px height) at top
- Nav fixed below announcement bar

### Issues Identified
1. **Mobile nav tap-target / announcement bar collision** — The tap targets may overlap with the announcement bar, causing accidental clicks
2. **No touch feedback** — Mobile menu lacks tactile response

### Motion Blueprint

#### 3.1 Collision Fix
**Priority: P0 (Critical)**

```css
/* Ensure minimum spacing from announcement bar */
.announcement-bar {
  position: relative;
  z-index: 101;
}

.nav {
  top: 36px; /* Push below announcement bar */
  /* OR: */
  margin-top: 36px;
}

.mobile-nav-link {
  min-height: 48px; /* WCAG tap target */
  padding: 12px 24px;
  display: block;
}

/* Add safe tap zone indicator in dev mode */
@media (max-width: 768px) {
  .mobile-nav-link::after {
    content: '';
    position: absolute;
    inset: -8px; /* Expand tap area */
    background: transparent;
  }
}
```

#### 3.2 Touch Feedback
**Priority: P1**

```javascript
// Add to mobile menu JS
mobileNavLinks.forEach(link => {
  link.addEventListener('touchstart', function() {
    this.classList.add('touching');
  }, { passive: true });
  
  link.addEventListener('touchend', function() {
    this.classList.remove('touching');
  }, { passive: true });
});
```

```css
.mobile-nav-link.touching,
.mobile-nav-link:active {
  background: rgba(238, 43, 91, 0.1);
  transform: scale(0.98);
}
```

#### 3.3 Menu Animation
- **Open:** Slide from right (translateX: 100% → 0%), 0.3s ease-out
- **Close:** Slide out (translateX: 0% → 100%), 0.25s ease-in
- **Backdrop:** Fade in (opacity: 0 → 0.5), 0.3s
- **List items:** Stagger in (opacity + translateY), 0.05s delay each

---

## 4. Mobile Compression

### Current Issues
1. **Long timeline is too stretched on mobile** — Takes excessive vertical space
2. **Use-case stacks are overwhelming** — 3 cards stack without rhythm
3. **Section pacing is identical to desktop** — Too slow, feels sluggish

### Motion Blueprint

#### 4.1 Timeline Compression
**Priority: P1**

```css
@media (max-width: 768px) {
  .timeline {
    gap: 16px; /* Reduced from 32px */
  }
  
  .timeline-row {
    flex-direction: column;
    gap: 8px;
  }
  
  .timeline-year {
    font-size: 1.5rem; /* Reduced from 2.5rem */
  }
  
  .timeline-content {
    font-size: 0.9rem;
    padding-left: 0; /* Remove indent on mobile */
    border-left: none;
    padding-top: 8px;
    border-top: 2px solid var(--brand);
  }
  
  /* Animate timeline rows more quickly on mobile */
  .timeline-row .text,
  .timeline-row .card {
    transition-duration: 0.4s; /* Reduced from desktop 0.6s */
  }
}
```

#### 4.2 Use Cases Stack Rhythm
**Priority: P1**

```css
@media (max-width: 768px) {
  .use-cases .bento-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  /* Alternate entrance direction for visual interest */
  .bento-card:nth-child(odd) {
    --enter-direction: translateX(-20px);
  }
  
  .bento-card:nth-child(even) {
    --enter-direction: translateX(20px);
  }
}
```

#### 4.3 Mobile Pacing
**Priority: P1**

| Animation | Desktop Duration | Mobile Duration |
|-----------|-----------------|----------------|
| Section reveal | 0.8s | 0.4s |
| Char reveal stagger | 0.03s | 0.015s |
| Card stagger | 0.1s | 0.05s |
| Parallax intensity | 0.5x | 0.3x (less is more) |

```javascript
// In mobile detection
const isMobile = window.innerWidth < 768;

ScrollTrigger.config({ limitCallbacks: isMobile }); // Reduce trigger frequency

// Adjust all durations for mobile
const durations = {
  reveal: isMobile ? 0.4 : 0.8,
  charStagger: isMobile ? 0.015 : 0.03,
  cardStagger: isMobile ? 0.05 : 0.1,
  parallax: isMobile ? 0.3 : 0.5
};
```

---

## 5. Section-Specific Motion Upgrades

### 5.1 Metrics Section
**Current:** Static counters  
**Upgrade:** Animated counters with easing

```javascript
// On ScrollTrigger enter
metrics.forEach(metric => {
  const target = parseInt(metric.dataset.target);
  const duration = isMobile ? 1.5 : 2;
  
  gsap.fromTo(metric, 
    { innerText: 0 },
    { 
      innerText: target, 
      duration, 
      ease: "power2.out",
      snap: { innerText: 1 },
      scrollTrigger: { trigger: metric, start: "top 80%" }
    }
  );
});
```

### 5.2 Problem Section
**Current:** Generic reveal  
**Upgrade:** Glitch/rupture effect

```css
.problem .section-headline {
  animation: glitch 3s infinite;
}

@keyframes glitch {
  0%, 90%, 100% { text-shadow: none; }
  92% { text-shadow: -2px 0 #ff0000, 2px 0 #00ffff; }
  94% { text-shadow: 2px 0 #ff0000, -2px 0 #00ffff; }
  96% { text-shadow: -1px 0 #ff0000, 1px 0 #00ffff; }
}
```

### 5.3 Solution Section
**Current:** Static tech diagram  
**Upgrade:** Animated diagram assembly

```javascript
// Diagram parts animate in sequence
const diagramParts = gsap.utils.toArray('.tech-diagram-part');
gsap.fromTo(diagramParts, 
  { opacity: 0, scale: 0.8 },
  { 
    opacity: 1, 
    scale: 1, 
    stagger: 0.15, 
    duration: 0.5,
    ease: "back.out(1.7)",
    scrollTrigger: { trigger: ".solution", start: "top 60%" }
  }
);
```

### 5.4 Use Cases (Bento)
**Current:** Uniform translateY stagger  
**Upgrade:** Directional variety

```javascript
// Alternate entrance directions
bentoCards.forEach((card, i) => {
  const direction = i % 2 === 0 ? -30 : 30;
  
  gsap.fromTo(card,
    { opacity: 0, x: direction },
    {
      opacity: 1,
      x: 0,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        stagger: 0.1
      }
    }
  );
});
```

### 5.5 Comparison Table
**Current:** Simple row reveal  
**Upgrade:** Row-by-row with feature highlighting

```javascript
comparisonRows.forEach((row, i) => {
  gsap.fromTo(row,
    { opacity: 0, x: i % 2 === 0 ? -20 : 20 },
    {
      opacity: 1,
      x: 0,
      duration: 0.4,
      ease: "power2.out",
      scrollTrigger: {
        trigger: row,
        start: "top 90%",
        onEnter: () => row.classList.add('highlight'),
        onLeave: () => row.classList.remove('highlight')
      }
    }
  );
});
```

### 5.6 Chains Marquee
**Current:** Basic CSS animation  
**Upgrade:** Pause-on-hover, depth perception

```css
.chains-marquee-track {
  animation: marquee 30s linear infinite;
}

.chains-marquee:hover .chains-marquee-track {
  animation-play-state: paused;
}

/* Add depth with scale variation */
.chains-logo {
  transition: transform 0.3s ease;
}

.chains-marquee:hover .chains-logo:nth-child(odd) {
  transform: scale(1.1);
}

.chains-marquee:hover .chains-logo:nth-child(even) {
  transform: scale(0.95);
}
```

---

## 6. Priority Order for Implementation

Based on impact and effort, here is the recommended implementation order:

### Phase 1: Critical Fixes (Start Here)
1. **Mobile nav tap-target fix** — P0, affects usability
2. **Hero visual meaning** — P0, core value proposition
3. **Mobile pacing** — P1, affects perceived performance

### Phase 2: Core Motion
4. **Purposeful parallax** — Convert `--scroll` from dead state
5. **Section transition choreography** — Premium feel
6. **Timeline mobile compression** — High-impact mobile fix

### Phase 3: Polish
7. **Metrics counter animation**
8. **Problem glitch effect**
9. **Solution diagram assembly**
10. **Chains marquee depth**

---

## Proof of Completion

- **Output file:** `/tmp/ika-prototype/MOTION-BLUEPRINT-v2.md`
- **Top implementation deltas:**
  1. Mobile nav collision fix (announcement bar spacing)
  2. Hero visual refactor: cross-chain signing visualization
  3. Mobile pacing: reduce all durations by 50%
  4. Parallax: make `--scroll` drive actual transforms
  5. Timeline mobile compression: vertical layout, reduced spacing
- **Next-step recommendation:** Begin with Phase 1 critical fixes. The mobile nav fix should take <1 hour. Hero visual refactor requires 4-6 hours for a strong implementation.

---

*End of Motion Blueprint v2*
