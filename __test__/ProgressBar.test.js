/* eslint no-undef: off */
/* eslint no-console: off */
import ProgressBar from '../src/ProgressBar';

const eProgressBar = document.createElement('div');
const eProgressBarPercent = document.createElement('div');
const hookWhenProgressComplete = () => console.log('hookWhenProgressComplete');
const customSetProgressPercent = 50;

describe('Progress default value test', () => {
  const progressBar = new ProgressBar();

  it('progressBar.percent should be the value custom set after progressBar.setProgress', () => {
    progressBar.setProgress(customSetProgressPercent);
    expect(progressBar.percent).toBe(customSetProgressPercent);
  });

  it('progressBar.percent cannot be reduced', () => {
    const reducedPercent = customSetProgressPercent - 1;
    progressBar.setProgress(reducedPercent);
    expect(progressBar.percent).not.toBe(reducedPercent);
    expect(progressBar.percent).toBe(customSetProgressPercent);
  });
});

describe('Progress test', () => {
  const progressBar = new ProgressBar({
    eProgressBar,
    eProgressBarPercent,
    hookWhenProgressComplete,
  });

  it('progressBar.els.eProgressBar should be custom eProgressBar', () => {
    expect(progressBar.els.eProgressBar).toBe(eProgressBar);
  });

  it('progressBar.els.eProgressBarPercent should be custom eProgressBarPercent', () => {
    expect(progressBar.els.eProgressBarPercent).toBe(eProgressBarPercent);
  });

  it('progressBar.hookWhenProgressComplete should be custom hookWhenProgressComplete', () => {
    expect(progressBar.hookWhenProgressComplete).toBe(hookWhenProgressComplete);
  });

  it('progressBar.percent should be the value custom set after progressBar.setProgress', () => {
    progressBar.setProgress(customSetProgressPercent);
    expect(progressBar.percent).toBe(customSetProgressPercent);
    expect(progressBar.els.eProgressBarPercent.textContent).toBe(`${customSetProgressPercent}`);
  });

  it('progressBar.percent cannot be reduced', () => {
    const reducedPercent = customSetProgressPercent - 1;
    progressBar.setProgress(reducedPercent);
    expect(progressBar.percent).not.toBe(reducedPercent);
    expect(progressBar.els.eProgressBarPercent.textContent).not.toBe(`${reducedPercent}`);

    expect(progressBar.percent).toBe(customSetProgressPercent);
    expect(progressBar.els.eProgressBarPercent.textContent).toBe(`${customSetProgressPercent}`);
  });
});
