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
  BROWSE_TIRES = 'BROWSE TIRES',
  LEARN = 'LEARN',
  LOCATION = 'LOCATION',
}

export const data: { [key: string]: Array<LinkType | ActionType> } = {
  links: [
    { target: NAV_TARGETS.BROWSE_TIRES, text: 'Browse tires' },
    { target: NAV_TARGETS.LEARN, text: 'Learn' },
    { href: '/', isExternal: true, text: 'Find a Shop' },
    {
      icon: ICONS.LOCATION,
      label: 'Select location',
      target: NAV_TARGETS.LOCATION,
      text: 'Brooklyn, NY',
    },
    { href: '/', icon: ICONS.ACCOUNT, isExternal: true, label: 'Account' },
  ],
  mobileLinks: [
    { href: '/', isExternal: false, text: 'Learn' },
    { href: '/', isExternal: true, text: 'Find a Shop' },
    { href: '/', isExternal: true, text: 'Track your order' },
    {
      icon: ICONS.LOCATION,
      label: 'Select location',
      target: NAV_TARGETS.LOCATION,
      text: 'Brooklyn, NY',
    },
  ],
};
