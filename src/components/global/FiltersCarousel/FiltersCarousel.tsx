import { ReactIdSwiperChildren } from 'react-id-swiper';

import Carousel from '~/components/global/Carousel/CarouselDynamic';

import styles from './FiltersCarousel.styles';

interface Props {
  activeFilter: string | number | null;
  children: ReactIdSwiperChildren;
  label?: string;
}

function FiltersCarousel({ activeFilter, children, label }: Props) {
  return (
    <>
      <p css={styles.label}>{label}</p>
      <div
        css={[styles.container, activeFilter !== null && styles.disableEvents]}
      >
        <Carousel slideClass="filter-button" freeScroll>
          {children}
        </Carousel>
      </div>
    </>
  );
}

export default FiltersCarousel;
