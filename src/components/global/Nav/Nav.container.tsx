import SubNav from '~/components/modules/SubNav/SubNav';
import subnav from '~/components/modules/SubNav/SubNav.mocks';
import { NavContextProvider } from '~/context/Nav.context';
import { UserPersonalizationProps } from '~/context/UserPersonalization.context';

import Nav from './Nav';

interface Props {
  isCustomerServiceEnabled?: boolean;
  isHomepage?: boolean;
  locationString: UserPersonalizationProps['locationString'];
}

function ConnectedNav({
  isCustomerServiceEnabled = false,
  isHomepage = false,
  locationString,
}: Props) {
  return (
    <NavContextProvider locationString={locationString}>
      <Nav isHomepage={isHomepage} />
      <SubNav isCustomerServiceEnabled={isCustomerServiceEnabled} {...subnav} />
    </NavContextProvider>
  );
}

export default ConnectedNav;
