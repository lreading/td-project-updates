import { describe, expect, it, vi } from 'vitest'

import { CliCommandRunner } from './CliCommandRunner'

import type { TdCliService } from '../application/TdCliService'

function createService(): TdCliService {
  return {
    initPresentation: vi.fn().mockResolvedValue({
      presentationId: '2026-q1',
      createdPaths: [],
    }),
    fetchPresentationData: vi.fn().mockResolvedValue({
      presentationId: '2026-q1',
      generatedPath: '/tmp/generated.yaml',
      generated: {
        id: '2026-q1',
        period: {
          start: '2026-01-01',
          end: '2026-03-31',
        },
        stats: {},
        releases: [],
        contributors: {
          total: 0,
          authors: [],
        },
        merged_prs: [],
      },
      warnings: [],
    }),
    buildSite: vi.fn().mockResolvedValue({
      outputPath: '/repo/app/dist',
    }),
    serveSite: vi.fn().mockResolvedValue({
      url: 'http://127.0.0.1:5173/',
    }),
    validateContent: vi.fn().mockResolvedValue({
      valid: true,
      errors: [],
    }),
  }
}

function createOutput() {
  return {
    info: vi.fn(),
    error: vi.fn(),
  }
}

describe('CliCommandRunner', () => {
  it('prints help when no command is provided', async () => {
    const output = createOutput()
    const runner = new CliCommandRunner(createService(), output)

    await expect(runner.run([])).resolves.toBe(0)
    expect(output.info).toHaveBeenCalledWith(expect.stringContaining('Usage: td-updates'))
  })

  it('dispatches init with parsed options', async () => {
    const service = createService()
    const output = createOutput()
    const runner = new CliCommandRunner(service, output)

    await expect(runner.run(['init', '--year', '2026', '--quarter', '1', '--force'])).resolves.toBe(0)

    expect(service.initPresentation).toHaveBeenCalledWith({
      year: 2026,
      quarter: 1,
      force: true,
    })
    expect(output.info).toHaveBeenCalledWith('Initialized 2026-q1')
  })

  it('dispatches fetch with optional arguments', async () => {
    const service = createService()
    const output = createOutput()
    const runner = new CliCommandRunner(service, output)

    await expect(runner.run([
      'fetch',
      '--year',
      '2026',
      '--quarter',
      '1',
      '--presentation-id',
      'custom-id',
      '--dry-run',
    ])).resolves.toBe(0)

    expect(service.fetchPresentationData).toHaveBeenCalledWith({
      year: 2026,
      quarter: 1,
      presentationId: 'custom-id',
      write: false,
    })
  })

  it('dispatches build, serve, and validate', async () => {
    const service = createService()
    const output = createOutput()
    const runner = new CliCommandRunner(service, output)

    await expect(runner.run(['build'])).resolves.toBe(0)
    await expect(runner.run(['serve', '--host', '0.0.0.0', '--port', '4173', '--open'])).resolves.toBe(0)
    await expect(runner.run(['validate', '--strict'])).resolves.toBe(0)

    expect(service.buildSite).toHaveBeenCalledWith({ mode: 'production' })
    expect(service.serveSite).toHaveBeenCalledWith({
      host: '0.0.0.0',
      port: 4173,
      open: true,
    })
    expect(service.validateContent).toHaveBeenCalledWith({ strict: true })
  })

  it('prints the failed validation message when validation returns invalid', async () => {
    const service = createService()
    const output = createOutput()
    vi.mocked(service.validateContent).mockResolvedValue({
      valid: false,
      errors: ['broken'],
    })
    const runner = new CliCommandRunner(service, output)

    await expect(runner.run(['validate'])).resolves.toBe(0)
    expect(output.info).toHaveBeenCalledWith('Content validation failed')
  })

  it('returns a non-zero exit code for unknown commands or invalid options', async () => {
    const output = createOutput()
    const runner = new CliCommandRunner(createService(), output)

    await expect(runner.run(['unknown'])).resolves.toBe(1)
    await expect(runner.run(['build', 'unexpected'])).resolves.toBe(1)
    await expect(runner.run(['serve', 'unexpected'])).resolves.toBe(1)
    await expect(runner.run(['init', '--year', '--quarter', '1'])).resolves.toBe(1)
    await expect(runner.run(['init', '--year', 'oops', '--quarter', '1'])).resolves.toBe(1)
    expect(output.error).toHaveBeenCalled()
  })
})
