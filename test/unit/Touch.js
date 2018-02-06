// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import 'source-map-support/register'

import chai from 'chai'

import { Global } from '@takram/planck-core'

import { Touch } from '../..'

const { expect } = chai

describe('Touch', () => {
  if (Global.isNode) {
    Global.scope.Touch = class {}
  }

  it('supports instanceof', () => {
    const touch = new Touch()
    expect(touch).instanceof(Touch)
  })

  it('initializes properties', () => {
    const touch = new Touch()
    expect(touch.x).equal(0)
    expect(touch.y).equal(0)
    expect(touch.target).equal(null)
    expect(touch.originalTouch).equal(null)
  })

  describe('#init', () => {
    it('allows call without arguments', () => {
      const touch = new Touch()
      expect(() => {
        touch.init()
      }).not.throws()
    })

    it('applies parameters', () => {
      const target = {}
      const originalTouch = {}
      const touch = new Touch()
      touch.init({
        x: 1,
        y: 2,
        target,
        originalTouch,
      })
      expect(touch.x).equal(1)
      expect(touch.y).equal(2)
      expect(touch.target).equal(target)
      expect(touch.originalTouch).equal(originalTouch)
    })
  })
})
