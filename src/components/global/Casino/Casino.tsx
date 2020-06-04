import { useEffect, useRef, useState } from 'react';

import { useBreakpoints } from '~/hooks/useBreakpoints';

import { styles } from './Casino.styles';

type SlotProps = {
  animate: boolean;
  height: number;
  numberToDisplay: number;
  to: number;
  transitionDuration: number;
  width: number;
};

type Props = {
  animate: boolean;
  numberDisplayed: number;
};

const NB_CHARACTERS = 10;

function Slot(props: SlotProps) {
  const {
    height,
    numberToDisplay,
    animate,
    to,
    transitionDuration,
    width,
  } = props;

  const [y, setY] = useState<number>(0);
  const [top, setTop] = useState<number>(0);

  const prevNumberToDisplayRef = useRef<number>(0);
  const prevToRef = useRef<number>(0);

  useEffect(() => {
    if (!animate) {
      return;
    }

    const diffTo = to - prevToRef.current;

    /* 
        Explanations:
        The idea is to have, for each slots, 10 times the list of numbers (0 1 2 3 4 5 6 7 8 9), so 100 characters, available.
        Depending on the next number, we would animate that list from top to bottom (smaller number) or bottom to top (greater number)
        If the difference is really small (literally +1), we just move it a little up or down
        If the difference is bigger, we would play the whole transition top to bottom (or bottom to top) 
        so it feels there's a lot of calculation happening.
    */

    // Number to displayed has changed.
    if (diffTo !== 0) {
      let nextY = 0;
      let nextTop = 0;

      // Moving up
      if (diffTo > 0) {
        if (diffTo <= NB_CHARACTERS * NB_CHARACTERS) {
          if (y + diffTo < NB_CHARACTERS * NB_CHARACTERS) {
            nextY = y + diffTo;
          } else {
            // go down
            nextTop = 0;
            nextY = 0 + numberToDisplay;
          }
        } else {
          nextY = 90 + numberToDisplay;
        }
      } else if (diffTo < 0) {
        if (y + diffTo > 0) {
          nextY = y + diffTo;
        } else {
          nextTop = 0;
          nextY = 0 + numberToDisplay;
        }
      }

      setTimeout(() => {
        setTop(nextTop);
        setY(nextY);
      }, 0);
    }

    prevToRef.current = to;
    prevNumberToDisplayRef.current = numberToDisplay;
  }, [
    setY,
    setTop,
    animate,
    y,
    prevNumberToDisplayRef,
    numberToDisplay,
    prevToRef,
    to,
  ]);

  const style = {
    top,
    transform: `translate3d(0, -${height * y}px, 0)`,
    transitionDuration: `${transitionDuration}ms`,
  };

  return (
    <span css={styles.slotContainer} style={{ height, width }}>
      <span css={styles.slot} style={style}>
        {[...Array(NB_CHARACTERS)].map((_item, i) => (
          <span key={i}>
            {[...Array(NB_CHARACTERS)].map((_item, j) => (
              <span key={j}>{j}</span>
            ))}
          </span>
        ))}
      </span>
    </span>
  );
}

function Casino({ numberDisplayed, animate, ...rest }: Props) {
  const containerEl = useRef<HTMLSpanElement>(null);

  const [hasMounted, setHasMounted] = useState<boolean>(false);
  const [height, setHeight] = useState<number | null>(null);
  const [width, setWidth] = useState<number | null>(null);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [transitionDuration, setTransitionDuration] = useState<number>(1000);
  const [internalNumberDisplayed, setInternalNumberDisplayed] = useState<
    number
  >(0);

  const BK = useBreakpoints();

  const numberToDisplayStr = String(internalNumberDisplayed);
  const aNumberToDisplay = numberToDisplayStr.split('');

  useEffect(() => {
    // let's mount once
    setTimeout(() => setHasMounted(true), 0);
  }, []);

  // Load font when new font size / font family
  useEffect(() => {
    if (fontLoaded || !containerEl || !containerEl.current) {
      return;
    }

    const stylesContainer = window.getComputedStyle(containerEl.current);
    const fontSize = parseInt(stylesContainer.fontSize, 10);
    const fontFamily = stylesContainer.fontFamily.replace(/['"]+/g, '');

    const loadFont = async () => {
      if (document.fonts) {
        await document.fonts.load(`${fontSize}px ${fontFamily}`);
      }

      setFontLoaded(true);
    };

    loadFont();
  }, [containerEl, hasMounted, fontLoaded, setFontLoaded]);

  // if number changes
  useEffect(() => {
    if (numberDisplayed === internalNumberDisplayed || !hasMounted) {
      return;
    }

    const numberDisplayedStr = String(numberDisplayed).split('');
    const internalNumberDisplayedStr = String(internalNumberDisplayed).split(
      '',
    );

    const arr =
      numberDisplayedStr.length > internalNumberDisplayedStr.length
        ? numberDisplayedStr
        : internalNumberDisplayedStr;
    const otherArr =
      numberDisplayedStr === arr
        ? internalNumberDisplayedStr
        : numberDisplayedStr;

    let nbChanged = 0;
    arr.forEach((_item, i) => {
      if (otherArr[i] !== arr[i]) {
        nbChanged++;
      }
    });

    setTransitionDuration(nbChanged * 600);
    setInternalNumberDisplayed(numberDisplayed);
  }, [numberDisplayed, internalNumberDisplayed, hasMounted]);

  // On breakpoint change, resize!
  useEffect(() => {
    if (!hasMounted || !fontLoaded) {
      return;
    }

    setTimeout(() => {
      if (!containerEl || !containerEl.current) {
        return;
      }

      const bounds = containerEl.current.getBoundingClientRect();
      setHeight(bounds.height);
      setWidth(Math.ceil(bounds.width));
    }, 0);
  }, [containerEl, BK.bk, hasMounted, fontLoaded]);

  return (
    <span css={styles.container} {...rest} aria-label={numberToDisplayStr}>
      {/* Use to get constant width/height on a character */}
      <span css={[styles.ref]} ref={containerEl} aria-hidden>
        <span>0</span>
      </span>

      <span aria-hidden css={styles.slotContainers}>
        {height &&
          width &&
          hasMounted &&
          aNumberToDisplay.map((nb, i) => {
            const to = parseInt(numberToDisplayStr.substr(0, i + 1), 10);
            return (
              <Slot
                key={i}
                to={to}
                numberToDisplay={parseInt(nb, 10)}
                height={height}
                width={width}
                animate={animate}
                transitionDuration={transitionDuration}
              />
            );
          })}
      </span>
    </span>
  );
}

export default Casino;
