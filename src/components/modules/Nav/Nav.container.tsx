import SubNav from '~/components/modules/SubNav/SubNav';
import { NavContextProvider } from '~/context/Nav.context';
import { useSiteMenuContext } from '~/context/SiteMenu.context';

import Nav from './Nav';

interface Props {
  isCustomerServiceEnabled?: boolean;
  isHomepage?: boolean;
}

function NavContainer({
  isCustomerServiceEnabled = false,
  isHomepage = false,
}: Props) {
  const siteMenu = useSiteMenuContext();
  return (
    <NavContextProvider>
      <Nav isHomepage={isHomepage} />
      <SubNav
        isCustomerServiceEnabled={isCustomerServiceEnabled}
        {...siteMenu}
      />
    </NavContextProvider>
  );
}

export default NavContainer;
