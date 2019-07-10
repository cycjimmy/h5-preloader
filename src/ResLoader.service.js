export default class ResLoaderService {
  /**
   * ResLoaderService
   * @param baseUrl:
   */
  constructor({
                baseUrl = './',
              } = {}) {
    this.baseUrl = baseUrl;
    this.resources = [];
    this.hooks = {};

    // status: 0:not initiated   1:loading   2:loaded
    this.status = 0;

    // Total number of resources
    this.total = 0;

    // The resource index currently being loaded
    this.currentIndex = 0;
  };

  /**
   * setResources
   * @param resources[]: Resource paths array
   * @returns {ResLoaderService}
   */
  setResources(resources = []) {
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
  setHooks({
             onStart = (total) => {
             },
             onProgress = (currentIndex, total) => {
             },
             onComplete = (total) => {
             },
           } = {}) {
    this.hooks = {
      onStart: onStart,
      onProgress: onProgress,
      onComplete: onComplete,
    };
    return this;
  };

  start() {
    this.status = 1;

    if (this.hooks.onStart) {
      this.hooks.onStart(this.total);
    }

    if (!this.resources.length) {
      this._complete();
      return;
    }

    this.resources.forEach((res) => {
      const image = new Image();

      let url = '';

      if (res.indexOf('http://') === 0 || res.indexOf('https://') === 0) {
        url = res;
      } else {
        url = this.baseUrl + res;
      }

      image.onload = () => {
        this.resLoaded();
      };
      image.onerror = () => {
        this.resLoaded();
      };
      image.src = url;
    });
  };


  /**
   * resLoaded
   */
  resLoaded() {
    if (this.hooks.onProgress) {
      this.hooks.onProgress(++this.currentIndex, this.total);
    }

    // Complete
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
  getStatus() {
    return this.status;
  };

  /**
   * _complete
   * @private
   */
  _complete() {
    if (this.hooks.onComplete) {
      this.hooks.onComplete(this.total);
    }
  };
};
