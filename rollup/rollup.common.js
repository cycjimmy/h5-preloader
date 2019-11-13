import {eslint} from 'rollup-plugin-eslint';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import {terser} from 'rollup-plugin-terser/index';
import pkg from '../package.json';
import myBanner from '@cycjimmy/config-lib/chore/myBanner';
// config
import terserOption from '@cycjimmy/config-lib/terser/4.x/production';

export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const IS_DEPLOYMENT = process.env.NODE_ENV === 'deployment';

export const input = './src/index.js';
export const name = 'h5Preloader';
export const banner = myBanner(pkg);

export const plugins = [
  json(),
  eslint({
    fix: true,
    exclude: [
      '**/*.(css|scss)',
    ]
  }),
  resolve(),
  babel(),
  commonjs(),
];

export const terserPlugins = (IS_PRODUCTION && terser(terserOption));

