// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import MouseEvent from './MouseEvent'

export default class WheelEvent extends MouseEvent {
  get deltaX () {
    return this.originalEvent.deltaX
  }

  get deltaY () {
    return this.originalEvent.deltaY
  }

  get deltaZ () {
    return this.originalEvent.deltaZ
  }
}
