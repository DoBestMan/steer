import App from 'next/app';
import Head from 'next/head';

import { Global } from '@emotion/core';

import Footer from '~/components/global/Footer/Footer';

import { global } from '~/styles/global/global.styles';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>Simpletire</title>
        </Head>

        <Global styles={global} />

        <Component {...pageProps} />

        <Footer />
      </>
    );
  }
}

export default MyApp;
