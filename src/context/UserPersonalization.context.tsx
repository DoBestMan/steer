import lscache from 'lscache';
import { ReactNode, useCallback, useEffect, useState } from 'react';

import { AutocompleteResult } from '~/components/global/Autocomplete/AutocompleteResultItem';
import { UserPersonalization } from '~/data/models/UserPersonalization';
import { UserPersonalizationUpdate } from '~/data/models/UserPersonalizationUpdate';
import { VehicleMetadata } from '~/data/models/VehicleMetadata';
import { apiBootstrap } from '~/lib/api/bootstrap';
import { apiUpdateUserPersonalization } from '~/lib/api/users';
import { LOCAL_STORAGE, PROPERTIES } from '~/lib/constants/localStorage';
import { fetchGetUserPersonalization } from '~/lib/fetch';
import { getZipFromLatLng } from '~/lib/helpers/google-maps';
import {
  browserLocationCheck,
  LatLng,
} from '~/lib/helpers/user-personalization';
import { createContext } from '~/lib/utils/context';

const CONSTANTS = {
  VEHICLE_METADATA_KEY: LOCAL_STORAGE[PROPERTIES.VEHICLE_METADATA],
};

export interface UserPersonalizationProps {
  browserLocationFailed?: boolean;
  hideUseCurrentLocation?: boolean;
  isLoadingLocationSearch: boolean;
  locationString: string;
  selectVehicle: (vehicleMetadata: VehicleMetadata) => void;
  setBrowserLocationFailed?: (hasFailed: boolean) => void;
  setIsLoadingLocationSearch: (isLoading: boolean) => void;
  unselectVehicle: () => void;
  updateLocation: (body: UserPersonalizationUpdate) => void;
  userPersonalizationData: UserPersonalization | null;
  vehicle: VehicleMetadata | null;
}

interface Props {
  children: ReactNode;
  isStorybook?: boolean; // used for storybook only
}

const UserPersonalizationContext = createContext<UserPersonalizationProps>();

// Exported for testing only
export function useContextSetup(isStorybook?: boolean) {
  const [
    userPersonalizationData,
    setUserPersonalizationData,
  ] = useState<UserPersonalization | null>(null);
  const [vehicle, setVehicle] = useState(
    lscache.get(CONSTANTS.VEHICLE_METADATA_KEY) || null,
  );
  const [isLoadingLocationSearch, setIsLoadingLocationSearch] = useState<
    boolean
  >(false);
  const [hideUseCurrentLocation, setHideUseCurrentLocation] = useState<boolean>(
    false,
  );
  const [browserLocationFailed, setBrowserLocationFailed] = useState<boolean>(
    false,
  );

  useEffect(() => {
    // used for storybook only
    if (isStorybook) {
      return;
    }

    async function updateLocationFromBrowser() {
      const latLngFromBrowser = (await browserLocationCheck().catch(
        (error) => error || null,
      )) as LatLng;

      if (!latLngFromBrowser || latLngFromBrowser.isDenied) {
        const onHideUseLocation = () => {
          if (latLngFromBrowser.errorCode === 2) {
            setBrowserLocationFailed(true);
          }

          setHideUseCurrentLocation(true);
          return;
        };

        return latLngFromBrowser.isDenied ? onHideUseLocation() : null;
      }

      const zipFromLatLng =
        latLngFromBrowser &&
        ((await getZipFromLatLng(latLngFromBrowser).catch(
          (error) => error && null,
        )) as AutocompleteResult);

      const userPersonalizationResp = zipFromLatLng
        ? await apiUpdateUserPersonalization({
            userLocationGooglePlacesId: zipFromLatLng.id,
            userLocationZip: zipFromLatLng.main,
          })
        : { data: null, isSuccess: false };

      if (userPersonalizationResp.isSuccess) {
        setUserPersonalizationData(userPersonalizationResp.data);
      }
    }

    async function getData() {
      await apiBootstrap();
      const data = fetchGetUserPersonalization();
      setUserPersonalizationData(data);
      updateLocationFromBrowser();
    }

    getData();

    // this doesn't need to update for isStorybook
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function updateLocation(body: UserPersonalizationUpdate) {
    // awaiting session token before calling apiGetUserSearchHistory which needs authentication
    await apiBootstrap();
    const res = await apiUpdateUserPersonalization(body);

    if (res.isSuccess) {
      setUserPersonalizationData(res.data);
    }
  }

  const location = userPersonalizationData?.userLocation;
  const locationString =
    location && location.cityName && location.stateAbbr
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
    browserLocationFailed,
    hideUseCurrentLocation,
    isLoadingLocationSearch,
    locationString,
    selectVehicle,
    setBrowserLocationFailed,
    setIsLoadingLocationSearch,
    unselectVehicle,
    updateLocation,
    userPersonalizationData,
    vehicle,
  };
}

export function UserPersonalizationContextProvider({
  children,
  isStorybook,
}: Props) {
  const value = useContextSetup(isStorybook);
  return (
    <UserPersonalizationContext.Provider value={value}>
      {children}
    </UserPersonalizationContext.Provider>
  );
}

export const useUserPersonalizationContext =
  UserPersonalizationContext.useContext;
