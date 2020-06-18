import { ThemeProvider } from 'emotion-theming';
import { useRouter } from 'next/router';
import { useState } from 'react';

import HeaderContainer from '~/components/modules/Catalog/Header.container';
import { CatalogSummaryContextProvider } from '~/context/CatalogSummary.context';
import { BUTTON_STYLE, COLORS, THEME } from '~/lib/constants';

import styles from './CatalogPage.styles';
import CatalogSummary from './CatalogSummary/CatalogSummary';
import {
  vehiclesDisambiguation,
  vehiclesNoOeWithSize,
  vehiclesNoResultWithTrim,
} from './CatalogSummary/CatalogSummary.mocks';

// exported for storybook
export const defaultTheme = {
  message: {
    buttonStyle: BUTTON_STYLE.OUTLINED,
    buttonTheme: THEME.ORANGE,
    loadingTheme: THEME.DARK,
  },
  header: {
    advancedLabel: {
      color: COLORS.LIGHT.GRAY_70,
    },
    background: {
      background: COLORS.GLOBAL.ORANGE,
    },
    buttonTheme: THEME.ORANGE,
    text: {
      color: COLORS.GLOBAL.BLACK,
    },
  },
};

export const headerAdvanced = {
  header: {
    advancedLabel: {
      color: COLORS.GLOBAL.WHITE,
    },
    background: {
      background: COLORS.GLOBAL.BLACK,
    },
    buttonTheme: THEME.DARK,
    text: {
      color: COLORS.DARK.GRAY_40,
    },
  },
};

function CatalogPage() {
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

  // TODO: determine if has top picks
  const hasTopPicks = false;

  return (
    <ThemeProvider
      theme={{ ...defaultTheme, ...(isAdvancedView && headerAdvanced) }}
    >
      <div css={styles.root}>
        {hasTopPicks && (
          <CatalogSummaryContextProvider
            catalogSummaryResponse={catalogSummaryResponse}
            isSearch={isSearch === 'true'}
            numberOfProducts={numberOfProducts}
          >
            <CatalogSummary />
          </CatalogSummaryContextProvider>
        )}
        <HeaderContainer
          hasTopPicks={hasTopPicks}
          toggleView={toggleView}
          isAdvancedView={isAdvancedView}
        />
      </div>
    </ThemeProvider>
  );
}

export default CatalogPage;
