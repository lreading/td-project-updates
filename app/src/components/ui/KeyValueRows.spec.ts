import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import KeyValueRows from './KeyValueRows.vue'

describe('KeyValueRows', () => {
  it('renders key/value rows', () => {
    const wrapper = mount(KeyValueRows, {
      props: {
        rows: [
          { key: 'Category', value: 'Value' },
          { key: 'Another', value: 'More' },
        ],
      },
    })

    expect(wrapper.findAll('.key-value-rows__key')).toHaveLength(2)
    expect(wrapper.text()).toContain('Category')
    expect(wrapper.text()).toContain('More')
  })
})
