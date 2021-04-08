import { useEffect, useState } from 'react';
import { ReactIdSwiperChildren, SwiperInstance } from 'react-id-swiper';

import Carousel from '~/components/global/Carousel/CarouselDynamic';

import styles from './FiltersCarousel.styles';

interface Props {
  activeFilter: string | number | null;
  children: ReactIdSwiperChildren;
  label?: string;
}

function FiltersCarousel({ activeFilter, children, label }: Props) {
  const [swiper, setSwiper] = useState<SwiperInstance>(null);
  useEffect(() => {
    if (activeFilter === null) {
      return;
    }

    function stopScroll(e: Event) {
      e.stopPropagation();
    }
    if (!swiper || !swiper.wrapperEl) {
      return;
    }

    swiper.wrapperEl.addEventListener('wheel', stopScroll);
    return () => {
      swiper.wrapperEl.removeEventListener('wheel', stopScroll);
    };
  }, [swiper, activeFilter]);

  return (
    <>
      <p css={styles.label}>{label}</p>
      <div
        css={[styles.container, activeFilter !== null && styles.disableEvents]}
      >
        <Carousel
          getSwiper={setSwiper}
          wrapperClass="filters-carousel"
          slideClass="dropdown-button"
          freeScroll
        >
          {children}
        </Carousel>
      </div>
    </>
  );
}

export default FiltersCarousel;
