import 'intersection-observer';

import { Global } from '@emotion/core';
import App, { AppContext, AppInitialProps } from 'next/app';
import Head from 'next/head';

import { SiteMenuBrowseItem } from '~/data/models/SiteMenuBrowseItem';
import { SiteMenuLearn } from '~/data/models/SiteMenuLearn';
import { backendGetSiteMenu } from '~/lib/backend';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { global } from '~/styles/document/global.styles';

interface Props extends AppContext, AppInitialProps {
  serverData: {
    siteMenuBrowseList: Array<SiteMenuBrowseItem>;
    siteMenuLearn: SiteMenuLearn;
  };
}

class MyApp extends App<Props> {
  state = {
    // Store serverData in internal state
    // to preserve across client-side navigation
    serverData: this.props.serverData,
  };

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>Simpletire</title>
        </Head>

        <Global styles={global} />

        <Component {...pageProps} />
      </>
    );
  }
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  // We can return if fetching on the client side because
  // global data is already available in internal state
  const isClient = typeof window !== 'undefined';
  if (isClient) {
    return appProps;
  }

  backendBootstrap();

  const { siteMenuBrowseList, siteMenuLearn } = await backendGetSiteMenu();

  return {
    ...appProps,
    serverData: {
      siteMenuBrowseList,
      siteMenuLearn,
    },
  };
};

export default MyApp;
