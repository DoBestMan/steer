import { useEffect, useRef } from 'react';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import LocationContainer from '~/components/modules/Location/LocationContainer';
import { NAV_TARGETS } from '~/components/modules/Nav/Nav.types';
import BrowseTires from '~/components/modules/SubNav/BrowseTires/BrowseTires';
import { useNavContext } from '~/context/Nav.context';
import { SiteMenuBrowseItem } from '~/data/models/SiteMenuBrowseItem';
import { SiteMenuLearn } from '~/data/models/SiteMenuLearn';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { ui } from '~/lib/utils/ui-dictionary';

import LearnContainer from './Learn/Learn.container';
import styles from './SubNav.styles';
import SubNavLinks from './SubNavLinks';
import SubNavModal from './SubNavModal';

interface Props {
  isCustomerServiceEnabled: boolean;
  siteMenuBrowseList: SiteMenuBrowseItem[];
  siteMenuLearn: SiteMenuLearn;
}

function SubNav({
  isCustomerServiceEnabled,
  siteMenuBrowseList,
  siteMenuLearn,
}: Props) {
  const {
    activeCategory,
    handleClearLink,
    handleCloseSubNav,
    createSelectCategoryHandler,
    isSubNavOpen,
    activeLink,
  } = useNavContext();
  const { isMobile } = useBreakpoints();

  const prevLink = useRef(activeLink);
  useEffect(() => {
    if (!activeCategory && !isMobile) {
      createSelectCategoryHandler(siteMenuBrowseList[0].title)();
    }

    // learn link on mobile goes to a separate page, reset active link if browser is resized
    if (isMobile && activeLink === NAV_TARGETS.LEARN) {
      handleClearLink();
      createSelectCategoryHandler('')();
    }
    // don't set focus on first list item if opening subnav
    prevLink.current = activeLink;
  }, [
    activeCategory,
    activeLink,
    createSelectCategoryHandler,
    handleClearLink,
    isMobile,
    siteMenuBrowseList,
  ]);

  return (
    <SubNavModal
      contentLabel={`${ui('nav.contentLabel')} - ${activeLink}`}
      onClose={handleCloseSubNav}
      isOpen={isSubNavOpen}
    >
      <Grid css={styles.root}>
        <button
          aria-label={ui('nav.close')}
          css={[styles.action, styles.close]}
          onClick={handleCloseSubNav}
        >
          <Icon name={ICONS.CLOSE} />
        </button>
        <GridItem
          fullbleedS
          fullbleedM
          gridColumnL="6/15"
          gridColumnXL="8/15"
          css={styles.subnav}
        >
          <div css={styles.border} />
          <SubNavLinks siteMenuBrowseList={siteMenuBrowseList} />
          <GridItem
            isGrid
            fullbleedS
            fullbleedM
            gridColumnL="6/15"
            gridColumnXL="8/15"
            css={styles.subnavInnerGrid}
          >
            {activeLink === NAV_TARGETS.BROWSE_TIRES && (
              <BrowseTires
                shouldSetFocus={!!(prevLink.current === activeLink)}
                siteMenuBrowseList={siteMenuBrowseList}
              />
            )}
            {activeLink === NAV_TARGETS.LEARN && (
              <LearnContainer
                isCustomerServiceEnabled={isCustomerServiceEnabled}
                siteMenuLearn={siteMenuLearn}
              />
            )}
            {activeLink === NAV_TARGETS.LOCATION && (
              <LocationContainer onDismiss={handleCloseSubNav} />
            )}
          </GridItem>
        </GridItem>
      </Grid>
    </SubNavModal>
  );
}

export default SubNav;
