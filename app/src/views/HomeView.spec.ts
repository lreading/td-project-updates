import { mount, RouterLinkStub } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import HomeView from './HomeView.vue'

describe('HomeView', () => {
  it('renders the landing page hero and CTA links', () => {
    const wrapper = mount(HomeView, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    expect(wrapper.text()).toContain('Threat Dragon Quarterly Updates')
    expect(wrapper.text()).toContain('View latest presentation')
  })
})
