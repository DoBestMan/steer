import { ThemeProvider } from 'emotion-theming';
import { useRouter } from 'next/router';
import { useState } from 'react';

import HeaderContainer from '~/components/modules/Catalog/Header.container';
import { CatalogSummaryContextProvider } from '~/context/CatalogSummary.context';
import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';

import styles from './CatalogPage.styles';
import { defaultTheme, headerAdvanced } from './CatalogPage.theme';
import CatalogProductGrid from './CatalogProductGrid/CatalogProductGrid';
import CatalogProductGroups from './CatalogProductGroups/CatalogProductGroups';
import {
  productGroupList,
  products,
} from './CatalogProductGroups/CatalogProductGroups.mocks';
import CatalogSummary from './CatalogSummary/CatalogSummary';
import {
  vehiclesDisambiguation,
  vehiclesNoOeWithSize,
  vehiclesNoResultWithTrim,
} from './CatalogSummary/CatalogSummary.mocks';

interface Props {
  hasTopPicks?: boolean;
  siteCatalogSummary?: SiteCatalogSummary;
}

function CatalogPage({ hasTopPicks = true, siteCatalogSummary }: Props) {
  const [isAdvancedView, setIsAdvancedView] = useState(false);
  function toggleView() {
    setIsAdvancedView(!isAdvancedView);
  }

  // TEMP: use route params for testing flows
  const router = useRouter();
  const { flow, isSearch } = router.query;

  // SiteCatalogSummary response
  let catalogSummaryResponse = vehiclesNoOeWithSize;
  // From the SiteCatalogProducts response
  let numberOfProducts = 232;

  if (flow === 'disambiguation') {
    catalogSummaryResponse = vehiclesDisambiguation;
  } else if (flow === 'noResults') {
    catalogSummaryResponse = vehiclesNoResultWithTrim;
    numberOfProducts = 0;
  }

  // TODO: logic of grouped vs. grid views — for now we only use grid for advanced view
  const isGroupedProducts = !isAdvancedView;

  return (
    <ThemeProvider
      theme={{ ...defaultTheme, ...(isAdvancedView && headerAdvanced) }}
    >
      <div css={styles.root}>
        {hasTopPicks && (
          <CatalogSummaryContextProvider
            catalogSummaryResponse={
              siteCatalogSummary || catalogSummaryResponse
            }
            isSearch={isSearch === 'true'}
            numberOfProducts={numberOfProducts}
          >
            <CatalogSummary />
          </CatalogSummaryContextProvider>
        )}
        <HeaderContainer
          sizeList={siteCatalogSummary?.siteCatalogSummaryMeta?.sizeList}
          hasTopPicks={hasTopPicks}
          toggleView={toggleView}
          isAdvancedView={isAdvancedView}
        />
        {isGroupedProducts ? (
          <CatalogProductGroups productGroupList={productGroupList} />
        ) : (
          <CatalogProductGrid
            productList={products}
            isAdvancedView={isAdvancedView}
          />
        )}
      </div>
    </ThemeProvider>
  );
}

export default CatalogPage;
