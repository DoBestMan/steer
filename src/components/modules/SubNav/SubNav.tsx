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
import { UserPersonalizationUpdate } from '~/data/models/UserPersonalizationUpdate';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { ui } from '~/lib/utils/ui-dictionary';

import Learn from './Learn/Learn';
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
    updateLocation,
    userPersonalizationData,
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

  // TODO Final error functionality
  // https://simpletire.atlassian.net/browse/WCS-127
  function onCurrentLocationError(error: string) {
    console.error(error);
  }

  // TODO Final success functionality
  // https://simpletire.atlassian.net/browse/WCS-127
  // Not: THis function is getting called repeatedly right now in the "Use Current Location" flow.
  // Hopefully this will resolve itself after the flow is fully wired up and the location component unmounts. -SM
  function onLocationChangeSuccess(location: UserPersonalizationUpdate) {
    updateLocation(location);
  }

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
        <GridItem fullbleedS fullbleedM gridColumnL="8/15" css={styles.subnav}>
          <div css={styles.border} />
          <SubNavLinks siteMenuBrowseList={siteMenuBrowseList} />
          <GridItem isGrid fullbleedS fullbleedM gridColumnL="8/15">
            {activeLink === NAV_TARGETS.BROWSE_TIRES && (
              <BrowseTires
                shouldSetFocus={!!(prevLink.current === activeLink)}
                siteMenuBrowseList={siteMenuBrowseList}
              />
            )}
            {activeLink === NAV_TARGETS.LEARN && (
              <Learn
                isCustomerServiceEnabled={isCustomerServiceEnabled}
                siteMenuLearn={siteMenuLearn}
              />
            )}
            {/* Temporarily hiding on mobile until final UI implementation
                TODO https://simpletire.atlassian.net/browse/WCS-127 */}
            {activeLink === NAV_TARGETS.LOCATION && !isMobile && (
              <LocationContainer
                currentLocation={userPersonalizationData?.userLocation ?? null}
                onCurrentLocationError={onCurrentLocationError}
                onLocationChangeSuccess={onLocationChangeSuccess}
              />
            )}
          </GridItem>
        </GridItem>
      </Grid>
    </SubNavModal>
  );
}

export default SubNav;
