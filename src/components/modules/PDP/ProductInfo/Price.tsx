import BaseLink from '~/components/global/Link/BaseLink';
import Prices from '~/components/global/Prices/Prices';
import { ui } from '~/lib/utils/ui-dictionary';
import { typography } from '~/styles/typography.styles';

import styles from './Price.styles';
import { ProductInfoProps } from './ProductInfo';

type Props = Pick<
  ProductInfoProps,
  | 'price'
  | 'callForPricing'
  | 'priceLabel'
  | 'volatileAvailability'
  | 'customerServiceNumber'
>;

function Price({
  customerServiceNumber,
  price,
  callForPricing,
  priceLabel,
  volatileAvailability,
}: Props) {
  if (!price && !callForPricing) {
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
          {ui('pdp.productInfo.callForPricing')}{' '}
          <BaseLink
            href={`tel:${customerServiceNumber.value}`}
            css={styles.callingLink}
          >
            {customerServiceNumber.display}
          </BaseLink>
        </p>
        <p css={styles.description}>
          {ui('pdp.productInfo.callForPricingDescription')}
        </p>
      </>
    );
  }

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
        currentPriceCSS={typography.primaryHeadline}
      />
    </>
  );
}

export default Price;
