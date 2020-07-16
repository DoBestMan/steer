import lscache from 'lscache';
import { ReactNode, useCallback, useEffect, useState } from 'react';

import { UserPersonalization } from '~/data/models/UserPersonalization';
import { UserPersonalizationUpdate } from '~/data/models/UserPersonalizationUpdate';
import { VehicleMetadata } from '~/data/models/VehicleMetadata';
import { apiBootstrap } from '~/lib/api/bootstrap';
import { apiUpdateUserPersonalization } from '~/lib/api/users';
import { LOCAL_STORAGE, PROPERTIES } from '~/lib/constants/localStorage';
import { fetchGetUserPersonalization } from '~/lib/fetch';
import { createContext } from '~/lib/utils/context';

const CONSTANTS = {
  VEHICLE_METADATA_KEY: LOCAL_STORAGE[PROPERTIES.VEHICLE_METADATA],
};

export interface UserPersonalizationProps {
  locationString: string;
  selectVehicle: (vehicleMetadata: VehicleMetadata) => void;
  unselectVehicle: () => void;
  updateLocation: (body: UserPersonalizationUpdate) => void;
  userPersonalizationData: UserPersonalization | null;
  vehicle: VehicleMetadata | null;
}

interface Props {
  children: ReactNode;
}

const UserPersonalizationContext = createContext<UserPersonalizationProps>();

// Exported for testing only
export function useContextSetup() {
  const [
    userPersonalizationData,
    setUserPersonalizationData,
  ] = useState<UserPersonalization | null>(null);
  const [vehicle, setVehicle] = useState(
    lscache.get(CONSTANTS.VEHICLE_METADATA_KEY) || null,
  );

  useEffect(() => {
    async function getData() {
      await apiBootstrap();
      const data = fetchGetUserPersonalization();
      setUserPersonalizationData(data);
    }

    getData();
  }, []);

  async function updateLocation(body: UserPersonalizationUpdate) {
    const userPersonalization = await apiUpdateUserPersonalization(body);
    setUserPersonalizationData(userPersonalization);
  }

  const location = userPersonalizationData?.userLocation;
  const locationString = location
    ? `${location.cityName}, ${location.stateAbbr}`
    : '';

  const selectVehicle = useCallback(
    (vehicleMetadata: VehicleMetadata) => {
      lscache.set(CONSTANTS.VEHICLE_METADATA_KEY, vehicleMetadata);
      setVehicle(vehicleMetadata);
    },
    [setVehicle],
  );

  const unselectVehicle = useCallback(() => {
    lscache.remove(CONSTANTS.VEHICLE_METADATA_KEY);
    setVehicle(null);
  }, [setVehicle]);

  return {
    locationString,
    selectVehicle,
    unselectVehicle,
    updateLocation,
    userPersonalizationData,
    vehicle,
  };
}

export function UserPersonalizationContextProvider({ children }: Props) {
  const value = useContextSetup();
  return (
    <UserPersonalizationContext.Provider value={value}>
      {children}
    </UserPersonalizationContext.Provider>
  );
}

export const useUserPersonalizationContext =
  UserPersonalizationContext.useContext;
