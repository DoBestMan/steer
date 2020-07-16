import Carousel from '~/components/global/Carousel/Carousel';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Image from '~/components/global/Image/Image';
import BaseLink from '~/components/global/Link/BaseLink';
import { SiteSearchResultImageItem } from '~/data/models/SiteSearchResultImageItem';

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
  const handleClick = (searchResult: SiteSearchResultImageItem) => () => {
    onClick(searchResult);
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
              return (
                <div
                  css={styles.carouselItem}
                  key={item.image.altText}
                  ref={pushRefToArray}
                >
                  <BaseLink
                    css={styles.carouselButton}
                    href={href}
                    isExternal={isExternal}
                    onClick={handleClick(item)}
                    onFocus={onFocus(index)}
                  >
                    <Image
                      altText={item.image.altText}
                      height={item.image.height}
                      responsive
                      src={item.image.src}
                      width={item.image.width || 50} // TODO: with real data, "|| 50" should be useless
                      widths={widths}
                    />
                  </BaseLink>
                </div>
              );
            }

            return (
              <div
                css={styles.carouselItem}
                key={item.image.altText}
                ref={pushRefToArray}
              >
                <button
                  css={styles.carouselButton}
                  onClick={handleClick(item)}
                  onFocus={onFocus(index)}
                >
                  <Image
                    altText={item.image.altText}
                    src={item.image.src}
                    width={item.image.width || 50} // TODO: with real data, "|| 50" should be useless
                    height={item.image.height}
                    widths={widths}
                  />
                </button>
              </div>
            );
          })}
        </Carousel>
      </GridItem>
    </Grid>
  );
}

export default SearchCarousel;
