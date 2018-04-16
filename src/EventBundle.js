// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import Namespace from '@takram/planck-core/src/Namespace'

import Event from './Event'

export const internal = Namespace('EventBundle')

export default class EventBundle extends Event {
  init ({ originalEvent, ...rest } = {}) {
    super.init({ ...rest })
    const scope = internal(this)
    scope.originalEvent = originalEvent || null
    return this
  }

  preventDefault () {
    super.preventDefault()
    if (this.cancelable) {
      if (this.originalEvent != null) {
        this.originalEvent.preventDefault()
      }
    }
  }

  get originalEvent () {
    return internal(this).originalEvent
  }
}
