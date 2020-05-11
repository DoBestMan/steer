import { ReactNode, useEffect } from 'react';
import SVGInline from 'react-svg-inline';

import SVGSprite from '~/assets/svg-sprite/symbol/svg/sprite.symbol.svg';
import GridHelper from '~/components/global/GridHelper/GridHelper';
import { ScrollObject, setScroll } from '~/lib/helpers/scroll';

import styles from './Layout.styles';

interface Props {
  children: ReactNode;
}

function Layout(props: Props) {
  useEffect(() => {
    let scrollTicket = false;

    function onScroll() {
      scrollTicket = true;
    }

    function onUpdate() {
      if (scrollTicket) {
        scrollTicket = false;

        const scrollObj: ScrollObject = {
          x: window.scrollX || window.pageXOffset,
          y: window.scrollY || window.pageYOffset,
        };

        setScroll(scrollObj);
      }

      window.requestAnimationFrame(onUpdate);
    }

    window.addEventListener('scroll', onScroll, false);
    window.requestAnimationFrame(onUpdate);

    return () => {};
  });

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
