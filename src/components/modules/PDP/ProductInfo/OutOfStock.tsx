import React from 'react';

import Button from '~/components/global/Button/Button';
import BaseLink from '~/components/global/Link/BaseLink';
import { useSiteGlobalsContext } from '~/context/SiteGlobals.context';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './OutOfStock.styles';
import { ProductInfoProps } from './ProductInfo';

type Props = Pick<
  ProductInfoProps,
  | 'callForPricing'
  | 'sameSearchLabel'
  | 'sameSizeSearchResults'
  | 'sameSizeSearchURL'
  | 'size'
>;

function OutOfStock({
  sameSearchLabel,
  sameSizeSearchResults,
  sameSizeSearchURL,
  size,
  callForPricing,
}: Props) {
  const {
    customerServiceEnabled,
    customerServiceNumber,
  } = useSiteGlobalsContext();
  const hasSameSizeResults = !!sameSizeSearchResults && !!sameSizeSearchURL;

  if (callForPricing) {
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
          {ui(
            customerServiceEnabled
              ? 'pdp.productInfo.callForPricingDescription'
              : 'pdp.productInfo.callForPricingDescriptionDisabled',
          )}
        </p>
      </>
    );
  }

  return (
    <>
      <p css={styles.title}>{ui('pdp.productInfo.outOfStock')}</p>
      <p css={styles.description}>
        {ui(
          hasSameSizeResults
            ? 'pdp.productInfo.crossSellDescription'
            : 'pdp.productInfo.outOfStockDescription',
          {
            results: sameSizeSearchResults?.toString() || '',
            label: sameSearchLabel ? sameSearchLabel : 'size',
          },
        )}
      </p>
      {hasSameSizeResults && (
        <Button
          href={sameSizeSearchURL?.toString()}
          as="a"
          css={styles.crossSellButton}
        >
          {ui('pdp.productInfo.crossSellButtonLabel', { size: size || '' })}
        </Button>
      )}
    </>
  );
}

export default OutOfStock;
