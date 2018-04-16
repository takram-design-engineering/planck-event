// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import Namespace from '@takram/planck-core/src/Namespace'

import Binder from './Binder'

export const internal = Namespace('Binding')

function formatTargets (...args) {
  // Flatten arguments
  const flatArgs = []
  for (let i = 0; i < args.length; ++i) {
    const value = args[i]
    if (Array.isArray(value)) {
      flatArgs.push(...value)
    } else {
      flatArgs.push(value)
    }
  }

  // Convert the array from [object, name, ...] to [{ object, name }, ...]
  let object
  const targets = []
  for (let index = 0; index < flatArgs.length; ++index) {
    if (index % 2 === 0) {
      object = flatArgs[index]
    } else {
      targets.push({ object, name: flatArgs[index] })
    }
  }

  // Defaults to one-way binding for multiple targets
  const options = Object.assign({
    oneWay: targets.length > 1
  }, flatArgs[targets.length * 2])
  return [targets, options]
}

function bind (source, name, targets, options) {
  const scope = internal(source)
  if (scope.bindings == null) {
    scope.bindings = {}
  }
  if (scope.bindings[name] == null) {
    scope.bindings[name] = []
  }
  const currentBinders = scope.bindings[name]
  const nextBinders = []
  for (let i = 0; i < currentBinders.length; ++i) {
    const binder = currentBinders[i]
    binder.unbind(targets)
    if (!binder.empty) {
      nextBinders.push(binder)
    }
  }
  nextBinders.push(new Binder(source, name, targets, options))
  scope.bindings[name] = nextBinders
}

function unbind (source, name, targets) {
  const scope = internal(source)
  if (scope.bindings == null) {
    return []
  }
  if (scope.bindings[name] == null) {
    return []
  }
  const unboundTargets = []
  const currentBinders = scope.bindings[name]
  const nextBinders = []
  for (let i = 0; i < currentBinders.length; ++i) {
    const binder = currentBinders[i]
    unboundTargets.push(...binder.unbind(targets))
    if (!binder.empty) {
      nextBinders.push(binder)
    }
  }
  scope.bindings[name] = nextBinders
  return unboundTargets
}

function unbindAll (source, name) {
  const scope = internal(source)
  if (scope.bindings == null) {
    return []
  }
  if (scope.bindings[name] == null) {
    return []
  }
  const binders = scope.bindings[name]
  const unboundTargets = []
  for (let i = 0; i < binders.length; ++i) {
    unboundTargets.push(...binders[i].unbindAll())
  }
  scope.bindings[name] = []
  return unboundTargets
}

export default class Binding {
  static bind (source, name, ...rest) {
    const [targets, options] = formatTargets(...rest)
    if (!options.oneWay) {
      for (let i = 0; i < targets.length; ++i) {
        const target = targets[i]
        bind(target.object, target.name, [{ object: source, name }], {
          assigns: false,
          transform: options.inverseTransform
        })
      }
    }
    bind(source, name, targets, {
      assigns: true,
      transform: options.transform
    })
  }

  static unbind (source, name, ...rest) {
    const [targets, options] = formatTargets(...rest)
    const unboundTargets = unbind(source, name, targets)
    if (!options.oneWay) {
      for (let i = 0; i < unboundTargets.length; ++i) {
        const target = unboundTargets[i]
        unbind(target.object, target.name, [{ object: source, name }])
      }
    }
  }

  static unbindAll (source, name) {
    const unboundTargets = unbindAll(source, name)
    for (let i = 0; i < unboundTargets.length; ++i) {
      const target = unboundTargets[i]
      unbindAll(target.object, target.name, [{ object: source, name }])
    }
  }
}
