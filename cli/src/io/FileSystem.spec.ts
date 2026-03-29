import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

import { afterEach, describe, expect, it } from 'vitest'

import { NodeFileSystem } from './FileSystem'

describe('NodeFileSystem', () => {
  const temporaryDirectories: string[] = []

  afterEach(async () => {
    await Promise.all(temporaryDirectories.map(async (directory) => rm(directory, { force: true, recursive: true })))
    temporaryDirectories.length = 0
  })

  it('reports whether a file exists and reads text files', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'td-cli-fs-'))
    temporaryDirectories.push(directory)

    const filePath = join(directory, 'sample.txt')
    await writeFile(filePath, 'hello world', 'utf8')

    const fileSystem = new NodeFileSystem()

    await expect(fileSystem.fileExists(filePath)).resolves.toBe(true)
    await expect(fileSystem.fileExists(join(directory, 'missing.txt'))).resolves.toBe(false)
    await expect(fileSystem.readTextFile(filePath)).resolves.toBe('hello world')

    const nestedFilePath = join(directory, 'nested', 'written.txt')
    await fileSystem.writeTextFile(nestedFilePath, 'written content')
    await expect(fileSystem.readTextFile(nestedFilePath)).resolves.toBe('written content')
  })

  it('copies directories and reports whether a directory exists', async () => {
    const tempDir = await mkdtemp(join(tmpdir(), 'td-cli-fs-copy-'))
    temporaryDirectories.push(tempDir)

    const sourceDir = join(tempDir, 'source')
    const destDir = join(tempDir, 'dest')
    await mkdir(join(sourceDir, 'subdir'), { recursive: true })
    await writeFile(join(sourceDir, 'subdir', 'file.txt'), 'copied content', 'utf8')

    const fileSystem = new NodeFileSystem()

    await fileSystem.copyDirectory(sourceDir, destDir)

    await expect(fileSystem.fileExists(join(destDir, 'subdir', 'file.txt'))).resolves.toBe(true)
    await expect(fileSystem.directoryExists(destDir)).resolves.toBe(true)
    await expect(fileSystem.directoryExists(join(tempDir, 'nonexistent'))).resolves.toBe(false)
  })

  it('removes directories recursively', async () => {
    const tempDir = await mkdtemp(join(tmpdir(), 'td-cli-fs-rm-'))
    temporaryDirectories.push(tempDir)

    const targetDir = join(tempDir, 'target')
    await mkdir(join(targetDir, 'nested'), { recursive: true })
    await writeFile(join(targetDir, 'nested', 'file.txt'), 'to be deleted', 'utf8')

    const fileSystem = new NodeFileSystem()

    await expect(fileSystem.directoryExists(targetDir)).resolves.toBe(true)
    await fileSystem.removeDirectory(targetDir)
    await expect(fileSystem.directoryExists(targetDir)).resolves.toBe(false)
  })
})
