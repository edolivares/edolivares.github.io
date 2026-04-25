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

- [ ] Document the current page sections from `index.html`.
- [ ] Inventory current CSS sources in `assets/css/`.
- [ ] Inventory current JavaScript behavior in `assets/js/`.
- [ ] Inventory image assets from `assets/images/`.
- [ ] Inventory third-party dependencies currently loaded from `vendor/` and CDNs.
- [ ] Check external links for `https://` and `rel="noopener noreferrer"`.

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
- [ ] Move current legacy runtime files into `legacy/`:
  - [x] `index.html`
  - [x] `assets/`
  - [x] `scss/`
  - [x] `vendor/`
  - [x] `build-config.js`
  - [x] `gulpfile.js`
  - [x] old lockfile/package metadata if replaced by Astro
- [ ] Keep enough history in git so every migrated section can be compared against legacy.

## Phase 2: Astro Foundation

- [x] Initialize Astro in the repo root.
- [x] Configure `astro.config.mjs` for GitHub Pages.
- [x] Confirm the correct `site` value: `https://edolivares.github.io`.
- [ ] Configure static asset handling.
- [x] Clean `package.json` so scripts are Astro-only:
  - [x] `dev`
  - [x] `build`
  - [x] `preview`
- [x] Set Node engine to Node 24.
- [x] Generate a fresh lockfile.

## Phase 3: Atomic Design Structure

- [ ] Create design token layer:
  - [x] `src/quarks/colors.css`
  - [x] `src/quarks/spacing.css`
  - [x] `src/quarks/typography.css`
  - [x] `src/quarks/borders.css`
  - [x] `src/quarks/shadows.css`
  - [x] `src/quarks/index.css`
- [ ] Create component folders:
  - [x] `src/components/atoms/`
  - [ ] `src/components/molecules/`
  - [ ] `src/components/organisms/`
  - [x] `src/components/templates/`
- [ ] Create route/page structure:
  - [x] `src/pages/index.astro`
  - [x] `src/layouts/BaseLayout.astro`
- [ ] Decide how to represent migrated static content:
  - [ ] Inline Astro props for the first pass.
  - [ ] Extract to `src/content/` or `src/data/` after the first visual parity pass if useful.

## Phase 4: First Visual Parity Pass

- [ ] Rebuild the full current page in Astro with minimal behavior changes.
- [ ] Copy images into Astro-compatible public/static paths.
- [ ] Keep current section order and anchors:
  - [ ] `#portfolio`
  - [ ] `#whoami`
  - [ ] `#about`
  - [ ] `#experience`
  - [ ] `#contact`
- [ ] Preserve Bootstrap-dependent layout behavior or replace it intentionally with equivalent scoped CSS.
- [ ] Preserve FontAwesome/simple icon usage or migrate to a stable Astro-friendly icon strategy.

## Phase 5: Component Migration

- [ ] Quarks: extract color, spacing, typography, border, shadow, and breakpoint tokens from legacy CSS.
- [ ] Atoms:
  - [ ] `Button.astro`
  - [ ] `Icon.astro`
  - [ ] `SectionHeading.astro`
  - [ ] `SocialLink.astro`
  - [ ] `TextInput.astro`
  - [ ] `Textarea.astro`
- [ ] Molecules:
  - [ ] `NavLink.astro`
  - [ ] `FormField.astro`
  - [ ] `TimelineItem.astro`
  - [ ] `PortfolioCard.astro`
  - [ ] `ModalHeader.astro`
  - [ ] `SkillIcon.astro`
- [ ] Organisms:
  - [ ] `Navbar.astro`
  - [ ] `Hero.astro`
  - [ ] `PortfolioSection.astro`
  - [ ] `WhoAmISection.astro`
  - [ ] `AboutTimeline.astro`
  - [ ] `ExperienceSection.astro`
  - [ ] `ContactForm.astro`
  - [ ] `Footer.astro`
  - [ ] `PortfolioModal.astro`
  - [ ] `ExperienceModal.astro`
- [ ] Templates:
  - [ ] `PortfolioPageTemplate.astro`

## Phase 6: JavaScript Behavior

- [ ] Migrate navbar affix/scroll behavior from `header-behavior.js`.
- [ ] Migrate smooth scroll/page-scroll behavior.
- [ ] Migrate responsive menu behavior.
- [ ] Migrate footer year behavior.
- [ ] Migrate EmailJS contact flow.
- [ ] Preserve reCAPTCHA loading and behavior.
- [ ] Remove dead/minified legacy bundles once their behavior is represented in Astro.

## Phase 7: Scoped CSS Cleanup

- [ ] Move section styles from global CSS into component `<style>` blocks or component-local CSS.
- [ ] Keep only true global resets/base styles in a global stylesheet.
- [ ] Remove unused Bootstrap classes once replaced.
- [ ] Remove unused legacy CSS after visual parity is confirmed.
- [ ] Verify mobile, tablet, and desktop layouts after each section migration.

## Phase 8: CI/CD for GitHub Pages

- [x] Add `.github/workflows/deploy.yml`.
- [x] Use `actions/setup-node` with Node 24.
- [x] Install dependencies with `npm ci`.
- [x] Build with `npm run build`.
- [x] Deploy `dist/` via GitHub Pages Actions.
- [ ] Confirm repository Pages settings match the Actions deployment flow.

## Phase 9: Verification

- [x] Run `npm run build`.
- [ ] Run `npm run preview` and inspect locally.
- [ ] Compare Astro output against `legacy/index.html`.
- [ ] Check image paths in `dist/`.
- [ ] Check anchors and navigation.
- [ ] Check navbar scroll/affix behavior.
- [ ] Check responsive menu.
- [ ] Check portfolio modals.
- [ ] Check experience modals.
- [ ] Check contact form UI and validation.
- [ ] Check all external links.
- [ ] Confirm GitHub Pages deployment succeeds.

## Known Notes

- `AGENTS.md` still references `.agent/skills/atomic-design-planning/SKILL.md`, but the current detailed skills live under `.agent/skills/atomic-design-*`.
- The current legacy page uses Bootstrap, FontAwesome, Google Fonts, EmailJS, reCAPTCHA, Google Analytics, and Simple Icons CDN assets.
- The current project is designed to open via `file://`; the Astro version will use a build/preview workflow but still produce static GitHub Pages output.
- Local validation currently runs under Node 22.19.0 even though the project targets Node 24. GitHub Actions is configured with Node 24.
- Astro telemetry is disabled through `.env` to avoid filesystem writes outside the workspace during local builds.
