import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import NavLink from '~/components/global/Link/NavLink';
import { ActionType, LinkType } from '~/components/global/Nav/Nav.constants';
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
    linksMobile,
    links,
  } = useNavContext();
  const breakpoint = useBreakpoints();
  const isMobile = breakpoint === BREAKPOINT_SIZES.S;
  const navLinks = isMobile ? linksMobile : links;
  const iconLinks = navLinks.filter((link) => 'icon' in link && link.icon);
  const textLinks = navLinks.filter((link) => !('icon' in link && link.icon));

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
      <div css={styles.smallShow}>
        <TireCategoryLinks {...{ siteMenuBrowseList }} />
      </div>
      <ul css={styles.subnavLinkList}>
        <span css={styles.linkSection}>{textLinks.map(renderLink)}</span>
        <span css={styles.linkSection}>
          {iconLinks.map(renderLink)}
          <li css={[styles.link, styles.closeSubNav]}>
            <button
              aria-label="Close navigation modal"
              onClick={handleCloseSubNav}
            >
              <Icon name={ICONS.CLOSE} />
            </button>
          </li>
        </span>
      </ul>
    </>
  );
}

export default SubNavLinks;
