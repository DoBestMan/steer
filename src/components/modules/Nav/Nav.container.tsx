import { ThemeProvider } from 'emotion-theming';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { CookiesProvider } from 'react-cookie';

import { useNavContext } from '~/context/Nav.context';
import { ROUTE_MAP, ROUTES } from '~/lib/constants';
import { trimSlash } from '~/lib/utils/routes';

import Nav from './Nav';
import { NAV_THEME, themes } from './Nav.theme';

interface Props {
  isHomepage?: boolean;
  isPLA?: boolean;
}

const ALTERNATE_THEME_ROUTES: string[] = [
  trimSlash(ROUTE_MAP[ROUTES.TIRE_REVIEWS]),
  trimSlash(ROUTE_MAP[ROUTES.BRAND_REVIEWS]),
  trimSlash(ROUTE_MAP[ROUTES.CATEGORY_REVIEWS]),
  trimSlash(ROUTE_MAP[ROUTES.TYPE_REVIEWS]),
];

function NavContainer({ isHomepage = false, isPLA = false }: Props) {
  const { pathname } = useRouter();
  const { setNavTheme, theme } = useNavContext();

  /**
   * Change the nav theme based on the route.
   * This is the primary way we manage the Nav theme. However, on Catalog pages
   * we also depend on the API response (if results but no Top Picks, the Nav
   * appears on an orange background). This is managed in the `CatalogPage`
   * component.
   */
  useEffect(() => {
    const trimmedRoute = trimSlash(pathname);
    const isAlternateTheme = ALTERNATE_THEME_ROUTES.includes(trimmedRoute);
    const newTheme = isAlternateTheme ? NAV_THEME.ALTERNATE : NAV_THEME.DEFAULT;

    if (newTheme !== theme) {
      setNavTheme(newTheme);
    }
    // This hook should not be called when `navTheme` is updated elsewhere
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <CookiesProvider>
      <ThemeProvider theme={themes[theme]}>
        <Nav isHomepage={isHomepage} isPLA={isPLA} />
      </ThemeProvider>
    </CookiesProvider>
  );
}

export default NavContainer;
