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
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

import { Event, EventDispatcher, EventTarget } from '../..'

const expect = chai.expect
chai.use(sinonChai)

describe('EventTarget', () => {
  it('supports instanceof', () => {
    const target = new EventTarget()
    expect(target).instanceof(EventTarget)
    expect(target).instanceof(EventDispatcher)
  })

  it('dispatches event to function listeners', () => {
    const target = new EventTarget()
    const event = new Event({ type: 'test' })
    const listener1 = sinon.spy(arg => {
      expect(arg).equal(event)
      expect(arg.target).equal(target)
      expect(arg.currentTarget).equal(target)
    })
    const listener2 = sinon.spy(arg => {
      expect(arg).equal(event)
    })
    const listener3 = sinon.spy()
    target.addEventListener('test', listener1)
    target.addEventListener('test', listener2)
    target.addEventListener('other', listener3)

    target.dispatchEvent(event)
    expect(listener1).calledOnce
    expect(listener1).calledBefore(listener2)
    expect(listener2).calledOnce
    expect(listener3).not.called
  })

  it('dispatches event to object listeners', () => {
    const target = new EventTarget()
    const event = new Event({ type: 'test' })
    const listener1 = {
      handleEvent: sinon.spy(arg => {
        expect(arg).equal(event)
        expect(arg.target).equal(target)
        expect(arg.currentTarget).equal(target)
      }),
    }
    const listener2 = {
      handleEvent: sinon.spy(arg => {
        expect(arg).equal(event)
        expect(arg.target).equal(target)
        expect(arg.currentTarget).equal(target)
      }),
    }
    const listener3 = {
      handleEvent: sinon.spy(),
    }
    target.addEventListener('test', listener1)
    target.addEventListener('test', listener2)
    target.addEventListener('other', listener3)

    target.dispatchEvent(event)
    expect(listener1.handleEvent).calledOnce
    expect(listener1.handleEvent).calledBefore(listener2.handleEvent)
    expect(listener2.handleEvent).calledOnce
    expect(listener3.handleEvent).not.called
  })

  describe('#determinePropagationPath', () => {
    it('traverse up the structure when target is supplied', () => {
      const target1 = new EventTarget()
      const target2 = new EventTarget()
      const target3 = new EventTarget()
      target1.descendantEventTarget = target2
      target2.ancestorEventTarget = target1
      target2.descendantEventTarget = target3
      target3.ancestorEventTarget = target2
      const path = target3.determinePropagationPath(target3)
      expect(path).deep.equal([target1, target2, target3])
    })

    it('traverse down the structure when no targets are supplied', () => {
      const target1 = new EventTarget()
      const target2 = new EventTarget()
      const target3 = new EventTarget()
      target1.descendantEventTarget = target2
      target2.ancestorEventTarget = target1
      target2.descendantEventTarget = target3
      target3.ancestorEventTarget = target2
      const path = target1.determinePropagationPath()
      expect(path).deep.equal([target1, target2, target3])
    })

    it('stops traversing when the structure is circular', () => {
      const target1 = new EventTarget()
      const target2 = new EventTarget()
      const target3 = new EventTarget()
      target1.ancestorEventTarget = target3
      target1.descendantEventTarget = target2
      target2.ancestorEventTarget = target1
      target2.descendantEventTarget = target3
      target3.ancestorEventTarget = target2
      target3.descendantEventTarget = target1
      const path1 = target3.determinePropagationPath(target3)
      expect(path1).deep.equal([target1, target2, target3])
      const path2 = target1.determinePropagationPath()
      expect(path2).deep.equal([target1, target2, target3])
    })
  })

  describe('#dispatchEvent', () => {
    let target1
    let target2
    let target3

    beforeEach(() => {
      target1 = new EventTarget()
      target2 = new EventTarget()
      target3 = new EventTarget()
      target1.descendantEventTarget = target2
      target2.ancestorEventTarget = target1
      target2.descendantEventTarget = target3
      target3.ancestorEventTarget = target2
    })

    it('takes object and dispatches event', () => {
      const target = new EventTarget()
      const listener = sinon.spy(arg => {
        expect(arg).instanceof(Event)
        expect(arg.target).equal(target)
        expect(arg.currentTarget).equal(target)
        expect(arg.type).equal('test')
        expect(arg.custom).equal(1)
      })
      target.addEventListener('test', listener)
      target.dispatchEvent({ type: 'test', custom: 1 })
      expect(listener).calledOnce
    })

    it('bubbles event', () => {
      const event = new Event({
        type: 'test',
        bubbles: true,
        captures: false,
      })
      const listener1 = sinon.spy(arg => {
        expect(arg).equal(event)
        expect(arg.target).equal(target3)
        expect(arg.currentTarget).equal(target1)
        expect(arg.phase).equal('bubble')
      })
      const listener2 = sinon.spy(arg => {
        expect(arg).equal(event)
        expect(arg.target).equal(target3)
        expect(arg.currentTarget).equal(target2)
        expect(arg.phase).equal('bubble')
      })
      const listener3 = sinon.spy(arg => {
        expect(arg).equal(event)
        expect(arg.target).equal(target3)
        expect(arg.currentTarget).equal(target3)
        expect(arg.phase).equal('target')
      })
      target1.addEventListener('test', listener1, false)
      target2.addEventListener('test', listener2, false)
      target3.addEventListener('test', listener3, false)

      target3.dispatchEvent(event)
      expect(listener3).calledOnce
      expect(listener3).calledBefore(listener2)
      expect(listener2).calledOnce
      expect(listener2).calledBefore(listener1)
      expect(listener1).calledOnce
    })

    it('bubbles event with propagation path', () => {
      const event = new Event({
        type: 'test',
        bubbles: true,
        captures: false,
      })
      const listener1 = sinon.spy(arg => {
        expect(arg).equal(event)
        expect(arg.target).equal(target1)
        expect(arg.currentTarget).equal(target1)
        expect(arg.phase).equal('target')
      })
      const listener2 = sinon.spy(arg => {
        expect(arg).equal(event)
        expect(arg.target).equal(target1)
        expect(arg.currentTarget).equal(target2)
        expect(arg.phase).equal('bubble')
      })
      const listener3 = sinon.spy(arg => {
        expect(arg).equal(event)
        expect(arg.target).equal(target1)
        expect(arg.currentTarget).equal(target3)
        expect(arg.phase).equal('bubble')
      })
      target1.addEventListener('test', listener1, false)
      target2.addEventListener('test', listener2, false)
      target3.addEventListener('test', listener3, false)

      target1.dispatchEvent(event, [target3, target2, target1])
      expect(listener3).calledOnce
      expect(listener3).calledAfter(listener2)
      expect(listener2).calledOnce
      expect(listener2).calledAfter(listener1)
      expect(listener1).calledOnce
    })

    it('captures event', () => {
      const event = new Event({
        type: 'test',
        bubbles: false,
        captures: true,
      })
      const listener1 = sinon.spy(arg => {
        expect(arg).equal(event)
        expect(arg.target).equal(target3)
        expect(arg.currentTarget).equal(target1)
        expect(arg.phase).equal('capture')
      })
      const listener2 = sinon.spy(arg => {
        expect(arg).equal(event)
        expect(arg.target).equal(target3)
        expect(arg.currentTarget).equal(target2)
        expect(arg.phase).equal('capture')
      })
      const listener3 = sinon.spy(arg => {
        expect(arg).equal(event)
        expect(arg.target).equal(target3)
        expect(arg.currentTarget).equal(target3)
        expect(arg.phase).equal('target')
      })
      target1.addEventListener('test', listener1, true)
      target2.addEventListener('test', listener2, true)
      target3.addEventListener('test', listener3, true)

      target3.dispatchEvent(event)
      expect(listener3).calledOnce
      expect(listener3).calledAfter(listener2)
      expect(listener2).calledOnce
      expect(listener2).calledAfter(listener1)
      expect(listener1).calledOnce
    })

    it('captures event with propagation path', () => {
      const event = new Event({
        type: 'test',
        bubbles: false,
        captures: true,
      })
      const listener1 = sinon.spy(arg => {
        expect(arg).equal(event)
        expect(arg.target).equal(target1)
        expect(arg.currentTarget).equal(target1)
        expect(arg.phase).equal('target')
      })
      const listener2 = sinon.spy(arg => {
        expect(arg).equal(event)
        expect(arg.target).equal(target1)
        expect(arg.currentTarget).equal(target2)
        expect(arg.phase).equal('capture')
      })
      const listener3 = sinon.spy(arg => {
        expect(arg).equal(event)
        expect(arg.target).equal(target1)
        expect(arg.currentTarget).equal(target3)
        expect(arg.phase).equal('capture')
      })
      target1.addEventListener('test', listener1, true)
      target2.addEventListener('test', listener2, true)
      target3.addEventListener('test', listener3, true)

      target1.dispatchEvent(event, [target3, target2, target1])
      expect(listener3).calledOnce
      expect(listener3).calledBefore(listener2)
      expect(listener2).calledOnce
      expect(listener2).calledBefore(listener1)
      expect(listener1).calledOnce
    })

    it('stops propagation while bubbling', () => {
      const listener1 = sinon.spy()
      const listener2 = sinon.spy(arg => {
        arg.stopPropagation()
      })
      const listener3 = sinon.spy()
      const listener4 = sinon.spy()
      target1.addEventListener('test', listener1, false)
      target2.addEventListener('test', listener2, false)
      target2.addEventListener('test', listener3, false)
      target3.addEventListener('test', listener4, false)
      const event = new Event({
        type: 'test',
        bubbles: true,
        captures: false,
      })
      target3.dispatchEvent(event)
      expect(listener1).not.called
      expect(listener2).calledOnce
      expect(listener3).calledOnce
      expect(listener4).calledOnce
    })

    it('stops immediate propagation while bubbling', () => {
      const listener1 = sinon.spy()
      const listener2 = sinon.spy(arg => {
        arg.stopImmediatePropagation()
      })
      const listener3 = sinon.spy()
      const listener4 = sinon.spy()
      target1.addEventListener('test', listener1, false)
      target2.addEventListener('test', listener2, false)
      target2.addEventListener('test', listener3, false)
      target3.addEventListener('test', listener4, false)
      const event = new Event({
        type: 'test',
        bubbles: true,
        captures: false,
      })
      target3.dispatchEvent(event)
      expect(listener1).not.called
      expect(listener2).calledOnce
      expect(listener3).not.called
      expect(listener4).calledOnce
    })

    it('stops propagation on target', () => {
      const listener1 = sinon.spy()
      const listener2 = sinon.spy(arg => {
        arg.stopPropagation()
      })
      const listener3 = sinon.spy()
      const listener4 = sinon.spy()
      target2.addEventListener('test', listener1, true)
      target3.addEventListener('test', listener2, false)
      target3.addEventListener('test', listener3, false)
      target2.addEventListener('test', listener4, false)
      const event = new Event({
        type: 'test',
        bubbles: true,
        captures: true,
      })
      target3.dispatchEvent(event)
      expect(listener1).calledOnce
      expect(listener2).calledOnce
      expect(listener3).calledOnce
      expect(listener4).not.called
    })

    it('stops immediate propagation on target', () => {
      const listener1 = sinon.spy()
      const listener2 = sinon.spy(arg => {
        arg.stopImmediatePropagation()
      })
      const listener3 = sinon.spy()
      const listener4 = sinon.spy()
      target2.addEventListener('test', listener1, true)
      target3.addEventListener('test', listener2, true)
      target3.addEventListener('test', listener3, false)
      target2.addEventListener('test', listener4, false)
      const event = new Event({
        type: 'test',
        bubbles: true,
        captures: true,
      })
      target3.dispatchEvent(event)
      expect(listener1).calledOnce
      expect(listener2).calledOnce
      expect(listener3).not.called
      expect(listener4).not.called
    })

    it('stops propagation while capturing', () => {
      const listener1 = sinon.spy()
      const listener2 = sinon.spy(arg => {
        arg.stopPropagation()
      })
      const listener3 = sinon.spy()
      const listener4 = sinon.spy()
      target1.addEventListener('test', listener1, true)
      target2.addEventListener('test', listener2, true)
      target2.addEventListener('test', listener3, true)
      target3.addEventListener('test', listener4, true)
      const event = new Event({
        type: 'test',
        bubbles: false,
        captures: true,
      })
      target3.dispatchEvent(event)
      expect(listener1).calledOnce
      expect(listener2).calledOnce
      expect(listener3).calledOnce
      expect(listener4).not.called
    })

    it('stops immediate propagation while capturing', () => {
      const listener1 = sinon.spy()
      const listener2 = sinon.spy(arg => {
        arg.stopImmediatePropagation()
      })
      const listener3 = sinon.spy()
      const listener4 = sinon.spy()
      target1.addEventListener('test', listener1, true)
      target2.addEventListener('test', listener2, true)
      target2.addEventListener('test', listener3, true)
      target3.addEventListener('test', listener4, true)
      const event = new Event({
        type: 'test',
        bubbles: false,
        captures: true,
      })
      target3.dispatchEvent(event)
      expect(listener1).calledOnce
      expect(listener2).calledOnce
      expect(listener3).not.called
      expect(listener4).not.called
    })
  })
})
