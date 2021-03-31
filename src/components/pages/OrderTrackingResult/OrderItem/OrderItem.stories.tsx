import { boolean, number, text } from '@storybook/addon-knobs';

import { SiteImage } from '~/data/models/SiteImage';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';

import OrderItem from './OrderItem';

export default {
  component: OrderItem,
  title: 'Tracking/OrderItem',
};

const itemImage = {
  altText: 'Tire sidewall',
  height: 800,
  src:
    'https://images.simpletire.com/image/upload/v1591705545/line-images/1349/1349-sidetread_f24ld3.png',
  type: ICON_IMAGE_TYPE.IMAGE,
  width: 543,
} as SiteImage;

const styles = {
  wrapper: {
    margin: '30px auto',
    maxWidth: 400,
  },
};

export function OrderItemWithKnobs() {
  const name = text(
    'Item name',
    'Bridgestone Dueler A/T Revo 2 - P215/75R16 - 001311',
  );
  const quantity = number('Quantity', 2);
  const id = number('ID', 1234);
  const canCustomerReorder = boolean('Can customer reorder', true);
  return (
    <div css={styles.wrapper}>
      <OrderItem
        id={id}
        image={itemImage}
        name={name}
        quantity={quantity}
        canCustomerReorder={canCustomerReorder}
      />
    </div>
  );
}
