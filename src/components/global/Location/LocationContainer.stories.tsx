import { useState } from 'react';

import { AutocompleteResult } from '~/components/global/Autocomplete/AutocompleteResultItem';

import LocationContainer from './LocationContainer';

export default {
  component: LocationContainer,
  title: 'Location',
};

const currentLocation = {
  cityName: 'Boulder',
  stateAbbr: 'CO',
  zip: '80301',
};

const onCurrentLocationError = (error: string) => {
  console.error(error);
};

export function Location() {
  const [location, setLocation] = useState(currentLocation);

  const handleLocationChangeSuccess = (location: AutocompleteResult) => {
    const [cityName, stateAbbr] = location.secondary.split(', ');

    const newLocation = {
      cityName,
      stateAbbr,
      zip: location.main,
    };

    setLocation(newLocation);
  };

  return (
    <LocationContainer
      currentLocation={location}
      onLocationChangeSuccess={handleLocationChangeSuccess}
      onCurrentLocationError={onCurrentLocationError}
    />
  );
}
