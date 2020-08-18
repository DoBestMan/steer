import { SiteCar } from './SiteCar';
import { SiteIcon } from './SiteIcon';
import { SiteImage } from './SiteImage';
import { SiteLink } from './SiteLink';

export interface SiteGraphicTile {
  image?: SiteImage | SiteIcon | SiteCar;
  title: string;
  byline?: string;
  highlight?: string;
  link: SiteLink;
}
