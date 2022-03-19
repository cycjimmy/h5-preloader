# H5 Preloader
![][workflows-badge-image]
[![libraries dependency status][libraries-status-image]][libraries-status-url]
[![libraries sourcerank][libraries-sourcerank-image]][libraries-sourcerank-url]
[![Coverage Status][coverage-image]][coverage-url]
[![Release date][release-date-image]][release-url]
[![rollup][rollup-image]][rollup-url]
[![semantic-release][semantic-image]][semantic-url]
[![jest][jest-image]][jest-url]
[![npm license][license-image]][download-url]

Resources pre-load for h5 page. [Demo][github-pages-url]

## Install
[![NPM version][npm-image]][npm-url]
[![NPM bundle size][npm-bundle-size-image]][npm-url]
[![npm download][download-image]][download-url]

```shell
# via npm
$ npm install @cycjimmy/h5-preloader --save

# or via yarn
$ yarn add @cycjimmy/h5-preloader
```

## Usage
```javascript
import h5Preloader from '@cycjimmy/h5-preloader';

h5Preloader({
  type: 'progressBar',
  progressBar: {
    eProgressBar: ...,
    eProgressBarPercent: ...
  },
  resources: [
    ...
  ],
  hookWhenProgressComplete: () => 
    ...
  },
}).load();
```

* `h5Preloader` config:
  * resources: [Require][Array] Resource paths array.
  * type: [Option][String] Set type of progress. Currently only supports `'progressBar'`. Default `'progressBar'`.
  * progressBar: [Option][Object] Progress bar config
    * eProgressBar: [Element] Element of Progress bar.
    * eProgressBarPercent: [Element] Element for showing percent.
  * hookWhenProgressComplete: [Option][Function] The hook function when the progress complete.
  * autoComplete: [Option][Boolean] Whether to automatic operation the hook function when the progress complete. Default `true`
  
* `h5Preloader` instance supports the following methods:
  * `load()`: Start preloader.
  * `progressComplete()`: Call the progress complete function manually.

## CDN
[![jsdelivr][jsdelivr-image]][jsdelivr-url]

To use via a CDN include this in your HTML:
```text
<script src="https://cdn.jsdelivr.net/npm/@cycjimmy/h5-preloader@4/dist/h5-preloader.umd.min.js"></script>
```

<!-- Links: -->
[npm-image]: https://img.shields.io/npm/v/@cycjimmy/h5-preloader
[npm-url]: https://npmjs.org/package/@cycjimmy/h5-preloader
[npm-bundle-size-image]: https://img.shields.io/bundlephobia/min/@cycjimmy/h5-preloader

[download-image]: https://img.shields.io/npm/dt/@cycjimmy/h5-preloader
[download-url]: https://npmjs.org/package/@cycjimmy/h5-preloader

[jsdelivr-image]: https://img.shields.io/jsdelivr/npm/hy/@cycjimmy/h5-preloader
[jsdelivr-url]: https://www.jsdelivr.com/package/npm/@cycjimmy/h5-preloader

[workflows-badge-image]: https://github.com/cycjimmy/h5-preloader/workflows/Test%20CI/badge.svg

[libraries-status-image]: https://img.shields.io/librariesio/release/npm/@cycjimmy/h5-preloader
[libraries-sourcerank-image]: https://img.shields.io/librariesio/sourcerank/npm/@cycjimmy/h5-preloader
[libraries-status-url]: https://libraries.io/github/cycjimmy/h5-preloader
[libraries-sourcerank-url]: https://libraries.io/npm/@cycjimmy%2Fh5-preloader

[coverage-image]: https://img.shields.io/coveralls/github/cycjimmy/h5-preloader
[coverage-url]: https://coveralls.io/github/cycjimmy/h5-preloader

[release-date-image]: https://img.shields.io/github/release-date/cycjimmy/h5-preloader
[release-url]: https://github.com/cycjimmy/h5-preloader/releases

[rollup-image]: https://img.shields.io/github/package-json/dependency-version/cycjimmy/h5-preloader/dev/rollup
[rollup-url]: https://github.com/rollup/rollup

[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release

[jest-image]: https://img.shields.io/badge/tested_with-jest-99424f.svg
[jest-url]: https://github.com/facebook/jest

[license-image]: https://img.shields.io/npm/l/@cycjimmy/h5-preloader

[github-pages-url]: https://cycjimmy.github.io/h5-preloader/

