import { ReactNode, useEffect, useRef } from 'react';

import Button from '~/components/global/Button/Button';

import styles from './Dropdown.styles';
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

  useEffect(() => {
    // click outside functionality
    function onClick(e: Event) {
      if (
        isOpen &&
        e.target instanceof HTMLElement &&
        !dropdownEl.current?.contains(e.target)
      ) {
        onClose();
      }
    }
    window.addEventListener('mouseup', onClick);
    return () => {
      window.removeEventListener('mouseup', onClick);
    };
  }, [isOpen, onClose]);

  return (
    <div
      ref={dropdownEl}
      aria-hidden={!isOpen}
      css={[styles.root, isOpen && styles.open]}
    >
      {children}
      <Button onClick={onSelectFilter}>Toggle filter</Button>
    </div>
  );
}
