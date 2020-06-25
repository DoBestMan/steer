import { useCallback, useState } from 'react';
import { NodeType } from 'react-markdown';

import Accordion, { Item } from '~/components/global/Accordion/Accordion';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Image from '~/components/global/Image/Image';
import Link from '~/components/global/Link/Link';
import Markdown from '~/components/global/Markdown/MarkdownDynamic';
import Tabs from '~/components/global/Tabs/Tabs';
import AdditionalInfoModal from '~/components/modules/Search/AdditionalInfoModal/AdditionalInfoModal';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import { TIRE_SEARCH_MODAL_DATA } from '../../Search/AdditionalInfoModal/AdditionalInfoModal.constants';
import styles from './TechnicalSpecs.styles';
import TireSizes from './TireSizes';

export interface SizeOption {
  label: string;
  link: string;
  price: string;
  specs: {
    label: string;
    value: string;
  }[];
}

export interface Size {
  label: string;
  options: SizeOption[];
}
interface Props {
  customerServiceNumber: { display: string; value: string };
  isCustomerServiceEnabled?: boolean;
  sizes: Size[];
  specs: Item[];
}

const TECH_SPECS_ITEMS_TO_SHOW = 8;

const headerImage = {
  sm: '/static/assets/pdp/closeup-tire-sm.png',
  md: '/static/assets/pdp/closeup-tire-md.png',
};

// Allow only the simplest markdown to prevent unexpected markups
const markdownAllowedTypes: NodeType[] = [
  'root',
  'text',
  'break',
  'paragraph',
  'strong',
  'emphasis',
  'link',
];

function TechnicalSpecs({
  customerServiceNumber,
  isCustomerServiceEnabled,
  specs,
  sizes,
}: Props) {
  const [isTireSizeModalOpen, setIsTireSizeModalOpen] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { lessThan, greaterThan, is } = useBreakpoints();

  const toggleTireSizeModal = useCallback(() => {
    setIsTireSizeModalOpen(!isTireSizeModalOpen);
  }, [isTireSizeModalOpen, setIsTireSizeModalOpen]);

  const toggleFullDescription = useCallback(() => {
    setShowFullDescription(!showFullDescription);
  }, [showFullDescription, setShowFullDescription]);

  const description = ui('pdp.technicalSpecs.description');
  const splitDescription = description.split(/\n\n/g);
  const briefDescription = splitDescription[0];
  const moreDescription =
    splitDescription.length > 1 && splitDescription.slice(1).join('\n\n');

  return (
    <Grid>
      <GridItem
        isGrid
        fullbleed
        gridColumnL="3/7"
        gridColumnXL="3/7"
        as="header"
        css={styles.header}
      >
        <GridItem
          as="h2"
          gridColumnS="2/6"
          gridColumnM="2/8"
          gridColumnL="start/end"
          css={styles.title}
        >
          {ui('pdp.technicalSpecs.title')}:
        </GridItem>
        {lessThan.L && (
          <GridItem fullbleed gridColumnM="2/8">
            <Image
              src={is.S ? headerImage.sm : headerImage.md}
              altText={ui('pdp.technicalSpecs.imageAlt')}
              css={styles.image}
            />
          </GridItem>
        )}
        {briefDescription && (
          <GridItem
            as="p"
            gridColumnS="2/6"
            gridColumnM="2/6"
            gridColumnL="start/end"
            css={styles.description}
          >
            <div id="technical-specs-description">
              <Markdown
                css={styles.markdown}
                allowedTypes={markdownAllowedTypes}
                unwrapDisallowed
              >
                {briefDescription}
              </Markdown>
            </div>
            {moreDescription && (
              <>
                <div
                  id="technical-specs-more-description"
                  aria-hidden={!showFullDescription}
                  css={styles.moreDescription}
                >
                  <Markdown
                    css={styles.markdown}
                    allowedTypes={markdownAllowedTypes}
                    unwrapDisallowed
                  >
                    {moreDescription}
                  </Markdown>
                </div>
                <button
                  aria-expanded={showFullDescription}
                  aria-labelledby="technical-specs-more-description"
                  aria-controls="technical-specs-more-description"
                  onClick={toggleFullDescription}
                  css={styles.showFullDescription}
                >
                  {showFullDescription
                    ? ui('pdp.technicalSpecs.hideFullDescription')
                    : ui('pdp.technicalSpecs.showFullDescription')}
                  <Icon
                    name={
                      showFullDescription
                        ? ICONS.CHEVRON_UP
                        : ICONS.CHEVRON_DOWN
                    }
                    css={styles.showFullDescriptionIcon}
                  />
                </button>
              </>
            )}
          </GridItem>
        )}
      </GridItem>
      <GridItem
        gridColumnS="2/6"
        gridColumnM="2/8"
        gridColumnL="8/13"
        css={styles.dataContainer}
      >
        {greaterThan.M && (
          <Image
            src={headerImage.md}
            altText={ui('pdp.technicalSpecs.imageAlt')}
            css={styles.image}
          />
        )}
        <Tabs
          id="technical-specs"
          tabsLabels={[
            ui('pdp.technicalSpecs.technicalSpecs.tabLabel'),
            ui('pdp.technicalSpecs.tireSizes.tabLabel'),
          ]}
        >
          <Accordion
            id="technical-specs-tech-specs"
            items={specs}
            itemsToShow={TECH_SPECS_ITEMS_TO_SHOW}
            itemsToShowLabel={ui(
              'pdp.technicalSpecs.technicalSpecs.showAllLabel',
            )}
            singleItemExpandable
          />
          <>
            <Accordion
              id="technical-specs-tire-sizes"
              items={sizes.map((item) => ({
                label: item.label,
              }))}
              singleItemExpandable
            >
              {sizes.map((item, idx) => (
                <TireSizes key={idx} options={item.options} />
              ))}
            </Accordion>
            <Link
              theme={THEME.DARK}
              as="button"
              onClick={toggleTireSizeModal}
              css={styles.findMyTireSizeLabel}
            >
              {ui('pdp.technicalSpecs.tireSizes.findMyTireSizeLabel')}
            </Link>
          </>
        </Tabs>
      </GridItem>
      <AdditionalInfoModal
        customerServiceNumber={customerServiceNumber}
        isCustomerServiceEnabled={!!isCustomerServiceEnabled}
        isOpen={isTireSizeModalOpen}
        onClose={toggleTireSizeModal}
        {...TIRE_SEARCH_MODAL_DATA}
      />
    </Grid>
  );
}

export default TechnicalSpecs;
