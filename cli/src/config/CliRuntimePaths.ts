import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

function isCliRoot(path: string): boolean {
  return existsSync(resolve(path, 'package.json'))
    && existsSync(resolve(path, '.env.example'))
  }

function findCliRoot(startPath: string): string | undefined {
  let currentPath = resolve(startPath)

  while (true) {
    if (isCliRoot(currentPath)) {
      return currentPath
    }

    const parentPath = dirname(currentPath)

    if (parentPath === currentPath) {
      return undefined
    }

    currentPath = parentPath
  }
}

export function resolveCliRoot(currentWorkingDirectory: string, moduleUrl: string): string {
  const fromModuleDirectory = findCliRoot(dirname(fileURLToPath(moduleUrl)))

  if (fromModuleDirectory) {
    return fromModuleDirectory
  }

  const fromWorkingDirectory = findCliRoot(currentWorkingDirectory)

  if (fromWorkingDirectory) {
    return fromWorkingDirectory
  }

  return currentWorkingDirectory
}
