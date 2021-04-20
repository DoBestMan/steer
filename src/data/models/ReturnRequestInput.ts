import { OrderTrackingInput } from './OrderTrackingInput';
import { ReturnRequestFormInput } from './ReturnRequestFormInput';

interface ReturnRequestData {
  productId: string;
  body: ReturnRequestFormInput;
}

export type ReturnRequestInput = ReturnRequestData & OrderTrackingInput;
