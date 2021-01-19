import { useTheme } from 'emotion-theming';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';

import Button from '~/components/global/Button/Button';
import Casino from '~/components/global/Casino/Casino';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Image from '~/components/global/Image/Image';
import BaseLink from '~/components/global/Link/BaseLink';
import Markdown from '~/components/global/Markdown/Markdown';
import { useSearchContext } from '~/components/modules/Search/Search.context';
import { SearchStateEnum } from '~/components/modules/Search/Search.types';
import { useSearchModalContext } from '~/components/modules/Search/SearchModal.context';
import TopPicks from '~/components/pages/CatalogPage/TopPicks/TopPicks.container';
import { useCatalogProductsContext } from '~/context/CatalogProducts.context';
import { useCatalogSummaryContext } from '~/context/CatalogSummary.context';
import { useModalContext } from '~/context/Modal.context';
import { useUserPersonalizationContext } from '~/context/UserPersonalization.context';
import { SiteCatalogSummaryBuildIn } from '~/data/models/SiteCatalogSummaryBuildIn';
import { SiteCatalogSummaryPrompt } from '~/data/models/SiteCatalogSummaryPrompt';
import { VehicleMetadata } from '~/data/models/VehicleMetadata';
import { BUTTON_STYLE, LINK_TYPES, THEME } from '~/lib/constants';
import { eventEmitters } from '~/lib/events/emitters';
import { transformSrcLogoToWhite } from '~/lib/utils/cloudinary/cloudinary';
import { isValidStaticModal } from '~/lib/utils/modal';
import { getHrefWithParams } from '~/lib/utils/routes';
import { ui } from '~/lib/utils/ui-dictionary';

import { STAGES } from '../CatalogPage.constants';
import { stageToMessageTimeout } from '../CatalogSummary/CatalogSummary.constants';
import styles from './CatalogMessage.styles';
import MessageContainer from './components/MessageContainer';

interface BuildInMessageProps {
  siteCatalogSummaryBuildIn: SiteCatalogSummaryBuildIn | null;
}

const BRAND_LOGO_SIZES = [100, 200];

