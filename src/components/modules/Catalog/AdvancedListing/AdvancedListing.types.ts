import { SiteIcon } from '~/data/models/SiteIcon';

import { ProductListingProps } from '../ProductListing/ProductListing.types';

export interface AdvancedListingProps extends ProductListingProps {
  dataMomentList: {
    icon: SiteIcon;
    label: string;
  }[];
  highlight?: string;
  performanceRatingList: {
    label: string;
    value: number;
  }[];
  size: string;
  specList: {
    concise: string;
    label: string;
    value: string;
  }[];
}
