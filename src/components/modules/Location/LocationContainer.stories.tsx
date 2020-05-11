import { css } from '@emotion/core';
import { action } from '@storybook/addon-actions';
import { useState } from 'react';

import { UserPersonalizationUpdate } from '~/data/models/UserPersonalizationUpdate';

import LocationContainer from './LocationContainer';

const styles = {
  container: css({
    height: '100vh',
  }),
};

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

  const handleLocationChangeSuccess = (location: UserPersonalizationUpdate) => {
    action(
      `handleLocationChangeSuccess - id: ${location.userLocationGooglePlacesId}, zip: ${location.userLocationZip}`,
    );

    const newLocation = {
      cityName: 'Brooklyn',
      stateAbbr: 'NY',
      zip: '11201',
    };

    setLocation(newLocation);
  };

  return (
    <div css={styles.container}>
      <LocationContainer
        focusInputOnMount
        currentLocation={location}
        onLocationChangeSuccess={handleLocationChangeSuccess}
        onCurrentLocationError={onCurrentLocationError}
      />
    </div>
  );
}
