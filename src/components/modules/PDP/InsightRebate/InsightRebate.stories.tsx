import { ICONS } from '~/components/global/Icon/Icon.constants';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';

import InsightRebate from './InsightRebate';

export default {
  component: InsightRebate,
  title: 'PDP/InsightRebate',
};

// Auto dismiss off is just for testing purposes
// There should be no actual use cases with auto dismiss disabled
export function InsightRebateItem() {
  return (
    <InsightRebate
      couponCode="J34FT2"
      icon={{
        svgId: ICONS.REBATE,
        type: ICON_IMAGE_TYPE.ICON,
      }}
      label="Instant rebate."
    />
  );
}
