import { action } from '@storybook/addon-actions';

import { brands } from '../CatalogPage.constants';
import {
  BuildInMessage,
  DataMomentMessage,
  NoResultsMessage,
} from './CatalogMessage';

export default {
  title: 'Catalog/Loading Interstitial/Message',
};

export function CatalogLoadingMessage() {
  return <BuildInMessage brands={brands} hasMultipleTireSizes={false} />;
}

export function CatalogLoadingConfirmSizeMessage() {
  return <BuildInMessage brands={brands} hasMultipleTireSizes />;
}

export function CatalogDataMomentMessage() {
  return (
    <DataMomentMessage
      hasMultipleTireSizes={false}
      hasOE
      setStage={action('Go to top picks')}
    />
  );
}

export function CatalogDataMomentNoOEMessage() {
  return (
    <DataMomentMessage
      hasMultipleTireSizes={false}
      hasOE={false}
      setStage={action('Go to top picks')}
    />
  );
}

export function CatalogConfirmSizeMessage() {
  return (
    <DataMomentMessage
      hasMultipleTireSizes
      onHelpClick={action('Not sure button click')}
      onSizeSelect={action('Size option click')}
      setStage={action('Go to top picks')}
    />
  );
}

export function CatalogNoResultsMessage() {
  return <NoResultsMessage onSearchBy={action('Search by button click')} />;
}
