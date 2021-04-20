import { ReactNode, useState } from 'react';

import { Order } from '~/data/models/Order';
import { OrderProduct } from '~/data/models/OrderProduct';
import { OrderTrackingInput } from '~/data/models/OrderTrackingInput';
import { ReturnReason } from '~/data/models/ReturnReason';
import { ReturnRequestInput } from '~/data/models/ReturnRequestInput';
import { apiGetReturnReasons } from '~/lib/api/get-return-reasons';
import { apiSendCancelRequest } from '~/lib/api/send-cancel-request';
import { apiSendEmailReciept } from '~/lib/api/send-email-reciept';
import { apiSendReturnRequest } from '~/lib/api/send-return-request';
import { apiGetOrderTracking } from '~/lib/api/track-order';
import { createContext } from '~/lib/utils/context';

interface Props {
  children: ReactNode;
}
interface RequestType {
  type: string;
}

type ReturnReasonDataProps = OrderProduct & OrderTrackingInput;
type ReturnRequestProps = ReturnRequestInput & RequestType;

export interface OrderTrackingContextProps {
  emailSent: boolean;
  errorInReturnReasons: boolean;
  getOrderTracking: ({ orderId, zip }: OrderTrackingInput) => void;
  getReturnReasons: ({
    id,
    image,
    name,
    quantity,
    zip,
    orderId,
  }: ReturnReasonDataProps) => void;
  hasError: boolean;
  isLoadingOrder: boolean;
  isLoadingReturnReasons: boolean;
  isSendingEmail: boolean;
  isSendingReturnOrCancelReq: boolean;
  order: Order | null;
  returnOrCancelReqError: boolean;
  returnOrCancelReqSent: boolean;
  returnReasons: Array<ReturnReason>;
  returnTireData: ReturnReasonDataProps | null;
  sendEmailReciept: ({ orderId, zip }: OrderTrackingInput) => void;
  sendReturnRequest: ({
    orderId,
    zip,
    productId,
    body,
  }: ReturnRequestProps) => void;
}

const OrderTrackingContext = createContext<OrderTrackingContextProps>();

function useContextSetup() {
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoadingReturnReasons, setIsloadingReturnReasons] = useState<boolean>(
    false,
  );
  const [errorInReturnReasons, setErrorForReturnReasons] = useState<boolean>(
    false,
  );
  const [
    returnTireData,
    setReturnData,
  ] = useState<ReturnReasonDataProps | null>(null);
  const [returnReasons, setReturnReasons] = useState<Array<ReturnReason>>([]);
  const [isLoadingOrder, setIsLoadingOrder] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const [isSendingEmail, setIsSendingEmail] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);

  const [isSendingReturnOrCancelReq, setReturnOrCancelReqLoading] = useState<
    boolean
  >(false);
  const [returnOrCancelReqSent, setReturnOrCancelReqStatus] = useState<boolean>(
    false,
  );
  const [returnOrCancelReqError, setReturnOrCancelRequestError] = useState<
    boolean
  >(false);

  const sendReturnRequest = async ({
    orderId,
    zip,
    productId,
    body,
    type,
  }: ReturnRequestProps) => {
    setReturnOrCancelReqLoading(true);
    setReturnOrCancelRequestError(false);
    const res =
      type === 'return'
        ? await apiSendReturnRequest({
            orderId,
            zip,
            productId,
            body,
          })
        : await apiSendCancelRequest({
            orderId,
            zip,
            productId,
            body,
          });
    if (res.isSuccess) {
      setReturnOrCancelRequestError(false);
      setReturnOrCancelReqLoading(false);
      setReturnOrCancelReqStatus(true);
      return;
    }
    setReturnOrCancelRequestError(true);
    setReturnOrCancelReqLoading(false);
    setReturnOrCancelReqStatus(false);
  };

  const getReturnReasons = async (productDetails: ReturnReasonDataProps) => {
    setIsloadingReturnReasons(true);
    setErrorForReturnReasons(false);

    const res = await apiGetReturnReasons();
    if (res.isSuccess) {
      setErrorForReturnReasons(false);
      setReturnData({
        ...productDetails,
      });
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setReturnReasons(res.data!['orderReturnReasons']);
      setIsloadingReturnReasons(false);
      return;
    }

    setIsloadingReturnReasons(false);
    setErrorForReturnReasons(true);
  };

  const sendEmailReciept = async ({ orderId, zip }: OrderTrackingInput) => {
    setIsSendingEmail(true);
    const res = await apiSendEmailReciept({
      orderId,
      zip,
    });
    if (res.isSuccess) {
      setIsSendingEmail(false);
      setEmailSent(true);
      return;
    }
    setIsSendingEmail(false);
    setEmailSent(false);
  };

  const getOrderTracking = async ({ orderId, zip }: OrderTrackingInput) => {
    setIsLoadingOrder(true);
    hasError && setHasError(false);

    const res = await apiGetOrderTracking({
      orderId,
      zip,
    });

    if (res.isSuccess) {
      setOrder(res.data.order);
      setIsLoadingOrder(false);
      return;
    }

    setIsLoadingOrder(false);
    setHasError(true);
  };

  return {
    emailSent,
    errorInReturnReasons,
    getOrderTracking,
    getReturnReasons,
    hasError,
    isLoadingOrder,
    isLoadingReturnReasons,
    isSendingEmail,
    isSendingReturnOrCancelReq,
    order,
    returnOrCancelReqError,
    returnOrCancelReqSent,
    returnReasons,
    returnTireData,
    sendEmailReciept,
    sendReturnRequest,
  };
}

export function OrderTrackingContextProvider({ children }: Props) {
  const value = useContextSetup();

  return (
    <OrderTrackingContext.Provider value={value}>
      {children}
    </OrderTrackingContext.Provider>
  );
}

export const useOrderTrackingContext = OrderTrackingContext.useContext;
