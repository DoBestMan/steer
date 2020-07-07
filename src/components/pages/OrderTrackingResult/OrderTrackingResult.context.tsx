import { ReactNode, useState } from 'react';

import { Order } from '~/data/models/Order';
import { OrderTrackingInput } from '~/data/models/OrderTrackingInput';
import { apiGetOrderTracking } from '~/lib/api/track-order';
import { createContext } from '~/lib/utils/context';

interface Props {
  children: ReactNode;
}

export interface OrderTrackingContextProps {
  getOrderTracking: ({ orderId, zip }: OrderTrackingInput) => void;
  hasError: boolean;
  isLoadingOrder: boolean;
  order: Order | null;
}

const OrderTrackingContext = createContext<OrderTrackingContextProps>();

function useContextSetup() {
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoadingOrder, setIsLoadingOrder] = useState(false);
  const [hasError, setHasError] = useState(false);

  const getOrderTracking = async ({ orderId, zip }: OrderTrackingInput) => {
    setIsLoadingOrder(true);
    hasError && setHasError(false);

    try {
      const { order } = await apiGetOrderTracking({
        orderId,
        zip,
      });

      setOrder(order);
      setIsLoadingOrder(false);
    } catch (err) {
      setIsLoadingOrder(false);
      setHasError(true);
    }
  };

  return {
    getOrderTracking,
    hasError,
    isLoadingOrder,
    order,
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
