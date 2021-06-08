import { ReactNode } from 'react';

import { SiteCompareTable } from '~/data/models/SiteCompareTable';
import { CSSStyles, CSSStylesProp } from '~/lib/constants';

export interface CompareTableProps extends SiteCompareTable {
  hasScrollbar?: boolean;
  height?: number;
  removingProductIndex?: number;
  width?: number;
}

export interface BaseProps {
  children?: ReactNode;
  customStyle?: CSSStylesProp | CSSStyles;
}

export interface TableProps extends BaseProps {
  caption: string;
}
