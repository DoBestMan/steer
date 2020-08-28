import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { NAV_TARGETS } from '~/components/modules/Nav/Nav.types';
import SubNav from '~/components/modules/SubNav/SubNav';
import { useNavContext } from '~/context/Nav.context';
import { SiteMenu } from '~/data/models/SiteMenu';
import { useBreakpoints } from '~/hooks/useBreakpoints';

function SubNavContainer({ siteMenuBrowseList, siteMenuLearn }: SiteMenu) {
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
    <SubNav
      siteMenuBrowseList={siteMenuBrowseList}
      siteMenuLearn={siteMenuLearn}
      handleClearCategory={handleClearCategory}
      handleCloseSubNav={handleCloseSubNav}
      isSubNavOpen={isSubNavOpen}
      activeLink={activeLink}
      isMobile={isMobile}
    />
  );
}

export default SubNavContainer;
