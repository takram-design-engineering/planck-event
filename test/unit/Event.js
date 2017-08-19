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

import { Event, modifyEvent } from '../..'

const expect = chai.expect

describe('Event', () => {
  it('supports instanceof', () => {
    expect(new Event()).instanceof(Event)
  })

  it('initializes properties', () => {
    const event = new Event()
    expect(event.type).equal(null)
    expect(event.target).equal(null)
    expect(event.currentTarget).equal(null)
    expect(event.eventPhase).equal(null)
    expect(event.captures).false
    expect(event.bubbles).true
    expect(event.timeStamp).a('number')
    expect(event.propagationStopped).false
    expect(event.immediatePropagationStopped).false
  })

  describe('#init', () => {
    it('allows call without arguments', () => {
      const event = new Event()
      expect(() => {
        event.init()
      }).not.throws()
    })

    it('applies parameters', done => {
      const event = new Event()
      event.init({
        type: 'test',
        captures: true,
        bubbles: false,
      })
      event.stopImmediatePropagation()
      const target = {}
      const currentTarget = {}
      modifyEvent(event).target = target
      modifyEvent(event).currentTarget = currentTarget
      modifyEvent(event).eventPhase = 'bubble'
      const timeStamp = event.timeStamp
      setTimeout(() => {
        event.init({ type: 'init' })
        expect(event.type).equal('init')
        expect(event.target).equal(null)
        expect(event.currentTarget).equal(null)
        expect(event.eventPhase).equal(null)
        expect(event.captures).false
        expect(event.bubbles).true
        expect(event.timeStamp).not.equal(timeStamp)
        expect(event.propagationStopped).false
        expect(event.immediatePropagationStopped).false
        done()
      }, 10)
    })
  })

  describe('#modifyEvent', () => {
    it('allows changing targets and phase', () => {
      const event = new Event()
      const target = {}
      const currentTarget = {}
      modifyEvent(event).target = target
      modifyEvent(event).currentTarget = currentTarget
      modifyEvent(event).eventPhase = 'bubble'
      expect(event.target).equal(target)
      expect(event.currentTarget).equal(currentTarget)
      expect(event.eventPhase).equal('bubble')
    })
  })

  describe('#stopPropagation', () => {
    it('sets properties', () => {
      const event = new Event()
      event.stopPropagation()
      expect(event.propagationStopped).true
      expect(event.immediatePropagationStopped).false
    })
  })

  describe('#stopImmediatePropagation', () => {
    it('sets properties', () => {
      const event = new Event()
      event.stopImmediatePropagation()
      expect(event.propagationStopped).true
      expect(event.immediatePropagationStopped).true
    })
  })
})
