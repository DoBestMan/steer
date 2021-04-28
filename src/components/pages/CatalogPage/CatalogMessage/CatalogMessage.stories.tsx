import { ThemeProvider } from '@emotion/react';
import { action } from '@storybook/addon-actions';
import { ReactNode } from 'react';

import { defaultTheme } from '~/components/pages/CatalogPage/CatalogPage.theme';

import {
  vehiclesDisambiguationMock,
  vehiclesNoOeWithSizeMock,
  vehiclesNoResultWithTrimMock,
} from '../CatalogSummary/CatalogSummary.mock';
import { DataMomentMessage, NoResultsMessage } from './CatalogMessage';

export default {
  title: 'Catalog/Loading Interstitial/Message',
};

const customerServiceNumber = {
  display: '(888) 410 0604',
  value: '18884100604',
};

function CatalogMessageContainer({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
}

export function CatalogDataMomentNoOeMessage() {
  return (
    <CatalogMessageContainer>
      <DataMomentMessage
        setStage={action('set-stage')}
        showLoadingInterstitial={false}
        siteCatalogSummaryPrompt={
          vehiclesNoOeWithSizeMock.siteCatalogSummaryPrompt
        }
        openStaticModal={action('Open modal')}
      />
    </CatalogMessageContainer>
  );
}

export function CatalogDataMomentDisambiguationMessage() {
  return (
    <CatalogMessageContainer>
      <DataMomentMessage
        setStage={action('set-stage')}
        showLoadingInterstitial={false}
        siteCatalogSummaryPrompt={
          vehiclesDisambiguationMock.siteCatalogSummaryPrompt
        }
        openStaticModal={action('Open modal')}
      />
    </CatalogMessageContainer>
  );
}

export function CatalogNoResultsMessage() {
  return (
    <NoResultsMessage
      showLoadingInterstitial={false}
      customerServiceNumber={customerServiceNumber}
      onSearchBy={action('Search by click')}
      siteCatalogSummaryPrompt={
        vehiclesNoResultWithTrimMock.siteCatalogSummaryPrompt
      }
    />
  );
}
