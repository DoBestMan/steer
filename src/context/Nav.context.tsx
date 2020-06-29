import { ReactNode, useMemo, useState } from 'react';

import { ICONS } from '~/components/global/Icon/Icon.constants';
import {
  ActionType,
  LinkType,
  NAV_TARGETS,
} from '~/components/modules/Nav/Nav.types';
import { createContext } from '~/lib/utils/context';
import { ui } from '~/lib/utils/ui-dictionary';

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
  isHidden: boolean;
  isSubNavOpen: boolean;
  links: Array<LinkType | ActionType>;
  linksMobile: Array<LinkType | ActionType>;
  setIsHidden: (isHidden: boolean) => void;
  toggleSubNav: () => void;
}

const NavContext = createContext<NavContextProps>();

export const cartLink = {
  href: '/',
  icon: ICONS.VEHICLE_CART,
  isExternal: false,
};
export const dealsLink = {
  href: '/',
  isExternal: false,
  text: ui('nav.links.deals'),
};
export const accountLinks = [
  { href: '/', isExternal: true, text: ui('nav.links.account') },
  { href: '/', isExternal: true, text: ui('nav.links.trackOrder') },
];

function buildLinks({
  locationString,
}: {
  locationString: UserPersonalizationProps['locationString'];
}) {
  return {
    links: [
      { target: NAV_TARGETS.BROWSE_TIRES, text: ui('nav.links.browseTires') },
      dealsLink,
      { target: NAV_TARGETS.LEARN, text: ui('nav.links.learn') },
      {
        icon: ICONS.LOCATION,
        label: ui('nav.links.location'),
        target: NAV_TARGETS.LOCATION,
        text: locationString,
      },
      {
        icon: ICONS.ACCOUNT,
        label: ui('nav.links.account'),
        target: NAV_TARGETS.ACCOUNT,
      },
    ],
    linksMobile: [
      { target: NAV_TARGETS.LEARN, text: ui('nav.links.learn') },
      ...accountLinks,
      {
        icon: ICONS.LOCATION,
        label: ui('nav.links.location'),
        target: NAV_TARGETS.LOCATION,
        text: locationString,
      },
    ],
  };
}

// Exported for testing only
export function useNavContextSetup() {
  const [isHidden, setIsHidden] = useState(false);
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
    isHidden,
    isSubNavOpen,
    links,
    linksMobile,
    setIsHidden,
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
