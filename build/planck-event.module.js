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


class Environment {
  static get type() {
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

  static get self() {
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

const internal$3 = Namespace('FilePath');

class FilePath {
  static get self() {
    const scope = internal$3(this);
    return scope.self;
  }

  static get current() {
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
}

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
      rotl: function (n, b) {
        return n << b | n >>> 32 - b;
      },

      // Bit-wise rotation right
      rotr: function (n, b) {
        return n << 32 - b | n >>> b;
      },

      // Swap big-endian to little-endian and vice versa
      endian: function (n) {
        // If number given, swap endian
        if (n.constructor == Number) {
          return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
        }

        // Else, assume array and swap all items
        for (var i = 0; i < n.length; i++) n[i] = crypt.endian(n[i]);
        return n;
      },

      // Generate an array of any length of random bytes
      randomBytes: function (n) {
        for (var bytes = []; n > 0; n--) bytes.push(Math.floor(Math.random() * 256));
        return bytes;
      },

      // Convert a byte array to big-endian 32-bit words
      bytesToWords: function (bytes) {
        for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8) words[b >>> 5] |= bytes[i] << 24 - b % 32;
        return words;
      },

      // Convert big-endian 32-bit words to a byte array
      wordsToBytes: function (words) {
        for (var bytes = [], b = 0; b < words.length * 32; b += 8) bytes.push(words[b >>> 5] >>> 24 - b % 32 & 0xFF);
        return bytes;
      },

      // Convert a byte array to a hex string
      bytesToHex: function (bytes) {
        for (var hex = [], i = 0; i < bytes.length; i++) {
          hex.push((bytes[i] >>> 4).toString(16));
          hex.push((bytes[i] & 0xF).toString(16));
        }
        return hex.join('');
      },

      // Convert a hex string to a byte array
      hexToBytes: function (hex) {
        for (var bytes = [], c = 0; c < hex.length; c += 2) bytes.push(parseInt(hex.substr(c, 2), 16));
        return bytes;
      },

      // Convert a byte array to a base-64 string
      bytesToBase64: function (bytes) {
        for (var base64 = [], i = 0; i < bytes.length; i += 3) {
          var triplet = bytes[i] << 16 | bytes[i + 1] << 8 | bytes[i + 2];
          for (var j = 0; j < 4; j++) if (i * 8 + j * 6 <= bytes.length * 8) base64.push(base64map.charAt(triplet >>> 6 * (3 - j) & 0x3F));else base64.push('=');
        }
        return base64.join('');
      },

      // Convert a base-64 string to a byte array
      base64ToBytes: function (base64) {
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
    stringToBytes: function (str) {
      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
    },

    // Convert a byte array to a string
    bytesToString: function (bytes) {
      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
    }
  },

  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function (str) {
      for (var bytes = [], i = 0; i < str.length; i++) bytes.push(str.charCodeAt(i) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a string
    bytesToString: function (bytes) {
      for (var str = [], i = 0; i < bytes.length; i++) str.push(String.fromCharCode(bytes[i]));
      return str.join('');
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
var index = function (obj) {
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
    md5 = function (message, options) {
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
var error$1 = function (m) {
  // Call error when something is wrong.
  throw {
    name: 'SyntaxError',
    message: m,
    at: at,
    text: text
  };
};
var next = function (c) {
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
var number = function () {
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
var string = function () {
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
var white = function () {

  // Skip whitespace.

  while (ch && ch <= ' ') {
    next();
  }
};
var word = function () {

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
var array = function () {

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
var object = function () {

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

value = function () {

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

/* eslint-disable global-require */
let readFile;
let request;
if (Environment.type === 'node') {
  ({ readFile } = require('fs'));
  request = require('request');
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

const internal$6 = Namespace('Semaphore');

class Task {
  constructor(semaphore, callback) {
    const promises = [new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    }), new Promise(resolve => {
      this.let = resolve;
    }).then(() => {
      callback(this.resolve, this.reject);
    })];
    this.promise = Promise.all(promises).then(values => {
      semaphore.signal();
      return values[0];
    }, reason => {
      semaphore.signal();
      return Promise.reject(reason);
    });
  }
}

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
  const encoding = require('text-encoding');
  if (Environment.self.TextEncoder === undefined) {
    Environment.self.TextEncoder = encoding.TextEncoder;
  }
  if (Environment.self.TextDecoder === undefined) {
    Environment.self.TextDecoder = encoding.TextDecoder;
  }
}

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
  rng = function () {
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

const internal$3$1 = Namespace('Event');

class Event {
  constructor(options = {}) {
    this.init(options);
  }

  init({ type, captures = false, bubbles = true } = {}) {
    const scope = internal$3$1(this);
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
    const scope = internal$3$1(this);
    return scope.type;
  }

  get target() {
    const scope = internal$3$1(this);
    return scope.target;
  }

  get currentTarget() {
    const scope = internal$3$1(this);
    return scope.currentTarget;
  }

  get phase() {
    const scope = internal$3$1(this);
    return scope.phase;
  }

  get captures() {
    const scope = internal$3$1(this);
    return scope.captures;
  }

  get bubbles() {
    const scope = internal$3$1(this);
    return scope.bubbles;
  }

  get timestamp() {
    const scope = internal$3$1(this);
    return scope.timestamp;
  }

  stopPropagation() {
    const scope = internal$3$1(this);
    scope.propagationStopped = true;
  }

  stopImmediatePropagation() {
    const scope = internal$3$1(this);
    scope.propagationStopped = true;
    scope.immediatePropagationStopped = true;
  }

  get propagationStopped() {
    const scope = internal$3$1(this);
    return scope.propagationStopped;
  }

  get immediatePropagationStopped() {
    const scope = internal$3$1(this);
    return scope.immediatePropagationStopped;
  }
}

function modifyEvent(event) {
  const scope = internal$3$1(event);
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

    super.init(_extends({ type }, rest)
    // Support target as a parameter
    );modifyEvent(this).target = target || null;
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

const internal$2 = Namespace('StateEvent');

class StateEvent extends CustomEvent {
  init(_ref = {}) {
    let { name, value } = _ref,
        rest = objectWithoutProperties(_ref, ['name', 'value']);

    super.init(_extends({}, rest, { type: StateEvent.type(name) }));
    const scope = internal$2(this);
    scope.name = name;
    scope.value = value;
    return this;
  }

  get name() {
    const scope = internal$2(this);
    return scope.name;
  }

  get value() {
    const scope = internal$2(this);
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
    scope.handleChange = handleChange.bind(this, transform

    // Listen for state events with the given name
    );const type = StateEvent.type(name);
    scope.source.addEventListener(type, scope.handleChange, false

    // Initial assignment
    );if (assigns) {
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

const internal$4$1 = Namespace('Binding');

function formatTargets(...args) {
  // Flatten arguments
  const flatArgs = args.reduce((targets, value) => {
    return targets.concat(value);
  }, []

  // Convert the array from [object, name, ...] to [{ object, name }, ...]
  );let object;
  const targets = flatArgs.reduce((targets, value, index) => {
    if (index % 2 === 0) {
      object = value;
    } else {
      targets.push({ object, name: value });
    }
    return targets;
  }, []

  // Defaults to one-way binding for multiple targets
  );const options = Object.assign({
    oneWay: targets.length > 1
  }, flatArgs[targets.length * 2]);
  return [targets, options];
}

function bind(source, name, targets, options) {
  const scope = internal$4$1(source);
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
  const scope = internal$4$1(source);
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
  const scope = internal$4$1(source);
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

const internal$5 = Namespace('EventBundle');

class EventBundle extends Event {
  init(_ref = {}) {
    let { originalEvent } = _ref,
        rest = objectWithoutProperties(_ref, ['originalEvent']);

    super.init(_extends({}, rest));
    const scope = internal$5(this);
    scope.originalEvent = originalEvent || null;
    return this;
  }

  preventDefault() {
    const scope = internal$5(this);
    if (scope.originalEvent !== null) {
      scope.originalEvent.preventDefault();
    }
  }

  get defaultPrevented() {
    const scope = internal$5(this);
    if (scope.originalEvent === null) {
      return false;
    }
    return scope.originalEvent.defaultPrevented;
  }

  get originalEvent() {
    const scope = internal$5(this);
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

const internal$6$1 = Namespace('EventDispatcher');

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
    const scope = internal$6$1(this);
    scope.listeners = {};
  }

  addEventListener(type, listener, capture = false) {
    if (typeof listener !== 'function' && typeof listener !== 'object') {
      throw new Error('Attempt to add non-function non-object listener');
    }
    const scope = internal$6$1(this);
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
    const scope = internal$6$1(this);
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
    const modifier = modifyEvent(event

    // Set target to this when it's not set
    );if (!event.target) {
      modifier.target = this;
    }
    // Current target should be always this
    modifier.currentTarget = this;

    const scope = internal$6$1(this);
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

const internal$7$1 = Namespace('EventTarget');

class EventTarget extends EventDispatcher {
  constructor() {
    super();
    const scope = internal$7$1(this);
    scope.ancestorEventTarget = null;
    scope.descendantEventTarget = null;
  }

  get ancestorEventTarget() {
    const scope = internal$7$1(this);
    return scope.ancestorEventTarget;
  }

  set ancestorEventTarget(value) {
    const scope = internal$7$1(this);
    scope.ancestorEventTarget = value || null;
  }

  get descendantEventTarget() {
    const scope = internal$7$1(this);
    return scope.descendantEventTarget;
  }

  set descendantEventTarget(value) {
    const scope = internal$7$1(this);
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
    const modifier = modifyEvent(event

    // Just dispatch the event if it doesn't capture nor bubble
    );if (!event.captures && !event.bubbles) {
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
    bubblingPath.reverse

    // Capturing phase
    ();if (event.captures) {
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

const internal$8 = Namespace('MouseEvent');

class MouseEvent extends EventBundle {
  init(_ref = {}) {
    let { x, y, movementX, movementY } = _ref,
        rest = objectWithoutProperties(_ref, ['x', 'y', 'movementX', 'movementY']);

    super.init(_extends({}, rest));
    const scope = internal$8(this);
    scope.x = x || 0;
    scope.y = y || 0;
    scope.movementX = movementX || 0;
    scope.movementY = movementY || 0;
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

  get movementX() {
    const scope = internal$8(this);
    return scope.movementX;
  }

  get movementY() {
    const scope = internal$8(this);
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

const internal$9 = Namespace('Touch');

class Touch {
  constructor(options = {}) {
    this.init(options);
  }

  init({ x, y, target, originalTouch } = {}) {
    const scope = internal$9(this);
    scope.x = x || 0;
    scope.y = y || 0;
    scope.target = target || null;
    scope.originalTouch = originalTouch || null;
    return this;
  }

  get x() {
    const scope = internal$9(this);
    return scope.x;
  }

  get y() {
    const scope = internal$9(this);
    return scope.y;
  }

  get target() {
    const scope = internal$9(this);
    return scope.target;
  }

  get originalTouch() {
    const scope = internal$9(this);
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

const internal$10 = Namespace('TouchEvent');

class TouchEvent extends EventBundle {
  init(_ref = {}) {
    let { touches, changedTouches } = _ref,
        rest = objectWithoutProperties(_ref, ['touches', 'changedTouches']);

    super.init(_extends({}, rest));
    const scope = internal$10(this);
    scope.touches = touches;
    scope.changedTouches = changedTouches;
    return this;
  }

  get touches() {
    const scope = internal$10(this);
    return scope.touches;
  }

  get changedTouches() {
    const scope = internal$10(this);
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

const internal$11 = Namespace('TouchList');

class TouchList {
  constructor(...args) {
    const scope = internal$11(this);
    scope.array = [];
    this.init(...args);
  }

  init(first, ...rest) {
    const scope = internal$11(this);
    scope.array.length = 0;
    if (Array.isArray(first)) {
      scope.array.push(...first);
    } else if (first) {
      scope.array.push(first, ...rest);
    }
  }

  get length() {
    const scope = internal$11(this);
    return scope.array.length;
  }

  item(index) {
    const scope = internal$11(this);
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
