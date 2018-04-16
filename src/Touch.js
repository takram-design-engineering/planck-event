// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import Namespace from '@takram/planck-core/src/Namespace'

export const internal = Namespace('Touch')

export default class Touch {
  constructor (options = {}) {
    this.init(options)
  }

  init ({
    x, y, target, originalTouch
  } = {}) {
    const scope = internal(this)
    scope.x = x || 0
    scope.y = y || 0
    scope.target = target != null ? target : null
    scope.originalTouch = originalTouch != null ? originalTouch : null
    return this
  }

  get x () {
    const scope = internal(this)
    return scope.x
  }

  get y () {
    const scope = internal(this)
    return scope.y
  }

  get target () {
    const scope = internal(this)
    return scope.target
  }

  get originalTouch () {
    const scope = internal(this)
    return scope.originalTouch
  }

  get identifier () {
    return this.originalTouch.identifier
  }
}
