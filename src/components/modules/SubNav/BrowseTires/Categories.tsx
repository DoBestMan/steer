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
  shouldSetFocus: boolean;
  siteMenuBrowseGroupList: SiteMenuBrowseGroupItem[];
}

function Categories({
  category,
  info,
  shouldSetFocus,
  siteMenuBrowseGroupList,
}: Props) {
  const {
    activeCategory,
    handleClearCategory,
    handleCloseSubNav,
  } = useNavContext();
  const focusRef = useCallback(
    (node) => {
      if (shouldSetFocus && node !== null) {
        // focus on the first list item element when category is selected
        node.firstChild.focus();
      }
    },
    [shouldSetFocus],
  );

  if (activeCategory !== category) {
    return null;
  }
  return (
    <GridItem gridColumnM="3/7" gridColumnL="4/10" gridColumnXL="4/8">
      <SubNavContentWrapper
        contentLabel={category}
        isOpen={activeCategory === category}
        onClose={handleCloseSubNav}
        onBack={handleClearCategory}
      >
        <div css={styles.content}>
          <h1 css={[typography.jumboHeadline, styles.mobileHeader]}>
            {category}
          </h1>
          {siteMenuBrowseGroupList.map((props, idx) => (
            <BrowseTiresGroupItem
              key={idx}
              focusRef={idx === 0 ? focusRef : undefined}
              {...props}
            />
          ))}
          {info && <CategoryInfo {...info} />}
        </div>
      </SubNavContentWrapper>
    </GridItem>
  );
}

export default Categories;
