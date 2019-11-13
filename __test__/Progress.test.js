import Progress from '../src/Progress';

const hookWhenProgressComplete = () => console.log('hookWhenProgressComplete');
const customSetProgressPercent = 50;

describe('h5Preloader default value test', () => {
  const progress = new Progress();

  it('progress.percent should be 0 when it inits', () => {
    expect(progress.percent).toBe(0);
  });

  it('progress.percent should be the value custom set after progress.setProgress', () => {
    progress.setProgress(customSetProgressPercent);
    expect(progress.percent).toBe(customSetProgressPercent);
  });

  it('progress.percent cannot be reduced', () => {
    const reducedPercent = customSetProgressPercent - 1;
    progress.setProgress(reducedPercent);
    expect(progress.percent).not.toBe(reducedPercent);
    expect(progress.percent).toBe(customSetProgressPercent);
  });

  it('progress.percent should be 100 after progress.progressComplete', () => {
    return progress.progressComplete()
      .then(() => {
        expect(progress.percent).toBe(100);
      });
  });
});

describe('Progress test', () => {
  const progress = new Progress({hookWhenProgressComplete,});

  it('progress.hookWhenProgressComplete should be custom hookWhenProgressComplete', () => {
    expect(progress.hookWhenProgressComplete).toBe(hookWhenProgressComplete);
  });

  it('progress.percent should be 100 after progress.progressComplete', () => {
    let tryCount = -1;
    Object.defineProperty(document, 'readyState', {
      get() {
        const states = ['loading', 'complete'];
        tryCount += 1;
        if (tryCount > states.length - 1) {
          tryCount = states.length - 1;
        }
        return states[tryCount];
      }
    });

    return progress.progressComplete()
      .then(() => {
        expect(progress.percent).toBe(100);
      });
  });
});

