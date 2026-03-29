# Metrics and Links

Two-column layout: authored mention cards on the left, metric tiles on the right. Metrics are pulled from `generated.stats` by key.

<figure class="template-doc-shot">
  <img src="/screenshots/template-metrics-and-links-reference.png" alt="Metrics and links slide showing mention cards and stat tiles" />
</figure>

## Example

### Slide (in `presentation.yaml`)

```yaml
- template: metrics-and-links
  enabled: true
  title: Community activity
  subtitle: Signals from generated data and authored references
  content:
    section_heading: External signals
    stats_heading: This period
    trend_suffix: vs previous period
    show_deltas: true
    stat_keys:
      - stars
      - issues_closed
      - prs_merged
      - new_contributors
    mentions:
      - type: Case study
        title: The rollout playbook now includes the new checklist workflow.
        url_label: Read the guide
        url: https://example.com/docs/rollout-playbook
      - type: Community post
        title: Release overview on how teams use templates for consistent briefings.
        url_label: Read the announcement
        url: https://example.com/blog/spring-release
```

### Matching data (in `generated.yaml`)

```yaml
generated:
  stats:
    stars:
      label: GitHub Stars
      current: 1840
      previous: 1760
      delta: 80
      metadata:
        comparison_status: complete
        warning_codes: []
    issues_closed:
      label: Issues closed
      current: 14
      previous: 9
      delta: 5
      metadata:
        comparison_status: complete
        warning_codes: []
```

## Data sources

| Region | Source |
| --- | --- |
| Mentions column | `content.section_heading` + `mentions[]` |
| Mention cards | `type` (eyebrow), `title`, optional `url_label` + `url` |
| Stats column | `content.stats_heading` + one tile per `stat_keys[]` |
| Metric tiles | `generated.stats.<key>`: `label`, `current`, `previous`, `delta` |
| Trend line | Shown when `show_deltas` is true. Uses `delta`/`previous` + `trend_suffix` |

## Fields

| Field | Required | Type |
| --- | --- | --- |
| `title` | yes | string |
| `subtitle` | | string |
| `content.stat_keys` | yes | string[] |
| `content.mentions` | yes | array |
| `content.section_heading` | | string |
| `content.stats_heading` | | string |
| `content.show_deltas` | | boolean |
| `content.trend_suffix` | | string |

### `content.mentions[]`

| Field | Required | Type |
| --- | --- | --- |
| `type` | yes | string |
| `title` | yes | string |
| `url_label` | | string |
| `url` | | string |

`url` and `url_label` are paired: set both or omit both. Mentions without links render as plain text cards.
