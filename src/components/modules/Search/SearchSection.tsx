import { SearchResult } from './Search';
import styles from './SearchSection.styles';

interface Props {
  label?: string | JSX.Element;
  onClick: (searchText: SearchResult) => void;
  query?: string;
  searchResults: SearchResult[];
  sectionIndex?: number;
  selectedItemIndex?: [number, number];
}

function SearchSection({
  query = '',
  label,
  onClick,
  searchResults,
  sectionIndex,
  selectedItemIndex = [0, -1],
}: Props) {
  const handleClick = (searchResult: SearchResult) => () => {
    onClick(searchResult);
  };

  return (
    <div>
      {label && <h5 css={styles.eyebrow}>{label}</h5>}
      <ul>
        {searchResults.map((item, index) => {
          const isSelected =
            sectionIndex === selectedItemIndex[0] &&
            index === selectedItemIndex[1];

          // Display search result with search query highlighted.
          const queryIndex = item.displayValue
            .toUpperCase()
            .indexOf(query.toUpperCase());

          let display = <>{item.displayValue}</>;

          if (queryIndex > -1) {
            const queryStart = item.displayValue.substring(0, queryIndex);
            const queryHighlighted = item.displayValue.substring(
              queryIndex,
              queryIndex + query.length,
            );
            const queryEnd = item.displayValue.substring(
              queryIndex + query.length,
            );

            display = (
              <>
                {queryStart}
                <span css={styles.searchQuery}>{queryHighlighted}</span>
                {queryEnd}
              </>
            );
          }

          return (
            <li css={styles.listItem} key={item.value}>
              <button
                css={[styles.itemButton, isSelected && styles.isSelected]}
                onClick={handleClick(item)}
              >
                {display}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SearchSection;
