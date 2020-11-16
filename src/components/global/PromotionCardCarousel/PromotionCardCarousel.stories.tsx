import { SearchContextProvider } from '~/components/modules/Search/Search.context';
import { SearchModalContextProvider } from '~/components/modules/Search/SearchModal.context';

import PromotionCardCarousel from './PromotionCardCarousel';
import { mockDataCards } from './PromotionCardCarousel.mock';

export default {
  component: PromotionCardCarousel,
  title: 'Global/Promotion Card Carousel',
};

export function PromotionCardCarouselDefault() {
  return (
    <div css={{ paddingTop: '20px' }}>
      <SearchContextProvider>
        <SearchModalContextProvider>
          <PromotionCardCarousel cards={mockDataCards} />
        </SearchModalContextProvider>
      </SearchContextProvider>
    </div>
  );
}
