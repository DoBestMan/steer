import { useTheme } from '@emotion/react';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';

import Button from '~/components/global/Button/Button';
import Car from '~/components/global/Car/Car';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import BaseLink from '~/components/global/Link/BaseLink';
import Markdown from '~/components/global/Markdown/Markdown';
import SizeConfirmModal from '~/components/global/Modal/SizeConfirmModal';
import { useSearchContext } from '~/components/modules/Search/Search.context';
import { SearchStateEnum } from '~/components/modules/Search/Search.types';
import { useSearchModalContext } from '~/components/modules/Search/SearchModal.context';
import { useCatalogSummaryContext } from '~/context/CatalogSummary.context';
import { useModalContext } from '~/context/Modal.context';
import { useUserPersonalizationContext } from '~/context/UserPersonalization.context';
import { SiteCatalogSummaryMeta } from '~/data/models/SiteCatalogSummaryMeta';
import { SiteCatalogSummaryPrompt } from '~/data/models/SiteCatalogSummaryPrompt';
import { VehicleMetadata } from '~/data/models/VehicleMetadata';
import { BUTTON_STYLE, LINK_TYPES, MODAL_THEME } from '~/lib/constants';
import { eventEmitters } from '~/lib/events/emitters';
import { isValidStaticModal } from '~/lib/utils/modal';
import { getHrefWithParams } from '~/lib/utils/routes';
import { ui } from '~/lib/utils/ui-dictionary';

import CatalogLoading from '../CatalogLoading/CatalogLoading';
import { STAGES } from '../CatalogPage.constants';
import { stageToMessageTimeout } from '../CatalogSummary/CatalogSummary.constants';
import styles from './CatalogMessage.styles';
import MessageContainer from './components/MessageContainer';

interface DataMomentMessageProps {
  openStaticModal: (modalId: string) => void;
  setStage(stage: STAGES): void;
  showLoadingInterstitial: boolean;
  siteCatalogSummaryMeta: SiteCatalogSummaryMeta | null;
  siteCatalogSummaryPrompt: SiteCatalogSummaryPrompt | null;
}

export function DataMomentMessage({
  setStage,
  showLoadingInterstitial,
  siteCatalogSummaryMeta,
  siteCatalogSummaryPrompt,
  openStaticModal,
}: DataMomentMessageProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { message }: any = useTheme();
  const { asPath } = useRouter();

  const { toggleIsSearchOpen } = useSearchModalContext();
  const { selectVehicle } = useUserPersonalizationContext();
  const [isSizeConfirmModalOpen, setIsSizeConfirmModalOpen] = useState<boolean>(
    true,
  );
  const titleRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (showLoadingInterstitial && titleRef && titleRef.current) {
      titleRef.current.focus();
    }
  }, [titleRef, showLoadingInterstitial]);

  const id =
    siteCatalogSummaryPrompt && siteCatalogSummaryPrompt.infoLink?.contentId;
  const isValid = id && isValidStaticModal(id);
  function openModal() {
    if (id) {
      openStaticModal(id);
    }
  }

  const toggleSizeConfirmModal = () =>
    setIsSizeConfirmModalOpen(!isSizeConfirmModalOpen);

  const createPromptCtaClickHandler = function (
    vehicleMetadata: VehicleMetadata | null,
    siteQueryParams: Record<string, string>,
  ) {
    return function () {
      const { oem } = siteQueryParams;
      eventEmitters.newCatalogSearchQuery.emit({ comesFromSearch: !!oem });
      if (vehicleMetadata) {
        selectVehicle(vehicleMetadata);
      }
      setStage && setStage(STAGES.RESULTS);
      toggleSizeConfirmModal();
    };
  };

  const hasMultipleCtas =
    siteCatalogSummaryPrompt?.ctaList &&
    siteCatalogSummaryPrompt.ctaList.length > 1;

  return (
    siteCatalogSummaryPrompt &&
    siteCatalogSummaryMeta && (
      <SizeConfirmModal
        isOpen={isSizeConfirmModalOpen}
        contentLabel="modal"
        theme={MODAL_THEME.ORANGE}
      >
        <Car css={styles.car} carId={siteCatalogSummaryMeta.vehicleType} />
        <div ref={titleRef} tabIndex={-1}>
          <Markdown
            css={[styles.heading, styles.dataMomentHeading]}
            renderers={{ paragraph: 'h1' }}
          >
            {siteCatalogSummaryPrompt.title}
          </Markdown>
        </div>
        {siteCatalogSummaryPrompt.body && (
          <Markdown css={styles.dataMomentBody}>
            {siteCatalogSummaryPrompt.body}
          </Markdown>
        )}
        {siteCatalogSummaryPrompt.infoLink && isValid && (
          <button css={styles.dataMomentHelp} onClick={openModal}>
            {siteCatalogSummaryPrompt.infoLink.label}
          </button>
        )}
        {siteCatalogSummaryPrompt.ctaList && (
          <div css={styles.dataMomentCtaWrapper} data-testid="catalog-cta-list">
            {siteCatalogSummaryPrompt.ctaList.map(
              ({ label, siteQueryParams, vehicleMetadata }) => {
                const buttonStyle = hasMultipleCtas
                  ? message.buttonStyle
                  : BUTTON_STYLE.SOLID;
                const id = label.replace(/\s+/g, '').toLowerCase();
                const href = getHrefWithParams(asPath, siteQueryParams);

                return siteQueryParams ? (
                  <Button
                    key={id}
                    as={LINK_TYPES.A}
                    href={href}
                    onClick={createPromptCtaClickHandler(
                      vehicleMetadata,
                      siteQueryParams,
                    )}
                    style={buttonStyle}
                    theme={message.buttonTheme}
                  >
                    {label}
                  </Button>
                ) : (
                  <Button
                    key={id}
                    onClick={function () {
                      toggleSizeConfirmModal();
                      setStage && setStage(STAGES.RESULTS);
                      // Reset scroll position to top
                      window.scrollTo(0, 0);
                      // Open search modal as 0 results matched
                      toggleIsSearchOpen();
                    }}
                    style={buttonStyle}
                    theme={message.buttonTheme}
                  >
                    {label}
                  </Button>
                );
              },
            )}
          </div>
        )}
      </SizeConfirmModal>
    )
  );
}

