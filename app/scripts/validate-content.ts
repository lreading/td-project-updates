import { readdir, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import { parse } from 'yaml'

import { ContentValidator } from '../src/content/ContentValidator'

class ContentValidationRunner {
  private readonly repoRoot = resolve(process.cwd(), '..')
  private readonly contentRoot = resolve(this.repoRoot, 'content')
  private readonly validator = new ContentValidator()

  public async run(): Promise<void> {
    const siteDocument = await this.readYaml(resolve(this.contentRoot, 'site.yaml'))
    this.validator.validateSiteDocument(siteDocument)

    const indexDocument = await this.readYaml(resolve(this.contentRoot, 'presentations', 'index.yaml'))
    this.validator.validatePresentationIndexDocument(indexDocument)

    for (const entry of indexDocument.presentations) {
      const presentationRoot = resolve(this.contentRoot, 'presentations', entry.id)
      const presentationDocument = await this.readYaml(resolve(presentationRoot, 'presentation.yaml'))
      const generatedDocument = await this.readYaml(resolve(presentationRoot, 'generated.yaml'))

      this.validator.validatePresentationDocument(presentationDocument)
      this.validator.validateGeneratedDocument(generatedDocument)
      this.validator.validatePresentationRecordConsistency(
        entry,
        presentationDocument.presentation,
        generatedDocument.generated,
      )
    }

    const presentationDirectories = await this.listPresentationDirectories()
    const indexedIds = new Set(indexDocument.presentations.map((entry) => entry.id))
    presentationDirectories.forEach((directory) => {
      if (!indexedIds.has(directory)) {
        throw new Error(`Presentation directory "${directory}" is missing from content/presentations/index.yaml.`)
      }
    })
  }

  private async listPresentationDirectories(): Promise<string[]> {
    const entries = await readdir(resolve(this.contentRoot, 'presentations'), {
      withFileTypes: true,
    })

    return entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort((left, right) => left.localeCompare(right))
  }

  private async readYaml(path: string): Promise<unknown> {
    return parse(await readFile(path, 'utf8'))
  }
}

const runner = new ContentValidationRunner()

runner.run().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error)
  console.error(message)
  process.exitCode = 1
})
