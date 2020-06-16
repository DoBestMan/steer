import { action } from '@storybook/addon-actions';
import { useState } from 'react';

import { UserPersonalizationUpdate } from '~/data/models/UserPersonalizationUpdate';
import { StylesMap } from '~/lib/constants';
import { FetchErrorCodes } from '~/lib/fetch/FetchError';

import Location from './Location';

const styles: StylesMap = {
  container: {
    height: '100vh',
  },
};

export default {
  component: Location,
  title: 'Nav/Location Subnav Section',
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
  return (
    <div css={styles.container}>
      <Location
        currentLocation={location}
        focusInputOnMount
        onLocationChangeSuccess={handleLocationChangeSuccess}
        onCurrentLocationError={onCurrentLocationError}
      />
    </div>
  );
}
