import React from 'react';
import { css } from '@emotion/core';

import Layout from '~/components/global/Layout/Layout';

const styles = {
  container: css({
    alignItems: 'center',
    display: 'flex',
    justifyContent: '100vh',
    minHeight: '100vh',
    padding: '0 0.5rem',
  }),
  title: css({
    fontSize: '4rem',
    lineHeight: 1.15,
    margin: 0,
    textAlign: 'center',
    width: '100%',
  }),
};

function Home() {
  return (
    <Layout>
      <div css={styles.container}>
        <h1 css={styles.title}>STEER</h1>
      </div>
    </Layout>
  );
}

export default Home;
