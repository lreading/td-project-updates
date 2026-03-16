# CLI

This project will become the repository CLI for authoring and data-fetch workflows.

Current scope:
- service interface for future CLI commands
- site config loading
- GitHub data-source resolution
- `.env` token loading
- typed GitHub client
- quarter-based generated-data fetching
- quarter-based presentation scaffolding
- thin CLI command routing
- app build/serve/validate delegation

Commands:
- `npm run lint`
- `npm run test`
- `npm run build`
- `npm run cli -- <command> [options]`
- `npm run verify`

Environment:
- copy `.env.example` to `.env`
- set `GITHUB_PAT`

Current source of truth:
- GitHub fetch target comes from `../content/site.yaml`
- fetch code will use `site.data_sources`

Current status:
- `fetchPresentationData(...)` is implemented in the application layer
- `initPresentation(...)` is implemented in the application layer
- command parsing is implemented
- `build`, `serve`, and `validate` command flows are implemented

CLI usage:
- `npm run build`
- `npm run cli -- init --year 2026 --quarter 2`
- `npm run cli -- fetch --year 2026 --quarter 2`
- `npm run cli -- build`
- `npm run cli -- serve --host 127.0.0.1 --port 5173`
- `npm run cli -- validate`
