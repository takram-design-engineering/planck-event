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

import chai from 'chai'

import { Event, CustomEvent } from '../..'

const expect = chai.expect

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
    expect(event.phase).equal(null)
    expect(event.captures).equal(false)
    expect(event.bubbles).equal(true)
    expect(event.timestamp).a('number')
    expect(event.propagationStopped).equal(false)
    expect(event.immediatePropagationStopped).equal(false)
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
    expect(event.captures).equal(false)
    expect(event.bubbles).equal(true)
  })
})
