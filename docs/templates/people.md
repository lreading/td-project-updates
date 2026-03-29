# People

Contributor spotlight cards. Each `spotlight` entry is resolved against `generated.contributors.authors[]` for display name and avatar.

<figure class="template-doc-shot">
  <img src="/screenshots/template-people-reference.png" alt="People slide showing contributor spotlight cards with avatars and summaries" />
</figure>

## Example

### Slide (in `presentation.yaml`)

```yaml
- template: people
  enabled: true
  title: Contributor spotlight
  subtitle: Contributors who shaped this cycle
  content:
    banner_prefix: Thanks to
    contributors_link_label: contributors
    banner_suffix: who drove this release forward.
    spotlight:
      - login: ava-product
        summary: Defined the starter-kit structure and led the checklist overhaul.
      - login: mo-rendering
        summary: Improved export polish and PDF spacing.
      - login: ren-docs
        summary: Reworked migration notes for faster team adoption.
```

### Matching data (in `generated.yaml`)

```yaml
generated:
  contributors:
    total: 5
    authors:
      - login: ava-product
        name: Ava Product
        avatar_url: https://avatars.githubusercontent.com/u/1?v=4
        merged_prs: 7
        first_time: false
      - login: mo-rendering
        name: Mo Rendering
        avatar_url: https://avatars.githubusercontent.com/u/2?v=4
        merged_prs: 4
        first_time: false
```

## Data sources

| Region | Source |
| --- | --- |
| Cards | One per `spotlight[]`. Name from matching `authors[].name` (falls back to `login`) |
| Avatar | `authors[].avatar_url` |
| Summary | `spotlight[].summary` |
| GitHub link | `https://github.com/{login}` |
| Banner | `banner_prefix` + linked `{total} {contributors_link_label}` + `banner_suffix` |
| Banner link | `site.links.repository.url/graphs/contributors` |

## Fields

| Field | Required | Type |
| --- | --- | --- |
| `title` | yes | string |
| `subtitle` | | string |
| `content.banner_prefix` | | string |
| `content.contributors_link_label` | | string |
| `content.banner_suffix` | | string |
| `content.spotlight` | yes | array |

### `content.spotlight[]`

| Field | Required | Type |
| --- | --- | --- |
| `login` | yes | string |
| `summary` | yes | string |

If a `login` has no match in `generated.contributors.authors[]`, the card renders using the login as the display name.
