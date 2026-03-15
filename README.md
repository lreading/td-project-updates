# Threat Dragon Quarterly Updates

WORK IN PROGRESS - wildly unstable

Static presentation app for publishing Threat Dragon quarterly updates.

## Requirements

- Node.js 22 or newer
- npm

## Project Structure

- `app/`: Vue 3 + Vite application
- `content/`: YAML content for the site and presentations
- `html/`: source slide templates used to match the presentation styling
- `docs/`: implementation notes
- `scripts/`: supporting scripts for automating data collection from GitHub

## Local Development

1. Install dependencies:
   `cd app && npm install`
2. Start the dev server:
   `npm run dev`
3. Open the local URL shown by Vite.

## Quality Checks

Run from `app/`:

- `npm run verify`
- `npm run coverage`

## Content Model

TODO: Document better, maybe produce a schema

- `content/site.yaml`: site-wide content, links, branding, and home page copy
- `content/presentations/index.yaml`: presentation registry
- `content/presentations/<quarter>/deck.yaml`: authored deck structure and slide content
- `content/presentations/<quarter>/generated.yaml`: generated metrics and release data

