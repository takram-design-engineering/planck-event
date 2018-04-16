// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import Namespace from '@takram/planck-core/src/Namespace'

export const internal = Namespace('TouchList')

export default class TouchList {
  constructor (...args) {
    const scope = internal(this)
    scope.array = []
    this.init(...args)
  }

  init (first, ...rest) {
    const scope = internal(this)
    scope.array.length = 0
    if (Array.isArray(first)) {
      scope.array.push(...first)
    } else if (first) {
      scope.array.push(first, ...rest)
    }
  }

  get length () {
    const scope = internal(this)
    return scope.array.length
  }

  item (index) {
    const scope = internal(this)
    return scope.array[index]
  }
}
