// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

/* eslint-disable no-unused-expressions */

import chai from 'chai'

import { CustomEvent, GenericEvent } from '../..'

const { expect } = chai

describe('GenericEvent', () => {
  it('supports instanceof', () => {
    const event = new GenericEvent()
    expect(event).instanceof(GenericEvent)
    expect(event).instanceof(CustomEvent)
  })

  it('initializes properties', () => {
    const event = new GenericEvent()
    expect(event.type).equal(null)
    expect(event.target).equal(null)
    expect(event.currentTarget).equal(null)
    expect(event.eventPhase).equal(null)
    expect(event.captures).false
    expect(event.bubbles).false // false!
    expect(event.timeStamp).a('number')
    expect(event.propagationStopped).false
    expect(event.immediatePropagationStopped).false
  })

  describe('#init', () => {
    it('allows call without arguments', () => {
      const event = new GenericEvent()
      expect(() => {
        event.init()
      }).not.throws()
    })

    it('initializes parent class', () => {
      const target = {}
      const event = new GenericEvent()
      event.init({
        type: 'test',
        captures: true,
        bubbles: true,
        target
      })
      expect(event.type).equal('test')
      expect(event.captures).true
      expect(event.bubbles).true
      expect(event.target).equal(target)
    })

    it('throws error when reserved parameters are given', () => {
      const event = new GenericEvent()
      expect(() => {
        event.init({ propagationStopped: true })
      }).throws(Error)
    })
  })
})
