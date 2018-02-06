// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import Event, { modifyEvent } from './Event'

export default class CustomEvent extends Event {
  init({ type, target, ...rest } = {}) {
    super.init({ type, ...rest })
    // Support target as a parameter
    modifyEvent(this).target = target !== undefined ? target : null
    return this
  }
}
