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

import { Binding, StateEvent, EventDispatcher } from '../..'

const expect = chai.expect

describe('Binding', () => {
  function createObject(name, value) {
    return new (class extends EventDispatcher {
      constructor() {
        super()
        this.states = { [name]: value }
      }

      get [name]() {
        return this.states[name]
      }

      set [name](value) {
        if (value !== this.states[name]) {
          this.states[name] = value
          this.dispatchEvent(new StateEvent({ name, value }))
        }
      }
    })()
  }

  it('defaults to two-ways binding for single target', () => {
    const name = 'value'
    const source = createObject(name)
    const target1 = createObject('a', 0)
    const target2 = createObject('b', 0)
    source.value = 1
    Binding.bind(source, name, [
      target1, 'a',
    ])
    Binding.bind(source, name, [
      target2, 'b',
    ])
    expect(target1.a).equal(1)
    expect(target2.b).equal(1)
    source.value = 2
    expect(target1.a).equal(2)
    expect(target2.b).equal(2)
    target1.a = 3
    expect(source.value).equal(3)
    target2.b = 4
    expect(source.value).equal(4)
  })

  it('defaults to one-way binding for multiple targets', () => {
    const name = 'value'
    const source = createObject(name)
    const target1 = createObject('a', 0)
    const target2 = createObject('b', 0)
    source.value = 1
    Binding.bind(source, name, [
      target1, 'a',
      target2, 'b',
    ])
    expect(target1.a).equal(1)
    expect(target2.b).equal(1)
    source.value = 2
    expect(target1.a).equal(2)
    expect(target2.b).equal(2)
    target1.a = 3
    expect(source.value).equal(2)
    target2.b = 4
    expect(source.value).equal(2)
  })

  it('takes transform function as an option', () => {
    const name = 'value'
    const source = createObject(name)
    const target1 = createObject('a', 0)
    const target2 = createObject('b', 0)
    source.value = 1
    Binding.bind(source, name, [
      target1, 'a',
      target2, 'b',
    ], {
      oneWay: true,
      transform: value => +`${value}0`,
    })
    expect(target1.a).equal(10)
    expect(target2.b).equal(10)
    source.value = 2
    expect(target1.a).equal(20)
    expect(target2.b).equal(20)
    target1.a = 3
    expect(source.value).equal(2)
    target2.b = 4
    expect(source.value).equal(2)
  })

  it('takes inverse transform function as an option', () => {
    const name = 'value'
    const source = createObject(name)
    const target1 = createObject('a', 0)
    const target2 = createObject('b', 0)
    source.value = 1
    Binding.bind(source, name, [
      target1, 'a',
      target2, 'b',
    ], {
      oneWay: false,
      transform: value => +`${value}0`,
      inverseTransform: value => +`${value}`.slice(0, -1),
    })
    expect(target1.a).equal(10)
    expect(target2.b).equal(10)
    source.value = 2
    expect(target1.a).equal(20)
    expect(target2.b).equal(20)
    target1.a = 30
    expect(source.value).equal(3)
    target2.b = 40
    expect(source.value).equal(4)
  })

  it('overwrites duplicated bindings', () => {
    const name = 'value'
    const source = createObject(name)
    const target1 = createObject('a', 0)
    source.value = 1
    Binding.bind(source, name, [
      target1, 'a',
    ])
    expect(target1.a).equal(1)
    source.value = 2
    expect(target1.a).equal(2)
    target1.a = 3
    expect(source.value).equal(3)

    Binding.bind(source, name, [
      target1, 'a',
    ], {
      transform: value => +`${value}0`,
      inverseTransform: value => +`${value}`.slice(0, -1),
    })
  })

  it('unbinds targets from source', () => {
    const name = 'value'
    const source = createObject(name)
    const target1 = createObject('a', 0)
    const target2 = createObject('b', 0)
    const target3 = createObject('c', 0)
    source.value = 1
    Binding.bind(source, name, target1, 'a', { oneWay: true })
    Binding.bind(target2, 'b', source, name)
    Binding.bind(source, name, target3, 'c')

    // Reason:
    //   1. target1.a = source.value (1)
    //   2. source.value = target2.b (0)
    //   3. 2. propagates to target1.a
    //   4. target3.c = source.value (0)
    expect(source.value).equal(0)
    expect(target1.a).equal(0)
    expect(target2.b).equal(0)
    expect(target3.c).equal(0)

    source.value = 2
    expect(source.value).equal(2)
    expect(target1.a).equal(2)
    expect(target2.b).equal(2)
    expect(target3.c).equal(2)

    target1.a = 3
    expect(source.value).equal(2)
    expect(target1.a).equal(3)
    expect(target2.b).equal(2)
    expect(target3.c).equal(2)

    target2.b = 4
    expect(source.value).equal(4)
    expect(target1.a).equal(4)
    expect(target2.b).equal(4)
    expect(target3.c).equal(4)

    target3.c = 5
    expect(source.value).equal(5)
    expect(target1.a).equal(5)
    expect(target2.b).equal(5)
    expect(target3.c).equal(5)

    Binding.unbind(source, name, [
      target1, 'a',
      target2, 'b',
    ], {
      oneWay: true,
    })

    source.value = 6
    expect(source.value).equal(6)
    expect(target1.a).equal(5)
    expect(target2.b).equal(5)
    expect(target3.c).equal(6)

    target2.b = 7
    expect(source.value).equal(7)
    expect(target1.a).equal(5)
    expect(target2.b).equal(7)
    expect(target3.c).equal(7)

    target3.c = 8
    expect(source.value).equal(8)
    expect(target1.a).equal(5)
    expect(target2.b).equal(7)
    expect(target3.c).equal(8)

    Binding.unbind(target2, 'b', source, name)

    target2.b = 9
    expect(source.value).equal(8)
    expect(target1.a).equal(5)
    expect(target2.b).equal(9)
    expect(target3.c).equal(8)

    Binding.unbindAll(source, name)

    source.value = 10
    expect(source.value).equal(10)
    expect(target1.a).equal(5)
    expect(target2.b).equal(9)
    expect(target3.c).equal(8)
  })

  describe('one-way binding', () => {
    it('binds/unbinds source’s property to a target', () => {
      const name = 'value'
      const source = createObject(name)
      const target1 = createObject('a', 0)
      const target2 = createObject('b', 0)
      source.value = 1
      Binding.bind(source, 'value', target1, 'a', {
        oneWay: true,
      })
      Binding.bind(source, 'value', target2, 'b', {
        oneWay: true,
      })
      expect(target1.a).equal(1)
      expect(target2.b).equal(1)
      source.value = 2
      expect(target1.a).equal(2)
      expect(target2.b).equal(2)
      target1.a = 3
      target2.b = 4
      expect(source.value).equal(2)

      Binding.unbind(source, 'value', target1, 'a', {
        oneWay: true,
      })
      Binding.unbind(source, 'value', target2, 'b', {
        oneWay: true,
      })
      source.value = 5
      expect(target1.a).equal(3)
      expect(target2.b).equal(4)
    })

    it('binds/unbinds source’s property to targets', () => {
      const name = 'value'
      const source = createObject(name)
      const target1 = createObject('a', 0)
      const target2 = createObject('b', 0)
      source.value = 1
      Binding.bind(source, 'value',
        target1, 'a',
        target2, 'b', {
          oneWay: true,
        })
      expect(target1.a).equal(1)
      expect(target2.b).equal(1)
      source.value = 2
      expect(target1.a).equal(2)
      expect(target2.b).equal(2)
      target1.a = 3
      target2.b = 4
      expect(source.value).equal(2)

      Binding.unbind(source, 'value',
        target1, 'a',
        target2, 'b', {
          oneWay: true,
        })
      source.value = 5
      expect(target1.a).equal(3)
      expect(target2.b).equal(4)
    })

    it('binds/unbinds source’s property to an array of targets', () => {
      const name = 'value'
      const source = createObject(name)
      const target1 = createObject('a', 0)
      const target2 = createObject('b', 0)
      source.value = 1
      Binding.bind(source, name, [
        target1, 'a',
        target2, 'b',
      ], { oneWay: true })
      expect(target1.a).equal(1)
      expect(target2.b).equal(1)
      source.value = 2
      expect(target1.a).equal(2)
      expect(target2.b).equal(2)
      target1.a = 3
      target2.b = 4
      expect(source.value).equal(2)

      Binding.unbind(source, name, [
        target1, 'a',
        target2, 'b',
      ], { oneWay: true })
      source.value = 5
      expect(target1.a).equal(3)
      expect(target2.b).equal(4)
    })
  })

  describe('two-way binding', () => {
    it('binds/unbinds source’s property to a target', () => {
      const name = 'value'
      const source = createObject(name)
      const target1 = createObject('a', 0)
      const target2 = createObject('b', 0)
      source.value = 1
      Binding.bind(source, 'value', target1, 'a', {
        oneWay: false,
      })
      Binding.bind(source, 'value', target2, 'b', {
        oneWay: false,
      })
      expect(source.value).equal(1)
      expect(target1.a).equal(1)
      expect(target2.b).equal(1)
      source.value = 2
      expect(source.value).equal(2)
      expect(target1.a).equal(2)
      expect(target2.b).equal(2)
      target1.a = 3
      expect(source.value).equal(3)
      expect(target1.a).equal(3)
      expect(target2.b).equal(3)
      target2.b = 4
      expect(source.value).equal(4)
      expect(target1.a).equal(4)
      expect(target2.b).equal(4)

      Binding.unbind(source, 'value', target1, 'a', {
        oneWay: false,
      })
      Binding.unbind(source, 'value', target2, 'b', {
        oneWay: false,
      })
      source.value = 5
      expect(source.value).equal(5)
      expect(target1.a).equal(4)
      expect(target2.b).equal(4)
      target1.a = 6
      expect(source.value).equal(5)
      expect(target1.a).equal(6)
      expect(target2.b).equal(4)
      target2.b = 7
      expect(source.value).equal(5)
      expect(target1.a).equal(6)
      expect(target2.b).equal(7)
    })

    it('binds/unbinds source’s property to targets', () => {
      const name = 'value'
      const source = createObject(name)
      const target1 = createObject('a', 0)
      const target2 = createObject('b', 0)
      source.value = 1
      Binding.bind(source, 'value',
        target1, 'a',
        target2, 'b', {
          oneWay: false,
        })
      expect(source.value).equal(1)
      expect(target1.a).equal(1)
      expect(target2.b).equal(1)
      source.value = 2
      expect(source.value).equal(2)
      expect(target1.a).equal(2)
      expect(target2.b).equal(2)
      target1.a = 3
      expect(source.value).equal(3)
      expect(target1.a).equal(3)
      expect(target2.b).equal(3)
      target2.b = 4
      expect(source.value).equal(4)
      expect(target1.a).equal(4)
      expect(target2.b).equal(4)

      Binding.unbind(source, 'value',
        target1, 'a',
        target2, 'b', {
          oneWay: false,
        })
      source.value = 5
      expect(source.value).equal(5)
      expect(target1.a).equal(4)
      expect(target2.b).equal(4)
      target1.a = 6
      expect(source.value).equal(5)
      expect(target1.a).equal(6)
      expect(target2.b).equal(4)
      target2.b = 7
      expect(source.value).equal(5)
      expect(target1.a).equal(6)
      expect(target2.b).equal(7)
    })

    it('binds/unbinds source’s property to an array of targets', () => {
      const name = 'value'
      const source = createObject(name)
      const target1 = createObject('a', 0)
      const target2 = createObject('b', 0)
      source.value = 1
      Binding.bind(source, name, [
        target1, 'a',
        target2, 'b',
      ], { oneWay: false })
      expect(source.value).equal(1)
      expect(target1.a).equal(1)
      expect(target2.b).equal(1)
      source.value = 2
      expect(source.value).equal(2)
      expect(target1.a).equal(2)
      expect(target2.b).equal(2)
      target1.a = 3
      expect(source.value).equal(3)
      expect(target1.a).equal(3)
      expect(target2.b).equal(3)
      target2.b = 4
      expect(source.value).equal(4)
      expect(target1.a).equal(4)
      expect(target2.b).equal(4)

      Binding.unbind(source, name, [
        target1, 'a',
        target2, 'b',
      ], { oneWay: false })
      source.value = 5
      expect(source.value).equal(5)
      expect(target1.a).equal(4)
      expect(target2.b).equal(4)
      target1.a = 6
      expect(source.value).equal(5)
      expect(target1.a).equal(6)
      expect(target2.b).equal(4)
      target2.b = 7
      expect(source.value).equal(5)
      expect(target1.a).equal(6)
      expect(target2.b).equal(7)
    })
  })
})
