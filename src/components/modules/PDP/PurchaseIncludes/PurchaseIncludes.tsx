import Carousel from '~/components/global/Carousel/Carousel';
import { ui } from '~/lib/utils/ui-dictionary';

import { everyPurchaseIncludesData } from './PurchaseIncludes.mock';
import PurchaseIncludesCard, {
  Props as CardType,
} from './PurchaseIncludesCard';
import styles from './PurchaseIncludesCard.styles';

function PurchaseIncludes() {
  return (
    <>
      <h2 css={styles.title}>{ui('pdp.everyPurchaseIncludes.title')}:</h2>

      <Carousel>
        {everyPurchaseIncludesData.map((item: CardType) => (
          <div css={styles.cardContainer} key={item.title}>
            <PurchaseIncludesCard {...item} />
          </div>
        ))}
      </Carousel>
    </>
  );
}

export default PurchaseIncludes;
