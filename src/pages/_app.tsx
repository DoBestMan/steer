import 'focus-visible';

import { Global } from '@emotion/core';
import NextApp, { AppContext, AppInitialProps } from 'next/app';
import smoothscroll from 'smoothscroll-polyfill';
import { SWRConfig } from 'swr';

import Meta from '~/components/global/Meta/Meta';
import App from '~/components/modules/App/App';
import AppProviders from '~/context/AppProviders';
import { SiteGlobals } from '~/data/models/SiteGlobals';
import { SiteMenu } from '~/data/models/SiteMenu';
import { SiteNotificationList } from '~/data/models/SiteNotificationsList';
import { SiteSession } from '~/data/models/SiteSession';
import {
  backendGetSiteGlobals,
  backendGetSiteMenu,
  backendGetSiteNotifications,
} from '~/lib/backend';
import {
  backendBootstrap,
  getBackendEnvVariables,
} from '~/lib/backend/bootstrap';
import { backendOauthToken } from '~/lib/backend/oauth';
import GA from '~/lib/helpers/analytics';
import { global } from '~/styles/document/global.styles';

// Add polyfill for smooth scrolling on Safari
typeof window !== 'undefined' && smoothscroll.polyfill();

interface Props extends AppInitialProps {
  hostUrl?: string | null;
  route: string;
  serverData: {
    siteGlobals?: SiteGlobals;
    siteMenu?: SiteMenu;
    siteNotifications?: SiteNotificationList;
    siteSession?: SiteSession;
  };
}

class MyApp extends NextApp<Props> {
  state = {
    // Store serverData in internal state
    // to preserve across client-side navigation
    serverData: this.props.serverData,
  };
  render() {
    const { Component, pageProps, route, hostUrl } = this.props;
    const {
      siteGlobals,
      siteMenu,
      siteNotifications,
      siteSession,
    } = this.state.serverData;
    GA.initialize();
    return (
      <SWRConfig value={{ revalidateOnFocus: false }}>
        <AppProviders
          hostUrl={hostUrl}
          siteGlobalsContextValue={siteGlobals}
          siteMenuContextValue={siteMenu}
          siteNotificationContextValue={siteNotifications}
          siteSessionContextValue={siteSession}
        >
          <Meta />

          <Global styles={global} />

          <App route={route}>
            <Component {...pageProps} />
          </App>
        </AppProviders>
      </SWRConfig>
    );
  }
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await NextApp.getInitialProps(appContext);

  // We can return if fetching on the client side because
  // global data is already available in internal state
  const isClient = typeof window !== 'undefined';
  if (isClient) {
    return {
      hostUrl: `${window.location.protocol}//${window.location.hostname}`,
      route: appContext.router.route,
      ...appProps,
    };
  }
  const { clientId, clientSecret } = getBackendEnvVariables();

  backendBootstrap();
  if (!clientId || !clientSecret) {
    throw new Error('Missing clientId or clientSecret');
  }

  const siteSessionRes = await backendOauthToken({
    clientId,
    clientSecret,
  });
  const siteSession = siteSessionRes.isSuccess
    ? siteSessionRes.data
    : undefined;

  const {
    ctx: { req },
  } = appContext;

  const [
    siteGlobalsRes,
    siteMenuRes,
    siteNotificationsRes,
  ] = await Promise.all([
    backendGetSiteGlobals(siteSession),
    backendGetSiteMenu(siteSession),
    backendGetSiteNotifications(siteSession),
  ]);

  const siteGlobals = siteGlobalsRes.isSuccess
    ? siteGlobalsRes.data.siteGlobals
    : undefined;

  const siteMenu = siteMenuRes.isSuccess ? siteMenuRes.data : undefined;

  const siteNotifications = siteNotificationsRes.isSuccess
    ? siteNotificationsRes.data
    : undefined;

  const hostUrl = req?.headers ? `https://${req.headers.host}` : '';

  const finalProps: Props = {
    hostUrl,
    route: appContext.router.route,
    ...appProps,
    serverData: {
      siteGlobals,
      siteMenu,
      siteNotifications,
      siteSession,
    },
  };
  return finalProps;
};

export default MyApp;
