import { OrderStatus } from '~/components/pages/TrackingResult/TrackingResult.utils';

import { OrderProduct } from './OrderProduct';
import { SiteLink } from './SiteLink';
import { UserAddress } from './UserAddress';

export interface Order {
  createdAt: Date;
  deliveredAt?: Date | null;
  deliveryExpectedLabel?: string | null;
  id: string;
  orderProductList: Array<OrderProduct>;
  shippedAt?: Date | null;
  shippingAddress: UserAddress;
  status: OrderStatus;
  trackingLabel: string | null;
  trackingLink: SiteLink | null;
}
