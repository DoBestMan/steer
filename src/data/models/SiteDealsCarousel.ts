import { PromotionCardProps } from '~/components/global/PromotionCard/PromotionCard';

import { SiteIcon } from './SiteIcon';

export interface SiteDealsCarouselHeader {
  icon: SiteIcon;
  pill: string;
  subtitle: string;
  title: string;
}

export interface SiteDealsCarousel {
  header: SiteDealsCarouselHeader | null;
  carousel: {
    dealsCards: PromotionCardProps[];
  } | null;
}
