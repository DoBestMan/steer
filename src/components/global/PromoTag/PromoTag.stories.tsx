import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';

import { ICONS } from '~/components/global/Icon/Icon.constants';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';

import PromoTag, { PromoTagProps } from './PromoTag';
import { PROMO_STYLES } from './PromoTag.types';
import PromoTagCarouselComponent from './PromoTagCarousel';

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

const handleClick = action('click-promo-tag');

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
      handleClick={boolean('Clickable?', false) ? handleClick : undefined}
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

export function PromoTagCarousel() {
  const tags: PromoTagProps[] = [
    {
      style: PROMO_STYLES.DEFAULT,
      icon: {
        svgId: ICONS.TAG,
        type: ICON_IMAGE_TYPE.ICON,
      },
      label: 'Spring Sale',
    },
    {
      style: PROMO_STYLES.WHITE_PILL,
      icon: {
        svgId: ICONS.REBATE,
        type: ICON_IMAGE_TYPE.ICON,
      },
      label: '$70 Rebate',
    },
    {
      style: PROMO_STYLES.ORANGE_PILL,
      icon: {
        svgId: ICONS.WRENCH,
        type: ICON_IMAGE_TYPE.ICON,
      },
      label: 'Free installation',
    },
    {
      style: PROMO_STYLES.BLACK_PILL,
      icon: {
        svgId: ICONS.LIGHTNING,
        type: ICON_IMAGE_TYPE.ICON,
      },
      label: 'Black Friday',
    },
  ];

  return <PromoTagCarouselComponent tags={tags} />;
}
