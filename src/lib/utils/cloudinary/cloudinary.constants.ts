/* Matches 3 different formats:
 * Without SEO Slug:
 * - Format: https://images.simpletire.com/folder-path/imagename.extension
 * - Example: https://images.simpletire.com/line-images/_generic/sidewall.png
 * - Transformed: https://images.simpletire.com/[transformation-string]/line-images/_generic/sidewall.png
 * With SEO Slug:
 * - Format: https://images.simpletire.com/images/folder-path/imagename/seo-slug.extension
 * - Example: https://images.simpletire.com/images/line-images/_generic/sidewall/tire-line-art.png
 * - Transformed: https://images.simpletire.com/images/[transformation-string]/line-images/_generic/sidewall/tire-line-art.png
 * Old format:
 * - Format: https://images.simpletire.com/image/upload/folder-path/imagename/seo-slug.extension
 * - Example: https://images.simpletire.com/image/upload/v1593195319/manf-logos/417b.svg
 * - Transformed: https://images.simpletire.com/image/upload/[transformation-string]/v1593195319/manf-logos/417b.svg
 */
export const CLOUDINARY_ST_SRC_REGEX = /(https:\/\/images\.simpletire\.com\/(?:(?:images\/|image\/upload\/)?))(.*)/i;
export const CLOUDINARY_SRC_REGEX = /(https:\/\/res\.cloudinary\.com\/?.*\/image\/upload\/)(.*)/i;

// Matches 2 formats, for either black or white:
// https://images.simpletire.com/images/manf-logos/<number><b|w>/<slug>.svg
// https://images.simpletire.com/images/manf-logos/<number><b|w>.svg
// Example of matching:
// - https://images.simpletire.com/image/upload/v1593195319/manf-logos/417b.svg
// - https://images.simpletire.com/images/manf-logos/113w/accelera-tires.svg
export const CLOUDINARY_BLACK_BRAND_LOGO = /\d+b\/.+\.(?:svg|png)|\d+b\.(?:svg|png)/i;
export const CLOUDINARY_WHITE_BRAND_LOGO = /\d+w\/.+\.(?:svg|png)|\d+w\.(?:svg|png)/i;
