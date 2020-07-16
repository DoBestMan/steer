import { useTheme } from 'emotion-theming';
import { Transition } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';

import Button from '~/components/global/Button/Button';
import Casino from '~/components/global/Casino/Casino';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Image from '~/components/global/Image/Image';
import BaseLink from '~/components/global/Link/BaseLink';
import Loading from '~/components/global/Loading/Loading';
import Markdown from '~/components/global/Markdown/Markdown';
import { useSearchContext } from '~/components/modules/Search/Search.context';
import { SearchStateEnum } from '~/components/modules/Search/Search.types';
import TopPicks from '~/components/pages/CatalogPage/TopPicks/TopPicks.container';
import { useCatalogSummaryContext } from '~/context/CatalogSummary.context';
import { useModalContext } from '~/context/Modal.context';
import { SiteCatalogSummaryBuildIn } from '~/data/models/SiteCatalogSummaryBuildIn';
import { SiteCatalogSummaryPrompt } from '~/data/models/SiteCatalogSummaryPrompt';
import { LINK_TYPES } from '~/lib/constants';
import { getInvertedImageTransformations } from '~/lib/utils/cloudinary/cloudinary';
import { isValidStaticModal } from '~/lib/utils/modal';
import { ui } from '~/lib/utils/ui-dictionary';

import { STAGES } from '../CatalogPage.constants';
import { stageToMessageTimeout } from '../CatalogSummary/CatalogSummary.constants';
import styles from './CatalogMessage.styles';
import MessageContainer from './components/MessageContainer';

export function LoadingIndicator() {
  const { message } = useTheme();
  return (
    <div css={styles.loadingContainer}>
      <Loading theme={message.loadingTheme} />
    </div>
  );
}

interface BuildInMessageProps {
  siteCatalogSummaryBuildIn: SiteCatalogSummaryBuildIn | null;
}

export function BuildInMessage({
  siteCatalogSummaryBuildIn,
}: BuildInMessageProps) {
  if (!siteCatalogSummaryBuildIn) {
    return null;
  }

  /**
   * Split the title by digits, and render the Casino component
   * instead of the digit string.
   */
  const digitsRegex = /(\d+)/;
  const splitTitle = siteCatalogSummaryBuildIn.title
    // split by digits
    .split(digitsRegex)
    // remove empty strings
    .filter((s) => s.length)
    // convert digits to number
    .map((s) =>
      digitsRegex.test(s) ? (
        <Casino animate numberDisplayed={parseInt(s, 10)} />
      ) : (
        s
      ),
    );

  return (
    <Grid css={styles.container}>
      <GridItem css={styles.containerInner}>
        {/* TODO: check heading hierarchy */}
        <h2 aria-label={siteCatalogSummaryBuildIn.title} css={styles.heading}>
          {splitTitle.length > 1 ? (
            <span aria-hidden>
              {splitTitle.map((s, i) => (
                <span key={i}>{s}</span>
              ))}
            </span>
          ) : (
            siteCatalogSummaryBuildIn.title
          )}
        </h2>
        {siteCatalogSummaryBuildIn.brandList && (
          <ul css={styles.list}>
            {siteCatalogSummaryBuildIn.brandList.map(({ image, label }) => {
              if (!image) {
                return;
              }
              const id = label.replace(/\s+/g, '').toLowerCase();
              const widths = [100, 200];

              return (
                <li key={id}>
                  <div css={styles.brandImage}>
                    <Image
                      altText={label}
                      src={image.src}
                      srcTransformationArgs={getInvertedImageTransformations(
                        widths,
                      )}
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
  openStaticModal: (modalId: string) => void;
  setStage?(stage: STAGES): void;
  siteCatalogSummaryPrompt: SiteCatalogSummaryPrompt | null;
}

export function DataMomentMessage({
  setStage,
  siteCatalogSummaryPrompt,
  openStaticModal,
}: DataMomentMessageProps) {
  const { message } = useTheme();

  const id =
    siteCatalogSummaryPrompt && siteCatalogSummaryPrompt.infoLink?.contentId;
  const isValid = id && isValidStaticModal(id);
  function openModal() {
    if (id) {
      openStaticModal(id);
    }
  }

  return (
    siteCatalogSummaryPrompt && (
      <Grid css={styles.container}>
        <GridItem
          css={styles.containerInner}
          gridColumnM="4/end"
          gridColumnL="8/end"
        >
          {/* TODO: check heading hierarchy */}
          <Markdown
            css={[styles.heading, styles.dataMomentHeading]}
            renderers={{ paragraph: 'h2' }}
          >
            {siteCatalogSummaryPrompt.title}
          </Markdown>
          {siteCatalogSummaryPrompt.body && (
            <Markdown css={styles.dataMomentCopy}>
              {siteCatalogSummaryPrompt.body}
            </Markdown>
          )}
          {siteCatalogSummaryPrompt.ctaList && (
            <div css={styles.dataMomentCtaWrapper}>
              {siteCatalogSummaryPrompt.ctaList.map(({ label, link }) => {
                const id = label.replace(/\s+/g, '').toLowerCase();
                return link ? (
                  <Button
                    key={id}
                    as={LINK_TYPES.A}
                    href={link.href}
                    style={message.buttonStyle}
                    theme={message.buttonTheme}
                  >
                    {label}
                  </Button>
                ) : (
                  <Button
                    key={id}
                    onClick={function () {
                      setStage && setStage(STAGES.TOP_PICKS);
                    }}
                    style={message.buttonStyle}
                    theme={message.buttonTheme}
                  >
                    {label}
                  </Button>
                );
              })}
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
  siteCatalogSummaryPrompt: SiteCatalogSummaryPrompt | null;
}

export function NoResultsMessage({
  customerServiceEnabled,
  customerServiceNumber,
  siteCatalogSummaryPrompt,
}: NoResultsMessageProps) {
  const { setIsSearchOpen, setSearchState, searchQuery } = useSearchContext();

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
    {
      labelId: 'catalog.summary.noResultsPopularLabel',
      searchCategory: SearchStateEnum.POPULAR,
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
          {/* TODO: check heading hierarchy */}
          <Markdown
            css={[styles.heading, styles.noResultsHeading]}
            renderers={{ paragraph: 'h2' }}
          >
            {siteCatalogSummaryPrompt.title}
          </Markdown>
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
            <dt>{ui('catalog.summary.noResultsNewSearchLabel')}</dt>
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
  [STAGES.LOADING]: LoadingIndicator,
  [STAGES.BUILD_IN]: BuildInMessage,
  [STAGES.DATA_MOMENT]: DataMomentMessage,
  [STAGES.TOP_PICKS]: TopPicks,
  [STAGES.NO_RESULTS]: NoResultsMessage,
};

interface CatalogMessageProps {
  customerServiceEnabled?: boolean;
  customerServiceNumber: { display: string; value: string };
  exploreMore: () => void;
}

function CatalogMessage({
  customerServiceNumber,
  customerServiceEnabled,
  exploreMore,
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
              setStage={setStage}
              // used only by top picks
              exploreMore={exploreMore}
              // used by DataMomentMessage
              openStaticModal={openStaticModal}
            />
          )}
        </MessageContainer>
      )}
    </Transition>
  );
}

export default CatalogMessage;
