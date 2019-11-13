import h5Preloader from '../src/index';

describe('h5Preloader test', () => {
  const preloader = h5Preloader();

  it('Singleton mode: h5Preloader() should be preloader.', () => {
    expect(h5Preloader()).toBe(preloader);
  });
});

