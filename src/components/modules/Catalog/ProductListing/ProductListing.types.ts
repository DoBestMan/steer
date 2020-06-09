import { SiteCatalogBrand } from '~/data/models/SiteCatalogBrand';
import { SiteImage } from '~/data/models/SiteImage';
import { SiteLink } from '~/data/models/SiteLink';
import { SitePrice } from '~/data/models/SitePrice';

export enum PRODUCT_IMAGE_TYPES {
  SIDETREAD = 'sidetread',
  SIDEWALL = 'sidewall',
  TREADFULL = 'treadfull',
  TREADONLY = 'treadonly',
}

export interface ProductListingProps {
  activeFilterPropertyList?: string[];
  attribute?: string;
  brand: SiteCatalogBrand;
  defaultImage: PRODUCT_IMAGE_TYPES;
  images: {
    image: SiteImage;
    productImageType: PRODUCT_IMAGE_TYPES;
  }[];
  isHighlighted?: boolean;
  link: SiteLink;
  name: string;
  priceList: {
    label: string | null;
    price: SitePrice;
  }[];
  rating: {
    quantity: number;
    value: number;
  } | null;
}
