import { ReactChild } from 'react';
/* eslint import/default: 0 */
import SVGInline from 'react-svg-inline';

import styles from './Layout.styles';

import SVGSprite from '../../../assets/svg-sprite/symbol/svg/sprite.symbol.svg';

import GridHelper from '~/components/global/GridHelper/GridHelper';

interface Props {
  children: ReactChild;
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
