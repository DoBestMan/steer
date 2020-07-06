import { select } from '@storybook/addon-knobs';

import { COLORS, THEME } from '~/lib/constants';

import BreadcrumbsComponent, { BreadcrumbsItem } from './Breadcrumbs';

export default {
  component: BreadcrumbsComponent,
  title: 'Global/Breadcrumbs',
};

const mockNavigationData: BreadcrumbsItem[] = [
  {
    label: 'Home',
    url: '/',
  },
  {
    label: 'All Brands',
    url: '/all-brands',
  },
  {
    label: 'Continental',
    url: '/continental',
  },
  {
    label: 'ProContact Tire Line',
    url: '/continental/pro-contact',
  },
  {
    label: '215/55R16',
    url: '/continental/pro-contact/?size=215/55R16',
  },
];

export function Breadcrumbs() {
  const theme = select(
    'Theme',
    [THEME.LIGHT, THEME.DARK, THEME.ORANGE],
    THEME.LIGHT,
  );

  const themeMap = {
    [THEME.DARK]: COLORS.GLOBAL.BLACK,
    [THEME.LIGHT]: COLORS.GLOBAL.WHITE,
    [THEME.ORANGE]: COLORS.GLOBAL.ORANGE,
  };

  const backgroundColor = themeMap[theme];

  return (
    <div css={{ backgroundColor, height: '100vh' }}>
      <BreadcrumbsComponent
        navigationItems={mockNavigationData}
        theme={theme}
      />
    </div>
  );
}
