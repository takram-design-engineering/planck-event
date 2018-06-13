// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

/* eslint-disable no-unused-expressions */

import 'source-map-support/register'

import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

import { Event, modifyEvent, EventDispatcher } from '../..'

const { expect } = chai
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
      })
    }
    const listener2 = {
      handleEvent: sinon.spy(arg => {
        expect(arg).equal(event)
        expect(arg.target).equal(dispatcher)
        expect(arg.currentTarget).equal(dispatcher)
      })
    }
    const listener3 = {
      handleEvent: sinon.spy()
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
      modifyEvent(event).eventPhase = 'capture'
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
      modifyEvent(event).eventPhase = 'bubble'
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
      modifyEvent(event).eventPhase = 'target'
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
      modifyEvent(event).eventPhase = null
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
