# Slide Spec docs

VitePress site for Slide Spec covering schema reference, templates, CLI usage, and examples.

## Getting started

1. Node 24+ and npm.
2. From this directory, `npm install`
3. `npm run dev`

## Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm run spellcheck` | Spelling check |
| `npm run verify` | Standard gate (build + spellcheck) |

Accessibility check (build + axe against `vitepress preview`):

```bash
npx playwright install chromium   # first time
npm run a11y
```

`npm run verify` before you push.

## Notes

- No runtime dependencies on other monorepo packages.
- Keep each page focused on one topic.
- Not published to npm. Deploy as a static site.
- Versioned with the monorepo. Publish the built output however you prefer.
