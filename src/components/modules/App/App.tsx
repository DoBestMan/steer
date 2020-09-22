import dynamic from 'next/dynamic';
import { ReactNode, useCallback, useEffect, useRef } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Transition } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';

import {
  CONSTANTS as FEEDBACK_CONSTANTS,
  injectFeedbackifyScript,
} from '~/components/global/Feedback/Feedback.utils';
import FeedbackDynamic from '~/components/global/Feedback/FeedbackDynamic';
import GlobalErrorFallback from '~/components/global/GlobalErrorFallback/GlobalErrorFallback';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Layout from '~/components/global/Layout/Layout';
import LoadingBar from '~/components/global/LoadingBar/LoadingBar';
import Toast from '~/components/global/Toast/Toast';
import NavContainer from '~/components/modules/Nav/Nav.container';
import SearchModal from '~/components/modules/Search/SearchModal';
import { useFooterContext } from '~/context/Footer.context';
import { useGlobalToastContext } from '~/context/GlobalToast.context';
import { NavContextProvider } from '~/context/Nav.context';
import { useRouterContext } from '~/context/Router.context';
import { useSiteMenuContext } from '~/context/SiteMenu.context';
import { ROUTE_MAP, ROUTES, TIME } from '~/lib/constants';
import { fixHomepageRoute } from '~/lib/utils/routes';
import { removeUrlParams } from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';

import FooterContainer from '../Footer/Footer.container';
import { PAGE_PATHS_NOT_TO_SCROLL_TOP } from './App.constants';
import { animations, styles } from './App.styles';

interface Props {
  children: ReactNode;
  route: string;
}

const SubNavContainer = dynamic(() =>
  import('~/components/modules/SubNav/SubNav.container'),
);

function App({ children, ...rest }: Props) {
  const {
    isInRouteTransition,
    isRouteLoading,
    router,
    setContainerEl,
    skipPageTransition,
  } = useRouterContext();
  const {
    globalToastMessage,
    handleGlobalToastDismiss,
    handleClearGlobalToastMessage,
    isGlobalToastOpen,
  } = useGlobalToastContext();

  // Put it here to not bundle backend in dynamic <SubNavContainer>
  const { siteMenuBrowseList, siteMenuLearn } = useSiteMenuContext();

  const { isFooterVisible } = useFooterContext();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef && containerRef.current) {
      setContainerEl(containerRef.current);
    }
  }, [containerRef, setContainerEl]);

  const route = removeUrlParams(fixHomepageRoute(router.asPath || rest.route));

  const isHomepage = route === ROUTE_MAP[ROUTES.HOME];

  const shouldNotScrollTopOnRouteChange = useCallback(() => {
    return PAGE_PATHS_NOT_TO_SCROLL_TOP.indexOf(router.pathname) > -1;
  }, [router.pathname]);

  // TODO WCS-1512: temp bring back the feedback tab
  useEffect(() => {
    // Feedback component on every page injects the script already
    // so it needs to be injected on the homepage
    if (isHomepage && FEEDBACK_CONSTANTS.showFeedbackTab) {
      injectFeedbackifyScript();
    }
  }, [isHomepage]);

  useEffect(() => {
    if (shouldNotScrollTopOnRouteChange()) {
      return;
    } else {
      window.scrollTo(0, 0);
    }
  }, [router.pathname, router.asPath, shouldNotScrollTopOnRouteChange]);

  // Scroll restoration happens too early https://github.com/vercel/next.js/issues/3303
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <div
      css={[styles.root, isHomepage && styles.rootWithOffWhiteBg]}
      ref={containerRef}
      tabIndex={-1}
    >
      <a css={styles.skipToContent} href="#main">
        {ui('a11y.skipToMain')}
      </a>
      <ErrorBoundary FallbackComponent={GlobalErrorFallback}>
        <NavContextProvider>
          <NavContainer isHomepage={isHomepage} />
          <SubNavContainer
            siteMenuBrowseList={siteMenuBrowseList}
            siteMenuLearn={siteMenuLearn}
          />
          <Layout>
            <Transition
              appear={false}
              in={!isInRouteTransition}
              timeout={TIME.MS400}
            >
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

        {!isHomepage && isFooterVisible && <FeedbackDynamic />}

        {isFooterVisible && <FooterContainer />}

        <SearchModal />

        <LoadingBar isLoading={isRouteLoading} />
      </ErrorBoundary>
    </div>
  );
}

export default App;
