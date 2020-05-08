import { ICONS } from '~/components/global/Icon/Icon.constants';
import { Icon as IconType } from '~/components/global/Icon/Icon.types';

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
    { target: NAV_TARGETS.BROWSE_TIRES, text: 'Browse tires' },
    { target: NAV_TARGETS.LEARN, text: 'Learn' },
    { href: '/', isExternal: true, text: 'Find a Shop' },
    {
      href: '/',
      icon: ICONS.LOCATION,
      isExternal: false,
      label: 'Select location',
      text: 'Brooklyn, NY',
    },
    { href: '/', icon: ICONS.ACCOUNT, isExternal: true, label: 'Account' },
  ],
  mobileLinks: [
    { href: '/', isExternal: false, text: 'Learn' },
    { href: '/', isExternal: true, text: 'Find a Shop' },
    { href: '/', isExternal: true, text: 'Track your order' },
    {
      href: '/',
      icon: ICONS.LOCATION,
      isExternal: false,
      label: 'Select location',
      text: 'Brooklyn, NY',
    },
  ],
};
