import { useTheme } from 'emotion-theming';
import { Transition } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';

import Button from '~/components/global/Button/Button';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Image from '~/components/global/Image/Image';
import BaseLink from '~/components/global/Link/BaseLink';
import Loading from '~/components/global/Loading/Loading';
import Markdown from '~/components/global/Markdown/Markdown';
import { useCatalogSummaryContext } from '~/context/CatalogSummary.context';
import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';
import { SiteCatalogSummaryBuildIn } from '~/data/models/SiteCatalogSummaryBuildIn';
import { SiteCatalogSummaryPrompt } from '~/data/models/SiteCatalogSummaryPrompt';
import { LINK_TYPES } from '~/lib/constants';
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
  return (
    siteCatalogSummaryBuildIn && (
      <Grid css={styles.container}>
        <GridItem css={styles.containerInner}>
          {/* TODO: check heading hierarchy */}
          <h2 css={styles.heading}>{siteCatalogSummaryBuildIn.title}</h2>
          {siteCatalogSummaryBuildIn.brandList && (
            <ul css={styles.list}>
              {siteCatalogSummaryBuildIn.brandList.map(({ image, label }) => {
                if (!image) {
                  return;
                }
                const id = label.replace(/\s+/g, '').toLowerCase();
                // TODO: test with actual assets
                const imageStyles = styles[`logo_${id}`];

                return (
                  <li key={id}>
                    <Image
                      altText={label}
                      src={image.src}
                      css={imageStyles}
                      widths={[100, 200, 500]}
                    />
                  </li>
                );
              })}
            </ul>
          )}
        </GridItem>
      </Grid>
    )
  );
}

interface DataMomentMessageProps {
  setStage?(stage: STAGES): void;
  siteCatalogSummaryPrompt: SiteCatalogSummaryPrompt | null;
}

export function DataMomentMessage({
  setStage,
  siteCatalogSummaryPrompt,
}: DataMomentMessageProps) {
  const { message } = useTheme();
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
          {siteCatalogSummaryPrompt.infoLink && (
            <button
              css={styles.dataMomentHelp}
              onClick={function () {
                // TODO: Handle "Not sure?" click
              }}
            >
              {siteCatalogSummaryPrompt.infoLink.label}
            </button>
          )}
        </GridItem>
      </Grid>
    )
  );
}

interface NoResultsMessageProps {
  onSearchBy?(opt: string): void;
  siteCatalogSummaryPrompt: SiteCatalogSummaryPrompt | null;
}

export function NoResultsMessage({
  onSearchBy,
  siteCatalogSummaryPrompt,
}: NoResultsMessageProps) {
  const searchByOptions = [
    {
      id: 'vehicle',
      labelId: 'catalog.summary.noResultsVehicleLabel',
    },
    {
      id: 'size',
      labelId: 'catalog.summary.noResultsSizeLabel',
    },
    {
      id: 'brand',
      labelId: 'catalog.summary.noResultsBrandLabel',
    },
    {
      id: 'popular',
      labelId: 'catalog.summary.noResultsPopularLabel',
    },
  ];

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
            <dt>{ui('catalog.summary.noResultsContactLabel')}</dt>
            <dd>
              {ui('catalog.summary.noResultsContactDesc')}
              <BaseLink
                href="tel:+18884100604"
                css={styles.noResultsButton}
                isExternal
              >
                {/* TODO: get number from Global API: https://simpletire.atlassian.net/browse/WCS-482 */}
                (888) 410-0604
              </BaseLink>
            </dd>
            <dt>{ui('catalog.summary.noResultsNewSearchLabel')}</dt>
            <dd>
              <ul>
                {searchByOptions.map((option) => (
                  <li css={styles.noResultsButtonWrapper} key={option.id}>
                    <button
                      css={styles.noResultsButton}
                      onClick={function () {
                        onSearchBy && onSearchBy(option.id);
                      }}
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
  [STAGES.TOP_PICKS]: null,
  [STAGES.NO_RESULTS]: NoResultsMessage,
};

interface Props {
  catalogSummary: SiteCatalogSummary;
}

function CatalogMessage({ catalogSummary }: Props) {
  const {
    setStage,
    stage,
    contentStage,
    setNewContent,
  } = useCatalogSummaryContext();

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
          stage={contentStage}
          transitionStatus={transitionStatus}
        >
          {MessageComponent && (
            <MessageComponent {...catalogSummary} setStage={setStage} />
          )}
        </MessageContainer>
      )}
    </Transition>
  );
}

export default CatalogMessage;
