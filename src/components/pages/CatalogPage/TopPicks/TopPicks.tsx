import dynamic from 'next/dynamic';
import { useCallback, useEffect, useRef, useState } from 'react';
import { SwiperInstance } from 'react-id-swiper';

import Carousel from '~/components/global/Carousel/Carousel';
import Icon from '~/components/global/Icon/Icon';
import { SiteCatalogSummaryTopPickItem } from '~/data/models/SiteCatalogSummaryTopPickItem';
import { SiteCatalogSummaryTopPicksMore } from '~/data/models/SiteCatalogSummaryTopPicksMore';
import { BREAKPOINTS, TIME } from '~/lib/constants';
import { PRODUCT_IMAGE_TYPES } from '~/lib/constants/productImage.types';
import { getScroll, subscribeScroll } from '~/lib/helpers/scroll';
import { resetTranslateInstance, setTranslate } from '~/lib/helpers/translate';
import { map } from '~/lib/utils/interpolation';
import { ui } from '~/lib/utils/ui-dictionary';
import { typography } from '~/styles/typography.styles';

import Title from './Title/Title';
import { NB_SLIDES_PER_BP } from './TopPicks.constants';
import { styles } from './TopPicks.styles';
import TopPicksItem from './TopPicksItem/TopPicksItem';
import { TopPickItemsHeader } from './TopPicksItem/TopPicksItems.types';

const OEModal = dynamic(() => import('./OEModal/OEModal'));

interface Props {
  customerServiceNumber: { display: string; value: string };
  exploreMore: () => void;
  location?: string;
  openSearch: () => void;
  picks: Array<SiteCatalogSummaryTopPickItem>;
  showLoadingInterstitial: boolean;
  totalResult: number;
  viewMoreData: SiteCatalogSummaryTopPicksMore | null;
}

const OFFSET_STARTING_ALPHA_INTERPOLATION = 100;

