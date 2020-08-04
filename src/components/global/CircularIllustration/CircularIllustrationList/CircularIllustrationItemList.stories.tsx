import { brands } from '~/components/pages/SEOPage/BrandHubPage/BrandHub.mock';

import { TitlePosition } from '../CircularIllustrationItem/CircularIllustrationItem';
import {
  CircularIllustrationItemList,
  CircularItemType,
} from './CircularIllustrationItemList';

export default {
  component: CircularIllustrationItemList,
  title: 'Global/CircularIllustration/CircularIllustrationItemList',
};

export function TypicalCircularIllustrationItemList() {
  return (
    <CircularIllustrationItemList
      dataItems={brands}
      titlePosition={TitlePosition.top}
      dataType={CircularItemType.brand}
    />
  );
}
