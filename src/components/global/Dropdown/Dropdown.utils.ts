import { CSSProperties } from 'react';

import { SPACING } from '~/lib/constants';

/**
 * Get x position of opened button el to use as x position for dropdown
 * Defaults to left position but flips dropdown (right position)
 * if button el is in last third of window width for visibility
 * @returns {} | { left: xPos } | { right: xPos }
 */
export function getPosition(): CSSProperties {
  const selectedButton = document.querySelector(
    '.dropdown-button[aria-expanded="true"]',
  );
  const buttonElBounds = selectedButton?.getBoundingClientRect();
  if (!buttonElBounds || !selectedButton) {
    return {};
  }

  const lastHalf = window.innerWidth / 2;
  if (buttonElBounds.x > lastHalf) {
    return {
      right:
        window.innerWidth -
        (buttonElBounds.left + buttonElBounds.width) -
        SPACING.SIZE_20,
    };
  }

  return {
    left: buttonElBounds.x,
  };
}

export function getMinWidth(): CSSProperties {
  const selectedButton = document.querySelector(
    '.dropdown-button[aria-expanded="true"]',
  );
  const buttonElBounds = selectedButton?.getBoundingClientRect();
  if (!buttonElBounds || !selectedButton) {
    return {};
  }

  return {
    minWidth: buttonElBounds.width + SPACING.SIZE_40,
  };
}
