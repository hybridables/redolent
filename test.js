/*!
 * redolent <https://github.com/tunnckoCore/redolent>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var fs = require('fs')
var test = require('assertit')
var isArray = require('isarray')
var isBuffer = require('is-buffer')
var semver = require('semver')
var redolent = require('./index')

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
    redolent(123)
  }
  test.throws(fixture, TypeError)
  test.throws(fixture, /redolent expect a function/)
  done()
})

test('should promisify with native Promise or Bluebird', function (done) {
  var readFile = redolent(fs.readFile)
  var promise = readFile('./package.json', 'utf-8')

  promise.then(function (res) {
    test.ok(res.indexOf('"license": "MIT"') !== -1)
    if (semver.lt(process.version, '0.11.13')) {
      test.strictEqual(promise.___bluebirdPromise, true)
    }
    done()
  }, done)
})

test('should promisify with given promise module (pinkie)', function (done) {
  var readFile = redolent(fs.readFile, require('pinkie'))
  var promise = readFile('package.json')

  promise.then(function (res) {
    test.strictEqual(isBuffer(res), true)
    if (semver.lt(process.version, '0.11.13')) {
      test.strictEqual(promise.___customPromise, true)
    }
    done()
  }, done)
})

test('should flatten multiple arguments to array by default', function (done) {
  redolent(multipleArgs)(11, 22, 33).then(function (res) {
    test.strictEqual(isArray(res), true)
    test.deepEqual(res, [11, 22, 33])
    done()
  }, done)
})

test('should skip last argument only if it is `fn(foo, bar, cb)` (async fn)', function (done) {
  redolent(notSkipOne)(111, 222).then(function (res) {
    test.strictEqual(isArray(res), true)
    test.deepEqual(res, [111, 222, noop])
    done()
  })
})

test('should not skip last argument and work core api (fs.readFileSync)', function (done) {
  redolent(notSkipTwo)(333, 5555).then(function (res) {
    test.strictEqual(isArray(res), true)
    test.deepEqual(res, [333, 5555, fs.readFileSync])
    done()
  })
})

test('should not skip if pass callback fn, e.g. fn(err, res) as last argument', function (done) {
  function foo (_err, res) {}
  redolent(function (one, fn, cb) {
    cb(null, one, fn)
  })(123, foo).then(function (res) {
    test.strictEqual(isArray(res), true)
    test.deepEqual(res, [123, foo])
    done()
  })
})
