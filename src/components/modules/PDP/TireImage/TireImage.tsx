import { useEffect, useState } from 'react';
import { SwiperInstance } from 'react-id-swiper';

import Carousel from '~/components/global/Carousel/Carousel';
import Image from '~/components/global/Image/Image';
import Video, { Props as VideoProps } from '~/components/global/Video/Video';
import { SiteImage } from '~/data/models/SiteImage';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { BREAKPOINTS } from '~/lib/constants';
import { PRODUCT_IMAGE_TYPES } from '~/lib/constants/productImage.types';
import { getWidthFromMaxHeight } from '~/lib/utils/number';

import styles, { MAX_HEIGHT } from './TireImage.styles';
import TireImageThumbs from './TireImageThumbs';

interface Props {
  imageList: Array<{
    image?: SiteImage;
    productImageType?: PRODUCT_IMAGE_TYPES;
    video?: VideoProps;
  }>;
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

function TireImage({ imageList }: Props) {
  const [swiper, setSwiper] = useState<SwiperInstance>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { is, greaterThan, lessThan } = useBreakpoints();

  useEffect(() => {
    if (!swiper) {
      return;
    }

    swiper.on('slideChange', () => {
      setCurrentIndex(swiper.activeIndex);
    });
  }, [swiper]);

  const maxHeight = lessThan.M
    ? MAX_HEIGHT.S
    : is.M
    ? MAX_HEIGHT.M
    : MAX_HEIGHT.L;

  return (
    <div css={styles.container}>
      {maxHeight && (
        <Carousel {...CONSTANTS.CAROUSEL_PARAMS} getSwiper={setSwiper}>
          {imageList.map((imageItem, index) => {
            const { image, video } = imageItem;
            const imageWidth =
              image?.width &&
              image?.height &&
              getWidthFromMaxHeight(image.width, image.height, maxHeight);
            const slideContainerStyles = [
              video && styles.videoWrap,
              image &&
                lessThan.L && {
                  width: imageWidth,
                  height: maxHeight,
                },
            ];

            return (
              <div key={`tire-image-${index}`} css={slideContainerStyles}>
                {image && (
                  <Image
                    altText={image.altText}
                    customStyles={styles.imageContainer}
                    height={maxHeight}
                    src={image.src}
                    width={imageWidth}
                  />
                )}

                {video && (
                  <Video
                    customStyles={styles.videoStyles}
                    posterFrame={video.posterFrame}
                    sizes={video.sizes}
                    youtubeId={video.youtubeId}
                  />
                )}
              </div>
            );
          })}
        </Carousel>
      )}

      {greaterThan.M && (
        <TireImageThumbs
          currentIndex={currentIndex}
          imageList={imageList}
          swiper={swiper}
        />
      )}
    </div>
  );
}

export default TireImage;
