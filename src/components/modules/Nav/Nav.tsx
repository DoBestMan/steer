import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Image from '~/components/global/Image/Image';
import BaseLink from '~/components/global/Link/BaseLink';
import NavLink from '~/components/global/Link/NavLink';
import { useNavContext } from '~/context/Nav.context';
import { ui } from '~/lib/utils/ui-dictionary';
import { layout } from '~/styles/layout.styles';

import styles from './Nav.styles';
import NavSearchButton from './NavSearchButton/NavSearchButton';

interface Props {
  isHomepage?: boolean;
}

const CONSTANTS = {
  LOGO_ALT_TEXT: ui('logo.alt'),
  MOBILE_MENU_ARIA_LABEL: ui('nav.mobile.label'),
};

function Nav({ isHomepage }: Props) {
  const { links, toggleSubNav, createSelectLinkHandler } = useNavContext();

  return (
    <Grid as="nav" css={styles.root}>
      <GridItem css={[layout.container, styles.container]} gridColumn="2/4">
        <BaseLink href="/" css={[layout.container, layout.centeredVertical]}>
          <Image
            altText={CONSTANTS.LOGO_ALT_TEXT}
            css={styles.logo}
            srcSet="/static/assets/logo.svg"
          />
        </BaseLink>
      </GridItem>
      <GridItem
        as="ul"
        css={[styles.nav, styles.container]}
        gridColumn="4/6"
        gridColumnM="4/8"
        gridColumnL="4/14"
      >
        {!isHomepage && (
          <li css={styles.searchButton}>
            <NavSearchButton />
          </li>
        )}
        {links.map((link, idx) => (
          <li
            css={[
              styles.listItem,
              !isHomepage && styles.listItemNotHomepage,
              idx === links.length - 1 && styles.lastItem,
            ]}
            key={idx}
          >
            <NavLink
              isActive={false}
              onClick={createSelectLinkHandler(link)}
              {...link}
            />
          </li>
        ))}
        <li css={[styles.listItem, styles.hamburger]}>
          <button
            aria-label={CONSTANTS.MOBILE_MENU_ARIA_LABEL}
            onClick={toggleSubNav}
          >
            <Icon name={ICONS.MENU} />
          </button>
        </li>
      </GridItem>
    </Grid>
  );
}

export default Nav;
