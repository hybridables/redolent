'use strict'

var buble = require('rollup-plugin-buble')
var resolve = require('rollup-plugin-node-resolve')
var commonjs = require('rollup-plugin-commonjs')

if (process.env.NODE_TESTING) {
  module.exports = {
    entry: 'index.js',
    dest: 'dist/redolent-testing.js',
    format: 'cjs',
    interop: false,
    plugins: [
      buble()
    ],
    external: [
      'native-or-another/register',
      'native-or-another',
      'is-async-function',
      'extend-shallow',
      'sliced',
      'arrify'
    ]
  }
} else {
  module.exports = {
    entry: 'index.js',
    plugins: [
      commonjs({
        include: [
          'node_modules/**',
        ],
        exclude: [
          'node_modules/native-or-another/register.js',
          'node_modules/native-or-another/index.js'
        ]
      }),
      resolve({
        jsnext: true
      }),
      buble()
    ],
    external: [
      'native-or-another',
      'native-or-another/register'
    ],
    targets: [
      { dest: 'dist/redolent.es.js', format: 'es' },
      { dest: 'dist/redolent.common.js', format: 'cjs' }
    ]
  }
}
