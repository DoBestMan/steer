import { ReactNode, useEffect, useRef, useState } from 'react';

import Button from '~/components/global/Button/Button';
import FocusTrap from '~/components/global/FocusTrap/FocusTrap';
import { useScroll } from '~/hooks/useScroll';
import { KEYCODES } from '~/lib/constants';

import styles from './Dropdown.styles';
import { getParentX, getParentY } from './Dropdown.utils';
import { PopupProps } from './FilterPopup';

interface Props extends PopupProps {
  children: ReactNode;
}

export default function FilterDropdown({
  children,
  isOpen,
  onClose,
  onSelectFilter,
}: Props) {
  const dropdownEl = useRef<HTMLDivElement | null>(null);

  useScroll(() => setYPos(getParentY({ dropdownEl })));

  const [yPos, setYPos] = useState(getParentY({ dropdownEl }));
  const [xPos, setXPos] = useState(getParentX({ dropdownEl }));

  useEffect(() => {
    // click/mouse handlers to close dropdown, click outside + escape
    function onKeypress(e: KeyboardEvent) {
      if (e.keyCode === KEYCODES.ESCAPE) {
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
    // update x/y position on open
    setYPos(getParentY({ dropdownEl }));
    setXPos(getParentX({ dropdownEl }));
  }, [isOpen]);

  return (
    <FocusTrap active={isOpen} ref={dropdownEl}>
      <div
        ref={dropdownEl}
        aria-hidden={!isOpen}
        css={[styles.root, isOpen && styles.open]}
        style={{ ...xPos, top: yPos }}
      >
        {/* focus trap and dropdown wrapper need to be in dom to update positioning
        and focus but wait to render children until it's open */}
        {isOpen && children}
        <Button onClick={onSelectFilter}>Toggle filter</Button>
      </div>
    </FocusTrap>
  );
}
