# presentation.yaml

Defines the authored slide content and deck structure.

For a complete example, see the [reference presentation.yaml](https://github.com/lreading/slide-spec/blob/main/docs/fixtures/reference-project/content/presentations/2026-spring-briefing/presentation.yaml).

## Top level

| Field | Required | Type | Description |
| --- | --- | --- | --- |
| `presentation.id` | yes | string | Matches the directory name and index entry |
| `presentation.title` | yes | string | Deck title |
| `presentation.subtitle` | yes | string | Deck subtitle |
| `presentation.year` | | number | Optional year |
| `presentation.roadmap` | | object | Roadmap data for progress-timeline slides |
| `presentation.slides` | yes | array | Ordered list of slides |

## Roadmap

When present, `roadmap` provides data for [progress-timeline](/templates/progress-timeline) slides and the agenda's roadmap row.

| Field | Required | Type |
| --- | --- | --- |
| `roadmap.agenda_label` | | string |
| `roadmap.deliverables_heading` | | string |
| `roadmap.focus_areas_heading` | | string |
| `roadmap.footer_link_label` | | string |
| `roadmap.sections` | yes | object |

### `roadmap.sections`

Must contain exactly four keys:

| Key | Required |
| --- | --- |
| `completed` | yes |
| `in-progress` | yes |
| `planned` | yes |
| `future` | yes |

Each section:

| Field | Required | Type |
| --- | --- | --- |
| `label` | yes | string |
| `summary` | yes | string |
| `items` | yes | string[] |
| `themes` | yes | array of `{ category, target }` |

Each `themes[]` entry has `category` (string, required) and `target` (string, required).

## Slides

Each slide in the `slides` array:

| Field | Required | Type | Description |
| --- | --- | --- | --- |
| `template` | yes | string | One of the [nine template ids](/templates/) |
| `enabled` | yes | boolean | Disabled slides are skipped |
| `title` | varies | string | Required by most templates |
| `subtitle` | | string | Optional on all templates |
| `content` | varies | object | Shape depends on `template`. Required for all except `agenda` |

## Template content validation

Each template enforces specific rules on `title` and `content`. Full authoring details are on each [template page](/templates/). The tables below summarize what the validator requires.

### hero

| Field | Required | Notes |
| --- | --- | --- |
| `content.title_primary` | | At least one of `title_primary` or `title_accent` required |
| `content.title_accent` | | |
| `content.subtitle_prefix` | | |
| `content.quote` | | |

Slide-level `title` is not required.

### agenda

| Field | Required | Notes |
| --- | --- | --- |
| `title` | yes | |
| `content` | | Omit entirely or pass `{}`. Row text comes from other slides |

### section-list-grid

| Field | Required |
| --- | --- |
| `title` | yes |
| `content.sections` | yes |

Each `sections[]` entry: `{ title: string, bullets: string[] }`.

### timeline

| Field | Required | Notes |
| --- | --- | --- |
| `title` | yes | |
| `content.featured_release_ids` | yes | Array of release id strings (can be empty) |
| `content.latest_badge_label` | | |
| `content.footer_link_label` | | |
| `content.empty_state_title` | | |
| `content.empty_state_message` | | |

### progress-timeline

| Field | Required | Notes |
| --- | --- | --- |
| `title` | yes | |
| `content.stage` | yes | `completed`, `in-progress`, `planned`, or `future` |

### people

| Field | Required |
| --- | --- |
| `title` | yes |
| `content.spotlight` | yes |
| `content.banner_prefix` | |
| `content.contributors_link_label` | |
| `content.banner_suffix` | |

Each `spotlight[]` entry: `{ login: string, summary: string }`.

### metrics-and-links

| Field | Required |
| --- | --- |
| `title` | yes |
| `content.stat_keys` | yes |
| `content.mentions` | yes |
| `content.section_heading` | |
| `content.stats_heading` | |
| `content.show_deltas` | |
| `content.trend_suffix` | |

Each `mentions[]` entry: `{ type: string, title: string }` with optional paired `url` + `url_label`.

### action-cards

| Field | Required |
| --- | --- |
| `title` | yes |
| `content.cards` | yes |
| `content.footer_text` | |

Each `cards[]` entry: `{ title, description, url_label, url }` (all required strings).

### closing

| Field | Required | Notes |
| --- | --- | --- |
| `content.heading` | yes | |
| `content.message` | yes | |
| `content.quote` | | |

Slide-level `title` is not required.
