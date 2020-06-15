import { SiteIcon } from '~/data/models/SiteIcon';
import { SiteImage } from '~/data/models/SiteImage';
import { SiteImageExtended } from '~/data/models/SiteImageExtended';

export type IconOrImage = (SiteIcon | SiteImage) & SiteImageExtended;
