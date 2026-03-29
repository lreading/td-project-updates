# CLI

The Slide Spec CLI handles everything from project setup to building your final site.

**Requires:** Node.js 24+

**Typical workflow:** [init](/cli/init) → edit YAML → [validate](/cli/validate) → [fetch](/cli/fetch) (optional) → [build](/cli/build) or [serve](/cli/serve)

## Running the CLI

```bash
npx @slide-spec/cli
```

Running without arguments starts the interactive mode, which walks you through project setup. This is the same as running `npx @slide-spec/cli init` without arguments. If you prefer declarative flags, see the [init](/cli/init) documentation.

## Project root

By default, all commands use your current working directory. To target a different directory, pass it as the first argument:

```bash
npx @slide-spec/cli validate ./my-slides
```

Or use the `--project-root` flag:

```bash
npx @slide-spec/cli validate --project-root ./my-slides
```

## Global options

| Flag | Description |
| --- | --- |
| `--log-path <file>` | Write sanitized logs to a file |
| `--help`, `-h` | Show usage. `help <command>` for subcommand help |
