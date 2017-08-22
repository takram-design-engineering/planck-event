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
  console.log(event.target.name, event.currentTarget.name, event.eventPhase)
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

// { target: 'target3', currentTarget: 'target1', eventPhase: 'capture' }
// { target: 'target3', currentTarget: 'target2', eventPhase: 'capture' }
// { target: 'target3', currentTarget: 'target3', eventPhase: 'target' }
// { target: 'target3', currentTarget: 'target3', eventPhase: 'target' }
// { target: 'target3', currentTarget: 'target2', eventPhase: 'bubble' }
// { target: 'target3', currentTarget: 'target1', eventPhase: 'bubble' }

target1.dispatchEvent(new Event({
  type: 'type',
  bubbles: false,
  captures: true,
}), propagationPath)

// { target: 'target3', currentTarget: 'target1', eventPhase: 'capture' }
// { target: 'target3', currentTarget: 'target2', eventPhase: 'capture' }
// { target: 'target3', currentTarget: 'target3', eventPhase: 'target' }
// { target: 'target3', currentTarget: 'target3', eventPhase: 'target' }

target1.dispatchEvent(new Event({
  type: 'type',
  bubbles: true,
  captures: false,
}), propagationPath)

// { target: 'target3', currentTarget: 'target3', eventPhase: 'target' }
// { target: 'target3', currentTarget: 'target3', eventPhase: 'target' }
// { target: 'target3', currentTarget: 'target2', eventPhase: 'bubble' }
// { target: 'target3', currentTarget: 'target1', eventPhase: 'bubble' }
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

<a id="eventdispatcher-addeventlistener" href="#eventdispatcher-addeventlistener">#</a>
*eventDispatcher*.**addEventListener**(*type*, *listener* [, *capture*])<br>
<a id="eventdispatcher-on" href="#eventdispatcher-on">#</a>
*eventDispatcher*.**on**(*type*, *listener* [, *capture*])

<a id="eventdispatcher-removeeventlistener" href="#eventdispatcher-removeeventlistener">#</a>
*eventDispatcher*.**removeEventListener**(*type*, *listener* [, *capture*])<br>
<a id="eventdispatcher-off" href="#eventdispatcher-off">#</a>
*eventDispatcher*.**off**(*type*, *listener* [, *capture*])

<a id="eventdispatcher-once" href="#eventdispatcher-once">#</a>
*eventDispatcher*.**once**(*type*, *listener* [, *capture*])

<a id="eventdispatcher-dispatchevent" href="#eventdispatcher-dispatchevent">#</a>
*eventDispatcher*.**dispatchEvent**(*event*)

### EventTarget

