// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import Global from '@takram/planck-core/src/Global'
import Namespace from '@takram/planck-core/src/Namespace'

export const internal = Namespace('Event')

export default class Event {
  constructor (options = {}) {
    this.init(options)
  }

  init ({
    type, captures = false, bubbles = true, cancelable = true
  } = {}) {
    const scope = internal(this)
    scope.type = type !== undefined ? type : null
    scope.captures = !!captures
    scope.bubbles = !!bubbles
    scope.cancelable = !!cancelable
    scope.timeStamp = (
      Global.scope.performance &&
      Global.scope.performance.now &&
      Global.scope.performance.now()) || Date.now()
    scope.propagationStopped = false
    scope.immediatePropagationStopped = false
    scope.defaultPrevented = false
    scope.target = null
    scope.currentTarget = null
    scope.eventPhase = null
    return this
  }

  get type () {
    const scope = internal(this)
    return scope.type
  }

  get target () {
    const scope = internal(this)
    return scope.target
  }

  get currentTarget () {
    const scope = internal(this)
    return scope.currentTarget
  }

  get eventPhase () {
    const scope = internal(this)
    return scope.eventPhase
  }

  get captures () {
    const scope = internal(this)
    return scope.captures
  }

  get bubbles () {
    const scope = internal(this)
    return scope.bubbles
  }

  get cancelable () {
    const scope = internal(this)
    return scope.cancelable
  }

  get timeStamp () {
    const scope = internal(this)
    return scope.timeStamp
  }

  stopPropagation () {
    const scope = internal(this)
    scope.propagationStopped = true
  }

  stopImmediatePropagation () {
    const scope = internal(this)
    scope.propagationStopped = true
    scope.immediatePropagationStopped = true
  }

  preventDefault () {
    if (this.cancelable) {
      const scope = internal(this)
      scope.defaultPrevented = true
    }
  }

  get propagationStopped () {
    const scope = internal(this)
    return scope.propagationStopped
  }

  get immediatePropagationStopped () {
    const scope = internal(this)
    return scope.immediatePropagationStopped
  }

  get defaultPrevented () {
    const scope = internal(this)
    return scope.defaultPrevented
  }
}

export function modifyEvent (event) {
  const scope = internal(event)
  return {
    get target () {
      return scope.target
    },

    set target (value) {
      scope.target = value !== undefined ? value : null
    },

    get currentTarget () {
      return scope.currentTarget
    },

    set currentTarget (value) {
      scope.currentTarget = value !== undefined ? value : null
    },

    get eventPhase () {
      return scope.eventPhase
    },

    set eventPhase (value) {
      scope.eventPhase = value !== undefined ? value : null
    }
  }
}
