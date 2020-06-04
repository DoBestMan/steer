import { action } from '@storybook/addon-actions';

import { brands } from '../CatalogPage.constants';
import CatalogMessage, {
  ConfirmSizeMessage,
  DataMomentMessage,
  LoadingMessage,
  NoResultsMessage,
} from './CatalogMessage';

export default {
  component: CatalogMessage,
  title: 'Catalog/Loading Interstitial/Message',
};

export function CatalogLoadingMessage() {
  const messageData = {
    brands,
  };

  return <LoadingMessage {...messageData} />;
}

export function CatalogDataMomentMessage() {
  return (
    <DataMomentMessage hasOE onContinue={action('Continue button click')} />
  );
}

export function CatalogDataMomentNoOEMessage() {
  return (
    <DataMomentMessage
      hasOE={false}
      onContinue={action('Continue button click')}
    />
  );
}

export function CatalogConfirmSizeMessage() {
  return (
    <ConfirmSizeMessage
      onHelpClick={action('Not sure button click')}
      onSizeSelect={action('Size option click')}
    />
  );
}

export function CatalogNoResultsMessage() {
  return <NoResultsMessage onSearchBy={action('Search by button click')} />;
}
