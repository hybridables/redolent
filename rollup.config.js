'use strict'

var buble = require('rollup-plugin-buble')
var resolve = require('rollup-plugin-node-resolve')
var commonjs = require('rollup-plugin-commonjs')

module.exports = {
  entry: 'index.js',
  plugins: [
    resolve({ jsnext: true }),
    commonjs(),
    buble()
  ],
  targets: [
    { dest: 'dist/redolent.es.js', format: 'es' },
    { dest: 'dist/redolent.common.js', format: 'cjs' }
  ]
}
