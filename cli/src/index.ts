#!/usr/bin/env node

import { CliCommandRunner } from './commands/CliCommandRunner'

const runner = new CliCommandRunner()

runner.run(process.argv.slice(2)).then((exitCode) => {
  process.exitCode = exitCode
}).catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error)
  console.error(message)
  process.exitCode = 1
})
