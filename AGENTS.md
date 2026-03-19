# AGENTS.md

## Project overview
This repository contains a static interactive analytical guide about the power structure of Russia.

Current architecture:
- `index.html` — page shell and main containers
- `data/` — JSON data files
- `styles/` — CSS files
- `js/app.js` — entry point
- `js/state.js` — data loading and shared state
- `js/features/` — UI interactions such as search, filters, tabs, modals
- `js/renderers/` — rendering of major sections

Do not assume this is a single-file app. Work with the modular structure that already exists.

## How to run
Run locally as a static site, not through `file://`.

Use:
```bash
python3 -m http.server 5500

Open:

http://localhost:5500
Core rules

Make small, reversible changes.

Prefer editing the smallest possible set of files.

Do not introduce frameworks, build tools, or package managers unless explicitly requested.

Do not rewrite architecture unless explicitly requested.

Do not change factual content, wording, numbers, or analytical claims unless explicitly requested.

Do not rename files or move directories unless necessary for the requested task.

Preserve current behavior unless the task explicitly asks to change it.

Editing rules by area
Data

Keep structured content in data/*.json.

Do not hardcode large data back into HTML or JS.

Preserve keys and shapes unless a task explicitly requires schema changes.

If schema changes are necessary, update all affected renderers and features.

Styles

Reuse existing CSS variables where possible.

Prefer unification over one-off styles.

Preserve semantic color meaning of existing accent colors.

Do not introduce visual redesign unless explicitly requested.

JavaScript

Keep logic modular.

Put shared helpers in shared modules instead of duplicating code.

Keep renderers focused on their own section.

Keep feature modules focused on interaction logic.

Avoid changing business logic during cosmetic refactors.

If adding defensive checks, keep them minimal and non-invasive.

High-risk areas

Be especially careful with:

JSON loading paths

ES module imports/exports

top tabs and panel switching

search and filters

timeline modes and navigation

expandable cards

any SVG-generating renderer

selectors based on data-* attributes and expected DOM IDs/classes

What to do before changing code

For any non-trivial task:

Briefly inspect the relevant files first.

Identify the minimum change needed.

Change only that.

Report what files were changed and why.

What to report after each task

Always provide:

changed files

what was changed

what should be checked manually in the browser

any remaining risks or follow-up items

Definition of done

A task is done only if:

the code remains consistent with the current modular structure

the site still runs via local static server

no obvious import/path/runtime issues were introduced

the requested change is implemented without unrelated refactors

manual browser checks for the affected area are clearly listed

Manual verification baseline

When relevant, ask for or recommend checking:

page loads through http://localhost:5500

no Failed to fetch, 404, SyntaxError, missing export, or null DOM errors in console

affected tabs, cards, filters, and renderers still work

affected section still renders with real data

Out of scope by default

Unless explicitly requested, do not:

add a framework

add TypeScript

add a bundler

redesign the whole UI

rewrite all renderers

rewrite all CSS

change analytical content