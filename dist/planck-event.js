(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.Planck = {})));
}(this, (function (exports) { 'use strict';

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

var internal$1 = Namespace('AggregateFunction');

var AggregateFunction = function () {
  // This constructor provides for inheritance only
  function AggregateFunction(namespace) {
    classCallCheck(this, AggregateFunction);

    if (namespace !== internal$1) {
      throw new Error();
    }
    var scope = internal$1(this);

    for (var _len = arguments.length, targets = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      targets[_key - 1] = arguments[_key];
    }

    scope.targets = targets;
  }

  createClass(AggregateFunction, [{
    key: 'apply',
    value: function apply(target, bound, args) {
      var scope = internal$1(this);
      return scope.targets.map(function (target) {
        return Reflect.apply(target, bound, args);
      });
    }
  }, {
    key: 'getPrototypeOf',
    value: function getPrototypeOf(target) {
      return this.constructor.prototype;
    }
  }], [{
    key: 'new',
    value: function _new() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var instance = new (Function.prototype.bind.apply(this, [null].concat([internal$1], args)))();
      return new Proxy(function () {}, instance);
    }
  }]);
  return AggregateFunction;
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

var internal$1$1 = Namespace('Aggregate');

var Aggregate = function () {
  // This constructor provides for inheritance only
  function Aggregate(namespace) {
    classCallCheck(this, Aggregate);

    if (namespace !== internal$1$1) {
      throw new Error();
    }
    var scope = internal$1$1(this);

    for (var _len3 = arguments.length, targets = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      targets[_key3 - 1] = arguments[_key3];
    }

    scope.targets = targets;
  }

  createClass(Aggregate, [{
    key: 'set',
    value: function set(target, property, value, receiver) {
      var scope = internal$1$1(this);
      scope.targets.forEach(function (target) {
        Reflect.set(target, property, value);
      });
      return Reflect.set(target, property, value, receiver);
    }
  }, {
    key: 'get',
    value: function get$$1(target, property, receiver) {
      var scope = internal$1$1(this);
      var aggregative = scope.targets.every(function (target) {
        return typeof Reflect.get(target, property) === 'function';
      });
      if (aggregative) {
        return AggregateFunction.new.apply(AggregateFunction, toConsumableArray(scope.targets.map(function (target) {
          return Reflect.get(target, property).bind(target);
        })));
      }
      return Reflect.get(scope.targets[0], property, receiver);
    }
  }, {
    key: 'getPrototypeOf',
    value: function getPrototypeOf(target) {
      return this.constructor.prototype;
    }
  }], [{
    key: 'new',
    value: function _new() {
      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      var instance = new (Function.prototype.bind.apply(this, [null].concat([internal$1$1], args)))();
      return new Proxy({}, instance);
    }
  }]);
  return Aggregate;
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

function AssertionError(message) {
  this.message = message;
}

Object.setPrototypeOf(AssertionError, Error);
AssertionError.prototype = Object.create(Error.prototype);
AssertionError.prototype.name = 'AssertionError';
AssertionError.prototype.message = '';
AssertionError.prototype.constructor = AssertionError;

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


var Environment = function () {
  function Environment() {
    classCallCheck(this, Environment);
  }

  createClass(Environment, null, [{
    key: 'type',
    get: function get$$1() {
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
      throw new Error();
    }
  }, {
    key: 'self',
    get: function get$$1() {
      switch (this.type) {
        case 'browser':
          return window;
        case 'worker':
          return self;
        case 'node':
          return global;
        default:
          break;
      }
      throw new Error();
    }
  }]);
  return Environment;
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

var internal$3 = Namespace('FilePath');

var FilePath = function () {
  function FilePath() {
    classCallCheck(this, FilePath);
  }

  createClass(FilePath, null, [{
    key: 'self',
    get: function get$$1() {
      var scope = internal$3(this);
      return scope.self;
    }
  }, {
    key: 'current',
    get: function get$$1() {
      switch (Environment.type) {
        case 'browser':
          return window.location.href;
        case 'worker':
          return self.location.href;
        case 'node':
          return process.cwd();
        default:
          break;
      }
      throw new Error();
    }
  }]);
  return FilePath;
}();

internal$3(FilePath).self = FilePath.current;

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
  return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var crypt = createCommonjsModule(function (module) {
  (function () {
    var base64map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
        crypt = {
      // Bit-wise rotation left
      rotl: function rotl(n, b) {
        return n << b | n >>> 32 - b;
      },

      // Bit-wise rotation right
      rotr: function rotr(n, b) {
        return n << 32 - b | n >>> b;
      },

      // Swap big-endian to little-endian and vice versa
      endian: function endian(n) {
        // If number given, swap endian
        if (n.constructor == Number) {
          return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
        }

        // Else, assume array and swap all items
        for (var i = 0; i < n.length; i++) {
          n[i] = crypt.endian(n[i]);
        }return n;
      },

      // Generate an array of any length of random bytes
      randomBytes: function randomBytes(n) {
        for (var bytes = []; n > 0; n--) {
          bytes.push(Math.floor(Math.random() * 256));
        }return bytes;
      },

      // Convert a byte array to big-endian 32-bit words
      bytesToWords: function bytesToWords(bytes) {
        for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8) {
          words[b >>> 5] |= bytes[i] << 24 - b % 32;
        }return words;
      },

      // Convert big-endian 32-bit words to a byte array
      wordsToBytes: function wordsToBytes(words) {
        for (var bytes = [], b = 0; b < words.length * 32; b += 8) {
          bytes.push(words[b >>> 5] >>> 24 - b % 32 & 0xFF);
        }return bytes;
      },

      // Convert a byte array to a hex string
      bytesToHex: function bytesToHex(bytes) {
        for (var hex = [], i = 0; i < bytes.length; i++) {
          hex.push((bytes[i] >>> 4).toString(16));
          hex.push((bytes[i] & 0xF).toString(16));
        }
        return hex.join('');
      },

      // Convert a hex string to a byte array
      hexToBytes: function hexToBytes(hex) {
        for (var bytes = [], c = 0; c < hex.length; c += 2) {
          bytes.push(parseInt(hex.substr(c, 2), 16));
        }return bytes;
      },

      // Convert a byte array to a base-64 string
      bytesToBase64: function bytesToBase64(bytes) {
        for (var base64 = [], i = 0; i < bytes.length; i += 3) {
          var triplet = bytes[i] << 16 | bytes[i + 1] << 8 | bytes[i + 2];
          for (var j = 0; j < 4; j++) {
            if (i * 8 + j * 6 <= bytes.length * 8) base64.push(base64map.charAt(triplet >>> 6 * (3 - j) & 0x3F));else base64.push('=');
          }
        }
        return base64.join('');
      },

      // Convert a base-64 string to a byte array
      base64ToBytes: function base64ToBytes(base64) {
        // Remove non-base-64 characters
        base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

        for (var bytes = [], i = 0, imod4 = 0; i < base64.length; imod4 = ++i % 4) {
          if (imod4 == 0) continue;
          bytes.push((base64map.indexOf(base64.charAt(i - 1)) & Math.pow(2, -2 * imod4 + 8) - 1) << imod4 * 2 | base64map.indexOf(base64.charAt(i)) >>> 6 - imod4 * 2);
        }
        return bytes;
      }
    };

    module.exports = crypt;
  })();
});

var charenc = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function stringToBytes(str) {
      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
    },

    // Convert a byte array to a string
    bytesToString: function bytesToString(bytes) {
      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
    }
  },

  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function stringToBytes(str) {
      for (var bytes = [], i = 0; i < str.length; i++) {
        bytes.push(str.charCodeAt(i) & 0xFF);
      }return bytes;
    },

    // Convert a byte array to a string
    bytesToString: function bytesToString(bytes) {
      for (var str = [], i = 0; i < bytes.length; i++) {
        str.push(String.fromCharCode(bytes[i]));
      }return str.join('');
    }
  }
};

var charenc_1 = charenc;

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
var index = function index(obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer);
};

