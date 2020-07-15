import { useEffect, useState } from 'react';

import Button from '~/components/global/Button/Button';
import AdvancedListing from '~/components/modules/Catalog/AdvancedListing/AdvancedListing';
import AdvancedListingPlaceholder from '~/components/modules/Catalog/AdvancedListing/AdvancedListingPlaceholder';
import ProductGrid from '~/components/modules/Catalog/ProductGrid/ProductGrid';
import { useCatalogPageContext } from '~/context/CatalogPage.context';
import { ListResultMetadata } from '~/data/models/ListResultMetadata';
import { SiteCatalogProductItem } from '~/data/models/SiteCatalogProductItem';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './CatalogProductGrid.styles';

interface Props {
  productList: SiteCatalogProductItem[];
}

function CatalogProductGrid({
  productList,
  pagination,
}: Props & Pick<ListResultMetadata, 'pagination'>) {
  const {
    handleUpdateResults,
    isAdvancedView,
    isLoading,
  } = useCatalogPageContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedProducts, setDisplayedProducts] = useState(productList);
  const [nextProducts, setNextProducts] = useState(pagination?.resultsPerPage);

  useEffect(() => {
    if (!pagination?.offset) {
      return;
    }
    if (displayedProducts.length === pagination.offset) {
      setDisplayedProducts([...displayedProducts, ...productList]);
    }
  }, [displayedProducts, productList, pagination]);

  useEffect(() => {
    if (!pagination?.resultsPerPage || !pagination.offset) {
      return;
    }
    const remainingProducts =
      pagination.total - pagination.offset - pagination.resultsPerPage;
    const productsOnNextPage =
      remainingProducts >= pagination.resultsPerPage
        ? pagination.resultsPerPage
        : remainingProducts;
    setNextProducts(productsOnNextPage > 0 ? productsOnNextPage : 0);
  }, [pagination]);

  const handleLoadMore = () => {
    const newPage = currentPage + 1;
    handleUpdateResults({ page: `${newPage}` }, true);
    setCurrentPage(newPage);
  };

  return (
    <div css={styles.root}>
      {isAdvancedView ? (
        <>
          {displayedProducts.map((product, i) => (
            <div css={styles.advancedListing} key={`${product.name}-${i}`}>
              <AdvancedListing {...product} />
            </div>
          ))}
          {isLoading &&
            Array(nextProducts)
              .fill({})
              .map((_, i) => (
                <div css={styles.advancedListing} key={i}>
                  <AdvancedListingPlaceholder />
                </div>
              ))}
        </>
      ) : (
        <ProductGrid
          isLoading={isLoading}
          productList={displayedProducts}
          placeholders={nextProducts}
        />
      )}
      {pagination && displayedProducts.length < pagination?.total && (
        <div css={styles.loadMoreButton}>
          <Button onClick={handleLoadMore} isDisabled={isLoading}>
            {ui('catalog.productListing.loadMore')}
          </Button>
        </div>
      )}
    </div>
  );
}

export default CatalogProductGrid;
