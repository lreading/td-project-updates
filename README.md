<div align="center">

# Slide Spec

### Create beautiful slides using data, not powerpoint

<img src="assets/slide-spec-logo.svg" width="140" alt="Slide Spec logo"/>

[![Main branch CI](https://img.shields.io/github/actions/workflow/status/lreading/slide-spec/main.yml?branch=main&label=main%20CI)](https://github.com/lreading/slide-spec/actions/workflows/main.yml)
[![Pull request CI](https://img.shields.io/github/actions/workflow/status/lreading/slide-spec/pr.yml?label=PR%20CI)](https://github.com/lreading/slide-spec/actions/workflows/pr.yml)
[![Quality gates](https://img.shields.io/github/actions/workflow/status/lreading/slide-spec/reusable-quality.yml?branch=main&label=quality%20gates)](https://github.com/lreading/slide-spec/actions/workflows/reusable-quality.yml)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](./LICENSE)
[![OpenSSF Best Practices](https://www.bestpractices.dev/projects/12235/badge)](https://www.bestpractices.dev/projects/12235)

<div align="center">
  <img src="assets/readme-shot-1.png" width="300" alt="Presentation archive"/>
  <img src="assets/readme-shot-2.png" width="300" alt="Hero slide"/>
  <img src="assets/readme-shot-3.png" width="300" alt="Agenda slide"/>
</div>

<div align="center">
  <img src="assets/readme-shot-4.png" width="300" alt="Releases slide"/>
  <img src="assets/readme-shot-5.png" width="300" alt="Community activity slide"/>
  <img src="assets/readme-shot-6.png" width="300" alt="Closing slide"/>
</div>

<h6 align="center">
  <a href="assets/readme-demo.webm">Watch full walkthrough (WebM)</a>
</h6>

</div>

<img src="assets/readme-divider.svg" width="100%" height="8" alt=""/>

## Overview

Slide Spec grew out of open source community updates: keep release notes and roadmaps as structured data in the same repo as the code, not in a separate slide deck nobody can review in a PR.

- **Author in structured YAML** - slides and copy are data you can diff, lint, and feed from scripts or CI.
- **Static site output** - Slide Spec generates a static site you can host anywhere: CDN, S3, GitHub Pages, and similar hosts.
- **OSS first** - built for open source first, without proprietary file types or proprietary authoring software.
- **GitOps presentations** - move decks into a GitOps-style workflow with validation baked in.

<img src="assets/readme-divider.svg" width="100%" height="8" alt=""/>

## Quickstart

Use the Slide Spec CLI to get started.

Requirements: Node.js 22+ and npm.

1. **Scaffold:** `npx @slide-spec/cli init ./my-deck`
2. **Edit YAML** under `my-deck/content/` (`site.yaml`, `presentations/index.yaml`, and each deck's `presentation.yaml` / `generated.yaml`).
3. **Validate YAML:** `npx @slide-spec/cli validate ./my-deck`
4. **Preview locally:** `npx @slide-spec/cli serve ./my-deck`
5. **Build:** `npx @slide-spec/cli build ./my-deck` (produces the static site for deployment)

Optional: set a public deployment URL in `site.yaml` or pass `--deployment-url` to the `build` command if you want `sitemap.xml` generated with the correct base URL.

<img src="assets/readme-divider.svg" width="100%" height="8" alt=""/>

## Local development

### Requirements

- Node.js 24
- npm
- Git
- Playwright for app browser tests: `cd app && npx playwright install chromium`
- Docker: required for Semgrep and other tooling aligned with CI

### Repository layout

| Directory | Purpose |
| --- | --- |
| `app/` | Presentation layer |
| `cli/` | CLI used to scaffold, validate, build, and serve the site |
| `docs/` | Documentation |
| `shared/` | Shared types and YAML validation used by the app and CLI |
| `content/` | YAML for this repo's own presentations |
| `scripts/` | Maintainer scripts |

Each package directory has its own README with details for local development. Please follow [CONTRIBUTING.md](./CONTRIBUTING.md) when opening a pull request.

<img src="assets/readme-divider.svg" width="100%" height="8" alt=""/>

## Quality gates

There are several layers of quality gates to guard against regressions and breaking changes. **These gates are required to pass before code is merged.**

For local work, use `npm run verify` in each package you touch. GitHub Actions runs the same ideas automatically so the `main` branch stays stable and ready to release.
