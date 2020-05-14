import { useUserPersonalizationContext } from '~/context/UserPersonalization.context';

import Location from './Location';

interface Props {
  onDismiss: () => void;
}

function LocationContainer({ onDismiss }: Props) {
  const {
    updateLocation,
    userPersonalizationData,
  } = useUserPersonalizationContext();

  return (
    <Location
      currentLocation={userPersonalizationData?.userLocation ?? null}
      onLocationChangeSuccess={updateLocation}
      focusInputOnMount
      onDismiss={onDismiss}
    />
  );
}

export default LocationContainer;
