import { ICONS } from '~/components/global/Icon/Icon.constants';
import Link from '~/components/global/Link/Link';
import NavLink from '~/components/global/Link/NavLink';
import { ActionType, LinkType } from '~/components/modules/Nav/Nav.types';
import { useNavContext } from '~/context/Nav.context';
import { SiteMenu } from '~/data/models/SiteMenu';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import TireCategoryLinks from './BrowseTires/TireCategoryLinks';
import styles from './SubNav.styles';

function SubNavLinks({
  siteMenuBrowseList,
  ...rest
}: Pick<SiteMenu, 'siteMenuBrowseList'>) {
  const {
    activeLink,
    createSelectLinkHandler,
    handleCloseSubNav,
    linksMobile,
    links,
  } = useNavContext();
  const { isMobile } = useBreakpoints();
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
      <ul css={styles.subnavLinkList} {...rest}>
        <span css={styles.linkSection}>{textLinks.map(renderLink)}</span>
        <span css={[styles.linkSection, styles.linkSectionIcons]}>
          {iconLinks.map(renderLink)}
          <li css={styles.link}>
            <Link
              as="button"
              icon={ICONS.CLOSE}
              theme={THEME.LIGHT}
              aria-label={ui('nav.close')}
              onClick={handleCloseSubNav}
              css={styles.closeSubNav}
            />
          </li>
        </span>
      </ul>
    </>
  );
}

export default SubNavLinks;
