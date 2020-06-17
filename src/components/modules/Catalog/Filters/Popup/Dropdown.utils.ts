import { CSSProperties } from 'react';

/**
 * Get x position of opened button el to use as x position for dropdown
 * Defaults to left position but flips dropdown (right position)
 * if button el is in last third of window width for visibility
 * @returns {} | { left: xPos } | { right: xPos }
 */
export function getPosition(): CSSProperties {
  const containerEl = document.getElementsByClassName('filters-wrapper')[0];
  const childrenArr = Array.from(containerEl.children);
  const selectedButton = childrenArr.find(
    (node: Element) => node.getAttribute('aria-expanded') === 'true',
  );
  const buttonElBounds = selectedButton?.getBoundingClientRect();

  if (!buttonElBounds || !selectedButton) {
    return {};
  }

  const lastThird = window.innerWidth - window.innerWidth / 3;
  if (buttonElBounds.x > lastThird) {
    return {
      right:
        window.innerWidth - (buttonElBounds.left + selectedButton.clientWidth),
    };
  }
  return { left: buttonElBounds.x };
}
