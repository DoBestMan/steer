import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Cookies } from 'react-cookie';

import Button from '~/components/global/Button/Button';
import { CARS, CARS_KEYS } from '~/components/global/Car/CarDetails.constants';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Loading from '~/components/global/Loading/Loading';
import Markdown from '~/components/global/Markdown/MarkdownDynamic';
import PageIllustration from '~/components/global/PageIllustration/PageIllustration';
import Toast from '~/components/global/Toast/Toast';
import ToastOnScreen from '~/components/global/Toast/ToastWithoutModal';
import { noMyCarsAddedDescription } from '~/components/modules/Account/Account.constants';
import { useAccountContext } from '~/components/modules/Account/Account.context';
import AccountHeader from '~/components/modules/Account/AccountHeader/AccountHeader';
import { useSearchContext } from '~/components/modules/Search/Search.context';
import { useSearchModalContext } from '~/components/modules/Search/SearchModal.context';
import CarDetails from '~/components/pages/MyGaragePage/CarDetails/CarDetails';
import { minWidthForMultipleDisplay } from '~/components/pages/MyOrdersPage/MyOrdersPage.utils';
import { useUserPersonalizationContext } from '~/context/UserPersonalization.context';
import { MyVehicle } from '~/data/models/MyVehicle';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { BUTTON_STYLE, THEME } from '~/lib/constants';
import { SSO_COOKIE_CONSTANTS } from '~/lib/constants/sso';
import { getSSOLoginURL } from '~/lib/utils/sso';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './MyGaragePage.styles';

export default function MyGaragePage() {
  const loaderSection = useRef<null | HTMLDivElement>(null);
  const [isSearchOpenForVehicle, setLocalSearchState] = useState<boolean>(
    false,
  );
  const { vehicle, unselectVehicle } = useUserPersonalizationContext();
  const {
    lockSearchStateToVehicle,
    setShouldPreventLinkNavigation,
  } = useSearchContext();
  const { setIsSearchOpen, isSearchOpen } = useSearchModalContext();
  const {
    getMyVehicles,
    myVehicles,
    vehicleError,
    addMyVehicle,
    deleteMyVehicle,
    isLoading,
    setIsLoading,
    toastStatus,
    toastMessage,
    toggleToastStatus,
  } = useAccountContext();
  const { isMobile, windowWidth } = useBreakpoints();
  const shouldDisplayAtBottom =
    isMobile || windowWidth < minWidthForMultipleDisplay;

  const doesUserHaveVehicles =
    !vehicleError && (myVehicles?.userVehicles || []).length > 0;

  const cookies = new Cookies();
  const ssoToken = cookies.get(SSO_COOKIE_CONSTANTS.SIMPLETIRE_SSO);

  useEffect(() => {
    // if no sso token in cookie, redirect to sso login

    if (!ssoToken) {
      window.location.href = getSSOLoginURL();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openVehicleSelector = useCallback(() => {
    setLocalSearchState(true);
    setShouldPreventLinkNavigation(true);
    unselectVehicle();
    lockSearchStateToVehicle();
    setIsSearchOpen(true);
  }, [
    setShouldPreventLinkNavigation,
    unselectVehicle,
    lockSearchStateToVehicle,
    setIsSearchOpen,
  ]);

  const onDeleteVehicle = async ({
    make,
    model,
    option,
    vehicleId,
    year,
  }: MyVehicle) => {
    if (loaderSection.current) {
      loaderSection.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
    setIsLoading(true);
    unselectVehicle();
    await deleteMyVehicle(String(vehicleId), {
      make,
      model,
      option,
      year,
    });
  };

  useEffect(() => {
    if (!isSearchOpen && isSearchOpenForVehicle) {
      updateVehicle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSearchOpen]);

  const updateVehicle = async () => {
    if (vehicle) {
      if (loaderSection.current) {
        loaderSection.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
      setLocalSearchState(false);
      const { vehicleMake, vehicleModel, vehicleTrim, vehicleYear } = vehicle;
      const vehicleData = {
        make: vehicleMake,
        model: vehicleModel,
        option: vehicleTrim,
        year: vehicleYear,
      };
      await addMyVehicle(vehicleData);
    }
  };

  useEffect(() => {
    // load the vehicles data as soon as the page loads
    getMyVehicles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function renderToast() {
    return !shouldDisplayAtBottom ? (
      <Toast isOpen={toastStatus} onDismiss={() => toggleToastStatus(false)}>
        <Markdown>{toastMessage}</Markdown>
      </Toast>
    ) : (
      <div css={styles.orderStatusAlign}>
        <ToastOnScreen
          isOpen={toastStatus}
          onDismiss={() => toggleToastStatus(false)}
        >
          <h1 css={styles.toastMessage}>{toastMessage}</h1>
        </ToastOnScreen>
      </div>
    );
  }

  function renderLoader() {
    return (
      (isLoading || !ssoToken) && (
        <div css={styles.loaderContainer}>
          <Loading />
        </div>
      )
    );
  }

  function renderDefault() {
    return (
      <div css={styles.noCarsContainer}>
        {noMyCarsAddedDescription.map((item, index) => (
          <li key={index} css={styles.noCarsDescContianer}>
            <div css={styles.bulletPointContainer}>
              <div css={styles.bulletPoint} />
            </div>
            <div css={styles.bulletText}>
              <h1 css={styles.noCarsDescription}>{item}</h1>
            </div>
          </li>
        ))}
      </div>
    );
  }

  const renderVehicleList = () => {
    return (
      !vehicleError &&
      myVehicles?.userVehicles?.map((item, index) => (
        <li key={index}>
          <CarDetails
            {...item}
            deleteCar={(vehicleData: MyVehicle) => onDeleteVehicle(vehicleData)}
          />
        </li>
      ))
    );
  };

  return (
    <>
      <Grid css={styles.container}>
        <AccountHeader
          title={ui('account.myGarageHeader')}
          description={ui('account.myGarageDescription')}
          showReturnOption
        />
        <GridItem>
          <div css={styles.root}>
            {ssoToken &&
            myVehicles?.userVehicles &&
            myVehicles.userVehicles?.length > 0
              ? renderVehicleList()
              : renderDefault()}
            {renderToast()}
            <div ref={loaderSection} css={styles.searchVehicleContainer}>
              <Button
                isDisabled={isLoading}
                css={[doesUserHaveVehicles && styles.searchVehicleButton]}
                style={
                  !doesUserHaveVehicles
                    ? BUTTON_STYLE.SOLID
                    : BUTTON_STYLE.OUTLINED
                }
                theme={THEME.LIGHT}
                onClick={openVehicleSelector}
              >
                {ui('account.addToGarage')}
              </Button>
              {renderLoader()}
            </div>
          </div>
        </GridItem>
        <PageIllustration carId={CARS[CARS_KEYS.SEDAN]} />
      </Grid>
    </>
  );
}
