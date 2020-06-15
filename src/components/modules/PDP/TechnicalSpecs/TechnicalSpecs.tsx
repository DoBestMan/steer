import { useCallback, useState } from 'react';

import Accordion, { Item } from '~/components/global/Accordion/Accordion';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Image from '~/components/global/Image/Image';
import Link from '~/components/global/Link/Link';
import Tabs from '~/components/global/Tabs/Tabs';
import AdditionalInfoModal from '~/components/modules/Search/AdditionalInfoModal/AdditionalInfoModal';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { LINK_THEME } from '~/lib/constants';
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
  isCustomerServiceEnabled?: boolean;
  sizes: Size[];
  specs: Item[];
}

const technicalSpecsitemsToShow = 8;

const headerImage = {
  sm: '/static/assets/pdp/closeup-tire-sm.png',
  md: '/static/assets/pdp/closeup-tire-md.png',
};

function TechnicalSpecs({ isCustomerServiceEnabled, specs, sizes }: Props) {
  const [isTireSizeModalOpen, setIsTireSizeModalOpen] = useState(false);
  const { is } = useBreakpoints();

  const toggleTireSizeModal = useCallback(() => {
    setIsTireSizeModalOpen(!isTireSizeModalOpen);
  }, [isTireSizeModalOpen, setIsTireSizeModalOpen]);

  return (
    <>
      <GridItem fullbleed as="header" css={styles.header}>
        <Grid>
          <GridItem
            gridColumnS="2/6"
            gridColumnM="2/8"
            gridColumnL="3/7"
            css={styles.titleContainer}
          >
            <h2 css={styles.title}>{ui('pdp.technicalSpecs.title')}:</h2>
          </GridItem>
          <GridItem
            gridColumnS="2/6"
            gridColumnM="2/6"
            gridColumnL="3/7"
            css={styles.descriptionContainer}
          >
            <p css={styles.description}>
              {ui('pdp.technicalSpecs.description')}
            </p>
          </GridItem>
          <GridItem
            fullbleed
            gridColumnM="2/8"
            gridColumnL="8/13"
            css={styles.imageContainer}
          >
            <Image
              src={is.S ? headerImage.sm : headerImage.md}
              altText={ui('pdp.technicalSpecs.imageAlt')}
            />
          </GridItem>
        </Grid>
      </GridItem>
      <GridItem
        gridColumnS="2/6"
        gridColumnM="2/8"
        gridColumnL="8/13"
        css={styles.dataContainer}
      >
        <Tabs
          tabsLabels={[
            ui('pdp.technicalSpecs.technicalSpecs.tabLabel'),
            ui('pdp.technicalSpecs.tireSizes.tabLabel'),
          ]}
        >
          <Accordion
            items={specs}
            itemsToShow={technicalSpecsitemsToShow}
            itemsToShowLabel={ui(
              'pdp.technicalSpecs.technicalSpecs.showAllLabel',
            )}
            singleItemExpandable
          />
          <>
            <Accordion
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
              theme={LINK_THEME.DARK}
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
        isCustomerServiceEnabled={!!isCustomerServiceEnabled}
        isOpen={isTireSizeModalOpen}
        onClose={toggleTireSizeModal}
        {...TIRE_SEARCH_MODAL_DATA}
      />
    </>
  );
}

export default TechnicalSpecs;
