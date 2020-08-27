import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import Button from '~/components/global/Button/Button';
import AdvancedListingPlaceholder from '~/components/modules/Catalog/AdvancedListing/AdvancedListingPlaceholder';
import ProductGrid from '~/components/modules/Catalog/ProductGrid/ProductGrid';
import { useCatalogProductsContext } from '~/context/CatalogProducts.context';
import { ListResultMetadata } from '~/data/models/ListResultMetadata';
import {
  SiteCatalogProductItem,
  SiteCatalogProductItemEnum,
} from '~/data/models/SiteCatalogProductItem';
import { SiteCatalogProducts } from '~/data/models/SiteCatalogProducts';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './CatalogProductGrid.styles';

const Advancedlisting = dynamic(
  () => import('~/components/modules/Catalog/AdvancedListing/AdvancedListing'),
  { loading: AdvancedListingPlaceholder },
);

interface Props {
  fetchNewProducts: (page: number) => Promise<SiteCatalogProducts | null>;
  productList: SiteCatalogProductItem[];
}

function CatalogProductGrid({
  productList,
  pagination,
  fetchNewProducts,
}: Props & Pick<ListResultMetadata, 'pagination'>) {
  const {
    isAdvancedView,
    isLoading,
    displayedProducts,
    setDisplayedProducts,
  } = useCatalogProductsContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [nextProducts, setNextProducts] = useState(pagination?.resultsPerPage);
  const [scrollPosition, setScrollPosition] = useState<number>();

  useEffect(() => {
    if (scrollPosition) {
      window.scrollTo(0, scrollPosition);
    }
  }, [scrollPosition]);

  useEffect(() => {
    // Reset listing if displayedProducts has been reset (e.g. filters are applied)
    if (displayedProducts.length === 0 && productList.length > 0) {
      setDisplayedProducts(productList);
      setCurrentPage(1);
      setNextProducts(pagination?.resultsPerPage);
    }
  }, [displayedProducts, productList, setDisplayedProducts, pagination]);

  const handleLoadMore = async () => {
    const newPage = currentPage + 1;
    setScrollPosition(window.scrollY || window.pageYOffset);

    setDisplayedProducts([
      ...displayedProducts,
      ...Array(nextProducts).fill(null),
    ]);

    const siteCatalogProducts = await fetchNewProducts(newPage);

    if (!siteCatalogProducts) {
      setDisplayedProducts(displayedProducts);
      return;
    }

    setCurrentPage(newPage);
    const {
      siteCatalogProductsResultList,
      listResultMetadata,
    } = siteCatalogProducts;

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
    <>
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
                <Advancedlisting {...product} />
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
    </>
  );
}

export default CatalogProductGrid;
