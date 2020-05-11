import SubNav from '~/components/modules/SubNav/SubNav';
import subnav from '~/components/modules/SubNav/SubNav.mocks';
import { NavContextProvider } from '~/context/Nav.context';
import { UserPersonalizationProps } from '~/context/UserPersonalization.context';

import Nav from './Nav';

interface Props extends UserPersonalizationProps {
  isCustomerServiceEnabled?: boolean;
  isHomepage?: boolean;
}

function NavContainer({
  isCustomerServiceEnabled = false,
  isHomepage = false,
  locationString,
  updateLocation,
  userPersonalizationData,
}: Props) {
  return (
    <NavContextProvider
      locationString={locationString}
      updateLocation={updateLocation}
      userPersonalizationData={userPersonalizationData}
    >
      <Nav isHomepage={isHomepage} />
      <SubNav isCustomerServiceEnabled={isCustomerServiceEnabled} {...subnav} />
    </NavContextProvider>
  );
}

export default NavContainer;
