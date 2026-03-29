# Action Cards

Grid of CTA cards with an optional footer strip.

<figure class="template-doc-shot">
  <img src="/screenshots/template-action-cards-reference.png" alt="Action cards slide showing three CTA cards with descriptions and links" />
</figure>

## Example

```yaml
- template: action-cards
  enabled: true
  title: How to help
  subtitle: Ways to support the next cycle
  content:
    footer_text: Contribution options stay lightweight on purpose.
    cards:
      - title: Review docs
        description: Tighten rollout notes and operator checklists.
        url_label: Open docs backlog
        url: https://example.com/docs/backlog
      - title: Test templates
        description: Run a project through the starter kit and note anything unclear.
        url_label: Report feedback
        url: https://example.com/feedback/templates
      - title: Improve exports
        description: Review PDFs and suggest spacing or readability improvements.
        url_label: Share feedback
        url: https://example.com/feedback/exports
```

## Data sources

| Region | Source |
| --- | --- |
| Cards | `content.cards[]`: `title`, `description`, `url_label` / `url` |
| Footer strip | Shown if `footer_text` or `site.links.repository` exists |
| Footer text | `content.footer_text` |
| Footer button | `site.links.repository.label` / `site.links.repository.url` |

## Fields

| Field | Required | Type |
| --- | --- | --- |
| `title` | yes | string |
| `subtitle` | | string |
| `content.footer_text` | | string |
| `content.cards` | yes | array |

### `content.cards[]`

| Field | Required | Type |
| --- | --- | --- |
| `title` | yes | string |
| `description` | yes | string |
| `url_label` | yes | string |
| `url` | yes | string |
