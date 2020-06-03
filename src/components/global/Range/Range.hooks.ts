import { MutableRefObject, useEffect, useRef } from 'react';

import { handleKeyDown, handleMouseDown, initListeners } from './Range.utils';

interface SliderArgs {
  defaultValue?: number;
  interval: number;
  max?: number;
  min?: number;
  onChange: (value: number) => void;
  railEl: MutableRefObject<HTMLDivElement | null>;
  sliderEl: MutableRefObject<HTMLDivElement | null>;
}
function useRangeSliderManager({
  defaultValue = 0,
  min = 0,
  max = 5,
  sliderEl,
  ...rest
}: SliderArgs) {
  const minEl = useRef<Element | null>(null);
  const maxEl = useRef<Element | null>(null);
  const railMin = useRef(min);
  const railMax = useRef(max);
  const railWidth = useRef<number>(0);
  const valueNow = useRef<number>(defaultValue);
  const handlerProps = {
    ...rest,
    maxEl,
    minEl,
    railMax,
    railMin,
    railWidth,
    sliderEl,
    valueNow,
  };
  useEffect(() => {
    initListeners(handlerProps);

    () => {
      if (!sliderEl.current) {
        return;
      }
      sliderEl.current.removeEventListener('keydown', (e) =>
        handleKeyDown(handlerProps, e),
      );
      sliderEl.current.removeEventListener('mousedown', (e) =>
        handleMouseDown(handlerProps, e),
      );
    };

    // originally was going to execute onChange on mouse up, but we would still have to
    // set the style for the fill width and margin as the sliders move. for now it is being
    // triggered on mouse move, updating the values will cause use effect to run too often
    // possible TODO: update fill styles via DOM manipulation rather than repaint
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sliderEl]);

  return {
    maxCurrent: railMax.current,
    minCurrent: railMin.current,
    value: valueNow.current,
  };
}

export default useRangeSliderManager;
