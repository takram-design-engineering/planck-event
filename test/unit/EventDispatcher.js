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

import { Event, modifyEvent, EventDispatcher } from '../..'

const expect = chai.expect
chai.use(sinonChai)

describe('EventDispatcher', () => {
  it('supports instanceof', () => {
    const dispatcher = new EventDispatcher()
    expect(dispatcher).instanceof(EventDispatcher)
  })

  it('dispatches event to function listeners', () => {
    const dispatcher = new EventDispatcher()
    const event = new Event({ type: 'test' })
    const listener1 = sinon.spy(arg => {
      expect(arg).equal(event)
      expect(arg.target).equal(dispatcher)
      expect(arg.currentTarget).equal(dispatcher)
    })
    const listener2 = sinon.spy(arg => {
      expect(arg).equal(event)
      expect(arg.target).equal(dispatcher)
      expect(arg.currentTarget).equal(dispatcher)
    })
    const listener3 = sinon.spy()
    dispatcher.addEventListener('test', listener1)
    dispatcher.addEventListener('test', listener2)
    dispatcher.addEventListener('other', listener3)
    dispatcher.dispatchEvent(event)
    expect(listener1).calledOnce
    expect(listener1).calledBefore(listener2)
    expect(listener2).calledOnce
    expect(listener3).not.called
  })

  it('dispatches event to object listeners', () => {
    const dispatcher = new EventDispatcher()
    const event = new Event({ type: 'test' })
    const listener1 = {
      handleEvent: sinon.spy(arg => {
        expect(arg).equal(event)
        expect(arg.target).equal(dispatcher)
        expect(arg.currentTarget).equal(dispatcher)
      }),
    }
    const listener2 = {
      handleEvent: sinon.spy(arg => {
        expect(arg).equal(event)
        expect(arg.target).equal(dispatcher)
        expect(arg.currentTarget).equal(dispatcher)
      }),
    }
    const listener3 = {
      handleEvent: sinon.spy(),
    }
    dispatcher.addEventListener('test', listener1)
    dispatcher.addEventListener('test', listener2)
    dispatcher.addEventListener('other', listener3)
    dispatcher.dispatchEvent(event)
    expect(listener1.handleEvent).calledOnce
    expect(listener1.handleEvent).calledBefore(listener2.handleEvent)
    expect(listener2.handleEvent).calledOnce
    expect(listener3.handleEvent).not.called
  })

  describe('#addEventListener', () => {
  })

  describe('#removeEventListener', () => {
  })

  describe('#dispatchEvent', () => {
    it('takes object and dispatches event', () => {
      const dispatcher = new EventDispatcher()
      const listener = sinon.spy(arg => {
        expect(arg).instanceof(Event)
        expect(arg.target).equal(dispatcher)
        expect(arg.currentTarget).equal(dispatcher)
        expect(arg.type).equal('test')
        expect(arg.custom).equal(1)
      })
      dispatcher.addEventListener('test', listener)
      dispatcher.dispatchEvent({ type: 'test', custom: 1 })
      expect(listener).calledOnce
    })

    it('handles capture event phase', () => {
      const dispatcher = new EventDispatcher()
      const target = {}
      const listener = sinon.spy(arg => {
        expect(arg).instanceof(Event)
        expect(arg.target).equal(target)
        expect(arg.currentTarget).equal(dispatcher)
        expect(arg.type).equal('test')
      })
      const captureListener = sinon.spy(arg => {
        expect(arg).instanceof(Event)
        expect(arg.target).equal(target)
        expect(arg.currentTarget).equal(dispatcher)
        expect(arg.type).equal('test')
      })
      const bubbleListener = sinon.spy()
      dispatcher.addEventListener('test', listener, true)
      dispatcher.addEventListener('test', listener, false)
      dispatcher.addEventListener('test', captureListener, true)
      dispatcher.addEventListener('test', bubbleListener, false)
      const event = new Event({ type: 'test' })
      modifyEvent(event).target = target
      modifyEvent(event).phase = 'capture'
      dispatcher.dispatchEvent(event)
      expect(listener).calledOnce
      expect(captureListener).calledOnce
      expect(bubbleListener).not.called
    })

    it('handles bubble event phase', () => {
      const dispatcher = new EventDispatcher()
      const target = {}
      const listener = sinon.spy(arg => {
        expect(arg).instanceof(Event)
        expect(arg.target).equal(target)
        expect(arg.currentTarget).equal(dispatcher)
        expect(arg.type).equal('test')
      })
      const captureListener = sinon.spy()
      const bubbleListener = sinon.spy(arg => {
        expect(arg).instanceof(Event)
        expect(arg.target).equal(target)
        expect(arg.currentTarget).equal(dispatcher)
        expect(arg.type).equal('test')
      })
      dispatcher.addEventListener('test', listener, true)
      dispatcher.addEventListener('test', listener, false)
      dispatcher.addEventListener('test', captureListener, true)
      dispatcher.addEventListener('test', bubbleListener, false)
      const event = new Event({ type: 'test' })
      modifyEvent(event).target = target
      modifyEvent(event).phase = 'bubble'
      dispatcher.dispatchEvent(event)
      expect(listener).calledOnce
      expect(captureListener).not.called
      expect(bubbleListener).calledOnce
    })

    it('handles target event phase', () => {
      const dispatcher = new EventDispatcher()
      const target = {}
      const listener = sinon.spy(arg => {
        expect(arg).instanceof(Event)
        expect(arg.target).equal(target)
        expect(arg.currentTarget).equal(dispatcher)
        expect(arg.type).equal('test')
      })
      const captureListener = sinon.spy()
      const bubbleListener = sinon.spy()
      dispatcher.addEventListener('test', listener, true)
      dispatcher.addEventListener('test', listener, false)
      dispatcher.addEventListener('test', captureListener, true)
      dispatcher.addEventListener('test', bubbleListener, false)
      const event = new Event({ type: 'test' })
      modifyEvent(event).target = target
      modifyEvent(event).phase = 'target'
      dispatcher.dispatchEvent(event)
      expect(listener).calledTwice
      expect(captureListener).calledOnce
      expect(bubbleListener).calledOnce
    })

    it('handles null phase like target event phase', () => {
      const dispatcher = new EventDispatcher()
      const target = {}
      const listener = sinon.spy(arg => {
        expect(arg).instanceof(Event)
        expect(arg.target).equal(target)
        expect(arg.currentTarget).equal(dispatcher)
        expect(arg.type).equal('test')
      })
      const captureListener = sinon.spy()
      const bubbleListener = sinon.spy()
      dispatcher.addEventListener('test', listener, true)
      dispatcher.addEventListener('test', listener, false)
      dispatcher.addEventListener('test', captureListener, true)
      dispatcher.addEventListener('test', bubbleListener, false)
      const event = new Event({ type: 'test' })
      modifyEvent(event).target = target
      modifyEvent(event).phase = null
      dispatcher.dispatchEvent(event)
      expect(listener).calledTwice
      expect(captureListener).calledOnce
      expect(bubbleListener).calledOnce
    })

    it('stops immediate propagation', () => {
      const dispatcher = new EventDispatcher()
      const target = {}
      const listener1 = sinon.spy()
      const listener2 = sinon.spy(event => {
        event.stopImmediatePropagation()
      })
      const listener3 = sinon.spy()
      dispatcher.addEventListener('test', listener1)
      dispatcher.addEventListener('test', listener2)
      dispatcher.addEventListener('test', listener3)
      const event = new Event({ type: 'test' })
      modifyEvent(event).target = target
      dispatcher.dispatchEvent(event)
      expect(listener1).calledOnce
      expect(listener2).calledOnce
      expect(listener3).not.called
    })
  })
})
