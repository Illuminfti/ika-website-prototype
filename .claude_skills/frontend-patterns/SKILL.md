---
name: frontend-patterns
description: Component conventions, responsive patterns, state management, and design system workflow for frontend development. Use for ALL UI work.
---

# Frontend Patterns

Mandatory workflow for all frontend development. Enforces design system discipline, responsive-first building, and production-grade component architecture.

## When to Use

Every time you build UI. No exceptions. The four phases run in order. Skipping a phase produces work that needs to be redone.

## Phase 1: Layout

Before writing any component code, establish the spatial structure.

### Wireframe First
Sketch the layout in text or ASCII before touching code:
```
┌─────────────────────────────────┐
│ Header (sticky)                 │
├────────┬────────────────────────┤
│ Sidebar│ Main Content           │
│ (nav)  │ ┌──────┐ ┌──────┐    │
│        │ │ Card │ │ Card │    │
│        │ └──────┘ └──────┘    │
├────────┴────────────────────────┤
│ Footer                          │
└─────────────────────────────────┘
```

### Layout Decisions
Answer before building:
- **Grid or flex?** Grid for 2D layouts (page structure, card grids). Flex for 1D (navbars, card internals)
- **Container width?** Max-width with auto margins, or full-bleed sections with contained content
- **Breakpoint behavior?** What collapses, what reflows, what hides at each breakpoint
- **Sidebar behavior?** Persistent, collapsible, overlay on mobile, or hidden

### Mobile-First Breakpoints
Build for the smallest screen first. Add complexity as viewport grows:
```css
/* Base: mobile (no media query needed) */
.grid { display: grid; grid-template-columns: 1fr; gap: 1rem; }

/* sm: 640px+ */
@media (min-width: 640px) { .grid { grid-template-columns: repeat(2, 1fr); } }

/* lg: 1024px+ */
@media (min-width: 1024px) { .grid { grid-template-columns: repeat(3, 1fr); } }
```

### Container Queries
Use for component-level responsiveness when the component might live in different contexts:
```css
.card-container { container-type: inline-size; }
@container (min-width: 400px) { .card { flex-direction: row; } }
```

## Phase 2: Theme

After layout is decided, establish the visual foundation.

### Design Tokens
Define before any component styling:

```typescript
// tokens.ts
export const tokens = {
  colors: {
    primary: { 50: '#eff6ff', 500: '#3b82f6', 900: '#1e3a5f' },
    neutral: { 50: '#fafafa', 100: '#f5f5f5', 200: '#e5e5e5', 500: '#737373', 900: '#171717' },
    semantic: { success: '#10b981', warning: '#f59e0b', error: '#ef4444', info: '#3b82f6' }
  },
  spacing: { xs: '0.25rem', sm: '0.5rem', md: '1rem', lg: '1.5rem', xl: '2rem', '2xl': '3rem' },
  fontSize: { xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem', xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem' },
  borderRadius: { sm: '0.25rem', md: '0.375rem', lg: '0.5rem', xl: '0.75rem', full: '9999px' },
  shadow: {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 4px 6px rgba(0,0,0,0.07)',
    lg: '0 10px 15px rgba(0,0,0,0.1)'
  }
} as const;
```

### CSS Custom Properties
For runtime theming (dark mode, brand customization):
```css
:root {
  --color-bg: #ffffff;
  --color-text: #171717;
  --color-primary: #3b82f6;
  --color-border: #e5e5e5;
}
[data-theme="dark"] {
  --color-bg: #0a0a0a;
  --color-text: #fafafa;
  --color-primary: #60a5fa;
  --color-border: #262626;
}
```

### Typography System
Establish hierarchy before building:
- **Display:** Page titles, hero text (2xl-3xl, bold)
- **Heading:** Section headers (xl-2xl, semibold)
- **Body:** Default text (base, regular)
- **Caption:** Secondary info, labels (sm, medium)
- **Mono:** Code, data (sm, monospace)

## Phase 3: Animation

After theme is established, decide what moves and why.

