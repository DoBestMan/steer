import { select, text, withKnobs } from '@storybook/addon-knobs';

import { ICONS } from '~/components/global/Icon/Icon.constants';
import { Icon as IconName } from '~/components/global/Icon/Icon.types';
import { SitePromotionStyleEnum } from '~/data/models/SitePromotion';

import PromotionHeader from './PromotionHeader';

export default {
  component: PromotionHeader,
  title: 'Global/Promotion Header',
  decorators: [withKnobs],
};

export function PromotionHeaderDefault() {
  const promotionTagColors = {
    [SitePromotionStyleEnum.SitePromotionItemBlackPill]:
      SitePromotionStyleEnum.SitePromotionItemBlackPill,
    [SitePromotionStyleEnum.SitePromotionItemDefault]:
      SitePromotionStyleEnum.SitePromotionItemDefault,
    [SitePromotionStyleEnum.SitePromotionItemOrangePill]:
      SitePromotionStyleEnum.SitePromotionItemOrangePill,
  };
  const protionDefaultValue = SitePromotionStyleEnum.SitePromotionItemBlackPill;
  const promoTagColor = select(
    'Promo Tag Color',
    promotionTagColors,
    protionDefaultValue,
  );
  return (
    <PromotionHeader
      iconName={text('Icon Name', ICONS.FIRE) as IconName}
      promoTagColor={promoTagColor}
      promoTagLabel={text(
        'Promo Tag Label',
        'limited inventory ∙ sale ends Nov 27th',
      )}
      title={text('Promo Title', 'Black Friday Deals')}
      subTitle={text(
        'Promo Sub Title',
        'Tire sales, rebates and installation deals.',
      )}
    />
  );
}
