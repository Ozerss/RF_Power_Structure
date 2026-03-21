# AGENTS.md

## Project overview

This repository contains a static interactive analytical guide about the power structure of Russia.

Current architecture:
- `index.html` — page shell, 10 tabs, minimal markup
- `data/*.json` — 10 structured data files
- `styles/base.css` — design tokens (colors, typography, spacing)
- `styles/layout.css` — header, tabs, panels, basic mobile breakpoint
- `styles/components.css` — shared UI: section titles, filter pills, mode toggles
- `styles/sections.css` — per-section styles, unified `.stat-*` card family, `@media (max-width: 640px)` block at the end
- `js/app.js` — ES module entry point (top-level await)
- `js/state.js` — data loading and shared state
- `js/dom.js`, `js/utils.js`, `js/search.js`, `js/filters.js`, `js/modals.js`, `js/tabs.js` — shared helpers
- `js/features/` — 10 feature modules (interaction logic per section)
- `js/renderers/` — 10 renderer modules (HTML/SVG generation)

Do not assume this is a single-file app. Work with the modular structure that already exists.

## How to run

Run locally as a static site, not through `file://`.

```bash
python3 -m http.server 8080
```

Open: http://localhost:8080

Dev server config: `.claude/launch.json` (name: "Dev Server", port 8080).

## Completed work (do not repeat)

### Phase 1: Architecture & design system (steps 1–6, CSS-only)
1. **Structural refactor** — monolith split into data/styles/js modules. Verified, no critical defects.
2. **Design audit** — identified inconsistencies in typography, spacing, section titles, mode buttons.
3. **Typographic scale** — `--fs-xs` through `--fs-2xl` CSS variables in `base.css`.
4. **Spacing scale** — `--sp-xs` through `--sp-3xl` CSS variables in `base.css`.
5. **Section title unification** — single `.section-title` class in `components.css`.
6. **Mode button unification** — all toggle/mode buttons share base styles in `components.css`.

### Phase 2: Visual polish & theme (steps 7–12, CSS + JS renderers + HTML)
7. **Mobile adaptation pass** — comprehensive `@media (max-width: 640px)` rules. Target: 375px.
8. **Dark/light theme toggle** — `[data-theme="light"]` in `base.css`. Toggle button `#theme-toggle`. `js/theme.js` + localStorage. FOUC-prevention script in `<head>`.
9. **Inline styles extraction** — 240→86 `style=` across all 10 renderers. Zero hardcoded hex/rgba. ~70 new CSS classes in `sections.css`.
10. **SVG theme-aware** — structural colors use `var(--*)`. No additional changes needed.
11. **Card shell unification** — `.stat-grid / .stat-card / .stat-num / .stat-label / .stat-sub` family. 8 renderers updated.
12. **Dead CSS cleanup** — 61 legacy `.tl-*` class names removed from `sections.css`.

### Phase 3: SEO, UX, Accessibility (steps 13–16)
13. **SEO meta tags** — Open Graph, Twitter Card, description, canonical URL in `index.html`.
14. **UX: close buttons + debounce** — `.detail-close` button on 4 detail panels (hierarchy, clans, mechanisms, timeline). `debounce(200)` on persons search.
15. **Accessibility Batch A** — semantic HTML (`<nav>`, `<main>`), ARIA on tab system (`role="tablist/tab/tabpanel"`, `aria-selected`, `aria-controls`), `aria-live="polite"` on 4 detail panels, `:focus-visible` styles, skip link.
16. **Accessibility Batch B** — keyboard nav: Arrow/Home/End on tabs, Enter/Space on SVG nodes (hierarchy, clans, mechanisms) and expandable cards (clans, mechanisms, timeline). `tabindex="0"`, `role="button"`, `aria-expanded` on 106 elements.

### Phase 4: Content updates (steps 17–20)
17. **Data fix: Kirienko traj** — `"up"` → `"unclear"` in `persons.json`. Dyumin removed from Technocrats clan in `clans.json`.
18. **New persons** — Manturov, Tikhonova, D. Patrushev, Sobyanin added to `persons.json`. Sobyanin added to `transit.json` nextGen.
19. **Economics update** — 2 stats replaced (−24% oil revenues, 16% key rate), 2 new cards added ("Russia in numbers", "Economic constraints of transit"), bodies of "Offshore architecture" and "War economy" rewritten with 2025–2026 data.
20. **Timeline update** — 2 events replaced + 2 new events for 2025 (Riyadh talks, partial ceasefire, economic turning point, election reshuffling).
21. **Conclusions update** — `summaryPoints` rewritten (6→8 items), new render block + CSS added for "Разбор типовых ситуаций".

## Theme system

- Dark = default. Light = `[data-theme="light"]` on `<html>`.
- All color tokens live in `base.css`: `:root` (dark) and `[data-theme="light"]` (light).
- Color variables: `--amber`, `--red`, `--blue`, `--green`, `--purple` + `*-bg`, `*-border` variants. Neutrals: `--bg`, `--bg2`, `--bg3`, `--border`, `--border2`, `--text`, `--text2`, `--text3`, `--gray-bg`, `--gray-border`.
- 86 remaining inline `style=` in renderers use data-driven colors (dynamic `${color}`, `${bg}`, etc.) — they do NOT respond to theme toggle. This is known and expected.

