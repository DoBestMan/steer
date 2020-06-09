import { Global } from '@emotion/core';
import NextApp, { AppContext, AppInitialProps } from 'next/app';
import Head from 'next/head';
import { Transition, TransitionGroup } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';

import Layout from '~/components/global/Layout/Layout';
import App from '~/components/modules/App/App';
import { animations, styles } from '~/components/modules/App/App.styles';
import AppProviders from '~/context/AppProviders';
import { SiteGlobals } from '~/data/models/SiteGlobals';
import { SiteMenu } from '~/data/models/SiteMenu';
import { backendGetSiteGlobals, backendGetSiteMenu } from '~/lib/backend';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { TIME } from '~/lib/constants';
import { global } from '~/styles/document/global.styles';

interface Props extends AppInitialProps {
  route: string;
  serverData: {
    siteGlobals: SiteGlobals;
    siteMenu: SiteMenu;
  };
}

class MyApp extends NextApp<Props> {
  state = {
    // Store serverData in internal state
    // to preserve across client-side navigation
    serverData: this.props.serverData,
  };

  render() {
    const { Component, pageProps, route } = this.props;
    const { siteGlobals, siteMenu } = this.state.serverData;

    return (
      <AppProviders
        siteGlobalsContextValue={siteGlobals}
        siteMenuContextValue={siteMenu}
      >
        <Head>
          <title>Simpletire</title>
        </Head>

        <Global styles={global} />

        <App route={route}>
          <Layout>
            <TransitionGroup>
              <Transition appear key={route} timeout={TIME.MS400}>
                {(containerTransitionState: TransitionStatus) => {
                  const appStyles = [
                    styles.component,
                    animations[`component_${containerTransitionState}`],
                  ];

                  return (
                    <div css={appStyles}>
                      <Component {...pageProps} />
                    </div>
                  );
                }}
              </Transition>
            </TransitionGroup>
          </Layout>
        </App>
      </AppProviders>
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
      route: appContext.router.route,
      ...appProps,
    };
  }

  backendBootstrap();

  const { siteGlobals } = await backendGetSiteGlobals();
  const siteMenu = await backendGetSiteMenu();

  const finalProps: Props = {
    route: appContext.router.route,
    ...appProps,
    serverData: {
      siteGlobals,
      siteMenu,
    },
  };

  return finalProps;
};

export default MyApp;
