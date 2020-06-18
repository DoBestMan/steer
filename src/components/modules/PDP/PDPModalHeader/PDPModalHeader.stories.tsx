import { ICONS } from '~/components/global/Icon/Icon.constants';
import { ui } from '~/lib/utils/ui-dictionary';

import PDPModalHeader from './PDPModalHeader';

export default {
  component: PDPModalHeader,
  title: 'PDP/PDP Modal Header',
};

export function PDPModalHeaderDefault() {
  return (
    <PDPModalHeader
      copy={ui('pdp.quantitySelector.copy')}
      icon={ICONS.QUANTITY_SELECTOR_CAR_TILTED}
      title={ui('pdp.quantitySelector.title')}
      subtitle={ui('pdp.quantitySelector.subtitle')}
    />
  );
}
