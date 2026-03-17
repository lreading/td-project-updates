import { TdCliApplicationService } from '../application/TdCliApplicationService'
import { ReadlineCliPrompter } from './CliPrompter'

import type { TdCliService } from '../application/TdCliService'
import type { CliCommandName, CliPrompter } from './CliPrompter'

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
    private readonly prompter: CliPrompter = new ReadlineCliPrompter(),
  ) {}

  public async run(argv: string[]): Promise<number> {
    if (argv.length === 0) {
      try {
        const command = await this.runInteractive()

        if (command === 'help') {
          this.output.info(this.getHelpText())
        }

        return 0
      } catch (error) {
        this.output.error(error instanceof Error ? error.message : String(error))
        return 1
      }
    }

    const command = argv[0]

    if (command === 'help' || command === '--help' || command === '-h') {
      const topic = argv[1]
      this.output.info(this.getHelpText(topic))
      return 0
    }

    try {
      if (this.hasHelpFlag(argv.slice(1))) {
        this.output.info(this.getHelpText(command))
        return 0
      }

      switch (command) {
        case 'init':
          if (argv.slice(1).length === 0) {
            await this.runInteractiveInit()
            return 0
          }
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

  private async runInteractive(): Promise<CliCommandName> {
    this.output.info('No command provided. Starting interactive mode.')
    this.output.info(this.getCommandOverviewText())
    this.output.info('Choose the command you want to run.')
    const command = await this.prompter.promptCommand()

    switch (command) {
      case 'init': {
        this.output.info(this.getHelpText('init'))
        await this.runInteractiveInit()
        break
      }
      case 'fetch': {
        this.output.info(this.getHelpText('fetch'))
        const presentationId = await this.promptRequired(
          'Target presentation id to update. This must already exist under content/presentations/.',
          'Presentation id',
        )
        const fromDate = await this.promptRequired(
          'Reporting-period start date in YYYY-MM-DD format.',
          'From date (YYYY-MM-DD)',
        )
        const toDate = await this.promptOptional(
          'Reporting-period end date in YYYY-MM-DD format. Leave blank to use today.',
          'To date (YYYY-MM-DD, optional)',
        )
        const noPreviousPeriod = await this.promptBoolean(
          'Skip previous-period comparison and force previous values to 0.',
          'Disable previous-period comparison',
          false,
        )
        const dryRun = await this.promptBoolean(
          'Compute data without writing generated.yaml.',
          'Dry run',
          false,
        )

        const result = await this.service.fetchPresentationData({
          presentationId,
          fromDate,
          ...(toDate !== undefined ? { toDate } : {}),
          ...(noPreviousPeriod !== undefined ? { noPreviousPeriod } : {}),
          ...(dryRun ? { write: false } : {}),
        })
        this.output.info(`Fetched ${result.presentationId}`)
        break
      }
      case 'build': {
        this.output.info(this.getHelpText('build'))
        await this.runBuild()
        break
      }
      case 'serve': {
        this.output.info(this.getHelpText('serve'))
        const host = await this.promptOptional(
          'Host interface to bind to. Leave blank to use the default local host.',
          'Host (optional)',
        )
        const port = await this.promptNumber(
          'Port to serve on. Leave blank to use the default port.',
          'Port',
          5173,
        )
        const open = await this.promptBoolean(
          'Open the site in your default browser after the dev server starts.',
          'Open in browser',
          false,
        )
        const result = await this.service.serveSite({
          ...(host !== undefined ? { host } : {}),
          ...(port !== undefined ? { port } : {}),
          ...(open !== undefined ? { open } : {}),
        })
        this.output.info(`Serving at ${result.url}`)
        break
      }
      case 'validate': {
        this.output.info(this.getHelpText('validate'))
        const strict = await this.promptBoolean(
          'Enable stricter validation behavior when available.',
          'Strict validation',
          false,
        )
        const result = await this.service.validateContent({
          ...(strict !== undefined ? { strict } : {}),
        })
        this.output.info(result.valid ? 'Content is valid' : 'Content validation failed')
        break
      }
      case 'help':
        break
    }

    return command
  }

  private async runInit(args: string[]): Promise<void> {
    const options = this.parseOptions(args)
    const required = this.requireStringOptions(options, ['presentation-id', 'title', 'subtitle', 'from-date'])
    const force = this.readBooleanOption(options, 'force')
    const toDate = this.readStringOption(options, 'to-date')
    const summary = this.readStringOption(options, 'summary')
    const result = await this.service.initPresentation({
      presentationId: required['presentation-id'],
      title: required.title,
      subtitle: required.subtitle,
      fromDate: required['from-date'],
      ...(toDate !== undefined ? { toDate } : {}),
      ...(summary !== undefined ? { summary } : {}),
      ...(force !== undefined ? { force } : {}),
    })
    this.output.info(`Initialized ${result.presentationId}`)
  }

  private async runInteractiveInit(): Promise<void> {
    const presentationId = await this.promptRequired(
      'Unique presentation id used for content/presentations/<id>/',
      'Presentation id',
    )
    const title = await this.promptRequired(
      'Presentation title shown in listings and the app.',
      'Title',
    )
    const subtitle = await this.promptRequired(
      'Secondary label shown in listings and slide chrome.',
      'Subtitle',
    )
    const fromDate = await this.promptRequired(
      'Reporting-period start date in YYYY-MM-DD format.',
      'From date (YYYY-MM-DD)',
    )
    const toDate = await this.promptOptional(
      'Reporting-period end date in YYYY-MM-DD format. Leave blank if unknown.',
      'To date (YYYY-MM-DD, optional)',
    )
    const summary = await this.promptOptional(
      'Listing summary shown on the presentations page. Leave blank to use the default scaffold summary.',
      'Summary (optional)',
    )
    const force = await this.promptBoolean(
      'Overwrite the existing scaffold files if this presentation id already exists.',
      'Overwrite existing scaffold files',
      false,
    )

    await this.service.initPresentation({
      presentationId,
      title,
      subtitle,
      fromDate,
      ...(toDate !== undefined ? { toDate } : {}),
      ...(summary !== undefined ? { summary } : {}),
      ...(force !== undefined ? { force } : {}),
    })
    this.output.info(`Initialized ${presentationId}`)
  }

  private async promptRequired(helpText: string, label: string): Promise<string> {
    this.output.info(helpText)
    return this.prompter.promptRequired(label)
  }

  private async promptOptional(helpText: string, label: string): Promise<string | undefined> {
    this.output.info(helpText)
    return this.prompter.promptOptional(label)
  }

  private async promptBoolean(
    helpText: string,
    label: string,
    defaultValue?: boolean,
  ): Promise<boolean | undefined> {
    this.output.info(helpText)
    return this.prompter.promptBoolean(label, defaultValue)
  }

  private async promptNumber(
    helpText: string,
    label: string,
    defaultValue?: number,
  ): Promise<number | undefined> {
    this.output.info(helpText)
    return this.prompter.promptNumber(label, defaultValue)
  }

  private async runFetch(args: string[]): Promise<void> {
    const options = this.parseOptions(args)
    const required = this.requireStringOptions(options, ['presentation-id', 'from-date'])
    const presentationId = required['presentation-id']
    const write = this.readBooleanOption(options, 'dry-run') ? false : undefined
    const toDate = this.readStringOption(options, 'to-date')
    const noPreviousPeriod = this.readBooleanOption(options, 'no-previous-period')
    const result = await this.service.fetchPresentationData({
      fromDate: required['from-date'],
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

  private hasHelpFlag(args: string[]): boolean {
    return args.includes('--help') || args.includes('-h')
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

  private requireStringOptions<TKeys extends string>(
    options: CommandOptions,
    keys: TKeys[],
  ): Record<TKeys, string> {
    const missing = keys.filter((key) => this.readStringOption(options, key) === undefined)

    if (missing.length > 0) {
      const flags = missing.map((key) => `--${key}`).join(', ')
      throw new Error(
        `Missing required option${missing.length > 1 ? 's' : ''}: ${flags}.`,
      )
    }

    return Object.fromEntries(
      keys.map((key) => [key, this.readStringOption(options, key) as string]),
    ) as Record<TKeys, string>
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

  private getHelpText(topic?: string): string {
    switch (topic) {
      case 'init':
        return [
          'Usage: td-updates init --presentation-id <id> --title <title> --subtitle <subtitle> --from-date <YYYY-MM-DD> [--to-date <YYYY-MM-DD>] [--summary <summary>] [--force]',
          '',
          'Create a new presentation scaffold with starter presentation and generated YAML files.',
          'Use this before fetch when you are starting a new presentation id.',
          '',
          'Options:',
          '  --presentation-id <id>   Required. Unique presentation id used for content/presentations/<id>/',
          '  --title <title>          Required. Presentation title shown in listings and the app',
          '  --subtitle <subtitle>    Required. Secondary label shown in listings and slide chrome',
          '  --from-date <date>       Required. Period start date in YYYY-MM-DD format',
          '  --to-date <date>         Optional. Period end date in YYYY-MM-DD format',
          '  --summary <summary>      Optional. Listing summary text for the presentations page',
          '  --force                  Optional. Overwrite scaffold files if the presentation already exists',
          '',
          'Examples:',
          '  td-updates init',
          '  td-updates init --presentation-id 2026-apr --title "Community Update" --subtitle "April 2026" --from-date 2026-04-01 --to-date 2026-04-30',
        ].join('\n')
      case 'fetch':
        return [
          'Usage: td-updates fetch --presentation-id <id> --from-date <YYYY-MM-DD> [--to-date <YYYY-MM-DD>] [--no-previous-period] [--dry-run]',
          '',
          'Pull GitHub-derived metrics and write generated data for an existing presentation.',
          'Use this after init, once the presentation scaffold exists.',
          '',
          'Options:',
          '  --presentation-id <id>   Required. Target presentation id to update',
          '  --from-date <date>       Required. Period start date in YYYY-MM-DD format',
          '  --to-date <date>         Optional. Period end date in YYYY-MM-DD format. Defaults to today when omitted',
          '  --no-previous-period     Optional. Skip previous-period comparison and force previous values to 0',
          '  --dry-run                Optional. Compute data without writing generated.yaml',
          '',
          'Examples:',
          '  td-updates fetch --presentation-id 2026-q1 --from-date 2026-01-01 --to-date 2026-03-31',
          '  td-updates fetch --presentation-id 2026-mar --from-date 2026-03-01 --dry-run',
        ].join('\n')
      case 'build':
        return [
          'Usage: td-updates build',
          '',
          'Build the app for static hosting output.',
          'This delegates to the app build instead of maintaining a separate docs/site pipeline in the CLI.',
        ].join('\n')
      case 'serve':
        return [
          'Usage: td-updates serve [--host <host>] [--port <port>] [--open]',
          '',
          'Start the app locally so you can review presentations in a browser.',
          '',
          'Options:',
          '  --host <host>            Optional. Host interface to bind to. Defaults to 127.0.0.1',
          '  --port <port>            Optional. Port to serve on. Defaults to 5173',
          '  --open                   Optional. Open the browser automatically',
          '',
          'Examples:',
          '  td-updates serve',
          '  td-updates serve --host 0.0.0.0 --port 4173 --open',
        ].join('\n')
      case 'validate':
        return [
          'Usage: td-updates validate [--strict]',
          '',
          'Validate authored and generated content against the current app schema.',
          '',
          'Options:',
          '  --strict                 Optional. Reserved for stricter validation behavior',
        ].join('\n')
      case 'help':
      case undefined:
        break
      default:
        return `Unknown help topic "${topic}".`
    }

    return [
      'Usage: td-updates <command> [options]',
      '',
      'Typical flow:',
      '  1. init      Create a new presentation scaffold',
      '  2. fetch     Populate generated data for the presentation',
      '  3. validate  Confirm the content is still valid',
      '  4. serve     Review locally',
      '  5. build     Produce the static site',
      '',
      this.getCommandOverviewText(),
      '',
      'Command-specific help:',
      '  td-updates help <command>',
      '  td-updates <command> --help',
      '',
      'Commands:',
      '  init --presentation-id <id> --title <title> --subtitle <subtitle> --from-date <YYYY-MM-DD> [--to-date <YYYY-MM-DD>] [--summary <summary>] [--force]',
      '    Create a new presentation scaffold with starter presentation and generated YAML files. Run `init` with no flags for an interactive prompt.',
      '  fetch --presentation-id <id> --from-date <YYYY-MM-DD> [--to-date <YYYY-MM-DD>] [--no-previous-period] [--dry-run]',
      '    Pull GitHub-derived metrics and write generated data for an existing presentation.',
      '  validate [--strict]',
      '    Validate authored and generated content against the current app schema.',
      '  serve [--host <host>] [--port <port>] [--open]',
      '    Start the app locally so you can review the presentation in a browser.',
      '  build',
      '    Build the app for static hosting output.',
    ].join('\n')
  }

  private getCommandOverviewText(): string {
    return [
      'Command overview:',
      '  init      Create a new presentation scaffold before you have any generated data.',
      '  fetch     Pull GitHub data into generated.yaml for a presentation that already exists.',
      '  validate  Check that authored and generated content still matches the schema.',
      '  serve     Run the app locally for review.',
      '  build     Produce the static site output.',
      '  help      Show usage and command details.',
    ].join('\n')
  }
}
