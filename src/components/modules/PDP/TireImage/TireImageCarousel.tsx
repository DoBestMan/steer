import React, { useEffect, useState } from 'react';
import { SwiperInstance } from 'react-id-swiper';

import Carousel from '~/components/global/Carousel/Carousel';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { useSiteGlobalsContext } from '~/context/SiteGlobals.context';
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
import { DEFAULT_PRODUCT_IMAGE_SIZE } from '~/lib/constants/image';
import { VIEWPORTS } from '~/lib/constants/viewport';
import { isBrowser } from '~/lib/utils/browser';
import { getWidthFromMaxHeight } from '~/lib/utils/number';
import { ui } from '~/lib/utils/ui-dictionary';

import styles, { CONSTANTS } from './TireImage.styles';
import TireImageCarouselItem from './TireImageCarouselItem';
import TireImageThumbs from './TireImageThumbs';
import { OUTER_PADDING } from './TireImageZoom.styles';

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

function NextButton({
  disabled,
  swiper,
}: {
  disabled: boolean;
  swiper: SwiperInstance;
}) {
  function handleClick() {
    swiper.slideNext();
  }

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      aria-label={ui('pdp.tireImage.previousButtonLabel')}
      css={[styles.navigationButton, styles.navigationNext]}
    >
      <Icon name={ICONS.CHEVRON_RIGHT} />
    </button>
  );
}

function PrevButton({
  disabled,
  swiper,
}: {
  disabled: boolean;
  swiper: SwiperInstance;
}) {
  function handleClick() {
    swiper.slidePrev();
  }

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      aria-label={ui('pdp.tireImage.nextButtonLabel')}
      css={[styles.navigationButton, styles.navigationPrev]}
    >
      <Icon name={ICONS.CHEVRON_LEFT} />
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
  const { bk, greaterThan, lessThan, windowHeight } = useBreakpoints();
  const [shouldPauseVideo, setShouldPauseVideo] = useState(false);
  const [wrapperRect, setWrapperRect] = useState<ClientRect | null>(null);
  const { userAgentType } = useSiteGlobalsContext();

  const initialImageSize =
    DEFAULT_PRODUCT_IMAGE_SIZE[userAgentType || VIEWPORTS.DESKTOP];

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

  const params = {
    centeredSlides: true,
    longSwipesRatio: 0.2,
    shortSwipes: true,
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
    ? Math.round(wrapperRect?.height * 1.12)
    : undefined;

  const videoItemWidth = wrapperRect
    ? Math.round(wrapperRect?.width)
    : undefined;

  // We can't use 100vh in this calculation as it doesn't
  // take into account the bottom bar in mobile Safari.
  const fullScreenHeaderHeight = greaterThan.M
    ? CONSTANTS.HEADER_HEIGHT.L
    : CONSTANTS.HEADER_HEIGHT.S;
  const fullScreenVerticalPadding = greaterThan.M
    ? OUTER_PADDING.L
    : lessThan.M
    ? OUTER_PADDING.S.VERTICAL
    : OUTER_PADDING.M;
  const containerHeight = `calc(${windowHeight}px - ${fullScreenHeaderHeight}px - ${
    fullScreenVerticalPadding * 2
  }px)`;

  return (
    <div
      css={[
        styles.container,
        isFullscreen && { height: containerHeight },
        isFullscreen ? styles.containerFullScreen : styles.containerInline,
      ]}
    >
      <Carousel
        centerActiveSlide
        params={{
          ...params,
          initialSlide: currentIndex,
          ...pagination,
          renderNextButton: null,
          renderPrevButton: null,
        }}
        getSwiper={setSwiper}
        activeSlide={currentIndex}
      >
        {assetList.map((imageItem, index) => {
          const imageWidth =
            // If it's video or there's something wrong with image's dimensions
            // use the default width
            getItemWidth(imageItem, wrapperRect) ||
            videoItemWidth ||
            defaultItemWidth;

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
                height={!isBrowser() ? initialImageSize : wrapperRect?.height}
                width={!isBrowser() ? initialImageSize : imageWidth}
              />
            </div>
          );
        })}
      </Carousel>

      {hasThumbs ? (
        <TireImageThumbs
          currentIndex={currentIndex}
          assetList={assetList}
          isFullscreen={isFullscreen}
          swiper={swiper}
        />
      ) : (
        <>
          <PrevButton swiper={swiper} disabled={currentIndex === 0} />
          <NextButton
            swiper={swiper}
            disabled={currentIndex === assetList.length - 1}
          />
        </>
      )}
    </div>
  );
}

export default TireImageCarousel;
