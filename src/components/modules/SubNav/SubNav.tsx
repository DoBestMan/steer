import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { SiteMenu } from '~/data/models/SiteMenu';
import { Animation } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import MobileLinks from './MobileLinks';
import styles from './SubNav.styles';
import SubNavContent from './SubNavContent';
import SubNavLinks from './SubNavLinks';
import SubNavModal from './SubNavModal';
import { PseudoOverlay, SubNavOverlay } from './SubNavOverlay';

interface Props extends SiteMenu {
  activeLink: string;
  handleClearCategory: () => void;
  handleCloseSubNav: () => void;
  isMobile: boolean;
  isSubNavOpen: boolean;
}

function SubNav({
  siteMenuBrowseList,
  siteMenuLearn,
  handleClearCategory,
  handleCloseSubNav,
  isMobile,
  isSubNavOpen,
  activeLink,
}: Props) {
  return (
    <>
      <SubNavOverlay isVisible={isSubNavOpen && !isMobile} />
      <SubNavModal
        animation={isMobile ? Animation.FADE : Animation.SLIDE_LEFT}
        contentLabel={`${ui('nav.contentLabel')} - ${activeLink}`}
        onClose={handleCloseSubNav}
        isOpen={isSubNavOpen}
        onExited={handleClearCategory}
        unlockOnClose
      >
        <Grid css={styles.root}>
          <PseudoOverlay onClick={handleCloseSubNav} />
          <GridItem
            fullbleedS
            fullbleedM
            gridColumnL="6/15"
            gridColumnXL="8/15"
            css={styles.subnav}
          >
            {isMobile && (
              <MobileLinks
                siteMenuBrowseList={siteMenuBrowseList}
                onClose={handleCloseSubNav}
                isOpen={isSubNavOpen}
              />
            )}
            <GridItem
              isGrid
              fullbleedS
              fullbleedM
              css={[styles.subnavInnerGrid, activeLink && styles.enableEvents]}
              gridColumnL="4/wrapper-end"
              gridColumnXL="6/wrapper-end"
            >
              <GridItem
                gridColumnM="1/9"
                gridColumnL="1/10"
                gridColumnXL="1/8"
                css={styles.smallHide}
              >
                <SubNavLinks siteMenuBrowseList={siteMenuBrowseList} />
              </GridItem>
              <SubNavContent
                siteMenuBrowseList={siteMenuBrowseList}
                activeLink={activeLink}
                siteMenuLearn={siteMenuLearn}
              />
            </GridItem>
          </GridItem>
        </Grid>
      </SubNavModal>
    </>
  );
}

export default SubNav;
