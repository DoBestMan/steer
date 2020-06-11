import { useEffect, useState } from 'react';
import Swiper, { ReactIdSwiperChildren, SwiperInstance } from 'react-id-swiper';

export interface Props {
  activeSlide?: number;
  centerActiveSlide?: boolean;
  children: ReactIdSwiperChildren;
  freeScroll?: boolean;
}

function Carousel({
  activeSlide,
  children,
  centerActiveSlide = false,
  freeScroll = false,
  ...rest
}: Props) {
  const [swiper, setSwiper] = useState<SwiperInstance>(null);

  const params = {
    centeredSlides: centerActiveSlide,
    centeredSlidesBounds: centerActiveSlide,
    freeMode: freeScroll,
    grabCursor: true,
    mousewheel: freeScroll,
    slidesPerView: 'auto',
  };

  useEffect(() => {
    if (!centerActiveSlide) {
      return;
    }

    if (swiper && !!activeSlide && activeSlide > -1) {
      swiper.slideTo(activeSlide);
    }
  }, [activeSlide, centerActiveSlide, swiper]);

  return (
    <Swiper getSwiper={setSwiper} {...params} {...rest}>
      {children}
    </Swiper>
  );
}

export default Carousel;
