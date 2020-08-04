import { PromotionCardProps } from '~/components/global/PromotionCard/PromotionCard';
import { PromotionLinksProps } from '~/components/global/PromotionCard/PromotionLinks';

import { SiteIcon } from './SiteIcon';

export interface DealsItem {
  items: Array<PromotionCardProps>;
  title: string;
}

export interface GraphicGridItem {
  copy: string;
  icon: SiteIcon;
  link: PromotionLinksProps;
  title: string;
}
export interface TopGraphicGrid {
  items: Array<GraphicGridItem>;
  type: string;
}
export interface SiteDeals {
  deals: Array<DealsItem>;
  topGraphicGrid: TopGraphicGrid;
}
