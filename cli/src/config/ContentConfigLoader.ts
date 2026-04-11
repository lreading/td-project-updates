import { ContentValidator } from '../../../shared/src/content-validator'
import { YamlReader } from '../io/YamlReader'

import type { FileSystemPaths } from '../io/FileSystemPaths'
import type { SiteConfig } from './Config.types'

export class ContentConfigLoader {
  public constructor(
    private readonly yamlReader: YamlReader = new YamlReader(),
    private readonly contentValidator: ContentValidator = new ContentValidator(),
  ) {}

  public async loadSiteConfig(paths: FileSystemPaths): Promise<SiteConfig> {
    const document = await this.yamlReader.readDocument(paths.getSiteConfigPath())
    this.contentValidator.validateSiteDocument(document)
    return (document as { site: Record<string, unknown> }).site as unknown as SiteConfig
  }
}
