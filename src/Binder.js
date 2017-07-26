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

import Namespace from '@takram/planck-core/src/Namespace'

import StateEvent from './StateEvent'

export const internal = Namespace('Binder')

function isTargetSame(target, other) {
  return other.object === target.object && other.name === target.name
}

function handleChange(transform, event) {
  const scope = internal(this)
  if (event.target === scope.source && event.name === scope.name) {
    const value = transform(event.value)
    scope.targets.forEach(target => {
      target.object[target.name] = value
    })
  }
}

function dispose(binder) {
  const scope = internal(binder)
  const type = StateEvent.type(scope.name)
  scope.source.removeEventListener(type, scope.handleChange, false)
}

export default class Binder {
  constructor(source, name, targets, {
    assigns = false,
    transform = value => value,
  } = {}) {
    const scope = internal(this)
    scope.source = source
    scope.name = name
    scope.targets = [...targets]
    scope.handleChange = handleChange.bind(this, transform)

    // Listen for state events with the given name
    const type = StateEvent.type(name)
    scope.source.addEventListener(type, scope.handleChange, false)

    // Initial assignment
    if (assigns) {
      targets.forEach(target => {
        target.object[target.name] = transform(source[name])
      })
    }
  }

  get empty() {
    const scope = internal(this)
    return scope.targets.length === 0
  }

  matches(targets) {
    const scope = internal(this)
    if (!Array.isArray(targets) || targets.length === 0) {
      return false
    }
    return targets.every(other => {
      return scope.targets.some(target => {
        return isTargetSame(target, other)
      })
    })
  }

  unbind(targets) {
    if (!targets) {
      return this.unbindAll()
    }
    const scope = internal(this)
    const unboundTargets = targets.reduce((result, target) => {
      const index = scope.targets.findIndex(other => {
        return isTargetSame(target, other)
      })
      if (index !== -1) {
        scope.targets.splice(index, 1)
        result.push(target)
      }
      return result
    }, [])
    if (scope.targets.length === 0) {
      dispose(this)
    }
    return unboundTargets
  }

  unbindAll() {
    const scope = internal(this)
    const unboundTargets = scope.targets
    scope.targets = []
    dispose(this)
    return unboundTargets
  }
}
