import ProgressBar from './ProgressBar';
import ResLoaderService from './ResLoader.service';

export default class {
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
  constructor({
    type = 'progressBar',
    progressBar: { eProgressBar, eProgressBarPercent } = {},
    baseUrl = './',
    resources = [],
    hookWhenProgressComplete = () => {},
    autoComplete = true
  } = {}) {
    this.type = type;

    switch (this.type) {
      case 'progressBar':
        this.progress = new ProgressBar({
          eProgressBar,
          eProgressBarPercent,
          hookWhenProgressComplete
        });
        break;

      default:
        this.progress = null;
    }

    this.resLoader = new ResLoaderService({ baseUrl }).setResources(resources).setHooks({
      onStart: () => {
        if (this.progress) {
          this.progress.setProgress(4);
        }
      },
      onProgress: (currentIndex, total) => {
        const percent = parseInt((currentIndex / total) * 92, 10) + 4;

        // 4% ~ 96%
        if (this.progress) {
          this.progress.setProgress(percent);
        }
      },
      onComplete: () => {
        if (this.progress) {
          this.progress.setProgress(98);
        }

        if (autoComplete) {
          setTimeout(() => this.progressComplete(), 500);
        }
      }
    });
  }

  /**
   * load
   * @returns {undefined}
   */
  load() {
    return this.resLoader.start();
  }

  /**
   * progressComplete
   * @returns {*}
   */
  progressComplete() {
    return this.progress ? this.progress.progressComplete() : Promise.resolve();
  }
}
