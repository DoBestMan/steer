import { transformSrcLogoToBlack, transformSrcLogoToWhite } from './cloudinary';
import {
  CLOUDINARY_BLACK_BRAND_LOGO,
  CLOUDINARY_WHITE_BRAND_LOGO,
} from './cloudinary.constants';

describe('utils/cloudinary', () => {
  describe('regex', () => {
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
