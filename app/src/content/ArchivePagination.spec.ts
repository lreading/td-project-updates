import { describe, expect, it } from 'vitest'

import { buildArchivePagination } from './ArchivePagination'

describe('buildArchivePagination', () => {
  it('returns a single current page when only one page exists', () => {
    expect(buildArchivePagination(1, 1)).toEqual([
      {
        key: 'page-1',
        label: '1',
        page: 1,
        current: true,
        ellipsis: false,
      },
    ])
  })

  it('adds ellipses for large page ranges', () => {
    expect(buildArchivePagination(517, 259).map((item) => item.label)).toEqual([
      '1',
      '…',
      '258',
      '259',
      '260',
      '…',
      '517',
    ])
  })

  it('avoids unnecessary ellipses near the start and end', () => {
    expect(buildArchivePagination(10, 2).map((item) => item.label)).toEqual(['1', '2', '3', '…', '10'])
    expect(buildArchivePagination(10, 9).map((item) => item.label)).toEqual(['1', '…', '8', '9', '10'])
  })
})
