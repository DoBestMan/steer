import 'intersection-observer';

import { Global } from '@emotion/core';
import App, { AppContext, AppInitialProps } from 'next/app';
import Head from 'next/head';

import Footer from '~/components/global/Footer/Footer';
import ConnectedNav from '~/components/global/Nav/Nav.container';
import { SiteGlobals } from '~/data/models/SiteGlobals';
import { SiteMenuBrowseItem } from '~/data/models/SiteMenuBrowseItem';
import { SiteMenuLearn } from '~/data/models/SiteMenuLearn';
import { backendGetSiteGlobals, backendGetSiteMenu } from '~/lib/backend';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { global } from '~/styles/document/global.styles';

import SiteGlobalsContext from './SiteGlobals.context';

interface Props extends AppContext, AppInitialProps {
  serverData: {
    siteGlobals: SiteGlobals;
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
    const { customerServiceEnabled } = this.state.serverData.siteGlobals;

    return (
      <SiteGlobalsContext.Provider value={this.state.serverData.siteGlobals}>
        <Head>
          <title>Simpletire</title>
        </Head>

        <Global styles={global} />
        <ConnectedNav />
        <Component {...pageProps} />

        <Footer isCustomerServiceEnabled={customerServiceEnabled} />
      </SiteGlobalsContext.Provider>
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
  const siteGlobals = await backendGetSiteGlobals();

  return {
    ...appProps,
    serverData: {
      siteGlobals,
      siteMenuBrowseList,
      siteMenuLearn,
    },
  };
};

export default MyApp;
