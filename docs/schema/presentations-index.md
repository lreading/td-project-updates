# presentations/index.yaml

Controls what appears on the presentations list page.

## Example

```yaml
presentations:
  - id: 2026-spring-briefing
    year: 2026
    title: Acorn Cloud Product Brief
    subtitle: Spring 2026
    summary: Reliability work, platform roadmap, and team highlights.
    published: true
    featured: true
```

## Field reference

| Field | Required | Type | Description |
| --- | --- | --- | --- |
| `presentations` | yes | array | List of presentation entries |

### `presentations[]`

| Field | Required | Type | Description |
| --- | --- | --- | --- |
| `id` | yes | string | Unique across the file |
| `title` | yes | string | Must match the presentation's `presentation.yaml` |
| `subtitle` | yes | string | Must match the presentation's `presentation.yaml` |
| `summary` | yes | string | Shown on the presentations list page |
| `published` | yes | boolean | Controls visibility |
| `featured` | yes | boolean | Highlights on the home page |
| `year` | | number | Enables year filtering on the list page |

## Consistency rules

The `id`, `title`, and `subtitle` in each index entry must match the corresponding `presentation.yaml`. If both the index entry and presentation define `year`, those must match too.
