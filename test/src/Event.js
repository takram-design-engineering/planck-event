// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

/* eslint-disable no-unused-expressions */

import chai from 'chai'

import { Event, modifyEvent } from '../..'

const { expect } = chai

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
        bubbles: false
      })
      event.stopImmediatePropagation()
      const target = {}
      const currentTarget = {}
      modifyEvent(event).target = target
      modifyEvent(event).currentTarget = currentTarget
      modifyEvent(event).eventPhase = 'bubble'
      const { timeStamp } = event
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
