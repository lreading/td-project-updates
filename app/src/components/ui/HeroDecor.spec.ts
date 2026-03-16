import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import HeroDecor from './HeroDecor.vue'

describe('HeroDecor', () => {
  it('renders default diagonal hero chrome and bottom strip', () => {
    const wrapper = mount(HeroDecor)

    const circles = wrapper.findAll('.hero-decor__circle')

    expect(wrapper.find('.hero-decor__pattern').exists()).toBe(true)
    expect(circles).toHaveLength(2)
    expect(circles[0].classes()).toContain('hero-decor__circle--top-right')
    expect(circles[1].classes()).toContain('hero-decor__circle--bottom-left')
    expect(wrapper.find('.hero-decor__bottom-strip').exists()).toBe(true)
  })

  it('supports alternate corners and omitting the bottom strip', () => {
    const wrapper = mount(HeroDecor, {
      props: {
        primaryCorner: 'top-left',
        secondaryCorner: 'bottom-right',
        bottomStrip: false,
        primaryOpacity: 0.5,
      },
    })

    const circles = wrapper.findAll('.hero-decor__circle')

    expect(circles[0].classes()).toContain('hero-decor__circle--top-left')
    expect(circles[1].classes()).toContain('hero-decor__circle--bottom-right')
    expect(circles[0].attributes('style')).toContain('--hero-decor-opacity: 0.5')
    expect(wrapper.find('.hero-decor__bottom-strip').exists()).toBe(false)
  })
})
