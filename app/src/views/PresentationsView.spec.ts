import { mount, RouterLinkStub } from '@vue/test-utils'
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'

import { contentRepository } from '../content/ContentRepository'
import PresentationsView from './PresentationsView.vue'

describe('PresentationsView', () => {
  beforeEach(() => {
    vi.spyOn(contentRepository, 'getSiteContent').mockReturnValue({
      title: 'Threat Dragon Updates',
      tagline: 'Tagline',
      home_intro: 'Intro',
      home_cta_label: 'Latest',
      presentations_cta_label: 'Presentations',
      links: {},
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders the available presentations', () => {
    vi.spyOn(contentRepository, 'listPresentations').mockReturnValue([
      {
        id: '2026-q1',
        year: 2026,
        quarter: 1,
        title: 'Q1 2026',
        subtitle: 'Q1 2026',
        summary: 'Latest quarterly update',
        published: true,
        featured: true,
      },
    ])

    const wrapper = mount(PresentationsView, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    expect(wrapper.text()).toContain('All presentations')
    expect(wrapper.text()).toContain('Q1 2026')
  })

  it('filters by search text and year', async () => {
    vi.spyOn(contentRepository, 'listPresentations').mockReturnValue([
      {
        id: '2026-q2',
        year: 2026,
        quarter: 2,
        title: 'Weekly Update 10',
        subtitle: 'Q2 2026',
        summary: 'Weekly cadence',
        published: true,
        featured: false,
      },
      {
        id: '2025-q4',
        year: 2025,
        quarter: 4,
        title: 'Quarterly Review',
        subtitle: 'Q4 2025',
        summary: 'Year-end wrap-up',
        published: true,
        featured: false,
      },
    ])

    const wrapper = mount(PresentationsView, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    await wrapper.get('.presentations-input').setValue('weekly')
    expect(wrapper.text()).toContain('Weekly Update 10')
    expect(wrapper.text()).not.toContain('Quarterly Review')

    await wrapper.get('.presentations-select').setValue('2025')
    expect(wrapper.text()).toContain('No matching presentations')
  })

  it('paginates long archives', async () => {
    vi.spyOn(contentRepository, 'listPresentations').mockReturnValue(
      Array.from({ length: 13 }, (_, index) => ({
        id: `2026-w${index + 1}`,
        year: 2026,
        quarter: 1,
        title: `Weekly Update ${index + 1}`,
        subtitle: 'Q1 2026',
        summary: 'Archive pagination test',
        published: true,
        featured: false,
      })),
    )

    const wrapper = mount(PresentationsView, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    expect(wrapper.text()).toContain('13 presentations total')
    expect(wrapper.text()).toContain('Page 1 of 2 · Showing 1-12')
    await wrapper.get('.presentations-page-button:last-child').trigger('click')
    expect(wrapper.text()).toContain('Page 2 of 2 · Showing 13-13')
    expect(wrapper.text()).toContain('Weekly Update 13')
  })

  it('renders condensed pagination for very large archives', () => {
    vi.spyOn(contentRepository, 'listPresentations').mockReturnValue(
      Array.from({ length: 6204 }, (_, index) => ({
        id: `2026-w${index + 1}`,
        year: 2026,
        quarter: 1,
        title: `Presentation ${index + 1}`,
        subtitle: 'Q1 2026',
        summary: 'Large presentations test',
        published: true,
        featured: false,
      })),
    )

    const wrapper = mount(PresentationsView, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    const labels = wrapper
      .findAll('.presentations-page-button')
      .map((button) => button.text())

    expect(labels).toEqual(['Previous', '1', '2', '…', '517', 'Next'])
  })
})
