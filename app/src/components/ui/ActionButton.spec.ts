import { mount, RouterLinkStub } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import ActionButton from './ActionButton.vue'

describe('ActionButton', () => {
  it('renders a router link when "to" is provided', () => {
    const wrapper = mount(ActionButton, {
      props: {
        to: { name: 'presentations' },
      },
      slots: {
        default: 'Browse',
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    const link = wrapper.getComponent(RouterLinkStub)

    expect(link.props('to')).toEqual({ name: 'presentations' })
    expect(wrapper.classes()).toContain('action-button--primary')
  })

  it('renders an anchor when "href" is provided and defaults rel for blank targets', () => {
    const wrapper = mount(ActionButton, {
      props: {
        href: 'https://example.com',
        target: '_blank',
        variant: 'secondary',
      },
      slots: {
        default: 'Docs',
      },
    })

    expect(wrapper.find('a').exists()).toBe(true)
    expect(wrapper.attributes('href')).toBe('https://example.com')
    expect(wrapper.attributes('target')).toBe('_blank')
    expect(wrapper.attributes('rel')).toBe('noreferrer')
    expect(wrapper.classes()).toContain('action-button--secondary')
  })

  it('renders a disabled button when no navigation target is provided', () => {
    const wrapper = mount(ActionButton, {
      props: {
        disabled: true,
        block: true,
      },
      slots: {
        default: 'Disabled',
      },
    })

    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.classes()).toContain('action-button--block')
    expect(wrapper.classes()).toContain('action-button--disabled')
  })
})
