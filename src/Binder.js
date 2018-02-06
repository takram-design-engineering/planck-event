// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

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
    for (let i = 0; i < scope.targets.length; ++i) {
      const target = scope.targets[i]
      target.object[target.name] = value
    }
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
      for (let i = 0; i < targets.length; ++i) {
        const target = targets[i]
        target.object[target.name] = transform(source[name])
      }
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
    for (let i = 0; i < targets.length; ++i) {
      let matches = false
      const target = targets[i]
      for (let i = 0; i < scope.targets.length; ++i) {
        if (isTargetSame(target, scope.targets[i])) {
          matches = true
          break
        }
      }
      if (!matches) {
        return false
      }
    }
    return true
  }

  unbind(targets) {
    if (!targets) {
      return this.unbindAll()
    }
    const scope = internal(this)
    const unboundTargets = []
    for (let i = 0; i < targets.length; ++i) {
      const target = targets[i]
      for (let index = 0; index < scope.targets.length; ++index) {
        if (isTargetSame(target, scope.targets[index])) {
          scope.targets.splice(index, 1)
          unboundTargets.push(target)
          break
        }
      }
    }
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
