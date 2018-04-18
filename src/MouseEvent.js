// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import { Namespace } from '@takram/planck-core'

import EventBundle from './EventBundle'

export const internal = Namespace('MouseEvent')

export default class MouseEvent extends EventBundle {
  init ({ x, y, movementX, movementY, ...rest } = {}) {
    super.init({ ...rest })
    const scope = internal(this)
    scope.x = x || 0
    scope.y = y || 0
    scope.movementX = movementX || 0
    scope.movementY = movementY || 0
    return this
  }

  get x () {
    return internal(this).x
  }

  get y () {
    return internal(this).y
  }

  get movementX () {
    return internal(this).movementX
  }

  get movementY () {
    return internal(this).movementY
  }

  get button () {
    return this.originalEvent.button
  }

  get ctrlKey () {
    return this.originalEvent.ctrlKey
  }

  get shiftKey () {
    return this.originalEvent.shiftKey
  }

  get altKey () {
    return this.originalEvent.altKey
  }

  get metaKey () {
    return this.originalEvent.metaKey
  }
}
