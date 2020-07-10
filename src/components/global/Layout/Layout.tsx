import { ReactNode, useEffect, useState } from 'react';
import SVGInline from 'react-svg-inline';
import { Transition, TransitionGroup } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';

import GridHelper from '~/components/global/GridHelper/GridHelper';
import { useSearchContext } from '~/components/modules/Search/Search.context';
import { TIME } from '~/lib/constants';
import { ScrollObject, setScroll } from '~/lib/helpers/scroll';

import styles, { animations } from './Layout.styles';

interface Props {
  children: ReactNode;
  route: string;
}

function Layout(props: Props) {
  const [SVGString, setSVGString] = useState<string | null>(null);

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

  const { isSearchOpen } = useSearchContext();

  // If page transition (fade out/in) is not desired, add use case here
  const skipPageTransition = isSearchOpen;

  return (
    <TransitionGroup>
      <Transition
        appear
        key={props.route}
        timeout={skipPageTransition ? 0 : TIME.MS400}
      >
        {(containerTransitionState: TransitionStatus) => {
          const appStyles = [
            styles.component,
            animations[`component_${containerTransitionState}`],
          ];

          return (
            <div css={appStyles}>
              <div css={styles.container}>
                <span css={styles.SVGSpriteContainer}>
                  {SVGString && <SVGInline svg={SVGString} />}
                </span>
                <GridHelper />
                <main role="main" css={styles.mainContent}>
                  {props.children}
                </main>
              </div>
            </div>
          );
        }}
      </Transition>
    </TransitionGroup>
  );
}

export default Layout;
