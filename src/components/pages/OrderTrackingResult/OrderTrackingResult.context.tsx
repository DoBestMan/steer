import { ReactNode, useState } from 'react';

import { Order } from '~/data/models/Order';
import { OrderTrackingInput } from '~/data/models/OrderTrackingInput';
import { apiSendEmailReciept } from '~/lib/api/send-email-reciept';
import { apiGetOrderTracking } from '~/lib/api/track-order';
import { createContext } from '~/lib/utils/context';

interface Props {
  children: ReactNode;
}

export interface OrderTrackingContextProps {
  emailSent: boolean;
  getOrderTracking: ({ orderId, zip }: OrderTrackingInput) => void;
  hasError: boolean;
  isLoadingOrder: boolean;
  isSendingEmail: boolean;
  order: Order | null;
  sendEmailReciept: ({ orderId, zip }: OrderTrackingInput) => void;
}

const OrderTrackingContext = createContext<OrderTrackingContextProps>();

function useContextSetup() {
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoadingOrder, setIsLoadingOrder] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isSendingEmail, setIsSendingEmail] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);

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
    getOrderTracking,
    hasError,
    isLoadingOrder,
    isSendingEmail,
    order,
    sendEmailReciept,
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
