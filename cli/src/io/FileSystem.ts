import { access, cp, readFile, stat } from 'node:fs/promises'
import { mkdir, rm, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'

export interface FileSystem {
  fileExists(path: string): Promise<boolean>
  readTextFile(path: string): Promise<string>
  writeTextFile(path: string, content: string): Promise<void>
  directoryExists(path: string): Promise<boolean>
  copyDirectory(source: string, destination: string): Promise<void>
  removeDirectory(path: string): Promise<void>
}

export class NodeFileSystem implements FileSystem {
  public async fileExists(path: string): Promise<boolean> {
    try {
      await access(path)
      return true
    } catch {
      return false
    }
  }

  public async readTextFile(path: string): Promise<string> {
    return readFile(path, 'utf8')
  }

  public async writeTextFile(path: string, content: string): Promise<void> {
    await mkdir(dirname(path), { recursive: true })
    await writeFile(path, content, 'utf8')
  }

  public async directoryExists(path: string): Promise<boolean> {
    try {
      await access(path)
      const stats = await stat(path)
      return stats.isDirectory()
    } catch {
      return false
    }
  }

  public async copyDirectory(source: string, destination: string): Promise<void> {
    await cp(source, destination, { recursive: true })
  }

  public async removeDirectory(path: string): Promise<void> {
    await rm(path, { recursive: true, force: true })
  }
}
