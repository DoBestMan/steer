import { transformSrcLogoToBlack, transformSrcLogoToWhite } from './cloudinary';
import {
  CLOUDINARY_BLACK_BRAND_LOGO,
  CLOUDINARY_ST_SRC_REGEX,
  CLOUDINARY_WHITE_BRAND_LOGO,
} from './cloudinary.constants';

describe('utils/cloudinary', () => {
  describe('regex', () => {
    it('matches a correct ST cloudinary asset path', () => {
      /* Old format:
       * - Format: https://images.simpletire.com/image/upload/folder-path/imagename/seo-slug.extension
       * - Example: https://images.simpletire.com/image/upload/v1593195319/manf-logos/417b.svg
       * - Transformed: https://images.simpletire.com/image/upload/[transformation-string]/v1593195319/manf-logos/417b.svg
       */
      const oldFormat =
        'https://images.simpletire.com/image/upload/v1593195319/manf-logos/417b.svg';

      /* With SEO Slug:
       * - Format: https://images.simpletire.com/images/folder-path/imagename/seo-slug.extension
       * - Example: https://images.simpletire.com/images/line-images/_generic/sidewall/tire-line-art.png
       * - Transformed: https://images.simpletire.com/images/[transformation-string]/line-images/_generic/sidewall/tire-line-art.png
       */
      const withSEOSlug =
        'https://images.simpletire.com/images/line-images/_generic/sidewall/tire-line-art.png';

      /* Without SEO Slug:
       * - Format: https://images.simpletire.com/folder-path/imagename.extension
       * - Example: https://images.simpletire.com/line-images/_generic/sidewall.png
       * - Transformed: https://images.simpletire.com/[transformation-string]/line-images/_generic/sidewall.png
       */
      const withoutSEOSlug =
        'https://images.simpletire.com/line-images/_generic/sidewall.png';

      const matchOldFormat = oldFormat.match(CLOUDINARY_ST_SRC_REGEX);
      const matchWithSEOSlug = withSEOSlug.match(CLOUDINARY_ST_SRC_REGEX);
      const matchWithoutSEOSlug = withoutSEOSlug.match(CLOUDINARY_ST_SRC_REGEX);

      expect(matchOldFormat).not.toEqual(null);
      expect(matchOldFormat && matchOldFormat[1]).toEqual(
        'https://images.simpletire.com/image/upload/',
      );
      expect(matchOldFormat && matchOldFormat[2]).toEqual(
        'v1593195319/manf-logos/417b.svg',
      );

      expect(matchWithSEOSlug).not.toEqual(null);
      expect(matchWithSEOSlug && matchWithSEOSlug[1]).toEqual(
        'https://images.simpletire.com/images/',
      );
      expect(matchWithSEOSlug && matchWithSEOSlug[2]).toEqual(
        'line-images/_generic/sidewall/tire-line-art.png',
      );

      expect(matchWithoutSEOSlug).not.toEqual(null);
      expect(matchWithoutSEOSlug && matchWithoutSEOSlug[1]).toEqual(
        'https://images.simpletire.com/',
      );
      expect(matchWithoutSEOSlug && matchWithoutSEOSlug[2]).toEqual(
        'line-images/_generic/sidewall.png',
      );
    });

    it('matches a correct black brand logo url', () => {
      const urlBlackBrandLogo =
        'https://images.simpletire.com/image/upload/v1593195319/manf-logos/417b.svg';

      expect(urlBlackBrandLogo.match(CLOUDINARY_BLACK_BRAND_LOGO)).not.toEqual(
        null,
      );
    });

    it("doesn't match a black brand logo url", () => {
      const urlBadBlackBrandLogo =
        'https://images.simpletire.com/image/upload/v1593195319/manf-logos/417/not-a-correct-logo-b.svg';

      expect(urlBadBlackBrandLogo.match(CLOUDINARY_BLACK_BRAND_LOGO)).toEqual(
        null,
      );
    });

    it('matches a correct white brand logo url', () => {
      const urlWhiteBrandLogo =
        'https://images.simpletire.com/image/upload/v1593195319/manf-logos/417w.svg';

      expect(urlWhiteBrandLogo.match(CLOUDINARY_WHITE_BRAND_LOGO)).not.toEqual(
        null,
      );
    });

    it("doesn't match a correct white brand logo url", () => {
      const urlBadWhiteBrandLogo =
        'https://images.simpletire.com/image/upload/v1593195319/manf-logos/417/not-a-correct-logo-w.svg';

      expect(urlBadWhiteBrandLogo.match(CLOUDINARY_WHITE_BRAND_LOGO)).toEqual(
        null,
      );
    });
  });

  describe('getBrandImageObject', () => {
    it('transform a black logo to white', () => {
      const src = transformSrcLogoToWhite(
        'https://images.simpletire.com/images/manf-logos/113b/accelera-tires.svg',
      );

      expect(src).toEqual(
        'https://images.simpletire.com/images/manf-logos/113w/accelera-tires.svg',
      );
    });

    it('transform a white logo to black', () => {
      const src = transformSrcLogoToBlack(
        'https://images.simpletire.com/images/manf-logos/113w/accelera-tires.svg',
      );

      expect(src).toEqual(
        'https://images.simpletire.com/images/manf-logos/113b/accelera-tires.svg',
      );
    });
  });
});