interface NoResultsMessageProps {
  customerServiceEnabled?: boolean;
  customerServiceNumber: { display: string; value: string };
  onSearchBy?(opt: string): void;
  showLoadingInterstitial: boolean;
  siteCatalogSummaryPrompt: SiteCatalogSummaryPrompt | null;
}

export function NoResultsMessage({
  customerServiceEnabled,
  customerServiceNumber,
  showLoadingInterstitial,
  siteCatalogSummaryPrompt,
}: NoResultsMessageProps) {
  const { setSearchState, searchQuery } = useSearchContext();
  const { setIsSearchOpen } = useSearchModalContext();

  /**
   * If coming from Search, set programmatic focus to the message content.
   */
  const titleRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (showLoadingInterstitial && titleRef && titleRef.current) {
      titleRef.current.focus();
    }
  }, [titleRef, showLoadingInterstitial]);

  const searchByOptions = [
    {
      labelId: 'catalog.summary.noResultsVehicleLabel',
      searchCategory: SearchStateEnum.VEHICLE,
    },
    {
      labelId: 'catalog.summary.noResultsSizeLabel',
      searchCategory: SearchStateEnum.TIRE_SIZE,
    },
    {
      labelId: 'catalog.summary.noResultsBrandLabel',
      searchCategory: SearchStateEnum.BRAND,
    },
  ];

  const onSearchClick = (category: SearchStateEnum) => () => {
    setSearchState(category);
    searchQuery({ queryText: '', queryType: category });
    setIsSearchOpen(true);
  };

  return (
    siteCatalogSummaryPrompt && (
      <Grid css={styles.container}>
        <GridItem
          css={[styles.containerInner, styles.containerAlignLeft]}
          gridColumnM="start/7"
          gridColumnL="3/9"
        >
          <div ref={titleRef} tabIndex={-1}>
            <Markdown
              css={[styles.heading, styles.noResultsHeading]}
              renderers={{ paragraph: 'h1' }}
            >
              {siteCatalogSummaryPrompt.title}
            </Markdown>
          </div>
          <dl css={styles.noResultsSection}>
            {customerServiceEnabled && (
              <>
                <dt>{ui('catalog.summary.noResultsContactLabel')}</dt>
                <dd>
                  {ui('catalog.summary.noResultsContactDesc')}
                  <BaseLink
                    href={`tel:${customerServiceNumber.value}`}
                    css={styles.noResultsLink}
                    isExternal
                  >
                    {customerServiceNumber.display}
                  </BaseLink>
                </dd>
              </>
            )}
            <dt>
              {ui(
                customerServiceEnabled
                  ? 'catalog.summary.noResultsNewSearchLabel'
                  : 'catalog.summary.noResultsNewSearchLabelAlt',
              )}
            </dt>
            <dd>
              <ul>
                {searchByOptions.map((option) => (
                  <li css={styles.noResultsLinkWrapper} key={option.labelId}>
                    <button
                      type="button"
                      css={styles.noResultsLink}
                      onClick={onSearchClick(option.searchCategory)}
                    >
                      {ui(option.labelId)}
                    </button>
                  </li>
                ))}
              </ul>
            </dd>
          </dl>
        </GridItem>
      </Grid>
    )
  );
}

const mapMessageToStage = {
  [STAGES.LOADING]: null,
  [STAGES.BUILD_IN]: CatalogLoading,
  [STAGES.DATA_MOMENT]: DataMomentMessage,
  [STAGES.RESULTS]: CatalogLoading,
  [STAGES.NO_RESULTS]: NoResultsMessage,
};

interface CatalogMessageProps {
  customerServiceEnabled?: boolean;
  customerServiceNumber: { display: string; value: string };
}

function CatalogMessage({
  customerServiceNumber,
  customerServiceEnabled,
}: CatalogMessageProps) {
  const {
    contentStage,
    setNewContent,
    setStage,
    showLoadingInterstitial,
    siteCatalogSummary,
    stage,
  } = useCatalogSummaryContext();

  const { openStaticModal } = useModalContext();

  const MessageComponent = mapMessageToStage[contentStage];

  return (
    <Transition
      appear
      in={stage === contentStage}
      timeout={stageToMessageTimeout[contentStage]}
      onExited={setNewContent}
    >
      {(transitionStatus: TransitionStatus) => (
        <MessageContainer
          showLoadingInterstitial={showLoadingInterstitial}
          stage={contentStage}
          transitionStatus={transitionStatus}
        >
          {MessageComponent && (
            <MessageComponent
              key={contentStage}
              {...siteCatalogSummary}
              customerServiceNumber={customerServiceNumber}
              customerServiceEnabled={customerServiceEnabled}
              openStaticModal={openStaticModal}
              setStage={setStage}
              showLoadingInterstitial={showLoadingInterstitial}
            />
          )}
        </MessageContainer>
      )}
    </Transition>
  );
}

export default CatalogMessage;
