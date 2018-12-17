import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
// import postcss from 'rollup-plugin-postcss-modules'
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import url from 'rollup-plugin-url';
import svgr from '@svgr/rollup';
import json from 'rollup-plugin-json';
import builtins from 'rollup-plugin-node-builtins';

import pkg from './package.json';

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true
    }
  ],
  plugins: [
    external(),
    postcss({
      modules: true
    }),
    url(),
    svgr(),
    resolve({ browser: true }),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true
    }),
    commonjs({
      namedExports: {
        esrever: ['reverse'],
        immutable: [
          'List',
          'Map',
          'Record',
          'OrderedSet',
          'Set',
          'Stack',
          'is'
        ],
        'react-dom': ['findDomNode'],
        'react-dom/server': ['renderToStaticMarkup']
      }
    }),
    builtins(),
    json()
  ]
};
