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

import { Namespace } from 'planck-core'

export const internal = Namespace('Event')

export default class Event {
  constructor(options = {}) {
    this.init(options)
  }

  init({ type, captures = true, bubbles = false } = {}) {
    const scope = internal(this)
    scope.type = type || null
    scope.captures = !!captures
    scope.bubbles = !!bubbles
    scope.timestamp = Date.now()
    scope.propagationStopped = false
    scope.immediatePropagationStopped = false
    scope.target = null
    scope.currentTarget = null
    scope.phase = null
    return this
  }

  get type() {
    const scope = internal(this)
    return scope.type
  }

  get target() {
    const scope = internal(this)
    return scope.target
  }

  get currentTarget() {
    const scope = internal(this)
    return scope.currentTarget
  }

  get phase() {
    const scope = internal(this)
    return scope.phase
  }

  get captures() {
    const scope = internal(this)
    return scope.captures
  }

  get bubbles() {
    const scope = internal(this)
    return scope.bubbles
  }

  get timestamp() {
    const scope = internal(this)
    return scope.timestamp
  }

  stopPropagation() {
    const scope = internal(this)
    scope.propagationStopped = true
  }

  stopImmediatePropagation() {
    const scope = internal(this)
    scope.propagationStopped = true
    scope.immediatePropagationStopped = true
  }

  get propagationStopped() {
    const scope = internal(this)
    return scope.propagationStopped
  }

  get immediatePropagationStopped() {
    const scope = internal(this)
    return scope.immediatePropagationStopped
  }
}

export function modifyEvent(event) {
  const scope = internal(event)
  return {
    set target(value) {
      scope.target = value || null
    },

    set currentTarget(value) {
      scope.currentTarget = value || null
    },

    set phase(value) {
      scope.phase = value || null
    },
  }
}
