import SubNav from '~/components/modules/SubNav/SubNav';
import { NavContextProvider } from '~/context/Nav.context';
import { useSiteMenuContext } from '~/context/SiteMenu.context';

import Nav from './Nav';

interface Props {
  isHomepage?: boolean;
}

function NavContainer({ isHomepage = false }: Props) {
  const siteMenu = useSiteMenuContext();
  return (
    <NavContextProvider>
      <Nav isHomepage={isHomepage} />
      <SubNav {...siteMenu} />
    </NavContextProvider>
  );
}

export default NavContainer;
