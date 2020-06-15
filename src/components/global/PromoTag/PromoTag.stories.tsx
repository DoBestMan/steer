import { boolean, select, text } from '@storybook/addon-knobs';

import { ICONS } from '~/components/global/Icon/Icon.constants';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';

import PromoTag from './PromoTag';
import { PROMO_STYLES } from './PromoTag.types';

export default {
  component: PromoTag,
  title: 'Global/Promo Tag',
};

const styleOptions = {
  Default: PROMO_STYLES.DEFAULT,
  'Black Pill': PROMO_STYLES.BLACK_PILL,
  'White Pill': PROMO_STYLES.WHITE_PILL,
  'Orange Pill': PROMO_STYLES.ORANGE_PILL,
};

const iconOptions = {
  Fire: ICONS.FIRE,
  Lightning: ICONS.LIGHTNING,
  Return: ICONS.RETURN,
  Shield: ICONS.SHIELD,
  Tag: ICONS.TAG,
  Wrench: ICONS.WRENCH,
};

export function PromoTagWithKnobs() {
  return (
    <PromoTag
      style={select('Style', styleOptions, PROMO_STYLES.DEFAULT)}
      isUppercase={boolean('Uppercase', false)}
      icon={{
        svgId: select('Icon', iconOptions, ICONS.TAG),
        type: ICON_IMAGE_TYPE.ICON,
      }}
      label={text('Label', 'Spring Sale')}
    />
  );
}

export function BlackPillPromoTag() {
  return (
    <PromoTag
      style={PROMO_STYLES.BLACK_PILL}
      isUppercase
      label="Black Friday"
    />
  );
}

export function WhitePillPromoTag() {
  return (
    <PromoTag
      style={PROMO_STYLES.WHITE_PILL}
      icon={{
        svgId: ICONS.SHIELD,
        type: ICON_IMAGE_TYPE.ICON,
      }}
      label="Includes Road Hazard"
    />
  );
}

export function OrangePillPromoTag() {
  return (
    <PromoTag
      style={PROMO_STYLES.ORANGE_PILL}
      icon={{
        svgId: ICONS.LIGHTNING,
        type: ICON_IMAGE_TYPE.ICON,
      }}
      label="Instant Rebate"
    />
  );
}
