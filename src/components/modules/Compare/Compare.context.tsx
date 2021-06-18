import { useRouter } from 'next/router';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';

import { useUserPersonalizationContext } from '~/context/UserPersonalization.context';
import { SiteCatalogProductItem } from '~/data/models/SiteCatalogProductItem';
import { SiteCompareTable } from '~/data/models/SiteCompareTable';
import { useLocalStorage } from '~/hooks/useLocalStorage';
import { apiGetSiteCompareProductsResult } from '~/lib/api/compare-products';
import { TIME } from '~/lib/constants';
import { FetchErrorCodes } from '~/lib/fetch/FetchError';
import { createContext } from '~/lib/utils/context';
import { getLegacyCheckoutURL } from '~/lib/utils/legacy-routes';

import { removeColumnFromTable, tableContentFactory } from './Compare.utils';

interface Props {
  children: ReactNode;
}
interface Quantity {
  front: number;
  rear?: number;
}
export interface CompareContextProps {
  addTire: () => void;
  addToCart: ({
    product,
    quantity,
    shouldAddCoverage,
  }: {
    product?: SiteCatalogProductItem;
    quantity?: Quantity;
    shouldAddCoverage: boolean;
  }) => void;
  addToList: (product: SiteCatalogProductItem) => void;
  checkSelection: (product: SiteCatalogProductItem) => boolean;
  handleCloseModal: () => void;
  handleCompare: () => void;
  hasFetchCompareResultsError: boolean;
  includedInList: (productId: string) => boolean;
  isCompareModalOpen: boolean;
  isLoadingModalData: boolean;
  openCompareDrawer: boolean;
  productListToCompare: SiteCatalogProductItem[];
  removeFromList: (productId: string) => void;
  removingProductIndex: number;
  setIsCompareModalOpen: (value: boolean) => void;
  setOpenCompareDrawer: (
    value: boolean | ((value: boolean) => boolean),
  ) => void;
  setRemovingProductIndex: (index: number) => void;
  setShowCompareDrawer: (value: boolean) => void;
  setShowDupAlert: (value: boolean) => void;
  showCompareDrawer: boolean;
  showDupAlert: boolean;
  tablesData: SiteCompareTable[] | null;
}

const CompareContext = createContext<CompareContextProps>();