function isBuffer(obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj);
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer(obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0));
}

var md5 = createCommonjsModule(function (module) {
  (function () {
    var crypt$$1 = crypt,
        utf8 = charenc_1.utf8,
        isBuffer = index,
        bin = charenc_1.bin,


    // The core
    md5 = function md5(message, options) {
      // Convert to byte array
      if (message.constructor == String) {
        if (options && options.encoding === 'binary') message = bin.stringToBytes(message);else message = utf8.stringToBytes(message);
      } else if (isBuffer(message)) message = Array.prototype.slice.call(message, 0);else if (!Array.isArray(message)) message = message.toString();
      // else, assume byte array already

      var m = crypt$$1.bytesToWords(message),
          l = message.length * 8,
          a = 1732584193,
          b = -271733879,
          c = -1732584194,
          d = 271733878;

      // Swap endian
      for (var i = 0; i < m.length; i++) {
        m[i] = (m[i] << 8 | m[i] >>> 24) & 0x00FF00FF | (m[i] << 24 | m[i] >>> 8) & 0xFF00FF00;
      }

      // Padding
      m[l >>> 5] |= 0x80 << l % 32;
      m[(l + 64 >>> 9 << 4) + 14] = l;

      // Method shortcuts
      var FF = md5._ff,
          GG = md5._gg,
          HH = md5._hh,
          II = md5._ii;

      for (var i = 0; i < m.length; i += 16) {

        var aa = a,
            bb = b,
            cc = c,
            dd = d;

        a = FF(a, b, c, d, m[i + 0], 7, -680876936);
        d = FF(d, a, b, c, m[i + 1], 12, -389564586);
        c = FF(c, d, a, b, m[i + 2], 17, 606105819);
        b = FF(b, c, d, a, m[i + 3], 22, -1044525330);
        a = FF(a, b, c, d, m[i + 4], 7, -176418897);
        d = FF(d, a, b, c, m[i + 5], 12, 1200080426);
        c = FF(c, d, a, b, m[i + 6], 17, -1473231341);
        b = FF(b, c, d, a, m[i + 7], 22, -45705983);
        a = FF(a, b, c, d, m[i + 8], 7, 1770035416);
        d = FF(d, a, b, c, m[i + 9], 12, -1958414417);
        c = FF(c, d, a, b, m[i + 10], 17, -42063);
        b = FF(b, c, d, a, m[i + 11], 22, -1990404162);
        a = FF(a, b, c, d, m[i + 12], 7, 1804603682);
        d = FF(d, a, b, c, m[i + 13], 12, -40341101);
        c = FF(c, d, a, b, m[i + 14], 17, -1502002290);
        b = FF(b, c, d, a, m[i + 15], 22, 1236535329);

        a = GG(a, b, c, d, m[i + 1], 5, -165796510);
        d = GG(d, a, b, c, m[i + 6], 9, -1069501632);
        c = GG(c, d, a, b, m[i + 11], 14, 643717713);
        b = GG(b, c, d, a, m[i + 0], 20, -373897302);
        a = GG(a, b, c, d, m[i + 5], 5, -701558691);
        d = GG(d, a, b, c, m[i + 10], 9, 38016083);
        c = GG(c, d, a, b, m[i + 15], 14, -660478335);
        b = GG(b, c, d, a, m[i + 4], 20, -405537848);
        a = GG(a, b, c, d, m[i + 9], 5, 568446438);
        d = GG(d, a, b, c, m[i + 14], 9, -1019803690);
        c = GG(c, d, a, b, m[i + 3], 14, -187363961);
        b = GG(b, c, d, a, m[i + 8], 20, 1163531501);
        a = GG(a, b, c, d, m[i + 13], 5, -1444681467);
        d = GG(d, a, b, c, m[i + 2], 9, -51403784);
        c = GG(c, d, a, b, m[i + 7], 14, 1735328473);
        b = GG(b, c, d, a, m[i + 12], 20, -1926607734);

        a = HH(a, b, c, d, m[i + 5], 4, -378558);
        d = HH(d, a, b, c, m[i + 8], 11, -2022574463);
        c = HH(c, d, a, b, m[i + 11], 16, 1839030562);
        b = HH(b, c, d, a, m[i + 14], 23, -35309556);
        a = HH(a, b, c, d, m[i + 1], 4, -1530992060);
        d = HH(d, a, b, c, m[i + 4], 11, 1272893353);
        c = HH(c, d, a, b, m[i + 7], 16, -155497632);
        b = HH(b, c, d, a, m[i + 10], 23, -1094730640);
        a = HH(a, b, c, d, m[i + 13], 4, 681279174);
        d = HH(d, a, b, c, m[i + 0], 11, -358537222);
        c = HH(c, d, a, b, m[i + 3], 16, -722521979);
        b = HH(b, c, d, a, m[i + 6], 23, 76029189);
        a = HH(a, b, c, d, m[i + 9], 4, -640364487);
        d = HH(d, a, b, c, m[i + 12], 11, -421815835);
        c = HH(c, d, a, b, m[i + 15], 16, 530742520);
        b = HH(b, c, d, a, m[i + 2], 23, -995338651);

        a = II(a, b, c, d, m[i + 0], 6, -198630844);
        d = II(d, a, b, c, m[i + 7], 10, 1126891415);
        c = II(c, d, a, b, m[i + 14], 15, -1416354905);
        b = II(b, c, d, a, m[i + 5], 21, -57434055);
        a = II(a, b, c, d, m[i + 12], 6, 1700485571);
        d = II(d, a, b, c, m[i + 3], 10, -1894986606);
        c = II(c, d, a, b, m[i + 10], 15, -1051523);
        b = II(b, c, d, a, m[i + 1], 21, -2054922799);
        a = II(a, b, c, d, m[i + 8], 6, 1873313359);
        d = II(d, a, b, c, m[i + 15], 10, -30611744);
        c = II(c, d, a, b, m[i + 6], 15, -1560198380);
        b = II(b, c, d, a, m[i + 13], 21, 1309151649);
        a = II(a, b, c, d, m[i + 4], 6, -145523070);
        d = II(d, a, b, c, m[i + 11], 10, -1120210379);
        c = II(c, d, a, b, m[i + 2], 15, 718787259);
        b = II(b, c, d, a, m[i + 9], 21, -343485551);

        a = a + aa >>> 0;
        b = b + bb >>> 0;
        c = c + cc >>> 0;
        d = d + dd >>> 0;
      }

      return crypt$$1.endian([a, b, c, d]);
    };

    // Auxiliary functions
    md5._ff = function (a, b, c, d, x, s, t) {
      var n = a + (b & c | ~b & d) + (x >>> 0) + t;
      return (n << s | n >>> 32 - s) + b;
    };
    md5._gg = function (a, b, c, d, x, s, t) {
      var n = a + (b & d | c & ~d) + (x >>> 0) + t;
      return (n << s | n >>> 32 - s) + b;
    };
    md5._hh = function (a, b, c, d, x, s, t) {
      var n = a + (b ^ c ^ d) + (x >>> 0) + t;
      return (n << s | n >>> 32 - s) + b;
    };
    md5._ii = function (a, b, c, d, x, s, t) {
      var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
      return (n << s | n >>> 32 - s) + b;
    };

    // Package private blocksize
    md5._blocksize = 16;
    md5._digestsize = 16;

    module.exports = function (message, options) {
      if (message === undefined || message === null) throw new Error('Illegal argument ' + message);

      var digestbytes = crypt$$1.wordsToBytes(md5(message, options));
      return options && options.asBytes ? digestbytes : options && options.asString ? bin.bytesToString(digestbytes) : crypt$$1.bytesToHex(digestbytes);
    };
  })();
});

