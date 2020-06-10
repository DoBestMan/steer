import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import BaseLink from '~/components/global/Link/BaseLink';
import { SiteSearchResultTextItem } from '~/data/models/SiteSearchResultTextItem';

import { useFocusScrollIntoView } from './Search.hooks';
import { SearchActionType } from './Search.types';
import styles from './SearchSection.styles';

export interface SearchSectionProps {
  label?: string | JSX.Element;
  onClick: (searchResult: SiteSearchResultTextItem) => void;
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
  const handleClick = (searchResult: SiteSearchResultTextItem) => () => {
    onClick(searchResult);
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
                {item.labelSegments.map((segment) => (
                  <span
                    key={segment.label}
                    css={[segment.matches && styles.searchQuery]}
                  >
                    {segment.label}
                  </span>
                ))}
              </>
            );

            if (item.action.type === SearchActionType.LINK) {
              const { href, isExternal } = item.action.link;
              return (
                <li css={styles.listItem} key={item.label} ref={pushRefToArray}>
                  <BaseLink
                    css={[styles.itemButton, isSelected && styles.isSelected]}
                    href={href}
                    isExternal={isExternal}
                    onFocus={onFocus(index)}
                  >
                    {innerContent}
                  </BaseLink>
                </li>
              );
            }

            return (
              <li css={styles.listItem} key={item.label} ref={pushRefToArray}>
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
