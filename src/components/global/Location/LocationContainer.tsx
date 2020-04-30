import { useEffect, useState } from 'react';

import Autocomplete from '~/components/global/Autocomplete/Autocomplete';

import { styles } from './Location.styles';

interface Props {
  currentLocation?: {
    cityName: string | null;
    stateAbbr: string | null;
    zip: string | null;
  };
}

const CONSTANTS = {
  API_KEY: 'AIzaSyBvMeJJOTIcPWeZiaLjnf0bTfo4Se7koFY', // TODO: Move to env variable with app implementation
  SCRIPT_ID: 'google-maps-apis',
  SEARCH_OPTIONS: {
    componentRestrictions: { country: 'us' },
    radius: 1,
    types: ['geocode'],
  },
  /* The AutocompletePrediction API returns smart results based on the user's location.
   * That isn't ideal for our purposes since it may lead to false negatives. For example,
   * a search for valid East Coast ZIPs sent from a browser located in the West Coast may return
   * 0 results. To circumvent this, we are setting the location to the Geographical Center of the US
   * and then setting the search radius to 1 (see SEARCH_OPTIONS.radius above) to force the API to
   * return ZIP codes matching a valid string no matter the location from which they are requested.
   */
  US_CENTER_COORDS: { lat: 39.8283459, lng: -98.5794797 },
};

const filterResults = (
  results: Array<google.maps.places.AutocompletePrediction>,
) => {
  const newResults = results.map((result) => ({
    main: result.structured_formatting.main_text,
    secondary: result.structured_formatting.secondary_text.replace(', USA', ''),
  }));

  return newResults;
};

const filterPredictions = (
  predictions: google.maps.places.AutocompletePrediction[],
) =>
  predictions.filter((prediction) => prediction.types.includes('postal_code'));

const appendGMapScript = (onLoadCallBack: () => void) => {
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

function LocationContainer({ currentLocation }: Props) {
  const [results, setResults] = useState<
    Array<google.maps.places.AutocompletePrediction>
  >([]);
  const [latLng, setLatLng] = useState<google.maps.LatLng | undefined>(
    undefined,
  );
  const [search, setSearch] = useState('');
  const [
    autocomplete,
    setAutocomplete,
  ] = useState<google.maps.places.AutocompleteService | null>(null);

  const onChange = (input: string) => {
    setSearch(input);
  };

  const initGMapScripts = () => {
    setAutocomplete(new window.google.maps.places.AutocompleteService());
    setLatLng(new window.google.maps.LatLng(CONSTANTS.US_CENTER_COORDS));
  };

  useEffect(() => {
    if (document.querySelector(`#${CONSTANTS.SCRIPT_ID}`)) {
      initGMapScripts();
      return;
    }

    appendGMapScript(initGMapScripts);
  }, []);

  useEffect(() => {
    let didCancel = false;
    if (!autocomplete) {
      return () => {};
    }

    const fetchPredictions = () => {
      autocomplete.getPlacePredictions(
        {
          input: search,
          location: latLng,
          ...CONSTANTS.SEARCH_OPTIONS,
        },
        (predictions, status) => {
          !didCancel &&
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            setResults(filterPredictions(predictions));
        },
      );
    };

    if (search.length) {
      fetchPredictions();
    }

    return () => {
      didCancel = true;
    };
  }, [autocomplete, latLng, search]);

  const errorLabel = (
    <span>
      Oops. <br />
      Please enter a valid ZIP code.
    </span>
  );

  return (
    <Autocomplete
      label="Enter your ZIP code"
      errorLabel={errorLabel}
      onChange={onChange}
      results={filterResults(results)}
    >
      <>
        {currentLocation && (
          <span css={styles.currentLocation}>
            {currentLocation.cityName}, {currentLocation.stateAbbr}{' '}
            {currentLocation.zip}
          </span>
        )}
      </>
    </Autocomplete>
  );
}

export default LocationContainer;
