import { boolean } from '@storybook/addon-knobs';

import CatalogHeader from './CatalogLoading';

export default {
  component: CatalogHeader,
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
  title: 'Catalog/Loading Interstitial/Intro',
};

export function HeaderWithKnobs() {
  const headerData = {
    isSearching: boolean('Toggle', false),
  };

  return <CatalogHeader {...headerData} />;
}
