import { useEffect, useState } from 'react';
import Swiper, {
  ReactIdSwiperChildren,
  ReactIdSwiperProps,
  SwiperInstance,
} from 'react-id-swiper';

export interface Props extends ReactIdSwiperProps {
  activeSlide?: number;
  centerActiveSlide?: boolean;
  children: ReactIdSwiperChildren;
  freeScroll?: boolean;
  getSwiper?: (swiper: SwiperInstance) => void;
  params?: Record<string, unknown>;
  shortSwipes?: boolean;
  threshold?: number;
}

function Carousel({
  activeSlide,
  children,
  centerActiveSlide = false,
  shortSwipes = false, // By default, prevent short Swipes to avoid (none) clicking bug
  freeScroll = false,
  getSwiper,
  params = {},
  threshold = 5, // By default, add a threshold of 10 to avoid (none) clicking bug
  ...rest
}: Props) {
  const [swiper, setSwiper] = useState<SwiperInstance>(null);

  const finalParams = Object.assign(
    {},
    {
      centeredSlides: centerActiveSlide,
      freeMode: freeScroll,
      grabCursor: true,
      mousewheel: freeScroll,
      shortSwipes,
      slidesPerView: 'auto',
      threshold,
    },
    params,
  );

  useEffect(() => {
    if (!centerActiveSlide) {
      return;
    }

    if (swiper && !!activeSlide && activeSlide > -1) {
      swiper.slideTo(activeSlide);
    }
  }, [activeSlide, centerActiveSlide, swiper]);

  useEffect(() => {
    if (getSwiper) {
      getSwiper(swiper);
    }
  }, [swiper, getSwiper]);

  return (
    <Swiper getSwiper={setSwiper} {...finalParams} {...rest}>
      {children}
    </Swiper>
  );
}

export default Carousel;
