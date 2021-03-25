import Prices from '~/components/global/Prices/Prices';
import { formatDollars } from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';
import { uiJSX } from '~/lib/utils/ui-dictionary-jsx';

import styles from './Price.styles';
import { ProductInfoProps } from './ProductInfo';

type Props = Pick<
  ProductInfoProps,
  'price' | 'priceLabel' | 'startingPrice' | 'volatileAvailability'
>;

function Price({
  price,
  priceLabel,
  startingPrice,
  volatileAvailability,
}: Props) {
  if (startingPrice && startingPrice !== '0') {
    return (
      <p css={styles.startingPrice}>
        {uiJSX('pdp.productInfo.startingAtLabel', {
          value: (
            <span key="starting-price">{formatDollars(startingPrice)}</span>
          ),
        })}
      </p>
    );
  }

  if (!price) {
    return null;
  }

  const isSalePrice =
    parseInt(price.salePriceInCents, 10) <
    parseInt(price.estimatedRetailPriceInCents, 10);

  return (
    <>
      {priceLabel && <p css={styles.priceFeature}>{priceLabel}</p>}
      {volatileAvailability && (
        <p css={styles.priceFeature}>
          {ui('pdp.productInfo.volatileAvailability')}
        </p>
      )}
      <Prices
        originalPrefix={ui('common.originalPricePrefix')}
        priceList={[{ price }]}
        customPriceStyles={[
          styles.prices,
          !isSalePrice ? styles.pricesPadded : {},
        ]}
        customOriginalStyles={styles.originalPrice}
      />
    </>
  );
}

export default Price;
