'use strict';

var arrify = require('arrify');
var sliced = require('sliced');
var extend = require('extend-shallow');
var register = require('native-or-another/register');
var Promize = require('native-or-another');
var isAsync = require('is-async-function');

/*!
 * redolent <https://github.com/tunnckoCore/redolent>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */

/**
 * > Will try to promisify `fn` with native Promise,
 * otherwise you can give different promise module
 * to `opts.Promise`, for example [pinkie][] or [bluebird][].
 * If `fn` [is-async-function][] it will be passed with `done` callback
 * as last argument - always concatenated with the other provided args
 * through `opts.args`.
 *
 * **Note:** Uses [native-or-another][] for detection, so it will always will use the
 * native Promise, otherwise will try to load some of the common promise libraries
 * and as last resort if can't find one of them installed, then throws an Error!
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
 * @param  {Object} `[opts]` optional options, also passed to [native-or-another][]
 * @param  {Array} `[opts.args]` additional arguments to be passed to `fn`,
 *                               all args from `opts.args` and these that are
 *                               passed to promisifed function are concatenated
 * @param  {Object} `[opts.context]` what context to be applied to `fn`,
 *                                   by default it is smart enough and applies
 *                                   the `this` context of redolent call or the call
 *                                   of the promisified function
 * @param  {Function} `[opts.Promise]` custom Promise constructor for versions `< v0.12`,
 *                                   like [bluebird][] for example, by default
 *                                   it **always** uses the native Promise in newer
 *                                   node versions
 * @param  {Boolean} `[opts.global]` defaults to `true`, pass false if you don't
 *                                   want to attach/add/register the given promise
 *                                   to the `global` scope, when node `< v0.12`
 * @return {Function} promisified function
 * @throws {TypeError} If `fn` is not a function
 * @throws {TypeError} If no promise is found
 * @api public
 */

function redolent (fn, opts) {
  if (typeof fn !== 'function') {
    throw new TypeError('redolent: expect `fn` to be a function')
  }

  opts = extend({ context: this, Promise: Promize }, opts);
  opts.Promise = register(opts);

  // we can't test that here, because some
  // of our devDeps has some Promise library,
  // so it's loaded by `native-or-another` automatically
  /* istanbul ignore next */
  if (typeof opts.Promise !== 'function') {
    var msg = 'no native Promise support nor other promise were found';
    throw new TypeError('redolent: ' + msg)
  }

  return function () {
    opts.context = this || opts.context;
    opts.args = arrify(opts.args).concat(sliced(arguments));

    var promise = new opts.Promise(function (resolve, reject) {
      var called = false;

      function done (er, res) {
        called = true;
        if (er) {
          return reject(er)
        }
        if (arguments.length > 2) {
          res = sliced(arguments, 1);
        }
        return resolve(res)
      }

      var isAsyncFn = isAsync(fn);

      opts.args = isAsyncFn ? opts.args.concat(done) : opts.args;
      var syncResult = fn.apply(opts.context, opts.args);
      var xPromise = isAsyncFn && !called && isPromise(syncResult, opts.Promise);

      if ((!isAsyncFn && !called) || xPromise) {
        resolve(syncResult);
      }
    });

    return normalize(promise, opts.Promise)
  }
}

function normalize (promise, Ctor) {
  promise.___nativePromise = Boolean(Ctor.___nativePromise);
  promise.___customPromise = Boolean(Ctor.___customPromise);
  return promise
}

function isPromise (val, Promize$$1) {
  return val instanceof Promize$$1 || (
    val !== null &&
    typeof val === 'object' &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

module.exports = redolent;
