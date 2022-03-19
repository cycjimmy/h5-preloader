import CreateInstance from '@cycjimmy/awesome-js-funcs/esm/designPattern/CreateInstance';

import H5Preloader from './H5Preloader';

const instance = CreateInstance();

/**
 * h5Preloader
 * @param param
 * @returns {H5Preloader}
 */
export default (param) => {
  if (instance()) {
    return instance();
  }

  const h5Preloader = new H5Preloader(param);
  instance(h5Preloader);

  return h5Preloader;
};
