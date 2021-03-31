import Button from '~/components/global/Button/Button';
import Image from '~/components/global/Image/Image';
import { OrderProduct } from '~/data/models/OrderProduct';
import { BUTTON_STYLE, THEME } from '~/lib/constants';
import { getLegacyCheckoutURL } from '~/lib/utils/legacy-routes';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './OrderItem.styles';

function OrderItem({
  image,
  name,
  quantity,
  id,
  canCustomerReorder,
}: OrderProduct) {
  const handleReorderBtnClick = (event: React.MouseEvent) => {
    event.preventDefault();
    const checkoutEndpoint = getLegacyCheckoutURL({
      front: id.toString(),
      quantity: { front: quantity },
    });
    window.location.href = checkoutEndpoint;
  };
  const quantityLabel =
    quantity === 1
      ? 'tracking.tiresOrderedSingular'
      : 'tracking.tiresOrderedPlural';
  return (
    <div css={styles.wrapper}>
      <Image
        css={styles.image}
        customContainerStyles={styles.imageWrapper}
        responsive
        {...image}
      />
      <div css={styles.content}>
        <div css={styles.name}>{name}</div>
        <div css={styles.quantity}>{ui(quantityLabel, { quantity })}</div>
        {canCustomerReorder && (
          <div css={styles.reorderButtonWrapper}>
            <Button
              css={styles.reorderButton}
              style={BUTTON_STYLE.OUTLINED}
              theme={THEME.LIGHT}
              onClick={handleReorderBtnClick}
            >
              {ui('tracking.reorderOption')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
export default OrderItem;
