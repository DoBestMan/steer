import { ReactChild } from 'react';

import styles from './Layout.styles';

import GridHelper from '~/components/global/GridHelper/GridHelper';

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
