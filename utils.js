/* jshint asi:true */

'use strict'

/**
 * Lazily required module dependencies
 */

var utils = require('lazy-cache')(require) // eslint-disable-line no-undef, no-native-reassign
var fn = require

require = utils // eslint-disable-line no-undef, no-native-reassign
require('handle-arguments')
require('is-async-function')
require('native-or-another')
require('sliced')
require = fn // eslint-disable-line no-undef, no-native-reassign

/**
 * Expose `utils` modules
 */

module.exports = utils
