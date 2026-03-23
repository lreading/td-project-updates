# `build`

`build` produces a static site.

## Usage

```bash
npx @slide-spec/cli build ./my-slides
```

With sitemap generation:

```bash
npx @slide-spec/cli build ./my-slides --deployment-url https://updates.example.com
```

## Output

- writes `<project-root>/dist`
- always generates `robots.txt`
- generates `sitemap.xml` only when a real deployment URL is provided

The build output is static HTML, CSS, and JS. No backend is required.

## Notes

- `build` uses the packaged runtime shipped with the CLI.
- The target project does not need a local copy of the app source.
- If no deployment URL is configured, the build does not generate a sitemap.
