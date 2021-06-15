import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

import Button from '~/components/global/Button/Button';
import AdvancedListingPlaceholder from '~/components/modules/Catalog/AdvancedListing/AdvancedListingPlaceholder';
import { useCompareContext } from '~/components/modules/Compare/Compare.context';
import { addHashForScroll } from '~/components/pages/CatalogPage/CatalogPage.helpers';
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
  fetchNewProducts: (
    page: number,
    skipGroups: boolean,
  ) => Promise<SiteCatalogProducts | null>;
  productList: SiteCatalogProductItem[];
}

function CatalogProductGrid({
  productList,
  pagination,
  fetchNewProducts,
}: Props & Pick<ListResultMetadata, 'pagination'>) {
  const {
    isLoading,
    displayedProducts,
    setDisplayedProducts,
  } = useCatalogProductsContext();
  const {
    addToList,
    removeFromList,
    includedInList,
    checkSelection,
    setOpenCompareDrawer,
    setShowDupAlert,
  } = useCompareContext();
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

    const siteCatalogProducts = await fetchNewProducts(newPage, true);

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

  const handleProductClick = (scrollId: string) => () => {
    addHashForScroll(scrollId);
  };

  const onCheckChange = (product: SiteCatalogProductItem) => (
    value?: boolean,
  ) => {
    const isInList = includedInList(product.productId as string);

    if (!isInList && value) {
      addToList(product);

      return;
    }

    if (isInList && !value) {
      removeFromList && removeFromList(product.productId as string);
      return;
    }

    if (isInList) {
      setOpenCompareDrawer(true);
      setShowDupAlert(true);
      return;
    }
  };

  return (
    <>
      {displayedProducts.map((product, i) => {
        const scrollId = `${product?.name.split(' ').join('-')}__${i}`;
        return (
          <div
            css={styles.advancedListing}
            data-scroll-id={scrollId}
            onClick={handleProductClick(scrollId)}
            key={`${product?.name}-${i}`}
          >
            <Advancedlisting
              product={product}
              onCheckChange={onCheckChange(product)}
              isChecked={checkSelection(product)}
            />
          </div>
        );
      })}
      {pagination && displayedProducts.length < pagination?.total && (
        <div css={styles.loadMoreButton}>
          <Button
            onClick={handleLoadMore}
            isDisabled={isLoading}
            data-testid="pagination-button"
          >
            {ui('catalog.productListing.loadMore')}
          </Button>
        </div>
      )}
    </>
  );
}

export default CatalogProductGrid;
