# Agenda

Auto-generated table of contents. Each row comes from a later enabled slide in the deck. No `content` block needed.

<figure class="template-doc-shot">
  <img src="/screenshots/template-agenda-reference.png" alt="Agenda slide showing a list of upcoming slides" />
</figure>

## Example

```yaml
- template: agenda
  enabled: true
  title: Agenda
  subtitle: What this briefing covers
```

## How rows are generated

Row labels come from each subsequent enabled slide's `title`. Two exceptions:

- **Closing** slides use `content.heading` when `title` is omitted
- The first **progress-timeline** slide uses `presentation.roadmap.agenda_label` instead of its `title`

## Fields

| Field | Required | Type |
| --- | --- | --- |
| `title` | yes | string |
| `subtitle` | | string |
| `content` | | Omit or `{}` |
