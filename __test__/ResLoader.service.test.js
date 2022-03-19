/* eslint no-undef: off */
/* eslint no-console: off */
import ResLoaderService from '../src/ResLoader.service';

const imageUrlSuccess = 'https://cycjimmy.github.io/staticFiles/images/screenshot/big_buck_bunny_640x360.jpg';
const imageUrlFail = 'https://cycjimmy.github.io/staticFiles/images/screenshot/Sony_test_video_640x360.jpg';
const onStart = () => console.log('onStart');
const onProgress = () => console.log('onProgress');
const onComplete = () => console.log('onComplete');

describe('ResLoaderService default value test', () => {
  const resLoader = new ResLoaderService();

  it('test resLoader default value', () => {
    expect(resLoader.hooks).toEqual({});
    expect(resLoader.loader).toBeTruthy();
  });

  it('resLoader.setResources return resLoader', () => {
    expect(resLoader.setResources()).toBe(resLoader);
  });

  it('resLoader.setHooks return resLoader', () => {
    expect(resLoader.setHooks()).toBe(resLoader);
  });

  it('test resLoader.load()', (done) => {
    resLoader.load();
    setTimeout(done, 1e3);
  });
});

describe('ResLoaderService test', () => {
  const resources = [
    imageUrlSuccess,
    imageUrlFail,
  ];
  const resLoader = new ResLoaderService();
  resLoader.setResources(resources);

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

  it('test resLoader.load()', (done) => {
    resLoader.load();
    setTimeout(done, 1e3);
  });
});