Inherits from [Event](#eventdispatcher)

<a id="eventtarget-dispatchevent" href="#eventtarget-dispatchevent">#</a>
*eventTarget*.**dispatchEvent**(*event* [, *propagationPath*])

<a id="eventtarget-dispatchimmediateevent" href="#eventtarget-dispatchimmediateevent">#</a>
*eventTarget*.**dispatchImmediateEvent**(*event*)

<a id="eventtarget-determinepropagationpath" href="#eventtarget-determinepropagationpath">#</a>
*eventTarget*.**determinePropagationPath**([*target*])

<a id="eventtarget-ancestoreventtarget" href="#eventtarget-ancestoreventtarget">#</a>
*eventTarget*.**ancestorEventTarget**

<a id="eventtarget-descendanteventtarget" href="#eventtarget-descendanteventtarget">#</a>
*eventTarget*.**descendantEventTarget**

### Binding

<a id="binding-bind-1" href="#binding-bind-1">#</a>
Binding.**bind**(*source*, *sourceState*, *targets*)<br>
<a id="binding-bind-2" href="#binding-bind-2">#</a>
Binding.**bind**(*source*, *sourceState*, *target1*, *targetState1* [, *target2*, *targetState2*, ...])

<a id="binding-unbind-1" href="#binding-unbind-1">#</a>
Binding.**unbind**(*source*, *sourceState*, *targets*)<br>
<a id="binding-unbind-2" href="#binding-unbind-2">#</a>
Binding.**unbind**(*source*, *sourceState*, *target1*, *targetState1* [, *target2*, *targetState2*, ...])

<a id="binding-unbindall" href="#binding-unbindall">#</a>
Binding.**unbindAll**(*source*, *sourceState*)

### Event

<a id="new-event" href="#new-event">#</a>
new **Event**(*options*)<br>
<a id="event-init" href="#event-init">#</a>
*event*.**init**(*options*)

- `type`
- `captures`
- `bubbles`
- `cancelable`

<a id="event-stoppropagation" href="#event-stoppropagation">#</a>
*event*.**stopPropagation**()

<a id="event-stopimmediatepropagation" href="#event-stopimmediatepropagation">#</a>
*event*.**stopImmediatePropagation**()

<a id="event-preventdefault" href="#event-preventdefault">#</a>
*event*.**preventDefault**()

<a id="event-type" href="#event-type">#</a>
*event*.**type**

<a id="event-target" href="#event-target">#</a>
*event*.**target**

<a id="event-currenttarget" href="#event-currenttarget">#</a>
*event*.**currentTarget**

<a id="event-eventphase" href="#event-eventphase">#</a>
*event*.**eventPhase**

<a id="event-captures" href="#event-captures">#</a>
*event*.**captures**

<a id="event-bubbles" href="#event-bubbles">#</a>
*event*.**bubbles**

<a id="event-bubbles" href="#event-bubbles">#</a>
*event*.**cancelable**

<a id="event-timestamp" href="#event-timestamp">#</a>
*event*.**timeStamp**

<a id="event-propagationstopped" href="#event-propagationstopped">#</a>
*event*.**propagationStopped**

<a id="event-immediatepropagationstopped" href="#event-immediatepropagationstopped">#</a>
*event*.**immediatePropagationStopped**

<a id="event-defaultprevented" href="#event-defaultprevented">#</a>
*event*.**defaultPrevented**

### StateEvent

Inherits from [Event](#event)

<a id="new-stateevent" href="#new-stateevent">#</a>
new **StateEvent**(*options*)<br>
<a id="stateevent-init" href="#stateevent-init">#</a>
*stateEvent*.**init**(*options*)

- `name`
- `value`

<a id="stateevent-name" href="#stateevent-name">#</a>
*stateEvent*.**name**

<a id="stateevent-value" href="#stateevent-value">#</a>
*stateEvent*.**value**

<a id="stateevent-class-type" href="#stateevent-class-type">#</a>
StateEvent.**type**(*name*)

### EventBundle

Inherits from [Event](#event)

<a id="new-eventbundle" href="#new-eventbundle">#</a>
new **EventBundle**(*options*)<br>
<a id="eventbundle-init" href="#eventbundle-init">#</a>
*eventBundle*.**init**(*options*)

- `originalEvent`

<a id="eventbundle-originalevent" href="#eventbundle-originalevent">#</a>
*eventBundle*.**originalEvent**

### MouseEvent

Inherits from [EventBundle](#eventbundle)

<a id="new-mouseevent" href="#new-mouseevent">#</a>
new **MouseEvent**(*options*)<br>
<a id="mouseevent-init" href="#mouseevent-init">#</a>
*mouseEvent*.**init**(*options*)

- `x`
- `y`
- `movementX`
- `movementY`

<a id="mouseevent-x" href="#mouseevent-x">#</a>
*mouseEvent*.**x**

<a id="mouseevent-y" href="#mouseevent-y">#</a>
*mouseEvent*.**y**

<a id="mouseevent-movementx" href="#mouseevent-movementx">#</a>
*mouseEvent*.**movementX**

<a id="mouseevent-movementy" href="#mouseevent-movementy">#</a>
*mouseEvent*.**movementY**

<a id="mouseevent-button" href="#mouseevent-button">#</a>
*mouseEvent*.**button**

<a id="mouseevent-ctrlkey" href="#mouseevent-ctrlkey">#</a>
*mouseEvent*.**ctrlKey**

<a id="mouseevent-shiftkey" href="#mouseevent-shiftkey">#</a>
*mouseEvent*.**shiftKey**

<a id="mouseevent-altkey" href="#mouseevent-altkey">#</a>
*mouseEvent*.**altKey**

<a id="mouseevent-metakey" href="#mouseevent-metakey">#</a>
*mouseEvent*.**metaKey**

### KeyboardEvent

Inherits from [EventBundle](#eventbundle)

<a id="new-keyboardevent" href="#new-keyboardevent">#</a>
new **KeyboardEvent**(*options*)<br>
<a id="keyboardevent-init" href="#keyboardevent-init">#</a>
*keyboardEvent*.**init**(*options*)

<a id="keyboardevent-key" href="#keyboardevent-key">#</a>
*keyboardEvent*.**key**

<a id="keyboardevent-code" href="#keyboardevent-code">#</a>
*keyboardEvent*.**code**

<a id="keyboardevent-ctrlkey" href="#keyboardevent-ctrlkey">#</a>
*keyboardEvent*.**ctrlKey**

<a id="keyboardevent-shiftkey" href="#keyboardevent-shiftkey">#</a>
*keyboardEvent*.**shiftKey**

<a id="keyboardevent-altkey" href="#keyboardevent-altkey">#</a>
*keyboardEvent*.**altKey**

<a id="keyboardevent-metakey" href="#keyboardevent-metakey">#</a>
*keyboardEvent*.**metaKey**

<a id="keyboardevent-repeat" href="#keyboardevent-repeat">#</a>
*keyboardEvent*.**repeat**

<a id="keyboardevent-location" href="#keyboardevent-location">#</a>
*keyboardEvent*.**location**

### TouchEvent

Inherits from [EventBundle](#eventbundle)

<a id="new-touchevent" href="#new-touchevent">#</a>
new **TouchEvent**(*options*)<br>
<a id="touchevent-init" href="#touchevent-init">#</a>
*touchEvent*.**init**(*options*)

- `touches`
- `changedTouches`

<a id="touchevent-touches" href="#touchevent-touches">#</a>
*touchEvent*.**touches**

<a id="touchevent-changedtouches" href="#touchevent-changedtouches">#</a>
*touchEvent*.**changedTouches**

<a id="touchevent-ctrlkey" href="#touchevent-ctrlkey">#</a>
*touchEvent*.**ctrlKey**

<a id="touchevent-shiftkey" href="#touchevent-shiftkey">#</a>
*touchEvent*.**shiftKey**

<a id="touchevent-altkey" href="#touchevent-altkey">#</a>
*touchEvent*.**altKey**

<a id="touchevent-metakey" href="#touchevent-metakey">#</a>
*touchEvent*.**metaKey**

### WheelEvent

Inherits from [EventBundle](#eventbundle)

<a id="new-wheelevent" href="#new-wheelevent">#</a>
new **WheelEvent**(*options*)<br>
<a id="wheelevent-init" href="#wheelevent-init">#</a>
*wheelEvent*.**init**(*options*)

<a id="wheelevent-deltax" href="#wheelevent-deltax">#</a>
*wheelEvent*.**deltaX**

<a id="wheelevent-deltay" href="#wheelevent-deltay">#</a>
*wheelEvent*.**deltaY**

<a id="wheelevent-deltaz" href="#wheelevent-deltaz">#</a>
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
