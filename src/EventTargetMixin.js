// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import { Mixin } from 'mixwith/src/mixwith'

import Namespace from '@takram/planck-core/src/Namespace'

import Event, { modifyEvent } from './Event'
import GenericEvent from './GenericEvent'

export const internal = Namespace('EventTargetMixin')

// eslint-disable-next-line arrow-parens
export default Mixin(S => class EventTargetMixin extends S {
  constructor(...args) {
    super(...args)
    const scope = internal(this)
    scope.ancestorEventTarget = null
    scope.descendantEventTarget = null
  }

  get ancestorEventTarget() {
    const scope = internal(this)
    return scope.ancestorEventTarget
  }

  set ancestorEventTarget(value) {
    const scope = internal(this)
    scope.ancestorEventTarget = value !== undefined ? value : null
  }

  get descendantEventTarget() {
    const scope = internal(this)
    return scope.descendantEventTarget
  }

  set descendantEventTarget(value) {
    const scope = internal(this)
    scope.descendantEventTarget = value !== undefined ? value : null
  }

  determinePropagationPath(target = null) {
    const path = []
    if (target !== null && target !== undefined) {
      let ancestor = target
      while (ancestor !== null && ancestor !== undefined) {
        path.unshift(ancestor)
        ancestor = ancestor.ancestorEventTarget
        if (path.includes(ancestor)) {
          break
        }
      }
    } else {
      let descendant = this
      while (descendant !== null && descendant !== undefined) {
        path.push(descendant)
        descendant = descendant.descendantEventTarget
        if (path.includes(descendant)) {
          break
        }
      }
    }
    return path
  }

  dispatchImmediateEvent(event) {
    super.dispatchEvent(event)
  }

  dispatchEvent(object, propagationPath = null) {
    let event = object
    if (!(event instanceof Event)) {
      event = new GenericEvent(object)
    }
    const modifier = modifyEvent(event)

    // Just dispatch the event if it doesn't capture nor bubble
    if (!event.captures && !event.bubbles) {
      this.dispatchImmediateEvent(event)
      return
    }

    // Determine the propagation path of this event
    let path
    if (Array.isArray(propagationPath)) {
      path = [...propagationPath]
    } else {
      path = this.determinePropagationPath(event.target || this)
    }

    // The last item in the propagation path must always be the event target
    if (event.target === null) {
      modifier.target = path.pop()
    } else {
      path.pop()
    }

    // Capturing event phase
    if (event.captures) {
      modifier.eventPhase = 'capture'
      for (let i = 0; i < path.length; ++i) {
        path[i].dispatchImmediateEvent(event)
        if (event.propagationStopped) {
          return
        }
      }
    }

    // Target event phase. The target can be an integer if the parent target has
    // multiple identifiers, typically when picking an instanced geometry.
    if (!Number.isInteger(event.target)) {
      modifier.eventPhase = 'target'
      event.target.dispatchImmediateEvent(event)
      if (event.propagationStopped) {
        return
      }
    }

    // Bubbling event phase
    if (event.bubbles) {
      modifier.eventPhase = 'bubble'
      for (let i = path.length - 1; i >= 0; --i) {
        path[i].dispatchImmediateEvent(event)
        if (event.propagationStopped) {
          return
        }
      }
    }
  }
})
