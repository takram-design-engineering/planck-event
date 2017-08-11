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
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

import { Environment } from '@takram/planck-core'

import { Event, EventBundle } from '../..'

const expect = chai.expect
chai.use(sinonChai)

describe('EventBundle', () => {
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
    const event = new EventBundle()
    expect(event).instanceof(EventBundle)
    expect(event).instanceof(Event)
  })

  it('initializes properties', () => {
    const event = new EventBundle()
    expect(event.type).equal(null)
    expect(event.target).equal(null)
    expect(event.currentTarget).equal(null)
    expect(event.phase).equal(null)
    expect(event.captures).false
    expect(event.bubbles).true
    expect(event.timestamp).a('number')
    expect(event.propagationStopped).false
    expect(event.immediatePropagationStopped).false
    expect(event.originalEvent).equal(null)
  })

  describe('#init', () => {
    it('allows call without arguments', () => {
      const event = new EventBundle()
      expect(() => {
        event.init()
      }).not.throws()
    })

    it('takes original event as a parameter', () => {
      const originalEvent = new Environment.self.Event('')
      const event = new EventBundle()
      event.init({ originalEvent })
      expect(event.originalEvent).equal(originalEvent)
    })

    it('initializes parent class', () => {
      const event = new EventBundle()
      event.init({
        type: 'test',
        captures: true,
        bubbles: false,
      })
      expect(event.type).equal('test')
      expect(event.captures).true
      expect(event.bubbles).false
    })
  })

  describe('#preventDefault', () => {
    it('propagates to original event', () => {
      const originalEvent = new Environment.self.Event('')
      sinon.spy(originalEvent, 'preventDefault')
      const event = new EventBundle()
      event.init({ originalEvent })
      event.preventDefault()
      expect(originalEvent.preventDefault).calledOnce
      originalEvent.preventDefault.restore()
    })
  })
})
