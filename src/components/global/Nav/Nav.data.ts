import { ICONS } from '~/components/global/Icon/Icon.constants';
import { Icon as IconType } from '~/components/global/Icon/Icon.types';
import { ui } from '~/lib/utils/ui-dictionary';

export interface LinkType {
  href: string;
  icon?: IconType;
  isExternal: boolean;
  label?: string;
  text?: string;
}

export interface ActionType {
  icon?: IconType;
  target: NAV_TARGETS;
  text?: string;
}

export enum NAV_TARGETS {
  BROWSE_TIRES = 'Browse tires',
  LEARN = 'Learn',
}

export const data: { [key: string]: Array<LinkType | ActionType> } = {
  links: [
    { target: NAV_TARGETS.BROWSE_TIRES, text: ui('nav.links.browseTires') },
    { target: NAV_TARGETS.LEARN, text: ui('nav.links.learn') },
    { href: '/', isExternal: true, text: ui('nav.links.findShop') },
    {
      href: '/',
      icon: ICONS.LOCATION,
      isExternal: false,
      label: ui('nav.links.location'),
      text: 'Brooklyn, NY',
    },
    { href: '/', icon: ICONS.ACCOUNT, isExternal: true, label: 'Account' },
  ],
  mobileLinks: [
    { href: '/', isExternal: false, text: ui('nav.links.learn') },
    { href: '/', isExternal: true, text: ui('nav.links.findShop') },
    { href: '/', isExternal: true, text: ui('nav.links.trackOrder') },
    {
      href: '/',
      icon: ICONS.LOCATION,
      isExternal: false,
      label: ui('nav.links.location'),
      text: 'Brooklyn, NY',
    },
  ],
};
