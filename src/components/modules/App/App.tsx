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
import NotificationList from '~/components/global/NotificationBanner/NotificationList';
import Toast from '~/components/global/Toast/Toast';
import NavContainer from '~/components/modules/Nav/Nav.container';
import { useSearchContext } from '~/components/modules/Search/Search.context';
import SearchModal from '~/components/modules/Search/SearchModal';
import { useSearchModalContext } from '~/components/modules/Search/SearchModal.context';
import { useFooterContext } from '~/context/Footer.context';
import { useGlobalToastContext } from '~/context/GlobalToast.context';
import { NavContextProvider } from '~/context/Nav.context';
import { useRouterContext } from '~/context/Router.context';
import { useSiteMenuContext } from '~/context/SiteMenu.context';
import { SiteNotificationTypes } from '~/data/models/SiteNotificationTypes';
import { SiteSearchFilterPill } from '~/data/models/SiteSearchFilterPill';
import { SiteSearchResultActionQuery } from '~/data/models/SiteSearchResultActionQuery';
import { apiPromotionName } from '~/lib/api/promotion-name';
import { apiGetSearchTypeahead } from '~/lib/api/search';
import { ROUTE_MAP, ROUTES, TIME } from '~/lib/constants';
import { fixHomepageRoute } from '~/lib/utils/routes';
import { removeUrlParams } from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';

import FooterContainer from '../Footer/Footer.container';
import { initialSearchTireTypeData } from '../Search/Search.data';
import { SearchActionType } from '../Search/Search.types';
import TireSnapModal from '../TireSnap/TireSnapModal';
import {
  PAGE_PATHS_NOT_TO_SCROLL_TOP,
  QUERY_PARAMS_NOT_TO_SCROLL_TOP,
  TIRE_TYPE_KEYS,
} from './App.constants';
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
  const { asPath } = router;

  // Put it here to not bundle backend in dynamic <SubNavContainer>
  const { siteMenuBrowseList, siteMenuLearn } = useSiteMenuContext();
  const { setFilterPills, setRouteQueryParamOptions } = useSearchContext();
  const { setIsSearchOpen } = useSearchModalContext();

  const { isFooterVisible } = useFooterContext();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef && containerRef.current) {
      setContainerEl(containerRef.current);
    }
  }, [containerRef, setContainerEl]);

  const route = removeUrlParams(fixHomepageRoute(router.asPath || rest.route));

  const isHomepage = route === ROUTE_MAP[ROUTES.HOME];
  const isPLA = route.includes(ROUTE_MAP[ROUTES.PRODUCT_DETAIL_PLA]);

  const findIntersection = (array1: Array<string>, array2: Array<string>) =>
    array1.filter((value: string) => array2.includes(value));

  const shouldNotScrollTopOnRouteChange = useCallback(() => {
    const intersection = findIntersection(
      Object.keys(router.query),
      QUERY_PARAMS_NOT_TO_SCROLL_TOP,
    );
    return (
      PAGE_PATHS_NOT_TO_SCROLL_TOP.indexOf(router.pathname) > -1 ||
      intersection.length
    );
  }, [router.pathname, router.query]);

  const fetchPromotion = useCallback(async () => {
    const { query } = router;

    if (query.promotionId) {
      const response = await apiPromotionName({
        promotion: query.promotionId as string,
      });

      if (response.isSuccess) {
        const params = { promotion: query.promotionId } as Record<
          string,
          string
        >;

        setRouteQueryParamOptions({
          routes: [
            ROUTE_MAP[ROUTES.VEHICLE_CATALOG],
            ROUTE_MAP[ROUTES.TIRE_SIZE_CATALOG_OR_CATEGORY],
          ],
          params,
        });
        setFilterPills([
          {
            type: 'promotion',
            label: response.data.promotionName,
          },
        ]);
        setIsSearchOpen(true);
      } else {
        // Redirects to homepage if promotionId is invalid
        router.push('/');
      }
    }
  }, [router, setIsSearchOpen, setFilterPills, setRouteQueryParamOptions]);

  const fetchFilters = useCallback(async () => {
    const [, searchFilters] = asPath.split('#');

    if (searchFilters) {
      const queries = new URLSearchParams(searchFilters);
      const params: Record<string, string> = {};
      const filterPills: SiteSearchFilterPill[] = [];

      for (const key of queries.keys()) {
        params[key] = queries.get(key) as string;
      }

      if (params.brand) {
        filterPills.push({
          type: 'brand',
          label: params.brand,
        });
      }
      if (params.category || params.subtype) {
        const {
          queryText,
          queryType,
        } = initialSearchTireTypeData.action as SiteSearchResultActionQuery;
        const apiSearchResults = await apiGetSearchTypeahead({
          additionalQueryText: '',
          queryText,
          queryType,
        });

        TIRE_TYPE_KEYS.filter((key: string) => params[key]).forEach(
          (key: string) => {
            const query = `${key}=${params[key]}`;
            apiSearchResults.siteSearchResultGroupList.some((resultGroup) => {
              return resultGroup.siteSearchResultList.some((result) => {
                const { action } = result;
                if (
                  action.type === SearchActionType.LINK &&
                  action.link.href === query &&
                  result.label
                ) {
                  filterPills.push({
                    type: key,
                    label: result.label,
                  });
                  return true;
                }
                return false;
              });
            });
          },
        );
      }

      setFilterPills(filterPills);

      setRouteQueryParamOptions({
        routes: [
          ROUTE_MAP[ROUTES.VEHICLE_CATALOG],
          ROUTE_MAP[ROUTES.TIRE_SIZE_CATALOG_OR_CATEGORY],
        ],
        params,
      });
      setIsSearchOpen(true);
    }
  }, [asPath, setIsSearchOpen, setFilterPills, setRouteQueryParamOptions]);

  useEffect(() => {
    fetchPromotion();
  }, [fetchPromotion]);

  useEffect(() => {
    fetchFilters();
  }, [fetchFilters]);

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
      setTimeout(() => window.scrollTo(0, 0));
    }
  }, [
    router.pathname,
    router.asPath,
    router.query,
    shouldNotScrollTopOnRouteChange,
  ]);

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
        <Grid>
          <GridItem gridColumn="1/15" css={styles.globalNotifications}>
            <NotificationList
              types={[SiteNotificationTypes.Sale, SiteNotificationTypes.System]}
            />
          </GridItem>
        </Grid>

        <NavContextProvider>
          <NavContainer isHomepage={isHomepage} isPLA={isPLA} />
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
        <TireSnapModal />
        <LoadingBar isLoading={isRouteLoading} />
      </ErrorBoundary>
    </div>
  );
}

export default App;
