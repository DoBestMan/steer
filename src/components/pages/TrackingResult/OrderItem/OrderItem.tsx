import Image from '~/components/global/Image/Image';
import { OrderProduct } from '~/data/models/OrderProduct';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './OrderItem.styles';

function OrderItem({ image, name, quantity }: OrderProduct) {
  const quantityLabel =
    quantity === 1
      ? 'tracking.tiresOrderedSingular'
      : 'tracking.tiresOrderedPlural';
  return (
    <div css={styles.wrapper}>
      <Image
        css={styles.image}
        customStyles={styles.imageWrapper}
        responsive
        {...image}
      />
      <div css={styles.content}>
        <div css={styles.name}>{name}</div>
        <div css={styles.quantity}>{ui(quantityLabel, { quantity })}</div>
      </div>
    </div>
  );
}

export default OrderItem;
