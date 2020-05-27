import { useEffect, useRef } from 'react';

import Button from '~/components/global/Button/Button';

import styles from './Dropdown.styles';

interface Props {
  isOpen: boolean;
  label?: string;
  onClose: () => void;
  onSelectFilter: () => void;
}

export default function FilterDropdown({
  isOpen,
  label,
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
  }, [isOpen, label, onClose]);

  return (
    <div ref={dropdownEl} css={[styles.root, isOpen && styles.open]}>
      <p>{label} dropdown</p>
      <Button onClick={onSelectFilter}>Toggle filter</Button>
    </div>
  );
}
