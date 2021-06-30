import { useRouter } from 'next/router';
import React from 'react';

import { ICONS } from '~/components/global/Icon/Icon.constants';
import Link from '~/components/global/Link/Link';
import NavLink from '~/components/global/Link/NavLink';
import { buildLinks } from '~/components/modules/Nav/mappers/links';
import { ActionType, LinkType } from '~/components/modules/Nav/Nav.types';
import { useNavContext } from '~/context/Nav.context';
import { useUserPersonalizationContext } from '~/context/UserPersonalization.context';
import { SiteMenu } from '~/data/models/SiteMenu';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { THEME } from '~/lib/constants';
import { checkSSOTokenInCookie, getSSOLoginURL } from '~/lib/utils/sso';
import { ui } from '~/lib/utils/ui-dictionary';

import { useAccountContext } from '../Account/Account.context';
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
  } = useNavContext();
  const { isMobile } = useBreakpoints();
  const { handleLogout } = useAccountContext();
  const {
    locationString,
    setBrowserLocationFailed,
  } = useUserPersonalizationContext();
  const { links, linksMobile } = buildLinks({ locationString });

  const navLinks = isMobile ? linksMobile : links;
  const iconLinks = navLinks.filter((link) => !!link.icon);
  const textLinks = navLinks.filter((link) => !link.icon);
  const isLocation = activeLink === 'LOCATION';
  const onSubNavClose = () => {
    handleCloseSubNav();
    if (setBrowserLocationFailed) {
      setBrowserLocationFailed(false);
    }
  };
  const router = useRouter();

  // this method is seprately created for mobile version
  // since NavLink is designed to work with navigation within steer
  // this method handles to remove local cookies, redirects to/from SSO etc
  const handleLinkClick = (linkName: string) => {
    if (linkName === ui('links.logout')) {
      handleLogout();
      return;
    } else if (linkName === ui('links.account')) {
      const ssoTokenInCookie = checkSSOTokenInCookie();
      const redirectURL = getSSOLoginURL();
      if (!ssoTokenInCookie) {
        window.location.href = redirectURL;
      } else {
        router.push({ pathname: redirectURL });
      }
      return;
    }
  };

  function renderLink(link: LinkType | ActionType, idx: number) {
    return isLocation ? null : (
      <li css={styles.link} key={idx}>
        <NavLink
          {...link}
          onClick={createSelectLinkHandler(link)}
          isActive={'target' in link && activeLink === link.target}
        />
      </li>
    );
  }

  function renderLinksForSSO(link: LinkType, idx: number) {
    return (
      <button
        css={styles.ssoLink}
        onClick={() => handleLinkClick(link.text ? link.text : '')}
        key={idx}
      >
        {link.text}
      </button>
    );
  }

  return (
    <>
      <div css={styles.smallShow}>
        <TireCategoryLinks {...{ siteMenuBrowseList }} />
      </div>
      <ul
        css={[styles.subnavLinkList, isLocation && styles.locationNav]}
        {...rest}
      >
        <span css={styles.linkSection}>
          {textLinks.map((item, index) =>
            item.text === ui('links.account') ||
            item.text === ui('links.logout')
              ? renderLinksForSSO(item as LinkType, index)
              : renderLink(item, index),
          )}
        </span>
        <span css={[styles.linkSection, styles.linkSectionIcons]}>
          {iconLinks.map(renderLink)}
          <li css={styles.link}>
            <Link
              as="button"
              icon={ICONS.CLOSE}
              theme={THEME.LIGHT}
              aria-label={`${ui('nav.close')} ${activeLink}`}
              onClick={onSubNavClose}
              css={styles.closeSubNav}
            />
          </li>
        </span>
      </ul>
    </>
  );
}

export default SubNavLinks;
