import { OrderStatus } from '~/components/pages/OrderTrackingResult/OrderTrackingResult.utils';

import { OrderAppointment } from './OrderAppointment';
import { OrderProduct } from './OrderProduct';
import { OrderShippingStageList } from './OrderShippingStageList';
import { UserAddress } from './UserAddress';

export interface Order {
  deliveryExpectedLabel?: string | null;
  id: number;
  is_split: boolean;
  maskedEmail?: string;
  orderInstallerAppointment?: OrderAppointment | null;
  orderProductList: Array<OrderProduct>;
  orderShippingStageList: Array<OrderShippingStageList>;
  shippingAddress: UserAddress;
  status: OrderStatus;
}
