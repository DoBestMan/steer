import { useEffect, useState } from 'react';

import Carousel from '~/components/global/Carousel/Carousel';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import PromotionCard, {
  PromotionCardProps,
} from '~/components/global/PromotionCard/PromotionCard';
import { useSearchContext } from '~/components/modules/Search/Search.context';
import { useSearchModalContext } from '~/components/modules/Search/SearchModal.context';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { ROUTE_MAP, ROUTES } from '~/lib/constants';
import { openReferAFriendModal } from '~/lib/helpers/refer-a-friend';

import {
  CAROUSEL_CLASS_NAMES,
  CAROUSEL_PARAM_BREAKPOINT,
} from './ProductCardCarousel.constants';
import styles from './PromotionCardCarousel.styles';

export interface ProductCardCarouselProps {
  cards: PromotionCardProps[];
}

function ProductCardCarousel({ cards }: ProductCardCarouselProps) {
  const { setRouteQueryParamOptions } = useSearchContext();
  const { setIsSearchOpen } = useSearchModalContext();
  const { greaterThan } = useBreakpoints();
  const [isDynamicPagination, setIsDynamicPagination] = useState(greaterThan.M);
  const carouselParams = {
    activeSlideKey: '0',
    breakpoints: {
      [CAROUSEL_PARAM_BREAKPOINT.S]: {
        centeredSlides: true,
      },
      [CAROUSEL_PARAM_BREAKPOINT.M]: {
        centeredSlides: false,
      },
      [CAROUSEL_PARAM_BREAKPOINT.L]: {
        grabCursor: false,
        noSwiping: true,
      },
    },
    navigation: {
      nextEl: `.${CAROUSEL_CLASS_NAMES.NEXT_BUTTON}`,
      prevEl: `.${CAROUSEL_CLASS_NAMES.PREV_BUTTON}`,
    },
    noSwiping: false,
    noSwipingClass: CAROUSEL_CLASS_NAMES.SWIPER_CONTAINER,
    pagination: {
      el: `.${CAROUSEL_CLASS_NAMES.PAGINATION_CONTAINER}`,
      clickable: true,
      dynamicBullets: isDynamicPagination,
    },
    renderNextButton: function NextButton() {
      return (
        <div className={`${CAROUSEL_CLASS_NAMES.NEXT_BUTTON}`}>
          <Icon name={ICONS.CHEVRON_RIGHT} />
        </div>
      );
    },
    renderPrevButton: function PrevButton() {
      return (
        <div className={`${CAROUSEL_CLASS_NAMES.PREV_BUTTON}`}>
          <Icon name={ICONS.CHEVRON_LEFT} />
        </div>
      );
    },
    spaceBetween: 20,
    updateOnWindowResize: true,
  };

  function handlePromotionClick(params: Record<string, string>) {
    setRouteQueryParamOptions({
      routes: [
        ROUTE_MAP[ROUTES.VEHICLE_CATALOG],
        ROUTE_MAP[ROUTES.TIRE_SIZE_CATALOG_OR_CATEGORY],
      ],
      params,
    });
    setIsSearchOpen(true);
  }

  useEffect(() => {
    setIsDynamicPagination(greaterThan.M);
  }, [greaterThan.M]);

  return (
    <div css={styles.container} data-component="promotion-card-carousel">
      <Carousel
        params={carouselParams}
        rebuildOnUpdate
        shortSwipes
        shouldSwiperUpdate
        wrapperClass={CAROUSEL_CLASS_NAMES.WRAPPER_CONTAINER}
      >
        {cards.map((card, index) => (
          <div css={styles.item} key={`promotion_card__${index}`}>
            <PromotionCard
              {...card}
              handleReferAFriendClick={openReferAFriendModal}
              handlePromotionClick={handlePromotionClick}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default ProductCardCarousel;
