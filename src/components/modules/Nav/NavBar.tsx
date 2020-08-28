import GridItem from '~/components/global/Grid/GridItem';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import NavLink from '~/components/global/Link/NavLink';
import { buildLinks } from '~/components/modules/Nav/mappers/links';
import { ActionType, LinkType } from '~/components/modules/Nav/Nav.types';
import { useUserPersonalizationContext } from '~/context/UserPersonalization.context';
import { ui } from '~/lib/utils/ui-dictionary';

import { styles } from './Nav.styles';
import { NavThemeObject } from './Nav.theme';
import NavCart from './NavCarButton/NavCart';
import NavSearchButton from './NavSearchButton/NavSearchButton';

interface Props {
  handleOnNavLinkClick: (
    link: LinkType | ActionType,
  ) => (() => void) | undefined;
  handleOnSearchClick: () => void;
  handleOnSubNavClick: () => void;
  isHomepage?: boolean;
  theme: NavThemeObject;
}

function NavBar({
  handleOnNavLinkClick,
  handleOnSearchClick,
  handleOnSubNavClick,
  isHomepage,
  theme: { border, iconColor, linkTheme, textColor },
}: Props) {
  const { locationString } = useUserPersonalizationContext();
  const { links } = buildLinks({ locationString });

  return (
    <GridItem
      as="ul"
      css={[styles.nav, styles.container]}
      gridColumn="4/6"
      gridColumnM="4/8"
      gridColumnL="4/14"
    >
      {!isHomepage && (
        <li css={styles.searchButton}>
          <NavSearchButton
            border={border}
            handleToggleSearch={handleOnSearchClick}
            iconColor={iconColor}
            textColor={textColor}
          />
        </li>
      )}
      {links.map((link, idx) => (
        <li
          css={[styles.listItem, idx === links.length - 1 && styles.lastItem]}
          key={idx}
        >
          <NavLink
            isActive={false}
            onClick={handleOnNavLinkClick(link)}
            theme={linkTheme}
            {...link}
          />
        </li>
      ))}
      <li css={styles.cart}>
        <NavCart linkTheme={linkTheme} />
      </li>
      <li css={[styles.listItem, styles.hamburger]}>
        <button
          aria-label={ui('nav.mobile.label')}
          onClick={handleOnSubNavClick}
        >
          <Icon css={iconColor} name={ICONS.MENU} />
        </button>
      </li>
    </GridItem>
  );
}

export default NavBar;
