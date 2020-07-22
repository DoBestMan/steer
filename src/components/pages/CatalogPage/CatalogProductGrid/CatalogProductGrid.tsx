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
  const [scrollPosition, setScrollPosition] = useState<number>();

  useEffect(() => {
    if (!pagination?.offset) {
      return;
    }

    const genuineProducts = displayedProducts.filter(
      (product) => product !== null,
    );

    const shouldRenderNextPage = genuineProducts.length === pagination.offset;

    if (shouldRenderNextPage) {
      setDisplayedProducts([...genuineProducts, ...productList]);
    }
  }, [displayedProducts, productList, pagination]);

  useEffect(() => {
    if (scrollPosition) {
      window.scrollTo(0, scrollPosition);
    }
  }, [scrollPosition]);

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
    setCurrentPage(newPage);
    setScrollPosition(window.scrollY || window.pageYOffset);
    setDisplayedProducts([
      ...displayedProducts,
      ...Array(nextProducts).fill(null),
    ]);
    handleUpdateResults({ page: `${newPage}` }, true);
  };

  return (
    <div css={styles.root}>
      {isAdvancedView ? (
        <>
          {displayedProducts.map((product, i) => {
            if (product === null) {
              return (
                <div css={styles.advancedListing} key={i}>
                  <AdvancedListingPlaceholder />
                </div>
              );
            }
            return (
              <div css={styles.advancedListing} key={`${product.name}-${i}`}>
                <AdvancedListing {...product} />
              </div>
            );
          })}
        </>
      ) : (
        <ProductGrid productList={displayedProducts} />
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
