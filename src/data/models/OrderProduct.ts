import { SiteImage } from './SiteImage';

export interface OrderProduct {
  id: number;
  image: SiteImage;
  name: string;
  quantity: number;
  canCustomerReorder: boolean;
}
