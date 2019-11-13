import H5Preloader from '../src/H5Preloader';

const imageUrlSuccess = "https://cycjimmy.github.io/staticFiles/images/screenshot/big_buck_bunny_640x360.jpg";
const imageUrlFail = "https://cycjimmy.github.io/staticFiles/images/screenshot/Sony_test_video_640x360.jpg";
const resources = [
  imageUrlSuccess,
  imageUrlFail,
];
const eProgressBar = document.createElement('div');
const eProgressBarPercent = document.createElement('div');
const hookWhenProgressComplete = () => console.log('hookWhenProgressComplete');

const mockImageElement = () => {
  // Mocking Image.prototype.src to call the onload or onerror
  // callbacks depending on the src passed to it
  Object.defineProperty(global.Image.prototype, 'src', {
    // Define the property setter
    set(src) {
      if (src === imageUrlSuccess) {
        // Call with setTimeout to simulate async loading
        setTimeout(() => this.onerror(new Error('error')));
      } else if (src === imageUrlFail) {
        setTimeout(() => this.onload());
      }
    },
  });
};

describe('H5Preloader default value test', () => {
  const preloader = new H5Preloader();

  it('test preloader default value', () => {
    expect(preloader.type).toBe('progressBar');
    expect(preloader.progress).toBeTruthy();
    expect(preloader.resLoader).toBeTruthy();
  });

  it('test preloader.load()', () => {
    return preloader.load();
  });
});

describe('H5Preloader type test', () => {
  beforeAll(() => {
    mockImageElement();
  });

  const preloader = new H5Preloader({
    type: '',
    autoComplete: false,
    resources,
  });

  it('test preloader.load() when type is null', () => {
    return preloader.load();
  });

  it('test preloader.progressComplete()', () => {
    return preloader.progressComplete();
  });
});

describe('h5Preloader test', () => {
  beforeAll(() => {
    mockImageElement();
  });

  const preloader = new H5Preloader({
    progressBar: {
      eProgressBar, eProgressBarPercent
    },
    resources,
    hookWhenProgressComplete,
  });

  it('test preloader.load()', () => {
    return preloader.load();
  });
});

