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
  | 'onClickChangeQuantity'
  | 'size'
  | 'loadSpeedRating'
  | 'price'
  | 'rearSize'
  | 'rearLoadSpeedRating'
  | 'rearPrice'
>;

function RenderItem({
  loadSpeedRating,
  price,
  quantity,
  size,
}: {
  loadSpeedRating?: string;
  price?: SitePrice | null;
  quantity: number;
  size: string;
}) {
  return (
    <>
      <span css={styles.size}>
        {size} <span css={styles.loadSpeedRating}>{loadSpeedRating}</span>
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
  loadSpeedRating,
  price,
  rearSize,
  rearLoadSpeedRating,
  rearPrice,
  onClickChangeQuantity,
}: Props) {
  return (
    <ul css={styles.root}>
      <li>
        <button
          css={styles.button}
          onClick={onClickChangeQuantity('front')}
          aria-label={`${size} ${loadSpeedRating}, ${ui(
            'pdp.productInfo.changeSizeLabel',
          )}`}
        >
          <RenderItem
            size={ui('pdp.productInfo.frontTireSize', { size: size || '' })}
            loadSpeedRating={loadSpeedRating}
            price={price}
            quantity={2}
          />
        </button>
      </li>
      <li>
        <button
          css={styles.button}
          onClick={onClickChangeQuantity('rear')}
          aria-label={`${rearSize} ${rearLoadSpeedRating}, ${ui(
            'pdp.productInfo.changeSizeLabel',
          )}`}
        >
          <RenderItem
            size={ui('pdp.productInfo.rearTireSize', { size: rearSize || '' })}
            loadSpeedRating={rearLoadSpeedRating}
            price={rearPrice}
            quantity={2}
          />
        </button>
      </li>
    </ul>
  );
}

export default MultiSizeButton;
