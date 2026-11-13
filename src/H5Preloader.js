import ProgressBar from './ProgressBar'
import ResLoaderService from './ResLoader.service'

export default class {
  /**
   * Create a preloader instance.
   *
   * @param {object} [options] Options.
   * @param {string} [options.type] Type of the progress indicator.
   * @param {object} [options.progressBar] Progress bar config.
   * @param {HTMLElement} [options.progressBar.eProgressBar] Element of the progress bar.
   * @param {HTMLElement} [options.progressBar.eProgressBarPercent] Element for showing the percent.
   * @param {string[]} [options.resources] Resource paths.
   * @param {Function} [options.hookWhenProgressComplete] Hook called when the progress completes.
   * @param {boolean} [options.autoComplete] Whether to call the hook automatically.
   */
  constructor({
    type = 'progressBar',
    progressBar: { eProgressBar, eProgressBarPercent } = {},
    resources = [],
    hookWhenProgressComplete = () => {},
    autoComplete = true,
  } = {}) {
    this.type = type

    switch (this.type) {
      case 'progressBar':
        this.progress = new ProgressBar({
          eProgressBar,
          eProgressBarPercent,
          hookWhenProgressComplete,
        })
        break

      default:
        this.progress = null
    }

    this.resLoader = new ResLoaderService().setResources(resources).setHooks({
      onStart: () => {
        if (this.progress) {
          this.progress.setProgress(4)
        }
      },
      onProgress: (progress) => {
        const percent = Number.parseInt(progress * 92 * 0.01, 10) + 4

        // 4% ~ 96%
        if (this.progress) {
          this.progress.setProgress(percent)
        }
      },
      onComplete: () => {
        if (this.progress) {
          this.progress.setProgress(98)
        }

        if (autoComplete) {
          setTimeout(() => this.progressComplete(), 500)
        }
      },
    })
  }

  /**
   * Start loading the resources.
   *
   * @returns {Promise<void>} Resolves when every resource is loaded.
   */
  load() {
    return this.resLoader.load()
  }

  /**
   * Complete the progress manually.
   *
   * @returns {Promise<void>} Resolves when the progress is complete.
   */
  progressComplete() {
    return this.progress
      ? this.progress.progressComplete()
      : Promise.resolve()
  }
}
