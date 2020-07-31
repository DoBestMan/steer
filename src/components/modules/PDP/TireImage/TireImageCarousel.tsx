import { useEffect, useState } from 'react';
import { SwiperInstance } from 'react-id-swiper';

import Carousel from '~/components/global/Carousel/Carousel';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import {
  SiteCatalogProductImage,
  SiteCatalogProductImageTypeEnum,
} from '~/data/models/SiteCatalogProductImage';
import { SiteProductLine } from '~/data/models/SiteProductLine';
import {
  SiteYouTubeVideo,
  SiteYouTubeVideoTypeEnum,
} from '~/data/models/SiteYouTubeVideo';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { getWidthFromMaxHeight } from '~/lib/utils/number';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './TireImage.styles';
import TireImageCarouselItem from './TireImageCarouselItem';
import TireImageThumbs from './TireImageThumbs';

function getItemWidth(
  imageItem: SiteCatalogProductImage | SiteYouTubeVideo,
  clientRect: ClientRect | null,
) {
  if (
    imageItem.type !==
      SiteCatalogProductImageTypeEnum.SiteCatalogProductImage ||
    !imageItem.image.width ||
    !imageItem.image.height ||
    !clientRect ||
    !clientRect.height
  ) {
    return undefined;
  }

  return Math.round(
    getWidthFromMaxHeight(
      imageItem.image.width,
      imageItem.image.height,
      clientRect.height,
    ),
  );
}

interface Props {
  assetList: SiteProductLine['assetList'];
  currentIndex: number;
  handleClick?: (index: number) => void;
  hasThumbs?: boolean;
  isFullscreen?: boolean;
  setCurrentIndex: (index: number) => void;
}

function NextButton() {
  return (
    <button
      className="swiper-button-prev"
      aria-label={ui('pdp.tireImage.previousButtonLabel')}
    >
      <Icon name={ICONS.CHEVRON_LEFT} />
    </button>
  );
}

function PrevButton() {
  return (
    <button
      className="swiper-button-next"
      aria-label={ui('pdp.tireImage.nextButtonLabel')}
    >
      <Icon name={ICONS.CHEVRON_RIGHT} />
    </button>
  );
}

function TireImageCarousel({
  currentIndex,
  handleClick,
  hasThumbs,
  assetList,
  isFullscreen,
  setCurrentIndex,
}: Props) {
  const [swiper, setSwiper] = useState<SwiperInstance>(null);
  const { bk, windowHeight } = useBreakpoints();
  const [shouldPauseVideo, setShouldPauseVideo] = useState(false);
  const [wrapperRect, setWrapperRect] = useState<ClientRect | null>(null);

  const pagination = !isFullscreen
    ? {
        pagination: {
          el: '.tire-image-pagination',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      }
    : null;

  const navigation = !isFullscreen
    ? {
        renderPrevButton: PrevButton,
        renderNextButton: NextButton,
      }
    : null;

  const params = {
    centeredSlides: true,
    shouldSwiperUpdate: true,
    slidesPerView: 1,
  };

  // We need to update the slide dimensions when the window size changes
  useEffect(() => {
    if (!swiper) {
      return;
    }
    setWrapperRect(swiper.wrapperEl.getBoundingClientRect());
  }, [bk, swiper, windowHeight]);

  useEffect(() => {
    if (!swiper) {
      return;
    }

    setWrapperRect(swiper.wrapperEl.getBoundingClientRect());

    swiper.on('slideChange', () => {
      setCurrentIndex(swiper.activeIndex);

      // Only pause when slide is not a video
      const isVideoType =
        assetList[swiper.activeIndex].type ===
        SiteYouTubeVideoTypeEnum.SiteYouTubeVideo;

      setShouldPauseVideo(!isVideoType);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swiper, setCurrentIndex]);

  const handleImageClick = (index: number) => () => {
    if (!handleClick) {
      return;
    }
    return handleClick(index);
  };

  const defaultItemWidth = wrapperRect
    ? Math.round(wrapperRect?.height * 1.125)
    : undefined;

  return (
    <div css={[styles.container, isFullscreen && styles.containerFullScreen]}>
      <Carousel
        centerActiveSlide
        params={{
          ...params,
          initialSlide: currentIndex,
          ...pagination,
          ...navigation,
        }}
        getSwiper={setSwiper}
        activeSlide={currentIndex}
      >
        {assetList.map((imageItem, index) => {
          const imageWidth =
            // If it's video or there's something wrong with image's dimensions
            // use the default width
            getItemWidth(imageItem, wrapperRect) || defaultItemWidth;

          return (
            <div key={`tire-image-${index}`} css={styles.slide}>
              <TireImageCarouselItem
                handleClick={handleClick}
                handleImageClick={handleImageClick}
                imageItem={imageItem}
                index={index}
                isActive={index === currentIndex}
                shouldPauseVideo={shouldPauseVideo}
                setShouldPauseVideo={setShouldPauseVideo}
                height={wrapperRect?.height}
                width={imageWidth}
              />
            </div>
          );
        })}
      </Carousel>

      {hasThumbs && (
        <TireImageThumbs
          currentIndex={currentIndex}
          assetList={assetList}
          isFullscreen={isFullscreen}
          swiper={swiper}
        />
      )}
    </div>
  );
}

export default TireImageCarousel;
