# Progress Timeline

Focuses a single roadmap stage. The progress strip shows all four stages; detail columns show items and themes for the active stage only.

<figure class="template-doc-shot">
  <img src="/screenshots/template-progress-timeline-reference.png" alt="Progress timeline slide showing roadmap stages with the active stage expanded" />
</figure>

## Example

### Slide (in `presentation.yaml`)

```yaml
- template: progress-timeline
  enabled: true
  title: "Roadmap: Completed"
  subtitle: Delivered work
  content:
    stage: completed
```

### Roadmap data (in the same `presentation.yaml`, under `presentation:`)

```yaml
presentation:
  roadmap:
    agenda_label: Roadmap
    deliverables_heading: Key deliverables
    focus_areas_heading: Focus areas
    footer_link_label: View roadmap on GitHub
    sections:
      completed:
        label: Completed
        summary: Work that shipped during this period.
        items:
          - Published a new starter kit for launch checklists.
          - Added exportable PDF summaries.
        themes:
          - category: Operator UX
            target: Make release review easier to audit.
          - category: Exportability
            target: Support polished handoff artifacts.
      in-progress:
        label: In Progress
        summary: Active work continuing into the next cycle.
        items:
          - Hardening permission-aware dashboards.
        themes:
          - category: Access Control
            target: Support larger teams with clearer roles.
      planned:
        label: Planned
        summary: Scoped for the next cycle.
        items:
          - Environment-aware checklists for staging and production.
        themes:
          - category: Templates
            target: Shorten setup time for common patterns.
      future:
        label: Future
        summary: Depends on the current architecture pass.
        items:
          - Shared APIs for third-party integrations.
        themes:
          - category: Integrations
            target: Easier embedding into existing workflows.
```

## Data sources

| Region | Source |
| --- | --- |
| Progress strip | All stages from `presentation.roadmap.sections` |
| Active stage highlight | Matches `content.stage` |
| Deliverables column | `roadmap.deliverables_heading` + `sections.<stage>.items` |
| Focus areas column | `roadmap.focus_areas_heading` + `sections.<stage>.themes` |
| Footer link | `roadmap.footer_link_label` with href `site.links.repository.url` |

If `subtitle` is omitted, the active stage's `summary` is used instead.

## Fields

| Field | Required | Type | Values |
| --- | --- | --- | --- |
| `title` | yes | string | |
| `subtitle` | | string | |
| `content.stage` | yes | string | `completed`, `in-progress`, `planned`, `future` |

The roadmap schema is documented in [presentation.yaml](/schema/presentation#roadmap).
