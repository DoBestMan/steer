import { useEffect, useRef, useState } from 'react';
import { ReactIdSwiperChildren } from 'react-id-swiper';

import Carousel from '~/components/global/Carousel/CarouselDynamic';
import { useBreakpoints } from '~/hooks/useBreakpoints';

import styles from './FiltersCarousel.styles';

interface Props {
  activeFilter: string | number | null;
  children: ReactIdSwiperChildren;
  label?: string;
}

function FiltersCarousel({ activeFilter, children, label }: Props) {
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const prevActiveFilter = useRef(activeFilter);
  const { greaterThan } = useBreakpoints();
  useEffect(() => {
    if (activeFilter !== prevActiveFilter.current && greaterThan.M) {
      setShouldUpdate(true);
    }
    setShouldUpdate(false);
  }, [activeFilter, greaterThan]);
  return (
    <>
      <p css={styles.label}>{label}</p>
      <div
        css={[
          styles.container,
          // `disableEvents` used on buttons elsewhere
          activeFilter !== null && styles.disableEvents,
        ]}
      >
        <Carousel
          slideClass="dropdown-button"
          shouldSwiperUpdate={shouldUpdate}
          rebuildOnUpdate // needed to disable scroll when dropdown is open
          freeScroll={!activeFilter}
        >
          {children}
        </Carousel>
      </div>
    </>
  );
}

export default FiltersCarousel;
