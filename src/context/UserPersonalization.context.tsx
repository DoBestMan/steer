import { ReactNode, useEffect, useState } from 'react';

import { UserPersonalization } from '~/data/models/UserPersonalization';
import { UserPersonalizationUpdate } from '~/data/models/UserPersonalizationUpdate';
import { apiBootstrap } from '~/lib/api/bootstrap';
import { apiUpdateUserPersonalization } from '~/lib/api/users';
import { fetchGetUserPersonalization } from '~/lib/fetch';
import { createContext } from '~/lib/utils/context';

export interface UserPersonalizationProps {
  locationString: string;
  updateLocation: (body: UserPersonalizationUpdate) => void;
  userPersonalizationData: UserPersonalization | null;
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

  return {
    locationString,
    updateLocation,
    userPersonalizationData,
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
