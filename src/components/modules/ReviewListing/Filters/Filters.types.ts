import { SiteLink } from '~/data/models/SiteLink';

export interface FilterGroupItem {
  count?: number;
  description: string | null;
  flair: string | null;
  isSelected: boolean;
  link: SiteLink;
  title: string;
}

export interface FilterGroup {
  items: FilterGroupItem[];
  title?: string | null;
}

export interface FilterItem {
  filterGroups: FilterGroup[];
  id: string;
  isActive?: boolean;
  label: string;
}
