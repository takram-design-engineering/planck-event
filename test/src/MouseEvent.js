// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

/* eslint-disable no-unused-expressions */

import chai from 'chai'

import { isNode, globalScope } from '@takram/planck-core'

import { EventBundle, MouseEvent } from '../..'

const { expect } = chai

describe('MouseEvent', () => {
  if (isNode) {
    globalScope.Event = class {
      constructor (type) {
        this.defaultPrevented = false
      }

      preventDefault () {
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
        x: 1, y: 2, movementX: 3, movementY: 4
      })
      expect(event.x).equal(1)
      expect(event.y).equal(2)
      expect(event.movementX).equal(3)
      expect(event.movementY).equal(4)
    })

    it('initializes parent class', () => {
      const originalEvent = new globalScope.Event('')
      const event = new MouseEvent()
      event.init({
        type: 'test',
        captures: true,
        bubbles: false,
        originalEvent
      })
      expect(event.type).equal('test')
      expect(event.captures).true
      expect(event.bubbles).false
      expect(event.originalEvent).equal(originalEvent)
    })
  })
})
