import { Transition } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';

import Button from '~/components/global/Button/Button';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Image from '~/components/global/Image/Image';
import { getSrcset } from '~/components/global/Image/Image.utils';
import BaseLink from '~/components/global/Link/BaseLink';
import Loading, { THEME } from '~/components/global/Loading/Loading';
import { useCatalogSummaryContext } from '~/context/CatalogSummary.context';
import { BUTTON_STYLE, BUTTON_THEME } from '~/lib/constants';

import { Brands } from '../CatalogPage.constants';
import {
  STAGES,
  stageToMessageTimeout,
} from '../CatalogSummary/CatalogSummary.constants';
import styles from './CatalogMessage.styles';
import MessageContainer from './components/MessageContainer';

export function LoadingIndicator() {
  return (
    <div css={styles.loadingContainer}>
      <Loading theme={THEME.DARK} />
    </div>
  );
}

interface BuildInMessageProps {
  brands?: Brands;
  hasMultipleTireSizes: boolean;
}

export function BuildInMessage({
  brands = [],
  hasMultipleTireSizes,
}: BuildInMessageProps) {
  return (
    <Grid css={styles.container}>
      <GridItem css={styles.containerInner}>
        {/* TODO: check heading hierarchy */}
        <h2 css={styles.heading}>
          {hasMultipleTireSizes
            ? "Ok, let's confirm the tire size of your Civic"
            : '3 tires fit your Civic'}
        </h2>
        {!hasMultipleTireSizes && (
          <ul css={styles.list}>
            {brands.map((brand) => {
              const imageStyles = styles[`logo_${brand.id}`];
              const srcSet = getSrcset(brand.src, {
                '100w': { width: 100 },
                '200w': { width: 200 },
                '500w': { width: 500 },
              });

              return (
                <li key={brand.altText}>
                  <Image
                    altText={brand.altText}
                    css={imageStyles}
                    srcSet={srcSet}
                  />
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
  hasMultipleTireSizes: boolean;
  hasOE?: boolean;
  onHelpClick?(): void;
  onSizeSelect?(id: string): void;
  setStage(stage: STAGES): void;
}

export function DataMomentMessage({
  hasOE = false,
  hasMultipleTireSizes,
  onHelpClick,
  onSizeSelect,
  setStage,
}: DataMomentMessageProps) {
  const sizeOptions = [
    {
      id: '91W',
      label: '235/40R18 91W',
    },
    {
      id: '95Y',
      label: '235/40R18 95Y XL',
    },
  ];

  // TODO: this is a quick fix for displaying the two different states
  // of the data moment. On integration I will tidy this up into a single
  // return statement.
  return hasMultipleTireSizes ? (
    <Grid css={styles.container}>
      <GridItem css={styles.containerInner}>
        {/* TODO: check heading hierarchy */}
        <h2 css={[styles.heading, styles.dataMomentHeading]}>
          Ok, let&apos;s confirm the tire size of your Civic
        </h2>
        <p css={styles.dataMomentCopy}>
          Find it on tthe sidewall of your current tires, the owner&apos;s
          manual or inside the frame of the driver&apos;s door.
        </p>
        <div css={styles.dataMomentCtaWrapper}>
          {sizeOptions.map((option) => (
            <Button
              key={option.id}
              onClick={function () {
                onSizeSelect && onSizeSelect(option.id);
                setStage(STAGES.TOP_PICKS);
              }}
              style={BUTTON_STYLE.OUTLINED}
              theme={BUTTON_THEME.ORANGE}
            >
              {option.label}
            </Button>
          ))}
        </div>
        <button css={styles.dataMomentHelp} onClick={onHelpClick}>
          Not sure?
        </button>
      </GridItem>
    </Grid>
  ) : (
    <Grid css={styles.container}>
      <GridItem
        css={styles.containerInner}
        gridColumnM="4/end"
        gridColumnL="8/end"
      >
        {/* TODO: check heading hierarchy */}
        <h2 css={[styles.heading, styles.dataMomentHeading]}>
          {hasOE
            ? 'From the factory, your Civic came with a Continental or Firestone'
            : "We'll start with our 5 top picks"}
        </h2>
        <div css={[styles.dataMomentCopy, hasOE && styles.dataMomentCopyNoOE]}>
          {hasOE ? (
            <>
              <p>
                <strong>Most Civic drivers keep original tires.</strong>
              </p>
              <p>
                That keeps the performance that Honda designed your car for.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>Most drivers choose from our top picks.</strong>
              </p>
              <p>
                They include the best matches for your Civic based on
                popularity, user ratings and price.
              </p>
            </>
          )}
        </div>
        <div css={styles.dataMomentCta}>
          <Button
            onClick={function () {
              setStage(STAGES.TOP_PICKS);
            }}
            style={BUTTON_STYLE.SOLID}
            theme={BUTTON_THEME.ORANGE}
          >
            Ok, continue
          </Button>
        </div>
      </GridItem>
    </Grid>
  );
}

interface ConfirmSizeMessageProps {
  onHelpClick?(): void;
  onSizeSelect?(id: string): void;
  setStage(stage: STAGES): void;
}

interface NoResultsMessageProps {
  onSearchBy?(id: string): void;
}

export function NoResultsMessage({ onSearchBy }: NoResultsMessageProps) {
  const searchByOptions = [
    {
      id: 'vehicle',
      label: 'Vehicle',
    },
    {
      id: 'size',
      label: 'Tire size',
    },
    {
      id: 'brand',
      label: 'Brand',
    },
    {
      id: 'popular',
      label: 'Popular tires',
    },
  ];

  return (
    <Grid css={styles.container}>
      <GridItem
        css={[styles.containerInner, styles.containerAlignLeft]}
        gridColumnM="start/7"
        gridColumnL="3/9"
      >
        {/* TODO: check heading hierarchy */}
        <h2 css={[styles.heading, styles.noResultsHeading]}>
          Sorry, no tires found for your Honda Civic 1982 Type-R.
        </h2>
        <dl css={styles.noResultsSection}>
          <dt>Let us help you</dt>
          <dd>
            Call us at{' '}
            <BaseLink
              href="tel:+18884100604"
              css={styles.noResultsButton}
              isExternal
            >
              (888) 410-0604
            </BaseLink>
          </dd>
          <dt>Or try new search by:</dt>
          <dd>
            <ul>
              {searchByOptions.map((option) => (
                <li css={styles.noResultsButtonWrapper} key={option.label}>
                  {/* TODO: hover/focus styles */}
                  <button
                    css={styles.noResultsButton}
                    onClick={function () {
                      onSearchBy && onSearchBy(option.id);
                    }}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          </dd>
        </dl>
      </GridItem>
    </Grid>
  );
}

const mapMessageToStage = {
  [STAGES.LOADING]: LoadingIndicator,
  [STAGES.BUILD_IN]: BuildInMessage,
  [STAGES.DATA_MOMENT]: DataMomentMessage,
  [STAGES.TOP_PICKS]: null,
  [STAGES.NO_RESULTS]: NoResultsMessage,
};

interface Props
  extends BuildInMessageProps,
    DataMomentMessageProps,
    ConfirmSizeMessageProps,
    NoResultsMessageProps {
  hasMultipleTireSizes: boolean;
}

function CatalogMessage({ ...rest }: Props) {
  const {
    setStage,
    stage,
    messageStage,
    setNewMessage,
  } = useCatalogSummaryContext();

  const MessageComponent = mapMessageToStage[messageStage];

  return (
    <Transition
      appear
      in={stage === messageStage}
      timeout={stageToMessageTimeout[messageStage]}
      onExited={setNewMessage}
    >
      {(transitionStatus: TransitionStatus) => (
        <MessageContainer stage={stage} transitionStatus={transitionStatus}>
          {MessageComponent && (
            <MessageComponent {...rest} setStage={setStage} />
          )}
        </MessageContainer>
      )}
    </Transition>
  );
}

export default CatalogMessage;
