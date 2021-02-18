import Carousel from '~/components/global/Carousel/Carousel';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Image from '~/components/global/Image/Image';
import BaseLink from '~/components/global/Link/BaseLink';
import { useSearchContext } from '~/components/modules/Search/Search.context';
import { useSearchModalContext } from '~/components/modules/Search/SearchModal.context';
import { SiteSearchResultActionQuery } from '~/data/models/SiteSearchResultActionQuery';
import { SiteSearchResultImageItem } from '~/data/models/SiteSearchResultImageItem';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';
import { ROUTE_MAP, ROUTES } from '~/lib/constants';

import { useFocusScrollIntoView } from '../Search.hooks';
import { SearchActionType } from '../Search.types';
import styles from './SearchCarousel.styles';

export interface SearchCarouselProps {
  label?: string | JSX.Element;
  onClick: (searchResult: SiteSearchResultImageItem) => void;
  siteSearchResultList: SiteSearchResultImageItem[];
}

function SearchCarousel({
  label,
  onClick,
  siteSearchResultList,
}: SearchCarouselProps) {
  const { onFocus, pushRefToArray } = useFocusScrollIntoView({});
  const {
    searchState,
    clearSearchResults,
    setSearchState,
    setQueryParamLabel,
    setRouteQueryParamOptions,
  } = useSearchContext();
  const { setCurrentInputQuery } = useSearchModalContext();

  const handleClick = (searchResult: SiteSearchResultImageItem) => () => {
    if (searchState === 'brand') {
      const {
        queryText,
        queryType,
      } = searchResult.action as SiteSearchResultActionQuery;
      const params = { [queryType]: queryText };

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
    } else {
      onClick(searchResult);
    }
  };

  const widths = [90, 120, 140];

  return (
    <Grid>
      {label && (
        <GridItem gridColumnS="2/6" gridColumnM="2/8" gridColumnL="3/14">
          <h5 css={styles.eyebrow}>{label}</h5>
        </GridItem>
      )}
      <GridItem
        css={styles.resultsGrid}
        gridColumnS="1/7"
        gridColumnM="1/9"
        gridColumnL="1/15"
      >
        <Carousel freeScroll>
          {siteSearchResultList.map((item, index) => {
            if (item.action.type === SearchActionType.LINK) {
              const { href, isExternal } = item.action.link;
              const isTireSizeType = item.image.type === ICON_IMAGE_TYPE.SIZE;

              return (
                <div
                  css={styles.carouselItem}
                  key={item.image.altText}
                  ref={pushRefToArray(index)}
                >
                  <BaseLink
                    css={styles.carouselButton}
                    href={href}
                    isExternal={isExternal}
                    onClick={handleClick(item)}
                    onFocus={onFocus(index)}
                  >
                    {isTireSizeType ? (
                      <span css={styles.carouselText}>{item.image.src}</span>
                    ) : (
                      <div css={styles.logoImage}>
                        <Image
                          altText={item.image.altText}
                          responsive
                          src={item.image.src}
                          widths={widths}
                        />
                      </div>
                    )}
                  </BaseLink>
                  {!isTireSizeType && (
                    <p css={styles.carouselLabel}>{item.label}</p>
                  )}
                </div>
              );
            }

            return (
              <div
                css={styles.carouselItem}
                key={item.image.altText}
                ref={pushRefToArray(index)}
              >
                <button
                  css={styles.carouselButton}
                  onClick={handleClick(item)}
                  onFocus={onFocus(index)}
                >
                  {item.image.type === ICON_IMAGE_TYPE.SIZE ? (
                    <span css={styles.carouselText}>{item.image.src}</span>
                  ) : (
                    <div css={styles.logoImage}>
                      <Image
                        altText={item.image.altText}
                        responsive
                        src={item.image.src}
                        widths={widths}
                      />
                    </div>
                  )}
                </button>
                {item.image.type !== ICON_IMAGE_TYPE.SIZE && (
                  <p css={styles.carouselLabel}>{item.label}</p>
                )}
              </div>
            );
          })}
        </Carousel>
      </GridItem>
    </Grid>
  );
}

export default SearchCarousel;
