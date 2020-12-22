import { useEffect, useState } from 'react';

const CONSTANTS = {
  API_KEY: process.env.GOOGLE_API_KEY || process.env.STORYBOOK_GOOGLE_API_KEY,
  SCRIPT_ID: 'google-maps-apis',
  /* The AutocompletePrediction API returns smart results based on the user's location.
   * That isn't ideal for our purposes since it may lead to false negatives. For example,
   * a search for valid East Coast ZIPs sent from a browser located in the West Coast may return
   * 0 results. To circumvent this, we are setting the location to the Geographical Center of the US
   * and then setting the search radius to 1 (see SEARCH_OPTIONS.radius in Location.tsx) to force the API to
   * return ZIP codes matching a valid string no matter the location from which they are requested.
   */
  US_CENTER_COORDS: { lat: 39.8283459, lng: -98.5794797 },
};

export const appendGMapsScript = (onLoadCallBack: () => void) => {
  // if googleapis script is already loaded do nothing.
  if (document.getElementById(CONSTANTS.SCRIPT_ID)) {
    return;
  }

  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.id = CONSTANTS.SCRIPT_ID;
  script.src = `https://maps.googleapis.com/maps/api/js?key=${CONSTANTS.API_KEY}&libraries=places`;
  document.getElementsByTagName('head')[0].appendChild(script);
  script.onload = function () {
    onLoadCallBack();
  };
};

export function useGMapsScripts() {
  const [latLng, setLatLng] = useState<google.maps.LatLng | undefined>(
    undefined,
  );
  const [
    autocomplete,
    setAutocomplete,
  ] = useState<google.maps.places.AutocompleteService | null>(null);

  const initGMapsScripts = () => {
    setAutocomplete(new window.google.maps.places.AutocompleteService());
    setLatLng(new window.google.maps.LatLng(CONSTANTS.US_CENTER_COORDS));
  };

  useEffect(() => {
    if (document.querySelector(`#${CONSTANTS.SCRIPT_ID}`)) {
      initGMapsScripts();
      return;
    }

    appendGMapsScript(initGMapsScripts);
  }, []);

  return {
    autocomplete,
    latLng,
  };
}
