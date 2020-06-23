import { useEffect, useRef, useState } from 'react';
import { SwiperInstance } from 'react-id-swiper';

import Carousel from '~/components/global/Carousel/Carousel';
import Icon from '~/components/global/Icon/Icon';
import { SiteCatalogSummaryTopPickItem } from '~/data/models/SiteCatalogSummaryTopPickItem';
import { SiteCatalogSummaryTopPicksMore } from '~/data/models/SiteCatalogSummaryTopPicksMore';
import { BREAKPOINTS, TIME } from '~/lib/constants';
import { PRODUCT_IMAGE_TYPES } from '~/lib/constants/productImage.types';
import { resetTranslateInstance, setTranslate } from '~/lib/helpers/translate';
import { ui } from '~/lib/utils/ui-dictionary';
import { typography } from '~/styles/typography.styles';

import { NB_SLIDES_PER_BP } from './TopPicks.constants';
import { styles } from './TopPicks.styles';
import TopPicksItem from './TopPicksItem/TopPicksItem';
import { TopPickItemsHeader } from './TopPicksItem/TopPicksItems.types';

interface Props {
  location?: string;
  picks: Array<SiteCatalogSummaryTopPickItem>;
  totalResult: number;
  viewMoreData: SiteCatalogSummaryTopPicksMore | null;
}

function TopPicks({ picks, totalResult, location, viewMoreData }: Props) {
  const [swiper, setSwiper] = useState<SwiperInstance>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [isStatic, setIsStatic] = useState(true);
  const [indexHovered, setIndexHovered] = useState<number | undefined>(
    undefined,
  );
  const rootRef = useRef<HTMLDivElement | null>(null);
  const exploreButtonRef = useRef<HTMLButtonElement | null>(null);

  const exploreMore = () => {};

  // Swiper events
  useEffect(() => {
    if (!swiper) {
      return;
    }

    resetTranslateInstance();

    swiper.on('slideChange', () => {
      setCurrentIndex(swiper.activeIndex);
    });

    swiper.on('setTranslate', (translate: number) => {
      setTranslate({ x: translate });
    });

    return () => {
      resetTranslateInstance();
      swiper.off('slideChange');
      swiper.off('setTranslate');
    };
  }, [swiper]);

  // Show after a little delay
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), TIME.MS600);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const onItemMouseEnter = (index: number) => {
    setIndexHovered(index);
  };

  const onItemMouseLeave = () => {
    setIndexHovered(undefined);
  };

  // Explore button position
  useEffect(() => {
    if (
      !rootRef ||
      !rootRef.current ||
      !exploreButtonRef ||
      !exploreButtonRef.current ||
      !swiper
    ) {
      return;
    }

    const resize = () => {
      const height = window.innerHeight;
      const boundsRoot = rootRef.current?.getBoundingClientRect();
      const boundsButton = exploreButtonRef.current?.getBoundingClientRect();

      if (!boundsRoot || !boundsButton) {
        return;
      }

      const isStatic = height - boundsButton.height < boundsRoot.bottom;
      setIsStatic(isStatic);
    };

    window.addEventListener('resize', resize, false);
    resize();

    return () => {
      window.removeEventListener('resize', resize, false);
    };
  }, [rootRef, exploreButtonRef, swiper]);

  const params = {
    // Could use slidesPerView: NB_SLIDES_PER_BP[bp.bk], but seems better this way
    // Adding  bunch of "extra" breakpoint because `spaceBetween` needs a fixed width
    breakpoints: {
      [BREAKPOINTS.S]: {
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
    mousewheel: {
      forceToAxis: true,
    },
    slideToClickedSlide: true,
  };

  return (
    <div>
      <div ref={rootRef} css={styles.root}>
        <Carousel params={params} getSwiper={setSwiper}>
          {picks.map((pick, i) => {
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
                  (img) =>
                    img.productImageType === PRODUCT_IMAGE_TYPES.SIDETREAD,
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

            return (
              <div css={styles.pick} key={product?.name || header.titleLine1}>
                <TopPicksItem
                  addVehicleInfo={addVehicleInfo}
                  brand={brand}
                  ctaLabel={ctaLabel}
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
                />
              </div>
            );
          })}

          {/* Last one is view more */}
          <div css={styles.pick}>
            <TopPicksItem
              viewMoreData={viewMoreData}
              totalResult={totalResult}
              exploreMore={exploreMore}
              isCurrent={picks.length === currentIndex}
              show={show}
            />
          </div>
        </Carousel>
      </div>
      <button
        type="button"
        css={[styles.exploreButton, isStatic && styles.isStatic]}
        ref={exploreButtonRef}
        onClick={exploreMore}
      >
        <span css={typography.tertiaryHeadline}>
          {ui('catalog.topPicks.exploreMoreCTALabel')}
        </span>
        <Icon name="arrow-down" />
      </button>
    </div>
  );
}

export default TopPicks;
