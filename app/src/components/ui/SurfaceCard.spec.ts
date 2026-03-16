import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import SurfaceCard from './SurfaceCard.vue'

describe('SurfaceCard', () => {
  it('renders a plain div card by default', () => {
    const wrapper = mount(SurfaceCard, {
      slots: {
        default: 'Card body',
      },
    })

    expect(wrapper.find('div').exists()).toBe(true)
    expect(wrapper.text()).toContain('Card body')
    expect(wrapper.classes()).toContain('surface-card--accent-none')
    expect(wrapper.classes()).toContain('surface-card--shift-none')
  })

  it('renders an interactive anchor card when href is provided', () => {
    const wrapper = mount(SurfaceCard, {
      props: {
        href: 'https://example.com',
        interactive: true,
        hoverShift: 'x',
        accent: 'left',
        accentVisibility: 'always',
        radius: 'lg',
        minHeight: '100px',
      },
      slots: {
        default: 'Linked card',
      },
    })

    expect(wrapper.find('a').exists()).toBe(true)
    expect(wrapper.attributes('href')).toBe('https://example.com')
    expect(wrapper.attributes('rel')).toBe('noreferrer')
    expect(wrapper.classes()).toContain('surface-card--interactive')
    expect(wrapper.classes()).toContain('surface-card--accent-left')
    expect(wrapper.classes()).toContain('surface-card--accent-always')
    expect(wrapper.classes()).toContain('surface-card--shift-x')
    expect(wrapper.classes()).toContain('surface-card--radius-lg')
    expect(wrapper.attributes('style')).toContain('--surface-card-min-height: 100px')
  })

  it('supports borderless top-accent cards', () => {
    const wrapper = mount(SurfaceCard, {
      props: {
        accent: 'top',
        border: false,
        hoverShift: 'y',
      },
    })

    expect(wrapper.classes()).toContain('surface-card--accent-top')
    expect(wrapper.classes()).toContain('surface-card--borderless')
    expect(wrapper.classes()).toContain('surface-card--shift-y')
  })
})
