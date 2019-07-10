/*!
 * h5-preloader v0.0.2
 * Homepage: https://github.com/cycdpo/h5-preloader#readme
 * Released under the MIT License.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["h5Preloader"] = factory();
	else
		root["h5Preloader"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ProgressBar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var ResLoader_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var awesome_js_funcs_designPattern_CreateInstance__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);




var _instance = new awesome_js_funcs_designPattern_CreateInstance__WEBPACK_IMPORTED_MODULE_2__["default"]();

var H5Preloader =
/*#__PURE__*/
function () {
  /**
   * H5Preloader
   * @param type
   * @param eProgressBar
   * @param eProgressBarPercent
   * @param baseUrl
   * @param resources
   * @param hookWhenProgressComplete
   * @param autoComplete
   */
  function H5Preloader(_temp) {
    var _this = this;

    var _ref = _temp === void 0 ? {} : _temp,
        _ref$type = _ref.type,
        type = _ref$type === void 0 ? 'progressBar' : _ref$type,
        _ref$progressBar = _ref.progressBar;

    _ref$progressBar = _ref$progressBar === void 0 ? {} : _ref$progressBar;
    var eProgressBar = _ref$progressBar.eProgressBar,
        eProgressBarPercent = _ref$progressBar.eProgressBarPercent,
        _ref$baseUrl = _ref.baseUrl,
        baseUrl = _ref$baseUrl === void 0 ? './' : _ref$baseUrl,
        _ref$resources = _ref.resources,
        resources = _ref$resources === void 0 ? [] : _ref$resources,
        _ref$hookWhenProgress = _ref.hookWhenProgressComplete,
        hookWhenProgressComplete = _ref$hookWhenProgress === void 0 ? function () {} : _ref$hookWhenProgress,
        _ref$autoComplete = _ref.autoComplete,
        autoComplete = _ref$autoComplete === void 0 ? true : _ref$autoComplete;
    this.type = type;

    switch (this.type) {
      case 'progressBar':
        this.progress = new ProgressBar__WEBPACK_IMPORTED_MODULE_0__["default"]({
          eProgressBar: eProgressBar,
          eProgressBarPercent: eProgressBarPercent,
          hookWhenProgressComplete: hookWhenProgressComplete
        });
        break;

      default:
        this.progress = null;
    }

    this.resLoader = new ResLoader_service__WEBPACK_IMPORTED_MODULE_1__["default"]({
      baseUrl: baseUrl
    }).setResources(resources).setHooks({
      onStart: function onStart() {
        return _this.progress.setProgress(4);
      },
      onProgress: function onProgress(currentIndex, total) {
        var percent = Number.parseInt(currentIndex / total * 92, 10) + 4;

        _this.progress.setProgress(percent); // 4% ~ 96%

      },
      onComplete: function onComplete() {
        _this.progress.setProgress(98);

        if (autoComplete) {
          setTimeout(function () {
            return _this.progressComplete();
          }, 500);
        }
      }
    });
  }

  var _proto = H5Preloader.prototype;

  _proto.load = function load() {
    return this.resLoader.start();
  };

  _proto.progressComplete = function progressComplete() {
    return this.progress.progressComplete();
  };

  return H5Preloader;
}();

/* harmony default export */ __webpack_exports__["default"] = (function (param) {
  if (_instance()) {
    return _instance();
  }

  var h5Preloader = new H5Preloader(param);

  _instance(h5Preloader);

  return h5Preloader;
});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ProgressBar; });
/* harmony import */ var Progress__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }



var ProgressBar =
/*#__PURE__*/
function (_Progress) {
  _inheritsLoose(ProgressBar, _Progress);

  /**
   * ProgressBar
   * @param eProgressBar
   * @param progressPercentText
   */
  function ProgressBar(_ref) {
    var _this;

    var eProgressBar = _ref.eProgressBar,
        eProgressBarPercent = _ref.eProgressBarPercent,
        hookWhenProgressComplete = _ref.hookWhenProgressComplete;
    _this = _Progress.call(this, {
      hookWhenProgressComplete: hookWhenProgressComplete
    }) || this;
    _this.els.eProgressBar = eProgressBar;
    _this.els.eProgressBarPercent = eProgressBarPercent;
    _this.els.eProgressBar.style.cssText = 'transform: scaleX(0);' + 'transform-origin: 0 50%;' + 'transition: transform .2s;';
    return _this;
  }

  var _proto = ProgressBar.prototype;

  _proto.setProgress = function setProgress(percent) {
    if (percent > this.percent) {
      this.percent = percent;

      if (this.els.eProgressBar) {
        this.els.eProgressBar.style.transform = 'scaleX(' + percent / 100 + ')';
      }

      if (this.els.eProgressBarPercent) {
        this.els.eProgressBarPercent.textContent = percent;
      }
    }

    return this;
  };

  return ProgressBar;
}(Progress__WEBPACK_IMPORTED_MODULE_0__["default"]);


