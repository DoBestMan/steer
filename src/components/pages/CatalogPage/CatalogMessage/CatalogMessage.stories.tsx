import { action } from '@storybook/addon-actions';

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
    <DataMomentMessage
      siteCatalogSummaryPrompt={vehiclesNoOeWithSize.siteCatalogSummaryPrompt}
    />
  );
}

export function CatalogDataMomentDisambiguationMessage() {
  return (
    <DataMomentMessage
      siteCatalogSummaryPrompt={vehiclesDisambiguation.siteCatalogSummaryPrompt}
    />
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
