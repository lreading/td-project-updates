import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import AccentDivider from './AccentDivider.vue'

describe('AccentDivider', () => {
  it('renders with default width, opacity, and padding', () => {
    const wrapper = mount(AccentDivider)

    expect(wrapper.find('.accent-divider__line').exists()).toBe(true)
    expect(wrapper.attributes('style')).toContain('--accent-divider-width: 6rem')
    expect(wrapper.attributes('style')).toContain('--accent-divider-opacity: 1')
  })

  it('supports custom width, opacity, and padding', () => {
    const wrapper = mount(AccentDivider, {
      props: {
        width: '4rem',
        opacity: 0.8,
        padding: '0.5rem 0',
      },
    })

    expect(wrapper.attributes('style')).toContain('--accent-divider-width: 4rem')
    expect(wrapper.attributes('style')).toContain('--accent-divider-opacity: 0.8')
    expect(wrapper.attributes('style')).toContain('--accent-divider-padding: 0.5rem 0')
  })
})