;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Progress; });
var Progress =
/*#__PURE__*/
function () {
  /**
   * Progress
   * @param hookWhenProgressComplete
   */
  function Progress(_ref) {
    var _ref$hookWhenProgress = _ref.hookWhenProgressComplete,
        hookWhenProgressComplete = _ref$hookWhenProgress === void 0 ? function () {} : _ref$hookWhenProgress;
    this.els = {};
    this.percent = 0;
    this.hookWhenProgressComplete = hookWhenProgressComplete;
  }

  var _proto = Progress.prototype;

  _proto.setProgress = function setProgress() {
    return this;
  };

  /**
   * progressComplete
   * @returns {Promise.<any>}
   */
  _proto.progressComplete = function progressComplete() {
    var _this = this;

    return new Promise(function (resolve, reject) {
      if (document.readyState === 'complete') {
        _this.setProgress(100);

        setTimeout(function () {
          _this.hookWhenProgressComplete();

          resolve();
        }, 200);
      } else {
        setTimeout(reject, 1000);
      }
    })["catch"](function () {
      return _this.progressComplete();
    });
  };

  return Progress;
}();


;

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ResLoaderService; });
var ResLoaderService =
/*#__PURE__*/
function () {
  /**
   * ResLoaderService
   * @param baseUrl:
   */
  function ResLoaderService(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$baseUrl = _ref.baseUrl,
        baseUrl = _ref$baseUrl === void 0 ? './' : _ref$baseUrl;

    this.baseUrl = baseUrl;
    this.resources = [];
    this.hooks = {}; // status: 0:not initiated   1:loading   2:loaded

    this.status = 0; // Total number of resources

    this.total = 0; // The resource index currently being loaded

    this.currentIndex = 0;
  }

  var _proto = ResLoaderService.prototype;

  /**
   * setResources
   * @param resources[]: Resource paths array
   * @returns {ResLoaderService}
   */
  _proto.setResources = function setResources(resources) {
    if (resources === void 0) {
      resources = [];
    }

    this.resources = resources;
    this.total = this.resources.length || 0;
    return this;
  };

  /**
   * setHooks
   * @param onStart: The hook function when start. Param: total
   * @param onProgress: The hook function when loading. Param: currentIndex, total
   * @param onComplete: The hook function when loaded. Param: total
   * @returns {ResLoaderService}
   */
  _proto.setHooks = function setHooks(_temp2) {
    var _ref2 = _temp2 === void 0 ? {} : _temp2,
        _ref2$onStart = _ref2.onStart,
        onStart = _ref2$onStart === void 0 ? function (total) {} : _ref2$onStart,
        _ref2$onProgress = _ref2.onProgress,
        onProgress = _ref2$onProgress === void 0 ? function (currentIndex, total) {} : _ref2$onProgress,
        _ref2$onComplete = _ref2.onComplete,
        onComplete = _ref2$onComplete === void 0 ? function (total) {} : _ref2$onComplete;

    this.hooks = {
      onStart: onStart,
      onProgress: onProgress,
      onComplete: onComplete
    };
    return this;
  };

  _proto.start = function start() {
    var _this = this;

    this.status = 1;

    if (this.hooks.onStart) {
      this.hooks.onStart(this.total);
    }

    if (!this.resources.length) {
      this._complete();

      return;
    }

    this.resources.forEach(function (res) {
      var image = new Image();
      var url = '';

      if (res.indexOf('http://') === 0 || res.indexOf('https://') === 0) {
        url = res;
      } else {
        url = _this.baseUrl + res;
      }

      image.onload = function () {
        _this.resLoaded();
      };

      image.onerror = function () {
        _this.resLoaded();
      };

      image.src = url;
    });
  };

  /**
   * resLoaded
   */
  _proto.resLoaded = function resLoaded() {
    if (this.hooks.onProgress) {
      this.hooks.onProgress(++this.currentIndex, this.total);
    } // Complete


    if (this.currentIndex !== this.total) {
      return;
    }

    this.status = 2;

    this._complete();
  };

  /**
   * getStatus
   * @returns {number}
   */
  _proto.getStatus = function getStatus() {
    return this.status;
  };

  /**
   * _complete
   * @private
   */
  _proto._complete = function _complete() {
    if (this.hooks.onComplete) {
      this.hooks.onComplete(this.total);
    }
  };

  return ResLoaderService;
}();


;

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * 单例模式构造函数(设计模式)
 * @returns {function(*=)}
 * @constructor
 */
/* harmony default export */ __webpack_exports__["default"] = (function () {
  var instance;
  return function (newInstance) {
    if (newInstance) {
      instance = newInstance;
    }

    return instance;
  };
});

/***/ })
/******/ ])["default"];
});