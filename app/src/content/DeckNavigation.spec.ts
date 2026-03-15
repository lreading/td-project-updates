import { describe, expect, it } from 'vitest'

import { DeckNavigation } from './DeckNavigation'

describe('DeckNavigation', () => {
  it('moves within the presentation bounds', () => {
    const navigation = new DeckNavigation(9)

    expect(navigation.first()).toBe(1)
    expect(navigation.last()).toBe(9)
    expect(navigation.previous(1)).toBe(1)
    expect(navigation.next(9)).toBe(9)
    expect(navigation.next(3)).toBe(4)
  })

  it('normalizes invalid route values', () => {
    const navigation = new DeckNavigation(4)

    expect(navigation.resolve(undefined)).toBe(1)
    expect(navigation.resolve('2')).toBe(2)
    expect(navigation.resolve('400')).toBe(4)
  })
})
