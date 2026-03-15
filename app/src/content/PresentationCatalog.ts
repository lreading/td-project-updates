import type { PresentationIndexEntry } from '../types/content'

export interface ArchivePageInput {
  page: number
  pageSize: number
  search: string
  year: number | null
}

export interface ArchivePageResult {
  items: PresentationIndexEntry[]
  page: number
  pageSize: number
  totalItems: number
  totalPages: number
  startItem: number
  endItem: number
}

export class PresentationCatalog {
  private readonly entries: PresentationIndexEntry[]

  public constructor(entries: PresentationIndexEntry[]) {
    this.entries = entries
  }

  public listYears(): number[] {
    return [...new Set(this.entries.map((entry) => entry.year))].sort((left, right) => right - left)
  }

  public getPage(input: ArchivePageInput): ArchivePageResult {
    const filtered = this.filterEntries(input.search, input.year)
    const totalItems = filtered.length
    const totalPages = Math.max(1, Math.ceil(totalItems / input.pageSize))
    const page = Math.min(Math.max(1, input.page), totalPages)
    const startIndex = (page - 1) * input.pageSize
    const items = filtered.slice(startIndex, startIndex + input.pageSize)
    const startItem = totalItems === 0 ? 0 : startIndex + 1
    const endItem = totalItems === 0 ? 0 : startIndex + items.length

    return {
      items,
      page,
      pageSize: input.pageSize,
      totalItems,
      totalPages,
      startItem,
      endItem,
    }
  }

  private filterEntries(search: string, year: number | null): PresentationIndexEntry[] {
    const normalizedSearch = search.trim().toLowerCase()

    return this.entries.filter((entry) => {
      if (year !== null && entry.year !== year) {
        return false
      }

      if (!normalizedSearch) {
        return true
      }

      return this.toSearchText(entry).includes(normalizedSearch)
    })
  }

  private toSearchText(entry: PresentationIndexEntry): string {
    return [
      entry.id,
      entry.title,
      entry.subtitle,
      entry.summary,
      `q${entry.quarter}`,
      `${entry.year}`,
      `q${entry.quarter} ${entry.year}`,
    ]
      .join(' ')
      .toLowerCase()
  }
}
