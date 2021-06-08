import { SiteCompareTableCell } from '~/data/models/SiteCompareTableCell';
import { CompareTableColumnType } from '~/data/models/SiteCompareTableColumn';

import {
  BarRating,
  CellText,
  PriceWithPromotion,
  StarRating,
} from './TableCells/TableCells';

export const mapTypeToContent: Record<
  CompareTableColumnType,
  (props: SiteCompareTableCell) => JSX.Element
> = {
  text(props: SiteCompareTableCell) {
    return <CellText {...props} />;
  },
  bar(props: SiteCompareTableCell) {
    return <BarRating {...props} />;
  },
  rating(props: SiteCompareTableCell) {
    return <StarRating {...props} />;
  },
  priceWithPromotion(props: SiteCompareTableCell) {
    return <PriceWithPromotion {...props} />;
  },
};
