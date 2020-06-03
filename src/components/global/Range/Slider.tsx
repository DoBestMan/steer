import { MutableRefObject, useRef } from 'react';

import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';

import useRangeSliderManager from './Range.hooks';
import styles from './Range.styles';

interface Props {
  defaultValue: number;
  interval: number;
  label: string;
  max: number;
  min: number;
  onAriaTextChange: (value: number) => string;
  onChange: (value: number) => void;
  railEl: MutableRefObject<HTMLDivElement | null>;
}

export default function Slider({ label, onAriaTextChange, ...props }: Props) {
  const sliderEl = useRef<HTMLDivElement | null>(null);
  const { maxCurrent, minCurrent, value } = useRangeSliderManager({
    ...props,
    sliderEl,
  });
  return (
    <div
      ref={sliderEl}
      role="slider"
      tabIndex={0}
      css={styles.indicator}
      aria-valuemin={minCurrent}
      aria-valuenow={value}
      aria-valuemax={maxCurrent}
      aria-label={label}
      aria-valuetext={onAriaTextChange(value)}
    >
      <Icon name={ICONS.GRIP} />
    </div>
  );
}
