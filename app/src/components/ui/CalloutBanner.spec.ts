import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import CalloutBanner from './CalloutBanner.vue'

describe('CalloutBanner', () => {
  it('renders split solid banners with main and action content', () => {
    const wrapper = mount(CalloutBanner, {
      slots: {
        default: '<p>Main</p>',
        action: '<button>Action</button>',
      },
    })

    expect(wrapper.classes()).toContain('callout-banner--solid')
    expect(wrapper.classes()).toContain('callout-banner--split')
    expect(wrapper.text()).toContain('Main')
    expect(wrapper.text()).toContain('Action')
  })

  it('supports centered dashed banners', () => {
    const wrapper = mount(CalloutBanner, {
      props: {
        variant: 'dashed',
        align: 'center',
      },
      slots: {
        default: 'Centered',
      },
    })

    expect(wrapper.classes()).toContain('callout-banner--dashed')
    expect(wrapper.classes()).toContain('callout-banner--center')
  })
})
