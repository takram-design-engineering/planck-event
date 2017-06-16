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

import { Namespace } from '@takram/planck-core'

import { default as Event, modifyEvent } from '../event/Event'
import GenericEvent from '../event/GenericEvent'

export const internal = Namespace('EventDispatcher')

function handleEvent(event, listener) {
  if (typeof listener === 'function') {
    listener(event)
  } else if (typeof listener.handleEvent === 'function') {
    listener.handleEvent(event)
  } else {
    throw new Error('Listener is neither function nor event listener')
  }
}

export default class EventDispatcher {
  constructor() {
    const scope = internal(this)
    scope.listeners = {}
  }

  addEventListener(type, listener, capture = false) {
    if (typeof listener !== 'function' && typeof listener !== 'object') {
      throw new Error('Attempt to add non-function non-object listener')
    }
    const scope = internal(this)
    if (scope.listeners[type] === undefined) {
      scope.listeners[type] = { bubble: [], capture: [] }
    }
    const listeners = (capture ?
      scope.listeners[type].capture :
      scope.listeners[type].bubble)
    if (listeners.includes(listener)) {
      return
    }
    listeners.push(listener)
  }

  removeEventListener(type, listener, capture = false) {
    const scope = internal(this)
    if (scope.listeners[type] === undefined) {
      return
    }
    const listeners = (capture ?
      scope.listeners[type].capture :
      scope.listeners[type].bubble)
    const index = listeners.indexOf(listener)
    if (index !== -1) {
      listeners.splice(index, 1)
    }
  }

  on(...args) {
    this.addEventListener(...args)
    return this
  }

  off(...args) {
    this.removeEventListener(...args)
    return this
  }

  once(type, listener, ...rest) {
    const delegate = event => {
      handleEvent(event, listener)
      this.removeEventListener(type, delegate, ...rest)
    }
    this.addEventListener(type, delegate, ...rest)
    return this
  }

  dispatchEvent(object) {
    let event = object
    if (!(event instanceof Event)) {
      event = new GenericEvent(object)
    }
    const modifier = modifyEvent(event)

    // Set target to this when it's not set
    if (!event.target) {
      modifier.target = this
    }
    // Current target should be always this
    modifier.currentTarget = this

    const scope = internal(this)
    const listeners = scope.listeners[event.type]
    if (listeners === undefined) {
      return
    }
    const phase = event.phase
    if (!phase || phase === 'target' || phase === 'capture') {
      [...listeners.capture].some(listener => {
        handleEvent(event, listener)
        return event.immediatePropagationStopped
      })
    }
    if (event.immediatePropagationStopped) {
      return
    }
    if (!phase || phase === 'target' || phase === 'bubble') {
      [...listeners.bubble].some(listener => {
        handleEvent(event, listener)
        return event.immediatePropagationStopped
      })
    }
  }
}
