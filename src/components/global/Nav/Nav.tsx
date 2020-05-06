import Button from '~/components/global/Button/Button';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Image from '~/components/global/Image/Image';
import BaseLink from '~/components/global/Link/BaseLink';
import NavLink from '~/components/global/Link/NavLink';
import { data } from '~/components/global/Nav/Nav.data';
import { layout } from '~/styles/layout.styles';

import { useNavState } from './Nav.container';
import styles from './Nav.styles';
import NavSearchButton from './NavSearchBar/NavSearchButton';

interface Props {
  isHomepage?: boolean;
}

const CONSTANTS = {
  LOGO_ALT_TEXT: 'Simple Tire',
  MOBILE_MENU_ARIA_LABEL: 'Mobile menu',
};

function Nav({ isHomepage }: Props) {
  const { isSubNavOpen, toggleSubNav, createSelectLinkHandler } = useNavState();
  return (
    <Grid as="nav" css={styles.root}>
      <GridItem css={layout.container} gridColumn="2/4">
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
        css={styles.links}
        gridColumn="4/6"
        gridColumnM="4/8"
        gridColumnL="4/14"
      >
        {!isHomepage && (
          <li css={styles.searchButton}>
            <NavSearchButton />
          </li>
        )}
        {!isSubNavOpen &&
          data.links.map((link, idx) => {
            return (
              <li css={styles.listItem} key={idx}>
                <NavLink
                  isActive={false}
                  onClick={createSelectLinkHandler(link.text || '')}
                  {...link}
                />
              </li>
            );
          })}
        <li css={[styles.listItem, styles.hamburger]}>
          <Button
            aria-label={CONSTANTS.MOBILE_MENU_ARIA_LABEL}
            onClick={toggleSubNav}
          >
            <Icon name={ICONS.MENU} />
          </Button>
        </li>
      </GridItem>
    </Grid>
  );
}

export default Nav;
