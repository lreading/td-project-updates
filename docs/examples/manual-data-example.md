# Manual Data

Slide Spec does not require a connector. Author `generated.yaml` yourself when metrics come from spreadsheets, internal tools, or other systems.

## When to use this

- Internal briefings with data from Jira, Linear, or other trackers
- Repos hosted outside GitHub
- Any pipeline that exports numbers you can map into the schema

## Workflow

1. Run [`init`](/cli/init)
2. Edit `site.yaml`, `presentations/index.yaml`, and `presentation.yaml`
3. Write `generated.yaml` by hand (or generate it from your own pipeline)
4. Run [`validate`](/cli/validate), then [`build`](/cli/build) or [`serve`](/cli/serve)

## Example `generated.yaml` snippet

Metric ids are arbitrary. Use whatever fits your data source:

```yaml
generated:
  id: 2026-spring-briefing
  period:
    start: 2026-03-01
    end: 2026-05-31
  stats:
    issues_closed:
      label: Issues closed
      current: 14
      previous: 9
      delta: 5
      metadata:
        comparison_status: complete
        warning_codes: []
  releases: []
  contributors:
    total: 0
    authors: []
```

For the full shape, see the [generated.yaml schema](/schema/generated) or the [reference fixture](https://github.com/lreading/slide-spec/blob/main/docs/fixtures/reference-project/content/presentations/2026-spring-briefing/generated.yaml).

## Assets

Prefer local files under `content/assets/`. HTTPS URLs work when you need a hosted image:

```yaml
site:
  presentation_logo:
    url: https://cdn.example.com/brand/logo.svg
    alt: Company logo
```
