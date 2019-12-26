import { Loader } from 'resource-loader';

export default class {
  /**
   * ResLoaderService
   */
  constructor() {
    this.loader = new Loader();
    this.hooks = {};
  }

  /**
   * setResources
   * @param resources[]: Resource paths array
   * @returns {ResLoaderService}
   */
  setResources(resources = []) {
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
  setHooks({ onStart, onProgress, onComplete } = {}) {
    this.hooks = {
      onStart,
      onProgress,
      onComplete
    };
    return this;
  }

  /**
   * load
   * @returns {Promise<unknown>}
   */
  load() {
    if (this.hooks.onStart) {
      this.hooks.onStart();
    }

    return new Promise((resolve) => {
      this.loader.onProgress.add(() => {
        if (this.hooks.onProgress) {
          this.hooks.onProgress(this.loader.progress);
        }
      });

      this.loader.onComplete.add(() => {
        if (this.hooks.onComplete) {
          this.hooks.onComplete();
        }
        resolve();
      });

      this.loader.load();
    });
  }
}
