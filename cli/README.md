# CLI

This project will become the repository CLI for authoring and data-fetch workflows.

Current scope:
- service interface for future CLI commands
- site config loading
- GitHub data-source resolution
- `.env` token loading
- typed GitHub client
- period-based generated-data fetching
- presentation scaffolding for quarter-oriented deck ids
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

Fine-grained PAT setup:
1. Create a fine-grained personal access token in GitHub.
2. Set `Resource owner` to the account or organization that owns the target repository.
3. Under `Repository access`, select `Only select repositories` and choose the repository configured in `../content/site.yaml`.
4. Under `Repository permissions`, grant:
   - `Contents: Read-only`
   - `Pull requests: Read-only`
   - `Issues: Read-only`
   - `Metadata: Read-only`
5. Save the token in `cli/.env` as `GITHUB_PAT=...`.

Notes:
- If the repository belongs to an organization, the token may require org approval before it works.
- The current CLI only reads repository data. It does not need write permissions.
- For public-repository testing, GitHub's current fine-grained PAT flow may work with the public-repo access selection alone, even if the UI does not expose the older per-permission `Read-only` toggles described above.
- GitHub documents fine-grained PAT creation and permission mapping here:
  - https://docs.github.com/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
  - https://docs.github.com/en/rest/authentication/permissions-required-for-fine-grained-personal-access-tokens

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
- `npm run cli -- fetch --presentation-id 2026-q1 --from-date 2026-01-01 --to-date 2026-03-31`
- `npm run cli -- fetch --presentation-id 2026-q1 --from-date 2026-03-01 --no-previous-period --dry-run`
- `npm run cli -- build`
- `npm run cli -- serve --host 127.0.0.1 --port 5173`
- `npm run cli -- validate`
