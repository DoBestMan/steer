/*
 * Guidance from w3 example for multi thumb slider
 * https://www.w3.org/TR/2019/NOTE-wai-aria-practices-1.1-20190814/examples/slider/multithumb-slider.html
 */

import { MutableRefObject } from 'react';

import { KEYCODES } from '~/lib/constants';

interface Props {
  interval: number;
  maxEl: MutableRefObject<Element | null>;
  minEl: MutableRefObject<Element | null>;
  onChange: (value: number) => void; // updates local value
  onMouseUp?: () => void; // updates parent value
  railEl: MutableRefObject<HTMLDivElement | null>;
  railMax: MutableRefObject<number>;
  railMin: MutableRefObject<number>;
  railWidth: MutableRefObject<number>;
  sliderEl: MutableRefObject<HTMLDivElement | null>;
  valueNow: MutableRefObject<number>;
}
/**
 * Ref Guide
 * @maxEl reference to the max slider node
 *    - undefined if this is the max slider node
 *    - used to determine minimum value on rail
 * @minEl reference to the min slider node
 *    - undefined if this is the min slider node
 *    - used to determin maximum value on rail
 * @railEl rail node on which the sliders move
 * @railMax the maximum value the slider can be
 * @railMin the minimum value the slider can be
 * @railWidth client width of the rail node
 * @valueNow value of the slider node as it is being moved
 */

/**
 * Initialize Listeners and Refs
 * Set the initial ref values on mount. This includes checking for previous or next
 * sibling to determine whether this is the max or min slider node. Other listener's will be
 * referencing this node to determine min and max values.
 */
export function initListeners(props: Props) {
  const {
    maxEl,
    minEl,
    railEl,
    railMax,
    railMin,
    railWidth,
    sliderEl,
    valueNow,
  } = props;
  if (!sliderEl.current || !railEl.current) {
    return;
  }
  const { current: sliderNode } = sliderEl;

  sliderNode.addEventListener('keydown', handleKeyDown.bind(null, props));
  sliderNode.addEventListener('touchstart', handleMouseDown.bind(null, props));
  sliderNode.addEventListener('mousedown', handleMouseDown.bind(null, props));

  // min/max is set from the sibling's value
  // if previous element sibling exists, this is max slider
  if (sliderNode.previousElementSibling) {
    minEl.current = sliderNode.previousElementSibling;
    railMin.current = getValueAttr(minEl.current, 'aria-valuemin');
  }

  // if previous element sibling exists, this is min slider
  if (sliderNode.nextElementSibling) {
    maxEl.current = sliderNode.nextElementSibling;
    railMax.current = getValueAttr(maxEl.current, 'aria-valuemax');
  }

  railWidth.current = railEl.current.clientWidth;
  moveSlider(props, valueNow.current);
}

/**
 * Mouse Down
 * Adds `mousemove` listener to update the slider position as it's being moved
 * Adds `mouseup` listener to determine when mouse tracking listeners should be removed
 */
