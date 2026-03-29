import { cp, mkdir, readdir, rm } from 'node:fs/promises'
import { resolve } from 'node:path'

class ExamplesSync {
  private readonly repoRoot = resolve(import.meta.dirname, '..', '..')
  private readonly cliRoot = resolve(this.repoRoot, 'cli')
  private readonly examplesRoot = resolve(this.repoRoot, 'examples')

  public async run(): Promise<void> {
    const outputRoot = this.readOutputRoot()

    await rm(outputRoot, { recursive: true, force: true })
    await mkdir(outputRoot, { recursive: true })

    const entries = await readdir(this.examplesRoot, { withFileTypes: true })
    const exampleDirs = entries.filter((entry) => entry.isDirectory())

    for (const dir of exampleDirs) {
      const contentSource = resolve(this.examplesRoot, dir.name, 'content')
      const contentDest = resolve(outputRoot, dir.name)
      await cp(contentSource, contentDest, { recursive: true })
    }
  }

  private readOutputRoot(): string {
    const outFlagIndex = process.argv.findIndex((arg) => arg === '--out')
    const relativeOutput = outFlagIndex >= 0 ? process.argv[outFlagIndex + 1] : undefined

    if (!relativeOutput) {
      throw new Error('Missing required --out <path> argument.')
    }

    return resolve(this.cliRoot, relativeOutput)
  }
}

const sync = new ExamplesSync()

sync.run().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error))
  process.exitCode = 1
})
