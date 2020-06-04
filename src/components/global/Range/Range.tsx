import { useEffect, useRef, useState } from 'react';

import { useWindowSize } from '~/hooks/useWindowSize';
import { ui } from '~/lib/utils/ui-dictionary';

import styles, { INDICATOR_SIZE } from './Range.styles';
import Slider from './Slider';

interface Props {
  defaultValue?: number | string;
  formatLabel?: (value: number) => string;
  getAriaText?: (value: number) => string;
  interval?: number;
  max: number;
  maxDefault?: number;
  maxLabel?: string;
  min: number;
  minDefault?: number;
  minLabel?: string;
  name: string;
}

export default function Range({
  formatLabel,
  getAriaText,
  interval = 1,
  minDefault,
  maxDefault,
  name,
  max,
  min,
}: Props) {
  const railEl = useRef<HTMLDivElement | null>(null);
  const minLabelEl = useRef<HTMLDivElement | null>(null);
  const maxLabelEl = useRef<HTMLDivElement | null>(null);
  const [minCurrent, setMinCurrent] = useState(minDefault || min);
  const [maxCurrent, setMaxCurrent] = useState(maxDefault || max);
  const [fillStyles, setFillStyles] = useState({});
  const { width } = useWindowSize(); // update fill color width if window is resized

  function handleMaxChange(value: number) {
    setMaxCurrent(value);
  }
  function handleMinChange(value: number) {
    setMinCurrent(value);
  }
  function announceTextChange(value: number) {
    return (getAriaText && getAriaText(value)) || value.toString();
  }

  useEffect(() => {
    if (!railEl.current) {
      return;
    }
    const minEl = railEl.current.firstElementChild;
    const maxEl = railEl.current.lastElementChild;
    if (maxEl instanceof HTMLElement && minEl instanceof HTMLElement) {
      const indicatorHalf = INDICATOR_SIZE / 2;
      const width = maxEl.offsetLeft - minEl.offsetLeft + indicatorHalf;
      setFillStyles({
        marginLeft: minEl.offsetLeft + indicatorHalf,
        width,
      });
    }
  }, [minCurrent, maxCurrent, width]);
  return (
    <>
      <div css={styles.root}>
        <div css={[styles.fillColor, fillStyles]} />
        <div ref={railEl} css={styles.rail}>
          <Slider
            onAriaTextChange={announceTextChange}
            railEl={railEl}
            min={min}
            interval={interval}
            max={max}
            onChange={handleMinChange}
            defaultValue={minCurrent}
            label={`${name} ${ui('catalog.filters.min')}`}
            css={styles.minIndicator}
          />
          <Slider
            onAriaTextChange={announceTextChange}
            railEl={railEl}
            min={min}
            max={max}
            interval={interval}
            onChange={handleMaxChange}
            defaultValue={maxCurrent}
            label={`${name} ${ui('catalog.filters.max')}`}
            css={styles.maxIndicator}
          />
        </div>
      </div>
      <div css={styles.labels}>
        <div ref={minLabelEl}>
          {(formatLabel && formatLabel(minCurrent)) || minCurrent}
        </div>
        <div ref={maxLabelEl}>
          {(formatLabel && formatLabel(maxCurrent)) || maxCurrent}
        </div>
      </div>
    </>
  );
}
