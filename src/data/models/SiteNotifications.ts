import { THEME } from '~/lib/constants';

import { SiteIcon } from './SiteIcon';
import { SiteLink } from './SiteLink';

/**
 * SiteNotifications
 */
export interface SiteNotifications {
  id: string;

  type: string;

  title: string;

  theme?: THEME.DARK | THEME.ORANGE | THEME.LIGHT;

  subtext: string;

  icon: SiteIcon;

  labelLink?: {
    label: string;
    link: SiteLink;
  };
  sessionExpiryTime?: number;

  suppressFromHomePage: boolean;
  handleNotificationClick?: () => void;
}
