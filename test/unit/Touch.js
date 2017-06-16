//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

import chai from 'chai'

import { Environment } from '@takram/planck-core'

import { Touch } from '../..'

const expect = chai.expect

describe('Touch', () => {
  if (Environment.type === 'node') {
    Environment.self.Touch = class {}
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
