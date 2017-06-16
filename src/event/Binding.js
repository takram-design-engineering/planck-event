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

import Binder from '../event/Binder'

export const internal = Namespace('Binding')

function formatTargets(...args) {
  // Flatten arguments
  const flatArgs = args.reduce((targets, value) => {
    return targets.concat(value)
  }, [])

  // Convert the array from [object, name, ...] to [{ object, name }, ...]
  let object
  const targets = flatArgs.reduce((targets, value, index) => {
    if (index % 2 === 0) {
      object = value
    } else {
      targets.push({ object, name: value })
    }
    return targets
  }, [])

  // Defaults to one-way binding for multiple targets
  const options = Object.assign({
    oneWay: targets.length > 1,
  }, flatArgs[targets.length * 2])
  return [targets, options]
}

function bind(source, name, targets, options) {
  const scope = internal(source)
  if (scope.bindings === undefined) {
    scope.bindings = {}
  }
  if (scope.bindings[name] === undefined) {
    scope.bindings[name] = []
  }
  let binders = scope.bindings[name]
  binders.forEach(binder => {
    binder.unbind(targets)
  })
  binders = binders.filter(binder => !binder.empty)
  binders.push(new Binder(source, name, targets, options))
  scope.bindings[name] = binders
}

function unbind(source, name, targets) {
  const scope = internal(source)
  if (scope.bindings === undefined) {
    return []
  }
  if (scope.bindings[name] === undefined) {
    return []
  }
  let binders = scope.bindings[name]
  const unboundTargets = binders.reduce((result, binder) => {
    return result.concat(binder.unbind(targets))
  }, [])
  binders = binders.filter(binder => !binder.empty)
  scope.bindings[name] = binders
  return unboundTargets
}

function unbindAll(source, name) {
  const scope = internal(source)
  if (scope.bindings === undefined) {
    return []
  }
  if (scope.bindings[name] === undefined) {
    return []
  }
  const binders = scope.bindings[name]
  const unboundTargets = binders.reduce((result, binder) => {
    return result.concat(binder.unbindAll())
  }, [])
  scope.bindings[name] = []
  return unboundTargets
}

export default class Binding {
  static bind(source, name, ...rest) {
    const [targets, options] = formatTargets(...rest)
    if (!options.oneWay) {
      targets.forEach(target => {
        bind(target.object, target.name, [{ object: source, name }], {
          assigns: false,
          transform: options.inverseTransform,
        })
      })
    }
    bind(source, name, targets, {
      assigns: true,
      transform: options.transform,
    })
  }

  static unbind(source, name, ...rest) {
    const [targets, options] = formatTargets(...rest)
    const unboundTargets = unbind(source, name, targets)
    if (!options.oneWay) {
      unboundTargets.forEach(target => {
        unbind(target.object, target.name, [{ object: source, name }])
      })
    }
  }

  static unbindAll(source, name) {
    unbindAll(source, name).forEach(target => {
      unbindAll(target.object, target.name, [{ object: source, name }])
    })
  }
}
