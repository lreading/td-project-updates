import type { ResolvedReportingPeriod } from './Generation.types'

function isValidDateString(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value)
}

function parseUtcDate(value: string, fieldName: string): Date {
  if (!isValidDateString(value)) {
    throw new Error(`${fieldName} must be in YYYY-MM-DD format.`)
  }

  const parsed = new Date(`${value}T00:00:00Z`)
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`${fieldName} must be a valid date.`)
  }

  return parsed
}

function toDateString(value: Date): string {
  return value.toISOString().slice(0, 10)
}

function addDays(value: Date, days: number): Date {
  const next = new Date(value)
  next.setUTCDate(next.getUTCDate() + days)
  return next
}

function isLastDayOfMonth(value: Date): boolean {
  const nextDay = addDays(value, 1)
  return nextDay.getUTCDate() === 1
}

function addMonths(value: Date, months: number, preserveMonthEnd: boolean): Date {
  const year = value.getUTCFullYear()
  const month = value.getUTCMonth()
  const day = value.getUTCDate()
  const targetMonthIndex = month + months
  const firstOfTargetMonth = new Date(Date.UTC(year, targetMonthIndex, 1))

  if (preserveMonthEnd) {
    return new Date(Date.UTC(
      firstOfTargetMonth.getUTCFullYear(),
      firstOfTargetMonth.getUTCMonth() + 1,
      0,
    ))
  }

  const targetMonthLastDay = new Date(Date.UTC(
    firstOfTargetMonth.getUTCFullYear(),
    firstOfTargetMonth.getUTCMonth() + 1,
    0,
  )).getUTCDate()

  return new Date(Date.UTC(
    firstOfTargetMonth.getUTCFullYear(),
    firstOfTargetMonth.getUTCMonth(),
    Math.min(day, targetMonthLastDay),
  ))
}

function isWholeMonthAligned(start: Date, end: Date): boolean {
  return start.getUTCDate() === 1 && isLastDayOfMonth(end)
}

function getInclusiveMonthSpan(start: Date, end: Date): number {
  return ((end.getUTCFullYear() - start.getUTCFullYear()) * 12)
    + (end.getUTCMonth() - start.getUTCMonth())
    + 1
}

export class ReportingPeriodResolver {
  public constructor(
    private readonly nowProvider: () => Date = () => new Date(),
  ) {}

  public resolve(fromDate: string, toDate?: string): ResolvedReportingPeriod {
    const start = parseUtcDate(fromDate, 'fromDate')
    const end = toDate
      ? parseUtcDate(toDate, 'toDate')
      : parseUtcDate(toDateString(this.nowProvider()), 'toDate')

    if (start.getTime() > end.getTime()) {
      throw new Error('fromDate must be on or before toDate.')
    }

    if (isWholeMonthAligned(start, end)) {
      const monthSpan = getInclusiveMonthSpan(start, end)
      return {
        current: {
          start: toDateString(start),
          end: toDateString(end),
        },
        previous: {
          start: toDateString(addMonths(start, -monthSpan, false)),
          end: toDateString(addMonths(end, -monthSpan, true)),
        },
      }
    }

    const daySpan = Math.round((end.getTime() - start.getTime()) / 86_400_000) + 1
    const previousEnd = addDays(start, -1)
    const previousStart = addDays(previousEnd, -(daySpan - 1))

    return {
      current: {
        start: toDateString(start),
        end: toDateString(end),
      },
      previous: {
        start: toDateString(previousStart),
        end: toDateString(previousEnd),
      },
    }
  }
}
