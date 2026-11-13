import CreateInstance from '@cycjimmy/awesome-js-funcs/designPattern/CreateInstance'

import H5Preloader from './H5Preloader'

const instance = CreateInstance()

/**
 * Create the singleton h5Preloader instance.
 *
 * @param {object} [param] h5Preloader options.
 * @returns {H5Preloader} The singleton instance.
 */
export default (param) => {
  if (instance()) {
    return instance()
  }

  const h5Preloader = new H5Preloader(param)
  instance(h5Preloader)

  return h5Preloader
}
