---
name: design-system
description: Create, evolve, and maintain design systems. Tokens, components, patterns, and the living document that keeps an entire product visually consistent.
---

# Design System

Structured protocol for building and maintaining design systems that map directly to implementation. Whether starting from scratch, evolving an existing system, or layering on top of a component library.

## When to Use

- Starting a new project that needs visual consistency
- Extending an existing system with new components or tokens
- Auditing a design system for gaps or inconsistencies
- Migrating from ad-hoc styles to a structured token system
- Onboarding a new developer who needs to understand the visual rules

## Mode Selection

### Mode A: From Scratch
New brand, no existing system. Full research, full definition.

1. **Research the space.** What do competitors look like? What's the visual language of this industry? What tone does the brand need to strike?
2. **Define color tokens.** Primary, secondary, accent, destructive, muted, background, foreground, card, border, ring. Each with hex, HSL, and usage description. Dark mode variants if needed.
3. **Define typography.** Font families (sans, display, mono). Full scale from xs to hero. Each entry: size, line-height, weight, letter-spacing, usage.
4. **Define spacing scale.** Base unit (usually 4px). Full scale: 4/8/12/16/24/32/48/64/80/96/120. Usage rules per value.
5. **Define radius and shadows.** sm/md/lg/xl/full for radius. sm/md/lg for shadows with values.
6. **Define core components.** Button (variants, sizes, states), Card, Input, Badge, Avatar, Navigation. Each with all states: default, hover, focus, active, disabled, loading.
7. **Define page patterns.** Hero layouts, feature sections, CTA blocks, testimonial grids, pricing tables. These are compositions, not components.
8. **Format for implementation.** Output as Tailwind config values, CSS custom properties, or structured document. The developer should be able to copy values directly.

### Mode B: Evolve Existing
Brand has a system. Inherit, refine, extend.

1. **Audit the current system.** What tokens exist? What's missing? Where are there inconsistencies (e.g., 5 different grays used ad-hoc)?
2. **Document what works.** Don't change things that are already consistent and intentional.
3. **Fill gaps.** Missing states, missing responsive tokens, missing component variants.
4. **Refine tokens.** Standardize values that drifted. Map ad-hoc choices to systematic tokens.
5. **Extend.** New components or patterns needed for the current project.
6. **Version the system.** Note what changed and why.

### Mode C: Base + Custom Layer
Starting from shadcn/ui, MUI, Radix, or similar.

1. **Understand the base.** What does the library give you? What are its constraints?
2. **Define the custom layer.** Brand colors, typography, spacing overrides. These sit on top of the base.
3. **Transform until unrecognizable.** The goal: someone using the product can't tell what library it's built on. If they can, the customization isn't deep enough.
4. **Document overrides.** Which base tokens were changed and to what values. This is the developer's map.

## Output Template

```
Design System: [Brand Name]
Version: [X.Y]
Last Updated: [Date]

========================
TOKENS
========================

Colors:
  --primary: #[hex] hsl([h], [s]%, [l]%) - [usage]
  --primary-foreground: #[hex]
  --secondary: #[hex] hsl([h], [s]%, [l]%) - [usage]
  --accent: #[hex] hsl([h], [s]%, [l]%) - [usage]
  --destructive: #[hex] - errors, dangerous actions
  --muted: #[hex] - subdued backgrounds, disabled states
  --background: #[hex]
  --foreground: #[hex]
  --card: #[hex]
  --border: #[hex] or rgba()
  --ring: #[hex] - focus rings

Typography:
  --font-sans: [stack]
  --font-display: [stack] - headlines, hero
  --font-mono: [stack] - code, technical

  Scale:
    xs:      [size]/[lh] [weight] [spacing] - [usage]
    sm:      [size]/[lh] [weight] [spacing] - [usage]
    base:    [size]/[lh] [weight] [spacing] - [usage]
    lg:      [size]/[lh] [weight] [spacing] - [usage]
    xl:      [size]/[lh] [weight] [spacing] - [usage]
    2xl:     [size]/[lh] [weight] [spacing] - [usage]
    hero:    [size]/[lh] [weight] [spacing] - [usage]

Spacing: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 120
Radius: sm(4) / md(8) / lg(12) / xl(16) / full(9999)
Shadows:
  sm: [value] - [usage]
  md: [value] - [usage]
  lg: [value] - [usage]

========================
COMPONENTS
========================

[Component Name]
  Variants: [primary, secondary, ghost, destructive]
  Sizes: [sm, md, lg]
  States: [default, hover, focus, active, disabled, loading]
  Tokens used: [list]

========================
PATTERNS
========================

[Pattern Name] (e.g., Hero Section)
  Structure: [layout description]
  Responsive: [desktop | tablet | mobile]
  Components used: [list]
  Intent: [what this pattern accomplishes]
```

## Quality Gate

Before delivering a design system, verify:
- [ ] Every color token has hex, HSL, and usage description
- [ ] Typography scale covers xs through hero with all properties
- [ ] Every component has all states defined (not just default + hover)
- [ ] Responsive behavior documented for key patterns
- [ ] Dark mode tokens included if applicable
- [ ] Values are copy-paste ready for implementation
- [ ] No orphan colors or sizes used outside the system
