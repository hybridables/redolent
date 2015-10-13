/*!
 * redolent <https://github.com/hybridables/redolent>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

/**
 * Will try to promisify `fn` with native Promise,
 * otherwise will use `Bluebird` or you can give
 * different promise module as `Prome`, for example `pinkie`.
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
 * ```
 *
 * @name   redolent
 * @param  {Function} `<fn>` callback-style function to promisify
 * @param  {Function} `[Prome]` custom Promise module to use, e.g. `Q`
 * @return {Function} promisified function
 * @api public
 */
module.exports = function redolent (fn, Prome) {
  if (typeof fn !== 'function') {
    throw new TypeError('redolent expect a function')
  }

  var self = this
  return function promisify () {
    var sliced = require('sliced')
    var handle = require('handle-arguments')
    var isAsyncFn = require('is-async-function')
    var argz = handle(arguments)
    var ctx = self || this

    if (argz.callback && !isAsyncFn(argz.callback)) {
      argz.args = argz.args.concat(argz.callback)
    }

    Prome = require('native-or-another')(Prome || redolent.promise || promisify.promise)
    var promise = new Prome(function prome (resolve, reject) {
      var isAsync = isAsyncFn(fn)
      if (isAsync) {
        argz.args = argz.args.concat(function cb (err, res) {
          if (err) return reject(err)
          if (arguments.length > 2) res = sliced(arguments, 1)
          resolve(res)
        })
      }
      var syncResult = fn.apply(ctx, argz.args)
      if (!isAsync) {
        resolve(syncResult)
      }
    })

    promise.Prome = Prome
    promise.___customPromise = Prome.___customPromise
    promise.___bluebirdPromise = Prome.___bluebirdPromise
    return promise
  }
}
