import { spawn } from 'node:child_process'

export interface ProcessRunnerOptions {
  cwd: string
  env?: NodeJS.ProcessEnv
}

export interface ProcessRunner {
  run(command: string, args: string[], options: ProcessRunnerOptions): Promise<void>
  start(command: string, args: string[], options: ProcessRunnerOptions): Promise<void>
}

function createChild(command: string, args: string[], options: ProcessRunnerOptions) {
  return spawn(command, args, {
    cwd: options.cwd,
    env: {
      ...process.env,
      ...options.env,
    },
    stdio: 'inherit',
    shell: false,
  })
}

export class NodeProcessRunner implements ProcessRunner {
  public async run(command: string, args: string[], options: ProcessRunnerOptions): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      const child = createChild(command, args, options)

      child.once('error', (error) => reject(error))
      child.once('exit', (code, signal) => {
        if (code === 0) {
          resolve()
          return
        }

        reject(new Error(
          `Command "${command}" exited with code ${code ?? 'null'}${signal ? ` (signal: ${signal})` : ''}.`,
        ))
      })
    })
  }

  public async start(command: string, args: string[], options: ProcessRunnerOptions): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      const child = createChild(command, args, options)

      child.once('error', (error) => reject(error))
      child.once('spawn', () => resolve())
    })
  }
}
