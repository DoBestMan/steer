import 'intersection-observer';

import { Global } from '@emotion/core';
import NextApp, { AppContext, AppInitialProps } from 'next/app';
import Head from 'next/head';

import Layout from '~/components/global/Layout/Layout';
import App from '~/components/modules/App/App';
import AppProviders from '~/context/AppProviders';
import { SiteGlobals } from '~/data/models/SiteGlobals';
import { SiteMenuBrowseItem } from '~/data/models/SiteMenuBrowseItem';
import { SiteMenuLearn } from '~/data/models/SiteMenuLearn';
import { backendGetSiteGlobals, backendGetSiteMenu } from '~/lib/backend';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { global } from '~/styles/document/global.styles';

interface Props extends AppInitialProps {
  serverData: {
    siteGlobals: SiteGlobals;
    siteMenuBrowseList: Array<SiteMenuBrowseItem>;
    siteMenuLearn: SiteMenuLearn;
  };
}

class MyApp extends NextApp<Props> {
  state = {
    // Store serverData in internal state
    // to preserve across client-side navigation
    serverData: this.props.serverData,
  };

  render() {
    const { Component, pageProps } = this.props;

    return (
      <AppProviders siteGlobalsContextValue={this.state.serverData.siteGlobals}>
        <Head>
          <title>Simpletire</title>
        </Head>

        <Global styles={global} />
        <App>
          <Layout>
            <Component {...pageProps} />
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
    return appProps;
  }

  backendBootstrap();

  const { siteMenuBrowseList, siteMenuLearn } = await backendGetSiteMenu();
  const { siteGlobals } = await backendGetSiteGlobals();

  const finalProps: Props = {
    ...appProps,
    serverData: {
      siteGlobals,
      siteMenuBrowseList,
      siteMenuLearn,
    },
  };

  return finalProps;
};

export default MyApp;
