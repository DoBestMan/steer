import { ThemeProvider } from 'emotion-theming';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import SubNav from '~/components/modules/SubNav/SubNav';
import { useNavContext } from '~/context/Nav.context';
import { useSiteMenuContext } from '~/context/SiteMenu.context';
import { ROUTE_MAP, ROUTES } from '~/lib/constants';
import { trimSlash } from '~/lib/utils/routes';

import Nav from './Nav';
import { NAV_THEME, themes } from './Nav.theme';

interface Props {
  isHomepage?: boolean;
}

const ALTERNATE_THEME_ROUTES: string[] = [
  trimSlash(ROUTE_MAP[ROUTES.TIRE_REVIEWS]),
  trimSlash(ROUTE_MAP[ROUTES.BRAND_REVIEWS]),
  trimSlash(ROUTE_MAP[ROUTES.CATEGORY_REVIEWS]),
  trimSlash(ROUTE_MAP[ROUTES.TYPE_REVIEWS]),
];

function NavContainer({ isHomepage = false }: Props) {
  const { pathname } = useRouter();
  const { setNavTheme, theme } = useNavContext();
  const siteMenu = useSiteMenuContext();

  useEffect(() => {
    const isAlternateTheme = ALTERNATE_THEME_ROUTES.includes(
      trimSlash(pathname),
    );
    const newTheme = isAlternateTheme ? NAV_THEME.ALTERNATE : NAV_THEME.DEFAULT;

    if (newTheme !== theme) {
      setNavTheme(newTheme);
    }
    // This hook should not be called when `navTheme` is updated elsewhere
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, setNavTheme]);

  return (
    <ThemeProvider theme={themes[theme]}>
      <Nav isHomepage={isHomepage} />
      <SubNav {...siteMenu} />
    </ThemeProvider>
  );
}

export default NavContainer;