## Reusable CSS classes

Unified stat card family (use instead of creating new card patterns):
- `.stat-grid` — grid container for stat cards
- `.stat-card` — card (padding 14px 16px, bg2, border)
- `.stat-card--compact` — smaller variant (padding 10px 12px)
- `.stat-num` — large number (font-size 22px, font-weight 600)
- `.stat-num--amber`, `--red`, `--purple`, `--green` — colored variants
- `.stat-label` — description text
- `.stat-sub` — additional small text

Layout/header classes from inline styles extraction:
- `.hier-header`, `.flow-header` — flex space-between header layout
- `.hier-subtitle`, `.flow-subtitle` — small subtitle (font-size:11px, color:var(--text3))
- `.hier-section-title`, `.flow-section-title` — section-title with reduced margin
- `.hier-detail-badge--neutral` — neutral badge (gray-bg, border, text2)
- `.hier-legend-hint` — small hint text
- `.trap-intro` — intro paragraph (12px, text2, line-height 1.65)
- Many more section-specific classes in `sections.css`.

## Known technical debt (do not fix unless explicitly requested)

- **86 data-driven inline styles** — remaining `style=` in renderers use dynamic values from data (`${color}`, `${bg}`, `width:${pct}%`). Cannot be extracted to CSS. They don't respond to theme toggle — this is known and accepted.

## Current state

Project is stable and feature-complete. Active phase: content enrichment and editorial polish.
- Modular architecture (data/styles/js split)
- Unified design tokens (typography, spacing, colors)
- Responsive (mobile 375px)
- Dark/light theme with FOUC prevention
- Clean CSS (no dead code, unified card patterns, no hardcoded colors)
- Full accessibility: ARIA, keyboard nav (tabs, SVG nodes, cards), focus-visible, skip link
- 86 inline styles remaining (all data-driven, by design)
- Content updated to 2025–2026 data across economics, timeline, persons, conclusions
- 20 persons, 7 econ cards, 35 timeline events, 8 summary points

## Core rules

- Make small, reversible changes.
- Prefer editing the smallest possible set of files.
- Do not introduce frameworks, build tools, or package managers unless explicitly requested.
- Do not rewrite architecture unless explicitly requested.
- Do not change factual content, wording, numbers, or analytical claims unless explicitly requested.
- Do not rename files or move directories unless necessary for the requested task.
- Preserve current behavior unless the task explicitly asks to change it.

## Editing rules by area

### Data

- Keep structured content in `data/*.json`.
- Do not hardcode large data back into HTML or JS.
- Preserve keys and shapes unless a task explicitly requires schema changes.
- If schema changes are necessary, update all affected renderers and features.

### Styles

- Reuse existing CSS variables where possible (`--fs-*`, `--sp-*`, `--fw-*`, `--lh-*`, `--r`, `--r2`).
- Prefer unification over one-off styles.
- Preserve semantic color meaning of existing accent colors.
- Do not introduce visual redesign unless explicitly requested.
- New mobile rules go inside `@media (max-width: 640px)` blocks.

### JavaScript

- Keep logic modular.
- Put shared helpers in shared modules instead of duplicating code.
- Keep renderers focused on their own section.
- Keep feature modules focused on interaction logic.
- Avoid changing business logic during cosmetic refactors.
- If adding defensive checks, keep them minimal and non-invasive.

## High-risk areas

Be especially careful with:

- JSON loading paths
- ES module imports/exports
- Top tabs and panel switching
- Search and filters
- Timeline modes and navigation
- Expandable cards
- Any SVG-generating renderer
- Selectors based on `data-*` attributes and expected DOM IDs/classes

## What to do before changing code

For any non-trivial task:

1. Briefly inspect the relevant files first.
2. Identify the minimum change needed.
3. Change only that.
4. Report what files were changed and why.

## What to report after each task

Always provide:

- Changed files
- What was changed
- What should be checked manually in the browser
- Any remaining risks or follow-up items

## Definition of done

A task is done only if:

- The code remains consistent with the current modular structure
- The site still runs via local static server
- No obvious import/path/runtime issues were introduced
- The requested change is implemented without unrelated refactors
- Manual browser checks for the affected area are clearly listed

## Manual verification baseline

When relevant, ask for or recommend checking:

- Page loads through http://localhost:8080
- No `Failed to fetch`, `404`, `SyntaxError`, missing export, or null DOM errors in console
- Affected tabs, cards, filters, and renderers still work
- Affected section still renders with real data

## Out of scope by default

Unless explicitly requested, do not:

- Add a framework
- Add TypeScript
- Add a bundler
- Redesign the whole UI
- Rewrite all renderers
- Rewrite all CSS
- Change analytical content
