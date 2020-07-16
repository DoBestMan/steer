import { SiteMenu } from '~/data/models/SiteMenu';
import { useBreakpoints } from '~/hooks/useBreakpoints';

import LocationContainer from '../Location/LocationContainer';
import { NAV_TARGETS } from '../Nav/Nav.types';
import Account from './Account/Account';
import BrowseTires from './BrowseTires/BrowseTires';
import LearnContainer from './Learn/Learn.container';

interface Props extends SiteMenu {
  activeLink: string;
  shouldSetFocus: boolean;
}
export default function SubNavContent({
  activeLink,
  shouldSetFocus,
  siteMenuLearn,
  siteMenuBrowseList,
}: Props) {
  const { isMobile } = useBreakpoints();
  return (
    <>
      <BrowseTires
        isOpen={activeLink === NAV_TARGETS.BROWSE_TIRES}
        isMobile={isMobile}
        shouldSetFocus={shouldSetFocus}
        siteMenuBrowseList={siteMenuBrowseList}
      />
      <LearnContainer
        isOpen={activeLink === NAV_TARGETS.LEARN}
        isMobile={isMobile}
        siteMenuLearn={siteMenuLearn}
      />
      <LocationContainer isMobile={isMobile} />
      <Account isOpen={activeLink === NAV_TARGETS.ACCOUNT} />
    </>
  );
}
