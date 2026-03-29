# AI-Friendly Docs

Entry points for tools: [`/llms.txt`](/llms.txt), [`/sitemap.xml`](/sitemap.xml), and stable URLs under each section.

Schema pages name every field. Template pages separate shared chrome from template-specific content. Examples use copy-pasteable YAML.

When using these docs with an AI tool, avoid inferring:

- Which fields are required vs optional (check the tables)
- Default behavior for omitted keys
- Whether `generated.yaml` was hand-written or fetched
- Which file a template reads a value from (check the data sources table on each template page)
