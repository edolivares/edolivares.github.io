# Project: edolivares/edolivares.github.io

This is a personal portfolio project. Use this file as a guide for any AI agent (Claude, Cursor, etc.) working on this repository.

## Core Rules & Architecture
Before making any changes to the UI or creating new components, you **MUST** read and follow the Atomic Design methodology defined here:
- [Atomic Design Planning SKILL](.agent/skills/atomic-design-planning/SKILL.md)

## Development Guidelines
- **Zero-Build Approach:** Do NOT use the legacy build system (`build-config.js` or `gulpfile.js`). They are currently deprecated/broken.
- **Source Files:** Edit files directly in `assets/css/` and `assets/js/`.
- **Loading Strategy:** Individual scripts are loaded in `index.html` via traditional `<script>` tags to support local `file://` access and avoid CORS issues. Do NOT use `type="module"` unless explicitly refactoring for a dev server.
- **Content Security:** All external links must use `https://` and include `rel="noopener noreferrer"`.

## Project Structure
- `index.html`: Main entry point.
- `assets/css/`: Source CSS files (style.css, header-navbar.css, etc.).
- `assets/js/`: Source JS files (main.js, header-behavior.js, etc.).
- `.agent/skills/`: Custom agent instructions and specialized knowledge.

---
*Created by Antigravity AI to ensure project consistency across different agents.*
