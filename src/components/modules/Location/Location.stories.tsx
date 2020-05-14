import { css } from '@emotion/core';
import { action } from '@storybook/addon-actions';
import { useState } from 'react';

import { UserPersonalizationUpdate } from '~/data/models/UserPersonalizationUpdate';
import { FetchErrorCodes } from '~/lib/fetch/FetchError';

import Location from './Location';

const styles = {
  container: css({
    height: '100vh',
  }),
};

export default {
  component: Location,
  title: 'Location Page',
};

const oldCurrentLocation = {
  cityName: 'Boulder',
  stateAbbr: 'CO',
  zip: '80301',
};

const newCurrentLocation = {
  cityName: 'Brooklyn',
  stateAbbr: 'NY',
  zip: '11201',
};

export function LocationPage() {
  const [location, setLocation] = useState(oldCurrentLocation);

  async function handleLocationChangeSuccess(
    location: UserPersonalizationUpdate,
  ) {
    if (location.userLocationZip === '90210') {
      throw { code: FetchErrorCodes.InvalidJson };
    } else {
      setLocation(newCurrentLocation);
    }
  }

  const onCurrentLocationError = action('Current location error event');
  const handleOnDismiss = action('Dismissed successful location change');

  return (
    <div css={styles.container}>
      <Location
        currentLocation={location}
        focusInputOnMount
        onDismiss={handleOnDismiss}
        onLocationChangeSuccess={handleLocationChangeSuccess}
        onCurrentLocationError={onCurrentLocationError}
      />
    </div>
  );
}
