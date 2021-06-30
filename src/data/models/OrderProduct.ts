import { SiteCatalogBrand } from './SiteCatalogBrand';
import { SiteImage } from './SiteImage';

export interface OrderProduct {
  brand: SiteCatalogBrand;
  canCustomerCancelReturn: boolean;
  canCustomerReorder: boolean;
  canCustomerReturn: boolean;
  extendedPrice: number;
  image: SiteImage;
  name: string;
  price: number;
  productId: number;
  quantity: number;
}
