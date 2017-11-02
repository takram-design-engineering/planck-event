(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.Planck = global.Planck || {})));
}(this, (function (exports) { 'use strict';

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

function Namespace() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

  var symbol = Symbol(name);
  return function namespace(object) {
    var init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (data) {
      return data;
    };

    if (object[symbol] === undefined) {
      // eslint-disable-next-line no-param-reassign
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

var environmentType = function () {
  try {
    // eslint-disable-next-line no-new-func
    if (new Function('return this === window')()) {
      return 'browser';
    }
  } catch (error) {}
  try {
    // eslint-disable-next-line no-new-func
    if (new Function('return this === self')()) {
      return 'worker';
    }
  } catch (error) {}
  try {
    // eslint-disable-next-line no-new-func
    if (new Function('return this === global')()) {
      return 'node';
    }
  } catch (error) {}
  return undefined;
}();

var environmentSelf = void 0;
switch (environmentType) {
  case 'browser':
    environmentSelf = window;
    break;
  case 'worker':
    // eslint-disable-next-line no-restricted-globals
    environmentSelf = self;
    break;
  case 'node':
    environmentSelf = global;
    break;
  default:
    break;
}

var Environment = {
  type: environmentType,
  self: environmentSelf
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







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

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
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

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};





var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
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

var internal$2 = Namespace('Event');

var Event = function () {
  function Event() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, Event);

    this.init(options);
  }

  createClass(Event, [{
    key: 'init',
    value: function init() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          type = _ref.type,
          _ref$captures = _ref.captures,
          captures = _ref$captures === undefined ? false : _ref$captures,
          _ref$bubbles = _ref.bubbles,
          bubbles = _ref$bubbles === undefined ? true : _ref$bubbles,
          _ref$cancelable = _ref.cancelable,
          cancelable = _ref$cancelable === undefined ? true : _ref$cancelable;

      var scope = internal$2(this);
      scope.type = type !== undefined ? type : null;
      scope.captures = !!captures;
      scope.bubbles = !!bubbles;
      scope.cancelable = !!cancelable;
      scope.timeStamp = Environment.self.performance && Environment.self.performance.now && Environment.self.performance.now() || Date.now();
      scope.propagationStopped = false;
      scope.immediatePropagationStopped = false;
      scope.defaultPrevented = false;
      scope.target = null;
      scope.currentTarget = null;
      scope.eventPhase = null;
      return this;
    }
  }, {
    key: 'stopPropagation',
    value: function stopPropagation() {
      var scope = internal$2(this);
      scope.propagationStopped = true;
    }
  }, {
    key: 'stopImmediatePropagation',
    value: function stopImmediatePropagation() {
      var scope = internal$2(this);
      scope.propagationStopped = true;
      scope.immediatePropagationStopped = true;
    }
  }, {
    key: 'preventDefault',
    value: function preventDefault() {
      if (this.cancelable) {
        var scope = internal$2(this);
        scope.defaultPrevented = true;
      }
    }
  }, {
    key: 'type',
    get: function get$$1() {
      var scope = internal$2(this);
      return scope.type;
    }
  }, {
    key: 'target',
    get: function get$$1() {
      var scope = internal$2(this);
      return scope.target;
    }
  }, {
    key: 'currentTarget',
    get: function get$$1() {
      var scope = internal$2(this);
      return scope.currentTarget;
    }
  }, {
    key: 'eventPhase',
    get: function get$$1() {
      var scope = internal$2(this);
      return scope.eventPhase;
    }
  }, {
    key: 'captures',
    get: function get$$1() {
      var scope = internal$2(this);
      return scope.captures;
    }
  }, {
    key: 'bubbles',
    get: function get$$1() {
      var scope = internal$2(this);
      return scope.bubbles;
    }
  }, {
    key: 'cancelable',
    get: function get$$1() {
      var scope = internal$2(this);
      return scope.cancelable;
    }
  }, {
    key: 'timeStamp',
    get: function get$$1() {
      var scope = internal$2(this);
      return scope.timeStamp;
    }
  }, {
    key: 'propagationStopped',
    get: function get$$1() {
      var scope = internal$2(this);
      return scope.propagationStopped;
    }
  }, {
    key: 'immediatePropagationStopped',
    get: function get$$1() {
      var scope = internal$2(this);
      return scope.immediatePropagationStopped;
    }
  }, {
    key: 'defaultPrevented',
    get: function get$$1() {
      var scope = internal$2(this);
      return scope.defaultPrevented;
    }
  }]);
  return Event;
}();

function modifyEvent(event) {
  var scope = internal$2(event);
  return {
    set target(value) {
      scope.target = value !== undefined ? value : null;
    },

    set currentTarget(value) {
      scope.currentTarget = value !== undefined ? value : null;
    },

    set eventPhase(value) {
      scope.eventPhase = value !== undefined ? value : null;
    }
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

var CustomEvent = function (_Event) {
  inherits(CustomEvent, _Event);

  function CustomEvent() {
    classCallCheck(this, CustomEvent);
    return possibleConstructorReturn(this, (CustomEvent.__proto__ || Object.getPrototypeOf(CustomEvent)).apply(this, arguments));
  }

  createClass(CustomEvent, [{
    key: 'init',
    value: function init() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var type = _ref.type,
          target = _ref.target,
          rest = objectWithoutProperties(_ref, ['type', 'target']);

      get(CustomEvent.prototype.__proto__ || Object.getPrototypeOf(CustomEvent.prototype), 'init', this).call(this, _extends({ type: type }, rest));
      // Support target as a parameter
      modifyEvent(this).target = target !== undefined ? target : null;
      return this;
    }
  }]);
  return CustomEvent;
}(Event);

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

var internal$1 = Namespace('StateEvent');

var StateEvent = function (_CustomEvent) {
  inherits(StateEvent, _CustomEvent);

  function StateEvent() {
    classCallCheck(this, StateEvent);
    return possibleConstructorReturn(this, (StateEvent.__proto__ || Object.getPrototypeOf(StateEvent)).apply(this, arguments));
  }

  createClass(StateEvent, [{
    key: 'init',
    value: function init() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var name = _ref.name,
          value = _ref.value,
          rest = objectWithoutProperties(_ref, ['name', 'value']);

      get(StateEvent.prototype.__proto__ || Object.getPrototypeOf(StateEvent.prototype), 'init', this).call(this, _extends({}, rest, { type: StateEvent.type(name) }));
      var scope = internal$1(this);
      scope.name = name;
      scope.value = value;
      return this;
    }
  }, {
    key: 'name',
    get: function get$$1() {
      var scope = internal$1(this);
      return scope.name;
    }
  }, {
    key: 'value',
    get: function get$$1() {
      var scope = internal$1(this);
      return scope.value;
    }
  }], [{
    key: 'type',
    value: function type(name) {
      if (typeof name !== 'string') {
        throw new Error('Type name must be a string');
      }
      return 'state:' + name;
    }
  }]);
  return StateEvent;
}(CustomEvent);

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

var internal = Namespace('Binder');

function isTargetSame(target, other) {
  return other.object === target.object && other.name === target.name;
}

function handleChange(transform, event) {
  var scope = internal(this);
  if (event.target === scope.source && event.name === scope.name) {
    var value = transform(event.value);
    for (var i = 0; i < scope.targets.length; ++i) {
      var target = scope.targets[i];
      target.object[target.name] = value;
    }
  }
}

function dispose(binder) {
  var scope = internal(binder);
  var type = StateEvent.type(scope.name);
  scope.source.removeEventListener(type, scope.handleChange, false);
}

var Binder = function () {
  function Binder(source, name, targets) {
    var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
        _ref$assigns = _ref.assigns,
        assigns = _ref$assigns === undefined ? false : _ref$assigns,
        _ref$transform = _ref.transform,
        transform = _ref$transform === undefined ? function (value) {
      return value;
    } : _ref$transform;

    classCallCheck(this, Binder);

    var scope = internal(this);
    scope.source = source;
    scope.name = name;
    scope.targets = [].concat(toConsumableArray(targets));
    scope.handleChange = handleChange.bind(this, transform);

    // Listen for state events with the given name
    var type = StateEvent.type(name);
    scope.source.addEventListener(type, scope.handleChange, false);

    // Initial assignment
    if (assigns) {
      for (var i = 0; i < targets.length; ++i) {
        var target = targets[i];
        target.object[target.name] = transform(source[name]);
      }
    }
  }

  createClass(Binder, [{
    key: 'matches',
    value: function matches(targets) {
      var scope = internal(this);
      if (!Array.isArray(targets) || targets.length === 0) {
        return false;
      }
      for (var i = 0; i < targets.length; ++i) {
        var matches = false;
        var target = targets[i];
        for (var _i = 0; _i < scope.targets.length; ++_i) {
          if (isTargetSame(target, scope.targets[_i])) {
            matches = true;
            break;
          }
        }
        if (!matches) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'unbind',
    value: function unbind(targets) {
      if (!targets) {
        return this.unbindAll();
      }
      var scope = internal(this);
      var unboundTargets = [];
      for (var i = 0; i < targets.length; ++i) {
        var target = targets[i];
        for (var index = 0; index < scope.targets.length; ++index) {
          if (isTargetSame(target, scope.targets[index])) {
            scope.targets.splice(index, 1);
            unboundTargets.push(target);
            break;
          }
        }
      }
      if (scope.targets.length === 0) {
        dispose(this);
      }
      return unboundTargets;
    }
  }, {
    key: 'unbindAll',
    value: function unbindAll() {
      var scope = internal(this);
      var unboundTargets = scope.targets;
      scope.targets = [];
      dispose(this);
      return unboundTargets;
    }
  }, {
    key: 'empty',
    get: function get$$1() {
      var scope = internal(this);
      return scope.targets.length === 0;
    }
  }]);
  return Binder;
}();

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

var internal$3 = Namespace('Binding');

function formatTargets() {
  // Flatten arguments
  var flatArgs = [];

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  for (var i = 0; i < args.length; ++i) {
    var value = args[i];
    if (Array.isArray(value)) {
      flatArgs.push.apply(flatArgs, toConsumableArray(value));
    } else {
      flatArgs.push(value);
    }
  }

  // Convert the array from [object, name, ...] to [{ object, name }, ...]
  var object = void 0;
  var targets = [];
  for (var index = 0; index < flatArgs.length; ++index) {
    if (index % 2 === 0) {
      object = flatArgs[index];
    } else {
      targets.push({ object: object, name: flatArgs[index] });
    }
  }

  // Defaults to one-way binding for multiple targets
  var options = Object.assign({
    oneWay: targets.length > 1
  }, flatArgs[targets.length * 2]);
  return [targets, options];
}

function _bind(source, name, targets, options) {
  var scope = internal$3(source);
  if (scope.bindings === undefined) {
    scope.bindings = {};
  }
  if (scope.bindings[name] === undefined) {
    scope.bindings[name] = [];
  }
  var currentBinders = scope.bindings[name];
  var nextBinders = [];
  for (var i = 0; i < currentBinders.length; ++i) {
    var binder = currentBinders[i];
    binder.unbind(targets);
    if (!binder.empty) {
      nextBinders.push(binder);
    }
  }
  nextBinders.push(new Binder(source, name, targets, options));
  scope.bindings[name] = nextBinders;
}

function _unbind(source, name, targets) {
  var scope = internal$3(source);
  if (scope.bindings === undefined) {
    return [];
  }
  if (scope.bindings[name] === undefined) {
    return [];
  }
  var unboundTargets = [];
  var currentBinders = scope.bindings[name];
  var nextBinders = [];
  for (var i = 0; i < currentBinders.length; ++i) {
    var binder = currentBinders[i];
    unboundTargets.push.apply(unboundTargets, toConsumableArray(binder.unbind(targets)));
    if (!binder.empty) {
      nextBinders.push(binder);
    }
  }
  scope.bindings[name] = nextBinders;
  return unboundTargets;
}

function _unbindAll(source, name) {
  var scope = internal$3(source);
  if (scope.bindings === undefined) {
    return [];
  }
  if (scope.bindings[name] === undefined) {
    return [];
  }
  var binders = scope.bindings[name];
  var unboundTargets = [];
  for (var i = 0; i < binders.length; ++i) {
    unboundTargets.push.apply(unboundTargets, toConsumableArray(binders[i].unbindAll()));
  }
  scope.bindings[name] = [];
  return unboundTargets;
}

var Binding = function () {
  function Binding() {
    classCallCheck(this, Binding);
  }

  createClass(Binding, null, [{
    key: 'bind',
    value: function bind(source, name) {
      for (var _len2 = arguments.length, rest = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        rest[_key2 - 2] = arguments[_key2];
      }

      var _formatTargets = formatTargets.apply(undefined, rest),
          _formatTargets2 = slicedToArray(_formatTargets, 2),
          targets = _formatTargets2[0],
          options = _formatTargets2[1];

      if (!options.oneWay) {
        for (var i = 0; i < targets.length; ++i) {
          var target = targets[i];
          _bind(target.object, target.name, [{ object: source, name: name }], {
            assigns: false,
            transform: options.inverseTransform
          });
        }
      }
      _bind(source, name, targets, {
        assigns: true,
        transform: options.transform
      });
    }
  }, {
    key: 'unbind',
    value: function unbind(source, name) {
      for (var _len3 = arguments.length, rest = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
        rest[_key3 - 2] = arguments[_key3];
      }

      var _formatTargets3 = formatTargets.apply(undefined, rest),
          _formatTargets4 = slicedToArray(_formatTargets3, 2),
          targets = _formatTargets4[0],
          options = _formatTargets4[1];

      var unboundTargets = _unbind(source, name, targets);
      if (!options.oneWay) {
        for (var i = 0; i < unboundTargets.length; ++i) {
          var target = unboundTargets[i];
          _unbind(target.object, target.name, [{ object: source, name: name }]);
        }
      }
    }
  }, {
    key: 'unbindAll',
    value: function unbindAll(source, name) {
      var unboundTargets = _unbindAll(source, name);
      for (var i = 0; i < unboundTargets.length; ++i) {
        var target = unboundTargets[i];
        _unbindAll(target.object, target.name, [{ object: source, name: name }]);
      }
    }
  }]);
  return Binding;
}();

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

var internal$4 = Namespace('EventBundle');

var EventBundle = function (_Event) {
  inherits(EventBundle, _Event);

  function EventBundle() {
    classCallCheck(this, EventBundle);
    return possibleConstructorReturn(this, (EventBundle.__proto__ || Object.getPrototypeOf(EventBundle)).apply(this, arguments));
  }

  createClass(EventBundle, [{
    key: 'init',
    value: function init() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var originalEvent = _ref.originalEvent,
          rest = objectWithoutProperties(_ref, ['originalEvent']);

      get(EventBundle.prototype.__proto__ || Object.getPrototypeOf(EventBundle.prototype), 'init', this).call(this, _extends({}, rest));
      var scope = internal$4(this);
      scope.originalEvent = originalEvent || null;
      return this;
    }
  }, {
    key: 'preventDefault',
    value: function preventDefault() {
      get(EventBundle.prototype.__proto__ || Object.getPrototypeOf(EventBundle.prototype), 'preventDefault', this).call(this);
      if (this.cancelable) {
        if (this.originalEvent !== null) {
          this.originalEvent.preventDefault();
        }
      }
    }
  }, {
    key: 'originalEvent',
    get: function get$$1() {
      var scope = internal$4(this);
      return scope.originalEvent;
    }
  }]);
  return EventBundle;
}(Event);

'use strict';

var _cachedApplicationRef = Symbol('_cachedApplicationRef');
var _mixinRef = Symbol('_mixinRef');
var _originalMixin = Symbol('_originalMixin');

/**
 * Sets the prototype of mixin to wrapper so that properties set on mixin are
 * inherited by the wrapper.
 *
 * This is needed in order to implement @@hasInstance as a decorator function.
 */
var wrap = function wrap(mixin, wrapper) {
  Object.setPrototypeOf(wrapper, mixin);
  if (!mixin[_originalMixin]) {
    mixin[_originalMixin] = mixin;
  }
  return wrapper;
};

/**
 * Decorates mixin so that it caches its applications. When applied multiple
 * times to the same superclass, mixin will only create one subclass and
 * memoize it.
 */
var Cached = function Cached(mixin) {
  return wrap(mixin, function (superclass) {
    // Get or create a symbol used to look up a previous application of mixin
    // to the class. This symbol is unique per mixin definition, so a class will have N
    // applicationRefs if it has had N mixins applied to it. A mixin will have
    // exactly one _cachedApplicationRef used to store its applications.
    var applicationRef = mixin[_cachedApplicationRef];
    if (!applicationRef) {
      applicationRef = mixin[_cachedApplicationRef] = Symbol(mixin.name);
    }
    // Look up an existing application of `mixin` to `c`, return it if found.
    if (superclass.hasOwnProperty(applicationRef)) {
      return superclass[applicationRef];
    }
    // Apply the mixin
    var application = mixin(superclass);
    // Cache the mixin application on the superclass
    superclass[applicationRef] = application;
    return application;
  });
};

/**
 * Adds @@hasInstance (ES2015 instanceof support) to mixin.
 * Note: @@hasInstance is not supported in any browsers yet.
 */
var HasInstance = function HasInstance(mixin) {
  if (Symbol.hasInstance && !mixin.hasOwnProperty(Symbol.hasInstance)) {
    Object.defineProperty(mixin, Symbol.hasInstance, {
      value: function value(o) {
        var originalMixin = this[_originalMixin];
        while (o != null) {
          if (o.hasOwnProperty(_mixinRef) && o[_mixinRef] === originalMixin) {
            return true;
          }
          o = Object.getPrototypeOf(o);
        }
        return false;
      }
    });
  }
  return mixin;
};

/**
 * A basic mixin decorator that sets up a reference from mixin applications
 * to the mixin defintion for use by other mixin decorators.
 */
var BareMixin = function BareMixin(mixin) {
  return wrap(mixin, function (superclass) {
    // Apply the mixin
    var application = mixin(superclass);

    // Attach a reference from mixin applition to wrapped mixin for RTTI
    // mixin[@@hasInstance] should use this.
    application.prototype[_mixinRef] = mixin[_originalMixin];
    return application;
  });
};

/**
 * Decorates a mixin function to add application caching and instanceof
 * support.
 */
var Mixin = function Mixin(mixin) {
  return Cached(HasInstance(BareMixin(mixin)));
};

var mix = function mix(superClass) {
  return new MixinBuilder(superClass);
};

var MixinBuilder = function () {
  function MixinBuilder(superclass) {
    classCallCheck(this, MixinBuilder);

    this.superclass = superclass;
  }

  createClass(MixinBuilder, [{
    key: 'with',
    value: function _with() {
      return Array.from(arguments).reduce(function (c, m) {
        return m(c);
      }, this.superclass);
    }
  }]);
  return MixinBuilder;
}();

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

var GenericEvent = function (_CustomEvent) {
  inherits(GenericEvent, _CustomEvent);

  function GenericEvent() {
    classCallCheck(this, GenericEvent);
    return possibleConstructorReturn(this, (GenericEvent.__proto__ || Object.getPrototypeOf(GenericEvent)).apply(this, arguments));
  }

  createClass(GenericEvent, [{
    key: 'init',
    value: function init() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var type = _ref.type,
          target = _ref.target,
          _ref$captures = _ref.captures,
          captures = _ref$captures === undefined ? false : _ref$captures,
          _ref$bubbles = _ref.bubbles,
          bubbles = _ref$bubbles === undefined ? false : _ref$bubbles,
          rest = objectWithoutProperties(_ref, ['type', 'target', 'captures', 'bubbles']);

      get(GenericEvent.prototype.__proto__ || Object.getPrototypeOf(GenericEvent.prototype), 'init', this).call(this, {
        type: type, target: target, captures: captures, bubbles: bubbles
      });
      var names = Object.keys(rest);
      for (var i = 0; i < names.length; ++i) {
        var name = names[i];
        if (!{}.hasOwnProperty.call(this, name)) {
          this[name] = rest[name];
        } else {
          throw new Error('Name "' + name + '" cannot be used for event property');
        }
      }
      return this;
    }
  }]);
  return GenericEvent;
}(CustomEvent);

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

var internal$5 = Namespace('EventDispatcherMixin');

function handleEvent(event, listener) {
  if (typeof listener === 'function') {
    listener(event);
  } else if (typeof listener.handleEvent === 'function') {
    listener.handleEvent(event);
  } else {
    throw new Error('Listener is neither function nor event listener');
  }
}

// eslint-disable-next-line arrow-parens
var EventDispatcherMixin = Mixin(function (S) {
  return function (_S) {
    inherits(EventDispatcherMixin, _S);

    function EventDispatcherMixin() {
      var _ref;

      classCallCheck(this, EventDispatcherMixin);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var _this = possibleConstructorReturn(this, (_ref = EventDispatcherMixin.__proto__ || Object.getPrototypeOf(EventDispatcherMixin)).call.apply(_ref, [this].concat(args)));

      var scope = internal$5(_this);
      scope.listeners = {};
      return _this;
    }

    createClass(EventDispatcherMixin, [{
      key: 'addEventListener',
      value: function addEventListener(type, listener) {
        var capture = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (typeof listener !== 'function' && (typeof listener === 'undefined' ? 'undefined' : _typeof(listener)) !== 'object') {
          throw new Error('Attempt to add non-function non-object listener');
        }
        var scope = internal$5(this);
        if (scope.listeners[type] === undefined) {
          scope.listeners[type] = { bubble: [], capture: [] };
        }
        var listeners = capture ? scope.listeners[type].capture : scope.listeners[type].bubble;
        if (listeners.includes(listener)) {
          return;
        }
        listeners.push(listener);
      }
    }, {
      key: 'removeEventListener',
      value: function removeEventListener(type, listener) {
        var capture = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        var scope = internal$5(this);
        if (scope.listeners[type] === undefined) {
          return;
        }
        var listeners = capture ? scope.listeners[type].capture : scope.listeners[type].bubble;
        var index = listeners.indexOf(listener);
        if (index !== -1) {
          listeners.splice(index, 1);
        }
      }
    }, {
      key: 'on',
      value: function on() {
        this.addEventListener.apply(this, arguments);
        return this;
      }
    }, {
      key: 'off',
      value: function off() {
        this.removeEventListener.apply(this, arguments);
        return this;
      }
    }, {
      key: 'once',
      value: function once(type, listener) {
        for (var _len2 = arguments.length, rest = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          rest[_key2 - 2] = arguments[_key2];
        }

        var _this2 = this;

        var delegate = function delegate(event) {
          handleEvent(event, listener);
          _this2.removeEventListener.apply(_this2, [type, delegate].concat(rest));
        };
        this.addEventListener.apply(this, [type, delegate].concat(rest));
        return this;
      }
    }, {
      key: 'dispatchEvent',
      value: function dispatchEvent(object) {
        var event = object;
        if (!(event instanceof Event)) {
          event = new GenericEvent(object);
        }
        var modifier = modifyEvent(event);

        // Set target to this when it's not set
        if (event.target === null) {
          modifier.target = this;
        }
        // Current target should be always this
        modifier.currentTarget = this;

        var scope = internal$5(this);
        var listeners = scope.listeners[event.type];
        if (listeners === undefined) {
          return;
        }
        var _event = event,
            eventPhase = _event.eventPhase;

        if (!eventPhase || eventPhase === 'target' || eventPhase === 'capture') {
          var capture = [].concat(toConsumableArray(listeners.capture));
          for (var i = 0; i < capture.length; ++i) {
            handleEvent(event, capture[i]);
            if (event.immediatePropagationStopped) {
              return;
            }
          }
        }
        if (!eventPhase || eventPhase === 'target' || eventPhase === 'bubble') {
          var bubble = [].concat(toConsumableArray(listeners.bubble));
          for (var _i = 0; _i < bubble.length; ++_i) {
            handleEvent(event, bubble[_i]);
            if (event.immediatePropagationStopped) {
              return;
            }
          }
        }
      }
    }]);
    return EventDispatcherMixin;
  }(S);
});

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

var EventDispatcher = function (_mix$with) {
  inherits(EventDispatcher, _mix$with);

  function EventDispatcher() {
    classCallCheck(this, EventDispatcher);
    return possibleConstructorReturn(this, (EventDispatcher.__proto__ || Object.getPrototypeOf(EventDispatcher)).apply(this, arguments));
  }

  return EventDispatcher;
}(mix(function () {
  function _class() {
    classCallCheck(this, _class);
  }

  return _class;
}()).with(EventDispatcherMixin));

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

var internal$6 = Namespace('EventTargetMixin');

// eslint-disable-next-line arrow-parens
var EventTargetMixin = Mixin(function (S) {
  return function (_S) {
    inherits(EventTargetMixin, _S);

    function EventTargetMixin() {
      var _ref;

      classCallCheck(this, EventTargetMixin);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var _this = possibleConstructorReturn(this, (_ref = EventTargetMixin.__proto__ || Object.getPrototypeOf(EventTargetMixin)).call.apply(_ref, [this].concat(args)));

      var scope = internal$6(_this);
      scope.ancestorEventTarget = null;
      scope.descendantEventTarget = null;
      return _this;
    }

    createClass(EventTargetMixin, [{
      key: 'determinePropagationPath',
      value: function determinePropagationPath() {
        var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        var path = [];
        if (target !== null && target !== undefined) {
          var ancestor = target;
          while (ancestor !== null && ancestor !== undefined) {
            path.unshift(ancestor);
            ancestor = ancestor.ancestorEventTarget;
            if (path.includes(ancestor)) {
              break;
            }
          }
        } else {
          var descendant = this;
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
    }, {
      key: 'dispatchImmediateEvent',
      value: function dispatchImmediateEvent(event) {
        get(EventTargetMixin.prototype.__proto__ || Object.getPrototypeOf(EventTargetMixin.prototype), 'dispatchEvent', this).call(this, event);
      }
    }, {
      key: 'dispatchEvent',
      value: function dispatchEvent(object) {
        var propagationPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        var event = object;
        if (!(event instanceof Event)) {
          event = new GenericEvent(object);
        }
        var modifier = modifyEvent(event);

        // Just dispatch the event if it doesn't capture nor bubble
        if (!event.captures && !event.bubbles) {
          this.dispatchImmediateEvent(event);
          return;
        }

        // Determine the propagation path of this event
        var path = void 0;
        if (Array.isArray(propagationPath)) {
          path = [].concat(toConsumableArray(propagationPath));
        } else {
          path = this.determinePropagationPath(event.target || this);
        }

        // The last item in the propagation path must always be the event target
        if (event.target === null) {
          modifier.target = path.pop();
        } else {
          path.pop();
        }

        // Capturing event phase
        if (event.captures) {
          modifier.eventPhase = 'capture';
          for (var i = 0; i < path.length; ++i) {
            path[i].dispatchImmediateEvent(event);
            if (event.propagationStopped) {
              return;
            }
          }
        }

        // Target event phase. The target can be an integer if the parent target has
        // multiple identifiers, typically when picking an instanced geometry.
        if (!Number.isInteger(event.target)) {
          modifier.eventPhase = 'target';
          event.target.dispatchImmediateEvent(event);
          if (event.propagationStopped) {
            return;
          }
        }

        // Bubbling event phase
        if (event.bubbles) {
          modifier.eventPhase = 'bubble';
          for (var _i = path.length - 1; _i >= 0; --_i) {
            path[_i].dispatchImmediateEvent(event);
            if (event.propagationStopped) {
              return;
            }
          }
        }
      }
    }, {
      key: 'ancestorEventTarget',
      get: function get$$1() {
        var scope = internal$6(this);
        return scope.ancestorEventTarget;
      },
      set: function set$$1(value) {
        var scope = internal$6(this);
        scope.ancestorEventTarget = value !== undefined ? value : null;
      }
    }, {
      key: 'descendantEventTarget',
      get: function get$$1() {
        var scope = internal$6(this);
        return scope.descendantEventTarget;
      },
      set: function set$$1(value) {
        var scope = internal$6(this);
        scope.descendantEventTarget = value !== undefined ? value : null;
      }
    }]);
    return EventTargetMixin;
  }(S);
});

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

var EventTarget = function (_mix$with) {
  inherits(EventTarget, _mix$with);

  function EventTarget() {
    classCallCheck(this, EventTarget);
    return possibleConstructorReturn(this, (EventTarget.__proto__ || Object.getPrototypeOf(EventTarget)).apply(this, arguments));
  }

  return EventTarget;
}(mix(function () {
  function _class() {
    classCallCheck(this, _class);
  }

  return _class;
}()).with(EventDispatcherMixin, EventTargetMixin));

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

var KeyboardEvent = function (_EventBundle) {
  inherits(KeyboardEvent, _EventBundle);

  function KeyboardEvent() {
    classCallCheck(this, KeyboardEvent);
    return possibleConstructorReturn(this, (KeyboardEvent.__proto__ || Object.getPrototypeOf(KeyboardEvent)).apply(this, arguments));
  }

  createClass(KeyboardEvent, [{
    key: 'key',
    get: function get$$1() {
      return this.originalEvent.key;
    }
  }, {
    key: 'code',
    get: function get$$1() {
      return this.originalEvent.code;
    }
  }, {
    key: 'ctrlKey',
    get: function get$$1() {
      return this.originalEvent.ctrlKey;
    }
  }, {
    key: 'shiftKey',
    get: function get$$1() {
      return this.originalEvent.shiftKey;
    }
  }, {
    key: 'altKey',
    get: function get$$1() {
      return this.originalEvent.altKey;
    }
  }, {
    key: 'metaKey',
    get: function get$$1() {
      return this.originalEvent.metaKey;
    }
  }, {
    key: 'repeat',
    get: function get$$1() {
      return this.originalEvent.repeat;
    }
  }, {
    key: 'location',
    get: function get$$1() {
      return this.originalEvent.location;
    }
  }]);
  return KeyboardEvent;
}(EventBundle);

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

var internal$7 = Namespace('MouseEvent');

var MouseEvent = function (_EventBundle) {
  inherits(MouseEvent, _EventBundle);

  function MouseEvent() {
    classCallCheck(this, MouseEvent);
    return possibleConstructorReturn(this, (MouseEvent.__proto__ || Object.getPrototypeOf(MouseEvent)).apply(this, arguments));
  }

  createClass(MouseEvent, [{
    key: 'init',
    value: function init() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var x = _ref.x,
          y = _ref.y,
          movementX = _ref.movementX,
          movementY = _ref.movementY,
          rest = objectWithoutProperties(_ref, ['x', 'y', 'movementX', 'movementY']);

      get(MouseEvent.prototype.__proto__ || Object.getPrototypeOf(MouseEvent.prototype), 'init', this).call(this, _extends({}, rest));
      var scope = internal$7(this);
      scope.x = x || 0;
      scope.y = y || 0;
      scope.movementX = movementX || 0;
      scope.movementY = movementY || 0;
      return this;
    }
  }, {
    key: 'x',
    get: function get$$1() {
      var scope = internal$7(this);
      return scope.x;
    }
  }, {
    key: 'y',
    get: function get$$1() {
      var scope = internal$7(this);
      return scope.y;
    }
  }, {
    key: 'movementX',
    get: function get$$1() {
      var scope = internal$7(this);
      return scope.movementX;
    }
  }, {
    key: 'movementY',
    get: function get$$1() {
      var scope = internal$7(this);
      return scope.movementY;
    }
  }, {
    key: 'button',
    get: function get$$1() {
      return this.originalEvent.button;
    }
  }, {
    key: 'ctrlKey',
    get: function get$$1() {
      return this.originalEvent.ctrlKey;
    }
  }, {
    key: 'shiftKey',
    get: function get$$1() {
      return this.originalEvent.shiftKey;
    }
  }, {
    key: 'altKey',
    get: function get$$1() {
      return this.originalEvent.altKey;
    }
  }, {
    key: 'metaKey',
    get: function get$$1() {
      return this.originalEvent.metaKey;
    }
  }]);
  return MouseEvent;
}(EventBundle);

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

var internal$8 = Namespace('Touch');

var Touch = function () {
  function Touch() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, Touch);

    this.init(options);
  }

  createClass(Touch, [{
    key: 'init',
    value: function init() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          x = _ref.x,
          y = _ref.y,
          target = _ref.target,
          originalTouch = _ref.originalTouch;

      var scope = internal$8(this);
      scope.x = x || 0;
      scope.y = y || 0;
      scope.target = target !== undefined ? target : null;
      scope.originalTouch = originalTouch !== undefined ? originalTouch : null;
      return this;
    }
  }, {
    key: 'x',
    get: function get$$1() {
      var scope = internal$8(this);
      return scope.x;
    }
  }, {
    key: 'y',
    get: function get$$1() {
      var scope = internal$8(this);
      return scope.y;
    }
  }, {
    key: 'target',
    get: function get$$1() {
      var scope = internal$8(this);
      return scope.target;
    }
  }, {
    key: 'originalTouch',
    get: function get$$1() {
      var scope = internal$8(this);
      return scope.originalTouch;
    }
  }, {
    key: 'identifier',
    get: function get$$1() {
      return this.originalTouch.identifier;
    }
  }]);
  return Touch;
}();

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

