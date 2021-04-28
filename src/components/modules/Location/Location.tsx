import React, { useCallback, useEffect, useState } from 'react';

import Autocomplete from '~/components/global/Autocomplete/Autocomplete';
import { AutocompleteResult } from '~/components/global/Autocomplete/AutocompleteResultItem';
import GridItem from '~/components/global/Grid/GridItem';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Loading from '~/components/global/Loading/Loading';
import Markdown from '~/components/global/Markdown/Markdown';
import { NAV_TARGETS } from '~/components/modules/Nav/Nav.types';
import { useNavContext } from '~/context/Nav.context';
import { useUserPersonalizationContext } from '~/context/UserPersonalization.context';
import { UserPersonalizationUpdate } from '~/data/models/UserPersonalizationUpdate';
import { TIME } from '~/lib/constants';
import { onlyNumbers } from '~/lib/utils/regex';
import { ui } from '~/lib/utils/ui-dictionary';

import AutocompleteResultItemLocation from './AutocompleteResultItemLocation';
import BrowserLocationFailed from './BrowserLocationFailed';
import { styles } from './Location.styles';
import LocationInfo from './LocationInfo';
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

enum MODAL_MESSAGE_TYPE {
  ERROR = 'error',
  SUCCESS = 'success',
}

const filterPredictions = (
  predictions: google.maps.places.PlaceResult[],
  search: string,
) =>
  predictions
    .filter((result) => result.name.indexOf(search) > 0)
    .map((result) => ({
      id: result.place_id || '',
      main: result.name.indexOf(search) === -1 ? '' : search,
      secondary: result.name.replace(search, ''),
    }));

function Location({
  currentLocation,
  focusInputOnMount,
  onCurrentLocationError,
  onLocationChangeSuccess,
  ...rest
}: Props) {
  const [results, setResults] = useState<Array<AutocompleteResult>>([]);
  const { autocomplete, latLng } = useGMapsScripts();
  const [search, setSearch] = useState('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [hasInvalidInput, setHasInvalidInput] = useState(false);
  const [modalMessage, setModalMessage] = useState<MODAL_MESSAGE_TYPE | string>(
    '',
  );
  const [specificErrorMessage, setSpecificErrorMessage] = useState('');

  const { handleCloseSubNav } = useNavContext();
  const {
    browserLocationFailed,
    hideUseCurrentLocation,
    isLoadingLocationSearch,
    setBrowserLocationFailed,
    setIsLoadingLocationSearch,
  } = useUserPersonalizationContext();
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
      autocomplete.findPlaceFromQuery(
        {
          query: search,
          fields: ['name', 'place_id'],
        },
        (predictions, status) => {
          !didCancel &&
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            setResults(filterPredictions(predictions, search));

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

  useEffect(() => {
    const isSuccess = modalMessage === MODAL_MESSAGE_TYPE.SUCCESS;
    let timer: ReturnType<typeof window.setTimeout>;
    if (isSuccess) {
      timer = setTimeout(() => {
        handleCloseSubNav();
        if (setBrowserLocationFailed) {
          setBrowserLocationFailed(false);
        }
      }, TIME.MS3000);
    }

    return () => {
      if (isSuccess) {
        clearTimeout(timer);
      }
    };
  }, [handleCloseSubNav, modalMessage, setBrowserLocationFailed]);

  async function onValueSelectionSuccess(result: AutocompleteResult) {
    try {
      await onLocationChangeSuccess({
        userLocationGooglePlacesId: result.id,
        userLocationZip: result.main,
      });
      setIsLoadingLocationSearch(false);
      setModalMessage(MODAL_MESSAGE_TYPE.SUCCESS);
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
    setModalMessage(MODAL_MESSAGE_TYPE.ERROR);
    setSpecificErrorMessage(error);
    console.error(`error: ${error}`);
  }

  const modalMessages: {
    [key in MODAL_MESSAGE_TYPE | string]: JSX.Element | string;
  } = {
    [MODAL_MESSAGE_TYPE.SUCCESS]: (
      <>
        <Markdown>
          {ui('location.successMessage', {
            location: `${currentLocation?.cityName}, ${currentLocation?.stateAbbr}, ${currentLocation?.zip}`,
          })}
        </Markdown>
        <div css={styles.locationShippingMsg}>
          <Icon css={styles.locationShippingCheckIcon} name={ICONS.CHECKMARK} />
          {ui('location.successShipMessage')}
        </div>
      </>
    ),
    [MODAL_MESSAGE_TYPE.ERROR]: (
      <Markdown>{ui(specificErrorMessage || 'location.errorMessage')}</Markdown>
    ),
  };

  function handleInvalidInput(isInvalidInput: boolean) {
    if (hasInvalidInput !== isInvalidInput) {
      setHasInvalidInput(isInvalidInput);
    }
  }

  const shouldDisplayCurrenctLocation =
    currentLocation &&
    currentLocation.cityName &&
    currentLocation.stateAbbr &&
    currentLocation.zip;
  return (
    <GridItem css={styles.container} {...rest}>
      <div css={styles.content}>
        <Autocomplete
          icon={ICONS.SEARCH}
          label={ui('location.inputLabel')}
          errorLabel={errorLabel}
          inputMaxLength={5}
          focusOnMount={focusInputOnMount}
          inputValidationRegEx={onlyNumbers}
          isLoadingResults={isLoadingLocation}
          minimumCharacterBeforeError={5}
          onChange={onChange}
          onInvalidInput={handleInvalidInput}
          onIsLoadingValueSelection={setIsLoadingLocationSearch}
          onValueSelectionSuccess={onValueSelectionSuccess}
          results={results}
          resultItemComponent={AutocompleteResultItemLocation}
          testId="location-input"
        />
        {isLoadingLocationSearch && (
          <Loading customContainerStyles={styles.loadingIndicator} />
        )}
        {!hasResults && !modalMessage && !hasInvalidInput && (
          <>
            {shouldDisplayCurrenctLocation && (
              <span css={styles.currentLocation}>
                {`${ui('location.deliverToLabel')} ${
                  currentLocation?.cityName
                }, ${currentLocation?.stateAbbr} ${currentLocation?.zip}`}
              </span>
            )}
            {!hideUseCurrentLocation && (
              <UseCurrentLocation
                onCurrentLocationSuccess={onValueSelectionSuccess}
                onCurrentLocationError={handleCurrentLocationError}
              />
            )}
            <LocationInfo />
            {browserLocationFailed && <BrowserLocationFailed />}
          </>
        )}

        {modalMessage && (
          <p css={styles.infoContainer}>{modalMessages[modalMessage]}</p>
        )}
      </div>
    </GridItem>
  );
}

export default Location;
