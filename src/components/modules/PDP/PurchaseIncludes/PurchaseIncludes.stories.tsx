import { action } from '@storybook/addon-actions';

import PurchaseIncludes from './PurchaseIncludes';

export default {
  component: PurchaseIncludes,
  title: 'PDP/Purchase Includes',
};

export function PurchaseIncludesCarousel() {
  return <PurchaseIncludes openStaticModal={action('openStaticModal')} />;
}
