import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';

import FocusTrap from '~/components/global/FocusTrap/FocusTrap';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { useWindowSize } from '~/hooks/useWindowSize';
import { KEYCODES } from '~/lib/constants';

import BottomCardModal from '../Modal/BottomCardModal';
import ActionBar, { ActionBarProps } from './ActionBar';
import styles from './Dropdown.styles';
import { getPosition } from './Dropdown.utils';

interface Props {
  actionBar?: ActionBarProps | null;
  children: ReactNode;
  contentLabel: string;
  forceModal?: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export default function Dropdown({
  actionBar,
  children,
  contentLabel,
  forceModal,
  isOpen,
  onClose,
}: Props) {
  const { isMobile } = useBreakpoints();
  const dropdownEl = useRef<HTMLDivElement>(null);
  const [positionStyle, setPosition] = useState<CSSProperties | null>(null);
  const { width } = useWindowSize();

  const isModal = isMobile || forceModal;

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
    // don't update positioning if dropdown isn't open yet
    if (!isOpen) {
      return;
    }

    setPosition(getPosition());
  }, [isOpen, width]);

  if (!positionStyle) {
    return null;
  }

  if (!isModal) {
    return (
      <FocusTrap active={isOpen} ref={dropdownEl}>
        <div
          ref={dropdownEl}
          aria-hidden={!isOpen}
          css={[
            styles.root,
            isOpen && styles.open,
            actionBar && styles.actionBarDropdown,
          ]}
          style={positionStyle}
        >
          {/* focus trap and dropdown wrapper need to be in dom to update positioning
          and focus but wait to render children until it's open */}
          {isOpen && children}
          {!!actionBar && <ActionBar {...actionBar} />}
        </div>
      </FocusTrap>
    );
  }

  return (
    <BottomCardModal
      contentLabel={contentLabel}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div css={actionBar && styles.actionBarModal}>{children}</div>
      {!!actionBar && <ActionBar {...actionBar} />}
    </BottomCardModal>
  );
}
