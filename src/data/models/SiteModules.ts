import { AccordionProps } from '~/components/global/Accordion/Accordion';
import { ArticleListWithFeaturedProps } from '~/components/global/ArticleListWithFeatured/ArticleListWithFeatured';
import { FeaturedInfoModuleProps } from '~/components/global/FeaturedInfoModule/FeaturedInfoModule';
import { ImageProps } from '~/components/global/Image/Image';
import { LinkListProps } from '~/components/global/LinkList/LinkList';
import { QuoteProps } from '~/components/global/Quote/Quote';
import { VideoProps } from '~/components/global/Video/Video';
import { SiteLink } from '~/data/models/SiteLink';
import { SiteLinkWithLabel } from '~/data/models/SiteLinkWithLabel';
import { SiteModuleTypes } from '~/data/models/SiteModuleTypes.ts';
import { SiteReviews } from '~/data/models/SiteReviews';
import { TextBasedNavigationProps } from '~/data/models/TextBasedNavigationProps';

export interface SiteModule {
  type: SiteModuleTypes;
}

export interface SiteModuleAccordion extends SiteModule, AccordionProps {}

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
