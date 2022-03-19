import Progress from './Progress';

export default class ProgressBar extends Progress {
  /**
   * ProgressBar
   * @param eProgressBar
   * @param progressPercentText
   */
  constructor({ eProgressBar, eProgressBarPercent, hookWhenProgressComplete } = {}) {
    super({
      hookWhenProgressComplete,
    });

    this.els.eProgressBar = eProgressBar;
    this.els.eProgressBarPercent = eProgressBarPercent;

    if (this.els.eProgressBar) {
      this.els.eProgressBar.style.cssText = 'transform: scaleX(0); transform-origin: 0 50%; transition: transform .1s;';
    }
  }

  /**
   * setProgress
   * @param percent
   * @returns {ProgressBar}
   */
  setProgress(percent) {
    if (percent > this.percent) {
      this.percent = percent;
      if (this.els.eProgressBar) {
        this.els.eProgressBar.style.transform = `scaleX(${percent * 0.01})`;
      }

      if (this.els.eProgressBarPercent) {
        this.els.eProgressBarPercent.textContent = percent;
      }
    }

    return this;
  }
}