var internal$10 = Namespace('TouchList');

var TouchList = function () {
  function TouchList() {
    classCallCheck(this, TouchList);

    var scope = internal$10(this);
    scope.array = [];
    this.init.apply(this, arguments);
  }

  createClass(TouchList, [{
    key: 'init',
    value: function init(first) {
      var scope = internal$10(this);
      scope.array.length = 0;
      if (Array.isArray(first)) {
        var _scope$array;

        (_scope$array = scope.array).push.apply(_scope$array, toConsumableArray(first));
      } else if (first) {
        var _scope$array2;

        for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          rest[_key - 1] = arguments[_key];
        }

        (_scope$array2 = scope.array).push.apply(_scope$array2, [first].concat(rest));
      }
    }
  }, {
    key: 'item',
    value: function item(index) {
      var scope = internal$10(this);
      return scope.array[index];
    }
  }, {
    key: 'length',
    get: function get$$1() {
      var scope = internal$10(this);
      return scope.array.length;
    }
  }]);
  return TouchList;
}();

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

var emptyTouchList = new TouchList();

var internal$9 = Namespace('TouchEvent');

var TouchEvent = function (_EventBundle) {
  inherits(TouchEvent, _EventBundle);

  function TouchEvent() {
    classCallCheck(this, TouchEvent);
    return possibleConstructorReturn(this, (TouchEvent.__proto__ || Object.getPrototypeOf(TouchEvent)).apply(this, arguments));
  }

  createClass(TouchEvent, [{
    key: 'init',
    value: function init() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var touches = _ref.touches,
          changedTouches = _ref.changedTouches,
          rest = objectWithoutProperties(_ref, ['touches', 'changedTouches']);

      get(TouchEvent.prototype.__proto__ || Object.getPrototypeOf(TouchEvent.prototype), 'init', this).call(this, _extends({}, rest));
      var scope = internal$9(this);
      scope.touches = touches || emptyTouchList;
      scope.changedTouches = changedTouches || emptyTouchList;
      return this;
    }
  }, {
    key: 'touches',
    get: function get$$1() {
      var scope = internal$9(this);
      return scope.touches;
    }
  }, {
    key: 'changedTouches',
    get: function get$$1() {
      var scope = internal$9(this);
      return scope.changedTouches;
    }
  }, {
    key: 'ctrlKey',
    get: function get$$1() {
      return this.originalEvent.ctrlKey;
    }
  }, {
    key: 'shiftKey',
    get: function get$$1() {
      return this.originalEvent.shiftKey;
    }
  }, {
    key: 'altKey',
    get: function get$$1() {
      return this.originalEvent.altKey;
    }
  }, {
    key: 'metaKey',
    get: function get$$1() {
      return this.originalEvent.metaKey;
    }
  }]);
  return TouchEvent;
}(EventBundle);

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

