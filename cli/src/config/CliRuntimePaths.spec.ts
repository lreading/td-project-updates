import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { resolve } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'

import { resolveCliRoot } from './CliRuntimePaths'

function createCliRoot(basePath: string): string {
  mkdirSync(basePath, { recursive: true })
  writeFileSync(resolve(basePath, 'package.json'), '{"name":"test-cli"}', 'utf8')
  writeFileSync(resolve(basePath, '.env.example'), 'GITHUB_PAT=', 'utf8')
  return basePath
}

describe('resolveCliRoot', () => {
  const tempRoots: string[] = []

  afterEach(() => {
    tempRoots.splice(0).forEach((path) => {
      rmSync(path, { recursive: true, force: true })
    })
  })

  it('prefers the CLI root derived from the module path over the caller working directory', () => {
    const tempRoot = mkdtempSync(resolve(tmpdir(), 'td-cli-runtime-'))
    tempRoots.push(tempRoot)

    const moduleCliRoot = createCliRoot(resolve(tempRoot, 'repo', 'cli'))
    createCliRoot(resolve(tempRoot, 'elsewhere'))

    expect(
      resolveCliRoot(
        resolve(tempRoot, 'elsewhere'),
        `file://${resolve(moduleCliRoot, 'dist', 'index.js')}`,
      ),
    ).toBe(moduleCliRoot)
  })

  it('falls back to the caller working directory when the module path does not resolve to a CLI root', () => {
    const tempRoot = mkdtempSync(resolve(tmpdir(), 'td-cli-runtime-'))
    tempRoots.push(tempRoot)

    const workingDirectoryCliRoot = createCliRoot(resolve(tempRoot, 'workspace', 'cli'))

    expect(
      resolveCliRoot(
        resolve(workingDirectoryCliRoot, 'dist'),
        `file://${resolve(tempRoot, 'missing', 'dist', 'index.js')}`,
      ),
    ).toBe(workingDirectoryCliRoot)
  })

  it('returns the current working directory when no CLI root markers are found', () => {
    const tempRoot = mkdtempSync(resolve(tmpdir(), 'td-cli-runtime-'))
    tempRoots.push(tempRoot)

    const currentWorkingDirectory = resolve(tempRoot, 'workspace')
    mkdirSync(currentWorkingDirectory, { recursive: true })

    expect(
      resolveCliRoot(
        currentWorkingDirectory,
        `file://${resolve(tempRoot, 'missing', 'dist', 'index.js')}`,
      ),
    ).toBe(currentWorkingDirectory)
  })
})
