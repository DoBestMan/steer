import { ReactNode, useMemo, useState } from 'react';

import { ICONS } from '~/components/global/Icon/Icon.constants';
import {
  ActionType,
  LinkType,
  NAV_TARGETS,
} from '~/components/modules/Nav/Nav.types';
import { createContext } from '~/lib/utils/context';

import {
  UserPersonalizationProps,
  useUserPersonalizationContext,
} from './UserPersonalization.context';

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
  links: Array<LinkType | ActionType>;
  linksMobile: Array<LinkType | ActionType>;
  toggleSubNav: () => void;
}

const NavContext = createContext<NavContextProps>();

function buildLinks({
  locationString,
}: {
  locationString: UserPersonalizationProps['locationString'];
}) {
  return {
    links: [
      { target: NAV_TARGETS.BROWSE_TIRES, text: 'Browse tires' },
      { target: NAV_TARGETS.LEARN, text: 'Learn' },
      { href: '/', isExternal: true, text: 'Find a Shop' },
      {
        icon: ICONS.LOCATION,
        label: 'Select location',
        target: NAV_TARGETS.LOCATION,
        text: locationString,
      },
      { href: '/', icon: ICONS.ACCOUNT, isExternal: true, label: 'Account' },
    ],
    linksMobile: [
      { target: NAV_TARGETS.LEARN, text: 'Learn' },
      { href: '/', isExternal: true, text: 'Find a Shop' },
      { href: '/', isExternal: true, text: 'Track your order' },
      {
        icon: ICONS.LOCATION,
        label: 'Select location',
        target: NAV_TARGETS.LOCATION,
        text: locationString,
      },
    ],
  };
}

// Exported for testing only
export function useNavContextSetup() {
  const [isSubNavOpen, setIsSubNavOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const { locationString } = useUserPersonalizationContext();
  const { links, linksMobile } = useMemo(() => buildLinks({ locationString }), [
    locationString,
  ]);

  return {
    activeCategory,
    activeLink,
    createSelectCategoryHandler: (category: string) => () => {
      if (!activeLink) {
        setActiveLink(NAV_TARGETS.BROWSE_TIRES);
      }
      setActiveCategory(category);
    },
    createSelectLinkHandler: (link: LinkType | ActionType) =>
      'target' in link
        ? () => {
            setIsSubNavOpen(true);
            setActiveLink(link.target);
          }
        : undefined,
    handleClearCategory: () => {
      setActiveCategory('');
      setActiveLink('');
    },
    handleClearLink: () => {
      setActiveLink('');
    },
    handleCloseSubNav: () => {
      setActiveLink('');
      setActiveCategory('');
      setIsSubNavOpen(false);
    },
    isSubNavOpen,
    links,
    linksMobile,
    toggleSubNav: () => {
      setIsSubNavOpen(!isSubNavOpen);
    },
  };
}

export function NavContextProvider({ children }: { children: ReactNode }) {
  const value = useNavContextSetup();
  return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
}

export const useNavContext = NavContext.useContext;
