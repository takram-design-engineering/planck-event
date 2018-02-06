// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import { mix } from 'mixwith/src/mixwith'

import EventDispatcherMixin from './EventDispatcherMixin'

export default class EventDispatcher extends mix(class {})
  .with(EventDispatcherMixin) {}
