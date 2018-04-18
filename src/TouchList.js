// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import { Namespace } from '@takram/planck-core'

export const internal = Namespace('TouchList')

export default class TouchList {
  constructor (...args) {
    internal(this).array = []
    this.init(...args)
  }

  init (first, ...rest) {
    const array = []
    if (Array.isArray(first)) {
      array.push(...first)
    } else if (first) {
      array.push(first, ...rest)
    }
    internal(this).array = array
  }

  get length () {
    return internal(this).array.length
  }

  item (index) {
    return internal(this).array[index]
  }
}
