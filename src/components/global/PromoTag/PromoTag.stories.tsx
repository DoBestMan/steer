import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';

import { ICONS } from '~/components/global/Icon/Icon.constants';
import { SitePromotionStyleEnum } from '~/data/models/SitePromotion';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';

import PromoTag, { PromoTagProps } from './PromoTag';
import PromoTagCarouselComponent from './PromoTagCarousel';

export default {
  component: PromoTag,
  title: 'Global/Promo Tag',
};

const styleOptions = {
  Default: SitePromotionStyleEnum.SitePromotionItemDefault,
  'Black Pill': SitePromotionStyleEnum.SitePromotionItemBlackPill,
  'White Pill': SitePromotionStyleEnum.SitePromotionItemWhitePill,
  'Orange Pill': SitePromotionStyleEnum.SitePromotionItemOrangePill,
};

const iconOptions = {
  Fire: ICONS.FIRE,
  Lightning: ICONS.LIGHTNING_SMALL,
  Return: ICONS.REBATE_SMALL,
  Shield: ICONS.WARRANTY,
  Tag: ICONS.TAG_SMALL,
  Wrench: ICONS.WRENCH,
};

const handleClick = action('click-promo-tag');
const mockOpenDynamicModal = action('open-dynamic-modal');

export function PromoTagWithKnobs() {
  return (
    <PromoTag
      style={select(
        'Style',
        styleOptions,
        SitePromotionStyleEnum.SitePromotionItemDefault,
      )}
      isUppercase={boolean('Uppercase', false)}
      icon={{
        svgId: select('Icon', iconOptions, ICONS.TAG_SMALL),
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
      style={SitePromotionStyleEnum.SitePromotionItemBlackPill}
      isUppercase
      label="Black Friday"
    />
  );
}

export function WhitePillPromoTag() {
  return (
    <PromoTag
      style={SitePromotionStyleEnum.SitePromotionItemWhitePill}
      icon={{
        svgId: ICONS.WARRANTY,
        type: ICON_IMAGE_TYPE.ICON,
      }}
      label="Includes Road Hazard"
    />
  );
}

export function OrangePillPromoTag() {
  return (
    <PromoTag
      style={SitePromotionStyleEnum.SitePromotionItemOrangePill}
      icon={{
        svgId: ICONS.LIGHTNING_SMALL,
        type: ICON_IMAGE_TYPE.ICON,
      }}
      label="Instant Rebate"
    />
  );
}

export function PromoTagCarousel() {
  const tags: PromoTagProps[] = [
    {
      style: SitePromotionStyleEnum.SitePromotionItemDefault,
      icon: {
        svgId: ICONS.TAG_SMALL,
        type: ICON_IMAGE_TYPE.ICON,
      },
      label: 'Spring Sale',
    },
    {
      style: SitePromotionStyleEnum.SitePromotionItemWhitePill,
      icon: {
        svgId: ICONS.REBATE,
        type: ICON_IMAGE_TYPE.ICON,
      },
      label: '$70 Rebate',
    },
    {
      style: SitePromotionStyleEnum.SitePromotionItemOrangePill,
      icon: {
        svgId: ICONS.WRENCH,
        type: ICON_IMAGE_TYPE.ICON,
      },
      label: 'Free installation',
    },
    {
      style: SitePromotionStyleEnum.SitePromotionItemBlackPill,
      icon: {
        svgId: ICONS.LIGHTNING_SMALL,
        type: ICON_IMAGE_TYPE.ICON,
      },
      label: 'Black Friday',
    },
  ];

  return (
    <PromoTagCarouselComponent
      openDynamicModal={mockOpenDynamicModal}
      tags={tags}
    />
  );
}
