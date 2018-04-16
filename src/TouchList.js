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
    const { array } = internal(this)
    array.length = 0
    if (Array.isArray(first)) {
      array.push(...first)
    } else if (first) {
      array.push(first, ...rest)
    }
  }

  get length () {
    return internal(this).array.length
  }

  item (index) {
    return internal(this).array[index]
  }
}
