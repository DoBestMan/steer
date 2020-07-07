import Carousel from '~/components/global/Carousel/Carousel';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { ui } from '~/lib/utils/ui-dictionary';

import { everyPurchaseIncludesData } from './PurchaseIncludes.mock';
import PurchaseIncludesCard, {
  Props as CardType,
} from './PurchaseIncludesCard';
import styles from './PurchaseIncludesCard.styles';

function PurchaseIncludes() {
  return (
    <Grid>
      <GridItem as="h2" gridColumnL="3/end" css={styles.title}>
        {ui('pdp.everyPurchaseIncludes.title')}:
      </GridItem>

      <GridItem fullbleed css={styles.items}>
        <Carousel>
          {everyPurchaseIncludesData.map((item: CardType) => (
            <div css={styles.cardContainer} key={item.title}>
              <PurchaseIncludesCard {...item} />
            </div>
          ))}
        </Carousel>
      </GridItem>
    </Grid>
  );
}

export default PurchaseIncludes;
