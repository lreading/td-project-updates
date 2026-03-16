import { describe, expect, it } from 'vitest'

import { ReportingPeriodResolver } from './ReportingPeriodResolver'

describe('ReportingPeriodResolver', () => {
  it('resolves an explicit month-aligned range and its previous equivalent month span', () => {
    const resolver = new ReportingPeriodResolver()

    expect(resolver.resolve('2026-01-01', '2026-03-31')).toEqual({
      current: {
        start: '2026-01-01',
        end: '2026-03-31',
      },
      previous: {
        start: '2025-10-01',
        end: '2025-12-31',
      },
    })
  })

  it('defaults to the current date when toDate is omitted', () => {
    const resolver = new ReportingPeriodResolver(() => new Date('2026-03-16T12:00:00Z'))

    expect(resolver.resolve('2026-03-01')).toEqual({
      current: {
        start: '2026-03-01',
        end: '2026-03-16',
      },
      previous: {
        start: '2026-02-13',
        end: '2026-02-28',
      },
    })
  })

  it('uses day-based fallback for non-month-aligned periods', () => {
    const resolver = new ReportingPeriodResolver()

    expect(resolver.resolve('2026-03-03', '2026-03-09')).toEqual({
      current: {
        start: '2026-03-03',
        end: '2026-03-09',
      },
      previous: {
        start: '2026-02-24',
        end: '2026-03-02',
      },
    })
  })

  it('rejects malformed dates and inverted ranges', () => {
    const resolver = new ReportingPeriodResolver()

    expect(() => resolver.resolve('03-01-2026', '2026-03-31')).toThrow(
      'fromDate must be in YYYY-MM-DD format.',
    )
    expect(() => resolver.resolve('2026-03-31', '2026-03-01')).toThrow(
      'fromDate must be on or before toDate.',
    )
  })
})
