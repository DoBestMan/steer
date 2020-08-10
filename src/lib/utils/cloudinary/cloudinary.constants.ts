// TODO: replace with correct `CLOUDINARY_SRC_REGEX`
export const CLOUDINARY_ST_SRC_REGEX = /(https:\/\/images\.simpletire\.com\/image\/upload\/)(.*)/i;
export const CLOUDINARY_SRC_REGEX = /(https:\/\/res\.cloudinary\.com\/?.*\/image\/upload\/)(.*)/i;

// Matches 2 formats, for either black or white:
// https://images.simpletire.com/images/manf-logos/<number><b|w>/<slug>.svg
// https://images.simpletire.com/images/manf-logos/<number><b|w>.svg
// Example of matching:
// - https://images.simpletire.com/image/upload/v1593195319/manf-logos/417b.svg
// - https://images.simpletire.com/images/manf-logos/113w/accelera-tires.svg
export const CLOUDINARY_BLACK_BRAND_LOGO = /\d+b\/.+\.(?:svg|png)|\d+b\.(?:svg|png)/i;
export const CLOUDINARY_WHITE_BRAND_LOGO = /\d+w\/.+\.(?:svg|png)|\d+w\.(?:svg|png)/i;
