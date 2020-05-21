import { useEffect, useRef } from 'react';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import LocationContainer from '~/components/modules/Location/LocationContainer';
import { NAV_TARGETS } from '~/components/modules/Nav/Nav.types';
import BrowseTires from '~/components/modules/SubNav/BrowseTires/BrowseTires';
import { useNavContext } from '~/context/Nav.context';
import { SiteMenu } from '~/data/models/SiteMenu';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { ui } from '~/lib/utils/ui-dictionary';

import LearnContainer from './Learn/Learn.container';
import styles, { Animation } from './SubNav.styles';
import SubNavLinks from './SubNavLinks';
import SubNavModal from './SubNavModal';

function SubNav({ siteMenuBrowseList, siteMenuLearn }: SiteMenu) {
  const {
    activeCategory,
    handleClearLink,
    handleCloseSubNav,
    createSelectCategoryHandler,
    isSubNavOpen,
    activeLink,
  } = useNavContext();
  const { isMobile } = useBreakpoints();

  const prevCategory = useRef(activeCategory);
  useEffect(() => {
    if (!isSubNavOpen) {
      return;
    }
    prevCategory.current = activeCategory;

    // set default category on larger breakpoints
    if (!activeCategory && !isMobile) {
      createSelectCategoryHandler(siteMenuBrowseList[0].title)();
    }

    // learn link on mobile goes to a separate page, reset active link if browser is resized
    if (isMobile && activeLink === NAV_TARGETS.LEARN) {
      handleClearLink();
      createSelectCategoryHandler('')();
    }
    // only set focus on list item when selecting a new category
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
    <SubNavModal
      animation={isMobile ? Animation.FADE : Animation.SLIDE_LEFT}
      contentLabel={`${ui('nav.contentLabel')} - ${activeLink}`}
      onClose={handleCloseSubNav}
      isOpen={isSubNavOpen}
    >
      <Grid css={styles.root}>
        <GridItem
          fullbleedS
          fullbleedM
          gridColumnL="6/15"
          gridColumnXL="8/15"
          css={[styles.subnav, isSubNavOpen && styles.subnavOpen]}
        >
          <button
            aria-label={ui('nav.close')}
            css={[styles.action, styles.close]}
            onClick={handleCloseSubNav}
          >
            <Icon name={ICONS.CLOSE} />
          </button>
          <div css={styles.border} />
          <SubNavLinks
            siteMenuBrowseList={siteMenuBrowseList}
            css={styles.smallShow}
          />
          <GridItem
            isGrid
            fullbleedS
            fullbleedM
            gridColumnL="6/15"
            gridColumnXL="8/15"
            css={styles.subnavInnerGrid}
          >
            <GridItem css={styles.smallHide}>
              <SubNavLinks siteMenuBrowseList={siteMenuBrowseList} />
            </GridItem>
            {activeLink === NAV_TARGETS.BROWSE_TIRES && (
              <BrowseTires
                isMobile={isMobile}
                shouldSetFocus={
                  !!(
                    prevCategory.current ||
                    (prevCategory.current &&
                      prevCategory.current !== activeCategory)
                  )
                }
                siteMenuBrowseList={siteMenuBrowseList}
              />
            )}
            {activeLink === NAV_TARGETS.LEARN && (
              <LearnContainer
                isMobile={isMobile}
                siteMenuLearn={siteMenuLearn}
              />
            )}
            <LocationContainer isMobile={isMobile} />
          </GridItem>
        </GridItem>
      </Grid>
    </SubNavModal>
  );
}

export default SubNav;
