/*!
 * redolent <https://github.com/tunnckoCore/redolent>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */

'use strict'

var arrify = require('arrify')
var sliced = require('sliced')
var extend = require('extend-shallow')
var Native = require('native-promise')
var isAsync = require('is-async-function')

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

module.exports = function redolent (fn, opts) {
  if (typeof fn !== 'function') {
    throw new TypeError('redolent: expect `fn` to be a function')
  }

  opts = extend({
    context: this,
    Promise: Native
  }, opts)

  return function () {
    opts.context = this || opts.context
    opts.args = arrify(opts.args).concat(sliced(arguments))

    if (typeof opts.Promise !== 'function') {
      throw new TypeError('redolent: no native Promise support and no opts.Promise')
    }

    var promise = new opts.Promise(function (resolve, reject) {
      var called = false

      function done (er, res) {
        called = true
        if (er) {
          return reject(er)
        }
        if (arguments.length > 2) {
          res = sliced(arguments, 1)
        }
        return resolve(res)
      }

      var isAsyncFn = isAsync(fn)

      opts.args = isAsyncFn ? opts.args.concat(done) : opts.args
      var syncResult = fn.apply(opts.context, opts.args)

      if (!isAsyncFn && !called) {
        resolve(syncResult)
      }
    })

    return normalize(promise, Native)
  }
}

function normalize (promise, isNativeSupported) {
  promise.___nativePromise = Boolean(isNativeSupported)
  promise.___customPromise = !promise.___nativePromise
  return promise
}
