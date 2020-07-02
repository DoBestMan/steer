import { useCallback, useEffect, useState } from 'react';

import Autocomplete from '~/components/global/Autocomplete/Autocomplete';
import { AutocompleteResult } from '~/components/global/Autocomplete/AutocompleteResultItem';
import GridItem from '~/components/global/Grid/GridItem';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Markdown from '~/components/global/Markdown/Markdown';
import { TOAST_TYPE } from '~/components/global/Toast/Toast';
import { NAV_TARGETS } from '~/components/modules/Nav/Nav.types';
import { UserPersonalizationUpdate } from '~/data/models/UserPersonalizationUpdate';
import { onlyNumbers } from '~/lib/utils/regex';
import { ui } from '~/lib/utils/ui-dictionary';

import AutocompleteResultItemLocation from './AutocompleteResultItemLocation';
import { styles } from './Location.styles';
import LocationInfo from './LocationInfo';
import LocationToast from './LocationToast';
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
  onLocationChangeSuccess,
}: Props) {
  const [results, setResults] = useState<Array<AutocompleteResult>>([]);
  const { autocomplete, latLng } = useGMapsScripts();
  const [search, setSearch] = useState('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [hasInvalidInput, setHasInvalidInput] = useState(false);
  const [toastMessage, setToastMessage] = useState<TOAST_TYPE | string>('');
  function onDismiss() {
    setToastMessage('');
  }
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

  const contentLabel = ui('location.contentLabel');
  const closeButtonModal = document.querySelector(
    `[aria-label="${ui('common.modal.close', { contentLabel })}"]`,
  ) as HTMLElement;
  const closeButtonSubNav = document.querySelector(
    `[aria-label="${ui('nav.close')} ${NAV_TARGETS.LOCATION}"]`,
  ) as HTMLElement;

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

    if (closeButtonModal) {
      closeButtonModal.focus();
    } else if (closeButtonSubNav) {
      closeButtonSubNav.focus();
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

  function handleInvalidInput(isInvalidInput: boolean) {
    if (hasInvalidInput !== isInvalidInput) {
      setHasInvalidInput(isInvalidInput);
    }
  }

  return (
    <GridItem css={styles.container}>
      <div css={styles.content}>
        <Autocomplete
          icon={ICONS.SEARCH}
          label={ui('location.inputLabel')}
          errorLabel={errorLabel}
          inputMaxLength={5}
          focusOnMount={focusInputOnMount}
          inputValidationRegEx={onlyNumbers}
          isLoadingResults={isLoadingLocation}
          minimumCharacterBeforeError={3}
          onChange={onChange}
          onInvalidInput={handleInvalidInput}
          onValueSelectionSuccess={onValueSelectionSuccess}
          results={results}
          resultItemComponent={AutocompleteResultItemLocation}
        />
        {!hasResults && !toastMessage && !hasInvalidInput && (
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
    </GridItem>
  );
}

export default Location;
