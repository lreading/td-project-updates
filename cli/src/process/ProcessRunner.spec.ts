import { describe, expect, it } from 'vitest'

import { NodeProcessRunner } from './ProcessRunner'

describe('NodeProcessRunner', () => {
  const runner = new NodeProcessRunner()

  it('runs a command and resolves on exit code 0', async () => {
    await expect(runner.run(
      process.execPath,
      ['-e', 'process.exit(0)'],
      { cwd: process.cwd() },
    )).resolves.toBeUndefined()
  })

  it('rejects when a command exits non-zero', async () => {
    await expect(runner.run(
      process.execPath,
      ['-e', 'process.exit(2)'],
      { cwd: process.cwd() },
    )).rejects.toThrow('Command')
  })

  it('rejects when a command exits due to a signal', async () => {
    await expect(runner.run(
      process.execPath,
      ['-e', 'process.kill(process.pid, "SIGTERM")'],
      { cwd: process.cwd() },
    )).rejects.toThrow('signal: SIGTERM')
  })

  it('starts a long-running command and resolves after spawn', async () => {
    await expect(runner.start(
      process.execPath,
      ['-e', 'setTimeout(() => process.exit(0), 50)'],
      { cwd: process.cwd() },
    )).resolves.toBeUndefined()
  })

  it('rejects when a command cannot be spawned', async () => {
    await expect(runner.start(
      '__td_missing_command__',
      [],
      { cwd: process.cwd() },
    )).rejects.toBeInstanceOf(Error)
  })
})
