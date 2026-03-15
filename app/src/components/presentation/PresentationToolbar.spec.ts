import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import PresentationToolbar from './PresentationToolbar.vue'

describe('PresentationToolbar', () => {
  it('emits navigation and mode events', async () => {
    const wrapper = mount(PresentationToolbar, {
      props: {
        isPresentationMode: false,
        isFullscreenAvailable: true,
        isFullscreenActive: false,
        slideNumber: 2,
        slideTotal: 9,
      },
    })

    const buttons = wrapper.findAll('button')

    await buttons[0].trigger('click')
    await buttons[1].trigger('click')
    await buttons[2].trigger('click')
    await buttons[3].trigger('click')
    await buttons[4].trigger('click')
    await buttons[5].trigger('click')

    expect(wrapper.emitted('first')).toHaveLength(1)
    expect(wrapper.emitted('previous')).toHaveLength(1)
    expect(wrapper.emitted('next')).toHaveLength(1)
    expect(wrapper.emitted('last')).toHaveLength(1)
    expect(wrapper.emitted('toggleMode')).toHaveLength(1)
    expect(wrapper.emitted('toggleFullscreen')).toHaveLength(1)
  })

  it('hides the fullscreen button when fullscreen is unavailable', () => {
    const wrapper = mount(PresentationToolbar, {
      props: {
        isPresentationMode: true,
        isFullscreenAvailable: false,
        isFullscreenActive: false,
        slideNumber: 1,
        slideTotal: 3,
      },
    })

    expect(wrapper.text()).toContain('Exit presentation')
    expect(wrapper.text()).not.toContain('Fullscreen')
  })
})
