import { MyOrders } from '~/data/models/MyOrders';

export interface MyOrdersInput {
  page: string;
  userId: string;
}

export interface DeleteOrdersInput {
  orderId: string;
  userId: string;
}

export interface UpdateVehicleInput {
  userId: string;
  vehicleId: string;
}

export interface CarInput {
  make: string;
  model: string;
  option: string;
  year: string;
}

export interface OrderDeleteDataWithError extends MyOrders {
  code?: string;
  message?: string;
  statusCode?: string;
}
