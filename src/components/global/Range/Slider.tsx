import { MutableRefObject, useRef } from 'react';

import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';

import { RANGE_SLIDER_SIZE } from './Range.constants';
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
  shouldReset?: boolean;
  size: RANGE_SLIDER_SIZE;
}

export default function Slider({
  label,
  onAriaTextChange,
  size,
  ...props
}: Props) {
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
      css={[styles.indicator, styles[size]]}
      aria-valuemin={minCurrent}
      aria-valuenow={value}
      aria-valuemax={maxCurrent}
      aria-label={label}
      aria-valuetext={onAriaTextChange(value)}
    >
      {size !== RANGE_SLIDER_SIZE.SMALL && <Icon name={ICONS.GRIP} />}
    </div>
  );
}
