import { useEffect, useState } from 'react';

import { AutocompleteResult } from '~/components/global/Autocomplete/AutocompleteResultItem';
import Icon from '~/components/global/Icon/Icon';
import Loading from '~/components/global/Loading/Loading';
import { ui } from '~/lib/utils/ui-dictionary';

import { styles } from './Location.styles';

interface Props {
  onCurrentLocationError: (error: string) => void;
  onCurrentLocationSuccess: (result: AutocompleteResult) => void;
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
  const [isWaiting, setIsWaiting] = useState(false);

  const handleOnClick = () => {
    setIsWaiting(true);
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
                const result = {
                  id: results[0].place_id,
                  main: zipCode,
                };

                onCurrentLocationSuccess(result);
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
    <div css={styles.useCurrentLocationContainer}>
      {isWaiting ? (
        <Loading
          customStyles={styles.userCurrentLocationLoader}
          label={ui('location.loadingCurrentLocationLabel')}
        />
      ) : (
        <button css={styles.useCurrentLocationButton} onClick={handleOnClick}>
          {ui('location.useCurrentLocationLabel')}
          <Icon css={styles.useCurrentLocationIcon} name="geolocation" />
        </button>
      )}
    </div>
  );
}

export default UseCurrentLocation;
