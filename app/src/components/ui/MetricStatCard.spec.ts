import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import MetricStatCard from './MetricStatCard.vue'

describe('MetricStatCard', () => {
  it('renders value, label, and trend', () => {
    const wrapper = mount(MetricStatCard, {
      props: {
        icon: 'star',
        value: '1,234',
        label: 'GitHub Stars',
        trend: '+12% vs last Q',
      },
    })

    expect(wrapper.text()).toContain('1,234')
    expect(wrapper.text()).toContain('GitHub Stars')
    expect(wrapper.text()).toContain('+12% vs last Q')
  })

  it('omits trend when not provided', () => {
    const wrapper = mount(MetricStatCard, {
      props: {
        icon: 'star',
        value: '7',
        label: 'Open issues',
      },
    })

    expect(wrapper.find('.metric-stat-card__trend').exists()).toBe(false)
  })
})
