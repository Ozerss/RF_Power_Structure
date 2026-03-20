# AGENTS.md

## Project overview

This repository contains a static interactive analytical guide about the power structure of Russia.

Current architecture:
- `index.html` — page shell, 10 tabs, minimal markup
- `data/*.json` — 10 structured data files
- `styles/base.css` — design tokens (colors, typography, spacing)
- `styles/layout.css` — header, tabs, panels, basic mobile breakpoint
- `styles/components.css` — shared UI: section titles, filter pills, mode toggles
- `styles/sections.css` — per-section styles (~61KB), one `@media (max-width: 640px)` block at the end
- `js/app.js` — ES module entry point (top-level await)
- `js/state.js` — data loading and shared state
- `js/dom.js`, `js/utils.js`, `js/search.js`, `js/filters.js`, `js/modals.js`, `js/tabs.js` — shared helpers
- `js/features/` — 10 feature modules (interaction logic per section)
- `js/renderers/` — 10 renderer modules (HTML/SVG generation)

Do not assume this is a single-file app. Work with the modular structure that already exists.

## How to run

Run locally as a static site, not through `file://`.

```bash
python3 -m http.server 5500
```

Open: http://localhost:5500

## Completed work (do not repeat)

1. **Structural refactor** — monolith split into data/styles/js modules. Verified, no critical defects.
2. **Design audit** — identified inconsistencies in typography, spacing, section titles, mode buttons.
3. **Typographic scale** — `--fs-xs` through `--fs-2xl` CSS variables in `base.css`. Applied across CSS files.
4. **Spacing scale** — `--sp-xs` through `--sp-3xl` CSS variables in `base.css`. Applied across CSS files.
5. **Section title unification** — single `.section-title` class in `components.css`.
6. **Mode button unification** — all toggle/mode buttons share base styles in `components.css`.

All of the above were CSS-only changes. HTML and JS were not modified.

## Known technical debt (do not fix unless explicitly requested)

- **Inline styles in renderers** — 240 `style=` occurrences across `js/renderers/*.js`. These will be addressed in a dedicated pass.
- **Parallel class families** — `.tl-*` and `.tl3-*` coexist (two timeline implementations).
- **Card shell duplication** — each section implements its own card pattern.
- **No dark/light toggle** — currently dark-only.
- **No theme-aware SVG rendering** — SVG colors are hardcoded.
- **No accessibility** — no ARIA roles, keyboard nav, focus styles.

## Current priority

**Mobile adaptation pass** — CSS only, target 375px width.

Scope: `styles/layout.css`, `styles/components.css`, `styles/sections.css`.

Not in scope: JS, HTML, inline styles, theme toggle, SVG rewrite, architectural cleanup.

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

- Page loads through http://localhost:5500
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
