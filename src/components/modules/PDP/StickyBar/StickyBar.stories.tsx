import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import { useRef } from 'react';

import { SiteImage } from '~/data/models/SiteImage';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';

import PDPStickyBar from './StickyBar';

export default {
  component: PDPStickyBar,
  title: 'PDP/Sticky Bar',
};

const logoMock: SiteImage = {
  altText: 'Continental',
  src: '/images/brands/continental_logo.svg',
  type: ICON_IMAGE_TYPE.IMAGE,
};
const productLine = 'ProContact';
const tireSize = '215/55R16 89H';
const rearSize = '245/55R19 89H';
const startingPrice = '7999';
const sizesAvailable = 32;
const tirePrice = '7999';
const rearPrice = '9999';

export function StickyBarWithKnobs() {
  const darkSection = useRef(null);
  const hasTireSize = boolean('Has tire size?', false);
  const hasRearSize = boolean('Has rear tire size?', false);

  const onClickAddToCart = action('click-add-to-cart');
  const onClickFindYourSize = action('click-find-your-size');
  function onClickChangeQuantity(position: 'front' | 'rear') {
    return action(`click-change-quantity-${position}`);
  }

  return (
    <PDPStickyBar
      brandLogo={logoMock}
      darkSection={darkSection}
      productLine={productLine}
      rearSize={hasRearSize ? rearSize : undefined}
      rearPrice={hasRearSize ? rearPrice : undefined}
      startingPrice={startingPrice}
      sizesAvailable={sizesAvailable}
      tireSize={hasTireSize ? tireSize : undefined}
      tirePrice={hasTireSize ? tirePrice : undefined}
      onClickAddToCart={onClickAddToCart}
      onClickChangeQuantity={onClickChangeQuantity}
      onClickFindYourSize={onClickFindYourSize}
    />
  );
}
