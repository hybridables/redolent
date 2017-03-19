/*!
 * redolent <https://github.com/tunnckoCore/redolent>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var fs = require('fs')
var test = require('mukla')
var semver = require('semver')
var redolent = require('./index')
var extend = require('extend-shallow')
var Pinkie = require('pinkie')

function noop () {}

function notSkipOne (one, two, cb) {
  cb(null, one, two, noop)
}

function notSkipTwo (one, two, cb) {
  cb(null, one, two, fs.readFileSync)
}

function multipleArgs (one, two, three, cb) {
  cb(null, one, two, three)
}

test('should throw TypeError if not function given', function (done) {
  function fixture () {
    redolent(false)
  }

  test.throws(fixture, TypeError)
  test.throws(fixture, /expect `fn` to be a function/)
  done()
})

function factory (promisify) {
  test('should promisify a sync function', function () {
    var fn = promisify(function () {
      return 'foo bar baz'
    })
    return fn().then(function (str) {
      test.strictEqual(str, 'foo bar baz')
    })
  })

  test('should flatten args', function () {
    var func = promisify(function (a, b, c, d, e) {
      return [a, b, c, d, e]
    }, {
      args: ['foo', 'bar']
    })

    return func(123, [1, 2], { a: 'b' }).then(function (arr) {
      test.deepEqual(arr, [ 'foo', 'bar', 123, [ 1, 2 ], { a: 'b' } ])
    })
  })

  test('should promisify with given opts.Promise module (pinkie)', function (done) {
    var readFile = promisify(fs.readFile, {
      Promise: Pinkie
    })
    var promise = readFile('package.json')

    promise.then(function (res) {
      test.strictEqual(typeof res !== 'string', true)
      if (semver.lt(process.version, '0.11.13')) {
        test.strictEqual(promise.___customPromise, true)
      }
      done()
    }).catch(done)
  })

  test('should flatten multiple arguments to array by default', function (done) {
    promisify(multipleArgs)(11, 22, 33).then(function (res) {
      test.strictEqual(Array.isArray(res), true)
      test.deepEqual(res, [11, 22, 33])
      done()
    }).catch(done)
  })

  test('should not skip if pass callback fn, e.g. fn(err, res) as last argument', function (done) {
    function foo (_err, res) { return [_err, res] }

    promisify(function (one, fn, cb) {
      cb(null, one, fn)
    })(123, foo).then(function (res) {
      test.strictEqual(Array.isArray(res), true)
      test.deepEqual(res, [123, foo])
      done()
    }).catch(done)
  })

  test('should promisify `fs.readFileSync` and handle buffer result', function (done) {
    var readFile = promisify(fs.readFileSync)
    readFile('package.json').then(function (buf) {
      test.strictEqual(typeof buf.toString(), 'string')
      done()
    }).catch(done)
  })

  test('should catch errors from failing sync function', function (done) {
    promisify(fs.readFileSync)('foobar.json', 'utf8')
      .catch(function (err) {
        test.strictEqual(err.code, 'ENOENT')
        test.strictEqual(/no such file or directory/.test(err.message), true)
        done()
      })
      .catch(done)
  })

  test('should skip last argument only if it is `fn(foo, bar, cb)` (async fn)', function (done) {
    promisify(notSkipOne)(111, 222).then(function (res) {
      test.strictEqual(Array.isArray(res), true)
      test.deepEqual(res, [111, 222, noop])
      done()
    }).catch(done)
  })

  test('should not skip last argument and work core api (fs.readFileSync)', function (done) {
    promisify(notSkipTwo)(333, 5555).then(function (res) {
      test.strictEqual(Array.isArray(res), true)
      test.deepEqual(res, [333, 5555, fs.readFileSync])
      done()
    }).catch(done)
  })

  test('should call the callback once', function (done) {
    var fn = promisify(function (cb) {
      cb(null, 1)
      cb(null, 2)
    })

    fn()
      .then(function (res) {
        test.strictEqual(res, 1)
        done()
      })
      .catch(done)
  })

  test('should be rejected promise if callback(err)', function (done) {
    var fn = promisify(function (cb) {
      cb(new Error('foo qux'))
    })

    fn()
      .catch(function (err) {
        test.strictEqual(err.name, 'Error')
        test.strictEqual(err.message, 'foo qux')
        done()
      })
      .catch(done)
  })
}

if (semver.lt(process.version, '0.12.0')) {
  factory(function (fn, opts) {
    return redolent(fn, extend({
      Promise: Pinkie
    }, opts))
  })
  test('should autoload some custom Promise (installed in some of the devDeps)', function (done) {
    var func = redolent(function () { return 123 })
    var promise = func()

    test.strictEqual(Promise.___customPromise, true)
    test.strictEqual(promise.___customPromise, true)

    promise.then(function (res) {
      test.strictEqual(res, 123)
      done()
    }, done).catch(done)
  })
} else {
  factory(function (fn, opts) {
    return redolent(fn, extend({}, opts))
  })
  test('should always load native promise if >= 0.12', function (done) {
    var promise = redolent(function () {
      return 1
    })()

    test.strictEqual(Promise.___nativePromise, true)
    test.strictEqual(promise.___nativePromise, true)
    promise.then(function (num) {
      test.strictEqual(num, 1)
      done()
    }, done).catch(done)
  })
}
