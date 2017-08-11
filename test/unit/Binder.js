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

import { Binder, StateEvent, EventDispatcher, EventTarget } from '../..'

const expect = chai.expect

describe('Binder', () => {
  it('binds source’s property to targets', () => {
    const source = new EventDispatcher()
    const name = 'test'
    const object1 = { a: 0 }
    const object2 = { b: 0 }
    const targets = [
      { object: object1, name: 'a' },
      { object: object2, name: 'b' },
    ]
    const binder = new Binder(source, name, targets)
    expect(object1.a).equal(0)
    expect(object2.b).equal(0)
    source.dispatchEvent(new StateEvent({ name, value: 1 }))
    expect(object1.a).equal(1)
    expect(object2.b).equal(1)
    source.dispatchEvent(new StateEvent({ name, value: 2 }))
    expect(object1.a).equal(2)
    expect(object2.b).equal(2)
    source.dispatchEvent(new StateEvent({ name: 'other', value: 3 }))
    expect(object1.a).equal(2)
    expect(object2.b).equal(2)
    binder.unbindAll()
  })

  it('initializes source’s property to targets when the flag is set', () => {
    const source = new EventDispatcher()
    const name = 'test'
    source[name] = 1
    const object1 = { a: 0 }
    const object2 = { b: 0 }
    const targets = [
      { object: object1, name: 'a' },
      { object: object2, name: 'b' },
    ]
    const binder = new Binder(source, name, targets, {
      assigns: true,
    })
    expect(object1.a).equal(1)
    expect(object2.b).equal(1)
    source.dispatchEvent(new StateEvent({ name, value: 2 }))
    expect(object1.a).equal(2)
    expect(object2.b).equal(2)
    source.dispatchEvent(new StateEvent({ name, value: 3 }))
    expect(object1.a).equal(3)
    expect(object2.b).equal(3)
    source.dispatchEvent(new StateEvent({ name: 'other', value: 4 }))
    expect(object1.a).equal(3)
    expect(object2.b).equal(3)
    binder.unbindAll()
  })

  it('transforms source’s property when the function is given', () => {
    const source = new EventDispatcher()
    const name = 'test'
    source[name] = 1
    const object1 = { a: 0 }
    const object2 = { b: 0 }
    const targets = [
      { object: object1, name: 'a' },
      { object: object2, name: 'b' },
    ]
    const binder1 = new Binder(source, name, targets, {
      transform: value => +`${value}0`,
    })
    expect(object1.a).equal(0)
    expect(object2.b).equal(0)
    source.dispatchEvent(new StateEvent({ name, value: 1 }))
    expect(object1.a).equal(10)
    expect(object2.b).equal(10)
    source.dispatchEvent(new StateEvent({ name, value: 2 }))
    expect(object1.a).equal(20)
    expect(object2.b).equal(20)
    source.dispatchEvent(new StateEvent({ name: 'other', value: 3 }))
    expect(object1.a).equal(20)
    expect(object2.b).equal(20)
    binder1.unbindAll()

    const binder2 = new Binder(source, name, targets, {
      assigns: true,
      transform: value => +`${value}0`,
    })
    expect(object1.a).equal(10)
    expect(object2.b).equal(10)
    source.dispatchEvent(new StateEvent({ name, value: 2 }))
    expect(object1.a).equal(20)
    expect(object2.b).equal(20)
    source.dispatchEvent(new StateEvent({ name, value: 3 }))
    expect(object1.a).equal(30)
    expect(object2.b).equal(30)
    source.dispatchEvent(new StateEvent({ name: 'other', value: 4 }))
    expect(object1.a).equal(30)
    expect(object2.b).equal(30)
    binder2.unbindAll()
  })

  it('ignores bubbling or capturing events', () => {
    const target1 = new EventTarget()
    const target2 = new EventTarget()
    const target3 = new EventTarget()
    target1.descendantEventTarget = target2
    target2.ancestorEventTarget = target1
    target2.descendantEventTarget = target3
    target3.ancestorEventTarget = target2

    const name = 'test'
    const object1 = { a: 0 }
    const object2 = { b: 0 }
    const targets = [
      { object: object1, name: 'a' },
      { object: object2, name: 'b' },
    ]
    // eslint-disable-next-line no-unused-vars
    const binder = new Binder(target2, name, targets)
    target3.dispatchEvent(new StateEvent({ name, value: 1, bubbles: true }))
    expect(object1.a).equal(0)
    expect(object2.b).equal(0)
    target1.dispatchEvent(new StateEvent({ name, value: 1, captures: true }))
    expect(object1.a).equal(0)
    expect(object2.b).equal(0)
  })

  describe('#matches', () => {
    it('true when it holds all the given targets', () => {
      const source = new EventDispatcher()
      const name = 'test'
      const object = {}
      const targets = [
        { object: {}, name: 'a' },
        { object: {}, name: 'a' },
        { object, name: 'a' },
        { object, name: 'b' },
      ]
      const binder = new Binder(source, name, targets)
      expect(binder.matches([
        { object, name: 'a' },
      ])).true
      expect(binder.matches([
        { object, name: 'a' },
        { object, name: 'b' },
      ])).true
      expect(binder.matches([
        { object, name: 'a' },
        { object: {}, name: 'a' },
      ])).false
      expect(binder.matches([
        { object: {}, name: 'a' },
      ])).false
      expect(binder.matches([])).false
    })
  })

  describe('#unbind', () => {
    it('unbinds source’s property from targets', () => {
      const source = new EventDispatcher()
      const name = 'test'
      const object1 = { a: 0 }
      const object2 = { b: 0 }
      const object3 = { c: 0 }
      const targets = [
        { object: object1, name: 'a' },
        { object: object2, name: 'b' },
        { object: object3, name: 'c' },
      ]
      const binder = new Binder(source, name, targets)
      source.dispatchEvent(new StateEvent({ name, value: 1 }))
      expect(object1.a).equal(1)
      expect(object2.b).equal(1)
      expect(object3.c).equal(1)
      expect(binder.unbind([
        { object: object1, name: 'a' },
        { object: object2, name: 'b' },
      ])).deep.equal([
        { object: object1, name: 'a' },
        { object: object2, name: 'b' },
      ])
      source.dispatchEvent(new StateEvent({ name, value: 2 }))
      expect(object1.a).equal(1)
      expect(object2.b).equal(1)
      expect(object3.c).equal(2)
      expect(binder.unbind([
        { object: object3, name: 'c' },
      ])).deep.equal([
        { object: object3, name: 'c' },
      ])
      expect(binder.empty).true
      source.dispatchEvent(new StateEvent({ name, value: 3 }))
      expect(object1.a).equal(1)
      expect(object2.b).equal(1)
      expect(object3.c).equal(2)
    })
  })

  describe('#unbindAll', () => {
    it('unbinds source’s property from targets', () => {
      const source = new EventDispatcher()
      const name = 'test'
      const object1 = { a: 0 }
      const object2 = { b: 0 }
      const targets = [
        { object: object1, name: 'a' },
        { object: object2, name: 'b' },
      ]
      const binder = new Binder(source, name, targets)
      source.dispatchEvent(new StateEvent({ name, value: 1 }))
      expect(object1.a).equal(1)
      expect(object2.b).equal(1)
      expect(binder.unbindAll()).deep.equal([
        { object: object1, name: 'a' },
        { object: object2, name: 'b' },
      ])
      expect(binder.empty).true
      source.dispatchEvent(new StateEvent({ name, value: 2 }))
      expect(object1.a).equal(1)
      expect(object2.b).equal(1)
    })
  })
})
