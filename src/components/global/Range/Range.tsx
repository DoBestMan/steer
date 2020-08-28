import { useEffect, useRef, useState } from 'react';

import { useWindowSize } from '~/hooks/useWindowSize';
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
  maxCurrent: number;
  maxLabel?: string;
  min: number;
  minCurrent: number;
  minLabel?: string;
  name: string;
  onMaxChange: (value: number) => void;
  onMinChange: (value: number) => void;
  onUpdate?: () => void;
  refreshValues?: boolean;
  setRefreshValues?: (value: boolean) => void;
  shouldReset?: boolean;
  size?: RANGE_SLIDER_SIZE;
}

export default function Range({
  formatLabel,
  minCurrent,
  maxCurrent,
  getAriaText,
  interval = 1,
  isDisabled,
  onMinChange,
  refreshValues,
  onMaxChange,
  max,
  min,
  name,
  shouldReset,
  onUpdate,
  size = RANGE_SLIDER_SIZE.REGULAR,
}: Props) {
  const isSmall = size === RANGE_SLIDER_SIZE.SMALL;
  const railEl = useRef<HTMLDivElement | null>(null);
  const [fillStyles, setFillStyles] = useState({});
  const maxLabel = (formatLabel && formatLabel(maxCurrent)) || maxCurrent;
  const minLabel = (formatLabel && formatLabel(minCurrent)) || minCurrent;
  const { width } = useWindowSize(); // update fill color width if window is resized

  function announceTextChange(value: number) {
    return (getAriaText && getAriaText(value)) || value.toString();
  }
  function onMouseUp() {
    onUpdate && onUpdate();
  }

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

  return (
    <div css={[isSmall && styles.rootSmall, isDisabled && styles.disable]}>
      {isSmall && <p css={styles.labelSm}>{minLabel}</p>}
      <div css={styles.container}>
        <div css={[styles.fillColor, fillStyles]} />
        <div ref={railEl} css={styles.rail}>
          <Slider
            refreshValues={refreshValues}
            onAriaTextChange={announceTextChange}
            railEl={railEl}
            min={min}
            interval={interval}
            max={max}
            onChange={onMinChange}
            onMouseUp={onMouseUp}
            shouldReset={shouldReset}
            defaultValue={min}
            label={`${name} ${ui('catalog.filters.min')}`}
            css={styles.minIndicator}
            size={size}
            value={minCurrent}
          />
          <Slider
            refreshValues={refreshValues}
            onAriaTextChange={announceTextChange}
            railEl={railEl}
            min={min}
            max={max}
            shouldReset={shouldReset}
            interval={interval}
            onMouseUp={onMouseUp}
            onChange={onMaxChange}
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
