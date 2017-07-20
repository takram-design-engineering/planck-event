import { Namespace } from '@takram/planck-core';

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

const internal$2 = Namespace('Event');

class Event {
  constructor(options = {}) {
    this.init(options);
  }

  init({ type, captures = false, bubbles = true } = {}) {
    const scope = internal$2(this);
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
    const scope = internal$2(this);
    return scope.type;
  }

  get target() {
    const scope = internal$2(this);
    return scope.target;
  }

  get currentTarget() {
    const scope = internal$2(this);
    return scope.currentTarget;
  }

  get phase() {
    const scope = internal$2(this);
    return scope.phase;
  }

  get captures() {
    const scope = internal$2(this);
    return scope.captures;
  }

  get bubbles() {
    const scope = internal$2(this);
    return scope.bubbles;
  }

  get timestamp() {
    const scope = internal$2(this);
    return scope.timestamp;
  }

  stopPropagation() {
    const scope = internal$2(this);
    scope.propagationStopped = true;
  }

  stopImmediatePropagation() {
    const scope = internal$2(this);
    scope.propagationStopped = true;
    scope.immediatePropagationStopped = true;
  }

  get propagationStopped() {
    const scope = internal$2(this);
    return scope.propagationStopped;
  }

  get immediatePropagationStopped() {
    const scope = internal$2(this);
    return scope.immediatePropagationStopped;
  }
}

