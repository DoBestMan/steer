import React from 'react';

import Prices from '~/components/global/Prices/Prices';
import { formatDollars } from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';
import { uiJSX } from '~/lib/utils/ui-dictionary-jsx';

import styles from './Price.styles';
import { ProductInfoProps } from './ProductInfo';

interface PriceProps
  extends Pick<
    ProductInfoProps,
    'price' | 'priceLabel' | 'startingPrice' | 'volatileAvailability'
  > {
  handleClickBestPrice?: () => void;
  isPdp: boolean;
}

function Price({
  price,
  priceLabel,
  startingPrice,
  volatileAvailability,
  isPdp,
  handleClickBestPrice,
}: PriceProps) {
  if (startingPrice && startingPrice !== '0' && isPdp) {
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
      {priceLabel && (
        <p css={styles.priceFeature} className="p-tag">
          {priceLabel}
        </p>
      )}
      {volatileAvailability && (
        <p css={styles.priceFeature}>
          ]{ui('pdp.productInfo.volatileAvailability')}
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
        handleClickBestPrice={handleClickBestPrice}
      />
    </>
  );
}

export default Price;
