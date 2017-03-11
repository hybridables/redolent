var index$2 = function (val) {
	if (val === null || val === undefined) {
		return [];
	}

	return Array.isArray(val) ? val : [val];
};

/**
 * An Array.prototype.slice.call(arguments) alternative
 *
 * @param {Object} args something with a length
 * @param {Number} slice
 * @param {Number} sliceEnd
 * @api public
 */

var index$4 = function (args, slice, sliceEnd) {
  var ret = [];
  var len = args.length;

  if (0 === len) { return ret; }

  var start = slice < 0
    ? Math.max(0, slice + len)
    : slice || 0;

  if (sliceEnd !== undefined) {
    len = sliceEnd < 0
      ? sliceEnd + len
      : sliceEnd;
  }

  while (len-- > start) {
    ret[len - start] = args[len];
  }

  return ret;
};

/*!
 * is-extendable <https://github.com/jonschlinkert/is-extendable>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

var index$8 = function isExtendable(val) {
  return typeof val !== 'undefined' && val !== null
    && (typeof val === 'object' || typeof val === 'function');
};

var index$6 = function extend(o/*, objects*/) {
  var arguments$1 = arguments;

  if (!index$8(o)) { o = {}; }

  var len = arguments.length;
  for (var i = 1; i < len; i++) {
    var obj = arguments$1[i];

    if (index$8(obj)) {
      assign(o, obj);
    }
  }
  return o;
};

function assign(a, b) {
  for (var key in b) {
    if (hasOwn(b, key)) {
      a[key] = b[key];
    }
  }
}

/**
 * Returns true if the given `key` is an own property of `obj`.
 */

function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var index$10 = typeof commonjsGlobal === 'object' && commonjsGlobal.Promise ||
  typeof window === 'object' && window.Promise ||
  typeof Promise !== 'undefined' && Promise ||
  false;

/**
 * > Check any of `values` exists on `arr`.
 *
 * **Example**
 *
 * ```js
 * var arrIncludes = require('arr-includes')
 *
 * console.log(arrIncludes([1, 'bar', 55], 2)) // => false
 * console.log(arrIncludes([1, 'bar', 3], 3)) // => 2
 *
 * console.log(arrIncludes([1, 'bar', 3, true], false)) // => false
 * console.log(arrIncludes([1, 'bar', 44, true], true)) // => 3
 *
 * console.log(arrIncludes(['foo', 'bar'], 'baz')) // => false
 * console.log(arrIncludes(['foo', 'bar'], 'foo')) // => true
 * console.log(arrIncludes(['qux', 'foo', 'bar'], 'foo')) // => 1
 * console.log(arrIncludes([true, 'qqq', 'bar'], true)) // => true
 * console.log(arrIncludes(['true', 'qqq', 'bar'], true)) // => false
 * console.log(arrIncludes(['qqq', 'bar', true], true)) // => 2
 * console.log(arrIncludes(['qqq', 'true', 'bar'], true)) // => false
 * console.log(arrIncludes([false, 'foo', null, 'bar'], null)) // => 2
 *
 * console.log(arrIncludes(['foo', 'bar', 'qux'], ['a', 'b', 'c'])) // => false
 * console.log(arrIncludes(['b', 'a', 'c'], ['a', 'b', 'c'])) // => 1
 * console.log(arrIncludes(['foo', 'bb', 'b'], ['a', 'b'])) // => 2
 * console.log(arrIncludes(['foo', 'bar', 'qux'], ['a', 'b', 'foo'])) // => true
 * console.log(arrIncludes(['bar', 123, 'foo', 'qux'], ['a', 'b', 'foo'])) // => 2
 * ```
 *
 * @param  {Array} `arr` array to check
 * @param  {Array|String} `values` array or string
 * @return {Boolean|Number} returns `false` if not found, `true` if **index is 0**
 *                                  from the array, otherwise `number` index
 * @api public
 */

var index$14 = function arrIncludes (arr, values) {
  if (!Array.isArray(values)) { return inArray(arr, values) }
  var len = values.length;
  var i = -1;

  while (i++ < len) {
    var j = inArray(arr, values[i]);
    if (j) {
      return j
    }
  }

  return false
};

function inArray (arr, val) {
  arr = index$2(arr);
  var len = arr.length;
  var i = null;

  for (i = 0; i < len; i++) {
    if (arr[i] === val) {
      return i === 0 ? true : i
    }
  }
  return false
}

/*!
 * common-callback-names <https://github.com/tunnckoCore/common-callback-names>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */

var index$16 = [
  'callback',
  'callback_',
  'cb',
  'cb_',
  'done',
  'next'
];

/*!
 * function-arguments <https://github.com/tunnckoCore/function-arguments>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/**
 * > Get function arguments names.
 *
 * **Example**
 *
 * ```js
 * var fnArgs = require('function-arguments')
 *
 * console.log(fnArgs(function (a, b, c) {})) // => [ 'a', 'b', 'c' ]
 * console.log(fnArgs(function named (a , b, c) {})) // => [ 'a', 'b', 'c' ]
 *
 * console.log(fnArgs(a => {})) // => [ 'a' ]
 * console.log(fnArgs((a, b) => {})) // => [ 'a', 'b' ]
 *
 * console.log(fnArgs(function * (a ,b, c) {})) // => [ 'a', 'b', 'c' ]
 * console.log(fnArgs(function * named (a ,b, c) {})) // => [ 'a', 'b', 'c' ]
 * ```
 *
 * @param  {Function} `fn` Function from which to get arguments names.
 * @return {Array}
 * @api public
 */

