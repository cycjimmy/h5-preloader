# H5 Preloader

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![David deps][david-image]][david-url]
[![devDependencies Status][david-dev-image]][david-dev-url]
[![npm download][download-image]][download-url]
[![jsdelivr][jsdelivr-image]][jsdelivr-url]
[![npm license][license-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/@cycjimmy/h5-preloader.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@cycjimmy/h5-preloader
[travis-image]: https://img.shields.io/travis/cycjimmy/h5-preloader.svg?style=flat-square
[travis-url]: https://travis-ci.org/cycjimmy/h5-preloader
[david-image]: https://img.shields.io/david/cycjimmy/h5-preloader.svg?style=flat-square
[david-url]: https://david-dm.org/cycjimmy/h5-preloader
[david-dev-image]: https://david-dm.org/cycjimmy/h5-preloader/dev-status.svg?style=flat-square
[david-dev-url]: https://david-dm.org/cycjimmy/h5-preloader?type=dev
[download-image]: https://img.shields.io/npm/dm/@cycjimmy/h5-preloader.svg?style=flat-square
[download-url]: https://npmjs.org/package/@cycjimmy/h5-preloader
[jsdelivr-image]: https://data.jsdelivr.com/v1/package/npm/@cycjimmy/h5-preloader/badge
[jsdelivr-url]: https://www.jsdelivr.com/package/npm/@cycjimmy/h5-preloader
[license-image]: https://img.shields.io/npm/l/@cycjimmy/h5-preloader.svg?style=flat-square

([Releases](https://github.com/cycjimmy/h5-preloader/releases) | [Demo](https://cycjimmy.github.io/h5-preloader/))

## Install
```shell
# via npm
$ npm install @cycjimmy/h5-preloader --save

# or via yarn
$ yarn add @cycjimmy/h5-preloader
```

## Usage
```javascript
import h5Preloader from '@cycjimmy/h5-preloader';

// OR
const h5Preloader = require('@cycjimmy/h5-preloader');

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
  * baseUrl: [Option][String] Base url for Resource paths. Default `'./'`
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
To use via a CDN include this in your HTML:
```text
<script src="https://cdn.jsdelivr.net/npm/@cycjimmy/h5-preloader@1/build/h5-preloader.min.js"></script>
```

