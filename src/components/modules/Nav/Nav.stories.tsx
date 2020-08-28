import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Image from '~/components/global/Image/Image';
import { COLORS } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';
import { layout } from '~/styles/layout.styles';

import { styles } from './Nav.styles';
import { NAV_THEME, themes } from './Nav.theme';
import NavBar from './NavBar';

export default {
  component: NavBar,
  title: 'Nav/NavBar',
};

const themesMap = {
  [NAV_THEME.DEFAULT]: {
    props: themes[NAV_THEME.DEFAULT],
    bgColor: 'transparent',
  },
  [NAV_THEME.ALTERNATE]: {
    props: themes[NAV_THEME.ALTERNATE],
    bgColor: COLORS.GLOBAL.ORANGE,
  },
};

const fakeHandleNavClick = () => action('click-toggle-nav');

export function NavWithKnobs() {
  const theme = select('Theme', NAV_THEME, NAV_THEME.ALTERNATE);

  return (
    <Grid css={[styles.root, { backgroundColor: themesMap[theme].bgColor }]}>
      <GridItem css={[layout.container, styles.container]} gridColumn="2/4">
        <div css={[layout.container, layout.centeredVertical]}>
          <Image
            altText={ui('logo.alt')}
            css={styles.logo}
            src={themesMap[theme].props.logoUrl}
          />
        </div>
      </GridItem>
      <NavBar
        handleOnNavLinkClick={fakeHandleNavClick}
        handleOnSearchClick={action('click-toggle-search')}
        handleOnSubNavClick={action('click-toggle-subNav')}
        isHomepage={boolean('Is Homepage', true)}
        theme={themesMap[theme].props}
      />
    </Grid>
  );
}
