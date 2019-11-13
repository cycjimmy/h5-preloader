import ResLoaderService from '../src/ResLoader.service';

const imageUrlSuccess = "https://cycjimmy.github.io/staticFiles/images/screenshot/big_buck_bunny_640x360.jpg";
const imageUrlFail = "https://cycjimmy.github.io/staticFiles/images/screenshot/Sony_test_video_640x360.jpg";
const imagePath = "screenshot/big_buck_bunny_640x360.jpg";
const onStart = () => console.log('onStart');
const onProgress = () => console.log('onProgress');
const onComplete = () => console.log('onComplete');

describe('ResLoaderService default value test', () => {
  const resLoader = new ResLoaderService();

  it('test resLoader default value', () => {
    expect(resLoader.baseUrl).toBe('./');
    expect(resLoader.resources).toEqual([]);
    expect(resLoader.hooks).toEqual({});
    expect(resLoader.status).toBe(0);
    expect(resLoader.total).toBe(0);
    expect(resLoader.currentIndex).toBe(0);
  });

  it('resLoader.setResources return resLoader', () => {
    expect(resLoader.setResources()).toBe(resLoader);
  });

  it('resLoader.setHooks return resLoader', () => {
    expect(resLoader.setHooks()).toBe(resLoader);
  });

  it('resLoader.getStatus return status', () => {
    expect(resLoader.getStatus()).toBe(0);
  });

  it('test resLoader._handleImageUrl return url', () => {
    expect(resLoader._handleImageUrl(imageUrlSuccess)).toBe(imageUrlSuccess);
    expect(resLoader._handleImageUrl(imagePath)).toBe(resLoader.baseUrl + imagePath);
  });

  it('test resLoader.start()', () => {
    return resLoader.start();
  });
});

describe('ResLoaderService test', () => {
  beforeAll(() => {
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
  });

  const resources = [
    imageUrlSuccess,
    imageUrlFail,
  ];
  const resLoader = new ResLoaderService();
  resLoader.setResources(resources);

  it('resLoader.resources should be custom resources after resLoader.setResources()', () => {
    expect(resLoader.resources).toBe(resources);
  });

  it('resLoader.total should be length of custom resources after resLoader.setResources()', () => {
    expect(resLoader.total).toBe(resources.length);
  });

  resLoader.setHooks({
    onStart,
    onProgress,
    onComplete,
  });

  it('resLoader.hooks should be custom hooks after resLoader.setHooks()', () => {
    expect(resLoader.hooks.onStart).toBe(onStart);
    expect(resLoader.hooks.onProgress).toBe(onProgress);
    expect(resLoader.hooks.onComplete).toBe(onComplete);
  });

  it('test resLoader.start()', () => {
    return resLoader.start();
  });
});

