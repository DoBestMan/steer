import AdvancedListing from '~/components/modules/Catalog/AdvancedListing/AdvancedListing';
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
        <div>Grid view to go here</div>
      )}
    </div>
  );
}

export default CatalogProductGrid;
