import { Cars } from '~/components/global/Car/Car.enums';
import { Sceneries } from '~/components/global/Scenery/Scenery.types';

import { SiteImage } from './SiteImage';

export interface SiteCatalogSummaryMeta {
  sceneryType: Sceneries;
  sizeList: string[];
  tireImage: SiteImage;
  totalResults: number;
  vehicleType: Cars;
}
