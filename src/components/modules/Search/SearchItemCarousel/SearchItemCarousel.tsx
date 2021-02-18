import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SwiperInstance } from 'react-id-swiper';

import Car from '~/components/global/Car/Car';
import Carousel from '~/components/global/Carousel/CarouselDynamic';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Icon from '~/components/global/Icon/Icon';
import { useSearchContext } from '~/components/modules/Search/Search.context';
import { useSearchModalContext } from '~/components/modules/Search/SearchModal.context';
import NextButton from '~/components/pages/CatalogPage/TopPicks/Frame/ControlButton/NextButton';
import PrevButton from '~/components/pages/CatalogPage/TopPicks/Frame/ControlButton/PrevButton';
import { SiteCar } from '~/data/models/SiteCar';
import { SiteIcon } from '~/data/models/SiteIcon';
import { SiteSearchResultActionLink } from '~/data/models/SiteSearchResultActionLink';
import { SiteSearchResultTextItem } from '~/data/models/SiteSearchResultTextItem';
import { ROUTE_MAP, ROUTES } from '~/lib/constants';

import { SearchActionType } from '../Search.types';
import styles from './SearchItemCarousel.styles';

interface Props {
  items: SiteSearchResultTextItem[];
  title: string;
}

function SearchItemCarousel({ items, title }: Props) {
  const [swiper, setSwiper] = useState<SwiperInstance>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const lastSearchItemRef = useRef<HTMLLIElement>(null);
  const [showNext, setShowNext] = useState(false);
  const {
    setQueryParamLabel,
    setRouteQueryParamOptions,
    setSearchState,
    clearSearchResults,
  } = useSearchContext();

  const { setCurrentInputQuery } = useSearchModalContext();

  const totalCount = items.length;

  useEffect(() => {
    if (!swiper) {
      return;
    }

    swiper.on('slideChangeTransitionEnd', () => {
      setCurrentIndex(swiper.activeIndex);
    });

    return () => {
      swiper.off('slideChange');
    };
  }, [swiper]);

  useEffect(() => {
    if (!lastSearchItemRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0) {
            setShowNext(false);
          } else if (!entry.isIntersecting) {
            setShowNext(true);
          }
        });
      },
      {
        rootMargin: '0px 100px 0px 0px',
        threshold: 1.0,
      },
    );

    observer.observe(lastSearchItemRef.current);

    return () => {
      observer.disconnect();
    };
  }, [lastSearchItemRef]);

  const slideTo = useCallback(
    (index: number) => {
      if (swiper) {
        swiper.slideTo(index);
      }
    },
    [swiper],
  );

  const handleClick = (searchResult: SiteSearchResultTextItem) => () => {
    const {
      link: { href },
    } = searchResult.action as SiteSearchResultActionLink;
    const [key, value] = href.split('=');
    const params = { [key]: value };

    const resetQuery = {
      queryText: '',
      queryType: '',
    };

    clearSearchResults();
    setSearchState('');
    setCurrentInputQuery(resetQuery);

    const searchInput = document.querySelector(
      '[data-testid="search-input"]',
    ) as HTMLInputElement;
    searchInput?.focus();

    setRouteQueryParamOptions({
      routes: [
        ROUTE_MAP[ROUTES.VEHICLE_CATALOG],
        ROUTE_MAP[ROUTES.TIRE_SIZE_CATALOG_OR_CATEGORY],
      ],
      params,
    });
    setQueryParamLabel(searchResult.label);
  };

  return (
    <Grid css={styles.root}>
      <GridItem gridColumnS="2/8" gridColumnL="3/13">
        <p css={styles.title}>{title}</p>
      </GridItem>
      <GridItem fullbleed>
        <ul css={styles.ctaList}>
          <Carousel
            wrapperClass="search-items-carousel"
            slideClass="search-item"
            getSwiper={setSwiper}
          >
            {items.map((cta: SiteSearchResultTextItem, index: number) => {
              let href;
              if (cta.action.type === SearchActionType.LINK) {
                href = cta.action.link.href;
              }

              return (
                <li
                  key={(href as string) + index}
                  css={[styles.ctaMenuItem, styles.carouselItem]}
                  role="button"
                  tabIndex={0}
                  ref={index === totalCount - 1 ? lastSearchItemRef : undefined}
                  onClick={handleClick(cta)}
                >
                  <div
                    css={styles.ctaMenuIcon}
                    data-icon-type="search-item-icon"
                  >
                    {title === 'Tire Category' && (
                      <Icon name={(cta.image as SiteIcon).svgId} />
                    )}
                    {title === 'Vehicle Type' && (
                      <Car
                        carId={(cta.image as SiteCar).vehicleType}
                        css={styles.car}
                      />
                    )}
                  </div>
                  <p css={styles.ctaMenuLabel}>{cta.label}</p>
                </li>
              );
            })}
          </Carousel>

          {currentIndex > 0 && (
            <PrevButton
              currentIndex={currentIndex}
              slideTo={slideTo}
              customStyles={styles.prevButton}
            />
          )}
          {showNext && (
            <NextButton
              currentIndex={currentIndex}
              slideTo={slideTo}
              customStyles={styles.nextButton}
            />
          )}
        </ul>
      </GridItem>
    </Grid>
  );
}

export default SearchItemCarousel;
