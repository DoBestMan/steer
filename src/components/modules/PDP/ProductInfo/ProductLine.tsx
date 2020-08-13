import BrandLogoOrLabel from '~/components/global/BrandLogoOrLabel/BrandLogoOrLabel';
import { PRODUCT } from '~/lib/constants';

import { ProductInfoProps } from './ProductInfo';
import styles from './ProductLine.styles';

function ProductLine({
  brandURL,
  brand,
  productName,
}: Pick<ProductInfoProps, 'brandURL' | 'brand' | 'productName'>) {
  return (
    <>
      <a href={brandURL} css={styles.brand}>
        <BrandLogoOrLabel brand={brand} widths={PRODUCT.BRAND_IMAGE_WIDTHS} />
      </a>
      <h1
        css={[
          productName.length < PRODUCT.NAME_MAX_LENGTH
            ? styles.productName
            : styles.productNameLong,
        ]}
      >
        {productName}
      </h1>
    </>
  );
}

export default ProductLine;