function useContextSetup(): CompareContextProps {
  const [showCompareDrawer, setShowCompareDrawer] = useState<boolean>(true);
  const [productListToCompare, setProductList] = useState<
    SiteCatalogProductItem[]
  >([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);
  const [openCompareDrawer, setOpenCompareDrawer] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tablesData, setTablesData] = useState<Array<SiteCompareTable> | null>(
    null,
  );
  const [
    hasFetchCompareResultsError,
    setHasFetchCompareResultsError,
  ] = useState<boolean>(false);
  const [removingProductIndex, setRemovingProductIndex] = useState<number>(-1);
  const [showDupAlert, setShowDupAlert] = useState<boolean>(false);
  const { userPersonalizationData } = useUserPersonalizationContext();

  const abortController = useRef<AbortController | null>(null);
  const isRequestInProgress = useRef(false);
  const previewNumber = useRef(productListToCompare.length);

  const [localProducts, setLocalProducts] = useLocalStorage(
    'ST_COMPARE',
    [] as SiteCatalogProductItem[],
  );

  const [pageUrl, setPageUrl] = useLocalStorage('ST_PAGE', '');
  const router = useRouter();

  useEffect(() => {
    abortController.current = new AbortController();
  }, []);

  useEffect(() => {
    const currentPath = router.asPath.split('#')[0];

    if (currentPath !== pageUrl) {
      setLocalProducts([]);
      setProductList([]);
    } else {
      setProductList(localProducts);
    }
    setPageUrl(currentPath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  useEffect(() => {
    let timerId1: ReturnType<typeof window.setTimeout>;

    //need to close modal when the number of product is less than 2
    if (productListToCompare.length < 2) {
      setIsCompareModalOpen(false);
    }

    //show drawer if a product added or removed
    if (productListToCompare.length) {
      setShowCompareDrawer(false);

      // if modal is open, don't open drawer because it locks body scrolls, cause the scrollbar to be disabled on small screen
      if (isCompareModalOpen) {
        return;
      }

      timerId1 = setTimeout(() => {
        setOpenCompareDrawer(true);
      }, TIME.MS750);
      return;
    }

    const timerId2 = setTimeout(() => {
      setOpenCompareDrawer(false);
    }, TIME.MS750);
    setShowCompareDrawer(true);

    previewNumber.current = productListToCompare.length;

    return () => {
      clearTimeout(timerId1);
      clearTimeout(timerId2);
    };
  }, [productListToCompare.length, setOpenCompareDrawer, isCompareModalOpen]);

  const abortCompareRequest = () => {
    abortController.current?.abort();
    abortController.current = new AbortController();
    isRequestInProgress.current = false;
  };

  const fetchCompareData = useCallback(async () => {
    if (isRequestInProgress.current) {
      abortCompareRequest();
    }

    setIsLoading(true);
    isRequestInProgress.current = true;
    setHasFetchCompareResultsError(false);
    const ids = productListToCompare.map((product) => product.productId);
    const compareProductIds = ids.slice(1).join(',');

    const res = await apiGetSiteCompareProductsResult({
      includeUserRegion: true,
      includeUserZip: true,
      query: { compareProductIds, productId: ids[0] as string },
      signal: abortController.current?.signal,
    });

    if (res.isSuccess) {
      // data from the frontend and backend differ
      const newProductList = productListToCompare.map((product, index) => {
        const tempProduct = {
          ...product,
          siteProductLineSizeDetailRoadHazard:
            res.data.siteCatalogCompareList[index]
              .siteProductLineSizeDetailRoadHazard,
        };

        return tempProduct;
      });

      setProductList(newProductList);
      setTablesData(tableContentFactory(res.data.siteCatalogCompareList));
    } else {
      console.error('error', res.error);
      if (res.error.code !== FetchErrorCodes.AbortError) {
        setHasFetchCompareResultsError(true);
      }
    }

    isRequestInProgress.current = false;
    setIsLoading(false);
  }, [isRequestInProgress, productListToCompare]);

  const addToList = (product: SiteCatalogProductItem) => {
    setProductList((old) => [...old, product]);
    setLocalProducts([...productListToCompare, product]);
  };

  const removeFromList = (productId: string) => {
    const temp = productListToCompare.filter(
      (item) => item.productId !== productId,
    );
    setProductList(temp);
    setLocalProducts(temp);

    if (tablesData) {
      const index = productListToCompare.findIndex(
        (product) => product.productId === productId,
      );

      const newTableData = tablesData.map((table) =>
        removeColumnFromTable(table, index),
      );
      setRemovingProductIndex(-1);
      setTablesData(newTableData);
    }
  };

  const addToCart = ({
    product,
    quantity,
    shouldAddCoverage,
  }: {
    product?: SiteCatalogProductItem;
    quantity?: Quantity;
    shouldAddCoverage: boolean;
  }) => {
    if (!product || !quantity) {
      return;
    }

    const checkoutURL = getLegacyCheckoutURL({
      front: product.productId as string,
      quantity,
      rear: product.productId as string,
      roadHazard: shouldAddCoverage,
      userZip: userPersonalizationData?.userLocation?.zip || undefined,
    });

    window.location.href = checkoutURL;
  };

  const addTire = () => {
    setOpenCompareDrawer(false);
    setIsCompareModalOpen(false);
  };

  const checkSelection = (product: SiteCatalogProductItem) => {
    if (!product) {
      return false;
    }
    const { productId, curationType } = product;
    const foundProduct = productListToCompare.find(
      (item) =>
        item.productId === productId && item.curationType === curationType,
    );

    return !!foundProduct;
  };

  const handleCompare = async () => {
    setIsCompareModalOpen(true);
    setOpenCompareDrawer(false);
    await fetchCompareData();
  };

  const handleCloseModal = () => {
    setIsCompareModalOpen(false);
    abortCompareRequest();
  };

  const includedInList = (productId: string) => {
    const found = productListToCompare.find(
      (product) => product.productId === productId,
    );

    return !!found;
  };

  return {
    addTire,
    addToCart,
    addToList,
    checkSelection,
    handleCloseModal,
    handleCompare,
    hasFetchCompareResultsError,
    includedInList,
    isCompareModalOpen,
    isLoadingModalData: isLoading,
    openCompareDrawer,
    productListToCompare,
    removeFromList,
    removingProductIndex,
    setIsCompareModalOpen,
    setOpenCompareDrawer,
    setRemovingProductIndex,
    setShowCompareDrawer,
    setShowDupAlert,
    showCompareDrawer,
    showDupAlert,
    tablesData,
  };
}

export function CompareContextProvider({ children }: Props) {
  const value = useContextSetup();

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
}

export const useCompareContext = CompareContext.useContext;