var at;
var ch;
var escapee = {
  '"': '"',
  '\\': '\\',
  '/': '/',
  b: '\b',
  f: '\f',
  n: '\n',
  r: '\r',
  t: '\t'
};
var text;
var error$1 = function error$1(m) {
  // Call error when something is wrong.
  throw {
    name: 'SyntaxError',
    message: m,
    at: at,
    text: text
  };
};
var next = function next(c) {
  // If a c parameter is provided, verify that it matches the current character.
  if (c && c !== ch) {
    error$1("Expected '" + c + "' instead of '" + ch + "'");
  }

  // Get the next character. When there are no more characters,
  // return the empty string.

  ch = text.charAt(at);
  at += 1;
  return ch;
};
var number = function number() {
  // Parse a number value.
  var number,
      string = '';

  if (ch === '-') {
    string = '-';
    next('-');
  }
  while (ch >= '0' && ch <= '9') {
    string += ch;
    next();
  }
  if (ch === '.') {
    string += '.';
    while (next() && ch >= '0' && ch <= '9') {
      string += ch;
    }
  }
  if (ch === 'e' || ch === 'E') {
    string += ch;
    next();
    if (ch === '-' || ch === '+') {
      string += ch;
      next();
    }
    while (ch >= '0' && ch <= '9') {
      string += ch;
      next();
    }
  }
  number = +string;
  if (!isFinite(number)) {
    error$1("Bad number");
  } else {
    return number;
  }
};
var string = function string() {
  // Parse a string value.
  var hex,
      i,
      string = '',
      uffff;

  // When parsing for string values, we must look for " and \ characters.
  if (ch === '"') {
    while (next()) {
      if (ch === '"') {
        next();
        return string;
      } else if (ch === '\\') {
        next();
        if (ch === 'u') {
          uffff = 0;
          for (i = 0; i < 4; i += 1) {
            hex = parseInt(next(), 16);
            if (!isFinite(hex)) {
              break;
            }
            uffff = uffff * 16 + hex;
          }
          string += String.fromCharCode(uffff);
        } else if (typeof escapee[ch] === 'string') {
          string += escapee[ch];
        } else {
          break;
        }
      } else {
        string += ch;
      }
    }
  }
  error$1("Bad string");
};
var white = function white() {

  // Skip whitespace.

  while (ch && ch <= ' ') {
    next();
  }
};
var word = function word() {

  // true, false, or null.

  switch (ch) {
    case 't':
      next('t');
      next('r');
      next('u');
      next('e');
      return true;
    case 'f':
      next('f');
      next('a');
      next('l');
      next('s');
      next('e');
      return false;
    case 'n':
      next('n');
      next('u');
      next('l');
      next('l');
      return null;
  }
  error$1("Unexpected '" + ch + "'");
};
var value;
var array = function array() {

  // Parse an array value.

  var array = [];

  if (ch === '[') {
    next('[');
    white();
    if (ch === ']') {
      next(']');
      return array; // empty array
    }
    while (ch) {
      array.push(value());
      white();
      if (ch === ']') {
        next(']');
        return array;
      }
      next(',');
      white();
    }
  }
  error$1("Bad array");
};
var object = function object() {

  // Parse an object value.

  var key,
      object = {};

  if (ch === '{') {
    next('{');
    white();
    if (ch === '}') {
      next('}');
      return object; // empty object
    }
    while (ch) {
      key = string();
      white();
      next(':');
      if (Object.hasOwnProperty.call(object, key)) {
        error$1('Duplicate key "' + key + '"');
      }
      object[key] = value();
      white();
      if (ch === '}') {
        next('}');
        return object;
      }
      next(',');
      white();
    }
  }
  error$1("Bad object");
};

