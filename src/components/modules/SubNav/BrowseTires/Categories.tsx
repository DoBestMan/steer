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
  siteMenuBrowseGroupList: SiteMenuBrowseGroupItem[];
}

function Categories({
  category,
  info,
  isOpen,
  isMobile,
  siteMenuBrowseGroupList,
}: Props) {
  const {
    activeCategory,
    handleClearCategory,
    handleCloseSubNav,
  } = useNavContext();
  const isSelected = activeCategory === category;
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
        gridColumnL="5/9"
        gridColumnXL="4/7"
        css={styles.categoryContent}
      >
        <p css={[typography.jumboHeadline, styles.mobileHeader]}>{category}</p>
        {siteMenuBrowseGroupList.map((props, idx) => (
          <BrowseTiresGroupItem key={idx} {...props} />
        ))}
        {info && <CategoryInfo {...info} />}
      </GridItem>
    </SubNavContentWrapper>
  );
}

export default Categories;
