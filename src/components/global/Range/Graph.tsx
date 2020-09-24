import { MutableRefObject, useCallback, useEffect, useRef } from 'react';

import { COLORS } from '~/lib/constants';
import debounce from '~/lib/utils/debounce';

import { barHeights, DEBOUNCE_DELAY } from './Graph.constants';
import { styles } from './Graph.styles';

export interface GraphProps {
  maxElPosition: number;
  minElPosition: number;
}

function Graph({ maxElPosition, minElPosition }: GraphProps) {
  const graphRef = useRef(null);
  const updateBarColors = useCallback(
    debounce(
      (
        elmRef: MutableRefObject<HTMLDivElement | null>,
        maxPos: number,
        minPos: number,
      ) => {
        if (!elmRef || !elmRef.current) {
          return;
        }

        const graphElmChildren = Array.prototype.slice.call(
          elmRef.current.children,
        );

        graphElmChildren.forEach((elm) => {
          const elmPos = elm.getBoundingClientRect().left;

          if (elmPos < minPos || elmPos > maxPos) {
            elm.style.backgroundColor = COLORS.GLOBAL.ORANGE;
          } else {
            elm.style.backgroundColor = COLORS.LIGHT.GRAY_70;
          }
        });
      },
      DEBOUNCE_DELAY,
    ),
    [],
  );

  useEffect(() => {
    if (!maxElPosition || !minElPosition) {
      return;
    }

    updateBarColors(graphRef, maxElPosition, minElPosition);
  }, [maxElPosition, minElPosition, updateBarColors]);

  return (
    <div aria-hidden="true" css={styles.container} ref={graphRef}>
      {barHeights.map((heightSize, index) => (
        <div
          css={[styles.bar, { height: heightSize }]}
          key={`${heightSize}_${index}`}
        />
      ))}
    </div>
  );
}

export default Graph;
