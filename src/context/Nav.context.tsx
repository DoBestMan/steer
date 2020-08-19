import { ReactNode, useEffect, useMemo, useState } from 'react';

import { ICONS } from '~/components/global/Icon/Icon.constants';
import { NAV_THEME } from '~/components/modules/Nav/Nav.theme';
import {
  ActionType,
  LinkType,
  NAV_TARGETS,
} from '~/components/modules/Nav/Nav.types';
import { ROUTE_MAP, ROUTES } from '~/lib/constants';
import { eventEmitters } from '~/lib/events/emitters';
import { createContext } from '~/lib/utils/context';
import { getLegacyAccountURL } from '~/lib/utils/legacy-routes';
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
  isSubNavOpen: boolean;
  isVisible: boolean;
  links: Array<LinkType | ActionType>;
  linksMobile: Array<LinkType | ActionType>;
  setActiveLink: (link: string) => void;
  setNavTheme: (theme: NAV_THEME) => void;
  theme: NAV_THEME;
  toggleSubNav: () => void;
}

const NavContext = createContext<NavContextProps>();

export const dealsLink = {
  href: ROUTE_MAP[ROUTES.DEALS],
  isExternal: false,
  text: ui('links.deals'),
};
export const accountLinks = [
  {
    href: getLegacyAccountURL(),
    isExternal: true,
    text: ui('links.account'),
  },
  {
    href: ROUTE_MAP[ROUTES.ORDER_TRACKING],
    isExternal: false,
    text: ui('links.orderTracking'),
  },
];

export function buildLinks({
  locationString,
}: {
  locationString: UserPersonalizationProps['locationString'];
}) {
  return {
    links: [
      { target: NAV_TARGETS.BROWSE_TIRES, text: ui('links.browseTires') },
      dealsLink,
      { target: NAV_TARGETS.LEARN, text: ui('links.learn') },
      {
        icon: ICONS.LOCATION,
        label: ui('links.location'),
        target: NAV_TARGETS.LOCATION,
        text: locationString,
      },
      {
        icon: ICONS.ACCOUNT,
        label: ui('links.account'),
        target: NAV_TARGETS.ACCOUNT,
      },
    ],
    linksMobile: [
      {
        href: ROUTE_MAP[ROUTES.LEARN],
        isExternal: false,
        text: ui('links.learn'),
      },
      ...accountLinks,
      {
        icon: ICONS.LOCATION,
        label: ui('links.location'),
        target: NAV_TARGETS.LOCATION,
        text: locationString,
      },
    ],
  };
}

// Exported for testing only
export function useNavContextSetup(): NavContextProps {
  const [isVisible, setIsVisible] = useState(true);
  const [isSubNavOpen, setIsSubNavOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [theme, setNavTheme] = useState(NAV_THEME.DEFAULT);
  const { locationString } = useUserPersonalizationContext();
  const { links, linksMobile } = useMemo(() => buildLinks({ locationString }), [
    locationString,
  ]);

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
      setIsSubNavOpen(false);
    },
    isSubNavOpen,
    isVisible,
    links,
    linksMobile,
    setActiveLink,
    setNavTheme,
    theme,
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
