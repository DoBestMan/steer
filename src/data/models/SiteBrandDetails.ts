import { HeaderWithLogoProps } from '~/components/global/HeaderWithLogo/HeaderWithLogo';
import { SiteCatalogProductGroupItem } from '~/data/models/SiteCatalogProductGroupList';
import { DealsItem } from '~/data/models/SiteDeals';
import { SiteLink } from '~/data/models/SiteLink';
import { SiteModuleImage } from '~/data/models/SiteModules';

export interface SiteBrandDetailsLink {
  type: string;
  label: string;
  link: SiteLink;
}

export interface SiteBrandDetailsSection {
  title?: string | null;
  links: SiteBrandDetailsLink[];
}

export interface SiteBrandDetailsGroups {
  title: string;
  sections: SiteBrandDetailsSection[];
}

export interface SiteBrandDetailsLinkList {
  title: string;
  groups: SiteBrandDetailsGroups[];
}

export interface SiteBrandDetails {
  header: HeaderWithLogoProps;
  promoImage: SiteModuleImage;
  curatedProducts: SiteCatalogProductGroupItem[];
  deals: DealsItem[];
  linkList: SiteBrandDetailsLinkList[];
}
