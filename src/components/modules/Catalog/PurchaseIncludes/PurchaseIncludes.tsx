import Glider from 'react-glider';

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

      <Glider draggable slidesToShow="auto">
        {everyPurchaseIncludesData.map((item: CardType) => (
          <PurchaseIncludesCard {...item} key={item.title} />
        ))}
      </Glider>
    </>
  );
}

export default PurchaseIncludes;
