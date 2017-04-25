//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

function Namespace(name = undefined) {
  const symbol = Symbol(name);
  return function namespace(object, init = data => data) {
    if (object[symbol] === undefined) {
      object[symbol] = init({});
    }
    return object[symbol];
  };
}

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

const internal = Namespace('Event');

class Event {
  constructor(options = {}) {
    this.init(options);
  }

  init({ type, captures = true, bubbles = false } = {}) {
    const scope = internal(this);
    scope.type = type || null;
    scope.captures = !!captures;
    scope.bubbles = !!bubbles;
    scope.timestamp = Date.now();
    scope.propagationStopped = false;
    scope.immediatePropagationStopped = false;
    scope.target = null;
    scope.currentTarget = null;
    scope.phase = null;
    return this;
  }

  get type() {
    const scope = internal(this);
    return scope.type;
  }

  get target() {
    const scope = internal(this);
    return scope.target;
  }

  get currentTarget() {
    const scope = internal(this);
    return scope.currentTarget;
  }

  get phase() {
    const scope = internal(this);
    return scope.phase;
  }

  get captures() {
    const scope = internal(this);
    return scope.captures;
  }

  get bubbles() {
    const scope = internal(this);
    return scope.bubbles;
  }

  get timestamp() {
    const scope = internal(this);
    return scope.timestamp;
  }

  stopPropagation() {
    const scope = internal(this);
    scope.propagationStopped = true;
  }

  stopImmediatePropagation() {
    const scope = internal(this);
    scope.propagationStopped = true;
    scope.immediatePropagationStopped = true;
  }

  get propagationStopped() {
    const scope = internal(this);
    return scope.propagationStopped;
  }

  get immediatePropagationStopped() {
    const scope = internal(this);
    return scope.immediatePropagationStopped;
  }
}

function modifyEvent(event) {
  const scope = internal(event);
  return {
    set target(value) {
      scope.target = value || null;
    },

    set currentTarget(value) {
      scope.currentTarget = value || null;
    },

    set phase(value) {
      scope.phase = value || null;
    }
  };
}

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};













var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

class CustomEvent extends Event {
  init(_ref = {}) {
    let { type, target } = _ref,
        rest = objectWithoutProperties(_ref, ['type', 'target']);

    super.init(_extends({}, rest, { type }));
    modifyEvent(this).target = target;
    return this;
  }
}

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

const internal$1 = Namespace('EventBundle');

class EventBundle extends Event {
  init(_ref = {}) {
    let { originalEvent } = _ref,
        rest = objectWithoutProperties(_ref, ['originalEvent']);

    super.init(_extends({}, rest));
    const scope = internal$1(this);
    scope.originalEvent = originalEvent;
    return this;
  }

  preventDefault() {
    const scope = internal$1(this);
    scope.originalEvent.preventDefault();
  }

  get defaultPrevented() {
    const scope = internal$1(this);
    return scope.originalEvent.defaultPrevented;
  }

  get originalEvent() {
    const scope = internal$1(this);
    return scope.originalEvent;
  }
}

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

class GenericEvent extends CustomEvent {
  init(_ref = {}) {
    let { type, target } = _ref,
        rest = objectWithoutProperties(_ref, ['type', 'target']);

    super.init({ type, target, captures: false, bubbles: false });
    Object.entries(rest).forEach(entry => {
      const [property, value] = entry;
      if (!{}.hasOwnProperty.call(this, property)) {
        this[property] = value;
      } else {
        throw new Error(`Name "${property}" cannot be used for event property`);
      }
    });
    return this;
  }
}

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

const internal$2 = Namespace('EventDispatcher');

class EventDispatcher {
  constructor() {
    const scope = internal$2(this);
    scope.listeners = {};
  }

  addEventListener(type, listener, capture = false) {
    if (typeof listener !== 'function' && typeof listener !== 'object') {
      throw new Error('Attempt to add non-function non-object listener');
    }
    const scope = internal$2(this);
    if (scope.listeners[type] === undefined) {
      scope.listeners[type] = { bubble: [], capture: [] };
    }
    const listeners = capture ? scope.listeners[type].capture : scope.listeners[type].bubble;
    if (listeners.includes(listener)) {
      return;
    }
    listeners.push(listener);
  }

