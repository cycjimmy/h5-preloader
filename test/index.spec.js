import h5Preloader from '../build/h5-preloader.min';

describe('default spec', () => {
  const
    eProgress = document.createElement('div')
    , eProgressPercent = document.createElement('div')
  ;

  const _h5Preloader = h5Preloader({
    progressBar: {
      eProgressBar: eProgress,
      eProgressBarPercent: eProgressPercent,
    },
    resources: [],
  });

  test('Default type test', () => {
    expect(_h5Preloader.type).toBe('progressBar');
  });

  test('progressBar el test', () => {
    expect(_h5Preloader.progress.els.eProgressBar).toBe(eProgress);
  });
});

