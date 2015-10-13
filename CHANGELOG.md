

## 1.0.6 - 2015-10-14
- Release v1.0.6 / npm@v1.0.6
- update `files` fields

## 1.0.5 - 2015-10-13
- Release v1.0.5 / npm@v1.0.5
- close #5
- update travis
- close #4

## 1.0.4 - 2015-10-11
- Release v1.0.4 / npm@v1.0.4
- fixes #3

## 1.0.3 - 2015-10-07
- Release v1.0.3 / npm@v1.0.3
- update docs
- **NEW:** support for promisify-ing sync functions
- fix readme examples

## 1.0.2 - 2015-10-01
- Release v1.0.2 / npm@v1.0.2
- fix `always-generator` link

## 1.0.1 - 2015-10-01
- Release v1.0.1 / npm@v1.0.1
- fixes #2 bug
- pass used Promise constructor for promisify-ing to the returned promise
  + it will be native promise constructor if native promise available
  + or custom passed promise module constructor
  + or Bluebird constructor

**example**

```js
'use strict'

var fs = require('fs')
var redolent = require('redolent')
var readFile = redolent(fs.readFileSync, require('q'))
var promise = readFile('package.json', 'utf8')

console.log(promise.Prome)
//=> `q` constructor (if native promise not available)
// or native promise constructor
console.log(promise.Prome.___customPromise) //=> true
console.log(promise.___customPromise) //=> true
```

- allow passing custom promise module through static properties
  + till now it was able to do this only if you pass promise module as second argument

**example**

```js
'use strict'

var fs = require('fs')
var redolent = require('redolent')

// `pinkie` is promise module
// will use `pinkie` if not native promise is available
redolent.promise = require('pinkie')

var readFile = redolent(fs.readFileSync)

// will use `q` promise if native not available
// readFile.promise = require('q')

var promise = readFile('package.json')
promise.then(function (res) {
  console.log(res) //=> Buffer
  console.log(promise.Prome)
  //=> `pinkie` constructor (if native promise not available)
  // or native promise constructor
  console.log(promise.Prome.___customPromise) //=> true
  console.log(promise.___customPromise) //=> true
})
```

## 1.0.0 - 2015-09-28
- Release v1.0.0 / npm@v1.0.0
- implement :cat2:

## 0.0.0 - 2015-09-28
- Initial commit