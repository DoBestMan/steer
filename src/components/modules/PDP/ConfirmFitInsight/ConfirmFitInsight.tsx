/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { Transition } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';

import Car from '~/components/global/Car/Car';
import { Cars } from '~/components/global/Car/Car.enums';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import IconOrImage from '~/components/global/IconOrImage/IconOrImage';
import Markdown from '~/components/global/Markdown/MarkdownDynamic';
import { useSearchContext } from '~/components/modules/Search/Search.context';
import { useSearchModalContext } from '~/components/modules/Search/SearchModal.context';
import { DataMomentMessage } from '~/components/pages/CatalogPage/CatalogMessage/CatalogMessage';
import { useModalContext } from '~/context/Modal.context';
import { useUserPersonalizationContext } from '~/context/UserPersonalization.context';
import { ConfirmFitInsightData } from '~/data/models/ConfirmFitInsightData';
import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';
import { SiteQueryParams } from '~/data/models/SiteQueryParams';
import { VehicleMetadata } from '~/data/models/VehicleMetadata';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { usePreferedReduceMotion } from '~/hooks/usePreferedReduceMotion';
import { COLORS, TIME } from '~/lib/constants';

import ConfirmFitDecisionModal from '../ConfirmFitDecisonModal/ConfirmFitDecisonModal';
import VehicleSelectionModal from '../VehicleSelectionModal/VehicleSelectionModal';
import { animations, styles } from './ConfirmFitInsight.styles';
import {
  ConfirmFitType,
  createNewPDPURL,
  getClearAnimationTime,
  getVehicleCatalogData,
  getVehicleData,
} from './ConfirmFitInsight.utils';

