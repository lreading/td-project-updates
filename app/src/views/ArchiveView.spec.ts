import { mount, RouterLinkStub } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import ArchiveView from './ArchiveView.vue'

describe('ArchiveView', () => {
  it('renders the available presentations', () => {
    const wrapper = mount(ArchiveView, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    expect(wrapper.text()).toContain('Presentation archive')
    expect(wrapper.text()).toContain('Q1 2026')
  })
})
