export default class Progress {
  /**
   * Create a progress instance.
   *
   * @param {object} [options] Options.
   * @param {Function} [options.hookWhenProgressComplete] Hook called when the progress completes.
   */
  constructor({ hookWhenProgressComplete = () => {} } = {}) {
    this.els = {}
    this.percent = 0
    this.hookWhenProgressComplete = hookWhenProgressComplete
  }

  /**
   * Set the progress percent.
   *
   * @param {number} percent Percent to apply, never lower than the current one.
   * @returns {Progress} This instance for chaining.
   */
  setProgress(percent) {
    if (percent > this.percent) {
      this.percent = percent
    }
    return this
  }

  /**
   * Wait until the document is complete, then finish the progress.
   *
   * @returns {Promise<void>} Resolves when the progress is complete.
   */
  progressComplete() {
    return new Promise((resolve, reject) => {
      if (document.readyState === 'complete') {
        this.setProgress(100)
        setTimeout(() => {
          this.hookWhenProgressComplete()
          resolve()
        }, 200)
      }
      else {
        setTimeout(reject, 200)
      }
    }).catch(() => this.progressComplete())
  }
}
