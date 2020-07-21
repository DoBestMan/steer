import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import BaseLink from '~/components/global/Link/BaseLink';
import { SiteSearchResultTextItem } from '~/data/models/SiteSearchResultTextItem';

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

function SearchSection({
  label,
  onClick,
  siteSearchResultList,
  sectionIndex,
  selectedItemIndex = [0, -1],
}: SearchSectionProps) {
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

  return (
    <Grid>
      <GridItem gridColumnS="2/6" gridColumnM="2/8" gridColumnL="3/14">
        {label && <h5 css={styles.eyebrow}>{label}</h5>}
        <ul>
          {siteSearchResultList.map((item, index) => {
            const isSelected =
              sectionIndex === selectedItemIndex[0] &&
              index === selectedItemIndex[1];

            const innerContent = (
              <>
                {item.labelSegments.length > 0 ? (
                  item.labelSegments.map((segment, i) => (
                    <span key={i} css={[segment.matches && styles.searchQuery]}>
                      {segment.label}
                    </span>
                  ))
                ) : (
                  <span>{item.label}</span>
                )}
              </>
            );

            if (
              item.action.type === SearchActionType.LINK &&
              !shouldPreventLinkNavigation
            ) {
              const { href, isExternal } = item.action.link;
              return (
                <li css={styles.listItem} key={index} ref={pushRefToArray}>
                  <BaseLink
                    css={[styles.itemButton, isSelected && styles.isSelected]}
                    href={href}
                    isExternal={isExternal}
                    onClick={handleClick(item)}
                    onFocus={onFocus(index)}
                    routeQueryParamOptions={routeQueryParamOptions}
                  >
                    {innerContent}
                  </BaseLink>
                  {item.detailLabel && (
                    <div css={styles.secondaryItemDisplay}>
                      {item.detailLabel}
                    </div>
                  )}
                </li>
              );
            }

            return (
              <li css={styles.listItem} key={index} ref={pushRefToArray}>
                <button
                  css={[styles.itemButton, isSelected && styles.isSelected]}
                  onClick={handleClick(item)}
                  onFocus={onFocus(index)}
                >
                  {innerContent}
                </button>
                {item.detailLabel && (
                  <div css={styles.secondaryItemDisplay}>
                    {item.detailLabel}
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
