import React from 'react';
import App from 'next/app';
import Head from 'next/head';

import { Global } from '@emotion/core';
import { global } from '~/styles/global.styles';

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
