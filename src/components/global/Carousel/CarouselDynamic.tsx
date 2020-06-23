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
  params?: {};
}

function Carousel({
  activeSlide,
  children,
  centerActiveSlide = false,
  freeScroll = false,
  getSwiper,
  params = {},
  ...rest
}: Props) {
  const [swiper, setSwiper] = useState<SwiperInstance>(null);

  const finalParams = Object.assign(
    {},
    {
      centeredSlides: centerActiveSlide,
      centeredSlidesBounds: centerActiveSlide,
      freeMode: freeScroll,
      grabCursor: true,
      mousewheel: freeScroll,
      slidesPerView: 'auto',
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
