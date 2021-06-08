import { SiteCompareTableColumn } from './SiteCompareTableColumn';
import { SiteCompareTableRow } from './SiteCompareTableRow';

export interface SiteCompareTable {
  caption: string;
  columns: Array<SiteCompareTableColumn>;
  data: Array<SiteCompareTableRow>;
}
