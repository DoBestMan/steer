import { Transition } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';

import { SiteSearchResultGroup } from '~/data/models/SiteSearchResultGroup';
import { SiteSearchResultImageItem } from '~/data/models/SiteSearchResultImageItem';
import { SiteSearchResultTextItem } from '~/data/models/SiteSearchResultTextItem';

import { SearchResult, SearchResultEnum } from '../Search.types';
import SearchCarousel from '../SearchCarousel/SearchCarousel';
import SearchSection from '../SearchSection/SearchSection';
import styles from './SearchResults.styles';

export interface Props {
  handleValueSelection: (value: SearchResult) => void;
  hasActiveSearchState: boolean;
  queryText: string;
  results: SiteSearchResultGroup[];
  selectedItemIndex: [number, number];
  shouldShowListbox: boolean;
}

function SearchResults({
  handleValueSelection,
  hasActiveSearchState,
  queryText,
  results,
  selectedItemIndex,
  shouldShowListbox,
}: Props) {
  return (
    <Transition
      appear
      mountOnEnter
      unmountOnExit
      in={shouldShowListbox}
      timeout={0}
    >
      {(searchTransitionState: TransitionStatus) => {
        const animationStyles = [
          styles.listboxRoot,
          hasActiveSearchState &&
            queryText.length === 0 &&
            styles[`listbox_${searchTransitionState}`],
        ];

        return (
          <ul css={animationStyles} data-testid="search-autocomplete-results">
            {results.map((searchGroup: SiteSearchResultGroup, index) => {
              // We can assume that all items in the list have the same type.
              const isCarousel =
                searchGroup.siteSearchResultList[0].type ===
                SearchResultEnum.IMAGE;

              return (
                <li css={styles.searchResultsGridItem} key={index}>
                  {isCarousel ? (
                    <SearchCarousel
                      label={searchGroup.label}
                      siteSearchResultList={
                        searchGroup.siteSearchResultList as SiteSearchResultImageItem[]
                      }
                      onClick={handleValueSelection}
                    />
                  ) : (
                    <SearchSection
                      label={searchGroup.label}
                      siteSearchResultList={
                        searchGroup.siteSearchResultList as SiteSearchResultTextItem[]
                      }
                      onClick={handleValueSelection}
                      sectionIndex={index}
                      selectedItemIndex={selectedItemIndex}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        );
      }}
    </Transition>
  );
}

export default SearchResults;
