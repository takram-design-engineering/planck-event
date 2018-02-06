// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import { Mixin } from 'mixwith/src/mixwith'

import Namespace from '@takram/planck-core/src/Namespace'

import Event, { modifyEvent } from './Event'
import GenericEvent from './GenericEvent'

export const internal = Namespace('EventDispatcherMixin')

function handleEvent(event, listener) {
  if (typeof listener === 'function') {
    listener(event)
  } else if (typeof listener.handleEvent === 'function') {
    listener.handleEvent(event)
  } else {
    throw new Error('Listener is neither function nor event listener')
  }
}

// eslint-disable-next-line arrow-parens
export default Mixin(S => class EventDispatcherMixin extends S {
  constructor(...args) {
    super(...args)
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
    if (event.target === null) {
      modifier.target = this
    }
    // Current target should be always this
    modifier.currentTarget = this

    const scope = internal(this)
    const listeners = scope.listeners[event.type]
    if (listeners === undefined) {
      return
    }
    const { eventPhase } = event
    if (!eventPhase || eventPhase === 'target' || eventPhase === 'capture') {
      const capture = [...listeners.capture]
      for (let i = 0; i < capture.length; ++i) {
        handleEvent(event, capture[i])
        if (event.immediatePropagationStopped) {
          return
        }
      }
    }
    if (!eventPhase || eventPhase === 'target' || eventPhase === 'bubble') {
      const bubble = [...listeners.bubble]
      for (let i = 0; i < bubble.length; ++i) {
        handleEvent(event, bubble[i])
        if (event.immediatePropagationStopped) {
          return
        }
      }
    }
  }
})
