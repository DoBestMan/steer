import Button from '~/components/global/Button/Button';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './CrossSell.styles';
import { ProductInfoProps } from './ProductInfo';

type Props = Pick<
  ProductInfoProps,
  'sameSizeSearchResults' | 'sameSizeSearchURL' | 'size'
>;

function CrossSell({ sameSizeSearchResults, sameSizeSearchURL, size }: Props) {
  if (!sameSizeSearchResults || !sameSizeSearchURL) {
    return null;
  }

  return (
    <>
      <p>
        {ui('pdp.productInfo.crossSellTitle', {
          results: sameSizeSearchResults?.toString() || '',
        })}
      </p>
      <Button href={sameSizeSearchURL} as="a" css={styles.crossSellButton}>
        {ui('pdp.productInfo.crossSellButtonLabel', { size: size || '' })}
      </Button>
    </>
  );
}

export default CrossSell;
