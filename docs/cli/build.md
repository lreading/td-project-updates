# `build`

`build` emits a static site into `<project-root>/dist`.

```bash
npx @slide-spec/cli build ./my-slides
```

With sitemap generation (provide a public deployment URL):

```bash
npx @slide-spec/cli build ./my-slides --deployment-url https://updates.example.com
```

## Output

- Writes `<project-root>/dist` as static HTML, CSS, and JS. No backend is required.
- Always generates `robots.txt`.
- Generates `sitemap.xml` when a real deployment URL is provided (CLI flag and/or `site.yaml` metadata, depending on your setup).

## Notes

- Uses the packaged runtime shipped with the CLI; the project does not need a local `app/` checkout.
- If no deployment URL is configured, the build does not emit a sitemap.
