import { ReactNode } from 'react';
import SVGInline from 'react-svg-inline';

import SVGSprite from '~/assets/svg-sprite/symbol/svg/sprite.symbol.svg';
import GridHelper from '~/components/global/GridHelper/GridHelper';

import styles from './Layout.styles';

interface Props {
  children: ReactNode;
}

function Layout(props: Props) {
  return (
    <div css={styles.container}>
      <span css={styles.SVGSpriteContainer}>
        <SVGInline svg={SVGSprite} />
      </span>
      <GridHelper />
      <main role="main" css={styles.mainContent}>
        {props.children}
      </main>
    </div>
  );
}

export default Layout;
