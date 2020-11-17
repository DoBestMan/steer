import { AccordionProps } from '~/components/global/Accordion/Accordion';
import { ArticleListWithFeaturedProps } from '~/components/global/ArticleListWithFeatured/ArticleListWithFeatured';
import { ButtonGridProps } from '~/components/global/ButtonGrid/ButtonGrid';
import { DataTableProps } from '~/components/global/DataTables/DataTableVertical';
import { FeaturedInfoModuleProps } from '~/components/global/FeaturedInfoModule/FeaturedInfoModule';
import { ImageProps } from '~/components/global/Image/Image';
import { LinkListProps } from '~/components/global/LinkList/LinkList';
import { QuoteProps } from '~/components/global/Quote/Quote';
import { SearchByBoardProps } from '~/components/global/SearchByBoard/SearchByBoard';
import { VideoProps } from '~/components/global/Video/Video';
import { InstallationProps } from '~/components/modules/PDP/Installation/Installation';
import { SiteLink } from '~/data/models/SiteLink';
import { SiteLinkWithLabel } from '~/data/models/SiteLinkWithLabel';
import { SiteModuleTypes } from '~/data/models/SiteModuleTypes.ts';
import { SiteReviews } from '~/data/models/SiteReviews';
import { TextBasedNavigationProps } from '~/data/models/TextBasedNavigationProps';
import { THEME } from '~/lib/constants';

import { SiteDealsCarousel } from './SiteDealsCarousel';
import { SiteGraphicTile } from './SiteGraphicTile';

export interface SiteModule {
  type: SiteModuleTypes;
}

export interface SiteModuleAccordion extends SiteModule, AccordionProps {
  hasBottomBorder?: boolean;
}

export interface SiteModuleDataTableVertical
  extends DataTableProps,
    SiteModule {}

export interface SiteModuleArticleListWithFeatured
  extends ArticleListWithFeaturedProps,
    SiteModule {}

export interface SiteModuleBreadcrumbsItem extends SiteModule {
  label: string;
  link: SiteLink;
}

export interface SiteModuleBreadcrumbs {
  breadcrumbs: SiteModuleBreadcrumbsItem[];
}

export interface SiteModuleGraphicGridItem extends FeaturedInfoModuleProps {
  link?: SiteLinkWithLabel;
}

export interface SiteModuleGraphicGrid extends SiteModule {
  items: SiteModuleGraphicGridItem[];
}

export interface SiteModuleLinkWithLabel extends SiteLinkWithLabel {
  marginTop?: number;
  marginBottom?: number;
  theme?: THEME;
}
export interface SiteModuleImage extends ImageProps, SiteModule {}

export interface SiteModuleLinkList extends LinkListProps, SiteModule {}

export interface SiteModuleMarkdown extends SiteModule {
  body: string;
}

export interface SiteModuleQuote extends QuoteProps, SiteModule {}

export interface SiteModuleReviews extends SiteModule {
  siteReviews?: SiteReviews;
}

export interface SiteModuleTextList
  extends TextBasedNavigationProps,
    SiteModule {}

export interface SiteModuleYouTubeVideo extends VideoProps, SiteModule {}

export interface SiteModuleButtonGrid extends ButtonGridProps, SiteModule {
  headerText?: string;
}

export interface SiteModulePDPInstallation
  extends InstallationProps,
    SiteModule {}

export interface SiteModuleSearchByBoard
  extends SearchByBoardProps,
    SiteModule {}

export interface SiteModulePromotionCards
  extends SiteDealsCarousel,
    SiteModule {}

export interface SiteModuleCircularIllustrationCarousel extends SiteModule {
  dataItems: Array<SiteGraphicTile>;
  headerText?: string;
  imageTypeForMaxWidth?:
    | 'vehicleModel'
    | 'vehicleTypes'
    | 'logosBrands'
    | 'logosMakes';
}