value = function value() {

  // Parse a JSON value. It could be an object, an array, a string, a number,
  // or a word.

  white();
  switch (ch) {
    case '{':
      return object();
    case '[':
      return array();
    case '"':
      return string();
    case '-':
      return number();
    default:
      return ch >= '0' && ch <= '9' ? number() : word();
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

function ImplementationError(message) {
  this.message = message;
}

Object.setPrototypeOf(ImplementationError, Error);
ImplementationError.prototype = Object.create(Error.prototype);
ImplementationError.prototype.name = 'ImplementationError';
ImplementationError.prototype.message = '';
ImplementationError.prototype.constructor = ImplementationError;

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

var internal$4 = Namespace('Multiton');

var Multiton = function () {
  function Multiton(key) {
    classCallCheck(this, Multiton);

    if (this.constructor.has(key)) {
      throw new Error('Attempt to create multiple instances for key "' + key + '"');
    }
  }

  createClass(Multiton, null, [{
    key: 'has',
    value: function has(key) {
      var scope = internal$4(this);
      if (scope.instances === undefined) {
        return false;
      }
      var coercedKey = this.coerceMultitonKey(key);
      return scope.instances[coercedKey] !== undefined;
    }
  }, {
    key: 'for',
    value: function _for(key) {
      var scope = internal$4(this);
      if (!scope.instances) {
        scope.instances = new Map();
      }
      var coercedKey = this.coerceMultitonKey(key);
      if (scope.instances.has(coercedKey)) {
        return scope.instances.get(coercedKey);
      }

      for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        args[_key5 - 1] = arguments[_key5];
      }

      var instance = this.new.apply(this, [coercedKey].concat(args));
      scope.instances.set(coercedKey, instance);
      return instance;
    }
  }, {
    key: 'new',
    value: function _new() {
      for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      return new (Function.prototype.bind.apply(this, [null].concat(args)))();
    }
  }, {
    key: 'coerceMultitonKey',
    value: function coerceMultitonKey(key) {
      return key;
    }
  }]);
  return Multiton;
}();

/**
 * Check if we're required to add a port number.
 *
 * @see https://url.spec.whatwg.org/#default-port
 * @param {Number|String} port Port number we need to check
 * @param {String} protocol Protocol we need to check against.
 * @returns {Boolean} Is it a default port for the given protocol
 * @api private
 */

var index$6 = function required(port, protocol) {
  protocol = protocol.split(':')[0];
  port = +port;

  if (!port) return false;

  switch (protocol) {
    case 'http':
    case 'ws':
      return port !== 80;

    case 'https':
    case 'wss':
      return port !== 443;

    case 'ftp':
      return port !== 21;

    case 'gopher':
      return port !== 70;

    case 'file':
      return false;
  }

  return port !== 0;
};

var has = Object.prototype.hasOwnProperty;

/**
 * Decode a URI encoded string.
 *
 * @param {String} input The URI encoded string.
 * @returns {String} The decoded string.
 * @api private
 */
function decode(input) {
  return decodeURIComponent(input.replace(/\+/g, ' '));
}

/**
 * Simple query string parser.
 *
 * @param {String} query The query string that needs to be parsed.
 * @returns {Object}
 * @api public
 */
function querystring(query) {
  var parser = /([^=?&]+)=?([^&]*)/g,
      result = {},
      part;

  //
  // Little nifty parsing hack, leverage the fact that RegExp.exec increments
  // the lastIndex property so we can continue executing this loop until we've
  // parsed all results.
  //
  for (; part = parser.exec(query); result[decode(part[1])] = decode(part[2])) {}

  return result;
}

/**
 * Transform a query string to an object.
 *
 * @param {Object} obj Object that should be transformed.
 * @param {String} prefix Optional prefix.
 * @returns {String}
 * @api public
 */
function querystringify(obj, prefix) {
  prefix = prefix || '';

  var pairs = [];

  //
  // Optionally prefix with a '?' if needed
  //
  if ('string' !== typeof prefix) prefix = '?';

  for (var key in obj) {
    if (has.call(obj, key)) {
      pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
  }

  return pairs.length ? prefix + pairs.join('&') : '';
}

//
// Expose the module.
//
var stringify$4 = querystringify;
var parse$3 = querystring;

var index$8 = {
  stringify: stringify$4,
  parse: parse$3
};

var protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i;
var slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;

/**
 * These are the parse rules for the URL parser, it informs the parser
 * about:
 *
 * 0. The char it Needs to parse, if it's a string it should be done using
 *    indexOf, RegExp using exec and NaN means set as current value.
 * 1. The property we should set when parsing this value.
 * 2. Indication if it's backwards or forward parsing, when set as number it's
 *    the value of extra chars that should be split off.
 * 3. Inherit from location if non existing in the parser.
 * 4. `toLowerCase` the resulting value.
 */
var rules = [['#', 'hash'], // Extract from the back.
['?', 'query'], // Extract from the back.
['/', 'pathname'], // Extract from the back.
['@', 'auth', 1], // Extract from the front.
[NaN, 'host', undefined, 1, 1], // Set left over value.
[/:(\d+)$/, 'port', undefined, 1], // RegExp the back.
[NaN, 'hostname', undefined, 1, 1] // Set left over.
];

/**
 * These properties should not be copied or inherited from. This is only needed
 * for all non blob URL's as a blob URL does not include a hash, only the
 * origin.
 *
 * @type {Object}
 * @private
 */
var ignore = { hash: 1, query: 1 };

/**
 * The location object differs when your code is loaded through a normal page,
 * Worker or through a worker using a blob. And with the blobble begins the
 * trouble as the location object will contain the URL of the blob, not the
 * location of the page where our code is loaded in. The actual origin is
 * encoded in the `pathname` so we can thankfully generate a good "default"
 * location from it so we can generate proper relative URL's again.
 *
 * @param {Object|String} loc Optional default location object.
 * @returns {Object} lolcation object.
 * @api public
 */
function lolcation(loc) {
  loc = loc || commonjsGlobal.location || {};

  var finaldestination = {},
      type = typeof loc === 'undefined' ? 'undefined' : _typeof(loc),
      key;

  if ('blob:' === loc.protocol) {
    finaldestination = new URL$1(unescape(loc.pathname), {});
  } else if ('string' === type) {
    finaldestination = new URL$1(loc, {});
    for (key in ignore) {
      delete finaldestination[key];
    }
  } else if ('object' === type) {
    for (key in loc) {
      if (key in ignore) continue;
      finaldestination[key] = loc[key];
    }

    if (finaldestination.slashes === undefined) {
      finaldestination.slashes = slashes.test(loc.href);
    }
  }

  return finaldestination;
}

/**
 * @typedef ProtocolExtract
 * @type Object
 * @property {String} protocol Protocol matched in the URL, in lowercase.
 * @property {Boolean} slashes `true` if protocol is followed by "//", else `false`.
 * @property {String} rest Rest of the URL that is not part of the protocol.
 */

/**
 * Extract protocol information from a URL with/without double slash ("//").
 *
 * @param {String} address URL we want to extract from.
 * @return {ProtocolExtract} Extracted information.
 * @api private
 */
function extractProtocol(address) {
  var match = protocolre.exec(address);

  return {
    protocol: match[1] ? match[1].toLowerCase() : '',
    slashes: !!match[2],
    rest: match[3]
  };
}

/**
 * Resolve a relative URL pathname against a base URL pathname.
 *
 * @param {String} relative Pathname of the relative URL.
 * @param {String} base Pathname of the base URL.
 * @return {String} Resolved pathname.
 * @api private
 */
function resolve(relative, base) {
  var path = (base || '/').split('/').slice(0, -1).concat(relative.split('/')),
      i = path.length,
      last = path[i - 1],
      unshift = false,
      up = 0;

  while (i--) {
    if (path[i] === '.') {
      path.splice(i, 1);
    } else if (path[i] === '..') {
      path.splice(i, 1);
      up++;
    } else if (up) {
      if (i === 0) unshift = true;
      path.splice(i, 1);
      up--;
    }
  }

  if (unshift) path.unshift('');
  if (last === '.' || last === '..') path.push('');

  return path.join('/');
}

/**
 * The actual URL instance. Instead of returning an object we've opted-in to
 * create an actual constructor as it's much more memory efficient and
 * faster and it pleases my OCD.
 *
 * @constructor
 * @param {String} address URL we want to parse.
 * @param {Object|String} location Location defaults for relative paths.
 * @param {Boolean|Function} parser Parser for the query string.
 * @api public
 */
function URL$1(address, location, parser) {
  if (!(this instanceof URL$1)) {
    return new URL$1(address, location, parser);
  }

  var relative,
      extracted,
      parse,
      instruction,
      index,
      key,
      instructions = rules.slice(),
      type = typeof location === 'undefined' ? 'undefined' : _typeof(location),
      url = this,
      i = 0;

  //
  // The following if statements allows this module two have compatibility with
  // 2 different API:
  //
  // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
  //    where the boolean indicates that the query string should also be parsed.
  //
  // 2. The `URL` interface of the browser which accepts a URL, object as
  //    arguments. The supplied object will be used as default values / fall-back
  //    for relative paths.
  //
  if ('object' !== type && 'string' !== type) {
    parser = location;
    location = null;
  }

  if (parser && 'function' !== typeof parser) parser = index$8.parse;

  location = lolcation(location);

  //
  // Extract protocol information before running the instructions.
  //
  extracted = extractProtocol(address || '');
  relative = !extracted.protocol && !extracted.slashes;
  url.slashes = extracted.slashes || relative && location.slashes;
  url.protocol = extracted.protocol || location.protocol || '';
  address = extracted.rest;

  //
  // When the authority component is absent the URL starts with a path
  // component.
  //
  if (!extracted.slashes) instructions[2] = [/(.*)/, 'pathname'];

  for (; i < instructions.length; i++) {
    instruction = instructions[i];
    parse = instruction[0];
    key = instruction[1];

    if (parse !== parse) {
      url[key] = address;
    } else if ('string' === typeof parse) {
      if (~(index = address.indexOf(parse))) {
        if ('number' === typeof instruction[2]) {
          url[key] = address.slice(0, index);
          address = address.slice(index + instruction[2]);
        } else {
          url[key] = address.slice(index);
          address = address.slice(0, index);
        }
      }
    } else if (index = parse.exec(address)) {
      url[key] = index[1];
      address = address.slice(0, index.index);
    }

    url[key] = url[key] || (relative && instruction[3] ? location[key] || '' : '');

    //
    // Hostname, host and protocol should be lowercased so they can be used to
    // create a proper `origin`.
    //
    if (instruction[4]) url[key] = url[key].toLowerCase();
  }

  //
  // Also parse the supplied query string in to an object. If we're supplied
  // with a custom parser as function use that instead of the default build-in
  // parser.
  //
  if (parser) url.query = parser(url.query);

  //
  // If the URL is relative, resolve the pathname against the base URL.
  //
  if (relative && location.slashes && url.pathname.charAt(0) !== '/' && (url.pathname !== '' || location.pathname !== '')) {
    url.pathname = resolve(url.pathname, location.pathname);
  }

  //
  // We should not add port numbers if they are already the default port number
  // for a given protocol. As the host also contains the port number we're going
  // override it with the hostname which contains no port number.
  //
  if (!index$6(url.port, url.protocol)) {
    url.host = url.hostname;
    url.port = '';
  }

  //
  // Parse down the `auth` for the username and password.
  //
  url.username = url.password = '';
  if (url.auth) {
    instruction = url.auth.split(':');
    url.username = instruction[0] || '';
    url.password = instruction[1] || '';
  }

  url.origin = url.protocol && url.host && url.protocol !== 'file:' ? url.protocol + '//' + url.host : 'null';

  //
  // The href is just the compiled result.
  //
  url.href = url.toString();
}

/**
 * This is convenience method for changing properties in the URL instance to
 * insure that they all propagate correctly.
 *
 * @param {String} part          Property we need to adjust.
 * @param {Mixed} value          The newly assigned value.
 * @param {Boolean|Function} fn  When setting the query, it will be the function
 *                               used to parse the query.
 *                               When setting the protocol, double slash will be
 *                               removed from the final url if it is true.
 * @returns {URL}
 * @api public
 */
function set(part, value, fn) {
  var url = this;

  switch (part) {
    case 'query':
      if ('string' === typeof value && value.length) {
        value = (fn || index$8.parse)(value);
      }

      url[part] = value;
      break;

    case 'port':
      url[part] = value;

      if (!index$6(value, url.protocol)) {
        url.host = url.hostname;
        url[part] = '';
      } else if (value) {
        url.host = url.hostname + ':' + value;
      }

      break;

    case 'hostname':
      url[part] = value;

      if (url.port) value += ':' + url.port;
      url.host = value;
      break;

    case 'host':
      url[part] = value;

      if (/:\d+$/.test(value)) {
        value = value.split(':');
        url.port = value.pop();
        url.hostname = value.join(':');
      } else {
        url.hostname = value;
        url.port = '';
      }

      break;

    case 'protocol':
      url.protocol = value.toLowerCase();
      url.slashes = !fn;
      break;

    case 'pathname':
      url.pathname = value.length && value.charAt(0) !== '/' ? '/' + value : value;

      break;

    default:
      url[part] = value;
  }

  for (var i = 0; i < rules.length; i++) {
    var ins = rules[i];

    if (ins[4]) url[ins[1]] = url[ins[1]].toLowerCase();
  }

  url.origin = url.protocol && url.host && url.protocol !== 'file:' ? url.protocol + '//' + url.host : 'null';

  url.href = url.toString();

  return url;
}

/**
 * Transform the properties back in to a valid and full URL string.
 *
 * @param {Function} stringify Optional query stringify function.
 * @returns {String}
 * @api public
 */
function toString(stringify) {
  if (!stringify || 'function' !== typeof stringify) stringify = index$8.stringify;

  var query,
      url = this,
      protocol = url.protocol;

  if (protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';

  var result = protocol + (url.slashes ? '//' : '');

  if (url.username) {
    result += url.username;
    if (url.password) result += ':' + url.password;
    result += '@';
  }

  result += url.host + url.pathname;

  query = 'object' === _typeof(url.query) ? stringify(url.query) : url.query;
  if (query) result += '?' !== query.charAt(0) ? '?' + query : query;

  if (url.hash) result += url.hash;

  return result;
}

URL$1.prototype = { set: set, toString: toString };

//
// Expose the URL parser and some additional properties that might be useful for
// others or testing.
//
URL$1.extractProtocol = extractProtocol;
URL$1.location = lolcation;
URL$1.qs = index$8;

var index$5 = URL$1;

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

// Just use url-parse for now

var URL = function (_index$) {
  inherits(URL, _index$);

  function URL() {
    classCallCheck(this, URL);
    return possibleConstructorReturn(this, (URL.__proto__ || Object.getPrototypeOf(URL)).apply(this, arguments));
  }

  return URL;
}(index$5);

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

/* eslint-disable global-require */


var readFile = void 0;
var request = void 0;
if (Environment.type === 'node') {
  var _require = require('fs');

  readFile = _require.readFile;

  request = require('request');
}
/* eslint-enable global-require */

function browserRequest(url, options) {
  return new Promise(function (resolve, reject) {
    var parsed = new URL(url, true);
    if (options.query) {
      parsed.set('query', Object.assign({}, parsed.query, options.query));
    }
    var request = new XMLHttpRequest();
    request.open('get', parsed.toString(), true);
    if (options.headers) {
      Object.entries(options.headers).forEach(function (header) {
        request.setRequestHeader.apply(request, toConsumableArray(header));
      });
    }
    request.responseType = options.type;
    request.addEventListener('loadend', function (event) {
      if (request.status !== 200) {
        reject(request.status);
        return;
      }
      if (request.response === null && options.type === 'json') {
        reject(new Error('Could not parse JSON'));
        return;
      }
      resolve(request.response);
    }, false);
    request.send();
  });
}

function nodeRequest(url, options) {
  if (options.local) {
    return new Promise(function (resolve, reject) {
      readFile(url, options.encoding, function (error, response) {
        if (error) {
          reject(error);
          return;
        }
        resolve(response);
      });
    });
  }
  return new Promise(function (resolve, reject) {
    request({
      url: url,
      headers: options.headers || {},
      qs: options.query || {},
      encoding: options.encoding
    }, function (error, response) {
      if (error) {
        reject(error);
        return;
      }
      if (response.statusCode !== 200) {
        reject(response.statusCode);
      }
      resolve(response.body);
    });
  });
}

function performRequest(url, options) {
  if (Environment.type === 'node') {
    var promise = nodeRequest(url, options);
    if (options.type === 'json') {
      return promise.then(function (response) {
        if (typeof response !== 'string') {
          throw new Error('Response is unexpectedly not a string');
        }
        return JSON.parse(response);
      });
    }
    if (options.type === 'arraybuffer') {
      return promise.then(function (response) {
        if (!(response instanceof Buffer)) {
          throw new Error('Response is unexpectedly not a buffer');
        }
        var buffer = new ArrayBuffer(response.length);
        var view = new Uint8Array(buffer);
        for (var _i = 0; _i < response.length; ++_i) {
          view[_i] = response[_i];
        }
        return buffer;
      });
    }
    return promise;
  }
  return browserRequest(url, options);
}

function parseArguments() {
  for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
    args[_key7] = arguments[_key7];
  }

  var url = args[0],
      options = args[1];

  if (typeof url !== 'string') {
    options = url;
    url = options.url;
  }
  if (typeof url !== 'string') {
    throw new Error('The first argument or options.url must be a string');
  }
  options = Object.assign({}, {
    type: 'text',
    local: false,
    encoding: 'utf-8'
  }, options);
  return [url, options];
}

var Request = function () {
  function Request() {
    classCallCheck(this, Request);
  }

  createClass(Request, null, [{
    key: 'text',
    value: function text() {
      var _parseArguments = parseArguments.apply(undefined, arguments),
          _parseArguments2 = slicedToArray(_parseArguments, 2),
          url = _parseArguments2[0],
          options = _parseArguments2[1];

      options.type = 'text';
      return performRequest(url, options);
    }
  }, {
    key: 'json',
    value: function json() {
      var _parseArguments3 = parseArguments.apply(undefined, arguments),
          _parseArguments4 = slicedToArray(_parseArguments3, 2),
          url = _parseArguments4[0],
          options = _parseArguments4[1];

      options.type = 'json';
      return performRequest(url, options);
    }
  }, {
    key: 'buffer',
    value: function buffer() {
      var _parseArguments5 = parseArguments.apply(undefined, arguments),
          _parseArguments6 = slicedToArray(_parseArguments5, 2),
          url = _parseArguments6[0],
          options = _parseArguments6[1];

      options.type = 'arraybuffer';
      options.encoding = null;
      return performRequest(url, options);
    }
  }, {
    key: 'csv',
    value: function csv() {
      var _parseArguments7 = parseArguments.apply(undefined, arguments),
          _parseArguments8 = slicedToArray(_parseArguments7, 2),
          url = _parseArguments8[0],
          options = _parseArguments8[1];

      return this.text(url, options).then(function (response) {
        return Environment.self.d3.csvParse(response, options.row);
      });
    }
  }, {
    key: 'tsv',
    value: function tsv() {
      var _parseArguments9 = parseArguments.apply(undefined, arguments),
          _parseArguments10 = slicedToArray(_parseArguments9, 2),
          url = _parseArguments10[0],
          options = _parseArguments10[1];

      return this.text(url, options).then(function (response) {
        return Environment.self.d3.tsvParse(response, options.row);
      });
    }
  }]);
  return Request;
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

var internal$6 = Namespace('Semaphore');

var Task = function Task(semaphore, callback) {
  var _this2 = this;

  classCallCheck(this, Task);

  var promises = [new Promise(function (resolve, reject) {
    _this2.resolve = resolve;
    _this2.reject = reject;
  }), new Promise(function (resolve) {
    _this2.let = resolve;
  }).then(function () {
    callback(_this2.resolve, _this2.reject);
  })];
  this.promise = Promise.all(promises).then(function (values) {
    semaphore.signal();
    return values[0];
  }, function (reason) {
    semaphore.signal();
    return Promise.reject(reason);
  });
};

var Semaphore = function () {
  function Semaphore(capacity) {
    classCallCheck(this, Semaphore);

    var scope = internal$6(this);
    scope.capacity = capacity;
    scope.available = capacity;
    scope.queue = [];
  }

  createClass(Semaphore, [{
    key: 'wait',
    value: function wait(callback) {
      var scope = internal$6(this);
      var task = new Task(this, callback);
      if (scope.available === 0) {
        scope.queue.push(task);
      } else {
        --scope.available;
        task.let();
      }
      return task.promise;
    }
  }, {
    key: 'signal',
    value: function signal() {
      var scope = internal$6(this);
      if (scope.queue.length === 0) {
        ++scope.available;
      } else {
        scope.queue.shift().let();
      }
    }

    // Properties

  }, {
    key: 'capacity',
    get: function get$$1() {
      var scope = internal$6(this);
      return scope.capacity;
    }
  }, {
    key: 'available',
    get: function get$$1() {
      var scope = internal$6(this);
      return scope.available;
    }
  }]);
  return Semaphore;
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

var internal$7 = Namespace('Singleton');

var Singleton = function () {
  function Singleton() {
    classCallCheck(this, Singleton);

    if (internal$7(this.constructor).instance !== undefined) {
      throw new Error('Attempt to create multiple instances for singleton');
    }
  }

  createClass(Singleton, null, [{
    key: 'get',
    value: function get$$1() {
      var scope = internal$7(this);
      if (scope.instance === undefined) {
        scope.instance = this.new.apply(this, arguments);
      }
      return scope.instance;
    }
  }, {
    key: 'new',
    value: function _new() {
      for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }

      return new (Function.prototype.bind.apply(this, [null].concat(args)))();
    }
  }]);
  return Singleton;
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

var Stride = function () {
  function Stride() {
    classCallCheck(this, Stride);
  }

  createClass(Stride, null, [{
    key: 'transform',
    value: function transform(array, stride, callback) {
      var values = [];
      array.forEach(function (value, index) {
        var modulo = index % stride;
        values[modulo] = value;
        if (modulo === stride - 1) {
          var transformed = callback.apply(undefined, values.concat([Math.floor(index / stride)]));
          for (var offset = 0; offset < stride; ++offset) {
            array[index - (stride - offset - 1)] = transformed[offset];
          }
        }
      });
      return array;
    }
  }, {
    key: 'forEach',
    value: function forEach(array, stride, callback) {
      var values = [];
      array.forEach(function (value, index) {
        var modulo = index % stride;
        values[modulo] = value;
        if (modulo === stride - 1) {
          callback.apply(undefined, values.concat([Math.floor(index / stride)]));
        }
      });
    }
  }, {
    key: 'some',
    value: function some(array, stride, callback) {
      var values = [];
      return array.some(function (value, index) {
        var modulo = index % stride;
        values[modulo] = value;
        if (modulo === stride - 1) {
          return callback.apply(undefined, values.concat([Math.floor(index / stride)]));
        }
        return false;
      });
    }
  }, {
    key: 'every',
    value: function every(array, stride, callback) {
      var values = [];
      return array.every(function (value, index) {
        var modulo = index % stride;
        values[modulo] = value;
        if (modulo === stride - 1) {
          return callback.apply(undefined, values.concat([Math.floor(index / stride)]));
        }
        return true;
      });
    }
  }, {
    key: 'reduce',
    value: function reduce(array, stride, callback, initial) {
      var values = [];
      return array.reduce(function (result, value, index) {
        var modulo = index % stride;
        values[modulo] = value;
        if (modulo === stride - 1) {
          return callback.apply(undefined, [result].concat(values, [Math.floor(index / stride)]));
        }
        return result;
      }, initial);
    }
  }]);
  return Stride;
}();

var base64Arraybuffer = createCommonjsModule(function (module, exports) {
  /*
   * base64-arraybuffer
   * https://github.com/niklasvh/base64-arraybuffer
   *
   * Copyright (c) 2012 Niklas von Hertzen
   * Licensed under the MIT license.
   */
  (function () {
    "use strict";

    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    // Use a lookup table to find the index.
    var lookup = new Uint8Array(256);
    for (var i = 0; i < chars.length; i++) {
      lookup[chars.charCodeAt(i)] = i;
    }

    exports.encode = function (arraybuffer) {
      var bytes = new Uint8Array(arraybuffer),
          i,
          len = bytes.length,
          base64 = "";

      for (i = 0; i < len; i += 3) {
        base64 += chars[bytes[i] >> 2];
        base64 += chars[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
        base64 += chars[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
        base64 += chars[bytes[i + 2] & 63];
      }

      if (len % 3 === 2) {
        base64 = base64.substring(0, base64.length - 1) + "=";
      } else if (len % 3 === 1) {
        base64 = base64.substring(0, base64.length - 2) + "==";
      }

      return base64;
    };

    exports.decode = function (base64) {
      var bufferLength = base64.length * 0.75,
          len = base64.length,
          i,
          p = 0,
          encoded1,
          encoded2,
          encoded3,
          encoded4;

      if (base64[base64.length - 1] === "=") {
        bufferLength--;
        if (base64[base64.length - 2] === "=") {
          bufferLength--;
        }
      }

      var arraybuffer = new ArrayBuffer(bufferLength),
          bytes = new Uint8Array(arraybuffer);

      for (i = 0; i < len; i += 4) {
        encoded1 = lookup[base64.charCodeAt(i)];
        encoded2 = lookup[base64.charCodeAt(i + 1)];
        encoded3 = lookup[base64.charCodeAt(i + 2)];
        encoded4 = lookup[base64.charCodeAt(i + 3)];

        bytes[p++] = encoded1 << 2 | encoded2 >> 4;
        bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
        bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
      }

      return arraybuffer;
    };
  })();
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

if (Environment.type === 'node') {
  // eslint-disable-next-line global-require
  var encoding = require('text-encoding');
  if (Environment.self.TextEncoder === undefined) {
    Environment.self.TextEncoder = encoding.TextEncoder;
  }
  if (Environment.self.TextDecoder === undefined) {
    Environment.self.TextDecoder = encoding.TextDecoder;
  }
}

var Transferral = function () {
  function Transferral() {
    classCallCheck(this, Transferral);
  }

  createClass(Transferral, null, [{
    key: 'encode',
    value: function encode(object) {
      if (typeof TextEncoder !== 'function') {
        throw new Error('TextEncoder is missing');
      }
      var encoder = new TextEncoder();
      var text = JSON.stringify(object);
      var array = encoder.encode(text);
      return array.buffer;
    }
  }, {
    key: 'decode',
    value: function decode(buffer) {
      if (typeof TextDecoder !== 'function') {
        throw new Error('TextDecoder is missing');
      }
      var decoder = new TextDecoder();
      var view = new DataView(buffer);
      var text = decoder.decode(view);
      return JSON.parse(text);
    }
  }, {
    key: 'pack',
    value: function pack(buffer) {
      return base64Arraybuffer.encode(buffer);
    }
  }, {
    key: 'unpack',
    value: function unpack(string) {
      return base64Arraybuffer.decode(string);
    }
  }, {
    key: 'packBufferGeometry',
    value: function packBufferGeometry(geometry) {
      var _this3 = this;

      Object.values(geometry.data.attributes).forEach(function (attribute) {
        var constructor = Environment.self[attribute.type];
        var buffer = new constructor(attribute.array).buffer;
        attribute.array = _this3.pack(buffer);
      });
    }
  }, {
    key: 'unpackBufferGeometry',
    value: function unpackBufferGeometry(geometry) {
      var _this4 = this;

      Object.values(geometry.data.attributes).forEach(function (attribute) {
        var constructor = Environment.self[attribute.type];
        var buffer = _this4.unpack(attribute.array);
        attribute.array = Array.from(new constructor(buffer));
      });
    }
  }]);
  return Transferral;
}();

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection


var rng;

var crypto = commonjsGlobal.crypto || commonjsGlobal.msCrypto; // for IE 11
if (crypto && crypto.getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef
  rng = function whatwgRNG() {
    crypto.getRandomValues(rnds8);
    return rnds8;
  };
}

if (!rng) {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);
  rng = function rng() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}

var rngBrowser = rng;

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  return bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]];
}

var bytesToUuid_1 = bytesToUuid;

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

// random #'s we need to init node and clockseq
var _seedBytes = rngBrowser();

// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
var _nodeId = [_seedBytes[0] | 0x01, _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]];

// Per 4.2.2, randomize (14 bit) clockseq
var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

// Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0;

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

var internal$3$1 = Namespace('Event');

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

      var scope = internal$3$1(this);
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
      var scope = internal$3$1(this);
      scope.propagationStopped = true;
    }
  }, {
    key: 'stopImmediatePropagation',
    value: function stopImmediatePropagation() {
      var scope = internal$3$1(this);
      scope.propagationStopped = true;
      scope.immediatePropagationStopped = true;
    }
  }, {
    key: 'type',
    get: function get$$1() {
      var scope = internal$3$1(this);
      return scope.type;
    }
  }, {
    key: 'target',
    get: function get$$1() {
      var scope = internal$3$1(this);
      return scope.target;
    }
  }, {
    key: 'currentTarget',
    get: function get$$1() {
      var scope = internal$3$1(this);
      return scope.currentTarget;
    }
  }, {
    key: 'phase',
    get: function get$$1() {
      var scope = internal$3$1(this);
      return scope.phase;
    }
  }, {
    key: 'captures',
    get: function get$$1() {
      var scope = internal$3$1(this);
      return scope.captures;
    }
  }, {
    key: 'bubbles',
    get: function get$$1() {
      var scope = internal$3$1(this);
      return scope.bubbles;
    }
  }, {
    key: 'timestamp',
    get: function get$$1() {
      var scope = internal$3$1(this);
      return scope.timestamp;
    }
  }, {
    key: 'propagationStopped',
    get: function get$$1() {
      var scope = internal$3$1(this);
      return scope.propagationStopped;
    }
  }, {
    key: 'immediatePropagationStopped',
    get: function get$$1() {
      var scope = internal$3$1(this);
      return scope.immediatePropagationStopped;
    }
  }]);
  return Event;
}();