export function handleMouseDown(props: Props, e: MouseEvent | TouchEvent) {
  const { interval, railMax, railMin, railEl, railWidth, sliderEl } = props;
  if (!sliderEl.current || !railEl.current) {
    return;
  }

  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('touchmove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
  document.addEventListener('touchend', handleMouseUp);
  function handleMouseMove(e: MouseEvent | TouchEvent) {
    if (!sliderEl.current || !railEl.current) {
      return;
    }

    const pageX = e instanceof MouseEvent ? e.pageX : e.touches[0].pageX;
    const railElBounds = railEl.current.getBoundingClientRect();
    const diffX = pageX - railElBounds.left;
    const currentValue =
      railMin.current +
      ((railMax.current - railMin.current) * diffX) / railWidth.current;
    // round to the nearest interval
    const value = Math.round(currentValue / interval) * interval;
    moveSlider(props, value);

    e.preventDefault();
    e.stopPropagation();
  }

  function handleMouseUp() {
    props.onMouseUp && props.onMouseUp();
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('touchmove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('touchend', handleMouseUp);
  }

  e.preventDefault();
  e.stopPropagation();
}

/**
 * Given an attribute string, get the int value or 0 from the Element supplied
 * Isolated to reduce noise in other functions
 * @returns int
 */
export const getValueAttr = (target: Element, attr: string) =>
  parseInt(target.getAttribute(attr) || '0');

/**
 * Move Slider
 * Updates slider positioning, aria values, and current min/max
 * Applies `left` style to slider node to reflect changes in UI
 */
function moveSlider(props: Props, value: number) {
  const { interval, maxEl, minEl, railEl, sliderEl, valueNow } = props;
  if (!sliderEl.current || !railEl.current) {
    return;
  }

  const sliderNode = sliderEl.current;
  // use attribute from slider node instead of railmin/railmax because those might indicate min relative to other slider
  const valueMax = getValueAttr(sliderNode, 'aria-valuemax');
  const valueMin = getValueAttr(sliderNode, 'aria-valuemin');
  if (value >= valueMax) {
    // max slider
    value = valueMax;
    if (maxEl.current) {
      // min slider should stop one interval below max slider
      value = valueMax - interval;
    }
  }

  if (value <= valueMin) {
    // min slider
    value = valueMin;
    if (minEl.current) {
      // max slider should stop one interval above min slider
      value = valueMin + interval;
    }
  }

  const roundedVal = Math.round(value);
  valueNow.current = roundedVal;

  const stringVal = roundedVal.toString();
  sliderNode.setAttribute('aria-valuenow', stringVal);

  // set new min/max when slider moves
  if (minEl.current) {
    minEl.current.setAttribute('aria-valuemax', stringVal);
  }
  if (maxEl.current) {
    maxEl.current.setAttribute('aria-valuemin', stringVal);
  }

  setNodeStyle(props);

  props.onChange(roundedVal);
}

export function setNodeStyle({
  minEl,
  railEl,
  railMax,
  railMin,
  railWidth,
  sliderEl,
  valueNow,
}: Props) {
  if (!sliderEl.current || !railEl.current) {
    return;
  }
  // set left style attribute
  const pos = Math.round(
    ((valueNow.current - railMin.current) *
      (railWidth.current - 2 * sliderEl.current.clientWidth)) /
      (railMax.current - railMin.current),
  );

  // if minEl exists set style on the max slider
  if (minEl.current) {
    sliderEl.current.style.left = `${pos + sliderEl.current.clientWidth}px`;
  } else {
    // set style on min slider
    sliderEl.current.style.left = `${pos}px`;
  }
}

/**
 * Keydown Listener
 * Steps slider depending on key pressed
 * @ARROW_UP / @ARROW_RIGHT increases slider by determined interval
 * @ARROW_DOWN / @ARROW_LEFT decreases slider by determined interval
 * @PAGE_DOWN decreases by intervals of 10
 * @PAGE_UP increases by intervals of 10
 * @HOME sets slider to min
 * @END sets slider to max
 */
export function handleKeyDown(props: Props, e: KeyboardEvent) {
  const value = props.valueNow.current;
  let flag = false;
  switch (e.keyCode) {
    case KEYCODES.ARROW_LEFT:
    case KEYCODES.ARROW_DOWN:
      moveSlider(props, value - props.interval);
      flag = true;
      break;

    case KEYCODES.ARROW_RIGHT:
    case KEYCODES.ARROW_UP:
      moveSlider(props, value + props.interval);
      flag = true;
      break;

    // if intervals are greater than 1 there isn't much benefit to adding greater jumps
    case KEYCODES.PAGE_DOWN:
      if (props.interval > 1) {
        moveSlider(props, value - props.interval);
        return;
      }
      moveSlider(props, value - 10);
      flag = true;
      break;

    case KEYCODES.PAGE_UP:
      if (props.interval > 1) {
        moveSlider(props, value + props.interval);
        return;
      }
      moveSlider(props, value + 10);
      flag = true;
      break;

    case KEYCODES.HOME:
      moveSlider(props, props.railMin.current);
      flag = true;
      break;

    case KEYCODES.END:
      moveSlider(props, props.railMax.current);
      flag = true;
      break;

    default:
      break;
  }

  if (flag) {
    e.preventDefault();
    e.stopPropagation();
  }
}
