import { useCallback, useEffect, useState } from 'react';

import Autocomplete from '~/components/global/Autocomplete/Autocomplete';
import { locationAutocomplete as locationAutocompleteStyles } from '~/components/global/Autocomplete/Autocomplete.styles';
import { AutocompleteResult } from '~/components/global/Autocomplete/AutocompleteResultItem';
import GridItem from '~/components/global/Grid/GridItem';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Markdown from '~/components/global/Markdown/Markdown';
import SubNavContentWrapper from '~/components/modules/SubNav/SubNavContentWrapper';
import { UserPersonalizationUpdate } from '~/data/models/UserPersonalizationUpdate';
import { onlyNumbers } from '~/lib/utils/regex';
import { ui } from '~/lib/utils/ui-dictionary';

import AutocompleteResultItemLocation from './AutocompleteResultItemLocation';
import { styles } from './Location.styles';
import LocationInfo from './LocationInfo';
import LocationToast, { TOAST_TYPE } from './LocationToast';
import UseCurrentLocation from './UseCurrentLocation';
import { useGMapsScripts } from './useGMapsScripts';

interface Props {
  currentLocation: {
    cityName: string | null;
    stateAbbr: string | null;
    zip: string | null;
  } | null;
  focusInputOnMount?: boolean;
  onCurrentLocationError?: (error: string) => void;
  onDismiss: () => void;
  onLocationChangeSuccess: (location: UserPersonalizationUpdate) => void;
}

const CONSTANTS = {
  SEARCH_OPTIONS: {
    componentRestrictions: { country: 'us' },
    radius: 1,
    types: ['geocode'],
  },
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

function Location({
  currentLocation,
  focusInputOnMount,
  onCurrentLocationError,
  onDismiss,
  onLocationChangeSuccess,
}: Props) {
  const [results, setResults] = useState<Array<AutocompleteResult>>([]);
  const { autocomplete, latLng } = useGMapsScripts();
  const [search, setSearch] = useState('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const [toastMessage, setToastMessage] = useState<TOAST_TYPE | string>('');

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

  async function onValueSelectionSuccess(result: AutocompleteResult) {
    try {
      await onLocationChangeSuccess({
        userLocationGooglePlacesId: result.id,
        userLocationZip: result.main,
      });
      setToastMessage(TOAST_TYPE.SUCCESS);
    } catch (error) {
      handleCurrentLocationError(error.code);
    }
  }

  function handleCurrentLocationError(error: string) {
    if (onCurrentLocationError) {
      onCurrentLocationError(error);
    }
    setToastMessage(TOAST_TYPE.ERROR);
    console.error(`error: ${error}`);
  }

  const toastMessages: {
    [key in TOAST_TYPE | string]: JSX.Element | string;
  } = {
    [TOAST_TYPE.SUCCESS]: (
      <Markdown>
        {ui('location.successMessage', {
          location: `${currentLocation?.cityName}, ${currentLocation?.stateAbbr}, ${currentLocation?.zip}`,
        })}
      </Markdown>
    ),
    [TOAST_TYPE.ERROR]: <Markdown>{ui('location.errorMessage')}</Markdown>,
  };

  return (
    <GridItem css={styles.container}>
      <SubNavContentWrapper isOpen onClose={onDismiss} onBack={onDismiss}>
        <div css={styles.content}>
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
            onValueSelectionSuccess={onValueSelectionSuccess}
            results={results}
            resultItemComponent={AutocompleteResultItemLocation}
          />
          {!hasResults && !toastMessage && (
            <>
              {currentLocation && (
                <span css={styles.currentLocation}>
                  {currentLocation.cityName}, {currentLocation.stateAbbr}{' '}
                  {currentLocation.zip}
                </span>
              )}
              <UseCurrentLocation
                onCurrentLocationSuccess={onValueSelectionSuccess}
                onCurrentLocationError={handleCurrentLocationError}
              />
              <LocationInfo />
            </>
          )}

          <LocationToast
            toastMessage={toastMessage}
            message={toastMessages[toastMessage]}
            onDismiss={onDismiss}
            setToastMessage={setToastMessage}
          />
        </div>
      </SubNavContentWrapper>
    </GridItem>
  );
}

export default Location;
