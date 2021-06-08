import { SiteCatalogProductItem } from '~/data/models//SiteCatalogProductItem';

import { NUMBER_OF_TIRES } from '../../Compare.constants';
import CTAGroup, { Quantity } from './CTAGroup';
import styles from './CTAList.styles';

interface Props {
  addToCart: ({
    product,
    quantity,
    shouldAddCoverage,
  }: {
    product?: SiteCatalogProductItem;
    quantity?: Quantity;
    shouldAddCoverage: boolean;
  }) => void;
  productList: SiteCatalogProductItem[];
  removingProductIndex: number;
}

function CTAList({ productList, addToCart, removingProductIndex }: Props) {
  return (
    <div css={styles.root}>
      {productList.map((product, index) => (
        <CTAGroup
          key={index}
          product={product}
          addToCart={addToCart}
          index={index}
          removingProductIndex={removingProductIndex}
        />
      ))}
      {productList.length < NUMBER_OF_TIRES.MAX && (
        <div css={{ width: '152px' }}></div>
      )}
    </div>
  );
}

export default CTAList;
