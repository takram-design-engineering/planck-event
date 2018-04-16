// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import { globalScope } from '@takram/planck-core/src/Global'
import Namespace from '@takram/planck-core/src/Namespace'

export const internal = Namespace('Event')

export default class Event {
  constructor (options = {}) {
    this.init(options)
  }

  init ({ type, captures = false, bubbles = true, cancelable = true } = {}) {
    const scope = internal(this)
    scope.type = type != null ? type : null
    scope.captures = !!captures
    scope.bubbles = !!bubbles
    scope.cancelable = !!cancelable
    scope.timeStamp = (
      globalScope.performance &&
      globalScope.performance.now &&
      globalScope.performance.now()) || Date.now()
    scope.propagationStopped = false
    scope.immediatePropagationStopped = false
    scope.defaultPrevented = false
    scope.target = null
    scope.currentTarget = null
    scope.eventPhase = null
    return this
  }

  get type () {
    return internal(this).type
  }

  get target () {
    return internal(this).target
  }

  get currentTarget () {
    return internal(this).currentTarget
  }

  get eventPhase () {
    return internal(this).eventPhase
  }

  get captures () {
    return internal(this).captures
  }

  get bubbles () {
    return internal(this).bubbles
  }

  get cancelable () {
    return internal(this).cancelable
  }

  get timeStamp () {
    return internal(this).timeStamp
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
    return internal(this).propagationStopped
  }

  get immediatePropagationStopped () {
    return internal(this).immediatePropagationStopped
  }

  get defaultPrevented () {
    return internal(this).defaultPrevented
  }
}

export function modifyEvent (event) {
  const scope = internal(event)
  return {
    get target () {
      return scope.target
    },

    set target (value) {
      scope.target = value != null ? value : null
    },

    get currentTarget () {
      return scope.currentTarget
    },

    set currentTarget (value) {
      scope.currentTarget = value != null ? value : null
    },

    get eventPhase () {
      return scope.eventPhase
    },

    set eventPhase (value) {
      scope.eventPhase = value != null ? value : null
    }
  }
}
