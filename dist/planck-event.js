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
      object[symbol] = init({});
    }
    return object[symbol];
  };
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











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
          bubbles = _ref$bubbles === undefined ? true : _ref$bubbles;

      var scope = internal$2(this);
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
    key: 'phase',
    get: function get$$1() {
      var scope = internal$2(this);
      return scope.phase;
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
    key: 'timestamp',
    get: function get$$1() {
      var scope = internal$2(this);
      return scope.timestamp;
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
  }]);
  return Event;
}();

function modifyEvent(event) {
  var scope = internal$2(event);
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
      modifyEvent(this).target = target || null;
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
      return 'state:' + (name === null || name === undefined ? '' : name);
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
    scope.targets.forEach(function (target) {
      // eslint-disable-next-line no-param-reassign
      target.object[target.name] = value;
    });
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
      targets.forEach(function (target) {
        // eslint-disable-next-line no-param-reassign
        target.object[target.name] = transform(source[name]);
      });
    }
  }

  createClass(Binder, [{
    key: 'matches',
    value: function matches(targets) {
      var scope = internal(this);
      if (!Array.isArray(targets) || targets.length === 0) {
        return false;
      }
      return targets.every(function (other) {
        return scope.targets.some(function (target) {
          return isTargetSame(target, other);
        });
      });
    }
  }, {
    key: 'unbind',
    value: function unbind(targets) {
      if (!targets) {
        return this.unbindAll();
      }
      var scope = internal(this);
      var unboundTargets = targets.reduce(function (result, target) {
        var index = scope.targets.findIndex(function (other) {
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
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  // Flatten arguments
  var flatArgs = args.reduce(function (targets, value) {
    return targets.concat(value);
  }, []);

  // Convert the array from [object, name, ...] to [{ object, name }, ...]
  var object = void 0;
  var targets = flatArgs.reduce(function (targets, value, index) {
    if (index % 2 === 0) {
      object = value;
    } else {
      targets.push({ object: object, name: value });
    }
    return targets;
  }, []);

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
  var binders = scope.bindings[name];
  binders.forEach(function (binder) {
    binder.unbind(targets);
  });
  binders = binders.filter(function (binder) {
    return !binder.empty;
  });
  binders.push(new Binder(source, name, targets, options));
  scope.bindings[name] = binders;
}

function _unbind(source, name, targets) {
  var scope = internal$3(source);
  if (scope.bindings === undefined) {
    return [];
  }
  if (scope.bindings[name] === undefined) {
    return [];
  }
  var binders = scope.bindings[name];
  var unboundTargets = binders.reduce(function (result, binder) {
    return result.concat(binder.unbind(targets));
  }, []);
  binders = binders.filter(function (binder) {
    return !binder.empty;
  });
  scope.bindings[name] = binders;
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
  var unboundTargets = binders.reduce(function (result, binder) {
    return result.concat(binder.unbindAll());
  }, []);
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
        targets.forEach(function (target) {
          _bind(target.object, target.name, [{ object: source, name: name }], {
            assigns: false,
            transform: options.inverseTransform
          });
        });
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
        unboundTargets.forEach(function (target) {
          _unbind(target.object, target.name, [{ object: source, name: name }]);
        });
      }
    }
  }, {
    key: 'unbindAll',
    value: function unbindAll(source, name) {
      _unbindAll(source, name).forEach(function (target) {
        _unbindAll(target.object, target.name, [{ object: source, name: name }]);
      });
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
      var scope = internal$4(this);
      if (scope.originalEvent !== null) {
        scope.originalEvent.preventDefault();
      }
    }
  }, {
    key: 'defaultPrevented',
    get: function get$$1() {
      var scope = internal$4(this);
      if (scope.originalEvent === null) {
        return false;
      }
      return scope.originalEvent.defaultPrevented;
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
      var _this2 = this;

      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var type = _ref.type,
          target = _ref.target,
          _ref$captures = _ref.captures,
          captures = _ref$captures === undefined ? false : _ref$captures,
          _ref$bubbles = _ref.bubbles,
          bubbles = _ref$bubbles === undefined ? false : _ref$bubbles,
          rest = objectWithoutProperties(_ref, ['type', 'target', 'captures', 'bubbles']);

      get(GenericEvent.prototype.__proto__ || Object.getPrototypeOf(GenericEvent.prototype), 'init', this).call(this, { type: type, target: target, captures: captures, bubbles: bubbles });
      Object.entries(rest).forEach(function (entry) {
        var _entry = slicedToArray(entry, 2),
            property = _entry[0],
            value = _entry[1];

        if (!{}.hasOwnProperty.call(_this2, property)) {
          _this2[property] = value;
        } else {
          throw new Error('Name "' + property + '" cannot be used for event property');
        }
      });
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

var internal$5 = Namespace('EventDispatcher');

function handleEvent(event, listener) {
  if (typeof listener === 'function') {
    listener(event);
  } else if (typeof listener.handleEvent === 'function') {
    listener.handleEvent(event);
  } else {
    throw new Error('Listener is neither function nor event listener');
  }
}

var EventDispatcher = function () {
  function EventDispatcher() {
    classCallCheck(this, EventDispatcher);

    var scope = internal$5(this);
    scope.listeners = {};
  }

  createClass(EventDispatcher, [{
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
      for (var _len = arguments.length, rest = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        rest[_key - 2] = arguments[_key];
      }

      var _this = this;

      var delegate = function delegate(event) {
        handleEvent(event, listener);
        _this.removeEventListener.apply(_this, [type, delegate].concat(rest));
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
      if (!event.target) {
        modifier.target = this;
      }
      // Current target should be always this
      modifier.currentTarget = this;

      var scope = internal$5(this);
      var listeners = scope.listeners[event.type];
      if (listeners === undefined) {
        return;
      }
      var phase = event.phase;
      if (!phase || phase === 'target' || phase === 'capture') {
        [].concat(toConsumableArray(listeners.capture)).some(function (listener) {
          handleEvent(event, listener);
          return event.immediatePropagationStopped;
        });
      }
      if (event.immediatePropagationStopped) {
        return;
      }
      if (!phase || phase === 'target' || phase === 'bubble') {
        [].concat(toConsumableArray(listeners.bubble)).some(function (listener) {
          handleEvent(event, listener);
          return event.immediatePropagationStopped;
        });
      }
    }
  }]);
  return EventDispatcher;
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

var internal$6 = Namespace('EventTarget');

var EventTarget = function (_EventDispatcher) {
  inherits(EventTarget, _EventDispatcher);

  function EventTarget() {
    classCallCheck(this, EventTarget);

    var _this = possibleConstructorReturn(this, (EventTarget.__proto__ || Object.getPrototypeOf(EventTarget)).call(this));

    var scope = internal$6(_this);
    scope.ancestorEventTarget = null;
    scope.descendantEventTarget = null;
    return _this;
  }

  createClass(EventTarget, [{
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
      get(EventTarget.prototype.__proto__ || Object.getPrototypeOf(EventTarget.prototype), 'dispatchEvent', this).call(this, event);
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

      // Determine the capturing path of this event
      var capturingPath = void 0;
      if (Array.isArray(propagationPath)) {
        capturingPath = [].concat(toConsumableArray(propagationPath));
      } else {
        capturingPath = this.determinePropagationPath(event.target || this);
      }

      // The last item in the propagation path must always be the event target
      if (event.target === null) {
        modifier.target = capturingPath.pop();
      } else {
        capturingPath.pop();
      }
      var bubblingPath = [].concat(toConsumableArray(capturingPath));
      bubblingPath.reverse();

      // Capturing phase
      if (event.captures) {
        modifier.phase = 'capture';
        capturingPath.some(function (object) {
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
        bubblingPath.some(function (object) {
          object.dispatchImmediateEvent(event);
          return event.propagationStopped;
        });
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
      scope.ancestorEventTarget = value || null;
    }
  }, {
    key: 'descendantEventTarget',
    get: function get$$1() {
      var scope = internal$6(this);
      return scope.descendantEventTarget;
    },
    set: function set$$1(value) {
      var scope = internal$6(this);
      scope.descendantEventTarget = value || null;
    }
  }]);
  return EventTarget;
}(EventDispatcher);

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
      scope.target = target || null;
      scope.originalTouch = originalTouch || null;
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
      scope.touches = touches;
      scope.changedTouches = changedTouches;
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
exports.EventTarget = EventTarget;
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
