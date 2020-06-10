import Glider from 'react-glider';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Image from '~/components/global/Image/Image';
import { SiteSearchResultImageItem } from '~/data/models/SiteSearchResultImageItem';

import { useFocusScrollIntoView } from './Search.hooks';
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
        <Glider draggable slidesToShow="auto">
          {siteSearchResultList.map((result, index) => (
            <div
              css={styles.carouselItem}
              key={result.image.altText}
              ref={pushRefToArray}
            >
              <button
                css={styles.carouselButton}
                onClick={handleClick(result)}
                onFocus={onFocus(index)}
              >
                <Image
                  altText={result.image.altText}
                  srcSet={result.image.srcSet}
                />
              </button>
            </div>
          ))}
        </Glider>
      </GridItem>
    </Grid>
  );
}

export default SearchCarousel;
