/*!
 * redolent <https://github.com/hybridables/redolent>
 *
 * Copyright (c) 2015-2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var utils = require('./utils')

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
 * @param  {Anything} `[val]` any type from string to function (number, stream, array, boolean, etc)
 * @param  {Function} `[Prome]` custom Promise module to use, e.g. `Q`
 * @return {Function} promisified function
 * @api public
 */
module.exports = function redolent (val, Prome) {
  var self = this
  return function promisifyFn () {
    var ctx = self || this
    var args = utils.sliced(arguments)
    utils.relikeValue.promise = Prome || redolent.promise || promisifyFn.promise
    return utils.relikeValue.apply(ctx, [val].concat(args))
  }
}
