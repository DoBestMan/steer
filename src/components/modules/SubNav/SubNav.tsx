import Button from '~/components/global/Button/Button';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import BrowseTires from '~/components/modules/SubNav/BrowseTires/BrowseTires';
import { SiteMenuBrowseItem } from '~/data/models/SiteMenuBrowseItem';
import { SiteMenuLearn } from '~/data/models/SiteMenuLearn';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { BREAKPOINT_SIZES } from '~/lib/constants';

import Learn from './Learn';
import useSelectCategory from './SubNav.hooks';
import styles from './SubNav.styles';
import SubNavLinks from './SubNavLinks';

interface Props {
  siteMenuBrowseList: SiteMenuBrowseItem[];
  siteMenuLearn: SiteMenuLearn;
}

function handleCloseSubNav() {
  // TODO: do the thing
}

function SubNav({ siteMenuBrowseList, siteMenuLearn }: Props) {
  const {
    selectedLink,
    handleSelectLink,
    onClearSelectedLink,
  } = useSelectCategory();
  const breakpoint = useBreakpoints();
  const isMobile = breakpoint === BREAKPOINT_SIZES.S;
  return (
    <Grid css={styles.root}>
      {isMobile && (
        <div css={styles.close}>
          <Button onClick={handleCloseSubNav} css={styles.action}>
            <Icon name={ICONS.CLOSE} />
          </Button>
        </div>
      )}
      <GridItem isGrid fullbleedS gridColumnL="8/15" css={styles.subnav}>
        <SubNavLinks
          {...{
            onClearSelectedLink,
            onClick: handleSelectLink,
            selectedLink,
            siteMenuBrowseList,
          }}
        />
        <BrowseTires
          onClearSelectedLink={onClearSelectedLink}
          selectedLink={selectedLink}
          siteMenuBrowseList={siteMenuBrowseList}
        />
        <Learn
          onClearSelectedLink={onClearSelectedLink}
          selectedLink={selectedLink}
          siteMenuLearn={siteMenuLearn}
        />
      </GridItem>
    </Grid>
  );
}

export default SubNav;
