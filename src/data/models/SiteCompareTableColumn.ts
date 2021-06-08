export type CompareTableColumnType =
  | 'text'
  | 'rating'
  | 'bar'
  | 'priceWithPromotion';

export interface SiteCompareTableColumn {
  description?: string;
  label: string;
  type: CompareTableColumnType;
}
