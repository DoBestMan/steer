import { action } from '@storybook/addon-actions';
import { ThemeProvider } from 'emotion-theming';
import { ReactNode } from 'react';

import { defaultTheme } from '~/components/pages/CatalogPage/CatalogPage.theme';

import {
  vehiclesDisambiguation,
  vehiclesNoOeWithSize,
  vehiclesNoResultWithTrim,
} from '../CatalogSummary/CatalogSummary.mocks';
import {
  BuildInMessage,
  DataMomentMessage,
  NoResultsMessage,
} from './CatalogMessage';

export default {
  title: 'Catalog/Loading Interstitial/Message',
};

function CatalogMessageContainer({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
}

export function CatalogBuildInNoOeMessage() {
  return (
    <BuildInMessage
      siteCatalogSummaryBuildIn={vehiclesNoOeWithSize.siteCatalogSummaryBuildIn}
    />
  );
}

export function CatalogBuildInDisambiguationMessage() {
  return (
    <BuildInMessage
      siteCatalogSummaryBuildIn={
        vehiclesDisambiguation.siteCatalogSummaryBuildIn
      }
    />
  );
}

export function CatalogDataMomentNoOeMessage() {
  return (
    <CatalogMessageContainer>
      <DataMomentMessage
        siteCatalogSummaryPrompt={vehiclesNoOeWithSize.siteCatalogSummaryPrompt}
      />
    </CatalogMessageContainer>
  );
}

export function CatalogDataMomentDisambiguationMessage() {
  return (
    <CatalogMessageContainer>
      <DataMomentMessage
        siteCatalogSummaryPrompt={
          vehiclesDisambiguation.siteCatalogSummaryPrompt
        }
      />
    </CatalogMessageContainer>
  );
}

export function CatalogNoResultsMessage() {
  return (
    <NoResultsMessage
      onSearchBy={action('Search by click')}
      siteCatalogSummaryPrompt={
        vehiclesNoResultWithTrim.siteCatalogSummaryPrompt
      }
    />
  );
}
