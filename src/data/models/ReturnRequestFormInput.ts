import { ReturnRequestImageAttachment } from './ReturnRequestImageAttachment';

export interface ReturnRequestFormInput {
  reasonId: number | null;
  comment: string;
  quantity: number;
  attachedImages: Array<ReturnRequestImageAttachment>;
}
