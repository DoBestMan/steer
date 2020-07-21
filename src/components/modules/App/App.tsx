import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';

import Layout from '~/components/global/Layout/Layout';
import SearchModal from '~/components/modules/Search/SearchModal';
import { NavContextProvider } from '~/context/Nav.context';
import { CATALOG_ROUTES, ROUTE_MAP, ROUTES, TIME } from '~/lib/constants';
import { eventEmitters } from '~/lib/events/emitters';
import { isInRouteList } from '~/lib/utils/routes';

import FooterContainer from '../Footer/Footer.container';
import { useSearchContext } from '../Search/Search.context';
import { animations, styles } from './App.styles';

interface Props {
  children: ReactNode;
  route: string;
}

const NavContainer = dynamic(() =>
  import('~/components/modules/Nav/Nav.container'),
);

function App({ children, ...rest }: Props) {
  const { isSearchOpen } = useSearchContext();
  const router = useRouter();
  const route = router.route || rest.route;

  const isHomepage = route === ROUTE_MAP[ROUTES.HOME];

  // If page transition (fade out/in) is not desired, add use case here
  const skipPageTransition = isSearchOpen;

  useEffect(() => {
    // Callback when traversing the `history` stack
    router.beforePopState(({ url, options }) => {
      // Reset Catalog Search state
      // Ignore `shallow` route changes, as these signify non-Search route
      // updates, e.g. filter changes or pagination
      if (isInRouteList(url, CATALOG_ROUTES) && !options.shallow) {
        eventEmitters.newCatalogSearchQuery.emit({ comesFromSearch: false });
      }
      return true;
    });

    return () => {
      router.beforePopState(() => true);
    };
  });

  return (
    <div css={[styles.root, isHomepage && styles.rootWithOffWhiteBg]}>
      <NavContextProvider>
        <NavContainer isHomepage={isHomepage} />
        <TransitionGroup>
          <Transition
            appear
            key={route}
            timeout={skipPageTransition ? 0 : TIME.MS400}
          >
            {(containerTransitionState: TransitionStatus) => {
              const appStyles = [
                styles.component,
                !skipPageTransition &&
                  animations[`component_${containerTransitionState}`],
              ];

              return (
                <div css={appStyles}>
                  <Layout>{children}</Layout>
                </div>
              );
            }}
          </Transition>
        </TransitionGroup>
      </NavContextProvider>
      <FooterContainer />
      <SearchModal />
    </div>
  );
}

export default App;
