---
name: design-to-code
description: Convert design specs, screenshots, or mockups into production-ready frontend components. Use when receiving visual references that need to become working code.
---

# Design to Code

Pipeline for converting visual designs (specs, screenshots, mockups, Figma references) into production-grade frontend components.

## When to Use

- User shares a screenshot or mockup and says "build this"
- User describes a visual design they want implemented
- User provides a Figma link or design spec document
- Translating any visual reference into working code

## Phase 1: Analyze the Design

Before writing code, extract the design system from the reference.

### Visual Inventory
Look at the design and identify:

**Layout:**
- Overall structure (grid columns, flex direction, alignment)
- Spacing between elements (consistent or custom)
- Container width and padding
- Responsive behavior implied by the design

**Typography:**
- Number of distinct text sizes (map to scale)
- Font weights used (regular, medium, semibold, bold)
- Line heights (tight for headings, relaxed for body)
- Text colors (primary, secondary, muted)

**Colors:**
- Background colors (how many distinct ones?)
- Text colors (primary, secondary, accent)
- Border colors
- Interactive state colors (hover, active, focus)
- Semantic colors (success, error, warning)

**Components:**
- Buttons (variants: primary, secondary, ghost, sizes)
- Cards (shadow, border, border-radius)
- Inputs (border style, focus ring, error state)
- Icons (size, style, library)
- Images (aspect ratio, object-fit, border-radius)

**Spacing Pattern:**
- Measure the gaps. Are they consistent? (Usually 4px, 8px, 12px, 16px, 24px, 32px, 48px)
- Padding inside containers
- Margin between sections

### Ask Clarifying Questions
If the design doesn't show:
- Hover states (what changes on hover?)
- Mobile layout (does the sidebar collapse? Do cards stack?)
- Loading state (skeleton? spinner? progressive?)
- Empty state (what shows when there's no data?)
- Error state (inline errors? toast? error page?)
- Dark mode (needed? invert the palette?)
- Animation (anything animate on enter/hover/transition?)

Ask about these before building. Don't assume.

## Phase 2: Map to Tokens

Convert what you see into design tokens.

```typescript
// Extracted from design analysis
const designTokens = {
  colors: {
    // Map every distinct color from the design
    background: { primary: '#fff', secondary: '#f8f9fa', tertiary: '#f1f3f5' },
    text: { primary: '#212529', secondary: '#6c757d', muted: '#adb5bd' },
    border: { default: '#dee2e6', strong: '#adb5bd' },
    interactive: { primary: '#228be6', primaryHover: '#1971c2', primaryActive: '#1864ab' },
    semantic: { success: '#40c057', error: '#fa5252', warning: '#fd7e14' }
  },
  spacing: {
    // Map the gaps you measured
    1: '0.25rem', 2: '0.5rem', 3: '0.75rem', 4: '1rem',
    6: '1.5rem', 8: '2rem', 12: '3rem', 16: '4rem'
  },
  typography: {
    // Map distinct text styles
    display: { size: '2.25rem', weight: 700, lineHeight: 1.2 },
    heading: { size: '1.5rem', weight: 600, lineHeight: 1.3 },
    subheading: { size: '1.125rem', weight: 600, lineHeight: 1.4 },
    body: { size: '1rem', weight: 400, lineHeight: 1.5 },
    caption: { size: '0.875rem', weight: 500, lineHeight: 1.4 },
    small: { size: '0.75rem', weight: 400, lineHeight: 1.5 }
  },
  radius: {
    // Map border-radius values from the design
    sm: '0.25rem', md: '0.5rem', lg: '0.75rem', xl: '1rem', full: '9999px'
  },
  shadow: {
    // Map shadows from the design
    sm: '0 1px 3px rgba(0,0,0,0.08)',
    md: '0 4px 12px rgba(0,0,0,0.08)',
    lg: '0 8px 24px rgba(0,0,0,0.12)'
  }
};
```

## Phase 3: Component Decomposition

Break the design into a component tree.

### Process
1. Draw boxes around every distinct piece of UI
2. Group related boxes into components
3. Identify which components are reusable (appear more than once or will be used elsewhere)
4. Define the props each component needs

### Example Decomposition
```
PageLayout
├── Header
│   ├── Logo
│   ├── Navigation
│   │   └── NavItem (reusable)
│   └── UserMenu
├── Sidebar (if applicable)
│   └── SidebarItem (reusable)
├── MainContent
│   ├── PageHeader
│   │   ├── Title
│   │   ├── Description
│   │   └── ActionButtons
│   ├── FilterBar
│   │   ├── SearchInput
│   │   ├── FilterDropdown (reusable)
│   │   └── SortToggle
│   └── ContentGrid
│       └── ContentCard (reusable)
│           ├── CardImage
│           ├── CardTitle
│           ├── CardMeta
│           └── CardActions
└── Footer
```

### Props Definition
For each reusable component, define the interface:
```typescript
interface ContentCardProps {
  title: string;
  description: string;
  image?: { src: string; alt: string };
  meta?: { author: string; date: string };
  tags?: string[];
  href: string;
  variant?: 'default' | 'featured' | 'compact';
}
```

## Phase 4: Build

Follow the frontend-patterns skill workflow: Layout, Theme, Animation, Implementation.

### Build Order
1. **Layout shell** - page structure with placeholder content
2. **Primitive components** - buttons, inputs, cards, badges
3. **Composite components** - combine primitives into features
4. **Data wiring** - connect to APIs (or mark TODOs)
5. **States** - loading, error, empty for every data-dependent component
6. **Responsive** - test and adjust at every breakpoint
7. **Animation** - add purposeful motion
8. **Polish** - hover states, focus indicators, transitions, edge cases

### Pixel Accuracy
- Match the design within 2-4px tolerance
- Get the spacing right first (spacing errors are the most visible)
- Match font sizes and weights exactly
- Match colors exactly (use an eyedropper if needed)
- Border-radius should match the design's feel (sharp, slightly rounded, very rounded)

## Phase 5: Deliver

### What to Send
1. **Side-by-side comparison** - design reference next to your implementation (screenshot if possible)
2. **Full code** - every file, with file paths noted
3. **Responsive demo** - show it at mobile, tablet, and desktop widths
4. **Interactive states** - document what happens on hover, click, focus
5. **Missing pieces** - clearly list anything not yet implemented and why

### Feedback Loop
After delivery, expect feedback. Common adjustments:
- Spacing tweaks ("add more space between X and Y")
- Color adjustments ("that blue is too bright")
- Animation changes ("make it snappier" or "too fast")
- Layout shifts ("move X above Y on mobile")

Iterate quickly. Each round should be smaller than the last.

## Quality Gate

Before delivering design-to-code work:
- [ ] Colors match the design reference exactly
- [ ] Typography matches (sizes, weights, line heights)
- [ ] Spacing matches (padding, margins, gaps)
- [ ] Responsive: works at 375px, 768px, 1024px, 1440px
- [ ] All states handled: default, hover, active, focus, disabled, loading, error, empty
- [ ] Accessibility: focus visible, labels present, contrast ratio passes
- [ ] `npm run build` passes with zero errors
- [ ] Code delivered in chat with screenshots
