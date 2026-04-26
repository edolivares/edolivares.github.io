# Astro Migration TODO

Migration goal: rebuild this GitHub Pages portfolio as an Astro static site while preserving the current content, images, layout, and behavior from the legacy implementation.

## Guiding Decisions

- [x] Keep text content and images exactly as they are during the first migration pass.
- [x] Use Astro as the build system and static site generator.
- [x] Target GitHub Pages with a static build deployed from `dist/`.
- [x] Use Node 24 LTS for local setup and GitHub Actions.
- [x] Move legacy files into `legacy/` instead of deleting them.
- [x] Replace the old Gulp/custom build workflow with Astro scripts.
- [x] Refactor CSS into scoped component styles as the migration progresses.
- [x] Follow the repo Atomic Design skills:
  - `.agent/skills/atomic-design-fundamentals/SKILL.md`
  - `.agent/skills/atomic-design-quarks/SKILL.md`
  - `.agent/skills/atomic-design-atoms/SKILL.md`
  - `.agent/skills/atomic-design-molecules/SKILL.md`
  - `.agent/skills/atomic-design-organisms/SKILL.md`
  - `.agent/skills/atomic-design-templates/SKILL.md`
  - `.agent/skills/atomic-design-integration/SKILL.md`

## Phase 0: Legacy Inventory

- [x] Document the current page sections from `index.html`.
- [x] Inventory current CSS sources in `assets/css/`.
- [x] Inventory current JavaScript behavior in `assets/js/`.
- [x] Inventory image assets from `assets/images/`.
- [x] Inventory third-party dependencies currently loaded from `vendor/` and CDNs.
- [x] Check external links for `https://` and `rel="noopener noreferrer"`.

Current sections found:

- [x] Navbar / main navigation.
- [x] Hero header.
- [x] Portfolio grid.
- [x] Who am I / profile section.
- [x] About timeline.
- [x] Experience section.
- [x] Contact form.
- [x] Footer.
- [x] Portfolio modals.
- [x] Experience modals.

## Phase 1: Preserve Legacy

- [x] Create `legacy/`.
- [x] Move current legacy runtime files into `legacy/`:
  - [x] `index.html`
  - [x] `assets/`
  - [x] `scss/`
  - [x] `vendor/`
  - [x] `build-config.js`
  - [x] `gulpfile.js`
  - [x] old lockfile/package metadata if replaced by Astro
- [x] Keep enough history in git so every migrated section can be compared against legacy.

## Phase 2: Astro Foundation

- [x] Initialize Astro in the repo root.
- [x] Configure `astro.config.mjs` for GitHub Pages.
- [x] Confirm the correct `site` value: `https://edolivares.github.io`.
- [x] Configure static asset handling.
- [x] Clean `package.json` so scripts are Astro-only:
  - [x] `dev`
  - [x] `build`
  - [x] `preview`
- [x] Set Node engine to Node 24.
- [x] Generate a fresh lockfile.

## Phase 3: Atomic Design Structure

- [x] Create design token layer:
  - [x] `src/quarks/colors.css`
  - [x] `src/quarks/spacing.css`
  - [x] `src/quarks/typography.css`
  - [x] `src/quarks/borders.css`
  - [x] `src/quarks/shadows.css`
  - [x] `src/quarks/index.css`
- [x] Create component folders:
  - [x] `src/components/atoms/`
  - [x] `src/components/molecules/`
  - [x] `src/components/organisms/`
  - [x] `src/components/templates/`
- [x] Create route/page structure:
  - [x] `src/pages/index.astro`
  - [x] `src/layouts/BaseLayout.astro`
- [x] Decide how to represent migrated static content:
  - [x] Inline Astro props for the first pass.
  - [x] Extract to `src/content/` or `src/data/` after the first visual parity pass if useful.

## Phase 4: First Visual Parity Pass

- [x] Rebuild the full current page in Astro with minimal behavior changes.
- [x] Copy images into Astro-compatible public/static paths.
- [x] Keep current section order and anchors:
  - [x] `#portfolio`
  - [x] `#whoami`
  - [x] `#about`
  - [x] `#experience`
  - [x] `#contact`
- [x] Preserve Bootstrap-dependent layout behavior or replace it intentionally with equivalent scoped CSS.
- [x] Preserve FontAwesome/simple icon usage or migrate to a stable Astro-friendly icon strategy.

## Phase 5: Component Migration

