// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'

import pkg from './package.json'

const globals = {
  '@takram/planck-core': 'Planck'
}

export default {
  input: './src/index.js',
  external: Object.keys(globals),
  plugins: [
    nodeResolve({ browser: true }),
    commonjs(),
    babel({
      presets: [
        ['es2015', { modules: false }],
        'es2016',
        'es2017',
        'stage-3',
        'stage-2'
      ],
      plugins: [
        'external-helpers'
      ],
      babelrc: false
    })
  ],
  output: [
    {
      globals,
      format: 'umd',
      exports: 'named',
      extend: true,
      name: 'Planck',
      file: pkg.browser[pkg.main],
      sourcemap: true
    },
    {
      format: 'es',
      file: pkg.browser[pkg.module],
      sourcemap: true
    }
  ]
}
