/**
 * Same as img_url shopify theme
 */

const imgURL = (src: string, size: string, crop: string): string => src
  .replace(/_(pico|icon|thumb|small|compact|medium|large|grande|original|500x500|768x768|1024x1024|2048x2048|master)+\./g, '.')
  .replace(/\.jpg|\.png|\.gif|\.jpeg/g, (match: string) => `_${size}_crop_${crop}${match}`);

export default imgURL;