function TopPicks({
  customerServiceNumber,
  exploreMore,
  openSearch,
  picks,
  showLoadingInterstitial,
  totalResult,
  location,
  viewMoreData,
}: Props) {
  const [swiper, setSwiper] = useState<SwiperInstance>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [rootHeight, setRootHeight] = useState(0);
  const [modalOpened, setModalOpened] = useState(false);
  const [showTitle, setShowTitle] = useState(true);
  const [indexHovered, setIndexHovered] = useState<number | undefined>(
    undefined,
  );
  const rootRef = useRef<HTMLDivElement | null>(null);

  /**
   * If coming from Search, set programmatic focus to the TP title
   */
  const titleRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (showLoadingInterstitial && titleRef && titleRef.current) {
      titleRef.current.focus();
    }
  }, [titleRef, showLoadingInterstitial]);

  const slideTo = useCallback(
    (index: number) => {
      swiper && swiper.slideTo(index);
    },
    [swiper],
  );

  // Swiper events
  useEffect(() => {
    if (!swiper) {
      return;
    }

    resetTranslateInstance();

    swiper.on('slideChangeTransitionEnd', () => {
      setCurrentIndex(swiper.activeIndex);
    });

    swiper.on('setTranslate', (translate: number) => {
      setTranslate({ x: translate });
    });

    swiper.on('sliderMove', () => {
      setShowTitle(false);
    });

    swiper.on('touchEnd', () => {
      setShowTitle(true);
    });

    return () => {
      resetTranslateInstance();
      swiper.off('slideChange');
      swiper.off('setTranslate');
      swiper.off('sliderMove');
      swiper.off('touchEnd');
    };
  }, [swiper]);

  // Show after a little delay
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), TIME.MS600);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Get topPicks offsetTop on resize
  useEffect(() => {
    if (!rootRef || !rootRef.current) {
      return;
    }

    const resize = () => {
      if (!rootRef || !rootRef.current) {
        return;
      }
      setRootHeight(rootRef.current.clientHeight);
    };
    resize();

    window.addEventListener('resize', resize, false);

    return () => {
      window.removeEventListener('resize', resize, false);
    };
  }, [rootRef]);

  // On scroll
  useEffect(() => {
    if (!rootRef || !rootRef.current) {
      return;
    }

    const scroll = () => {
      if (!rootRef || !rootRef.current) {
        return;
      }

      const y = getScroll().y;
      const alpha = map(
        y,
        OFFSET_STARTING_ALPHA_INTERPOLATION,
        OFFSET_STARTING_ALPHA_INTERPOLATION + rootHeight * 0.5,
        1,
        0,
      );

      // Directly changing the style to avoid re-render loop
      rootRef.current.style.opacity = String(alpha);
    };
    const subscription = subscribeScroll(scroll);

    return () => {
      subscription();
    };
  }, [rootRef, rootHeight]);

  const onItemMouseEnter = useCallback(
    (index: number) => {
      setIndexHovered(index);
    },
    [setIndexHovered],
  );

  const onItemMouseLeave = useCallback(() => {
    setIndexHovered(undefined);
  }, [setIndexHovered]);

  const openModal = useCallback(() => {
    setModalOpened(true);
  }, [setModalOpened]);

  const closeModal = useCallback(() => {
    setModalOpened(false);
  }, [setModalOpened]);

  const params = {
    // Could use slidesPerView: NB_SLIDES_PER_BP[bp.bk], but seems better this way
    // Adding  bunch of "extra" breakpoint because `spaceBetween` needs a fixed width
    breakpoints: {
      [BREAKPOINTS.S]: {
        slidesPerView: NB_SLIDES_PER_BP.S,
        spaceBetween: -150,
      },
      [320]: {
        slidesPerView: NB_SLIDES_PER_BP.S,
        spaceBetween: -100,
      },
      [375]: {
        slidesPerView: NB_SLIDES_PER_BP.S,
        spaceBetween: -150,
      },
      [450]: {
        slidesPerView: NB_SLIDES_PER_BP.S,
        spaceBetween: -230,
      },
      [500]: {
        slidesPerView: NB_SLIDES_PER_BP.S,
        spaceBetween: -250,
      },
      [BREAKPOINTS.M]: {
        slidesPerView: NB_SLIDES_PER_BP.M,
        spaceBetween: -250,
      },
      [650]: {
        slidesPerView: NB_SLIDES_PER_BP.M,
        spaceBetween: -300,
      },
      [750]: {
        slidesPerView: NB_SLIDES_PER_BP.M,
        spaceBetween: -350,
      },
      [850]: {
        slidesPerView: NB_SLIDES_PER_BP.M,
        spaceBetween: -400,
      },
      [920]: {
        slidesPerView: NB_SLIDES_PER_BP.M,
        spaceBetween: -450,
      },
      [BREAKPOINTS.L]: {
        slidesPerView: NB_SLIDES_PER_BP.L,
        spaceBetween: -500,
      },
      [1024]: {
        slidesPerView: NB_SLIDES_PER_BP.L,
        spaceBetween: -510,
      },
      [1100]: {
        slidesPerView: NB_SLIDES_PER_BP.L,
        spaceBetween: -550,
      },
      [BREAKPOINTS.XL]: {
        slidesPerView: NB_SLIDES_PER_BP.XL,
        spaceBetween: 0,
      },
    },
    centeredSlides: true,
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    longSwipesMs: 50,
    longSwipesRatio: 0.1,
    mousewheel: {
      forceToAxis: true,
    },
    on: {
      init() {
        // give manually role attributes
        const carouselContainerEl = document.querySelector(
          '#top-picks-carousel .swiper-wrapper',
        );
        if (carouselContainerEl) {
          carouselContainerEl.setAttribute('role', 'menubar');
        }

        const carouselSlideEls = document.querySelectorAll(
          '#top-picks-carousel .swiper-slide',
        );
        for (let i = 0; i < carouselSlideEls.length; i++) {
          carouselSlideEls[i].setAttribute('role', 'menuitem');
        }
      },
    },
    shortSwipes: false,
  };

  const currentOeModal = picks[currentIndex]
    ? picks[currentIndex].siteCatalogSummaryTopPickItemAdditionalInfo
    : null;

  const showMoreData = currentIndex === picks.length;

  const carouselItems = picks.map((pick, i) => {
    const {
      product,
      ctaLabel,
      header,
      fallbackImage,
      siteCatalogSummaryTopPickItemAdditionalInfo,
    } = pick;
    const addVehicleInfo = product === null;

    let asset = null,
      brand = null,
      deliveryInfo = null,
      productFeature = null,
      productName = null,
      rating = null,
      url = null,
      priceList = null;

    if (product) {
      asset =
        product.imageList.filter(
          (img) => img.productImageType === PRODUCT_IMAGE_TYPES.SIDEWALL,
        )[0]?.image || product.imageList[0].image;

      brand = product.brand;
      deliveryInfo = product.deliveryInfo;
      priceList = product.priceList;
      productFeature = product.topPicksAttribute;
      productName = product.name;
      rating = product.rating;
      url = product.link.href;
    } else if (fallbackImage) {
      asset = fallbackImage;
    }

    const key = `${header.titleLine1}-${product?.name}`;

    return (
      <div css={styles.pick} key={key}>
        <TopPicksItem
          currentIndex={i}
          addVehicleInfo={addVehicleInfo}
          brand={brand}
          ctaLabel={ctaLabel}
          customerServiceNumber={customerServiceNumber}
          header={header as TopPickItemsHeader}
          asset={asset}
          deliveryInfo={deliveryInfo}
          index={i}
          isCurrent={i === currentIndex}
          location={location}
          oeModal={siteCatalogSummaryTopPickItemAdditionalInfo}
          priceList={priceList}
          productFeature={productFeature}
          productName={productName}
          rating={rating}
          totalResult={totalResult}
          url={url}
          show={show}
          indexHovered={indexHovered}
          onItemMouseEnter={onItemMouseEnter}
          onItemMouseLeave={onItemMouseLeave}
          openSearch={openSearch}
          slideTo={slideTo}
        />
      </div>
    );
  });

  if (viewMoreData) {
    carouselItems.push(
      <div css={styles.pick} key="view-more-pick">
        <TopPicksItem
          currentIndex={picks.length}
          customerServiceNumber={customerServiceNumber}
          viewMoreData={viewMoreData}
          totalResult={totalResult}
          exploreMore={exploreMore}
          index={picks.length}
          isCurrent={showMoreData}
          show={show}
          indexHovered={indexHovered}
          onItemMouseEnter={onItemMouseEnter}
          onItemMouseLeave={onItemMouseLeave}
          slideTo={slideTo}
        />
      </div>,
    );
  }

  return (
    <div ref={rootRef} css={[styles.root, styles.rootIos]}>
      <div css={styles.titlesContainer}>
        <div
          css={[styles.titleContainer, showTitle && styles.titleContainerShow]}
          ref={titleRef}
          tabIndex={-1}
        >
          {picks.map((pick, i) => {
            return (
              <Title
                currentIndex={i}
                pick={pick}
                key={`_index_${i}`}
                isCurrent={
                  (indexHovered !== undefined && indexHovered === i) ||
                  (typeof indexHovered === 'undefined' && i === currentIndex)
                }
                openModal={openModal}
              />
            );
          })}
          {viewMoreData && (
            <Title
              currentIndex={picks.length}
              viewMoreData={viewMoreData}
              isCurrent={
                (indexHovered && indexHovered === picks.length) ||
                (showMoreData && indexHovered === undefined)
              }
            />
          )}
        </div>
      </div>

      <div css={styles.carousel} id="top-picks-carousel">
        <Carousel params={params} getSwiper={setSwiper}>
          {carouselItems}
        </Carousel>
      </div>
      <button type="button" css={styles.exploreButton} onClick={exploreMore}>
        <span css={typography.tertiaryHeadline}>
          {ui('catalog.topPicks.exploreMoreCTALabel')}
        </span>
        <Icon name="arrow-down" css={styles.exploreButtonIcon} />
      </button>
      {currentOeModal && (
        <OEModal
          isOpen={modalOpened}
          onClose={closeModal}
          content={currentOeModal}
        />
      )}
    </div>
  );
}

export default TopPicks;
