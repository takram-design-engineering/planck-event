// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import 'source-map-support/register'

import chai from 'chai'

import { Global } from '@takram/planck-core'

import { EventBundle, KeyboardEvent } from '../..'

const { expect } = chai

describe('KeyboardEvent', () => {
  if (Global.isNode) {
    Global.scope.Event = class {
      constructor(type) {
        this.defaultPrevented = false
      }

      preventDefault() {
        this.defaultPrevented = true
      }
    }
  }

  it('supports instanceof', () => {
    const event = new KeyboardEvent()
    expect(event).instanceof(KeyboardEvent)
    expect(event).instanceof(EventBundle)
  })

  it('initializes properties', () => {
    const event = new KeyboardEvent()
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
      const event = new KeyboardEvent()
      expect(() => {
        event.init()
      }).not.throws()
    })

    it('initializes parent class', () => {
      const originalEvent = new Global.scope.Event('')
      const event = new KeyboardEvent()
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
