import { ReactNode, useEffect, useRef } from 'react';

import { KEYCODES } from '~/lib/constants';

interface FilterDropdownProps {
  children: ReactNode;
  isOpen: boolean;
  onFilterClose: () => void;
}

function FilterDropdown({
  children,
  isOpen,
  onFilterClose,
}: FilterDropdownProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeypress(e: KeyboardEvent) {
      if (e.keyCode === KEYCODES.ESCAPE) {
        onFilterClose();
      }
    }
    function onClick(e: Event) {
      if (!isOpen) {
        return;
      }
      if (
        e.target instanceof HTMLElement &&
        wrapperRef.current &&
        !wrapperRef?.current?.contains(e.target)
      ) {
        onFilterClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', onClick);
      document.addEventListener('touchstart', onClick);
      document.addEventListener('keydown', onKeypress);
    } else {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('touchstart', onClick);
      document.removeEventListener('keydown', onKeypress);
    }

    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('touchstart', onClick);
      document.removeEventListener('keydown', onKeypress);
    };
  }, [isOpen, onFilterClose]);

  return <div ref={wrapperRef}>{children}</div>;
}

export default FilterDropdown;
