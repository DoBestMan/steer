import { useEffect, useRef, useState } from 'react';

import { useWindowSize } from '~/hooks/useWindowSize';
import { minMaxify } from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';

import { RANGE_SLIDER_SIZE } from './Range.constants';
import styles, { INDICATOR_SIZE } from './Range.styles';
import Slider from './Slider';

interface Props {
  defaultValue?: number | string;
  formatLabel?: (value: number) => string;
  getAriaText?: (value: number) => string;
  interval?: number;
  isDisabled?: boolean;
  max: number;
  maxDefault?: number;
  maxLabel?: string;
  min: number;
  minDefault?: number;
  minLabel?: string;
  name: string;
  onUpdate?: (value: string) => void;
  shouldReset?: boolean;
  size?: RANGE_SLIDER_SIZE;
}

export default function Range({
  formatLabel,
  getAriaText,
  interval = 1,
  isDisabled,
  max,
  maxDefault,
  min,
  minDefault,
  name,
  shouldReset,
  onUpdate,
  size = RANGE_SLIDER_SIZE.REGULAR,
}: Props) {
  const isSmall = size === RANGE_SLIDER_SIZE.SMALL;
  const railEl = useRef<HTMLDivElement | null>(null);
  const [minCurrent, setMinCurrent] = useState(minDefault || min);
  const [maxCurrent, setMaxCurrent] = useState(maxDefault || max);
  const [fillStyles, setFillStyles] = useState({});
  const maxLabel = (formatLabel && formatLabel(maxCurrent)) || maxCurrent;
  const minLabel = (formatLabel && formatLabel(minCurrent)) || minCurrent;
  const { width } = useWindowSize(); // update fill color width if window is resized
  const minMax = useRef(minMaxify(minCurrent, maxCurrent));
  function handleMaxChange(value: number) {
    setMaxCurrent(value);
  }
  function handleMinChange(value: number) {
    setMinCurrent(value);
  }
  function announceTextChange(value: number) {
    return (getAriaText && getAriaText(value)) || value.toString();
  }
  function onMouseUp() {
    onUpdate && onUpdate(minMax.current);
  }

  useEffect(() => {
    if (shouldReset) {
      setMinCurrent(min);
      setMaxCurrent(max);
    }
  }, [min, max, setMaxCurrent, setMinCurrent, shouldReset]);

  useEffect(() => {
    if (!railEl.current) {
      return;
    }
    const minEl = railEl.current.firstElementChild;
    const maxEl = railEl.current.lastElementChild;
    if (maxEl instanceof HTMLElement && minEl instanceof HTMLElement) {
      const indicatorHalf = INDICATOR_SIZE[size] / 2;
      const width = maxEl.offsetLeft - minEl.offsetLeft + indicatorHalf;
      setFillStyles({
        marginLeft: minEl.offsetLeft + indicatorHalf,
        width,
      });
    }
  }, [minCurrent, maxCurrent, size, width]);

  useEffect(() => {
    minMax.current = minMaxify(minCurrent, maxCurrent);
  }, [minCurrent, maxCurrent]);

  return (
    <div css={[isSmall && styles.rootSmall, isDisabled && styles.disable]}>
      {isSmall && <p css={styles.labelSm}>{minLabel}</p>}
      <div css={styles.container}>
        <div css={[styles.fillColor, fillStyles]} />
        <div ref={railEl} css={styles.rail}>
          <Slider
            onAriaTextChange={announceTextChange}
            railEl={railEl}
            min={min}
            interval={interval}
            max={max}
            onChange={handleMinChange}
            onMouseUp={onMouseUp}
            shouldReset={shouldReset}
            defaultValue={min}
            label={`${name} ${ui('catalog.filters.min')}`}
            css={styles.minIndicator}
            size={size}
            value={minCurrent}
          />
          <Slider
            onAriaTextChange={announceTextChange}
            railEl={railEl}
            min={min}
            max={max}
            shouldReset={shouldReset}
            interval={interval}
            onMouseUp={onMouseUp}
            onChange={handleMaxChange}
            defaultValue={max}
            label={`${name} ${ui('catalog.filters.max')}`}
            css={styles.maxIndicator}
            size={size}
            value={maxCurrent}
          />
        </div>
      </div>
      {isSmall && <p css={styles.labelSm}>{maxLabel}</p>}
      {!isSmall && (
        <div css={styles.labels}>
          <p>{minLabel}</p>
          <p>{maxLabel}</p>
        </div>
      )}
    </div>
  );
}
