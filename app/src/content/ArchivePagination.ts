export interface ArchivePaginationItem {
  key: string
  label: string
  page: number | null
  current: boolean
  ellipsis: boolean
}

export function buildArchivePagination(totalPages: number, currentPage: number): ArchivePaginationItem[] {
  if (totalPages <= 1) {
    return [
      {
        key: 'page-1',
        label: '1',
        page: 1,
        current: true,
        ellipsis: false,
      },
    ]
  }

  const pages = new Set<number>([1, totalPages, currentPage, currentPage - 1, currentPage + 1])
  const filteredPages = [...pages]
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((left, right) => left - right)

  const items: ArchivePaginationItem[] = []

  filteredPages.forEach((page, index) => {
    const previous = filteredPages[index - 1]

    if (previous && page - previous > 1) {
      items.push({
        key: `ellipsis-${previous}-${page}`,
        label: '…',
        page: null,
        current: false,
        ellipsis: true,
      })
    }

    items.push({
      key: `page-${page}`,
      label: String(page),
      page,
      current: page === currentPage,
      ellipsis: false,
    })
  })

  return items
}
