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

import { Touch, TouchList } from '../..'

const expect = chai.expect

describe('TouchList', () => {
  if (Environment.type === 'node') {
    Environment.self.TouchList = class {}
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
