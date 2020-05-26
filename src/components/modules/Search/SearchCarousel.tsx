import Glider from 'react-glider';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Image from '~/components/global/Image/Image';

import { SearchResult } from './Search';
import styles from './SearchCarousel.styles';

export interface SearchCarouselProps {
  label?: string | JSX.Element;
  onClick: (searchResult: SearchResult) => void;
  searchResults: SearchResult[];
}

function SearchCarousel({
  label,
  onClick,
  searchResults,
}: SearchCarouselProps) {
  const handleClick = (searchResult: SearchResult) => () => {
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
          {searchResults.map((result) => (
            <div css={styles.carouselItem} key={result.value}>
              <button css={styles.carouselButton} onClick={handleClick(result)}>
                <Image
                  altText={result.displayValue}
                  srcSet={result.displayImage || ''} // note: this is gross, but temporary. data schema will change in the future.
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
