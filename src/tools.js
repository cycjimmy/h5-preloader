/**
 * loadImage
 * @param url
 * @returns {Promise<unknown>}
 * @private
 */
export const loadImage = (url) =>
  Promise.resolve().then(
    () =>
      new Promise((resolve) => {
        const image = new Image();

        image.onload = resolve;
        image.onerror = resolve;
        image.src = url;
      })
  );

export default {
  loadImage
};
