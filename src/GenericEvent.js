// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import CustomEvent from './CustomEvent'

export default class GenericEvent extends CustomEvent {
  init ({
    type, target, captures = false, bubbles = false, ...rest
  } = {}) {
    super.init({
      type, target, captures, bubbles
    })
    const names = Object.keys(rest)
    for (let i = 0; i < names.length; ++i) {
      const name = names[i]
      if (!{}.hasOwnProperty.call(this, name)) {
        this[name] = rest[name]
      } else {
        throw new Error(`Name "${name}" cannot be used for event property`)
      }
    }
    return this
  }
}
