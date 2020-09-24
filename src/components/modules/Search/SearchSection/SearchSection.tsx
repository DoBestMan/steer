import { useEffect, useRef } from 'react';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import BaseLink from '~/components/global/Link/BaseLink';
import { SiteSearchResultTextItem } from '~/data/models/SiteSearchResultTextItem';
import { TIME } from '~/lib/constants';

import { useSearchContext } from '../Search.context';
import { useFocusScrollIntoView } from '../Search.hooks';
import { SearchActionType } from '../Search.types';
import styles from './SearchSection.styles';

export interface SearchSectionProps {
  label?: string | JSX.Element;
  onClick?: (searchResult: SiteSearchResultTextItem) => void;
  preventLinkNavigation?: boolean;
  sectionIndex?: number;
  selectedItemIndex?: [number, number];
  siteSearchResultList: SiteSearchResultTextItem[];
}

const CONSTANTS = {
  TOUCH_START_DELAY: TIME.MS100,
};

function SearchSection({
  label,
  onClick,
  siteSearchResultList,
  sectionIndex,
  selectedItemIndex = [0, -1],
}: SearchSectionProps) {
  const isScrolling = useRef(false);
  const { onFocus, pushRefToArray } = useFocusScrollIntoView({});
  const {
    shouldPreventLinkNavigation,
    routeQueryParamOptions,
  } = useSearchContext();

  const handleClick = (searchResult: SiteSearchResultTextItem) => () => {
    if (onClick) {
      onClick(searchResult);
    }
  };

  // We need touchStart in addition to click so that the buttons
  // are selected with a single tap on touch devices.
  const handleTouchStart = (searchResult: SiteSearchResultTextItem) => (
    event: React.TouchEvent,
  ) => {
    event.preventDefault();

    setTimeout(() => {
      if (onClick && !isScrolling.current) {
        onClick(searchResult);
      }
    }, CONSTANTS.TOUCH_START_DELAY);
  };

  // We use this to prevent onTouchStart from triggering if the user is scrolling.
  const handleTouchMove = () => {
    isScrolling.current = true;
  };

  // This is necessary because of a weird Chrome issue.
  // https://github.com/SimpleTire/steer/pull/827
  const handleTouchEnd = (event: React.TouchEvent) => {
    event.preventDefault();
    isScrolling.current = false;
  };

  useEffect(() => {
    if (sectionIndex === selectedItemIndex[0]) {
      onFocus(selectedItemIndex[1])();
    }
  }, [onFocus, sectionIndex, selectedItemIndex]);

  return (
    <Grid css={styles.container}>
      <GridItem gridColumnS="2/6" gridColumnM="2/8" gridColumnL="3/14">
        {label && <h5 css={styles.eyebrow}>{label}</h5>}
        <ul data-testid="search-results">
          {siteSearchResultList.map((item, index) => {
            const isSelected =
              sectionIndex === selectedItemIndex[0] &&
              index === selectedItemIndex[1];

            function innerContent(key: string) {
              return (
                <>
                  {item.labelSegments.length > 0 ? (
                    item.labelSegments.map((segment, i) => {
                      // [WCS-1409] Hyphens will break the text if the first character
                      // Convert to non-breaking hyphens if this happens.
                      if (segment.label[0] === '-') {
                        segment.label = segment.label.replace('-', '‑');
                      }
                      return (
                        <span
                          key={`${key}-${i}`}
                          css={segment.matches && styles.searchQuery}
                        >
                          {segment.label}
                        </span>
                      );
                    })
                  ) : (
                    <span>{item.label}</span>
                  )}
                </>
              );
            }

            if (
              item.action.type === SearchActionType.LINK &&
              !shouldPreventLinkNavigation
            ) {
              const { href, isExternal } = item.action.link;
              return (
                <li
                  className="listItem"
                  key={`${item.label}_${index}`}
                  ref={pushRefToArray(index)}
                >
                  <BaseLink
                    className={`itemButton ${isSelected ? 'isSelected' : ''}`}
                    href={href}
                    isExternal={isExternal}
                    onClick={handleClick(item)}
                    onFocus={onFocus(index)}
                    routeQueryParamOptions={routeQueryParamOptions}
                  >
                    {innerContent(item.label)}
                  </BaseLink>
                  {item.detailLabel && (
                    <div className="secondaryItemDisplay">
                      {item.detailLabel}
                    </div>
                  )}
                </li>
              );
            }

            return (
              <li
                className="listItem"
                key={`${item.label}_${index}`}
                ref={pushRefToArray(index)}
              >
                <button
                  className={`itemButton ${isSelected ? 'isSelected' : ''}`}
                  onClick={handleClick(item)}
                  onFocus={onFocus(index)}
                  onTouchStart={handleTouchStart(item)}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {innerContent(item.label)}
                </button>
                {item.detailLabel && (
                  <div className="secondaryItemDisplay">{item.detailLabel}</div>
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
