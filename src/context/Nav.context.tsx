import { ReactNode, useState } from 'react';

import { NAV_TARGETS } from '~/components/global/Nav/Nav.data';
import { createContext } from '~/lib/utils/context';

interface NavContextProps {
  activeCategory: string;
  activeLink: string;
  createSelectCategoryHandler: (category: string) => () => void;
  createSelectLinkHandler: (link: string) => () => void;
  handleClearCategory: () => void;
  handleClearLink: () => void;
  handleCloseSubNav: () => void;
  isSubNavOpen: boolean;
  toggleSubNav: () => void;
}

const NavContext = createContext<NavContextProps>();

// Exported for testing only
export function useContextSetup() {
  const [isSubNavOpen, setIsSubNavOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  return {
    activeCategory,
    activeLink,
    createSelectCategoryHandler: (category: string) => () => {
      setActiveCategory(category);
    },
    createSelectLinkHandler: (link: string) => () => {
      setIsSubNavOpen(true);
      setActiveLink(link);
    },
    handleClearCategory: () => {
      setActiveCategory('');
    },
    handleClearLink: () => {
      setActiveLink(NAV_TARGETS.BROWSE_TIRES);
    },
    handleCloseSubNav: () => {
      setActiveLink('');
      setActiveCategory('');
      setIsSubNavOpen(false);
    },
    isSubNavOpen,
    toggleSubNav: () => {
      setIsSubNavOpen(!isSubNavOpen);
      setActiveLink(NAV_TARGETS.BROWSE_TIRES);
    },
  };
}

export function NavContextProvider({ children }: { children: ReactNode }) {
  const value = useContextSetup();
  return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
}

export const useNavContext = NavContext.useContext;
