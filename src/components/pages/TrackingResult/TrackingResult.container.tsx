import { useSiteGlobalsContext } from '~/context/SiteGlobals.context';

import TrackingResult from './TrackingResult';
import { MOCK_ORDER } from './TrackingResult.mocks';

function TrackingResultContainer() {
  const {
    customerServiceEnabled,
    customerServiceNumber,
  } = useSiteGlobalsContext();

  return (
    <TrackingResult
      {...MOCK_ORDER}
      isCustomerServiceEnabled={customerServiceEnabled}
      customerServiceNumber={customerServiceNumber}
    />
  );
}

export default TrackingResultContainer;
