import Carousel from '~/components/global/Carousel/Carousel';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { ModalContextProps } from '~/context/Modal.context';
import { ui } from '~/lib/utils/ui-dictionary';

import { everyPurchaseIncludesData } from './PurchaseIncludes.mock';
import PurchaseIncludesCard, {
  Props as CardType,
} from './PurchaseIncludesCard';
import styles from './PurchaseIncludesCard.styles';

function PurchaseIncludes({
  openStaticModal,
}: Pick<ModalContextProps, 'openStaticModal'>) {
  return (
    <Grid>
      <GridItem as="h2" gridColumnL="3/end" css={styles.title}>
        {ui('pdp.everyPurchaseIncludes.title')}:
      </GridItem>

      <GridItem fullbleed>
        <Carousel freeScroll>
          {everyPurchaseIncludesData.map((item: CardType) => (
            <div css={styles.cardContainer} key={item.title}>
              <PurchaseIncludesCard
                openStaticModal={openStaticModal}
                {...item}
              />
            </div>
          ))}
        </Carousel>
      </GridItem>
    </Grid>
  );
}

export default PurchaseIncludes;
