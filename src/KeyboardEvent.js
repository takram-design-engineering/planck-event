// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import EventBundle from './EventBundle'

export default class KeyboardEvent extends EventBundle {
  get key() {
    return this.originalEvent.key
  }

  get code() {
    return this.originalEvent.code
  }

  get ctrlKey() {
    return this.originalEvent.ctrlKey
  }

  get shiftKey() {
    return this.originalEvent.shiftKey
  }

  get altKey() {
    return this.originalEvent.altKey
  }

  get metaKey() {
    return this.originalEvent.metaKey
  }

  get repeat() {
    return this.originalEvent.repeat
  }

  get location() {
    return this.originalEvent.location
  }
}
