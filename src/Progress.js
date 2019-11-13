export default class Progress {
  /**
   * Progress
   * @param hookWhenProgressComplete
   */
  constructor({ hookWhenProgressComplete = () => {} } = {}) {
    this.els = {};
    this.percent = 0;
    this.hookWhenProgressComplete = hookWhenProgressComplete;
  }

  /**
   * setProgress
   * @param percent
   * @returns {Progress}
   */
  setProgress(percent) {
    if (percent > this.percent) {
      this.percent = percent;
    }
    return this;
  }

  /**
   * progressComplete
   * @returns {Promise.<any>}
   */
  progressComplete() {
    return new Promise((resolve, reject) => {
      if (document.readyState === 'complete') {
        this.setProgress(100);
        setTimeout(() => {
          this.hookWhenProgressComplete();
          resolve();
        }, 200);
      } else {
        setTimeout(reject, 1000);
      }
    }).catch(() => this.progressComplete());
  }
}
