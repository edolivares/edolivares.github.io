# Project: edolivares/edolivares.github.io

This is a personal portfolio project. Use this file as a guide for any AI agent (Codex, Cursor, etc.) working on this repository.

## Core Rules & Architecture
Before making any changes to the UI or creating new components, you **MUST** read and follow the Atomic Design methodology defined here:
- [Atomic Design Fundamentals SKILL](.agent/skills/atomic-design-fundamentals/SKILL.md)
- [Atomic Design Quarks SKILL](.agent/skills/atomic-design-quarks/SKILL.md)
- [Atomic Design Atoms SKILL](.agent/skills/atomic-design-atoms/SKILL.md)
- [Atomic Design Molecules SKILL](.agent/skills/atomic-design-molecules/SKILL.md)
- [Atomic Design Organisms SKILL](.agent/skills/atomic-design-organisms/SKILL.md)
- [Atomic Design Templates SKILL](.agent/skills/atomic-design-templates/SKILL.md)
- [Atomic Design Integration SKILL](.agent/skills/atomic-design-integration/SKILL.md)

## Development Guidelines
- **Astro Migration:** The project is being migrated to Astro. Use Astro source files under `src/` and static assets under `public/`.
- **Legacy Build:** Do NOT use the legacy build system (`build-config.js` or `gulpfile.js`). They are deprecated/broken and preserved only under `legacy/`.
- **Legacy Source:** The old direct-edit files under `legacy/assets/css/` and `legacy/assets/js/` are reference material only.
- **Loading Strategy:** Astro owns the modern build. Do not reintroduce the old script-tag workflow unless explicitly restoring a legacy behavior during migration.
- **Content Security:** All external links must use `https://` and include `rel="noopener noreferrer"`.

## Project Structure
- `src/pages/index.astro`: Main Astro entry point.
- `src/components/`: Atomic Design components.
- `src/quarks/`: Design tokens and CSS custom properties.
- `public/`: Static assets served by Astro.
- `legacy/`: Preserved pre-Astro implementation.
- `.agent/skills/`: Custom agent instructions and specialized knowledge.

---
*Created by Antigravity AI to ensure project consistency across different agents.*