var index$18 = function functionArguments (fn) {
  if (typeof fn !== 'function') {
    throw new TypeError('function-arguments expect a function')
  }
  if (fn.length === 0) {
    return []
  }

  // from https://github.com/jrburke/requirejs
  var reComments = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg;
  var fnToStr = Function.prototype.toString;
  var fnStr = fnToStr.call(fn);
  fnStr = fnStr.replace(reComments, '') || fnStr;
  fnStr = fnStr.slice(0, fnStr.indexOf('{'));

  var open = fnStr.indexOf('(');
  var close = fnStr.indexOf(')');

  open = open >= 0 ? open + 1 : 0;
  close = close > 0 ? close : fnStr.indexOf('=');

  fnStr = fnStr.slice(open, close);
  fnStr = '(' + fnStr + ')';

  var match = fnStr.match(/\(([\s\S]*)\)/);
  return match ? match[1].split(',').map(function (param) {
    return param.trim()
  }) : []
};

/**
 * > Trying to guess is `fn` asynchronous function or not.
 * But not [is-callback-function][] be aware of that diff.
 *
 * **Example**
 *
 * ```js
 * var fs = require('fs')
 * var isAsyncFn = require('is-async-function')
 *
 * console.log(isAsyncFunction(fs.readFile)) // => true
 * console.log(isAsyncFunction(fs.stat)) // => true
 *
 * console.log(isAsyncFunction(fs.readFileSync)) // => false
 * console.log(isAsyncFunction(fs.statSync)) // => false
 *
 * // or pass custom names to recognize as `async`
 * console.log(isAsyncFunction(fs.stat, ['cb'])) // => false
 * console.log(isAsyncFunction(fs.readFile, ['foo', 'bar']))
 * // => false, because fs.readFile uses `cb`
 * ```
 *
 * @param  {Function} `fn` is this `fn` a callback function
 * @param  {Array} `names` arguments names, default are [common-callback-names][]
 * @param  {Boolean} `strict` defaults to `true` to always return a boolean,
 *                            pass `false` to get index (position) - this is
 *                            useful when you wanna understand which "callback name"
 *                            exists as argument in that `fn`
 * @return {Boolean|Number} always boolean `true` or `false` when on strict mode,
 *                          othewise it can be Number index representing the position
 *                          and if index is 0 it is transformed to boolean `true` - so
 *                          always positive value if function is async.
 * @api public
 */

var index$12 = function isAsyncFunction (fn, names, strict) {
  if (typeof fn !== 'function') {
    throw new TypeError('is-async-function expect a function')
  }

  strict = typeof names === 'boolean' ? names : strict;
  strict = typeof strict === 'boolean' ? strict : true;
  names = typeof names === 'boolean' ? null : names;

  names = Array.isArray(names) ? names : index$2(names);
  names = names.length ? names : index$16;

  var idx = index$14(names, index$18(fn));
  return strict ? Boolean(idx) : idx
};

/**
 * Will try to promisify `fn` with native Promise,
 * otherwise you can give different promise module
 * to `opts.Promise`, for example [pinkie][] or [bluebird][].
 * If `fn` [is-async-function][] it will be passed with `done` callback
 * as last argument - always concatenated with the other provided args
 * through `opts.args`.
 *
 * **Example**
 *
 * ```js
 * const fs = require('fs')
 * const request = require('request')
 * const redolent = require('redolent')
 *
 * redolent(fs.readFile)('package.json', 'utf-8').then(data => {
 *   console.log(JSON.parse(data).name)
 * })
 *
 * // handles multiple arguments by default
 * redolent(request)('http://www.tunnckocore.tk/').then(result => {
 *   const [httpResponse, body] = result
 * })
 *
 * // `a` and `b` arguments comes from `opts.args`
 * // `c` and `d` comes from the call of the promisified function
 * const fn = redolent((a, b, c, d, done) => {
 *   console.log(typeof done) // => 'function'
 *   done(null, a + b + c + d)
 * }, {
 *   args: [1, 2]
 * })
 *
 * fn(3, 5).then((res) => {
 *   console.log(res) // => 11
 * })
 * ```
 *
 * @name   redolent
 * @param  {Function} `<fn>` a function to be promisified
 * @param  {Object} `[opts]` optional options - like `.args`, `.context`, `.Promise`
 * @param  {Array} `[opts.args]` additional arguments to be passed to `fn`,
 *                               all args from `opts.args` and these that are
 *                               passed to promisifed function are concatenated
 * @param  {Object} `[opts.context]` what context to be applied to `fn`,
 *                                   by default it is smart enough and applies
 *                                   the `this` context of redolent call or the call
 *                                   of the promisified function
 * @param  {Function} `[opts.Promise]` custom Promise constructor function,
 *                                   like [bluebird][] for example,
 *                                   by default uses the native Promise
 * @return {Function} promisified function
 * @api public
 */

var index = function redolent (fn, opts) {
  if (typeof fn !== 'function') {
    throw new TypeError('redolent: expect `fn` to be a function')
  }

  opts = index$6({
    context: this,
    Promise: index$10
  }, opts);

  return function () {
    opts.context = this || opts.context;
    opts.args = index$2(opts.args).concat(index$4(arguments));

    var promise = new opts.Promise(function (resolve, reject) {
      var called = false;

      function done (er, res) {
        called = true;
        if (er) {
          return reject(er)
        }
        if (arguments.length > 2) {
          res = index$4(arguments, 1);
        }
        return resolve(res)
      }

      var isAsyncFn = index$12(fn);

      opts.args = isAsyncFn ? opts.args.concat(done) : opts.args;
      var syncResult = fn.apply(opts.context, opts.args);

      if (!isAsyncFn && !called) {
        resolve(syncResult);
      }
    });

    promise.___nativePromise = index$10;
    promise.___customPromise = !index$10;
    return promise
  }
};

export default index;
