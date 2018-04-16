// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import Namespace from '@takram/planck-core/src/Namespace'

import EventBundle from './EventBundle'
import TouchList from './TouchList'

const emptyTouchList = new TouchList()

export const internal = Namespace('TouchEvent')

export default class TouchEvent extends EventBundle {
  init ({ touches, changedTouches, ...rest } = {}) {
    super.init({ ...rest })
    const scope = internal(this)
    scope.touches = touches || emptyTouchList
    scope.changedTouches = changedTouches || emptyTouchList
    return this
  }

  get touches () {
    return internal(this).touches
  }

  get changedTouches () {
    return internal(this).changedTouches
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