  removeEventListener(type, listener, capture = false) {
    const scope = internal$2(this);
    if (scope.listeners[type] === undefined) {
      return;
    }
    const listeners = capture ? scope.listeners[type].capture : scope.listeners[type].bubble;
    const index = listeners.indexOf(listener);
    if (index !== -1) {
      listeners.splice(index, 1);
    }
  }

  dispatchEvent(object) {
    let event = object;
    if (!(event instanceof Event)) {
      event = new GenericEvent(object);
    }
    const scope = internal$2(this);
    const listeners = scope.listeners[event.type];
    if (listeners === undefined) {
      return;
    }
    const phase = event.phase;
    if (!phase || phase === 'target' || phase === 'capture') {
      [...listeners.capture].some(listener => {
        if (typeof listener === 'function') {
          listener.call(this, event);
        } else if (typeof listener.handleEvent === 'function') {
          listener.handleEvent(event);
        } else {
          throw new Error('Listener is neither function nor event listener');
        }
        return event.immediatePropagationStopped;
      });
    }
    if (event.immediatePropagationStopped) {
      return;
    }
    if (!phase || phase === 'target' || phase === 'bubble') {
      [...listeners.bubble].some(listener => {
        if (typeof listener === 'function') {
          listener.call(this, event);
        } else if (typeof listener.handleEvent === 'function') {
          listener.handleEvent(event);
        }
        return event.immediatePropagationStopped;
      });
    }
  }
}

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

const internal$3 = Namespace('EventTarget');

class EventTarget extends EventDispatcher {
  constructor() {
    super();
    const scope = internal$3(this);
    scope.ancestorEventTarget = null;
    scope.descendantEventTarget = null;
  }

  get ancestorEventTarget() {
    const scope = internal$3(this);
    return scope.ancestorEventTarget;
  }

  set ancestorEventTarget(value) {
    const scope = internal$3(this);
    scope.ancestorEventTarget = value || null;
  }

  get descendantEventTarget() {
    const scope = internal$3(this);
    return scope.descendantEventTarget;
  }

  set descendantEventTarget(value) {
    const scope = internal$3(this);
    scope.descendantEventTarget = value || null;
  }

  determinePropagationPath(target = null) {
    const path = [];
    if (target !== null && target !== undefined) {
      let ancestor = target;
      while (ancestor !== null && ancestor !== undefined) {
        path.unshift(ancestor);
        ancestor = ancestor.ancestorEventTarget;
      }
    } else {
      let descendant = this;
      while (descendant !== null && descendant !== undefined) {
        path.push(descendant);
        descendant = descendant.descendantEventTarget;
      }
    }
    return path;
  }

  dispatchImmediateEvent(event) {
    super.dispatchEvent(event);
  }

  dispatchEvent(object, propagationPath = null) {
    let event = object;
    if (!(event instanceof Event)) {
      event = new GenericEvent(object);
    }

    // Just dispatch the event if it doesn't capture nor bubble
    if (!event.captures && !event.bubbles) {
      this.dispatchImmediateEvent(event);
      return;
    }

    // Determine the capturing path of this event
    let capturingPath;
    if (propagationPath !== null && propagationPath !== undefined) {
      capturingPath = [...propagationPath];
    } else if (event.target) {
      capturingPath = this.determinePropagationPath(event.target);
    }

    // The last item in the propagation path must always be the event target
    const modifier = modifyEvent(event);
    if (event.target === null) {
      modifier.target = capturingPath.pop();
    } else {
      capturingPath.pop();
    }
    const bubblingPath = [...capturingPath];
    bubblingPath.reverse();

    // Capturing phase
    if (event.captures) {
      modifier.phase = 'capture';
      capturingPath.some(object => {
        modifier.currentTarget = object;
        event.currentTarget.dispatchImmediateEvent(event);
        return event.propagationStopped;
      });
    }
    if (event.propagationStopped) {
      return;
    }

    // Target phase. The target can be an integer if the parent target has
    // multiple identifiers, typically when picking an instanced geometry.
    if (!Number.isInteger(event.target)) {
      modifier.phase = 'target';
      modifier.currentTarget = event.target;
      event.currentTarget.dispatchImmediateEvent(event);
      if (event.propagationStopped) {
        return;
      }
    }

    // Bubbling phase
    if (event.bubbles) {
      modifier.phase = 'bubble';
      bubblingPath.some(object => {
        modifier.currentTarget = object;
        event.currentTarget.dispatchImmediateEvent(event);
        return event.propagationStopped;
      });
    }
  }
}

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

