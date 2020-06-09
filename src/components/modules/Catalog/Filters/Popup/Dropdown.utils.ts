/*
 * Dropdown is fixed position to overcome list container height and overflow hidden in main filters list
 * Utils help position dropdown relative to parent element (button or link containing dropdown)
 */

import { CSSProperties, MutableRefObject } from 'react';

interface Args {
  dropdownEl: MutableRefObject<HTMLDivElement | null>;
}

/**
 * Get y position of parent element to use as y position (+ parent height) for dropdown
 */
export function getParentY({ dropdownEl }: Args) {
  const buttonElBounds = dropdownEl.current?.previousElementSibling?.getBoundingClientRect();
  if (!buttonElBounds) {
    return 0;
  }
  return buttonElBounds.top + buttonElBounds.height;
}

/**
 * Get x position of parent element to use as x position for dropdown
 * Flips dropdown if parent el is positioned in last third of window width for full visibility
 */
export function getParentX({ dropdownEl }: Args): CSSProperties {
  const parentEl = dropdownEl.current?.previousElementSibling;
  const buttonElBounds = parentEl?.getBoundingClientRect();
  if (!buttonElBounds || !(parentEl instanceof HTMLElement)) {
    return {};
  }

  const lastThird = window.innerWidth - window.innerWidth / 3;
  if (buttonElBounds.x > lastThird) {
    const scrollbarWidth = window.innerWidth - document.body.offsetWidth;
    return {
      right:
        window.innerWidth -
        (buttonElBounds.left + parentEl.clientWidth) -
        scrollbarWidth,
    };
  }
  return { left: buttonElBounds.x };
}
