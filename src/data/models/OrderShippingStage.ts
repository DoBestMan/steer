import { SiteLink } from './SiteLink';
export interface OrderShippingStage {
  trackingNumber?: string | null;
  shippingMethod?: string | null;
  status?: string | null;
  trackingLink?: SiteLink | null;
}
