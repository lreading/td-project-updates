# Connectors

Connectors are data sources that populate `generated.yaml` with live data - metrics, releases, contributors, and more. Instead of writing `generated.yaml` by hand, configure a connector in `site.yaml` and use [`fetch`](/cli/fetch) to pull the data automatically.

You can always [author `generated.yaml` manually](/examples/manual-data-example) if your data comes from a source without a built-in connector.

## Available connectors

- [GitHub](/connectors/github) - repository metrics, releases, contributors, and PR data

## Future connectors

We plan to add more connectors over time. If you have an idea for a connector, please [open a feature request](https://github.com/lreading/slide-spec/issues/new).
