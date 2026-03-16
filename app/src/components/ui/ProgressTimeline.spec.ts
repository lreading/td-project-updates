import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import ProgressTimeline from './ProgressTimeline.vue'

describe('ProgressTimeline', () => {
  it('renders timeline items with their states', () => {
    const wrapper = mount(ProgressTimeline, {
      props: {
        items: [
          { key: '1', title: 'Completed', summary: 'Done', state: 'viewed' },
          { key: '2', title: 'Current', summary: 'Active', state: 'current' },
          { key: '3', title: 'Future', summary: 'Later', state: 'upcoming' },
        ],
      },
    })

    expect(wrapper.findAll('.progress-timeline__item')).toHaveLength(3)
    expect(wrapper.findAll('.progress-timeline__item--current')).toHaveLength(1)
    expect(wrapper.text()).toContain('Completed')
    expect(wrapper.text()).toContain('Later')
  })
})
