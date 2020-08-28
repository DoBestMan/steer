import { ReactNode, useCallback, useEffect, useState } from 'react';

import { NAV_THEME } from '~/components/modules/Nav/Nav.theme';
import {
  ActionType,
  LinkType,
  NAV_TARGETS,
} from '~/components/modules/Nav/Nav.types';
import { eventEmitters } from '~/lib/events/emitters';
import { createContext } from '~/lib/utils/context';

export interface NavContextProps {
  activeCategory: string;
  activeLink: string;
  createSelectCategoryHandler: (category: string) => () => void;
  createSelectLinkHandler: (
    link: LinkType | ActionType,
  ) => (() => void) | undefined;
  handleClearCategory: () => void;
  handleClearLink: () => void;
  handleCloseSubNav: () => void;
  isSubNavOpen: boolean;
  isVisible: boolean;
  setNavTheme: (theme: NAV_THEME) => void;
  theme: NAV_THEME;
  toggleSubNav: () => void;
}

const NavContext = createContext<NavContextProps>();

// Exported for testing only
export function useNavContextSetup(): NavContextProps {
  const [isVisible, setIsVisible] = useState(true);
  const [isSubNavOpen, setIsSubNavOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [theme, setTheme] = useState(NAV_THEME.DEFAULT);

  useEffect(() => {
    const handleNavVisibilityChange = ({
      isVisible,
    }: {
      isVisible: boolean;
    }) => {
      setIsVisible(isVisible);
    };

    eventEmitters.setNavVisibility.on(handleNavVisibilityChange);

    return () => {
      eventEmitters.setNavVisibility.off(handleNavVisibilityChange);
    };
  });

  return {
    activeCategory,
    activeLink,
    createSelectCategoryHandler: useCallback(
      (category: string) => () => {
        if (!activeLink) {
          setActiveLink(NAV_TARGETS.BROWSE_TIRES);
        }
        setActiveCategory(category);
      },
      [activeLink],
    ),
    createSelectLinkHandler: useCallback(
      (link: LinkType | ActionType) =>
        'target' in link
          ? () => {
              setIsSubNavOpen(true);
              setActiveLink(link.target);
            }
          : undefined,
      [],
    ),
    handleClearCategory: useCallback(() => {
      activeCategory !== '' && setActiveCategory('');
      activeLink !== '' && setActiveLink('');
    }, [activeLink, activeCategory]),
    handleClearLink: useCallback(() => {
      activeLink !== '' && setActiveLink('');
    }, [activeLink]),
    handleCloseSubNav: useCallback(() => {
      setIsSubNavOpen(false);
    }, []),
    isSubNavOpen,
    isVisible,
    setNavTheme: useCallback(
      (t: NAV_THEME) => {
        theme !== t && setTheme(t);
      },
      [theme],
    ),
    theme,
    toggleSubNav: useCallback(() => {
      setIsSubNavOpen(!isSubNavOpen);
    }, [isSubNavOpen]),
  };
}

export function NavContextProvider({ children }: { children: ReactNode }) {
  const value = useNavContextSetup();
  return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
}

export const useNavContext = NavContext.useContext;
