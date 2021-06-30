import { ReactNode, useEffect, useState } from 'react';

import { createCarDescription } from '~/components/pages/MyGaragePage/CarDetails/CarDetail.utils';
import { MyOrders } from '~/data/models/MyOrders';
import { MyVehicleList } from '~/data/models/MyVehicle';
import { apiDeleteMyOrder } from '~/lib/api/delete-my-order';
import { apiGetMyOrders } from '~/lib/api/get-my-orders';
import { apiGetMyVehicle } from '~/lib/api/get-my-vehicle';
import {
  apiAddMyVehicle,
  apiDeleteMyVehicle,
} from '~/lib/api/update-my-vehicle';
import { TIME } from '~/lib/constants';
import { SSO_CONSTANTS } from '~/lib/constants/sso';
import { isClient } from '~/lib/helpers/browser';
import { createContext } from '~/lib/utils/context';
import { deleteSSOParamsFromCookie, getSSORedirectURL } from '~/lib/utils/sso';
import { ui } from '~/lib/utils/ui-dictionary';

import { CarInput, OrderDeleteDataWithError } from './Account.types';

interface Props {
  children: ReactNode;
}

export interface AccountContextProps {
  addMyVehicle: (body: CarInput) => void;
  deleteMyOrder: (orderId: string) => void;
  deleteMyVehicle: (vehicleId: string, body: CarInput) => void;
  getMyOrders: (page: string) => void;
  getMyVehicles: () => void;
  handleLogout: () => void;
  hasErrorOrders: boolean;
  isLoading: boolean;
  myOrders: MyOrders | null;
  myVehicles: MyVehicleList | null;
  setIsLoading: (input: boolean) => void;
  setMyOrders: (input: MyOrders) => void;
  setMyVehicles: (input: MyVehicleList) => void;
  toastMessage: string;
  toastStatus: boolean;
  toggleToastStatus: (input: boolean) => void;
  vehicleError: boolean;
}

const AccountContext = createContext<AccountContextProps>();

function useContextSetup() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastStatus, toggleToastStatus] = useState<boolean>(false);
  const [hasErrorOrders, setHasErrorInOrders] = useState<boolean>(false);
  const [vehicleError, setVehicleError] = useState<boolean>(false);
  const [myOrders, setMyOrders] = useState<MyOrders | null>(null);
  const [myVehicles, setMyVehicles] = useState<MyVehicleList | null>(null);

  const handleLogout = async () => {
    await deleteSSOParamsFromCookie();
    if (isClient()) {
      const ssoLogoutURL = await getSSORedirectURL(SSO_CONSTANTS.LOGOUT);
      window.location.href = ssoLogoutURL;
    }
  };

  const getMyOrders = async (page: string) => {
    if (!isLoading) {
      setIsLoading(true);
    }
    const response = await apiGetMyOrders(page);

    if (response.isSuccess) {
      setIsLoading(false);
      setHasErrorInOrders(false);
      setMyOrders(response.data);
      return;
    }
    setMyOrders(null);
    setIsLoading(false);
    setHasErrorInOrders(true);
    return;
  };

  const deleteMyOrder = async (orderId: string) => {
    setIsLoading(true);
    const response = await apiDeleteMyOrder(orderId);
    if (response.isSuccess) {
      setIsLoading(false);
      const data = response.data as OrderDeleteDataWithError;
      if (data.message) {
        const toastMessage = data.message;
        setToastMessage(toastMessage);
        setHasErrorInOrders(true);
        setTimeout(() => {
          window.location.reload();
        }, TIME.MS2000);
        return;
      }
      setMyOrders(data);
      const toastMessage = ui('account.orderCancelled');
      setToastMessage(toastMessage);
      setHasErrorInOrders(false);
      return;
    }
    const toastMessage = ui('error.generic');
    setToastMessage(toastMessage);
    setIsLoading(false);
    setHasErrorInOrders(true);
    setTimeout(() => {
      window.location.reload();
    }, TIME.MS2000);
    return;
  };

  const getMyVehicles = async () => {
    if (!isLoading) {
      setIsLoading(true);
    }
    const response = await apiGetMyVehicle();
    if (response.isSuccess) {
      setIsLoading(false);
      setVehicleError(false);
      setMyVehicles(response.data);
      return;
    }
    setMyVehicles(null);
    setIsLoading(false);
    setVehicleError(true);
    return;
  };

  const addMyVehicle = async (body: CarInput) => {
    setIsLoading(true);
    const response = await apiAddMyVehicle(body);
    if (response.isSuccess) {
      const data = response.data as MyVehicleList;
      setMyVehicles(data);
      const toastMessage = ui('account.addVehicleSuccess', {
        vehicle: createCarDescription(body),
      });
      setToastMessage(toastMessage);
      setIsLoading(false);
      setVehicleError(false);
      return;
    }
    setToastMessage(ui('account.updateVehicleError'));
    setIsLoading(false);
    setVehicleError(true);
    return;
  };

  const deleteMyVehicle = async (vehicleId: string, body: CarInput) => {
    const response = await apiDeleteMyVehicle(vehicleId);
    if (response.isSuccess) {
      setMyVehicles(response.data);
      const toastMessage = ui('account.deleteVehicleSuccess', {
        vehicle: createCarDescription(body),
      });
      setToastMessage(toastMessage);
      setIsLoading(false);
      setVehicleError(false);
      return;
    }
    setToastMessage(ui('account.updateVehicleError'));
    setIsLoading(false);
    setVehicleError(true);
    return;
  };

  useEffect(() => {
    if (!toastStatus && toastMessage) {
      toggleToastStatus(true);
      setTimeout(() => {
        setToastMessage('');
        toggleToastStatus(false);
      }, TIME.MS2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastMessage]);

  return {
    addMyVehicle,
    deleteMyOrder,
    deleteMyVehicle,
    getMyOrders,
    getMyVehicles,
    handleLogout,
    hasErrorOrders,
    isLoading,
    myOrders,
    myVehicles,
    setIsLoading,
    setMyOrders,
    setMyVehicles,
    toastMessage,
    toastStatus,
    toggleToastStatus,
    vehicleError,
  };
}

export function AccountContextProvider({ children }: Props) {
  const value = useContextSetup();

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
}

export const useAccountContext = AccountContext.useContext;
