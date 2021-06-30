import { OrderAppointment } from './OrderAppointment';
import { OrderProduct } from './OrderProduct';
import { ShippingCarriers } from './ShippingCarriers';

export interface userOrders {
  canUserCancelOrder: boolean;
  created: Date;
  orderAppointment: OrderAppointment | null;
  orderId: string;
  orderProducts: Array<OrderProduct>;
  shippingCarriers: Array<ShippingCarriers> | null;
  shippingZip: string;
  status: string;
  total: string;
}
