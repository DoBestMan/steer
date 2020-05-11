import { useEffect, useState } from 'react';

import Icon from '~/components/global/Icon/Icon';
import { ui } from '~/lib/utils/ui-dictionary';

import { styles } from './Location.styles';

interface Props {
  onCurrentLocationError: (error: string) => void;
  onCurrentLocationSuccess: (zip: string) => void;
}

const getBrowserLocation = (callback: PositionCallback) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(callback);
  } else {
    alert(ui('location.locationSupportError'));
  }
};

const getZipFromAddressComponents = (
  addressComponents: google.maps.GeocoderAddressComponent[],
) =>
  addressComponents.find((component) => component.types.includes('postal_code'))
    ?.long_name;

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
              const zipCode = getZipFromAddressComponents(
                results[0].address_components,
              );

              if (zipCode) {
                onCurrentLocationSuccess(zipCode);
              } else {
                onCurrentLocationError('No results found');
              }
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
    <button css={styles.useCurrentLocationButton} onClick={handleOnClick}>
      {ui('location.useCurrentLocationLabel')}
      <Icon css={styles.useCurrentLocationIcon} name="geolocation" />
    </button>
  );
}

export default UseCurrentLocation;
