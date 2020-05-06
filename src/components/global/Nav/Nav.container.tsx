import React, { createContext, useContext } from 'react';

import SubNav from '~/components/modules/SubNav/SubNav';
import subnav from '~/components/modules/SubNav/SubNav.mocks';
import useNav from '~/hooks/useNav';

import Nav from './Nav';

export const NavContext = createContext({
  activeCategory: '',
  activeLink: '',
  createSelectCategoryHandler: (_: string) => () => {},
  createSelectLinkHandler: (_: string) => () => {},
  handleClearCategory: () => {},
  handleClearLink: () => {},
  handleCloseSubNav: () => {},
  isSubNavOpen: false,
  toggleSubNav: () => {},
});

function ConnectedNav({ isHomepage = false }: { isHomepage?: boolean }) {
  const navState = useNav();
  return (
    <NavContext.Provider value={navState}>
      <Nav isHomepage={isHomepage} />
      {navState.isSubNavOpen && <SubNav {...subnav} />}
    </NavContext.Provider>
  );
}

export const useNavState = () => useContext(NavContext);

export default ConnectedNav;
