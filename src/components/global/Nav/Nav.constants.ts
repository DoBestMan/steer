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
