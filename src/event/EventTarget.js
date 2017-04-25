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

import Event, { modifyEvent } from '../event/Event'
import EventDispatcher from '../event/EventDispatcher'
import GenericEvent from '../event/GenericEvent'
import Namespace from '../core/Namespace'

export const internal = Namespace('EventTarget')

export default class EventTarget extends EventDispatcher {
  constructor() {
    super()
    const scope = internal(this)
    scope.ancestorEventTarget = null
    scope.descendantEventTarget = null
  }

  get ancestorEventTarget() {
    const scope = internal(this)
    return scope.ancestorEventTarget
  }

  set ancestorEventTarget(value) {
    const scope = internal(this)
    scope.ancestorEventTarget = value || null
  }

  get descendantEventTarget() {
    const scope = internal(this)
    return scope.descendantEventTarget
  }

  set descendantEventTarget(value) {
    const scope = internal(this)
    scope.descendantEventTarget = value || null
  }

  determinePropagationPath(target = null) {
    const path = []
    if (target !== null && target !== undefined) {
      let ancestor = target
      while (ancestor !== null && ancestor !== undefined) {
        path.unshift(ancestor)
        ancestor = ancestor.ancestorEventTarget
      }
    } else {
      let descendant = this
      while (descendant !== null && descendant !== undefined) {
        path.push(descendant)
        descendant = descendant.descendantEventTarget
      }
    }
    return path
  }

  dispatchImmediateEvent(event) {
    super.dispatchEvent(event)
  }

  dispatchEvent(object, propagationPath = null) {
    let event = object
    if (!(event instanceof Event)) {
      event = new GenericEvent(object)
    }

    // Just dispatch the event if it doesn't capture nor bubble
    if (!event.captures && !event.bubbles) {
      this.dispatchImmediateEvent(event)
      return
    }

    // Determine the capturing path of this event
    let capturingPath
    if (propagationPath !== null && propagationPath !== undefined) {
      capturingPath = [...propagationPath]
    } else if (event.target) {
      capturingPath = this.determinePropagationPath(event.target)
    }

    // The last item in the propagation path must always be the event target
    const modifier = modifyEvent(event)
    if (event.target === null) {
      modifier.target = capturingPath.pop()
    } else {
      capturingPath.pop()
    }
    const bubblingPath = [...capturingPath]
    bubblingPath.reverse()

    // Capturing phase
    if (event.captures) {
      modifier.phase = 'capture'
      capturingPath.some(object => {
        modifier.currentTarget = object
        event.currentTarget.dispatchImmediateEvent(event)
        return event.propagationStopped
      })
    }
    if (event.propagationStopped) {
      return
    }

    // Target phase. The target can be an integer if the parent target has
    // multiple identifiers, typically when picking an instanced geometry.
    if (!Number.isInteger(event.target)) {
      modifier.phase = 'target'
      modifier.currentTarget = event.target
      event.currentTarget.dispatchImmediateEvent(event)
      if (event.propagationStopped) {
        return
      }
    }

    // Bubbling phase
    if (event.bubbles) {
      modifier.phase = 'bubble'
      bubblingPath.some(object => {
        modifier.currentTarget = object
        event.currentTarget.dispatchImmediateEvent(event)
        return event.propagationStopped
      })
    }
  }
}