function modifyEvent(event) {
  var scope = internal$3$1(event);
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

var internal$2 = Namespace('StateEvent');

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
      var scope = internal$2(this);
      scope.name = name;
      scope.value = value;
      return this;
    }
  }, {
    key: 'name',
    get: function get$$1() {
      var scope = internal$2(this);
      return scope.name;
    }
  }, {
    key: 'value',
    get: function get$$1() {
      var scope = internal$2(this);
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

var internal$4$1 = Namespace('Binding');

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
  var scope = internal$4$1(source);
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
  var scope = internal$4$1(source);
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
  var scope = internal$4$1(source);
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

var internal$5 = Namespace('EventBundle');

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
      var scope = internal$5(this);
      scope.originalEvent = originalEvent || null;
      return this;
    }
  }, {
    key: 'preventDefault',
    value: function preventDefault() {
      var scope = internal$5(this);
      if (scope.originalEvent !== null) {
        scope.originalEvent.preventDefault();
      }
    }
  }, {
    key: 'defaultPrevented',
    get: function get$$1() {
      var scope = internal$5(this);
      if (scope.originalEvent === null) {
        return false;
      }
      return scope.originalEvent.defaultPrevented;
    }
  }, {
    key: 'originalEvent',
    get: function get$$1() {
      var scope = internal$5(this);
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

var internal$6$1 = Namespace('EventDispatcher');

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

    var scope = internal$6$1(this);
    scope.listeners = {};
  }

  createClass(EventDispatcher, [{
    key: 'addEventListener',
    value: function addEventListener(type, listener) {
      var capture = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (typeof listener !== 'function' && (typeof listener === 'undefined' ? 'undefined' : _typeof(listener)) !== 'object') {
        throw new Error('Attempt to add non-function non-object listener');
      }
      var scope = internal$6$1(this);
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

      var scope = internal$6$1(this);
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

      var scope = internal$6$1(this);
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

var internal$7$1 = Namespace('EventTarget');

var EventTarget = function (_EventDispatcher) {
  inherits(EventTarget, _EventDispatcher);

  function EventTarget() {
    classCallCheck(this, EventTarget);

    var _this = possibleConstructorReturn(this, (EventTarget.__proto__ || Object.getPrototypeOf(EventTarget)).call(this));

    var scope = internal$7$1(_this);
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
      var scope = internal$7$1(this);
      return scope.ancestorEventTarget;
    },
    set: function set(value) {
      var scope = internal$7$1(this);
      scope.ancestorEventTarget = value || null;
    }
  }, {
    key: 'descendantEventTarget',
    get: function get$$1() {
      var scope = internal$7$1(this);
      return scope.descendantEventTarget;
    },
    set: function set(value) {
      var scope = internal$7$1(this);
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

var internal$8 = Namespace('MouseEvent');

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
      var scope = internal$8(this);
      scope.x = x || 0;
      scope.y = y || 0;
      scope.movementX = movementX || 0;
      scope.movementY = movementY || 0;
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
    key: 'movementX',
    get: function get$$1() {
      var scope = internal$8(this);
      return scope.movementX;
    }
  }, {
    key: 'movementY',
    get: function get$$1() {
      var scope = internal$8(this);
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

var internal$9 = Namespace('Touch');

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

      var scope = internal$9(this);
      scope.x = x || 0;
      scope.y = y || 0;
      scope.target = target || null;
      scope.originalTouch = originalTouch || null;
      return this;
    }
  }, {
    key: 'x',
    get: function get$$1() {
      var scope = internal$9(this);
      return scope.x;
    }
  }, {
    key: 'y',
    get: function get$$1() {
      var scope = internal$9(this);
      return scope.y;
    }
  }, {
    key: 'target',
    get: function get$$1() {
      var scope = internal$9(this);
      return scope.target;
    }
  }, {
    key: 'originalTouch',
    get: function get$$1() {
      var scope = internal$9(this);
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

var internal$10 = Namespace('TouchEvent');

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
      var scope = internal$10(this);
      scope.touches = touches;
      scope.changedTouches = changedTouches;
      return this;
    }
  }, {
    key: 'touches',
    get: function get$$1() {
      var scope = internal$10(this);
      return scope.touches;
    }
  }, {
    key: 'changedTouches',
    get: function get$$1() {
      var scope = internal$10(this);
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

var internal$11 = Namespace('TouchList');

var TouchList = function () {
  function TouchList() {
    classCallCheck(this, TouchList);

    var scope = internal$11(this);
    scope.array = [];
    this.init.apply(this, arguments);
  }

  createClass(TouchList, [{
    key: 'init',
    value: function init(first) {
      var scope = internal$11(this);
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
      var scope = internal$11(this);
      return scope.array[index];
    }
  }, {
    key: 'length',
    get: function get$$1() {
      var scope = internal$11(this);
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