import {
  BodyScrollOptions,
  clearAllBodyScrollLocks,
  disableBodyScroll,
} from 'body-scroll-lock';
import { ReactNode, useEffect, useRef, useState } from 'react';

import { CSSStylesProp, KEYCODES } from '~/lib/constants';

import BackDrop from './BackDrop';
import styles from './Drawer.styles';
import {
  calculateAnimations,
  calculateLayout,
  calculateStyle,
} from './Drawer.utils';

export type AnchorType = 'left' | 'right' | 'top' | 'bottom';

const bodyScrollOptions: BodyScrollOptions = {
  reserveScrollBarGap: true,
};

interface Props {
  anchor: AnchorType;
  children: ReactNode;
  containerStyle?: CSSStylesProp;
  header?: ReactNode;
  id?: string;
  initialPosition?: number;
  onClose: () => void;
  open: boolean;
}

function Drawer({
  anchor = 'bottom',
  children,
  open,
  onClose,
  header,
  containerStyle,
  initialPosition = 0,
  id,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number | null>(null);
  const rootStyles = [
    styles.defaultStyle,
    calculateStyle(
      anchor,
      initialPosition,
      containerHeight || Number.MIN_VALUE,
    ),
    containerStyle,
  ];

  const layoutStyles = header && calculateLayout(anchor);

  useEffect(() => {
    if (!containerRef || !containerRef.current) {
      return;
    }

    const resize = () => {
      if (!containerRef || !containerRef.current) {
        return;
      }
      setContainerHeight(
        ['bottom', 'top'].includes(anchor)
          ? containerRef.current.clientHeight
          : containerRef.current.clientWidth,
      );
    };
    resize();

    window.addEventListener('resize', resize, false);

    return () => {
      window.removeEventListener('resize', resize, false);
    };
  }, [containerRef, anchor]);

  useEffect(() => {
    function onKeypress(event: KeyboardEvent) {
      if (event.keyCode === KEYCODES.ESCAPE) {
        onClose();
      }
    }

    if (open && onClose) {
      document.addEventListener('keydown', onKeypress);
      if (containerRef && containerRef.current) {
        disableBodyScroll(containerRef.current, bodyScrollOptions);
      }
    } else {
      clearAllBodyScrollLocks();
    }

    return () => {
      document.removeEventListener('keydown', onKeypress);
    };
  }, [open, onClose]);

  return (
    <div>
      <div
        id={id}
        tabIndex={-1}
        ref={containerRef}
        css={[
          ...rootStyles,
          layoutStyles,
          open && calculateAnimations(anchor, initialPosition),
        ]}
      >
        {header && (
          <div css={styles.header} ref={headerRef}>
            {header}
          </div>
        )}
        <div css={styles.content}>{children}</div>
      </div>
      <BackDrop onClick={onClose} isVisible={open} />
    </div>
  );
}

export default Drawer;
