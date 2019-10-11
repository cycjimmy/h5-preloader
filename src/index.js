import ProgressBar from './ProgressBar';
import ResLoaderService from './ResLoader.service';
import CreateInstance from '@cycjimmy/awesome-js-funcs/designPattern/CreateInstance';

const _instance = new CreateInstance();

class H5Preloader {
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
                progressBar: {
                  eProgressBar,
                  eProgressBarPercent,
                } = {},
                baseUrl = './',
                resources = [],
                hookWhenProgressComplete = () => {
                },
                autoComplete = true
              } = {}) {
    this.type = type;

    switch (this.type) {
      case 'progressBar':
        this.progress = new ProgressBar({
          eProgressBar,
          eProgressBarPercent,
          hookWhenProgressComplete,
        });
        break;

      default:
        this.progress = null;
    }

    this.resLoader = new ResLoaderService({baseUrl})
      .setResources(resources)
      .setHooks({
        onStart: () => this.progress.setProgress(4),
        onProgress: (currentIndex, total) => {
          const percent = Number.parseInt(currentIndex / total * 92, 10) + 4;
          this.progress.setProgress(percent);  // 4% ~ 96%
        },
        onComplete: () => {
          this.progress.setProgress(98);

          if (autoComplete) {
            setTimeout(() => this.progressComplete(), 500);
          }
        },
      });
  };

  load() {
    return this.resLoader.start();
  };

  progressComplete() {
    return this.progress.progressComplete();
  };
}

export default (param) => {
  if (_instance()) {
    return _instance();
  }

  const h5Preloader = new H5Preloader(param);
  _instance(h5Preloader);

  return h5Preloader;
};
