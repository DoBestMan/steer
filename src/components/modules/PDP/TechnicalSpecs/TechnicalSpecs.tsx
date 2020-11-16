import Accordion, {
  AccordionItem,
} from '~/components/global/Accordion/Accordion';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Image from '~/components/global/Image/Image';
import Link from '~/components/global/Link/Link';
import Tabs from '~/components/global/Tabs/Tabs';
import { SiteImage } from '~/data/models/SiteImage';
import { THEME } from '~/lib/constants';
import { STATIC_MODAL_IDS } from '~/lib/constants/staticModals';
import { ui } from '~/lib/utils/ui-dictionary';

import Description from './Description';
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
export interface TechnicalSpecsProps {
  description: string;
  image?: SiteImage;
  sizes: Size[];
  specs: AccordionItem[];
}

interface Props extends TechnicalSpecsProps {
  openStaticModal: (modalId: string) => void;
  techSpecsAnchor: string;
}

const TECH_SPECS_ITEMS_TO_SHOW = 5;

function TechnicalSpecs({
  description,
  image,
  specs,
  sizes,
  openStaticModal,
  techSpecsAnchor,
}: Props) {
  function openTireSizeModal() {
    openStaticModal(STATIC_MODAL_IDS.HOW_TO_FIND_YOUR_SIZE);
  }

  return (
    <Grid>
      <GridItem as="h2" gridColumnL="3/7" gridRow="1" css={styles.title}>
        {ui('pdp.technicalSpecs.title')}:
      </GridItem>
      {description && (
        <GridItem
          gridColumnL="3/7"
          gridRow="3"
          gridRowL="2/4"
          css={styles.description}
        >
          <Description description={description} />
        </GridItem>
      )}
      {image && (
        <GridItem
          fullbleed
          gridColumnL="8/13"
          gridRow="2"
          gridRowL="1/3"
          css={styles.imageContainer}
        >
          <Image {...image} responsive />
        </GridItem>
      )}
      <GridItem
        gridRow="4"
        gridRowL={image ? '3' : '2/3'}
        gridColumnL="8/13"
        css={styles.dataContainer}
      >
        <Tabs
          id={techSpecsAnchor}
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
            linkTarget="_self"
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
              onClick={openTireSizeModal}
              css={styles.findMyTireSizeLabel}
            >
              {ui('pdp.technicalSpecs.tireSizes.findMyTireSizeLabel')}
            </Link>
          </>
        </Tabs>
      </GridItem>
    </Grid>
  );
}

export default TechnicalSpecs;
