import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';

import FocusTrap from '~/components/global/FocusTrap/FocusTrap';
import styles from '~/components/modules/Catalog/Filters/Popup/Dropdown.styles';
import { getPosition } from '~/components/modules/Catalog/Filters/Popup/Dropdown.utils';
import { useWindowSize } from '~/hooks/useWindowSize';
import { KEYCODES } from '~/lib/constants';

interface Props {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function FilterDropdown({ children, isOpen, onClose }: Props) {
  const dropdownEl = useRef<HTMLDivElement>(null);
  const [positionStyle, setPosition] = useState<CSSProperties | null>(null);
  const { width } = useWindowSize();
  useEffect(() => {
    // click/mouse handlers to close dropdown, click outside + escape
    function onKeypress(e: KeyboardEvent) {
      if (isOpen && e.keyCode === KEYCODES.ESCAPE) {
        onClose();
      }
    }
    function onClick(e: Event) {
      if (
        isOpen &&
        e.target instanceof HTMLElement &&
        !dropdownEl.current?.contains(e.target)
      ) {
        onClose();
      }
    }

    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKeypress);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKeypress);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    // don't update positioning if dropdown isn't open yet
    if (!isOpen) {
      return;
    }
    setPosition(getPosition());
  }, [isOpen, width]);

  if (!positionStyle) {
    return null;
  }

  return (
    <FocusTrap active={isOpen} ref={dropdownEl}>
      <div
        ref={dropdownEl}
        aria-hidden={!isOpen}
        css={[styles.root, isOpen && styles.open]}
        style={positionStyle}
      >
        {/* focus trap and dropdown wrapper need to be in dom to update positioning
        and focus but wait to render children until it's open */}
        {isOpen && children}
      </div>
    </FocusTrap>
  );
}
