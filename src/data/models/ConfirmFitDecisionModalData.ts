import { Icon as IconName } from '~/components/global/Icon/Icon.types';

import { SiteLink } from './SiteLink';

export interface ConfirmFitDecisionModalData {
  icon: IconName;
  header: string;
  title: string;
  subTitle: string;
  labelLink: {
    label: string;
    link: SiteLink;
  };
}
