import { createInterface } from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

export type CliCommandName = 'init' | 'fetch' | 'build' | 'serve' | 'validate' | 'help'

export interface CliPrompter {
  promptCommand(): Promise<CliCommandName>
  promptRequired(label: string): Promise<string>
  promptOptional(label: string): Promise<string | undefined>
  promptBoolean(label: string, defaultValue?: boolean): Promise<boolean | undefined>
  promptNumber(label: string, defaultValue?: number): Promise<number | undefined>
}

export class ReadlineCliPrompter implements CliPrompter {
  public constructor(
    private readonly askQuestion: (question: string) => Promise<string> = async (question: string) => {
      const readline = createInterface({ input, output })

      try {
        return await readline.question(question)
      } finally {
        readline.close()
      }
    },
  ) {}

  public async promptCommand(): Promise<CliCommandName> {
    while (true) {
      const value = await this.ask(
        'Command (init, fetch, build, serve, validate, help): ',
      )
      const normalized = value.trim().toLowerCase()

      if (this.isCommandName(normalized)) {
        return normalized
      }
    }
  }

  public async promptRequired(label: string): Promise<string> {
    while (true) {
      const value = (await this.ask(`${label}: `)).trim()

      if (value.length > 0) {
        return value
      }
    }
  }

  public async promptOptional(label: string): Promise<string | undefined> {
    const value = (await this.ask(`${label}: `)).trim()
    return value.length > 0 ? value : undefined
  }

  public async promptBoolean(label: string, defaultValue?: boolean): Promise<boolean | undefined> {
    const suffix = defaultValue === undefined ? 'y/n' : defaultValue ? 'Y/n' : 'y/N'

    while (true) {
      const value = (await this.ask(`${label} (${suffix}): `)).trim().toLowerCase()

      if (value.length === 0) {
        return defaultValue
      }

      if (value === 'y' || value === 'yes') {
        return true
      }

      if (value === 'n' || value === 'no') {
        return false
      }
    }
  }

  public async promptNumber(label: string, defaultValue?: number): Promise<number | undefined> {
    while (true) {
      const suffix = defaultValue === undefined ? '' : ` [${defaultValue}]`
      const value = (await this.ask(`${label}${suffix}: `)).trim()

      if (value.length === 0) {
        return defaultValue
      }

      const parsed = Number(value)

      if (Number.isFinite(parsed)) {
        return parsed
      }
    }
  }

  private async ask(question: string): Promise<string> {
    return this.askQuestion(question)
  }

  private isCommandName(value: string): value is CliCommandName {
    return ['init', 'fetch', 'build', 'serve', 'validate', 'help'].includes(value)
  }
}
