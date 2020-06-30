import BaseLink from '~/components/global/Link/BaseLink';
import Prices from '~/components/global/Prices/Prices';
import { numbersOnly } from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';
import { typography } from '~/styles/typography.styles';

import styles from './Price.styles';
import { ProductInfoProps } from './ProductInfo';

type Props = Pick<
  ProductInfoProps,
  'price' | 'callForPrice' | 'discount' | 'itemsLeft'
>;

function Price({ price, callForPrice, discount, itemsLeft }: Props) {
  if (!price && !callForPrice) {
    return (
      <>
        <p css={styles.title}>{ui('pdp.productInfo.outOfStock')}</p>
        <p css={styles.description}>
          {ui('pdp.productInfo.outOfStockDescription')}
        </p>
      </>
    );
  }

  if (!price) {
    return (
      <>
        <p css={styles.title}>
          {ui('pdp.productInfo.callForPrice')}{' '}
          <BaseLink
            href={`tel:${numbersOnly(ui('pdp.productInfo.callForPriceTel'))}`}
            css={styles.callingLink}
          >
            {ui('pdp.productInfo.callForPriceTel')}
          </BaseLink>
        </p>
        <p css={styles.description}>
          {ui('pdp.productInfo.callForPriceDescription')}
        </p>
      </>
    );
  }

  return (
    <>
      {discount && (
        <p css={styles.priceFeature}>
          {ui('pdp.productInfo.discount', { discount })}
        </p>
      )}
      {itemsLeft && (
        <p css={styles.priceFeature}>
          {ui('pdp.productInfo.itemsLeft', { itemsLeft })}
        </p>
      )}
      <Prices
        originalPrefix={ui('common.originalPricePrefix')}
        priceList={[{ price }]}
        currentPriceCSS={typography.primaryHeadline}
      />
    </>
  );
}

export default Price;
