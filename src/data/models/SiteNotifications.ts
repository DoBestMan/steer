import { SiteIcon } from './SiteIcon';
import { SiteLink } from './SiteLink';

/**
 * SiteNotifications
 */
export interface SiteNotifications {
  id: string;

  type: string;

  title: string;

  subtext: string;

  icon: SiteIcon;

  labelLink?: {
    label: string;
    link: SiteLink;
  };
  sessionExpiryTime?: number;

  suppressFromHomePage: boolean;
  handleNotificationClick: () => void;
}
