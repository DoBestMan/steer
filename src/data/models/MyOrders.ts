import { ListResultMetadata } from './ListResultMetadata';
import { userOrders } from './UserOrderList';

export interface MyOrders {
  listResultMetadata: ListResultMetadata;
  userOrders: Array<userOrders>;
}
