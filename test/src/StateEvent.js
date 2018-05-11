// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

/* eslint-disable no-unused-expressions */

import 'source-map-support/register'

import chai from 'chai'

import { CustomEvent, StateEvent } from '../..'

const { expect } = chai

describe('StateEvent', () => {
  it('supports instanceof', () => {
    const event = new StateEvent({ name: 'name' })
    expect(event).instanceof(StateEvent)
    expect(event).instanceof(CustomEvent)
  })

  it('initializes properties', () => {
    const event = new StateEvent({ name: 'name' })
    expect(event.type).equal(StateEvent.type('name'))
    expect(event.target).equal(null)
    expect(event.currentTarget).equal(null)
    expect(event.eventPhase).equal(null)
    expect(event.captures).false
    expect(event.bubbles).true
    expect(event.timeStamp).a('number')
    expect(event.propagationStopped).false
    expect(event.immediatePropagationStopped).false
  })

  it('takes target as a parameter', () => {
    const target = {}
    const event = new StateEvent({ target, name: 'name' })
    expect(event.target).equal(target)
  })

  it('takes name and value as parameters', () => {
    const value = {}
    const event = new StateEvent({ name: 'name', value })
    expect(event.name).equal('name')
    expect(event.value).equal(value)
  })

  it('initializes parent class', () => {
    const event = new StateEvent({
      type: 'test',
      captures: true,
      bubbles: false,
      name: 'name'
    })
    expect(event.type).equal(StateEvent.type('name'))
    expect(event.captures).true
    expect(event.bubbles).false
  })
})
