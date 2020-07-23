import { useRouter } from 'next/router';
import { useEffect } from 'react';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { NAV_TARGETS } from '~/components/modules/Nav/Nav.types';
import { useNavContext } from '~/context/Nav.context';
import { SiteMenu } from '~/data/models/SiteMenu';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { Animation } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import MobileLinks from './MobileLinks';
import styles from './SubNav.styles';
import SubNavContent from './SubNavContent';
import SubNavLinks from './SubNavLinks';
import SubNavModal from './SubNavModal';
import { PseudoOverlay, SubNavOverlay } from './SubNavOverlay';

function SubNav({ siteMenuBrowseList, siteMenuLearn }: SiteMenu) {
  const {
    activeCategory,
    handleClearLink,
    handleCloseSubNav,
    handleClearCategory,
    createSelectCategoryHandler,
    isSubNavOpen,
    activeLink,
  } = useNavContext();
  const { isMobile } = useBreakpoints();

  const router = useRouter();
  router.events?.on('routeChangeStart', handleCloseSubNav); // always close subnav when we change routes

  useEffect(() => {
    if (!isSubNavOpen) {
      return;
    }

    // set default category on larger breakpoints
    if (!activeCategory && !isMobile) {
      createSelectCategoryHandler(siteMenuBrowseList[0].title)();
    }

    // learn link on mobile goes to a separate page, reset active link if browser is resized
    if (isMobile && activeLink === NAV_TARGETS.LEARN) {
      handleClearLink();
      createSelectCategoryHandler('')();
    }
  }, [
    activeCategory,
    activeLink,
    isSubNavOpen,
    createSelectCategoryHandler,
    handleClearLink,
    isMobile,
    siteMenuBrowseList,
  ]);

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
