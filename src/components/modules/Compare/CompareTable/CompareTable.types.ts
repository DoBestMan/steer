import { ReactNode } from 'react';

import { SiteCompareTable } from '~/data/models/SiteCompareTable';
import { CSSStyles, CSSStylesProp } from '~/lib/constants';

export interface CompareTableProps extends SiteCompareTable {
  customRootStyle?: CSSStylesProp;
  hasAddTire?: boolean;
  hasScrollbar?: boolean;
  headerStyle?: CSSStylesProp | CSSStyles;
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

export interface ColumnHeaderProps {
  description?: string;
  hasScrollbar: boolean;
  headerStyle?: CSSStylesProp | CSSStyles;
  label: string;
}
