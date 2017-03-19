# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="2.0.2"></a>
## [2.0.2](https://github.com/hybridables/redolent/compare/v2.0.1...v2.0.2) (2017-03-19)


### Bug Fixes

* **deps:** switch to use "native-or-another" ([b3edc4e](https://github.com/hybridables/redolent/commit/b3edc4e))
* **docs:** update docs ([56e97a4](https://github.com/hybridables/redolent/commit/56e97a4))



<a name="2.0.1"></a>
## [2.0.1](https://github.com/hybridables/redolent/compare/v2.0.0...v2.0.1) (2017-03-13)


### Bug Fixes

* **package:** tweak `npm run commit` script - build before test ([de17b5f](https://github.com/hybridables/redolent/commit/de17b5f))
* **promises:** throw TypeError from promisified function when no Promise ([c88bac1](https://github.com/hybridables/redolent/commit/c88bac1)), closes [#16](https://github.com/hybridables/redolent/issues/16)



<a name="2.0.0"></a>
# [2.0.0](https://github.com/hybridables/redolent/compare/v1.0.9...v2.0.0) (2017-03-11)


### Bug Fixes

* **detection:** strict coercion to boolean ([c1430fe](https://github.com/hybridables/redolent/commit/c1430fe))
* **package:** add keywords ([ddb645c](https://github.com/hybridables/redolent/commit/ddb645c))


### Code Refactoring

* **simplify:** rewrite from scratch, update boilerplate stuff ([3ff2cdc](https://github.com/hybridables/redolent/commit/3ff2cdc))


### BREAKING CHANGES

* **simplify:** Promisify just a function - sync and async. Allow passing args, custom promise ctor
and context through options





## 1.0.9 - 2016-01-26
- Release v1.0.9 / npm@v1.0.9
- update dotfiles
- use `relike-value` instead of `relike-all`

## 1.0.8 - 2016-01-15
- Release v1.0.8 / npm@v1.0.8
- update travis to use node@5 also
- udpate license year
- update to use `relike-all` - **NEW** now accept everything, not only sync and async (callback) functions
  + no breaking changes, only adds, same api

## 1.0.7 - 2016-01-13
- Release v1.0.7 / npm@v1.0.7
- greenkeeper.io PR bump deps

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

## 1.0.0 - 2015-09-28
- Release v1.0.0 / npm@v1.0.0
- implement :cat2:

## 0.0.0 - 2015-09-28
- Initial commit