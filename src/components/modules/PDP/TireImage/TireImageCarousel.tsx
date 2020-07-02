import { useEffect, useState } from 'react';
import { SwiperInstance } from 'react-id-swiper';

import Carousel from '~/components/global/Carousel/Carousel';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { BREAKPOINTS } from '~/lib/constants';

import styles, { MAX_HEIGHT } from './TireImage.styles';
import TireImageCarouselItem, { ImageItemProps } from './TireImageCarouselItem';
import TireImageThumbs from './TireImageThumbs';

interface Props {
  currentIndex: number;
  handleClick?: (index: number) => void;
  hasThumbs?: boolean;
  imageList: Array<ImageItemProps>;
  isFullscreen?: boolean;
  setCurrentIndex: (index: number) => void;
}

const CONSTANTS = {
  CAROUSEL_PARAMS: {
    centeredSlides: true,

    breakpoints: {
      [BREAKPOINTS.S]: {
        spaceBetween: 60,
        slidesPerView: 'auto',
      },
      [BREAKPOINTS.M]: {
        spaceBetween: 170,
        slidesPerView: 'auto',
      },
      [BREAKPOINTS.L]: {
        spaceBetween: 0,
        slidesPerView: 1,
      },
    },
  },
};

function TireImageCarousel({
  currentIndex,
  handleClick,
  hasThumbs,
  imageList,
  isFullscreen,
  setCurrentIndex,
}: Props) {
  const [swiper, setSwiper] = useState<SwiperInstance>(null);
  const { is, lessThan } = useBreakpoints();

  useEffect(() => {
    if (!swiper) {
      return;
    }

    swiper.on('slideChange', () => {
      setCurrentIndex(swiper.activeIndex);
    });
  }, [swiper, setCurrentIndex]);

  const maxHeight = lessThan.M
    ? MAX_HEIGHT.S
    : is.M
    ? MAX_HEIGHT.M
    : MAX_HEIGHT.L;

  const handleImageClick = (index: number) => () => {
    if (!handleClick) {
      return;
    }
    return handleClick(index);
  };

  return (
    <div css={[styles.container, isFullscreen && styles.containerFullScreen]}>
      {maxHeight && (
        <Carousel
          centerActiveSlide
          params={{ ...CONSTANTS.CAROUSEL_PARAMS, initialSlide: currentIndex }}
          getSwiper={setSwiper}
          activeSlide={currentIndex}
        >
          {imageList.map((imageItem, index) => (
            <div key={`tire-image-${index}`}>
              <TireImageCarouselItem
                handleClick={handleClick}
                handleImageClick={handleImageClick}
                imageItem={imageItem}
                index={index}
                isFullscreen={isFullscreen}
                maxHeight={maxHeight}
              />
            </div>
          ))}
        </Carousel>
      )}

      {hasThumbs && (
        <TireImageThumbs
          currentIndex={currentIndex}
          imageList={imageList}
          isFullscreen={isFullscreen}
          swiper={swiper}
        />
      )}
    </div>
  );
}

export default TireImageCarousel;