### Motion Principles
Every animation must answer: "What does this communicate?"
- **Enter:** Element appears (fade in + slight translate, 200-300ms, ease-out)
- **Exit:** Element leaves (fade out, 150-200ms, ease-in)
- **Feedback:** User did something (scale pulse, color shift, 100-150ms)
- **Transition:** State change (smooth interpolation, 200-400ms, ease-in-out)
- **Loading:** Content is coming (skeleton shimmer, infinite, subtle)

### Duration Guide
```
Micro-interactions:  100-200ms (button press, toggle, hover)
Component transitions: 200-400ms (accordion, tab switch, modal)
Page transitions:    300-500ms (route change, major layout shift)
Dramatic reveals:    500-800ms (onboarding, celebration, rare)
```

### Easing
```
ease-out:     Enters (element arrives and settles)
ease-in:      Exits (element accelerates away)
ease-in-out:  Transitions (smooth state changes)
spring:       Playful interactions (bouncy, energetic)
linear:       Progress bars, loading (constant rate)
```

### Reduced Motion
Always respect user preference:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Framer Motion Patterns
```tsx
// Fade-in on mount
<motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} />

// List stagger
<motion.ul>
  {items.map((item, i) => (
    <motion.li key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} />
  ))}
</motion.ul>

// Exit animation (requires AnimatePresence)
<AnimatePresence>
  {isVisible && <motion.div exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.15 }} />}
</AnimatePresence>
```

## Phase 4: Implementation

Now build. Layout decided, theme established, motion planned.

### Component Architecture
```
components/
├── ui/               # Primitive components (Button, Input, Card, Badge)
├── layout/           # Structural components (Header, Sidebar, PageContainer)
├── features/         # Feature-specific components (UserProfile, ProjectList)
└── providers/        # Context providers (ThemeProvider, AuthProvider)
```

### Component Checklist
For every component, verify:
- [ ] TypeScript props interface defined (no `any`)
- [ ] Default state renders correctly
- [ ] Loading state handled (skeleton or spinner)
- [ ] Error state handled (inline message or fallback)
- [ ] Empty state handled (helpful message, not blank space)
- [ ] Responsive at all breakpoints
- [ ] Keyboard accessible (focusable, navigable)
- [ ] Reduced motion respected
- [ ] Dark mode works (if applicable)

### State Management Rules
- **Server state** (API data): React Query or SWR. Never useState for API data.
- **UI state** (modals, tabs, filters): useState or useReducer. Local to the component that needs it.
- **Shared state** (theme, auth, cart): Zustand or Jotai. Minimal surface area.
- **URL state** (search params, pagination): useSearchParams. Single source of truth for shareable state.
- **Form state:** React Hook Form or controlled inputs. Validate on blur, show errors inline.

### Data Fetching Pattern
```tsx
function useData<T>(key: string, fetcher: () => Promise<T>) {
  // Always handle: loading, error, empty, success
  const { data, isLoading, error } = useQuery({ queryKey: [key], queryFn: fetcher });

  if (isLoading) return <Skeleton />;
  if (error) return <ErrorMessage error={error} />;
  if (!data || (Array.isArray(data) && data.length === 0)) return <EmptyState />;

  return <SuccessView data={data} />;
}
```

### Filter + Pagination Pattern
```tsx
function useFilteredList() {
  const [filters, setFilters] = useState(defaultFilters);
  const [page, setPage] = useState(1);

  // Reset page when filters change
  const updateFilters = (newFilters) => {
    setFilters(newFilters);
    setPage(1); // Always reset
  };

  // Cancel stale requests
  const { data } = useQuery({
    queryKey: ['items', filters, page],
    queryFn: ({ signal }) => fetchItems({ ...filters, page }, signal),
  });
}
```

## Quality Gate

Before declaring any UI work done:
1. `npm run build` passes with zero errors
2. Responsive: tested at 375px, 768px, 1024px, 1440px
3. States: loading, error, empty, and success all handled
4. Accessibility: keyboard navigation works, focus visible, labels present
5. Animation: all motion has purpose, reduced-motion fallback exists
6. Data: real endpoints (or clearly marked TODOs with expected shapes)
7. Delivered: code, screenshots, or demo link sent directly in chat
