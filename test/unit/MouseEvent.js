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

import 'source-map-support/register'

import chai from 'chai'

import { Environment } from '@takram/planck-core'

import { EventBundle, MouseEvent } from '../..'

const { expect } = chai

describe('MouseEvent', () => {
  if (Environment.type === 'node') {
    Environment.self.Event = class {
      constructor(type) {
        this.defaultPrevented = false
      }

      preventDefault() {
        this.defaultPrevented = true
      }
    }
  }

  it('supports instanceof', () => {
    const event = new MouseEvent()
    expect(event).instanceof(MouseEvent)
    expect(event).instanceof(EventBundle)
  })

  it('initializes properties', () => {
    const event = new MouseEvent()
    expect(event.type).equal(null)
    expect(event.target).equal(null)
    expect(event.currentTarget).equal(null)
    expect(event.eventPhase).equal(null)
    expect(event.captures).false
    expect(event.bubbles).true
    expect(event.timeStamp).a('number')
    expect(event.propagationStopped).false
    expect(event.immediatePropagationStopped).false
    expect(event.originalEvent).equal(null)
    expect(event.x).equal(0)
    expect(event.y).equal(0)
    expect(event.movementX).equal(0)
    expect(event.movementY).equal(0)
  })

  describe('#init', () => {
    it('allows call without arguments', () => {
      const event = new MouseEvent()
      expect(() => {
        event.init()
      }).not.throws()
    })

    it('takes mouse parameters', () => {
      const event = new MouseEvent()
      event.init({
        x: 1, y: 2, movementX: 3, movementY: 4,
      })
      expect(event.x).equal(1)
      expect(event.y).equal(2)
      expect(event.movementX).equal(3)
      expect(event.movementY).equal(4)
    })

    it('initializes parent class', () => {
      const originalEvent = new Environment.self.Event('')
      const event = new MouseEvent()
      event.init({
        type: 'test',
        captures: true,
        bubbles: false,
        originalEvent,
      })
      expect(event.type).equal('test')
      expect(event.captures).true
      expect(event.bubbles).false
      expect(event.originalEvent).equal(originalEvent)
    })
  })
})
