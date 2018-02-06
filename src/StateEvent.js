// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import Namespace from '@takram/planck-core/src/Namespace'

import CustomEvent from './CustomEvent'

export const internal = Namespace('StateEvent')

export default class StateEvent extends CustomEvent {
  init({ name, value, ...rest } = {}) {
    super.init({ ...rest, type: StateEvent.type(name) })
    const scope = internal(this)
    scope.name = name
    scope.value = value
    return this
  }

  get name() {
    const scope = internal(this)
    return scope.name
  }

  get value() {
    const scope = internal(this)
    return scope.value
  }

  static type(name) {
    if (typeof name !== 'string') {
      throw new Error('Type name must be a string')
    }
    return `state:${name}`
  }
}
