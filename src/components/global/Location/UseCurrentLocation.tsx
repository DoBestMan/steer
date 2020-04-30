import { useEffect, useState } from 'react';

import Button from '~/components/global/Button/Button';
import Icon from '~/components/global/Icon/Icon';

import { styles } from './Location.styles';

interface Props {
  onCurrentLocationError: (error: string) => void;
  onCurrentLocationSuccess: (zip: string) => void;
}

const getBrowserLocation = (callback: PositionCallback) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(callback);
  } else {
    alert('Sorry, but Geolocation is not supported by this browser.');
  }
};

function UseCurrentLocation({
  onCurrentLocationError,
  onCurrentLocationSuccess,
}: Props) {
  const [latlng, setLatlng] = useState<google.maps.LatLngLiteral>();

  const handleOnClick = () => {
    getBrowserLocation((e) => {
      const { coords } = e;

      const newCoords: google.maps.LatLngLiteral = {
        lat: coords.latitude,
        lng: coords.longitude,
      };

      setLatlng(newCoords);
    });
  };

  useEffect(() => {
    if (!window.google) {
      return;
    }

    if (latlng) {
      const getGeoCodeLocation = (request: google.maps.GeocoderRequest) => {
        const geocoder = new window.google.maps.Geocoder();

        geocoder.geocode(request, (results, status) => {
          if (status === window.google.maps.GeocoderStatus.OK) {
            if (results[0]) {
              onCurrentLocationSuccess(
                results[0].address_components[7].long_name,
              );
            } else {
              onCurrentLocationError('No results found');
            }
          } else {
            onCurrentLocationError(`Geocoder failed due to: ${status}`);
          }
        });
      };

      getGeoCodeLocation({ location: latlng });
    }
  }, [latlng, onCurrentLocationSuccess, onCurrentLocationError]);

  return (
    <Button css={styles.useCurrentLocationButton} onClick={handleOnClick}>
      <>
        Use current location
        <Icon css={styles.useCurrentLocationIcon} name="geolocation" />
      </>
    </Button>
  );
}

export default UseCurrentLocation;