function modifyEvent(event) {
  const scope = internal$2(event);
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

    super.init(_extends({ type }, rest));
    // Support target as a parameter
    modifyEvent(this).target = target || null;
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

const internal$1 = Namespace('StateEvent');

class StateEvent extends CustomEvent {
  init(_ref = {}) {
    let { name, value } = _ref,
        rest = objectWithoutProperties(_ref, ['name', 'value']);

    super.init(_extends({}, rest, { type: StateEvent.type(name) }));
    const scope = internal$1(this);
    scope.name = name;
    scope.value = value;
    return this;
  }

  get name() {
    const scope = internal$1(this);
    return scope.name;
  }

  get value() {
    const scope = internal$1(this);
    return scope.value;
  }

  static type(name) {
    return `state:${name === null || name === undefined ? '' : name}`;
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

const internal = Namespace('Binder');

function isTargetSame(target, other) {
  return other.object === target.object && other.name === target.name;
}

function handleChange(transform, event) {
  const scope = internal(this);
  if (event.target === scope.source && event.name === scope.name) {
    const value = transform(event.value);
    scope.targets.forEach(target => {
      target.object[target.name] = value;
    });
  }
}

function dispose(binder) {
  const scope = internal(binder);
  const type = StateEvent.type(scope.name);
  scope.source.removeEventListener(type, scope.handleChange, false);
}

class Binder {
  constructor(source, name, targets, {
    assigns = false,
    transform = value => value
  } = {}) {
    const scope = internal(this);
    scope.source = source;
    scope.name = name;
    scope.targets = [...targets];
    scope.handleChange = handleChange.bind(this, transform);

    // Listen for state events with the given name
    const type = StateEvent.type(name);
    scope.source.addEventListener(type, scope.handleChange, false);

    // Initial assignment
    if (assigns) {
      targets.forEach(target => {
        target.object[target.name] = transform(source[name]);
      });
    }
  }

  get empty() {
    const scope = internal(this);
    return scope.targets.length === 0;
  }

  matches(targets) {
    const scope = internal(this);
    if (!Array.isArray(targets) || targets.length === 0) {
      return false;
    }
    return targets.every(other => {
      return scope.targets.some(target => {
        return isTargetSame(target, other);
      });
    });
  }

  unbind(targets) {
    if (!targets) {
      return this.unbindAll();
    }
    const scope = internal(this);
    const unboundTargets = targets.reduce((result, target) => {
      const index = scope.targets.findIndex(other => {
        return isTargetSame(target, other);
      });
      if (index !== -1) {
        scope.targets.splice(index, 1);
        result.push(target);
      }
      return result;
    }, []);
    if (scope.targets.length === 0) {
      dispose(this);
    }
    return unboundTargets;
  }

  unbindAll() {
    const scope = internal(this);
    const unboundTargets = scope.targets;
    scope.targets = [];
    dispose(this);
    return unboundTargets;
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

const internal$3 = Namespace('Binding');

function formatTargets(...args) {
  // Flatten arguments
  const flatArgs = args.reduce((targets, value) => {
    return targets.concat(value);
  }, []);

  // Convert the array from [object, name, ...] to [{ object, name }, ...]
  let object;
  const targets = flatArgs.reduce((targets, value, index) => {
    if (index % 2 === 0) {
      object = value;
    } else {
      targets.push({ object, name: value });
    }
    return targets;
  }, []);

  // Defaults to one-way binding for multiple targets
  const options = Object.assign({
    oneWay: targets.length > 1
  }, flatArgs[targets.length * 2]);
  return [targets, options];
}

function bind(source, name, targets, options) {
  const scope = internal$3(source);
  if (scope.bindings === undefined) {
    scope.bindings = {};
  }
  if (scope.bindings[name] === undefined) {
    scope.bindings[name] = [];
  }
  let binders = scope.bindings[name];
  binders.forEach(binder => {
    binder.unbind(targets);
  });
  binders = binders.filter(binder => !binder.empty);
  binders.push(new Binder(source, name, targets, options));
  scope.bindings[name] = binders;
}

function unbind(source, name, targets) {
  const scope = internal$3(source);
  if (scope.bindings === undefined) {
    return [];
  }
  if (scope.bindings[name] === undefined) {
    return [];
  }
  let binders = scope.bindings[name];
  const unboundTargets = binders.reduce((result, binder) => {
    return result.concat(binder.unbind(targets));
  }, []);
  binders = binders.filter(binder => !binder.empty);
  scope.bindings[name] = binders;
  return unboundTargets;
}

function unbindAll(source, name) {
  const scope = internal$3(source);
  if (scope.bindings === undefined) {
    return [];
  }
  if (scope.bindings[name] === undefined) {
    return [];
  }
  const binders = scope.bindings[name];
  const unboundTargets = binders.reduce((result, binder) => {
    return result.concat(binder.unbindAll());
  }, []);
  scope.bindings[name] = [];
  return unboundTargets;
}

class Binding {
  static bind(source, name, ...rest) {
    const [targets, options] = formatTargets(...rest);
    if (!options.oneWay) {
      targets.forEach(target => {
        bind(target.object, target.name, [{ object: source, name }], {
          assigns: false,
          transform: options.inverseTransform
        });
      });
    }
    bind(source, name, targets, {
      assigns: true,
      transform: options.transform
    });
  }

  static unbind(source, name, ...rest) {
    const [targets, options] = formatTargets(...rest);
    const unboundTargets = unbind(source, name, targets);
    if (!options.oneWay) {
      unboundTargets.forEach(target => {
        unbind(target.object, target.name, [{ object: source, name }]);
      });
    }
  }

  static unbindAll(source, name) {
    unbindAll(source, name).forEach(target => {
      unbindAll(target.object, target.name, [{ object: source, name }]);
    });
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

const internal$4 = Namespace('EventBundle');

class EventBundle extends Event {
  init(_ref = {}) {
    let { originalEvent } = _ref,
        rest = objectWithoutProperties(_ref, ['originalEvent']);

    super.init(_extends({}, rest));
    const scope = internal$4(this);
    scope.originalEvent = originalEvent || null;
    return this;
  }

  preventDefault() {
    const scope = internal$4(this);
    if (scope.originalEvent !== null) {
      scope.originalEvent.preventDefault();
    }
  }

  get defaultPrevented() {
    const scope = internal$4(this);
    if (scope.originalEvent === null) {
      return false;
    }
    return scope.originalEvent.defaultPrevented;
  }

  get originalEvent() {
    const scope = internal$4(this);
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
    let { type, target, captures = false, bubbles = false } = _ref,
        rest = objectWithoutProperties(_ref, ['type', 'target', 'captures', 'bubbles']);

    super.init({ type, target, captures, bubbles });
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

const internal$5 = Namespace('EventDispatcher');

function handleEvent(event, listener) {
  if (typeof listener === 'function') {
    listener(event);
  } else if (typeof listener.handleEvent === 'function') {
    listener.handleEvent(event);
  } else {
    throw new Error('Listener is neither function nor event listener');
  }
}

class EventDispatcher {
  constructor() {
    const scope = internal$5(this);
    scope.listeners = {};
  }

  addEventListener(type, listener, capture = false) {
    if (typeof listener !== 'function' && typeof listener !== 'object') {
      throw new Error('Attempt to add non-function non-object listener');
    }
    const scope = internal$5(this);
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
    const scope = internal$5(this);
    if (scope.listeners[type] === undefined) {
      return;
    }
    const listeners = capture ? scope.listeners[type].capture : scope.listeners[type].bubble;
    const index = listeners.indexOf(listener);
    if (index !== -1) {
      listeners.splice(index, 1);
    }
  }

  on(...args) {
    this.addEventListener(...args);
    return this;
  }

  off(...args) {
    this.removeEventListener(...args);
    return this;
  }

  once(type, listener, ...rest) {
    const delegate = event => {
      handleEvent(event, listener);
      this.removeEventListener(type, delegate, ...rest);
    };
    this.addEventListener(type, delegate, ...rest);
    return this;
  }

  dispatchEvent(object) {
    let event = object;
    if (!(event instanceof Event)) {
      event = new GenericEvent(object);
    }
    const modifier = modifyEvent(event);

    // Set target to this when it's not set
    if (!event.target) {
      modifier.target = this;
    }
    // Current target should be always this
    modifier.currentTarget = this;

    const scope = internal$5(this);
    const listeners = scope.listeners[event.type];
    if (listeners === undefined) {
      return;
    }
    const phase = event.phase;
    if (!phase || phase === 'target' || phase === 'capture') {
      [...listeners.capture].some(listener => {
        handleEvent(event, listener);
        return event.immediatePropagationStopped;
      });
    }
    if (event.immediatePropagationStopped) {
      return;
    }
    if (!phase || phase === 'target' || phase === 'bubble') {
      [...listeners.bubble].some(listener => {
        handleEvent(event, listener);
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

const internal$6 = Namespace('EventTarget');

class EventTarget extends EventDispatcher {
  constructor() {
    super();
    const scope = internal$6(this);
    scope.ancestorEventTarget = null;
    scope.descendantEventTarget = null;
  }

  get ancestorEventTarget() {
    const scope = internal$6(this);
    return scope.ancestorEventTarget;
  }

  set ancestorEventTarget(value) {
    const scope = internal$6(this);
    scope.ancestorEventTarget = value || null;
  }

  get descendantEventTarget() {
    const scope = internal$6(this);
    return scope.descendantEventTarget;
  }

  set descendantEventTarget(value) {
    const scope = internal$6(this);
    scope.descendantEventTarget = value || null;
  }

  determinePropagationPath(target = null) {
    const path = [];
    if (target !== null && target !== undefined) {
      let ancestor = target;
      while (ancestor !== null && ancestor !== undefined) {
        path.unshift(ancestor);
        ancestor = ancestor.ancestorEventTarget;
        if (path.includes(ancestor)) {
          break;
        }
      }
    } else {
      let descendant = this;
      while (descendant !== null && descendant !== undefined) {
        path.push(descendant);
        descendant = descendant.descendantEventTarget;
        if (path.includes(descendant)) {
          break;
        }
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
    const modifier = modifyEvent(event);

    // Just dispatch the event if it doesn't capture nor bubble
    if (!event.captures && !event.bubbles) {
      this.dispatchImmediateEvent(event);
      return;
    }

    // Determine the capturing path of this event
    let capturingPath;
    if (Array.isArray(propagationPath)) {
      capturingPath = [...propagationPath];
    } else {
      capturingPath = this.determinePropagationPath(event.target || this);
    }

    // The last item in the propagation path must always be the event target
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
        object.dispatchImmediateEvent(event);
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
      event.target.dispatchImmediateEvent(event);
      if (event.propagationStopped) {
        return;
      }
    }

    // Bubbling phase
    if (event.bubbles) {
      modifier.phase = 'bubble';
      bubblingPath.some(object => {
        object.dispatchImmediateEvent(event);
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

const internal$7 = Namespace('MouseEvent');

class MouseEvent extends EventBundle {
  init(_ref = {}) {
    let { x, y, movementX, movementY } = _ref,
        rest = objectWithoutProperties(_ref, ['x', 'y', 'movementX', 'movementY']);

    super.init(_extends({}, rest));
    const scope = internal$7(this);
    scope.x = x || 0;
    scope.y = y || 0;
    scope.movementX = movementX || 0;
    scope.movementY = movementY || 0;
    return this;
  }

  get x() {
    const scope = internal$7(this);
    return scope.x;
  }

  get y() {
    const scope = internal$7(this);
    return scope.y;
  }

  get movementX() {
    const scope = internal$7(this);
    return scope.movementX;
  }

  get movementY() {
    const scope = internal$7(this);
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

const internal$8 = Namespace('Touch');

class Touch {
  constructor(options = {}) {
    this.init(options);
  }

  init({ x, y, target, originalTouch } = {}) {
    const scope = internal$8(this);
    scope.x = x || 0;
    scope.y = y || 0;
    scope.target = target || null;
    scope.originalTouch = originalTouch || null;
    return this;
  }

  get x() {
    const scope = internal$8(this);
    return scope.x;
  }

  get y() {
    const scope = internal$8(this);
    return scope.y;
  }

  get target() {
    const scope = internal$8(this);
    return scope.target;
  }

  get originalTouch() {
    const scope = internal$8(this);
    return scope.originalTouch;
  }

  get identifier() {
    return this.originalTouch.identifier;
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

const internal$9 = Namespace('TouchEvent');

class TouchEvent extends EventBundle {
  init(_ref = {}) {
    let { touches, changedTouches } = _ref,
        rest = objectWithoutProperties(_ref, ['touches', 'changedTouches']);

    super.init(_extends({}, rest));
    const scope = internal$9(this);
    scope.touches = touches;
    scope.changedTouches = changedTouches;
    return this;
  }

  get touches() {
    const scope = internal$9(this);
    return scope.touches;
  }

  get changedTouches() {
    const scope = internal$9(this);
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

const internal$10 = Namespace('TouchList');

class TouchList {
  constructor(...args) {
    const scope = internal$10(this);
    scope.array = [];
    this.init(...args);
  }

  init(first, ...rest) {
    const scope = internal$10(this);
    scope.array.length = 0;
    if (Array.isArray(first)) {
      scope.array.push(...first);
    } else if (first) {
      scope.array.push(first, ...rest);
    }
  }

  get length() {
    const scope = internal$10(this);
    return scope.array.length;
  }

  item(index) {
    const scope = internal$10(this);
    return scope.array[index];
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

export { Binder, Binding, CustomEvent, Event, modifyEvent, EventBundle, EventDispatcher, EventTarget, GenericEvent, KeyboardEvent, MouseEvent, StateEvent, Touch, TouchEvent, TouchList, WheelEvent };
//# sourceMappingURL=planck-event.module.js.map
