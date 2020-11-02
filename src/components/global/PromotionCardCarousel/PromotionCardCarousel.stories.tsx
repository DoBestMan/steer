import PromotionCardCarousel from './PromotionCardCarousel';
import { mockDataCards } from './PromotionCardCarousel.mock';

export default {
  component: PromotionCardCarousel,
  title: 'Global/Promotion Card Carousel',
};

export function PromotionCardCarouselDefault() {
  return (
    <div css={{ paddingTop: '20px' }}>
      <PromotionCardCarousel cards={mockDataCards} />
    </div>
  );
}
