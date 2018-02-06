// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import { mix } from 'mixwith/src/mixwith'

import EventDispatcherMixin from './EventDispatcherMixin'
import EventTargetMixin from './EventTargetMixin'

export default class EventTarget extends mix(class {})
  .with(EventDispatcherMixin, EventTargetMixin) {}
