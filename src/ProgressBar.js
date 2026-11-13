import Progress from './Progress'

export default class ProgressBar extends Progress {
  /**
   * Create a progress bar instance.
   *
   * @param {object} [options] Options.
   * @param {HTMLElement} [options.eProgressBar] Element of the progress bar.
   * @param {HTMLElement} [options.eProgressBarPercent] Element for showing the percent.
   * @param {Function} [options.hookWhenProgressComplete] Hook called when the progress completes.
   */
  constructor({ eProgressBar, eProgressBarPercent, hookWhenProgressComplete } = {}) {
    super({
      hookWhenProgressComplete,
    })

    this.els.eProgressBar = eProgressBar
    this.els.eProgressBarPercent = eProgressBarPercent

    if (this.els.eProgressBar) {
      this.els.eProgressBar.style.cssText = 'transform: scaleX(0); transform-origin: 0 50%; transition: transform .1s;'
    }
  }

  /**
   * Set the progress percent and reflect it on the bound elements.
   *
   * @param {number} percent Percent to apply, never lower than the current one.
   * @returns {ProgressBar} This instance for chaining.
   */
  setProgress(percent) {
    if (percent > this.percent) {
      this.percent = percent
      if (this.els.eProgressBar) {
        this.els.eProgressBar.style.transform = `scaleX(${percent * 0.01})`
      }

      if (this.els.eProgressBarPercent) {
        this.els.eProgressBarPercent.textContent = percent
      }
    }

    return this
  }
}
