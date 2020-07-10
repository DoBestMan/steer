import GridItem from '~/components/global/Grid/GridItem';
import Modal from '~/components/global/Modal/Modal';
import Location from '~/components/modules/Location/Location';
import { useUserPersonalizationContext } from '~/context/UserPersonalization.context';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './LocationModal.styles';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function LocationModal({ isOpen, onClose }: Props) {
  const {
    updateLocation,
    userPersonalizationData,
  } = useUserPersonalizationContext();
  return (
    <Modal
      contentLabel={ui('location.contentLabel')}
      isHalfscreen
      hasCloseButton
      onClose={onClose}
      isOpen={isOpen}
    >
      <GridItem isGrid css={styles.container}>
        <Location
          currentLocation={userPersonalizationData?.userLocation ?? null}
          onLocationChangeSuccess={updateLocation}
          focusInputOnMount
        />
      </GridItem>
    </Modal>
  );
}

export default LocationModal;
