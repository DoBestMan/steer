import { action } from '@storybook/addon-actions';
import { boolean, number, select } from '@storybook/addon-knobs';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Image from '~/components/global/Image/Image';
import { buildLinks } from '~/context/Nav.context';
import { COLORS } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';
import { layout } from '~/styles/layout.styles';

import { styles } from './Nav.styles';
import { alternateTheme, defaultTheme } from './Nav.theme';
import NavBar from './NavBar';

export default {
  component: NavBar,
  title: 'Nav/NavBar',
};

const { links } = buildLinks({ locationString: 'Brooklyn, NY' });

const themes = {
  default: 'defaultTheme',
  alternate: 'alternateTheme',
};

const themesMap = {
  [themes.default]: { props: defaultTheme, bgColor: 'transparent' },
  [themes.alternate]: {
    props: alternateTheme,
    bgColor: COLORS.GLOBAL.ORANGE,
  },
};

const options = {
  range: true,
  min: 0,
  max: 10,
  step: 1,
};

const fakeHandleNavClick = () => action('click-toggle-nav');

export function NavWithKnobs() {
  const theme = select('Theme', themes, themes.default);

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
        links={links}
        numberOfCartItems={number('Numbr of cart items', 4, options)}
        theme={themesMap[theme].props}
      />
    </Grid>
  );
}
