import { useRouter } from 'next/router';
import { useRef } from 'react';

import Meta from '~/components/global/Meta/Meta';
import { useSearchModalContext } from '~/components/modules/Search/SearchModal.context';
import { CatalogProductsContextProvider } from '~/context/CatalogProducts.context';
import { CatalogSummaryContextProvider } from '~/context/CatalogSummary.context';
import { useSiteSessionContext } from '~/context/SiteSession.context';
import { eventEmitters } from '~/lib/events/emitters';
import { getStringifiedParams } from '~/lib/utils/routes';

import CatalogPage from './CatalogPage';
import { CatalogApiArgs, CatalogPageData } from './CatalogPage.types';
import { mapDataToMeta, SearchBy, SearchByParams } from './mapppers/meta';

export const CATALOG_PARAMS = ['group', 'skipGroups'];

interface Props extends CatalogPageData {
  endpoints: {
    products: string;
    summary: string;
  };
  hasDefaultAdvancedView?: boolean;
  isSearchForTireSize?: boolean;
  pageParams?: Record<string, string>;
  searchBy: SearchBy;
  searchByParams: SearchByParams;
}

function CatalogPageContainer({
  endpoints,
  serverData,
  pageParams = {},
  searchBy,
  searchByParams,
  isSearchForTireSize,
}: Props) {
  const { query } = useRouter();
  const { isSearchOpen } = useSearchModalContext();
  const meta = mapDataToMeta({ searchBy, searchByParams });
  const catalogGridRef = useRef<HTMLDivElement | null>(null);
  const { siteSession } = useSiteSessionContext();
  // begin fetching data from /summary and /products
  const queryParams = getStringifiedParams({
    ...query,
    ...pageParams,
    page: '1',
  });
  const apiArgs: CatalogApiArgs = {
    defaultData: serverData,
    includeUserRegion: true,
    includeUserZip: true,
    query: queryParams,
    revalidateEmitter: eventEmitters.userPersonalizationLocationUpdate,
    siteSession,
  };

  /**
   * Note: CatalogSummary context must wrap CatalogPage context, because
   * CatalogPage context needs to know the stage when loading product data.
   */
  return (
    <>
      {meta && <Meta {...meta} />}
      <CatalogSummaryContextProvider
        apiArgs={apiArgs}
        comesFromSearch={isSearchOpen}
        endpoint={endpoints.summary}
      >
        <CatalogProductsContextProvider
          apiArgs={apiArgs}
          catalogGridRef={catalogGridRef}
          endpoint={endpoints.products}
          pageParams={pageParams}
        >
          <CatalogPage
            catalogGridRef={catalogGridRef}
            isSearchForTireSize={!!isSearchForTireSize}
          />
        </CatalogProductsContextProvider>
      </CatalogSummaryContextProvider>
    </>
  );
}

export default CatalogPageContainer;
