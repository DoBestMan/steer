import { useSiteGlobalsContext } from '~/context/SiteGlobals.context';

import AdditionalInfoModal, {
  AdditionalInfoModalContainerProps,
} from './AdditionalInfoModal';

function TireSizeModalContainer(props: AdditionalInfoModalContainerProps) {
  const { customerServiceEnabled } = useSiteGlobalsContext();
  return (
    <AdditionalInfoModal
      isCustomerServiceEnabled={customerServiceEnabled}
      {...props}
    />
  );
}

export default TireSizeModalContainer;
