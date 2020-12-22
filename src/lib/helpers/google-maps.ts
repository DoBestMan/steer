import { getZipFromAddressComponents } from '~/components/modules/Location/UseCurrentLocation';
import { appendGMapsScript } from '~/components/modules/Location/useGMapsScripts';
import { LatLng } from '~/lib/helpers/user-personalization';

export const getZipFromLatLng = ({ latitude, longitude }: LatLng) => {
  return new Promise((resolve, reject) => {
    appendGMapsScript(() => {
      const geocoder = new window.google.maps.Geocoder();
      const request = {
        location: {
          lat: latitude,
          lng: longitude,
        },
      };

      geocoder.geocode(request, (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK && results.length) {
          const zipCode =
            results[0] && results[0].address_components.length
              ? getZipFromAddressComponents(results[0].address_components)
              : null;

          return zipCode
            ? resolve({
                id: results[0].place_id,
                main: zipCode,
              })
            : reject(null);
        }
      });
    });
  });
};
