import 'intersection-observer';

import { Global } from '@emotion/core';
import App from 'next/app';
import Head from 'next/head';

import { global } from '~/styles/document/global.styles';

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
      </>
    );
  }
}

export default MyApp;
