# Concepts

Slide Spec turns YAML files into a static presentation website. This page explains the core ideas you need to understand before writing your first deck.

## Content directory

Every Slide Spec project has a `content/` directory at its root. This is where all your YAML files live. The CLI reads from this directory, and the build process uses it to generate your site. The structure looks like this:

```
content/
├── site.yaml
├── assets/
│   ├── logo.svg
│   └── mascot.svg
├── presentations/
│   ├── index.yaml
│   └── 2026-spring-update/
│       ├── presentation.yaml
│       └── generated.yaml
```

## Site configuration

`site.yaml` is the global configuration file. It controls branding (logos, mascot, badges), navigation labels, footer links, and page copy that appears across the entire site. You set it up once and it applies to every presentation. See [site.yaml](/schema/site) for the full field reference.

## Presentations

A presentation is a single slide deck. Each presentation gets its own directory under `content/presentations/` and consists of two files: `presentation.yaml` (what you write) and `generated.yaml` (data from a connector or manual entry).

All presentations are registered in `content/presentations/index.yaml`, which controls what appears on the presentations list page. The index tracks each presentation's title, subtitle, summary, and whether it's published or featured.

## The presentation/generated split

This is the most important design decision in Slide Spec. Your authored content (slide titles, copy, roadmap, spotlights) lives in `presentation.yaml`. Data-driven content (metrics, releases, contributors) lives in `generated.yaml`. This separation means you can re-fetch updated numbers from a connector without touching your slides, and your slide copy is never overwritten by automation.

## Templates

Every slide uses a template that determines its layout. Templates range from simple (a title slide, a closing message) to data-driven (release timelines, metric dashboards). You pick a template by setting the `template` field on each slide, then fill in the `content` block with the fields that template expects. See [templates](/templates/) for the full list and field requirements.

## Slides

Slides are entries in the `presentation.slides` array. Each slide has a `template`, an `enabled` flag, an optional `title` and `subtitle`, and a `content` block whose shape depends on the template. Disabled slides are skipped during rendering but preserved in the YAML for future use.

## Connectors

Connectors are data sources that populate `generated.yaml` automatically. Configure a connector in `site.yaml` and use the `fetch` command to pull live data. If your data comes from a source without a built-in connector, you can always write `generated.yaml` by hand. See [connectors](/connectors/) for available options.

## Validation

The CLI includes a `validate` command that checks all your YAML against the schema. It catches missing required fields, type mismatches, cross-file inconsistencies (like a presentation id not matching between `index.yaml` and `presentation.yaml`), and template-specific content requirements. Run it after editing and before building. See [validate](/cli/validate) for details.
