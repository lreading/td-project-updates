import { resolve } from 'node:path'
import { CliPackagePaths } from '../runtime/CliPackagePaths'

export interface ExampleDefinition {
  id: string
  label: string
  description: string
}

const EXAMPLES: ExampleDefinition[] = [
  { id: 'open-source-update', label: 'Open Source Update', description: 'Quarterly open source community update with releases, contributors, and roadmap' },
  { id: 'product-review', label: 'Product Review', description: 'Product management quarterly review with milestones, epics, and customer feedback' },
  { id: 'security-posture', label: 'Security Posture', description: 'Security team readout with vulnerabilities, patches, and compliance metrics' },
  { id: 'community-update', label: 'Community Update', description: 'Community and DevRel team update with events, engagement, and champion spotlights' },
]

export class ExampleRegistry {
  public constructor(private readonly packagePaths: CliPackagePaths = new CliPackagePaths()) {}

  public getAll(): ExampleDefinition[] {
    return [...EXAMPLES]
  }

  public findById(id: string): ExampleDefinition | undefined {
    return EXAMPLES.find((example) => example.id === id)
  }

  public resolveContentPath(id: string): string {
    return resolve(this.packagePaths.getExamplesRoot(), id)
  }
}
