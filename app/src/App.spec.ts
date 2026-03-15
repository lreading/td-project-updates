import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import App from './App.vue'
import { createAppRouter } from './router'

describe('App', () => {
  it('renders the routed home view', async () => {
    const router = createAppRouter(true)

    await router.push('/')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.text()).toContain('Threat Dragon Quarterly Updates')
  })
})
