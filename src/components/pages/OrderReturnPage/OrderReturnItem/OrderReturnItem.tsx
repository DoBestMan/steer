import React, { useState } from 'react';

import Button from '~/components/global/Button/Button';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Image from '~/components/global/Image/Image';
import OrderReturnQuantitySelector from '~/components/pages/OrderReturnPage/OrderReturnQuantitySelector/OrderReturnQuantitySelector';
import { OrderProduct } from '~/data/models/OrderProduct';
import { BUTTON_STYLE, THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './OrderReturnItem.styles';

interface Props {
  quantityForReturn?: number;
  setQuantity?: (quantity: number) => void;
}
type OrderItemProps = OrderProduct & Props;

function ReturnOrderItem({
  image,
  name,
  quantity,
  quantityForReturn,
  setQuantity,
}: OrderItemProps) {
  const [isQuantityModalOpen, setQuantityModalStatus] = useState(false);

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
        <div css={styles.buttonsWrapper}>
          {quantityForReturn ? (
            <div css={styles.buttonWrapper}>
              <Button
                css={styles.button}
                style={BUTTON_STYLE.OUTLINED}
                theme={THEME.LIGHT}
                onClick={() => setQuantityModalStatus(true)}
              >
                {ui(
                  quantityForReturn === 1
                    ? 'pdp.stickyBar.changeQuantity'
                    : 'pdp.stickyBar.changeQuantityPlural',
                  { quantity: quantityForReturn },
                )}
                <Icon name={ICONS.CHEVRON_DOWN} css={styles.dropdownIcon} />
              </Button>
              <OrderReturnQuantitySelector
                quantity={quantity}
                quantityForReturn={quantityForReturn}
                isOpen={isQuantityModalOpen}
                onClose={() => setQuantityModalStatus(false)}
                onUpdateQuantity={(updatedQuantity) =>
                  setQuantity && setQuantity(updatedQuantity)
                }
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
export default ReturnOrderItem;
