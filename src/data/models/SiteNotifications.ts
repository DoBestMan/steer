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

  startDateTime: string;

  endDateTime: string;

  suppressFromHomePage: boolean;
}
