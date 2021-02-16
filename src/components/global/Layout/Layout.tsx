import { ReactNode, useCallback, useEffect, useState } from 'react';
import SVGInline from 'react-svg-inline';

import GridHelper from '~/components/global/GridHelper/GridHelper';
import { NAV_TARGETS } from '~/components/modules/Nav/Nav.types';
import { useNavContext } from '~/context/Nav.context';
import { useUserPersonalizationContext } from '~/context/UserPersonalization.context';
import { ScrollObject, setScroll } from '~/lib/helpers/scroll';

import styles from './Layout.styles';

interface Props {
  children: ReactNode;
}

function Layout(props: Props) {
  const [SVGString, setSVGString] = useState<string | null>(null);
  const { browserLocationFailed } = useUserPersonalizationContext();
  const { createSelectLinkHandler, toggleSubNav } = useNavContext();
  const openLocationNav = useCallback(() => {
    const linkHandler = createSelectLinkHandler({
      target: NAV_TARGETS.LOCATION,
    });

    if (!linkHandler) {
      return;
    }

    linkHandler();
    toggleSubNav();
  }, [createSelectLinkHandler, toggleSubNav]);

  useEffect(() => {
    let scrollTicket = false;
    let frame = 0;

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

      frame = window.requestAnimationFrame(onUpdate);
    }

    window.addEventListener('scroll', onScroll, false);
    frame = window.requestAnimationFrame(onUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  });

  // Load SVG Sprite as a text file
  useEffect(() => {
    if (SVGString) {
      return;
    }

    const url = '/static/assets/svg-sprite/symbol/svg/sprite.symbol.svg';

    const getSVG = async () => {
      const data = await fetch(url)
        .then((response) => response.text())
        .then((data) => data);

      setSVGString(data);
    };

    getSVG();
  }, [SVGString]);

  useEffect(() => {
    if (browserLocationFailed) {
      openLocationNav();
    }
    // this doesn't need to update for openLocationNav
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [browserLocationFailed]);

  return (
    <div css={styles.container}>
      <span css={styles.SVGSpriteContainer}>
        {SVGString && <SVGInline svg={SVGString} />}
      </span>
      <GridHelper />
      <main id="main" role="main" css={styles.mainContent}>
        {props.children}
      </main>
    </div>
  );
}

export default Layout;
