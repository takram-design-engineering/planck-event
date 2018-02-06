// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import 'source-map-support/register'

import chai from 'chai'

import { Event, CustomEvent } from '../..'

const { expect } = chai

describe('CustomEvent', () => {
  it('supports instanceof', () => {
    const event = new CustomEvent()
    expect(event).instanceof(CustomEvent)
    expect(event).instanceof(Event)
  })

  it('initializes properties', () => {
    const event = new CustomEvent()
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

  it('takes target as a parameter', () => {
    const target = {}
    const event = new CustomEvent({ target })
    expect(event.target).equal(target)
  })

  it('initializes parent class', () => {
    const event = new CustomEvent({
      type: 'test',
      captures: false,
      bubbles: true,
    })
    expect(event.type).equal('test')
    expect(event.captures).false
    expect(event.bubbles).true
  })
})
