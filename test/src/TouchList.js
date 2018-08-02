// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import chai from 'chai'

import { isNode, globalScope } from '@takram/planck-core'

import { Touch, TouchList } from '../..'

const { expect } = chai

describe('TouchList', () => {
  if (isNode) {
    globalScope.TouchList = class {}
  }

  it('supports instanceof', () => {
    const list = new TouchList()
    expect(list).instanceof(TouchList)
  })

  describe('#length', () => {
    it('is zero as the initial value', () => {
      const list = new TouchList()
      expect(list.length).equal(0)
    })

    it('denotes the number of touches', () => {
      const list = new TouchList()
      const touches = [new Touch(), new Touch(), new Touch(), new Touch()]
      list.init(...touches)
      expect(list.length).equal(touches.length)
    })
  })

  describe('#init', () => {
    it('allows call without arguments', () => {
      const list = new TouchList()
      expect(() => {
        list.init()
      }).not.throws()
    })
  })

  describe('#item', () => {
    it('returns the item at index', () => {
      const list = new TouchList()
      const touches = [new Touch(), new Touch(), new Touch(), new Touch()]
      list.init(...touches)
      expect(list.item(0)).equal(touches[0])
      expect(list.item(1)).equal(touches[1])
      expect(list.item(2)).equal(touches[2])
      expect(list.item(3)).equal(touches[3])
    })
  })
})
