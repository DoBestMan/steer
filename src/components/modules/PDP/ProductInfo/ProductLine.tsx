import BrandLogoOrLabel from '~/components/global/BrandLogoOrLabel/BrandLogoOrLabel';

import { ProductInfoProps } from './ProductInfo';
import styles from './ProductLine.styles';

function ProductLine({
  brandURL,
  brand,
  name,
}: Pick<ProductInfoProps, 'brandURL' | 'brand' | 'name'>) {
  return (
    <>
      <a href={brandURL} css={styles.brand}>
        <BrandLogoOrLabel brand={brand} widths={[200, 400, 600]} />
      </a>
      <h1
        css={[name.length < 16 ? styles.productName : styles.productNameLong]}
      >
        {name}
      </h1>
    </>
  );
}

export default ProductLine;
