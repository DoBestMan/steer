import { useNavContext } from '~/context/Nav.context';
import { useUserPersonalizationContext } from '~/context/UserPersonalization.context';
import { ui } from '~/lib/utils/ui-dictionary';

import { NAV_TARGETS } from '../Nav/Nav.types';
import SubNavContentWrapper from '../SubNav/SubNavContentWrapper';
import Location from './Location';

interface Props {
  isMobile: boolean;
}

function LocationContainer({ isMobile }: Props) {
  const {
    updateLocation,
    userPersonalizationData,
  } = useUserPersonalizationContext();
  const { activeLink, handleClearLink, handleCloseSubNav } = useNavContext();
  const isOpen = activeLink === NAV_TARGETS.LOCATION;

  return (
    <SubNavContentWrapper
      isMobile={isMobile}
      isOpen={isOpen}
      onClose={handleCloseSubNav}
      onBack={handleClearLink}
      contentLabel={ui('location.contentLabel')}
    >
      {isOpen && (
        <Location
          currentLocation={userPersonalizationData?.userLocation ?? null}
          onLocationChangeSuccess={updateLocation}
          focusInputOnMount
        />
      )}
    </SubNavContentWrapper>
  );
}

export default LocationContainer;