- [x] Quarks: extract color, spacing, typography, border, shadow, and breakpoint tokens from legacy CSS.
- [x] Atoms:
  - [x] `Button.astro`
  - [x] `Icon.astro`
  - [x] `SectionHeading.astro`
  - [x] `SocialLink.astro`
  - [x] `TextInput.astro` not extracted; current scope is covered by `FormField.astro`.
  - [x] `Textarea.astro` not extracted; current scope is covered by `FormField.astro`.
- [x] Molecules:
  - [x] `NavLink.astro`
  - [x] `FormField.astro`
  - [x] `TimelineItem.astro`
  - [x] `PortfolioCard.astro`
  - [x] `ModalHeader.astro` not extracted; modal headers remain organism-specific.
  - [x] `SkillIcon.astro` not extracted; current scope is covered by `TechBadge.astro`.
  - [x] `SocialLinks.astro`
  - [x] `ExperienceCard.astro`
  - [x] `TechBadge.astro`
- [x] Organisms:
  - [x] `Navbar.astro`
  - [x] `Hero.astro`
  - [x] `PortfolioSection.astro`
  - [x] `WhoAmISection.astro`
  - [x] `AboutTimeline.astro`
  - [x] `ExperienceSection.astro`
  - [x] `ContactForm.astro`
  - [x] `Footer.astro`
  - [x] `PortfolioModal.astro`
  - [x] `ExperienceModal.astro`
- [x] Templates:
  - [x] `PortfolioPageTemplate.astro`

## Phase 6: JavaScript Behavior

- [x] Migrate navbar affix/scroll behavior from `header-behavior.js`.
- [x] Migrate smooth scroll/page-scroll behavior.
- [x] Migrate responsive menu behavior.
- [x] Migrate footer year behavior.
- [x] Migrate EmailJS contact flow.
- [x] Preserve reCAPTCHA loading and behavior.
- [x] Remove dead/minified legacy bundles once their behavior is represented in Astro.

## Phase 7: Scoped CSS Cleanup

- [x] Move section styles from global CSS into component `<style>` blocks or component-local CSS.
- [x] Keep only true global resets/base styles in a global stylesheet.
- [x] Remove unused Bootstrap classes once replaced.
- [x] Remove unused legacy CSS after visual parity is confirmed.
- [x] Verify mobile, tablet, and desktop layouts after each section migration.

## Phase 8: CI/CD for GitHub Pages

- [x] Add `.github/workflows/deploy.yml`.
- [x] Use `actions/setup-node` with Node 24.
- [x] Install dependencies with `npm ci`.
- [x] Build with `npm run build`.
- [x] Deploy `dist/` via GitHub Pages Actions.
- [ ] Confirm repository Pages settings match the Actions deployment flow.

## Phase 9: Verification

- [x] Run `npm run build`.
- [x] Run `npm run preview` and inspect locally.
- [x] Compare Astro output against `legacy/index.html`.
- [x] Check image paths in `dist/`.
- [x] Check anchors and navigation.
- [x] Check navbar scroll/affix behavior.
- [x] Check responsive menu.
- [x] Check portfolio modals.
- [x] Check experience modals.
- [x] Check contact form UI and validation.
- [x] Check all external links.
- [x] Add SEO metadata, canonical URL, social preview tags, and structured data.
- [ ] Confirm GitHub Pages deployment succeeds.

## Known Notes

- `AGENTS.md` now references the current detailed skills under `.agent/skills/atomic-design-*`.
- The current legacy page uses Bootstrap, FontAwesome, Google Fonts, EmailJS, reCAPTCHA, and Simple Icons CDN assets.
- The current project is designed to open via `file://`; the Astro version will use a build/preview workflow but still produce static GitHub Pages output.
- Local validation now runs under Node 24.15.0 with npm 11.12.1. GitHub Actions is configured with Node 24.
- Astro telemetry is disabled through `.env` to avoid filesystem writes outside the workspace during local builds.
- `.env.example` documents `ASTRO_TELEMETRY_DISABLED=1`; local `.env` is intentionally kept but ignored by git.
- Astro was upgraded from 5.18.1 to 6.1.9 early in the migration to avoid mixing a major framework upgrade with later visual parity work.
- Legacy used a Universal Analytics `UA-*` ID. Google Analytics is intentionally not migrated; Search Console is used for search visibility instead.
- `TextInput.astro`, `Textarea.astro`, `ModalHeader.astro`, and `SkillIcon.astro` remain optional architecture extractions. The current migrated UI is already covered by `FormField.astro`, `TechBadge.astro`, and modal-specific organisms.