class KeyboardEvent extends EventBundle {
  init(_ref = {}) {
    let rest = objectWithoutProperties(_ref, []);

    super.init(_extends({}, rest));
    return this;
  }

  get key() {
    return this.originalEvent.key;
  }

  get code() {
    return this.originalEvent.code;
  }

  get ctrlKey() {
    return this.originalEvent.ctrlKey;
  }

  get shiftKey() {
    return this.originalEvent.shiftKey;
  }

  get altKey() {
    return this.originalEvent.altKey;
  }

  get metaKey() {
    return this.originalEvent.metaKey;
  }

  get repeat() {
    return this.originalEvent.repeat;
  }
}

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

const internal$4 = Namespace('MouseEvent');

class MouseEvent extends EventBundle {
  init(_ref = {}) {
    let { x, y, movementX, movementY } = _ref,
        rest = objectWithoutProperties(_ref, ['x', 'y', 'movementX', 'movementY']);

    super.init(_extends({}, rest));
    const scope = internal$4(this);
    scope.x = x;
    scope.y = y;
    scope.movementX = movementX;
    scope.movementY = movementY;
    return this;
  }

  get x() {
    const scope = internal$4(this);
    return scope.x;
  }

  get y() {
    const scope = internal$4(this);
    return scope.y;
  }

  get movementX() {
    const scope = internal$4(this);
    return scope.movementX;
  }

  get movementY() {
    const scope = internal$4(this);
    return scope.movementY;
  }

  get button() {
    return this.originalEvent.button;
  }

  get ctrlKey() {
    return this.originalEvent.ctrlKey;
  }

  get shiftKey() {
    return this.originalEvent.shiftKey;
  }

  get altKey() {
    return this.originalEvent.altKey;
  }

  get metaKey() {
    return this.originalEvent.metaKey;
  }
}

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

const internal$5 = Namespace('Touch');

class Touch {
  constructor(...args) {
    this.init(...args);
  }

  init({ x, y, target, originalTouch } = {}) {
    const scope = internal$5(this);
    scope.x = x;
    scope.y = y;
    scope.target = target;
    scope.originalTouch = originalTouch;
    return this;
  }

  get identifier() {
    return this.originalTouch.identifier;
  }

  get x() {
    const scope = internal$5(this);
    return scope.x;
  }

  get y() {
    const scope = internal$5(this);
    return scope.y;
  }

  get target() {
    const scope = internal$5(this);
    return scope.target;
  }

  get originalTouch() {
    const scope = internal$5(this);
    return scope.originalTouch;
  }
}

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

const internal$6 = Namespace('TouchEvent');

class TouchEvent extends EventBundle {
  init(_ref = {}) {
    let { touches, changedTouches } = _ref,
        rest = objectWithoutProperties(_ref, ['touches', 'changedTouches']);

    super.init(_extends({}, rest));
    const scope = internal$6(this);
    scope.touches = touches;
    scope.changedTouches = changedTouches;
    return this;
  }

  get touches() {
    const scope = internal$6(this);
    return scope.touches;
  }

  get changedTouches() {
    const scope = internal$6(this);
    return scope.changedTouches;
  }

  get ctrlKey() {
    return this.originalEvent.ctrlKey;
  }

  get shiftKey() {
    return this.originalEvent.shiftKey;
  }

  get altKey() {
    return this.originalEvent.altKey;
  }

  get metaKey() {
    return this.originalEvent.metaKey;
  }
}

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

class TouchList extends Array {
  constructor(...args) {
    super();
    this.init(...args);
  }

  init(first, ...rest) {
    this.length = 0;
    if (first instanceof TouchList) {
      this.push(...first);
    } else {
      this.push(first, ...rest);
    }
  }

  item(index) {
    return this[index];
  }
}

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

class WheelEvent extends MouseEvent {
  init(_ref = {}) {
    let rest = objectWithoutProperties(_ref, []);

    super.init(_extends({}, rest, { type: 'wheel' }));
    return this;
  }

  get deltaX() {
    return this.originalEvent.deltaX;
  }

  get deltaY() {
    return this.originalEvent.deltaY;
  }

  get deltaZ() {
    return this.originalEvent.deltaZ;
  }
}

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

export { CustomEvent, Event, EventBundle, EventDispatcher, EventTarget, GenericEvent, KeyboardEvent, MouseEvent, Touch, TouchEvent, TouchList, WheelEvent };