var WheelEvent = function (_MouseEvent) {
  inherits(WheelEvent, _MouseEvent);

  function WheelEvent() {
    classCallCheck(this, WheelEvent);
    return possibleConstructorReturn(this, (WheelEvent.__proto__ || Object.getPrototypeOf(WheelEvent)).apply(this, arguments));
  }

  createClass(WheelEvent, [{
    key: 'deltaX',
    get: function get$$1() {
      return this.originalEvent.deltaX;
    }
  }, {
    key: 'deltaY',
    get: function get$$1() {
      return this.originalEvent.deltaY;
    }
  }, {
    key: 'deltaZ',
    get: function get$$1() {
      return this.originalEvent.deltaZ;
    }
  }]);
  return WheelEvent;
}(MouseEvent);

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

exports.Binder = Binder;
exports.Binding = Binding;
exports.CustomEvent = CustomEvent;
exports.Event = Event;
exports.modifyEvent = modifyEvent;
exports.EventBundle = EventBundle;
exports.EventDispatcher = EventDispatcher;
exports.EventDispatcherMixin = EventDispatcherMixin;
exports.EventTarget = EventTarget;
exports.EventTargetMixin = EventTargetMixin;
exports.GenericEvent = GenericEvent;
exports.KeyboardEvent = KeyboardEvent;
exports.MouseEvent = MouseEvent;
exports.StateEvent = StateEvent;
exports.Touch = Touch;
exports.TouchEvent = TouchEvent;
exports.TouchList = TouchList;
exports.WheelEvent = WheelEvent;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=planck-event.js.map
