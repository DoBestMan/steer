import AdvancedListing from '~/components/modules/Catalog/AdvancedListing/AdvancedListing';
import ProductGrid from '~/components/modules/Catalog/ProductGrid/ProductGrid';
import { SiteCatalogProductItem } from '~/data/models/SiteCatalogProductItem';

import styles from './CatalogProductGrid.styles';

interface Props {
  isAdvancedView: boolean;
  productList: SiteCatalogProductItem[];
}

function CatalogProductGrid({ productList, isAdvancedView }: Props) {
  return (
    <div css={styles.root}>
      {isAdvancedView ? (
        productList.map((product, i) => (
          <div css={styles.advancedListing} key={`${product.name}-${i}`}>
            <AdvancedListing {...product} />
          </div>
        ))
      ) : (
        <ProductGrid productList={productList} />
      )}
    </div>
  );
}

export default CatalogProductGrid;
