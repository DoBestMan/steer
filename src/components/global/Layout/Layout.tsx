import { ReactChild } from 'react';
import { css } from '@emotion/core';

import GridHelper from '~/components/global/GridHelper/GridHelper';

const styles = {
  container: css({
    width: '100vw',
  }),
  mainContent: css({
    height: '100%',
    minHeight: 700,
  }),
};

interface Props {
  children: ReactChild;
}

function Layout(props: Props) {
  return (
    <div css={styles.container}>
      <GridHelper />
      <main role="main" css={styles.mainContent}>
        {props.children}
      </main>
    </div>
  );
}

export default Layout;
