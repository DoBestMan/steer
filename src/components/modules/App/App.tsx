import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import { Transition } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Layout from '~/components/global/Layout/Layout';
import LoadingBar from '~/components/global/LoadingBar/LoadingBar';
import Toast from '~/components/global/Toast/Toast';
import SearchModal from '~/components/modules/Search/SearchModal';
import { useGlobalToastContext } from '~/context/GlobalToast.context';
import { NavContextProvider } from '~/context/Nav.context';
import { useRouterContext } from '~/context/Router.context';
import { ROUTE_MAP, ROUTES, TIME } from '~/lib/constants';

import FooterContainer from '../Footer/Footer.container';
import { animations, styles } from './App.styles';

interface Props {
  children: ReactNode;
  route: string;
}

const NavContainer = dynamic(() =>
  import('~/components/modules/Nav/Nav.container'),
);

function App({ children, ...rest }: Props) {
  const {
    isInRouteTransition,
    isRouteLoading,
    router,
    skipPageTransition,
  } = useRouterContext();
  const {
    globalToastMessage,
    handleGlobalToastDismiss,
    handleClearGlobalToastMessage,
    isGlobalToastOpen,
  } = useGlobalToastContext();

  const route = router.asPath || rest.route;

  const isHomepage = route === ROUTE_MAP[ROUTES.HOME];

  return (
    <div css={[styles.root, isHomepage && styles.rootWithOffWhiteBg]}>
      <NavContextProvider>
        <NavContainer isHomepage={isHomepage} isLoading={isInRouteTransition} />
        <Layout>
          <Transition appear in={!isInRouteTransition} timeout={TIME.MS400}>
            {(containerTransitionState: TransitionStatus) => {
              const appStyles = [
                styles.component,
                !skipPageTransition &&
                  animations[`component_${containerTransitionState}`],
              ];

              return <div css={appStyles}>{children}</div>;
            }}
          </Transition>
          {globalToastMessage && (
            <Grid css={styles.globalToast}>
              <GridItem gridColumnL="10/14" gridColumnXL="11/14">
                <Toast
                  isOpen={isGlobalToastOpen}
                  handleClearMessage={handleClearGlobalToastMessage}
                  onDismiss={handleGlobalToastDismiss}
                >
                  {globalToastMessage}
                </Toast>
              </GridItem>
            </Grid>
          )}
        </Layout>
      </NavContextProvider>
      <FooterContainer />
      <SearchModal />
      <LoadingBar isLoading={isRouteLoading} />
    </div>
  );
}

export default App;
