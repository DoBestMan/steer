import { OrderShippingStage } from './OrderShippingStage';
export interface OrderShippingStageList {
  name: string;
  displayName: string;
  updatedAt?: string | null;
  note?: string | null;
  sort: number;
  isCompleted: boolean;
  orderTrackingNumberList?: Array<OrderShippingStage> | null;
}
