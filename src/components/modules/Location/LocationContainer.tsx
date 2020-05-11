import { useCallback, useEffect, useState } from 'react';

import Autocomplete from '~/components/global/Autocomplete/Autocomplete';
import { locationAutocomplete as locationAutocompleteStyles } from '~/components/global/Autocomplete/Autocomplete.styles';
import { AutocompleteResult } from '~/components/global/Autocomplete/AutocompleteResultItem';
import GridItem from '~/components/global/Grid/GridItem';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Markdown from '~/components/global/Markdown/Markdown';
import { UserPersonalizationUpdate } from '~/data/models/UserPersonalizationUpdate';
import { onlyNumbers } from '~/lib/utils/regex';
import { ui } from '~/lib/utils/ui-dictionary';

import AutocompleteResultItemLocation from './AutocompleteResultItemLocation';
import { styles } from './Location.styles';
import LocationInfo from './LocationInfo';
import UseCurrentLocation from './UseCurrentLocation';

interface Props {
  currentLocation: {
    cityName: string | null;
    stateAbbr: string | null;
    zip: string | null;
  } | null;
  focusInputOnMount?: boolean;
  onCurrentLocationError: (error: string) => void;
  onLocationChangeSuccess: (location: UserPersonalizationUpdate) => void;
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

const filterPredictions = (
  predictions: google.maps.places.AutocompletePrediction[],
) =>
  predictions
    .filter((prediction) => prediction.types.includes('postal_code'))
    .map((result) => ({
      id: result.place_id,
      main: result.structured_formatting.main_text,
      secondary: result.structured_formatting.secondary_text.replace(
        ', USA',
        '',
      ),
    }));

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

function LocationContainer({
  currentLocation,
  focusInputOnMount,
  onCurrentLocationError,
  onLocationChangeSuccess,
}: Props) {
  const [results, setResults] = useState<Array<AutocompleteResult>>([]);
  const [latLng, setLatLng] = useState<google.maps.LatLng | undefined>(
    undefined,
  );
  const [search, setSearch] = useState('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isFreeShipping, setIsFreeShipping] = useState(false);
  const [
    autocomplete,
    setAutocomplete,
  ] = useState<google.maps.places.AutocompleteService | null>(null);

  const onChange = useCallback(
    (input: string) => {
      // We need to clear the results when the input is empty to
      // prevent glitches caused by the API req/res time when entering
      // a new search term while trying to match it to old results
      if (input === '') {
        setResults([]);
      }
      setSearch(input);
    },
    [setSearch],
  );

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

          setIsLoadingLocation(false);
        },
      );
    };

    if (search.length) {
      fetchPredictions();
      setIsLoadingLocation(true);
    }

    return () => {
      didCancel = true;
      setIsLoadingLocation(false);
    };
  }, [autocomplete, latLng, search]);

  const errorLabel = <Markdown>{ui('location.errorLabel')}</Markdown>;

  const hasResults = results.length > 0;
  function onValueSelectionSuccess(result: AutocompleteResult) {
    onLocationChangeSuccess({
      userLocationGooglePlacesId: result.id,
      userLocationZip: result.main,
    });
  }

  return (
    <GridItem css={styles.container}>
      <Autocomplete
        css={locationAutocompleteStyles}
        icon={ICONS.SEARCH}
        label="Enter your ZIP code"
        errorLabel={errorLabel}
        inputMaxLength={5}
        focusOnMount={focusInputOnMount}
        inputValidationRegEx={onlyNumbers}
        isLoadingResults={isLoadingLocation}
        minimumCharacterBeforeError={3}
        onChange={onChange}
        onInputResultMatch={setIsFreeShipping}
        onValueSelectionSuccess={onValueSelectionSuccess}
        results={results}
        resultItemComponent={AutocompleteResultItemLocation}
      />

      {!hasResults && (
        <>
          {currentLocation && (
            <span css={styles.currentLocation}>
              {currentLocation.cityName}, {currentLocation.stateAbbr}{' '}
              {currentLocation.zip}
            </span>
          )}
          <UseCurrentLocation
            onCurrentLocationSuccess={onLocationChangeSuccess}
            onCurrentLocationError={onCurrentLocationError}
          />
        </>
      )}

      <LocationInfo isFreeShipping={isFreeShipping} />
    </GridItem>
  );
}

export default LocationContainer;
