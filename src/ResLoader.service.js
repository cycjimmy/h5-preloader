import { Loader } from 'resource-loader'

export default class {
  /**
   * Create a resource loader instance.
   */
  constructor() {
    this.loader = new Loader()
    this.hooks = {}
  }

  /**
   * Register the resources to load.
   *
   * @param {string[]} [resources] Resource paths.
   * @returns {this} This instance for chaining.
   */
  setResources(resources = []) {
    this.loader.add(resources.map(resource => ({
      url: resource,
      crossOrigin: '',
    })))
    return this
  }

  /**
   * Register the loading hooks.
   *
   * @param {object} [hooks] Hooks.
   * @param {Function} [hooks.onStart] Hook called when starting.
   * @param {Function} [hooks.onProgress] Hook called when loading, receives the progress.
   * @param {Function} [hooks.onComplete] Hook called when loaded.
   * @returns {this} This instance for chaining.
   */
  setHooks({ onStart, onProgress, onComplete } = {}) {
    this.hooks = {
      onStart,
      onProgress,
      onComplete,
    }
    return this
  }

  /**
   * Start loading the registered resources.
   *
   * @returns {Promise<void>} Resolves when every resource is loaded.
   */
  load() {
    if (this.hooks.onStart) {
      this.hooks.onStart()
    }

    return new Promise((resolve) => {
      this.loader.onProgress.add(() => {
        if (this.hooks.onProgress) {
          this.hooks.onProgress(this.loader.progress)
        }
      })

      this.loader.onComplete.add(() => {
        if (this.hooks.onComplete) {
          this.hooks.onComplete()
        }
        resolve()
      })

      this.loader.load()
    })
  }
}
