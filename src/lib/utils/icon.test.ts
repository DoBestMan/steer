import { ICON_IMAGE_TYPE } from '../backend/icon-image.types';
import { isVehicleSvg } from './icon';

describe('isVehicleSvg', () => {
  it('given a SiteIcon or SiteImage, returns a bool if it is a vehicle icon', () => {
    expect(
      isVehicleSvg({
        svgId: 'vehicle-passenger',
        type: ICON_IMAGE_TYPE.ICON,
      }),
    ).toBe(true);
    expect(isVehicleSvg({ svgId: 'fire', type: ICON_IMAGE_TYPE.ICON })).toBe(
      false,
    );
    expect(
      isVehicleSvg({
        altText: 'altText',
        srcSet: 'srcSet',
        type: ICON_IMAGE_TYPE.IMAGE,
      }),
    ).toBe(false);
  });
});
