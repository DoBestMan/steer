import { ThemeProvider } from 'emotion-theming';
import { useRouter } from 'next/router';

import SubNav from '~/components/modules/SubNav/SubNav';
import { useSiteMenuContext } from '~/context/SiteMenu.context';
import { ROUTE_MAP, ROUTES } from '~/lib/constants';
import { trimSlash } from '~/lib/utils/routes';

import Nav from './Nav';
import { alternateTheme, defaultTheme } from './Nav.theme';

interface Props {
  isHomepage?: boolean;
}

const ALTERNATE_THEME_ROUTES: string[] = [
  trimSlash(ROUTE_MAP[ROUTES.BRAND_CATEGORY]),
  trimSlash(ROUTE_MAP[ROUTES.TIRE_CATEGORY]),
  trimSlash(ROUTE_MAP[ROUTES.TIRE_REVIEWS]),
  trimSlash(ROUTE_MAP[ROUTES.BRAND_REVIEWS]),
  trimSlash(ROUTE_MAP[ROUTES.CATEGORY_REVIEWS]),
  trimSlash(ROUTE_MAP[ROUTES.TYPE_REVIEWS]),
];

function NavContainer({ isHomepage = false }: Props) {
  const { pathname } = useRouter();
  const siteMenu = useSiteMenuContext();
  const isAlternateTheme = ALTERNATE_THEME_ROUTES.includes(trimSlash(pathname));

  return (
    <ThemeProvider theme={isAlternateTheme ? alternateTheme : defaultTheme}>
      <Nav isHomepage={isHomepage} />
      <SubNav {...siteMenu} />
    </ThemeProvider>
  );
}

export default NavContainer;
