import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Prices from '~/components/global/Prices/Prices';
import { SitePrice } from '~/data/models/SitePrice';
import { ui } from '~/lib/utils/ui-dictionary';
import { typography } from '~/styles/typography.styles';

import styles from './MultiSizeButton.styles';
import { ProductInfoProps } from './ProductInfo';

type Props = Pick<
  ProductInfoProps,
  | 'handleChangeQuantity'
  | 'size'
  | 'loadIndex'
  | 'price'
  | 'rearSize'
  | 'rearLoadIndex'
  | 'rearPrice'
>;

function RenderItem({
  loadIndex,
  price,
  quantity,
  size,
}: {
  loadIndex?: string;
  price?: SitePrice;
  quantity: number;
  size: string;
}) {
  return (
    <>
      <span css={styles.size}>
        {size} <span css={styles.loadIndex}>{loadIndex}</span>
      </span>
      <span css={styles.price}>
        <Prices
          priceList={[{ price: price as SitePrice }]}
          currentPriceCSS={typography.primarySubhead}
        />
      </span>
      <span css={styles.quantity}>
        {ui('pdp.productInfo.sizeQuantity', { quantity })}
      </span>
      <Icon name={ICONS.CHEVRON_DOWN} css={styles.icon} />
    </>
  );
}

function MultiSizeButton({
  size,
  loadIndex,
  price,
  rearSize,
  rearLoadIndex,
  rearPrice,
  handleChangeQuantity,
}: Props) {
  return (
    <ul css={styles.root}>
      <li>
        <button
          css={styles.button}
          onClick={handleChangeQuantity('front')}
          aria-label={`${size} ${loadIndex}, ${ui(
            'pdp.productInfo.changeSizeLabel',
          )}`}
        >
          <RenderItem
            size={ui('pdp.productInfo.frontTireSize', { size: size || '' })}
            loadIndex={loadIndex}
            price={price}
            quantity={2}
          />
        </button>
      </li>
      <li>
        <button
          css={styles.button}
          onClick={handleChangeQuantity('rear')}
          aria-label={`${rearSize} ${rearLoadIndex}, ${ui(
            'pdp.productInfo.changeSizeLabel',
          )}`}
        >
          <RenderItem
            size={ui('pdp.productInfo.rearTireSize', { size: rearSize || '' })}
            loadIndex={rearLoadIndex}
            price={rearPrice}
            quantity={2}
          />
        </button>
      </li>
    </ul>
  );
}

export default MultiSizeButton;
