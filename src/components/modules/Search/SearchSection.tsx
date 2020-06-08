import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';

import { useFocusScrollIntoView } from './Search.hooks';
import { SearchResult } from './Search.types';
import styles from './SearchSection.styles';

export interface SearchSectionProps {
  label?: string | JSX.Element;
  onClick: (searchResult: SearchResult) => void;
  searchResults: SearchResult[];
  sectionIndex?: number;
  selectedItemIndex?: [number, number];
}

function SearchSection({
  label,
  onClick,
  searchResults,
  sectionIndex,
  selectedItemIndex = [0, -1],
}: SearchSectionProps) {
  const { onFocus, pushRefToArray } = useFocusScrollIntoView({});
  const handleClick = (searchResult: SearchResult) => () => {
    onClick(searchResult);
  };

  return (
    <Grid>
      <GridItem gridColumnS="2/6" gridColumnM="2/8" gridColumnL="3/14">
        {label && <h5 css={styles.eyebrow}>{label}</h5>}
        <ul>
          {searchResults.map((item, index) => {
            const isSelected =
              sectionIndex === selectedItemIndex[0] &&
              index === selectedItemIndex[1];

            return (
              <li css={styles.listItem} key={item.label}>
                <button
                  css={[styles.itemButton, isSelected && styles.isSelected]}
                  onClick={handleClick(item)}
                  onFocus={onFocus(index)}
                  ref={pushRefToArray}
                >
                  {item.labelSegments.map((segment) => (
                    <span
                      key={segment.label}
                      css={[segment.matches && styles.searchQuery]}
                    >
                      {segment.label}
                    </span>
                  ))}
                </button>
                {item.additionalDisplayValue && (
                  <div css={styles.secondaryItemDisplay}>
                    {item.additionalDisplayValue}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </GridItem>
    </Grid>
  );
}

export default SearchSection;
