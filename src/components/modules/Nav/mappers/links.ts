import { ICONS } from '~/components/global/Icon/Icon.constants';
import {
  ActionType,
  LinkType,
  NAV_TARGETS,
} from '~/components/modules/Nav/Nav.types';
import { UserPersonalizationProps } from '~/context/UserPersonalization.context';
import { ROUTE_MAP, ROUTES } from '~/lib/constants';
import { getLegacyAccountURL } from '~/lib/utils/legacy-routes';
import { ui } from '~/lib/utils/ui-dictionary';

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
}): {
  links: Array<LinkType | ActionType>;
  linksMobile: Array<LinkType | ActionType>;
} {
  return {
    links: [
      { target: NAV_TARGETS.BROWSE_TIRES, text: ui('links.browseTires') },
      dealsLink,
      { target: NAV_TARGETS.LEARN, text: ui('links.learn') },
      {
        icon: ICONS.LOCATION,
        label: ui('links.location'),
        target: NAV_TARGETS.LOCATION,
        testId: 'nav-location-button',
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
