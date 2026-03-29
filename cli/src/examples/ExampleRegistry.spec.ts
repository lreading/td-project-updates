import { mkdir, mkdtemp, rm } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { tmpdir } from 'node:os'

import { afterEach, describe, expect, it } from 'vitest'

import { ExampleRegistry } from './ExampleRegistry'
import { CliPackagePaths } from '../runtime/CliPackagePaths'

const temporaryDirectories: string[] = []

afterEach(async () => {
  await Promise.all(temporaryDirectories.map((dir) => rm(dir, { recursive: true, force: true })))
  temporaryDirectories.length = 0
})

describe('ExampleRegistry', () => {
  it('returns all 4 examples from getAll()', () => {
    const registry = new ExampleRegistry(new CliPackagePaths('/fake-root'))
    const all = registry.getAll()

    expect(all).toHaveLength(4)
    expect(all.map((e) => e.id)).toEqual([
      'open-source-update',
      'product-review',
      'security-posture',
      'community-update',
    ])
  })

  it('finds examples by id and returns undefined for unknown ids', () => {
    const registry = new ExampleRegistry(new CliPackagePaths('/fake-root'))

    expect(registry.findById('open-source-update')).toMatchObject({ id: 'open-source-update' })
    expect(registry.findById('product-review')).toMatchObject({ id: 'product-review' })
    expect(registry.findById('security-posture')).toMatchObject({ id: 'security-posture' })
    expect(registry.findById('community-update')).toMatchObject({ id: 'community-update' })
    expect(registry.findById('not-a-real-example')).toBeUndefined()
  })

  it('resolves content paths that include the example id', async () => {
    const tempDir = await mkdtemp(join(tmpdir(), 'td-cli-example-registry-'))
    temporaryDirectories.push(tempDir)

    await mkdir(resolve(tempDir, 'examples-synced'), { recursive: true })

    const packagePaths = new CliPackagePaths(tempDir)
    const registry = new ExampleRegistry(packagePaths)

    const contentPath = registry.resolveContentPath('open-source-update')
    expect(contentPath).toContain('open-source-update')
    expect(contentPath).toBe(resolve(tempDir, 'examples-synced', 'open-source-update'))
  })
})
