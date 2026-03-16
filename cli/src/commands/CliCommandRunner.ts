import { TdCliApplicationService } from '../application/TdCliApplicationService'

import type { TdCliService } from '../application/TdCliService'

export interface CliOutput {
  info(message: string): void
  error(message: string): void
}

interface CommandOptions {
  [key: string]: string | boolean | undefined
}

export class CliCommandRunner {
  public constructor(
    private readonly service: TdCliService = new TdCliApplicationService(),
    private readonly output: CliOutput = console,
  ) {}

  public async run(argv: string[]): Promise<number> {
    const command = argv[0]

    if (!command || command === 'help' || command === '--help' || command === '-h') {
      this.output.info(this.getHelpText())
      return 0
    }

    try {
      switch (command) {
        case 'init':
          await this.runInit(argv.slice(1))
          return 0
        case 'fetch':
          await this.runFetch(argv.slice(1))
          return 0
        case 'build':
          this.assertNoArgs(argv.slice(1), 'build')
          await this.runBuild()
          return 0
        case 'serve':
          await this.runServe(argv.slice(1))
          return 0
        case 'validate':
          await this.runValidate(argv.slice(1))
          return 0
        default:
          throw new Error(`Unknown command "${command}".`)
      }
    } catch (error) {
      this.output.error(error instanceof Error ? error.message : String(error))
      return 1
    }
  }

  private async runInit(args: string[]): Promise<void> {
    const options = this.parseOptions(args)
    const force = this.readBooleanOption(options, 'force')
    const toDate = this.readStringOption(options, 'to-date')
    const summary = this.readStringOption(options, 'summary')
    const result = await this.service.initPresentation({
      presentationId: this.requireStringOption(options, 'presentation-id'),
      title: this.requireStringOption(options, 'title'),
      subtitle: this.requireStringOption(options, 'subtitle'),
      fromDate: this.requireStringOption(options, 'from-date'),
      ...(toDate !== undefined ? { toDate } : {}),
      ...(summary !== undefined ? { summary } : {}),
      ...(force !== undefined ? { force } : {}),
    })
    this.output.info(`Initialized ${result.presentationId}`)
  }

  private async runFetch(args: string[]): Promise<void> {
    const options = this.parseOptions(args)
    const presentationId = this.requireStringOption(options, 'presentation-id')
    const write = this.readBooleanOption(options, 'dry-run') ? false : undefined
    const toDate = this.readStringOption(options, 'to-date')
    const noPreviousPeriod = this.readBooleanOption(options, 'no-previous-period')
    const result = await this.service.fetchPresentationData({
      fromDate: this.requireStringOption(options, 'from-date'),
      ...(toDate !== undefined ? { toDate } : {}),
      presentationId,
      ...(noPreviousPeriod !== undefined ? { noPreviousPeriod } : {}),
      ...(write !== undefined ? { write } : {}),
    })
    this.output.info(`Fetched ${result.presentationId}`)
  }

  private async runBuild(): Promise<void> {
    const result = await this.service.buildSite({ mode: 'production' })
    this.output.info(`Built site to ${result.outputPath}`)
  }

  private async runServe(args: string[]): Promise<void> {
    const options = this.parseOptions(args)
    const host = this.readStringOption(options, 'host')
    const port = this.readNumberOption(options, 'port')
    const open = this.readBooleanOption(options, 'open')
    const result = await this.service.serveSite({
      ...(host !== undefined ? { host } : {}),
      ...(port !== undefined ? { port } : {}),
      ...(open !== undefined ? { open } : {}),
    })
    this.output.info(`Serving at ${result.url}`)
  }

  private async runValidate(args: string[]): Promise<void> {
    const options = this.parseOptions(args)
    const strict = this.readBooleanOption(options, 'strict')
    const result = await this.service.validateContent({
      ...(strict !== undefined ? { strict } : {}),
    })
    this.output.info(result.valid ? 'Content is valid' : 'Content validation failed')
  }

  private assertNoArgs(args: string[], command: string): void {
    if (args.length > 0) {
      throw new Error(`Command "${command}" does not accept positional arguments.`)
    }
  }

  private parseOptions(args: string[]): CommandOptions {
    const options: CommandOptions = {}

    for (let index = 0; index < args.length; index += 1) {
      const argument = args[index]
      if (!argument?.startsWith('--')) {
        throw new Error(`Unexpected argument "${argument}".`)
      }

      const key = argument.slice(2)
      const nextValue = args[index + 1]
      if (!nextValue || nextValue.startsWith('--')) {
        options[key] = true
        continue
      }

      options[key] = nextValue
      index += 1
    }

    return options
  }

  private requireStringOption(options: CommandOptions, key: string): string {
    const value = this.readStringOption(options, key)
    if (value === undefined) {
      throw new Error(`Missing required option "--${key}".`)
    }

    return value
  }

  private readNumberOption(options: CommandOptions, key: string): number | undefined {
    const value = options[key]
    if (value === undefined || typeof value === 'boolean') {
      return undefined
    }

    const parsed = Number(value)
    if (!Number.isFinite(parsed)) {
      throw new Error(`Option "--${key}" must be a number.`)
    }

    return parsed
  }

  private readStringOption(options: CommandOptions, key: string): string | undefined {
    const value = options[key]
    return typeof value === 'string' ? value : undefined
  }

  private readBooleanOption(options: CommandOptions, key: string): boolean | undefined {
    const value = options[key]
    return typeof value === 'boolean' ? value : undefined
  }

  private getHelpText(): string {
    return [
      'Usage: td-updates <command> [options]',
      '',
      'Commands:',
      '  init --presentation-id <id> --title <title> --subtitle <subtitle> --from-date <YYYY-MM-DD> [--to-date <YYYY-MM-DD>] [--summary <summary>] [--force]',
      '  fetch --presentation-id <id> --from-date <YYYY-MM-DD> [--to-date <YYYY-MM-DD>] [--no-previous-period] [--dry-run]',
      '  build',
      '  serve [--host <host>] [--port <port>] [--open]',
      '  validate [--strict]',
    ].join('\n')
  }
}
