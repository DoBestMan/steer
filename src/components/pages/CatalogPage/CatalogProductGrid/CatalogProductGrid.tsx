import { useEffect, useState } from 'react';

import Button from '~/components/global/Button/Button';
import AdvancedListing from '~/components/modules/Catalog/AdvancedListing/AdvancedListing';
import AdvancedListingPlaceholder from '~/components/modules/Catalog/AdvancedListing/AdvancedListingPlaceholder';
import ProductGrid from '~/components/modules/Catalog/ProductGrid/ProductGrid';
import { useCatalogPageContext } from '~/context/CatalogPage.context';
import { ListResultMetadata } from '~/data/models/ListResultMetadata';
import {
  SiteCatalogProductItem,
  SiteCatalogProductItemEnum,
} from '~/data/models/SiteCatalogProductItem';
import { SiteCatalogProducts } from '~/data/models/SiteCatalogProducts';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './CatalogProductGrid.styles';

interface Props {
  fetchNewProducts: (page: number) => Promise<SiteCatalogProducts>;
  productList: SiteCatalogProductItem[];
}

function CatalogProductGrid({
  productList,
  pagination,
  fetchNewProducts,
}: Props & Pick<ListResultMetadata, 'pagination'>) {
  const [currentPage, setCurrentPage] = useState(1);
  const { isAdvancedView, isLoading } = useCatalogPageContext();
  const [displayedProducts, setDisplayedProducts] = useState(productList);
  const [nextProducts, setNextProducts] = useState(pagination?.resultsPerPage);
  const [scrollPosition, setScrollPosition] = useState<number>();

  useEffect(() => {
    if (scrollPosition) {
      window.scrollTo(0, scrollPosition);
    }
  }, [scrollPosition]);

  useEffect(() => {
    // Reset listing if productList changes (e.g. filters are applied)
    setCurrentPage(1);
    setDisplayedProducts(productList);
    setNextProducts(pagination?.resultsPerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productList]);

  const handleLoadMore = async () => {
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    setScrollPosition(window.scrollY || window.pageYOffset);

    setDisplayedProducts([
      ...displayedProducts,
      ...Array(nextProducts).fill(null),
    ]);

    const {
      siteCatalogProductsResultList,
      listResultMetadata,
    } = await fetchNewProducts(newPage);

    const newProducts = siteCatalogProductsResultList.filter(
      (result): result is SiteCatalogProductItem =>
        result.type === SiteCatalogProductItemEnum.SiteCatalogProductItem,
    );

    setDisplayedProducts([...displayedProducts, ...newProducts]);

    const newPagination = listResultMetadata?.pagination;

    if (newPagination && newPagination.offset && newPagination.resultsPerPage) {
      const remainingProducts =
        newPagination.total -
        newPagination.offset -
        newPagination.resultsPerPage;
      const productsOnNextPage =
        remainingProducts >= newPagination.resultsPerPage
          ? newPagination.resultsPerPage
          : remainingProducts;
      setNextProducts(productsOnNextPage > 0 ? productsOnNextPage : 0);
    }
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
