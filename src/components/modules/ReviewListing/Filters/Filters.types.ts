import { SiteLink } from '~/data/models/SiteLink';

interface FilterGroupItem {
  count: number;
  description: string | null;
  flair: string | null;
  id: string;
  isSelected: boolean;
  link: SiteLink;
  title: string;
}

export interface FilterGroup {
  id: string;
  items: FilterGroupItem[];
  title: string | null;
}

export interface FilterItem {
  filterGroups: FilterGroup[];
  label: string;
}
