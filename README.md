# [redolent][author-www-url] [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url] 

> Simple promisify a callback-style function with sane defaults.

[![code climate][codeclimate-img]][codeclimate-url] [![standard code style][standard-img]][standard-url] [![travis build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![dependency status][david-img]][david-url]


## Install
```
npm i redolent --save
```


## Usage
> For more use-cases see the [tests](./test.js)

```js
const redolent = require('redolent')
```

### [redolent](./index.js#L38)
> Will try to promisify `fn` with native Promise, otherwise will use `Bluebird`
or you can give different promise module as `Prome`, for example `pinkie`.

- `<fn>` **{Function}** callback-style function to promisify
- `[Prome]` **{Function}** custom Promise module to use, e.g. `Q`
- `return` **{Function}** promisified function

**Example**

```js
const fs = require('fs')
const request = require('request')
const redolent = require('redolent')

redolent(fs.readFile)('package.json', 'utf-8').then(data => {
  console.log(JSON.parse(data).name)
})

// handles multiple arguments by default
redolent(request)('http://www.tunnckocore.tk/').then(result => {
  const [httpResponse, body] = result
})
```

### redolent.promise
> Static property on which you can pass custom promise constructor.  
Actually same as `Prome` argument.

**Example**

```js
const fs = require('fs')
const redolent = require('redolent')

// `q` promise will be used if not native promise available
// but only in node <= 0.11.12
redolent.promise = require('q')
redolent(fs.readFile)('package.json', 'utf-8').then(data => {
  console.log(JSON.parse(data).name)
})
```

### promisifiedFn.promise
> You also can pass custom promise module through `.promise` static property of the returned promisified function. 

**Example**

```js
const fs = require('fs')
const redolent = require('redolent')

const readFile = redolent(fs.readFile)

// `q` promise will be used if not native promise available
// but only in node <= 0.11.12
readFile.promise = require('q')

readFile('package.json', 'utf-8').then(data => {
  console.log(JSON.parse(data).name)
})
```

### Access Promise constructor
> You can access the used Promise constructor for promisify-ing from `promise.Prome`

**Example**

```js
const fs = require('fs')
const redolent = require('redolent')

// use `pinkie` promise if not native promise available
// but only in node <= 0.11.12
redolent.promise = require('pinkie')

const promise = redolent(fs.readFile)('package.json', 'utf8')

console.log(promise.Prome)
//=> will be `pinkie` promise constructor (only in node <= 0.11.12)
console.log(promise.Prome.___customPromise) //=> true (only on node <= 0.11.12)
console.log(promise.___customPromise) //=> true (only on node <= 0.11.12)

promise
  .then(JSON.parse)
  .then(data => {
    console.log(data.name) //=> `redolent`
  })
```


## Related
- [always-done](https://github.com/hybridables/always-done): Handles completion and errors of anything!
- [always-promise](https://github.com/hybridables/always-promise): Promisify, basically, **everything**. Generator function, callback-style or synchronous function; sync function that returns child process, stream or observable; directly passed promise, stream or child process.
- [always-thunk](https://github.com/hybridables/always-thunk): Thunkify, basically, **everything**. Generator function, callback-style or synchronous function; sync function that returns child process, stream or observable; directly passed promise, stream or child process.
- [always-generator](https://github.com/hybridables/always-generator): Generatorify, basically, **everything**. Async, callback-style or synchronous function; sync function that returns child process, stream or observable; directly passed promise, stream or child process.
- [native-or-another](https://github.com/tunnckoCore/native-or-another): Always will expose native `Promise` if available, otherwise `Bluebird` but only if you don't give another promise module like `q` or `promise` or what you want.
- [native-promise](https://github.com/tunnckoCore/native-promise): Get native `Promise` or falsey value if not available.


## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/tunnckoCore/redolent/issues/new).  
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.


## [Charlike Make Reagent](http://j.mp/1stW47C) [![new message to charlike][new-message-img]][new-message-url] [![freenode #charlike][freenode-img]][freenode-url]

[![tunnckocore.tk][author-www-img]][author-www-url] [![keybase tunnckocore][keybase-img]][keybase-url] [![tunnckoCore npm][author-npm-img]][author-npm-url] [![tunnckoCore twitter][author-twitter-img]][author-twitter-url] [![tunnckoCore github][author-github-img]][author-github-url]


[npmjs-url]: https://www.npmjs.com/package/redolent
[npmjs-img]: https://img.shields.io/npm/v/redolent.svg?label=redolent

[license-url]: https://github.com/tunnckoCore/redolent/blob/master/LICENSE.md
[license-img]: https://img.shields.io/badge/license-MIT-blue.svg


[codeclimate-url]: https://codeclimate.com/github/tunnckoCore/redolent
[codeclimate-img]: https://img.shields.io/codeclimate/github/tunnckoCore/redolent.svg

[travis-url]: https://travis-ci.org/tunnckoCore/redolent
[travis-img]: https://img.shields.io/travis/tunnckoCore/redolent.svg

[coveralls-url]: https://coveralls.io/r/tunnckoCore/redolent
[coveralls-img]: https://img.shields.io/coveralls/tunnckoCore/redolent.svg

[david-url]: https://david-dm.org/tunnckoCore/redolent
[david-img]: https://img.shields.io/david/tunnckoCore/redolent.svg

[standard-url]: https://github.com/feross/standard
[standard-img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg


[author-www-url]: http://www.tunnckocore.tk
[author-www-img]: https://img.shields.io/badge/www-tunnckocore.tk-fe7d37.svg

[keybase-url]: https://keybase.io/tunnckocore
[keybase-img]: https://img.shields.io/badge/keybase-tunnckocore-8a7967.svg

[author-npm-url]: https://www.npmjs.com/~tunnckocore
[author-npm-img]: https://img.shields.io/badge/npm-~tunnckocore-cb3837.svg

[author-twitter-url]: https://twitter.com/tunnckoCore
[author-twitter-img]: https://img.shields.io/badge/twitter-@tunnckoCore-55acee.svg

[author-github-url]: https://github.com/tunnckoCore
[author-github-img]: https://img.shields.io/badge/github-@tunnckoCore-4183c4.svg

[freenode-url]: http://webchat.freenode.net/?channels=charlike
[freenode-img]: https://img.shields.io/badge/freenode-%23charlike-5654a4.svg

[new-message-url]: https://github.com/tunnckoCore/ama
[new-message-img]: https://img.shields.io/badge/ask%20me-anything-green.svg