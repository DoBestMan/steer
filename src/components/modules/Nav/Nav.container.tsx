import SubNav from '~/components/modules/SubNav/SubNav';
import subnav from '~/components/modules/SubNav/SubNav.mocks';
import { NavContextProvider } from '~/context/Nav.context';

import Nav from './Nav';

interface Props {
  isCustomerServiceEnabled?: boolean;
  isHomepage?: boolean;
}

function NavContainer({
  isCustomerServiceEnabled = false,
  isHomepage = false,
}: Props) {
  return (
    <NavContextProvider>
      <Nav isHomepage={isHomepage} />
      <SubNav isCustomerServiceEnabled={isCustomerServiceEnabled} {...subnav} />
    </NavContextProvider>
  );
}

export default NavContainer;
