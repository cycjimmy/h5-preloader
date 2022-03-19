/* eslint no-undef: off */
/* eslint no-console: off */
import H5Preloader from '../src/H5Preloader';

const imageUrlSuccess = 'https://cycjimmy.github.io/staticFiles/images/screenshot/big_buck_bunny_640x360.jpg';
const imageUrlFail = 'https://cycjimmy.github.io/staticFiles/images/screenshot/Sony_test_video_640x360.jpg';
const resources = [
  imageUrlSuccess,
  imageUrlFail,
];
const eProgressBar = document.createElement('div');
const eProgressBarPercent = document.createElement('div');
const hookWhenProgressComplete = () => console.log('hookWhenProgressComplete');

describe('H5Preloader default value test', () => {
  const preloader = new H5Preloader();

  it('test preloader default value', () => {
    expect(preloader.type).toBe('progressBar');
    expect(preloader.progress).toBeTruthy();
    expect(preloader.resLoader).toBeTruthy();
  });

  it('test preloader.load()', () => preloader.load());
});

describe('H5Preloader type test', () => {
  const preloader = new H5Preloader({
    type: '',
    autoComplete: false,
    resources,
  });

  it('test preloader.load() when type is null', (done) => {
    preloader.load();
    setTimeout(done, 1e3);
  });

  it('test preloader.progressComplete()', () => preloader.progressComplete());
});

describe('h5Preloader test', () => {
  const preloader = new H5Preloader({
    progressBar: {
      eProgressBar, eProgressBarPercent,
    },
    resources,
    hookWhenProgressComplete,
  });

  it('test preloader.load()', (done) => {
    preloader.load();
    setTimeout(done, 1e3);
  });
});
