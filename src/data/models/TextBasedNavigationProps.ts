import { SiteLink } from '~/data/models/SiteLink';

export interface TextBasedNavigationListItem {
  type?: string;
  label: string;
  link: SiteLink;
}

export interface TextBasedNavigationProps {
  links: Array<TextBasedNavigationListItem>;
  moreLink?: TextBasedNavigationListItem;
}
