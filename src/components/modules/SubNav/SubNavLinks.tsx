import Button from '~/components/global/Button/Button';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import NavLink from '~/components/global/Link/NavLink';
import {
  ActionType,
  data,
  LinkType,
} from '~/components/global/Nav/Nav.constants';
import { useNavContext } from '~/context/Nav.context';
import { SiteMenuBrowseItem } from '~/data/models/SiteMenuBrowseItem';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { BREAKPOINT_SIZES } from '~/lib/constants';

import TireCategoryLinks from './BrowseTires/TireCategoryLinks';
import styles from './SubNav.styles';

interface Props {
  siteMenuBrowseList: SiteMenuBrowseItem[];
}

function SubNavLinks({ siteMenuBrowseList }: Props) {
  const {
    activeLink,
    createSelectLinkHandler,
    handleCloseSubNav,
  } = useNavContext();
  const breakpoint = useBreakpoints();
  const isMobile = breakpoint === BREAKPOINT_SIZES.S;
  const links = isMobile ? data.mobileLinks : data.links;
  const iconLinks = links.filter((link) => link.icon);
  const textLinks = links.filter((link) => !link.icon);

  function renderLink(link: LinkType | ActionType, idx: number) {
    return (
      <li css={styles.link} key={idx}>
        <NavLink
          {...link}
          onClick={createSelectLinkHandler(link)}
          isActive={'target' in link && activeLink === link.target}
        />
      </li>
    );
  }

  return (
    <>
      {isMobile && <TireCategoryLinks {...{ siteMenuBrowseList }} />}
      <ul css={styles.subnavLinkList}>
        <span css={styles.linkSection}>{textLinks.map(renderLink)}</span>
        <span css={styles.linkSection}>
          {iconLinks.map(renderLink)}
          {!isMobile && (
            <li css={styles.link}>
              <Button
                aria-label="Close navigation modal"
                onClick={handleCloseSubNav}
              >
                <Icon name={ICONS.CLOSE} />
              </Button>
            </li>
          )}
        </span>
      </ul>
    </>
  );
}

export default SubNavLinks;
