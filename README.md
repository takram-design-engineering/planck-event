Planck Event
============

Provides for phased event dispatching and state binding.

[![License](http://img.shields.io/badge/license-MIT-lightgrey.svg?style=flat
)](http://mit-license.org)
[![npm version](https://badge.fury.io/js/%40takram%2Fplanck-event.svg)](http://badge.fury.io/js/%40takram%2Fplanck-event)
[![Build Status](https://travis-ci.org/takram-design-engineering/planck-event.svg?branch=master)](https://travis-ci.org/takram-design-engineering/planck-event)
[![Sauce Test Status](https://saucelabs.com/buildstatus/planck-event)](https://saucelabs.com/u/planck-event)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/planck-event.svg)](https://saucelabs.com/u/planck-event)

## Getting Started

### Installing

```sh
npm install @takram/planck-event
```

## Usage

### Event Dispatching

`EventDispatcher` manages event listeners and dispatches events in similar ways as browser’s `EventTarget` or node’s `EventEmitter` do so.

#### Example

```js
import { EventDispatcher } from '@takram/planck-event'

class App extends EventDispatcher {
  constructor(name) {
    super()
    this.name = name
  }

  launch() {
    this.dispatchEvent({ type: 'launch' })
  }

  terminate() {
    this.dispatchEvent({ type: 'terminate', on: Date.now() })
  }
}

const app = new App('test')
app.addEventListener('launch', event => {
  console.log(`App (${event.target.name}) launched`)
})
app.addEventListener('terminate', event => {
  console.log(`App (${event.target.name}) terminated on`, event.on)
})

launch()
terminate()
```

### Event Bubbling and Capturing

#### Example

```js
import { EventTarget, Event } from '@takram/planck-event'

const target1 = new EventTarget()
target1.name = 'target1'
const target2 = new EventTarget()
target2.name = 'target2'
const target3 = new EventTarget()
target3.name = 'target3'

const listener = event => {
  console.log(event.target.name, event.currentTarget.name, event.phase)
}

const propagationPath = [target1, target2, target3]

target1.addEventListener('type', listener, false)
target2.addEventListener('type', listener, false)
target3.addEventListener('type', listener, false)
target1.addEventListener('type', listener, true)
target2.addEventListener('type', listener, true)
target3.addEventListener('type', listener, true)

target1.dispatchEvent(new Event({
  type: 'type',
  bubbles: true,
  captures: true,
}), propagationPath)

// { target: 'target3', currentTarget: 'target1', phase: 'capture' }
// { target: 'target3', currentTarget: 'target2', phase: 'capture' }
// { target: 'target3', currentTarget: 'target3', phase: 'target' }
// { target: 'target3', currentTarget: 'target3', phase: 'target' }
// { target: 'target3', currentTarget: 'target2', phase: 'bubble' }
// { target: 'target3', currentTarget: 'target1', phase: 'bubble' }

target1.dispatchEvent(new Event({
  type: 'type',
  bubbles: false,
  captures: true,
}), propagationPath)

// { target: 'target3', currentTarget: 'target1', phase: 'capture' }
// { target: 'target3', currentTarget: 'target2', phase: 'capture' }
// { target: 'target3', currentTarget: 'target3', phase: 'target' }
// { target: 'target3', currentTarget: 'target3', phase: 'target' }

target1.dispatchEvent(new Event({
  type: 'type',
  bubbles: true,
  captures: false,
}), propagationPath)

// { target: 'target3', currentTarget: 'target3', phase: 'target' }
// { target: 'target3', currentTarget: 'target3', phase: 'target' }
// { target: 'target3', currentTarget: 'target2', phase: 'bubble' }
// { target: 'target3', currentTarget: 'target1', phase: 'bubble' }
```

### State Binding

#### Example

1 to 1, one-way binding

```js
import { EventDispatcher, StateEvent } from '@takram/planck-event'

const source = new EventDispatcher()
const target = {}

// 1 to 1 binding defaults to both-ways binding
Binding.bind(source, 'state', target, 'state', { oneWay: true })

source.state = 'loading'
source.dispatchEvent(new StateEvent({ name: 'state', value: source.state }))
console.log(source.state)  // 'loading'
console.log(target.state)  // 'loading'
```

1 to 1, both-ways binding

```js
import { EventDispatcher, StateEvent } from '@takram/planck-event'

const source = new EventDispatcher()
const target = new EventDispatcher()

Binding.bind(source, 'state', target, 'state')

source.state = 'loading'
source.dispatchEvent(new StateEvent({ name: 'state', value: source.state }))
console.log(source.state)  // 'loading'
console.log(target.state)  // 'loading'

target.state = 'processing'
target.dispatchEvent(new StateEvent({ name: 'state', value: target.state }))
console.log(source.state)  // 'processing'
console.log(target.state)  // 'processing'
```

1 to 1, both-ways binding with transformation

```js
import { EventDispatcher, StateEvent } from '@takram/planck-event'

const source = new EventDispatcher()
const target = new EventDispatcher()

Binding.bind(source, 'state', target, 'state', {
  transform: value => value.toUppercase(),
  inverseTransform: value => value.toLowercase(),
})

source.state = 'loading'
source.dispatchEvent(new StateEvent({ name: 'state', value: source.state }))
console.log(source.state)  // 'loading'
console.log(target.state)  // 'LOADING'

target.state = 'PROCESSING'
target.dispatchEvent(new StateEvent({ name: 'state', value: target.state }))
console.log(source.state)  // 'processing'
console.log(target.state)  // 'PROCESSING'
```

1 to multiple, one-way binding

```js
import { EventDispatcher, StateEvent } from '@takram/planck-event'

const source = new EventDispatcher()
const target1 = {}
const target2 = {}

// 1 to multiple binding defaults to one-way binding
Binding.bind(source, 'state', [
  target1, 'state',
  target2, 'state',
])

source.state = 'loading'
source.dispatchEvent(new StateEvent({ name: 'state', value: source.state }))
console.log(source.state)  // 'loading'
console.log(target1.state)  // 'loading'
console.log(target2.state)  // 'loading'
```

1 to multiple, both-ways binding

```js
import { EventDispatcher, StateEvent } from '@takram/planck-event'

const source = new EventDispatcher()
const target1 = new EventDispatcher()
const target2 = new EventDispatcher()

Binding.bind(source, 'state', [
  target1, 'state',
  target2, 'state',
], {
  oneWay: false,
})

source.state = 'loading'
source.dispatchEvent(new StateEvent({ name: 'state', value: source.state }))
console.log(source.state)  // 'loading'
console.log(target1.state)  // 'loading'
console.log(target2.state)  // 'loading'

target1.state = 'finished'
target1.dispatchEvent(new StateEvent({ name: 'state', value: target1.state }))
// This may seem tricky. The state of target1 propagates to the source first,
// and then the source's change propagates to target2, thus all of the states
// become 'finished'.
console.log(source.state)  // 'finished'
console.log(target1.state)  // 'finished'
console.log(target2.state)  // 'finished'
```

## API Reference

### EventDispatcher

<a name="eventdispatcher-addeventlistener"></a>
[#](#eventdispatcher-addeventlistener)
*eventDispatcher*.**addEventListener**(*type*, *listener* [, *capture*])<br>
<a name="eventdispatcher-on"></a>
[#](#eventdispatcher-on)
*eventDispatcher*.**on**(*type*, *listener* [, *capture*])

<a name="eventdispatcher-removeeventlistener"></a>
[#](#eventdispatcher-removeeventlistener)
*eventDispatcher*.**removeEventListener**(*type*, *listener* [, *capture*])<br>
<a name="eventdispatcher-off"></a>
[#](#eventdispatcher-off)
*eventDispatcher*.**off**(*type*, *listener* [, *capture*])

<a name="eventdispatcher-once"></a>
[#](#eventdispatcher-once)
*eventDispatcher*.**once**(*type*, *listener* [, *capture*])

<a name="eventdispatcher-dispatchevent"></a>
[#](#eventdispatcher-dispatchevent)
*eventDispatcher*.**dispatchEvent**(*event*)

### EventTarget

Ihnerits from [Event](#eventdispatcher)

<a name="eventtarget-dispatchevent"></a>
[#](#eventtarget-dispatchevent)
*eventTarget*.**dispatchEvent**(*event* [, *propagationPath*])

<a name="eventtarget-dispatchimmediateevent"></a>
[#](#eventtarget-dispatchimmediateevent)
*eventTarget*.**dispatchImmediateEvent**(*event*)

<a name="eventtarget-determinepropagationpath"></a>
[#](#eventtarget-determinepropagationpath)
*eventTarget*.**determinePropagationPath**([*target*])

<a name="eventtarget-ancestoreventtarget"></a>
[#](#eventtarget-ancestoreventtarget)
*eventTarget*.**ancestorEventTarget**

<a name="eventtarget-descendanteventtarget"></a>
[#](#eventtarget-descendanteventtarget)
*eventTarget*.**descendantEventTarget**

### Binding

<a name="binding-bind"></a>
[#](#binding-bind)
Binding.**bind**(*source*, *sourceState*, *targets*)<br>
<a name="binding-bind"></a>
[#](#binding-bind)
Binding.**bind**(*source*, *sourceState*, *target1*, *targetState1* [, *target2*, *targetState2*, ...])

<a name="binding-unbind"></a>
[#](#binding-unbind)
Binding.**unbind**(*source*, *sourceState*, *targets*)<br>
<a name="binding-unbind"></a>
[#](#binding-unbind)
Binding.**unbind**(*source*, *sourceState*, *target1*, *targetState1* [, *target2*, *targetState2*, ...])

<a name="binding-unbindall"></a>
[#](#binding-unbindall)
Binding.**unbindAll**(*source*, *sourceState*)

### Event

[#]() new **Event**(*options*)<br>
<a name="event-init"></a>
[#](#event-init)
*event*.**init**(*options*)

- `type`
- `captures`
- `bubbles`

<a name="event-stoppropagation"></a>
[#](#event-stoppropagation)
*event*.**stopPropagation**()

<a name="event-stopimmediatepropagation"></a>
[#](#event-stopimmediatepropagation)
*event*.**stopImmediatePropagation**()

<a name="event-type"></a>
[#](#event-type)
*event*.**type**

<a name="event-target"></a>
[#](#event-target)
*event*.**target**

<a name="event-currenttarget"></a>
[#](#event-currenttarget)
*event*.**currentTarget**

<a name="event-phase"></a>
[#](#event-phase)
*event*.**phase**

<a name="event-captures"></a>
[#](#event-captures)
*event*.**captures**

<a name="event-bubbles"></a>
[#](#event-bubbles)
*event*.**bubbles**

<a name="event-timestamp"></a>
[#](#event-timestamp)
*event*.**timestamp**

<a name="event-propagationstopped"></a>
[#](#event-propagationstopped)
*event*.**propagationStopped**

<a name="event-immediatepropagationstopped"></a>
[#](#event-immediatepropagationstopped)
*event*.**immediatePropagationStopped**

### StateEvent

Ihnerits from [Event](#event)

[#]() new **StateEvent**(*options*)<br>
<a name="stateevent-init"></a>
[#](#stateevent-init)
*stateEvent*.**init**(*options*)

- `name`
- `value`

<a name="stateevent-name"></a>
[#](#stateevent-name)
*stateEvent*.**name**

<a name="stateevent-value"></a>
[#](#stateevent-value)
*stateEvent*.**value**

[#]() StateEvent.**type**(*name*)

### EventBundle

Ihnerits from [Event](#event)

[#]() new **EventBundle**(*options*)<br>
<a name="eventbundle-init"></a>
[#](#eventbundle-init)
*eventBundle*.**init**(*options*)

- `originalEvent`

<a name="eventbundle-preventdefault"></a>
[#](#eventbundle-preventdefault)
*eventBundle*.**preventDefault**()

<a name="eventbundle-defaultprevented"></a>
[#](#eventbundle-defaultprevented)
*eventBundle*.**defaultPrevented**

<a name="eventbundle-originalevent"></a>
[#](#eventbundle-originalevent)
*eventBundle*.**originalEvent**

### MouseEvent

Ihnerits from [EventBundle](#eventbundle)

[#]() new **MouseEvent**(*options*)<br>
<a name="mouseevent-init"></a>
[#](#mouseevent-init)
*mouseEvent*.**init**(*options*)

- `x`
- `y`
- `movementX`
- `movementY`

<a name="mouseevent-x"></a>
[#](#mouseevent-x)
*mouseEvent*.**x**

<a name="mouseevent-y"></a>
[#](#mouseevent-y)
*mouseEvent*.**y**

<a name="mouseevent-movementx"></a>
[#](#mouseevent-movementx)
*mouseEvent*.**movementX**

<a name="mouseevent-movementy"></a>
[#](#mouseevent-movementy)
*mouseEvent*.**movementY**

<a name="mouseevent-button"></a>
[#](#mouseevent-button)
*mouseEvent*.**button**

<a name="mouseevent-ctrlkey"></a>
[#](#mouseevent-ctrlkey)
*mouseEvent*.**ctrlKey**

<a name="mouseevent-shiftkey"></a>
[#](#mouseevent-shiftkey)
*mouseEvent*.**shiftKey**

<a name="mouseevent-altkey"></a>
[#](#mouseevent-altkey)
*mouseEvent*.**altKey**

<a name="mouseevent-metakey"></a>
[#](#mouseevent-metakey)
*mouseEvent*.**metaKey**

### KeyboardEvent

Ihnerits from [EventBundle](#eventbundle)

[#]() new **KeyboardEvent**(*options*)<br>
<a name="keyboardevent-init"></a>
[#](#keyboardevent-init)
*keyboardEvent*.**init**(*options*)

<a name="keyboardevent-key"></a>
[#](#keyboardevent-key)
*keyboardEvent*.**key**

<a name="keyboardevent-code"></a>
[#](#keyboardevent-code)
*keyboardEvent*.**code**

<a name="keyboardevent-ctrlkey"></a>
[#](#keyboardevent-ctrlkey)
*keyboardEvent*.**ctrlKey**

<a name="keyboardevent-shiftkey"></a>
[#](#keyboardevent-shiftkey)
*keyboardEvent*.**shiftKey**

<a name="keyboardevent-altkey"></a>
[#](#keyboardevent-altkey)
*keyboardEvent*.**altKey**

<a name="keyboardevent-metakey"></a>
[#](#keyboardevent-metakey)
*keyboardEvent*.**metaKey**

<a name="keyboardevent-repeat"></a>
[#](#keyboardevent-repeat)
*keyboardEvent*.**repeat**

### TouchEvent

Ihnerits from [EventBundle](#eventbundle)

[#]() new **TouchEvent**(*options*)<br>
<a name="touchevent-init"></a>
[#](#touchevent-init)
*touchEvent*.**init**(*options*)

- `touches`
- `changedTouches`

<a name="touchevent-touches"></a>
[#](#touchevent-touches)
*touchEvent*.**touches**

<a name="touchevent-changedtouches"></a>
[#](#touchevent-changedtouches)
*touchEvent*.**changedTouches**

<a name="touchevent-ctrlkey"></a>
[#](#touchevent-ctrlkey)
*touchEvent*.**ctrlKey**

<a name="touchevent-shiftkey"></a>
[#](#touchevent-shiftkey)
*touchEvent*.**shiftKey**

<a name="touchevent-altkey"></a>
[#](#touchevent-altkey)
*touchEvent*.**altKey**

<a name="touchevent-metakey"></a>
[#](#touchevent-metakey)
*touchEvent*.**metaKey**

### WheelEvent

Ihnerits from [EventBundle](#eventbundle)

[#]() new **WheelEvent**(*options*)<br>
<a name="wheelevent-init"></a>
[#](#wheelevent-init)
*wheelEvent*.**init**(*options*)

<a name="wheelevent-deltax"></a>
[#](#wheelevent-deltax)
*wheelEvent*.**deltaX**

<a name="wheelevent-deltay"></a>
[#](#wheelevent-deltay)
*wheelEvent*.**deltaY**

<a name="wheelevent-deltaz"></a>
[#](#wheelevent-deltaz)
*wheelEvent*.**deltaZ**

## License

The MIT License

Copyright (C) 2016-Present Shota Matsuda

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.