export function BuildInMessage({
  siteCatalogSummaryBuildIn,
}: BuildInMessageProps) {
  if (!siteCatalogSummaryBuildIn) {
    return null;
  }

  /**
   * Split the title by digits, and render the Casino component instead
   * of the digit string (has to be the first word in the string).
   */
  const digitsRegex = /(\d+)/;
  const splitTitle = siteCatalogSummaryBuildIn.title
    // split by digits
    .split(digitsRegex)
    // remove empty strings
    .filter((s) => s.length)
    // convert opening digits to number
    .map((s, i) =>
      i === 0 && digitsRegex.test(s) ? (
        <Casino animate numberDisplayed={parseInt(s, 10)} />
      ) : (
        s
      ),
    );

  return (
    <Grid css={styles.container}>
      <GridItem css={styles.containerInner}>
        {/* TODO: check heading hierarchy */}
        <h1
          aria-label={siteCatalogSummaryBuildIn.title}
          aria-live="polite"
          css={styles.heading}
        >
          {splitTitle.length > 1 ? (
            <span aria-hidden>
              {splitTitle.map((s, i) => (
                <span key={i}>{s}</span>
              ))}
            </span>
          ) : (
            siteCatalogSummaryBuildIn.title
          )}
        </h1>
        {siteCatalogSummaryBuildIn.brandList && (
          <ul css={styles.list}>
            {siteCatalogSummaryBuildIn.brandList.map(({ image, label }) => {
              if (!image) {
                return;
              }
              const id = label.replace(/\s+/g, '').toLowerCase();

              // image.src should be immutable
              const src = transformSrcLogoToWhite(image.src);

              return (
                <li key={id}>
                  <div css={styles.brandImage}>
                    <Image
                      altText={label}
                      src={src}
                      widths={BRAND_LOGO_SIZES}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </GridItem>
    </Grid>
  );
}

interface DataMomentMessageProps {
  exploreMore?: () => void;
  isSearchForTireSize?: boolean;
  openStaticModal: (modalId: string) => void;
  setStage(stage: STAGES): void;
  showLoadingInterstitial: boolean;
  siteCatalogSummaryPrompt: SiteCatalogSummaryPrompt | null;
  totalTireCount?: number;
}

export function DataMomentMessage({
  setStage,
  showLoadingInterstitial,
  siteCatalogSummaryPrompt,
  openStaticModal,
  exploreMore,
  totalTireCount,
  isSearchForTireSize,
}: DataMomentMessageProps) {
  const { message } = useTheme();
  const { asPath, query } = useRouter();
  const { setIsAdvancedView } = useCatalogProductsContext();

  const { selectVehicle } = useUserPersonalizationContext();
  const [step, setStep] = useState<number>(1);
  const [comesFromShowTopPicks, setComesFromShowTopPicks] = useState<boolean>(
    false,
  );
  let showTopPicks = false;
  let mustShow = false;
  if (siteCatalogSummaryPrompt) {
    mustShow = siteCatalogSummaryPrompt.mustShow;
  }
  /**
   * If coming from Search, set programmatic focus to the message content
   */
  if (showLoadingInterstitial && step === 1 && !mustShow) {
    showTopPicks = true;
  }

  if (comesFromShowTopPicks) {
    showTopPicks = false;
  }

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
    };
  };

  const hasMultipleCtas =
    siteCatalogSummaryPrompt?.ctaList &&
    siteCatalogSummaryPrompt.ctaList.length > 1;

  function renderTopPicksSection() {
    return (
      <Grid css={styles.container}>
        <GridItem
          css={styles.containerInner}
          gridColumnM="4/end"
          gridColumnL="8/end"
        >
          <div ref={titleRef} tabIndex={-1}>
            <Markdown
              css={[styles.heading, styles.dataMomentHeading]}
              renderers={{ paragraph: 'h1' }}
            >
              {ui('catalog.message.topPicksTitle')}
            </Markdown>
          </div>
          <div css={styles.dataMomentCtaWrapper} data-testid="catalog-cta-list">
            <Button
              onClick={async function () {
                (await setStage) && setStage(STAGES.RESULTS);
                setIsAdvancedView(true);
                if (exploreMore) {
                  setTimeout(exploreMore, 500);
                }
              }}
              style={BUTTON_STYLE.OUTLINED}
              theme={THEME.ORANGE}
            >
              {totalTireCount && totalTireCount > 0
                ? ui('catalog.message.showAllButton', { totalTireCount })
                : ui('catalog.message.showAllButton', {
                    totalTireCount: 'all',
                  })}
            </Button>
            <Button
              onClick={function () {
                !isSearchForTireSize && setComesFromShowTopPicks(true);
                if (!query.oem) {
                  if (isSearchForTireSize) {
                    setStage && setStage(STAGES.RESULTS);
                  } else {
                    setStage && setStage(STAGES.DATA_MOMENT);
                  }

                  // Reset scroll position to top
                  window.scrollTo(0, 0);
                  return;
                }
                setStep(2);
              }}
              style={BUTTON_STYLE.SOLID}
              theme={message.buttonTheme}
            >
              {ui('catalog.message.topPicksButton')}
            </Button>
          </div>
          <Markdown isEditorial css={styles.dataMomentCopy}>
            {ui('catalog.message.secondaryHeadline')}
          </Markdown>
          <Markdown isEditorial css={styles.secondarySubHeadline}>
            {ui('catalog.message.secondarySubHeadline')}
          </Markdown>
        </GridItem>
      </Grid>
    );
  }

  if (showTopPicks && step === 1) {
    return renderTopPicksSection();
  }

  return (
    siteCatalogSummaryPrompt && (
      <Grid css={styles.container}>
        <GridItem
          css={styles.containerInner}
          gridColumnM="4/end"
          gridColumnL="8/end"
        >
          <div ref={titleRef} tabIndex={-1}>
            <Markdown
              css={[styles.heading, styles.dataMomentHeading]}
              renderers={{ paragraph: 'h1' }}
            >
              {siteCatalogSummaryPrompt.title}
            </Markdown>
          </div>
          {siteCatalogSummaryPrompt.body && (
            <Markdown css={styles.dataMomentCopy}>
              {siteCatalogSummaryPrompt.body}
            </Markdown>
          )}
          {siteCatalogSummaryPrompt.ctaList && (
            <div
              css={styles.dataMomentCtaWrapper}
              data-testid="catalog-cta-list"
            >
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
                        setStage && setStage(STAGES.RESULTS);
                        // Reset scroll position to top
                        window.scrollTo(0, 0);
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
          {siteCatalogSummaryPrompt.infoLink && isValid && (
            <button css={styles.dataMomentHelp} onClick={openModal}>
              {siteCatalogSummaryPrompt.infoLink.label}
            </button>
          )}
        </GridItem>
      </Grid>
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
  [STAGES.BUILD_IN]: BuildInMessage,
  [STAGES.DATA_MOMENT]: DataMomentMessage,
  [STAGES.RESULTS]: TopPicks,
  [STAGES.NO_RESULTS]: NoResultsMessage,
};

interface CatalogMessageProps {
  customerServiceEnabled?: boolean;
  customerServiceNumber: { display: string; value: string };
  exploreMore: () => void;
  isSearchForTireSize?: boolean;
  totalTireCount: number;
}

function CatalogMessage({
  customerServiceNumber,
  customerServiceEnabled,
  exploreMore,
  totalTireCount,
  isSearchForTireSize,
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
              // used only by top picks
              exploreMore={exploreMore}
              totalTireCount={totalTireCount}
              isSearchForTireSize={!!isSearchForTireSize}
            />
          )}
        </MessageContainer>
      )}
    </Transition>
  );
}

export default CatalogMessage;
