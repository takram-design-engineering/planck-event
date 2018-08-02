// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

/* eslint-disable no-unused-expressions */

import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

import { isNode, globalScope } from '@takram/planck-core'

import { Event, EventBundle } from '../..'

const { expect } = chai
chai.use(sinonChai)

describe('EventBundle', () => {
  if (isNode) {
    globalScope.Event = class Event {
      constructor () {
        this.cancelable = true
        this.defaultPrevented = false
      }

      preventDefault () {
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
    expect(event.eventPhase).equal(null)
    expect(event.captures).false
    expect(event.bubbles).true
    expect(event.timeStamp).a('number')
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
      const originalEvent = new globalScope.Event('')
      const event = new EventBundle()
      event.init({ originalEvent })
      expect(event.originalEvent).equal(originalEvent)
    })

    it('initializes parent class', () => {
      const event = new EventBundle()
      event.init({
        type: 'test',
        captures: true,
        bubbles: false
      })
      expect(event.type).equal('test')
      expect(event.captures).true
      expect(event.bubbles).false
    })
  })

  describe('#preventDefault', () => {
    it('propagates to original event', () => {
      const originalEvent = new globalScope.Event('')
      sinon.spy(originalEvent, 'preventDefault')
      const event = new EventBundle()
      event.init({ originalEvent })
      event.preventDefault()
      expect(originalEvent.preventDefault).calledOnce
      originalEvent.preventDefault.restore()
    })
  })
})
