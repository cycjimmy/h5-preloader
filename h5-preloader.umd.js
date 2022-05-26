(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.h5Preloader = factory());
})(this, (function () { 'use strict';

  /**
   * singleton constructor(design patterns)
   * @returns {function(*=)}
   * @constructor
   */
  var CreateInstance = (() => {
    var instance;
    return newInstance => {
      if (newInstance) {
        instance = newInstance;
      }

      return instance;
    };
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  var Progress = /*#__PURE__*/function () {
    /**
     * Progress
     * @param hookWhenProgressComplete
     */
    function Progress() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$hookWhenProgress = _ref.hookWhenProgressComplete,
          hookWhenProgressComplete = _ref$hookWhenProgress === void 0 ? function () {} : _ref$hookWhenProgress;

      _classCallCheck(this, Progress);

      this.els = {};
      this.percent = 0;
      this.hookWhenProgressComplete = hookWhenProgressComplete;
    }
    /**
     * setProgress
     * @param percent
     * @returns {Progress}
     */


    _createClass(Progress, [{
      key: "setProgress",
      value: function setProgress(percent) {
        if (percent > this.percent) {
          this.percent = percent;
        }

        return this;
      }
      /**
       * progressComplete
       * @returns {Promise.<any>}
       */

    }, {
      key: "progressComplete",
      value: function progressComplete() {
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
      }
    }]);

    return Progress;
  }();

  var ProgressBar = /*#__PURE__*/function (_Progress) {
    _inherits(ProgressBar, _Progress);

    var _super = _createSuper(ProgressBar);

    /**
     * ProgressBar
     * @param eProgressBar
     * @param progressPercentText
     */
    function ProgressBar() {
      var _this;

      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          eProgressBar = _ref.eProgressBar,
          eProgressBarPercent = _ref.eProgressBarPercent,
          hookWhenProgressComplete = _ref.hookWhenProgressComplete;

      _classCallCheck(this, ProgressBar);

      _this = _super.call(this, {
        hookWhenProgressComplete: hookWhenProgressComplete
      });
      _this.els.eProgressBar = eProgressBar;
      _this.els.eProgressBarPercent = eProgressBarPercent;

      if (_this.els.eProgressBar) {
        _this.els.eProgressBar.style.cssText = 'transform: scaleX(0); transform-origin: 0 50%; transition: transform .1s;';
      }

      return _this;
    }
    /**
     * setProgress
     * @param percent
     * @returns {ProgressBar}
     */


    _createClass(ProgressBar, [{
      key: "setProgress",
      value: function setProgress(percent) {
        if (percent > this.percent) {
          this.percent = percent;

          if (this.els.eProgressBar) {
            this.els.eProgressBar.style.transform = "scaleX(".concat(percent * 0.01, ")");
          }

          if (this.els.eProgressBarPercent) {
            this.els.eProgressBarPercent.textContent = percent;
          }
        }

        return this;
      }
    }]);

    return ProgressBar;
  }(Progress);

  /*!
   * type-signals - v1.1.0
   * https://github.com/englercj/type-signals
   * Compiled Wed, 22 Apr 2020 17:58:58 UTC
   *
   * type-signals is licensed under the MIT license.
   * http://www.opensource.org/licenses/mit-license
   */
  var SignalBindingImpl = function () {
    function SignalBindingImpl(fn, once, thisArg) {
      if (once === void 0) {
        once = false;
      }

      this.next = null;
      this.prev = null;
      this.owner = null;
      this.fn = fn;
      this.once = once;
      this.thisArg = thisArg;
    }

    SignalBindingImpl.prototype.detach = function () {
      if (this.owner === null) return false;
      this.owner.detach(this);
      return true;
    };

    SignalBindingImpl.prototype.dispose = function () {
      this.detach();
    };

    return SignalBindingImpl;
  }();

  var Signal = function () {
    function Signal() {
      this._head = null;
      this._tail = null;
      this._filter = null;
    }

    Signal.prototype.handlers = function () {
      var node = this._head;
      var handlers = [];

      while (node) {
        handlers.push(node);
        node = node.next;
      }

      return handlers;
    };

    Signal.prototype.hasAny = function () {
      return !!this._head;
    };

    Signal.prototype.has = function (node) {
      return node.owner === this;
    };

    Signal.prototype.dispatch = function () {
      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      var node = this._head;
      if (!node) return false;
      if (this._filter && !this._filter.apply(this, args)) return false;

      while (node) {
        if (node.once) this.detach(node);
        node.fn.apply(node.thisArg, args);
        node = node.next;
      }

      return true;
    };

    Signal.prototype.add = function (fn, thisArg) {
      if (thisArg === void 0) {
        thisArg = null;
      }

      return this._addSignalBinding(new SignalBindingImpl(fn, false, thisArg));
    };

    Signal.prototype.once = function (fn, thisArg) {
      if (thisArg === void 0) {
        thisArg = null;
      }

      return this._addSignalBinding(new SignalBindingImpl(fn, true, thisArg));
    };

    Signal.prototype.detach = function (node_) {
      var node = node_;
      if (node.owner !== this) return this;
      if (node.prev) node.prev.next = node.next;
      if (node.next) node.next.prev = node.prev;

      if (node === this._head) {
        this._head = node.next;

        if (node.next === null) {
          this._tail = null;
        }
      } else if (node === this._tail) {
        this._tail = node.prev;
        if (this._tail) this._tail.next = null;
      }

      node.owner = null;
      return this;
    };

    Signal.prototype.detachAll = function () {
      var node = this._head;
      if (!node) return this;
      this._head = null;
      this._tail = null;

      while (node) {
        node.owner = null;
        node = node.next;
      }

      return this;
    };

    Signal.prototype.filter = function (filter) {
      this._filter = filter;
    };

    Signal.prototype.proxy = function () {
      var _this = this;

      var signals = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        signals[_i] = arguments[_i];
      }

      var fn = function () {
        var args = [];

        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }

        return _this.dispatch.apply(_this, args);
      };

      for (var i = 0; i < signals.length; ++i) {
        signals[i].add(fn);
      }

      return this;
    };

    Signal.prototype._addSignalBinding = function (node_) {
      var node = node_;

      if (!this._head) {
        this._head = node;
        this._tail = node;
      } else {
        if (this._tail) this._tail.next = node;
        node.prev = this._tail;
        this._tail = node;
      }

      node.owner = this;
      return node;
    };

    return Signal;
  }();

  var src = (str, opts = {}) => {
    if (!str) return undefined;
    const o = {
      key: ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'],
      q: {
        name: 'queryKey',
        parser: /(?:^|&)([^&=]*)=?([^&]*)/g
      },
      parser: {
        strict: /^(?:([^:/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:/?#]*)(?::(\d*))?))?((((?:[^?#/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
        loose: /^(?:(?![^:@]+:[^:@/]*@)([^:/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#/]*\.[^?#/.]+(?:[?#]|$)))*\/?)?([^?#/]*))(?:\?([^#]*))?(?:#(.*))?)/
      }
    };
    const m = o.parser[opts.strictMode ? 'strict' : 'loose'].exec(str);
    const uri = {};
    let i = 14;

    while (i--) uri[o.key[i]] = m[i] || '';

    uri[o.q.name] = {};
    uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
      if ($1) uri[o.q.name][$1] = $2;
    });
    return uri;
  };

  /*!
   * resource-loader - v4.0.0-rc4
   * https://github.com/englercj/resource-loader
   * Compiled Sun, 08 Mar 2020 16:55:29 UTC
   *
   * resource-loader is licensed under the MIT license.
   * http://www.opensource.org/licenses/mit-license
   */

  var AbstractLoadStrategy = function () {
    function AbstractLoadStrategy(config) {
      this.config = config;
      this.onError = new Signal();
      this.onComplete = new Signal();
      this.onProgress = new Signal();
    }

    return AbstractLoadStrategy;
  }();
  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0

  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.

  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** */

  /* global Reflect, Promise */


  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  function __extends(d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }

  function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

    for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

    return r;
  }

  function getExtension(url) {
    var isDataUrl = url.indexOf('data:') === 0;
    var ext = '';

    if (isDataUrl) {
      var slashIndex = url.indexOf('/');
      ext = url.substring(slashIndex + 1, url.indexOf(';', slashIndex));
    } else {
      var queryStart = url.indexOf('?');
      var hashStart = url.indexOf('#');
      var index = Math.min(queryStart > -1 ? queryStart : url.length, hashStart > -1 ? hashStart : url.length);
      url = url.substring(0, index);
      ext = url.substring(url.lastIndexOf('.') + 1);
    }

    return ext.toLowerCase();
  }

  function assertNever(x) {
    throw new Error('Unexpected value. Should have been never.');
  }

  var ResourceType;

  (function (ResourceType) {
    ResourceType[ResourceType["Unknown"] = 0] = "Unknown";
    ResourceType[ResourceType["Buffer"] = 1] = "Buffer";
    ResourceType[ResourceType["Blob"] = 2] = "Blob";
    ResourceType[ResourceType["Json"] = 3] = "Json";
    ResourceType[ResourceType["Xml"] = 4] = "Xml";
    ResourceType[ResourceType["Image"] = 5] = "Image";
    ResourceType[ResourceType["Audio"] = 6] = "Audio";
    ResourceType[ResourceType["Video"] = 7] = "Video";
    ResourceType[ResourceType["Text"] = 8] = "Text";
  })(ResourceType || (ResourceType = {}));

  var ResourceState;

  (function (ResourceState) {
    ResourceState[ResourceState["NotStarted"] = 0] = "NotStarted";
    ResourceState[ResourceState["Loading"] = 1] = "Loading";
    ResourceState[ResourceState["Complete"] = 2] = "Complete";
  })(ResourceState || (ResourceState = {}));

  var MediaElementLoadStrategy = function (_super) {
    __extends(MediaElementLoadStrategy, _super);

    function MediaElementLoadStrategy(config, elementType) {
      var _this = _super.call(this, config) || this;

      _this.elementType = elementType;
      _this._boundOnLoad = _this._onLoad.bind(_this);
      _this._boundOnError = _this._onError.bind(_this);
      _this._boundOnTimeout = _this._onTimeout.bind(_this);
      _this._element = _this._createElement();
      _this._elementTimer = 0;
      return _this;
    }

    MediaElementLoadStrategy.prototype.load = function () {
      var config = this.config;
      if (config.crossOrigin) this._element.crossOrigin = config.crossOrigin;
      var urls = config.sourceSet || [config.url];

      if (navigator.isCocoonJS) {
        this._element.src = urls[0];
      } else {
        for (var i = 0; i < urls.length; ++i) {
          var url = urls[i];
          var mimeType = config.mimeTypes ? config.mimeTypes[i] : undefined;
          if (!mimeType) mimeType = this.elementType + "/" + getExtension(url);
          var source = document.createElement('source');
          source.src = url;
          source.type = mimeType;

          this._element.appendChild(source);
        }
      }

      this._element.addEventListener('load', this._boundOnLoad, false);

      this._element.addEventListener('canplaythrough', this._boundOnLoad, false);

      this._element.addEventListener('error', this._boundOnError, false);

      this._element.load();

      if (config.timeout) this._elementTimer = window.setTimeout(this._boundOnTimeout, config.timeout);
    };

    MediaElementLoadStrategy.prototype.abort = function () {
      this._clearEvents();

      while (this._element.firstChild) {
        this._element.removeChild(this._element.firstChild);
      }

      this._error(this.elementType + " load aborted by the user.");
    };

    MediaElementLoadStrategy.prototype._createElement = function () {
      if (this.config.loadElement) return this.config.loadElement;else return document.createElement(this.elementType);
    };

    MediaElementLoadStrategy.prototype._clearEvents = function () {
      clearTimeout(this._elementTimer);

      this._element.removeEventListener('load', this._boundOnLoad, false);

      this._element.removeEventListener('canplaythrough', this._boundOnLoad, false);

      this._element.removeEventListener('error', this._boundOnError, false);
    };

    MediaElementLoadStrategy.prototype._error = function (errMessage) {
      this._clearEvents();

      this.onError.dispatch(errMessage);
    };

    MediaElementLoadStrategy.prototype._complete = function () {
      this._clearEvents();

      var resourceType = ResourceType.Unknown;

      switch (this.elementType) {
        case 'audio':
          resourceType = ResourceType.Audio;
          break;

        case 'video':
          resourceType = ResourceType.Video;
          break;

        default:
          assertNever(this.elementType);
      }

      this.onComplete.dispatch(resourceType, this._element);
    };

    MediaElementLoadStrategy.prototype._onLoad = function () {
      this._complete();
    };

    MediaElementLoadStrategy.prototype._onError = function () {
      this._error(this.elementType + " failed to load.");
    };

    MediaElementLoadStrategy.prototype._onTimeout = function () {
      this._error(this.elementType + " load timed out.");
    };

    return MediaElementLoadStrategy;
  }(AbstractLoadStrategy);

  var AudioLoadStrategy = function (_super) {
    __extends(AudioLoadStrategy, _super);

    function AudioLoadStrategy(config) {
      return _super.call(this, config, 'audio') || this;
    }

    return AudioLoadStrategy;
  }(MediaElementLoadStrategy);

  var EMPTY_GIF = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

  var ImageLoadStrategy = function (_super) {
    __extends(ImageLoadStrategy, _super);

    function ImageLoadStrategy() {
      var _this = _super !== null && _super.apply(this, arguments) || this;

      _this._boundOnLoad = _this._onLoad.bind(_this);
      _this._boundOnError = _this._onError.bind(_this);
      _this._boundOnTimeout = _this._onTimeout.bind(_this);
      _this._element = _this._createElement();
      _this._elementTimer = 0;
      return _this;
    }

    ImageLoadStrategy.prototype.load = function () {
      var config = this.config;
      if (config.crossOrigin) this._element.crossOrigin = config.crossOrigin;
      this._element.src = config.url;

      this._element.addEventListener('load', this._boundOnLoad, false);

      this._element.addEventListener('error', this._boundOnError, false);

      if (config.timeout) this._elementTimer = window.setTimeout(this._boundOnTimeout, config.timeout);
    };

    ImageLoadStrategy.prototype.abort = function () {
      this._clearEvents();

      this._element.src = EMPTY_GIF;

      this._error('Image load aborted by the user.');
    };

    ImageLoadStrategy.prototype._createElement = function () {
      if (this.config.loadElement) return this.config.loadElement;else return document.createElement('img');
    };

    ImageLoadStrategy.prototype._clearEvents = function () {
      clearTimeout(this._elementTimer);

      this._element.removeEventListener('load', this._boundOnLoad, false);

      this._element.removeEventListener('error', this._boundOnError, false);
    };

    ImageLoadStrategy.prototype._error = function (errMessage) {
      this._clearEvents();

      this.onError.dispatch(errMessage);
    };

    ImageLoadStrategy.prototype._complete = function () {
      this._clearEvents();

      this.onComplete.dispatch(ResourceType.Image, this._element);
    };

    ImageLoadStrategy.prototype._onLoad = function () {
      this._complete();
    };

    ImageLoadStrategy.prototype._onError = function () {
      this._error('Image failed to load.');
    };

    ImageLoadStrategy.prototype._onTimeout = function () {
      this._error('Image load timed out.');
    };

    return ImageLoadStrategy;
  }(AbstractLoadStrategy);

  var VideoLoadStrategy = function (_super) {
    __extends(VideoLoadStrategy, _super);

    function VideoLoadStrategy(config) {
      return _super.call(this, config, 'video') || this;
    }

    return VideoLoadStrategy;
  }(MediaElementLoadStrategy);

  var useXdr = !!(window.XDomainRequest && !('withCredentials' in new XMLHttpRequest()));
  var XhrResponseType;

  (function (XhrResponseType) {
    XhrResponseType["Default"] = "text";
    XhrResponseType["Buffer"] = "arraybuffer";
    XhrResponseType["Blob"] = "blob";
    XhrResponseType["Document"] = "document";
    XhrResponseType["Json"] = "json";
    XhrResponseType["Text"] = "text";
  })(XhrResponseType || (XhrResponseType = {}));

  function reqType(xhr) {
    return xhr.toString().replace('object ', '');
  }

  var XhrLoadStrategy = function (_super) {
    __extends(XhrLoadStrategy, _super);

    function XhrLoadStrategy() {
      var _this = _super !== null && _super.apply(this, arguments) || this;

      _this._boundOnLoad = _this._onLoad.bind(_this);
      _this._boundOnAbort = _this._onAbort.bind(_this);
      _this._boundOnError = _this._onError.bind(_this);
      _this._boundOnTimeout = _this._onTimeout.bind(_this);
      _this._boundOnProgress = _this._onProgress.bind(_this);
      _this._xhr = _this._createRequest();
      _this._xhrType = XhrResponseType.Default;
      return _this;
    }

    XhrLoadStrategy.prototype.load = function () {
      var config = this.config;
      var ext = getExtension(config.url);

      if (typeof config.xhrType !== 'string') {
        config.xhrType = this._determineXhrType(ext);
      }

      var xhr = this._xhr;
      this._xhrType = config.xhrType || XhrResponseType.Default;

      if (useXdr) {
        xhr.timeout = config.timeout || 5000;
        xhr.onload = this._boundOnLoad;
        xhr.onerror = this._boundOnError;
        xhr.ontimeout = this._boundOnTimeout;
        xhr.onprogress = this._boundOnProgress;
        xhr.open('GET', config.url, true);
        setTimeout(function () {
          xhr.send();
        }, 0);
      } else {
        xhr.open('GET', config.url, true);
        if (config.timeout) xhr.timeout = config.timeout;
        if (config.xhrType === XhrResponseType.Json || config.xhrType === XhrResponseType.Document) xhr.responseType = XhrResponseType.Text;else xhr.responseType = config.xhrType;
        xhr.addEventListener('load', this._boundOnLoad, false);
        xhr.addEventListener('abort', this._boundOnAbort, false);
        xhr.addEventListener('error', this._boundOnError, false);
        xhr.addEventListener('timeout', this._boundOnTimeout, false);
        xhr.addEventListener('progress', this._boundOnProgress, false);
        xhr.send();
      }
    };

    XhrLoadStrategy.prototype.abort = function () {
      if (useXdr) {
        this._clearEvents();

        this._xhr.abort();

        this._onAbort();
      } else {
        this._xhr.abort();
      }
    };

    XhrLoadStrategy.prototype._createRequest = function () {
      if (useXdr) return new window.XDomainRequest();else return new XMLHttpRequest();
    };

    XhrLoadStrategy.prototype._determineXhrType = function (ext) {
      return XhrLoadStrategy._xhrTypeMap[ext] || XhrResponseType.Default;
    };

    XhrLoadStrategy.prototype._clearEvents = function () {
      if (useXdr) {
        this._xhr.onload = null;
        this._xhr.onerror = null;
        this._xhr.ontimeout = null;
        this._xhr.onprogress = null;
      } else {
        this._xhr.removeEventListener('load', this._boundOnLoad, false);

        this._xhr.removeEventListener('abort', this._boundOnAbort, false);

        this._xhr.removeEventListener('error', this._boundOnError, false);

        this._xhr.removeEventListener('timeout', this._boundOnTimeout, false);

        this._xhr.removeEventListener('progress', this._boundOnProgress, false);
      }
    };

    XhrLoadStrategy.prototype._error = function (errMessage) {
      this._clearEvents();

      this.onError.dispatch(errMessage);
    };

    XhrLoadStrategy.prototype._complete = function (type, data) {
      this._clearEvents();

      this.onComplete.dispatch(type, data);
    };

    XhrLoadStrategy.prototype._onLoad = function () {
      var xhr = this._xhr;
      var text = '';
      var status = typeof xhr.status === 'undefined' ? 200 : xhr.status;

      if (typeof xhr.responseType === 'undefined' || xhr.responseType === '' || xhr.responseType === 'text') {
        text = xhr.responseText;
      }

      if (status === 0 && (text.length > 0 || xhr.responseType === XhrResponseType.Buffer)) {
        status = 200;
      } else if (status === 1223) {
        status = 204;
      }

      var flattenedStatus = Math.floor(status / 100) * 100;

      if (flattenedStatus !== 200) {
        this._error("[" + xhr.status + "] " + xhr.statusText + ": " + xhr.responseURL);

        return;
      }

      switch (this._xhrType) {
        case XhrResponseType.Buffer:
          this._complete(ResourceType.Buffer, xhr.response);

          break;

        case XhrResponseType.Blob:
          this._complete(ResourceType.Blob, xhr.response);

          break;

        case XhrResponseType.Document:
          this._parseDocument(text);

          break;

        case XhrResponseType.Json:
          this._parseJson(text);

          break;

        case XhrResponseType.Default:
        case XhrResponseType.Text:
          this._complete(ResourceType.Text, text);

          break;

        default:
          assertNever(this._xhrType);
      }
    };

    XhrLoadStrategy.prototype._parseDocument = function (text) {
      try {
        if (window.DOMParser) {
          var parser = new DOMParser();
          var data = parser.parseFromString(text, 'text/xml');

          this._complete(ResourceType.Xml, data);
        } else {
          var div = document.createElement('div');
          div.innerHTML = text;

          this._complete(ResourceType.Xml, div);
        }
      } catch (e) {
        this._error("Error trying to parse loaded xml: " + e);
      }
    };

    XhrLoadStrategy.prototype._parseJson = function (text) {
      try {
        var data = JSON.parse(text);

        this._complete(ResourceType.Json, data);
      } catch (e) {
        this._error("Error trying to parse loaded json: " + e);
      }
    };

    XhrLoadStrategy.prototype._onAbort = function () {
      var xhr = this._xhr;

      this._error(reqType(xhr) + " Request was aborted by the user.");
    };

    XhrLoadStrategy.prototype._onError = function () {
      var xhr = this._xhr;

      this._error(reqType(xhr) + " Request failed. Status: " + xhr.status + ", text: \"" + xhr.statusText + "\"");
    };

    XhrLoadStrategy.prototype._onTimeout = function () {
      var xhr = this._xhr;

      this._error(reqType(xhr) + " Request timed out.");
    };

    XhrLoadStrategy.prototype._onProgress = function (event) {
      if (event && event.lengthComputable) {
        this.onProgress.dispatch(event.loaded / event.total);
      }
    };

    XhrLoadStrategy.setExtensionXhrType = function (extname, xhrType) {
      if (extname && extname.indexOf('.') === 0) extname = extname.substring(1);
      if (!extname) return;
      XhrLoadStrategy._xhrTypeMap[extname] = xhrType;
    };

    XhrLoadStrategy.ResponseType = XhrResponseType;
    XhrLoadStrategy._xhrTypeMap = {
      xhtml: XhrResponseType.Document,
      html: XhrResponseType.Document,
      htm: XhrResponseType.Document,
      xml: XhrResponseType.Document,
      tmx: XhrResponseType.Document,
      svg: XhrResponseType.Document,
      tsx: XhrResponseType.Document,
      gif: XhrResponseType.Blob,
      png: XhrResponseType.Blob,
      bmp: XhrResponseType.Blob,
      jpg: XhrResponseType.Blob,
      jpeg: XhrResponseType.Blob,
      tif: XhrResponseType.Blob,
      tiff: XhrResponseType.Blob,
      webp: XhrResponseType.Blob,
      tga: XhrResponseType.Blob,
      json: XhrResponseType.Json,
      text: XhrResponseType.Text,
      txt: XhrResponseType.Text,
      ttf: XhrResponseType.Buffer,
      otf: XhrResponseType.Buffer
    };
    return XhrLoadStrategy;
  }(AbstractLoadStrategy);

  function onlyOnce(func) {
    var fn = func;
    return function onceWrapper() {
      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      if (fn === null) throw new Error('Callback was already called.');
      var callFn = fn;
      fn = null;
      return callFn.apply(this, args);
    };
  }

  var AsyncQueue = function () {
    function AsyncQueue(worker, concurrency) {
      if (concurrency === void 0) {
        concurrency = 1;
      }

      this.worker = worker;
      this.concurrency = concurrency;
      this.workers = 0;
      this.buffer = 0;
      this.paused = false;
      this._started = false;
      this._tasks = [];
      this.onSaturated = new Signal();
      this.onUnsaturated = new Signal();
      this.onEmpty = new Signal();
      this.onDrain = new Signal();
      this.onError = new Signal();
      if (concurrency === 0) throw new Error('Concurrency must not be zero');
      this.buffer = concurrency / 4;
    }

    Object.defineProperty(AsyncQueue.prototype, "started", {
      get: function () {
        return this._started;
      },
      enumerable: true,
      configurable: true
    });

    AsyncQueue.prototype.reset = function () {
      this.onDrain.detachAll();
      this.workers = 0;
      this._started = false;
      this._tasks = [];
    };

    AsyncQueue.prototype.push = function (data, callback) {
      this._insert(data, false, callback);
    };

    AsyncQueue.prototype.unshift = function (data, callback) {
      this._insert(data, true, callback);
    };

    AsyncQueue.prototype.process = function () {
      while (!this.paused && this.workers < this.concurrency && this._tasks.length) {
        var task = this._tasks.shift();

        if (this._tasks.length === 0) this.onEmpty.dispatch();
        this.workers += 1;
        if (this.workers === this.concurrency) this.onSaturated.dispatch();
        this.worker(task.data, onlyOnce(this._next(task)));
      }
    };

    AsyncQueue.prototype.length = function () {
      return this._tasks.length;
    };

    AsyncQueue.prototype.running = function () {
      return this.workers;
    };

    AsyncQueue.prototype.idle = function () {
      return this._tasks.length + this.workers === 0;
    };

    AsyncQueue.prototype.pause = function () {
      if (this.paused === true) return;
      this.paused = true;
    };

    AsyncQueue.prototype.resume = function () {
      if (this.paused === false) return;
      this.paused = false;

      for (var w = 1; w <= this.concurrency; w++) {
        this.process();
      }
    };

    AsyncQueue.prototype.getTask = function (index) {
      return this._tasks[index];
    };

    AsyncQueue.prototype._insert = function (data, insertAtFront, callback) {
      var _this = this;

      if (callback != null && typeof callback !== 'function') {
        throw new Error('task callback must be a function');
      }

      this._started = true;

      if (data == null && this.idle()) {
        setTimeout(function () {
          return _this.onDrain.dispatch();
        }, 1);
        return;
      }

      var task = {
        data: data,
        callback: callback
      };
      if (insertAtFront) this._tasks.unshift(task);else this._tasks.push(task);
      setTimeout(function () {
        return _this.process();
      }, 1);
    };

    AsyncQueue.prototype._next = function (task) {
      var _this = this;

      return function (err) {
        var args = [];

        for (var _i = 1; _i < arguments.length; _i++) {
          args[_i - 1] = arguments[_i];
        }

        _this.workers -= 1;
        if (task.callback) task.callback.apply(task, __spreadArrays([err], args));
        if (err) _this.onError.dispatch(err, task.data);
        if (_this.workers <= _this.concurrency - _this.buffer) _this.onUnsaturated.dispatch();
        if (_this.idle()) _this.onDrain.dispatch();

        _this.process();
      };
    };

    return AsyncQueue;
  }();

  var Resource = function () {
    function Resource(name, options) {
      this.children = [];
      this.onStart = new Signal();
      this.onProgress = new Signal();
      this.onComplete = new Signal();
      this.onAfterMiddleware = new Signal();
      this.data = null;
      this.type = ResourceType.Unknown;
      this.error = '';
      this.progressChunk = 0;

      this._dequeue = function () {};

      this._onCompleteBinding = null;
      this._state = ResourceState.NotStarted;
      this.name = name;
      this.metadata = options.metadata;
      if (typeof options.crossOrigin !== 'string') options.crossOrigin = this._determineCrossOrigin(options.url);

      if (options.strategy && typeof options.strategy !== 'function') {
        this._strategy = options.strategy;
        this._strategy.config = options;
      } else {
        var StrategyCtor = options.strategy;
        if (!StrategyCtor) StrategyCtor = Resource._loadStrategyMap[getExtension(options.url)];
        if (!StrategyCtor) StrategyCtor = Resource._defaultLoadStrategy;
        this._strategy = new StrategyCtor(options);
      }

      this._strategy.onError.add(this._error, this);

      this._strategy.onComplete.add(this._complete, this);

      this._strategy.onProgress.add(this._progress, this);
    }

    Resource.setDefaultLoadStrategy = function (strategy) {
      Resource._defaultLoadStrategy = strategy;
    };

    Resource.setLoadStrategy = function (extname, strategy) {
      if (extname && extname.indexOf('.') === 0) extname = extname.substring(1);
      if (!extname) return;
      Resource._loadStrategyMap[extname] = strategy;
    };

    Object.defineProperty(Resource.prototype, "strategy", {
      get: function () {
        return this._strategy;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Resource.prototype, "url", {
      get: function () {
        return this._strategy.config.url;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Resource.prototype, "isLoading", {
      get: function () {
        return this._state === ResourceState.Loading;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Resource.prototype, "isComplete", {
      get: function () {
        return this._state === ResourceState.Complete;
      },
      enumerable: true,
      configurable: true
    });

    Resource.prototype.abort = function () {
      this._strategy.abort();
    };

    Resource.prototype.load = function () {
      this._state = ResourceState.Loading;
      this.onStart.dispatch(this);

      this._strategy.load();
    };

    Resource.prototype._error = function (errMessage) {
      this._state = ResourceState.Complete;
      this.error = errMessage;
      this.onComplete.dispatch(this);
    };

    Resource.prototype._complete = function (type, data) {
      this._state = ResourceState.Complete;
      this.type = type;
      this.data = data;
      this.onComplete.dispatch(this);
    };

    Resource.prototype._progress = function (percent) {
      this.onProgress.dispatch(this, percent);
    };

    Resource.prototype._determineCrossOrigin = function (url, loc) {
      if (loc === void 0) {
        loc = window.location;
      }

      if (url.indexOf('data:') === 0 || url.indexOf('javascript:') === 0) return '';
      if (window.origin !== window.location.origin) return 'anonymous';
      if (!Resource._tempAnchor) Resource._tempAnchor = document.createElement('a');
      Resource._tempAnchor.href = url;
      var parsed = src(Resource._tempAnchor.href, {
        strictMode: true
      });
      var samePort = !parsed.port && loc.port === '' || parsed.port === loc.port;
      var protocol = parsed.protocol ? parsed.protocol + ":" : '';
      if (parsed.host !== loc.hostname || !samePort || protocol !== loc.protocol) return 'anonymous';
      return '';
    };

    Resource._tempAnchor = null;
    Resource._defaultLoadStrategy = XhrLoadStrategy;
    Resource._loadStrategyMap = {
      gif: ImageLoadStrategy,
      png: ImageLoadStrategy,
      bmp: ImageLoadStrategy,
      jpg: ImageLoadStrategy,
      jpeg: ImageLoadStrategy,
      tif: ImageLoadStrategy,
      tiff: ImageLoadStrategy,
      webp: ImageLoadStrategy,
      tga: ImageLoadStrategy,
      svg: ImageLoadStrategy,
      'svg+xml': ImageLoadStrategy,
      mp3: AudioLoadStrategy,
      ogg: AudioLoadStrategy,
      wav: AudioLoadStrategy,
      mp4: VideoLoadStrategy,
      webm: VideoLoadStrategy,
      mov: VideoLoadStrategy
    };
    return Resource;
  }();

  function eachSeries(array, iterator, callback, deferNext) {
    if (deferNext === void 0) {
      deferNext = false;
    }

    var i = 0;
    var len = array.length;

    (function next(err) {
      if (err || i === len) {
        if (callback) callback(err);
        return;
      }

      if (deferNext) setTimeout(function () {
        return iterator(array[i++], next);
      }, 1);else iterator(array[i++], next);
    })();
  }

  var MAX_PROGRESS = 100;
  var rgxExtractUrlHash = /(#[\w-]+)?$/;

  var Loader = function () {
    function Loader(baseUrl, concurrency) {
      if (baseUrl === void 0) {
        baseUrl = '';
      }

      if (concurrency === void 0) {
        concurrency = 10;
      }

      this.progress = 0;
      this.loading = false;
      this.defaultQueryString = '';
      this.resources = {};
      this.onError = new Signal();
      this.onLoad = new Signal();
      this.onStart = new Signal();
      this.onComplete = new Signal();
      this.onProgress = new Signal();
      this._baseUrl = '';
      this._urlResolvers = [];
      this._middleware = [];
      this._resourcesParsing = [];
      this._boundLoadResource = this._loadResource.bind(this);
      this.baseUrl = baseUrl;
      this._queue = new AsyncQueue(this._boundLoadResource, concurrency);

      this._queue.pause();

      this._middleware = Loader._defaultMiddleware.slice();
    }

    Object.defineProperty(Loader.prototype, "baseUrl", {
      get: function () {
        return this._baseUrl;
      },
      set: function (url) {
        while (url.length && url.charAt(url.length - 1) === '/') {
          url = url.slice(0, -1);
        }

        this._baseUrl = url;
      },
      enumerable: true,
      configurable: true
    });

    Loader.prototype.add = function (options, url_) {
      if (Array.isArray(options)) {
        for (var i = 0; i < options.length; ++i) {
          this.add(options[i]);
        }

        return this;
      }

      var url = '';
      var name = '';
      var baseUrl = this._baseUrl;
      var resOptions = {
        url: ''
      };

      if (typeof options === 'object') {
        url = options.url;
        name = options.name || options.url;
        baseUrl = options.baseUrl || baseUrl;
        resOptions = options;
      } else {
        name = options;
        if (typeof url_ === 'string') url = url_;else url = name;
      }

      if (!url) throw new Error('You must specify the `url` property.');

      if (this.loading && !resOptions.parentResource) {
        throw new Error('Cannot add root resources while the loader is running.');
      }

      if (this.resources[name]) {
        throw new Error("Resource named \"" + name + "\" already exists.");
      }

      url = this._prepareUrl(url, baseUrl);
      resOptions.url = url;
      var resource = new Resource(name, resOptions);
      this.resources[name] = resource;

      if (typeof resOptions.onComplete === 'function') {
        resource.onAfterMiddleware.once(resOptions.onComplete);
      }

      if (this.loading) {
        var parent_1 = resOptions.parentResource;
        var incompleteChildren = [];

        for (var i = 0; i < parent_1.children.length; ++i) {
          if (!parent_1.children[i].isComplete) {
            incompleteChildren.push(parent_1.children[i]);
          }
        }

        var fullChunk = parent_1.progressChunk * (incompleteChildren.length + 1);
        var eachChunk = fullChunk / (incompleteChildren.length + 2);
        parent_1.children.push(resource);
        parent_1.progressChunk = eachChunk;

        for (var i = 0; i < incompleteChildren.length; ++i) {
          incompleteChildren[i].progressChunk = eachChunk;
        }

        resource.progressChunk = eachChunk;
      }

      this._queue.push(resource);

      return this;
    };

    Loader.prototype.use = function (fn, priority) {
      if (priority === void 0) {
        priority = Loader.DefaultMiddlewarePriority;
      }

      this._middleware.push({
        fn: fn,
        priority: priority
      });

      this._middleware.sort(function (a, b) {
        return a.priority - b.priority;
      });

      return this;
    };

    Loader.prototype.reset = function () {
      this.progress = 0;
      this.loading = false;

      this._queue.reset();

      this._queue.pause();

      for (var k in this.resources) {
        var res = this.resources[k];
        if (!res) continue;
        if (res._onCompleteBinding) res._onCompleteBinding.detach();
        if (res.isLoading) res.abort();
      }

      this.resources = {};
      return this;
    };

    Loader.prototype.load = function (cb) {
      if (typeof cb === 'function') this.onComplete.once(cb);
      if (this.loading) return this;

      if (this._queue.idle()) {
        this._onStart();

        this._onComplete();
      } else {
        var numTasks = this._queue.length();

        var chunk = MAX_PROGRESS / numTasks;

        for (var i = 0; i < this._queue.length(); ++i) {
          this._queue.getTask(i).data.progressChunk = chunk;
        }

        this._onStart();

        this._queue.resume();
      }

      return this;
    };

    Object.defineProperty(Loader.prototype, "concurrency", {
      get: function () {
        return this._queue.concurrency;
      },
      set: function (concurrency) {
        this._queue.concurrency = concurrency;
      },
      enumerable: true,
      configurable: true
    });

    Loader.prototype.addUrlResolver = function (func) {
      this._urlResolvers.push(func);

      return this;
    };

    Loader.prototype._prepareUrl = function (url, baseUrl) {
      var parsed = src(url, {
        strictMode: true
      });

      this._urlResolvers.forEach(function (resolver) {
        url = resolver(url, parsed);
        parsed = src(url, {
          strictMode: true
        });
      });

      if (!parsed.protocol && url.indexOf('//') !== 0) {
        if (baseUrl.length && url.charAt(0) !== '/') url = baseUrl + "/" + url;else url = baseUrl + url;
      }

      if (this.defaultQueryString) {
        var match = rgxExtractUrlHash.exec(url);

        if (match) {
          var hash = match[0];
          url = url.substr(0, url.length - hash.length);
          if (url.indexOf('?') !== -1) url += "&" + this.defaultQueryString;else url += "?" + this.defaultQueryString;
          url += hash;
        }
      }

      return url;
    };

    Loader.prototype._loadResource = function (resource, dequeue) {
      resource._dequeue = dequeue;
      resource._onCompleteBinding = resource.onComplete.once(this._onLoad, this);
      resource.load();
    };

    Loader.prototype._onStart = function () {
      this.progress = 0;
      this.loading = true;
      this.onStart.dispatch(this);
    };

    Loader.prototype._onComplete = function () {
      this.progress = MAX_PROGRESS;
      this.loading = false;
      this.onComplete.dispatch(this, this.resources);
    };

    Loader.prototype._onLoad = function (resource) {
      var _this = this;

      resource._onCompleteBinding = null;

      this._resourcesParsing.push(resource);

      resource._dequeue();

      eachSeries(this._middleware, function (middleware, next) {
        middleware.fn.call(_this, resource, next);
      }, function () {
        resource.onAfterMiddleware.dispatch(resource);
        _this.progress = Math.min(MAX_PROGRESS, _this.progress + resource.progressChunk);

        _this.onProgress.dispatch(_this, resource);

        if (resource.error) _this.onError.dispatch(resource.error, _this, resource);else _this.onLoad.dispatch(_this, resource);

        _this._resourcesParsing.splice(_this._resourcesParsing.indexOf(resource), 1);

        if (_this._queue.idle() && _this._resourcesParsing.length === 0) _this._onComplete();
      }, true);
    };

    Loader.use = function (fn, priority) {
      if (priority === void 0) {
        priority = Loader.DefaultMiddlewarePriority;
      }

      Loader._defaultMiddleware.push({
        fn: fn,
        priority: priority
      });

      Loader._defaultMiddleware.sort(function (a, b) {
        return a.priority - b.priority;
      });

      return Loader;
    };

    Loader.DefaultMiddlewarePriority = 50;
    Loader._defaultMiddleware = [];
    return Loader;
  }();

  var _default$1 = /*#__PURE__*/function () {
    /**
     * ResLoaderService
     */
    function _default() {
      _classCallCheck(this, _default);

      this.loader = new Loader();
      this.hooks = {};
    }
    /**
     * setResources
     * @param resources[]: Resource paths array
     * @returns {ResLoaderService}
     */


    _createClass(_default, [{
      key: "setResources",
      value: function setResources() {
        var resources = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        this.loader.add(resources);
        return this;
      }
      /**
       * setHooks
       * @param onStart: The hook function when start.
       * @param onProgress: The hook function when loading. Param: progress
       * @param onComplete: The hook function when loaded.
       * @returns {ResLoaderService}
       */

    }, {
      key: "setHooks",
      value: function setHooks() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            onStart = _ref.onStart,
            onProgress = _ref.onProgress,
            onComplete = _ref.onComplete;

        this.hooks = {
          onStart: onStart,
          onProgress: onProgress,
          onComplete: onComplete
        };
        return this;
      }
      /**
       * load
       * @returns {Promise<unknown>}
       */

    }, {
      key: "load",
      value: function load() {
        var _this = this;

        if (this.hooks.onStart) {
          this.hooks.onStart();
        }

        return new Promise(function (resolve) {
          _this.loader.onProgress.add(function () {
            if (_this.hooks.onProgress) {
              _this.hooks.onProgress(_this.loader.progress);
            }
          });

          _this.loader.onComplete.add(function () {
            if (_this.hooks.onComplete) {
              _this.hooks.onComplete();
            }

            resolve();
          });

          _this.loader.load();
        });
      }
    }]);

    return _default;
  }();

  var _default = /*#__PURE__*/function () {
    /**
     * H5Preloader
     * @param type
     * @param eProgressBar
     * @param eProgressBarPercent
     * @param resources
     * @param hookWhenProgressComplete
     * @param autoComplete
     */
    function _default() {
      var _this = this;

      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$type = _ref.type,
          type = _ref$type === void 0 ? 'progressBar' : _ref$type,
          _ref$progressBar = _ref.progressBar;

      _ref$progressBar = _ref$progressBar === void 0 ? {} : _ref$progressBar;
      var eProgressBar = _ref$progressBar.eProgressBar,
          eProgressBarPercent = _ref$progressBar.eProgressBarPercent,
          _ref$resources = _ref.resources,
          resources = _ref$resources === void 0 ? [] : _ref$resources,
          _ref$hookWhenProgress = _ref.hookWhenProgressComplete,
          hookWhenProgressComplete = _ref$hookWhenProgress === void 0 ? function () {} : _ref$hookWhenProgress,
          _ref$autoComplete = _ref.autoComplete,
          autoComplete = _ref$autoComplete === void 0 ? true : _ref$autoComplete;

      _classCallCheck(this, _default);

      this.type = type;

      switch (this.type) {
        case 'progressBar':
          this.progress = new ProgressBar({
            eProgressBar: eProgressBar,
            eProgressBarPercent: eProgressBarPercent,
            hookWhenProgressComplete: hookWhenProgressComplete
          });
          break;

        default:
          this.progress = null;
      }

      this.resLoader = new _default$1().setResources(resources).setHooks({
        onStart: function onStart() {
          if (_this.progress) {
            _this.progress.setProgress(4);
          }
        },
        onProgress: function onProgress(progress) {
          var percent = parseInt(progress * 92 * 0.01, 10) + 4; // 4% ~ 96%

          if (_this.progress) {
            _this.progress.setProgress(percent);
          }
        },
        onComplete: function onComplete() {
          if (_this.progress) {
            _this.progress.setProgress(98);
          }

          if (autoComplete) {
            setTimeout(function () {
              return _this.progressComplete();
            }, 500);
          }
        }
      });
    }
    /**
     * load
     * @returns {*}
     */


    _createClass(_default, [{
      key: "load",
      value: function load() {
        return this.resLoader.load();
      }
      /**
       * progressComplete
       * @returns {*}
       */

    }, {
      key: "progressComplete",
      value: function progressComplete() {
        return this.progress ? this.progress.progressComplete() : Promise.resolve();
      }
    }]);

    return _default;
  }();

  var instance = CreateInstance();
  /**
   * h5Preloader
   * @param param
   * @returns {H5Preloader}
   */

  var index = (function (param) {
    if (instance()) {
      return instance();
    }

    var h5Preloader = new _default(param);
    instance(h5Preloader);
    return h5Preloader;
  });

  return index;

}));