export default function ConfirmFitInsight({
  icon,
  label,
  type,
  decisionModal,
  vehicleSelectionModalLabel,
}: ConfirmFitInsightData) {
  const hasMotion = usePreferedReduceMotion();
  const [showCarAnimation, setCarAnimStatus] = useState<boolean>(false);
  const [showFadeAnimation, setFadeAnimStatus] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [searchIsOpenConfirmFit, setSearchOpenedFromConfirmFit] = useState<
    boolean
  >(false);
  const carId = [Cars['car--sedan']];
  const { bk } = useBreakpoints();
  const isDefaultOrDoesntFit = type !== ConfirmFitType.FIT;
  const isNotDefault = type !== ConfirmFitType.DEFAULT;
  const isDoesntFit = type === ConfirmFitType.DOESNTFIT;
  const [disAmbigModalStatus, toggleDisAmbigModal] = useState<boolean>(false);
  const {
    lockSearchStateToVehicle,
    setShouldPreventLinkNavigation,
    shouldPreventLinkNavigation,
  } = useSearchContext();
  const { vehicle } = useUserPersonalizationContext();
  const { setIsSearchOpen } = useSearchModalContext();
  const [ConfirmFitModalStatus, setConfirmFitModalStatus] = useState<boolean>(
    false,
  );
  const [vehiclSelectModalStatus, setVehiclSelectModalStatus] = useState<
    boolean
  >(false);
  const [
    vehicleSummary,
    setVehicleSummary,
  ] = useState<SiteCatalogSummary | null>(null);
  const { openStaticModal } = useModalContext();

  useEffect(() => {
    // start the animation one second after component is mounted
    const timer = setTimeout(() => {
      setCarAnimStatus(true);
      setFadeAnimStatus(true);
      setIsAnimating(hasMotion);
    }, TIME.MS1000);
    return () => clearTimeout(timer);
  }, [hasMotion]);

  useEffect(() => {
    // remove the car transition component once animation is finished
    const timer = setTimeout(() => {
      if (showCarAnimation) {
        setCarAnimStatus(false);
      }
    }, getClearAnimationTime(bk));
    return () => {
      clearTimeout(timer);
    };
  }, [isAnimating]);

  useEffect(() => {
    if (showFadeAnimation) {
      setFadeAnimStatus(false);
    }
  }, [icon, label, type]);

  const openVehicleSelector = useCallback(() => {
    setSearchOpenedFromConfirmFit(true);
    setShouldPreventLinkNavigation(true);
    lockSearchStateToVehicle();
    setIsSearchOpen(true);
  }, [
    setSearchOpenedFromConfirmFit,
    setShouldPreventLinkNavigation,
    lockSearchStateToVehicle,
    setIsSearchOpen,
  ]);

  const reloadPageWithNewParams = (URL: string) => {
    window.location.href = URL;
    window.location.reload();
  };

  const getVehicleCatalogProducts = async (
    pdpURL: string,
    vehicle: VehicleMetadata,
  ) => {
    const response = await getVehicleCatalogData(vehicle);
    if (response) {
      getVehicleSummary(pdpURL, vehicle);
    } else {
      reloadPageWithNewParams(pdpURL);
    }
  };

  const getVehicleSummary = async (
    pdpURL: string,
    vehicle: VehicleMetadata,
  ) => {
    const response = await getVehicleData(vehicle);
    if (response) {
      toggleDisAmbigModal(true);
      setVehicleSummary(response);
    } else {
      reloadPageWithNewParams(pdpURL);
    }
  };

  const updateVehicleDataFromDisambiguation = async (
    siteQueryParams: SiteQueryParams | null,
  ) => {
    if (vehicle) {
      const currentURL = window.location.href;
      const vehicleParams =
        siteQueryParams && siteQueryParams.oem
          ? { ...vehicle, vehicleOem: siteQueryParams.oem }
          : vehicle;
      const newURL = await createNewPDPURL(vehicleParams, currentURL);
      if (newURL !== currentURL) {
        reloadPageWithNewParams(newURL);
        // toggleDisAmbigModal(false);
      }
    }
  };

  useEffect(() => {
    if (
      searchIsOpenConfirmFit &&
      !shouldPreventLinkNavigation &&
      vehicle &&
      !disAmbigModalStatus
    ) {
      const { vehicleOem } = vehicle;
      setSearchOpenedFromConfirmFit(false);
      const currentURL = window.location.href;
      const newURL = createNewPDPURL(vehicle, currentURL);
      // if vehicle OEM comes directly after a search cycle, we update url and reload page
      if (vehicleOem) {
        if (newURL !== currentURL) {
          setTimeout(() => {
            reloadPageWithNewParams(newURL);
          }, TIME.MS2000);
        }
      } else {
        // if no OEM after search cycle, we call catlaog products for that vehicle
        // if the catalog comes as empty we call vehicle summary and disambiguation screen is displayed
        // if the catalog is not empty we update url without oem and reload the page
        getVehicleCatalogProducts(newURL, vehicle);
      }
    }
  }, [searchIsOpenConfirmFit, shouldPreventLinkNavigation, vehicle]);

  const handleConfirmFitDecisionModalData = () => {
    switch (type) {
      case ConfirmFitType.FIT:
        setVehiclSelectModalStatus(true);
        break;
      case ConfirmFitType.DOESNTFIT:
        setConfirmFitModalStatus(true);
        break;
      case ConfirmFitType.DEFAULT:
        openVehicleSelector();
        break;
      default:
        break;
    }
  };

  function renderDetails() {
    return (
      <>
        {icon && (
          <IconOrImage
            {...icon}
            css={[styles.icon, isDefaultOrDoesntFit && styles.defaultType]}
            ssr={false}
          />
        )}
        <Markdown
          renderers={{ paragraph: 'span' }}
          css={[styles.label, isDefaultOrDoesntFit && styles.defaultType]}
        >
          {label}
        </Markdown>
        <Icon
          name={ICONS.CHEVRON_RIGHT}
          css={[styles.chevron, isDefaultOrDoesntFit && styles.defaultType]}
          ssr={false}
          ssWidth={22}
        />
      </>
    );
  }

  function renderDetailsWithAnimation() {
    return (
      <Transition
        appear
        in={showFadeAnimation}
        timeout={TIME.MS2500}
        unmountOnExit
      >
        {(containerTransitionState: TransitionStatus) => {
          const vehicleContainerStyles = [
            styles.detailsContainer,
            hasMotion &&
              animations[`detailsContainer_${containerTransitionState}`],
          ];
          return <div css={vehicleContainerStyles}>{renderDetails()}</div>;
        }}
      </Transition>
    );
  }

  function renderCarAnimation() {
    return (
      <Transition
        appear
        in={showCarAnimation}
        timeout={TIME.MS2000}
        unmountOnExit
        onEntered={() => setIsAnimating(false)}
      >
        {(containerTransitionState: TransitionStatus) => {
          const vehicleContainerStyles = [
            styles.vehicleContainer,
            hasMotion &&
              animations[`vehicleContainer_${containerTransitionState}`],
          ];

          const vehicleStyle = [
            styles.vehicle,
            hasMotion && animations[`vehicle_${containerTransitionState}`],
          ];
          return (
            <div css={vehicleContainerStyles}>
              <div css={vehicleStyle}>
                <Car
                  solid
                  solidColor={
                    isDefaultOrDoesntFit
                      ? COLORS.ORANGE.SHADE_15_SOLID
                      : COLORS.LIGHT.GRAY_10
                  }
                  animateWheel={hasMotion}
                  carId={String(carId)}
                />
              </div>
            </div>
          );
        }}
      </Transition>
    );
  }

  function handleRender() {
    return (
      <div
        css={[
          styles.container,
          isDefaultOrDoesntFit ? styles.defaultContainer : styles.fitsContainer,
        ]}
      >
        {isNotDefault ? renderDetailsWithAnimation() : renderDetails()}
        {isNotDefault && renderCarAnimation()}
      </div>
    );
  }

  return (
    <>
      <button onClick={handleConfirmFitDecisionModalData}>
        {handleRender()}
      </button>
      {isDoesntFit && (
        <ConfirmFitDecisionModal
          data={decisionModal}
          isOpen={ConfirmFitModalStatus}
          onClose={() => setConfirmFitModalStatus(!ConfirmFitModalStatus)}
          openVehicleSelector={openVehicleSelector}
        />
      )}
      {!isDefaultOrDoesntFit && (
        <VehicleSelectionModal
          vehicleSelectionModalLabel={vehicleSelectionModalLabel}
          isOpen={vehiclSelectModalStatus}
          onClose={() => setVehiclSelectModalStatus(!vehiclSelectModalStatus)}
          openVehicleSelector={openVehicleSelector}
        />
      )}
      {disAmbigModalStatus &&
        vehicleSummary &&
        vehicleSummary.siteCatalogSummaryMeta &&
        vehicleSummary.siteCatalogSummaryPrompt && (
          <DataMomentMessage
            openStaticModal={openStaticModal}
            setStage={() => null}
            siteCatalogSummaryMeta={vehicleSummary.siteCatalogSummaryMeta}
            siteCatalogSummaryPrompt={vehicleSummary.siteCatalogSummaryPrompt}
            showLoadingInterstitial
            isComingFromConfirmFit
            updateParamsForConfirmFit={updateVehicleDataFromDisambiguation}
          />
        )}
    </>
  );
}
