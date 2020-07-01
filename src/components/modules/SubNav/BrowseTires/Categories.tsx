import { useCallback } from 'react';

import GridItem from '~/components/global/Grid/GridItem';
import SubNavContentWrapper from '~/components/modules/SubNav/SubNavContentWrapper';
import { useNavContext } from '~/context/Nav.context';
import { SiteMenuBrowseGroupItem } from '~/data/models/SiteMenuBrowseGroupItem';
import { SiteMenuBrowseItem } from '~/data/models/SiteMenuBrowseItem';
import { typography } from '~/styles/typography.styles';

import styles from './BrowseTires.styles';
import BrowseTiresGroupItem from './BrowseTiresGroupItem';
import CategoryInfo from './CategoryInfo';

interface Props {
  category: string;
  info: SiteMenuBrowseItem['info'];
  isMobile: boolean;
  isOpen: boolean;
  shouldSetFocus: boolean;
  siteMenuBrowseGroupList: SiteMenuBrowseGroupItem[];
}

function Categories({
  category,
  info,
  isOpen,
  isMobile,
  shouldSetFocus,
  siteMenuBrowseGroupList,
}: Props) {
  const {
    activeCategory,
    handleClearCategory,
    handleCloseSubNav,
  } = useNavContext();
  const isSelected = activeCategory === category;
  const focusRef = useCallback(
    (node) => {
      if (isSelected && shouldSetFocus && node !== null) {
        // focus on the first list item element when category is selected
        node.firstChild.focus();
      }
    },
    [isSelected, shouldSetFocus],
  );
  return (
    <SubNavContentWrapper
      isMobile={isMobile}
      contentLabel={category}
      isOpen={isSelected && isOpen}
      onClose={handleCloseSubNav}
      onBack={handleClearCategory}
    >
      <GridItem
        gridColumnM="4/8"
        gridColumnL="4/10"
        gridColumnXL="4/8"
        css={styles.categoryContent}
      >
        <p css={[typography.jumboHeadline, styles.mobileHeader]}>{category}</p>
        {siteMenuBrowseGroupList.map((props, idx) => (
          <BrowseTiresGroupItem
            key={idx}
            focusRef={idx === 0 ? focusRef : undefined}
            {...props}
          />
        ))}
        {info && <CategoryInfo {...info} />}
      </GridItem>
    </SubNavContentWrapper>
  );
}

export default Categories;
