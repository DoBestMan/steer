import AdvancedListing from '~/components/modules/Catalog/AdvancedListing/AdvancedListing';
import AdvancedListingPlaceholder from '~/components/modules/Catalog/AdvancedListing/AdvancedListingPlaceholder';
import ProductGrid from '~/components/modules/Catalog/ProductGrid/ProductGrid';
import { SiteCatalogProductItem } from '~/data/models/SiteCatalogProductItem';

import styles from './CatalogProductGrid.styles';

interface Props {
  isAdvancedView: boolean;
  isLoading?: boolean;
  productList: SiteCatalogProductItem[];
}

function CatalogProductGrid({ productList, isAdvancedView, isLoading }: Props) {
  return (
    <div css={styles.root}>
      {isAdvancedView ? (
        isLoading ? (
          Array(4)
            .fill({})
            .map((_, i) => (
              <div css={styles.advancedListing} key={i}>
                <AdvancedListingPlaceholder />
              </div>
            ))
        ) : (
          productList.map((product, i) => (
            <div css={styles.advancedListing} key={`${product.name}-${i}`}>
              <AdvancedListing {...product} />
            </div>
          ))
        )
      ) : (
        <ProductGrid isLoading={isLoading} productList={productList} />
      )}
    </div>
  );
}

export default CatalogProductGrid;
