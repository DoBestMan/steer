import dynamic from 'next/dynamic';
import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';

import FocusTrap from '~/components/global/FocusTrap/FocusTrap';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { useWindowSize } from '~/hooks/useWindowSize';
import { KEYCODES } from '~/lib/constants';

import BottomCardModal from '../Modal/BottomCardModal';
import { ActionBarProps } from './ActionBar';
import styles from './Dropdown.styles';
import { getMinWidth, getPosition } from './Dropdown.utils';

const DynamicActionBar = dynamic(() => import('./ActionBar'));

interface Props {
  actionBar?: ActionBarProps | null;
  children: ReactNode;
  contentLabel: string;
  forceModal?: boolean;
  insideCarousel?: boolean;
  isOpen: boolean;
  onClose: () => void;
  shouldActivateListeners?: boolean;
}

export default function Dropdown({
  actionBar,
  children,
  contentLabel,
  forceModal,
  insideCarousel,
  isOpen,
  onClose,
  shouldActivateListeners = true,
}: Props) {
  const { greaterThan } = useBreakpoints();
  const dropdownEl = useRef<HTMLDivElement>(null);
  const [
    calculatedStyles,
    setCalculatedStyles,
  ] = useState<CSSProperties | null>(null);
  const { width } = useWindowSize();

  const isModal = !greaterThan.M || forceModal;

  useEffect(() => {
    // click/mouse handlers to close dropdown, click outside + escape
    function onKeypress(e: KeyboardEvent) {
      if (isModal) {
        return;
      }

      if (e.keyCode === KEYCODES.ESCAPE) {
        onClose();
      }
    }
    function onClick(e: Event) {
      if (isModal || !isOpen || !shouldActivateListeners) {
        return;
      }

      if (
        e.target instanceof HTMLElement &&
        !dropdownEl.current?.contains(e.target)
      ) {
        onClose();
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
  }, [isOpen, onClose, isModal, shouldActivateListeners]);

  useEffect(() => {
    // don't update positioning if dropdown isn't open yet
    if (!isOpen) {
      return;
    }

    // non-carousel dropdowns don't need special positioning because they will not be scrolled
    // but will need custom min width to ensure they are not smaller than the parent button
    const stylesFn = insideCarousel ? getPosition : getMinWidth;
    setCalculatedStyles(stylesFn());
  }, [isOpen, insideCarousel, width]);

  if (!calculatedStyles) {
    return null;
  }

  if (!isModal) {
    return (
      <FocusTrap active={isOpen && shouldActivateListeners} ref={dropdownEl}>
        <div
          data-testid="dropdown-test-id"
          ref={dropdownEl}
          aria-hidden={!isOpen}
          css={[
            styles.root,
            isOpen && styles.open,
            actionBar && styles.actionBarContentDropdown,
            !insideCarousel ? styles.defaultDropdown : styles.carouselDropdown,
          ]}
          style={calculatedStyles || {}}
        >
          {/* focus trap and dropdown wrapper need to be in dom to update positioning
          and focus but wait to render children until it's open */}
          {isOpen && children}
          {!!actionBar && <DynamicActionBar {...actionBar} />}
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
      <div css={actionBar && styles.actionBarContentModal}>{children}</div>
      {!!actionBar && (
        <DynamicActionBar
          {...actionBar}
          customContainerStyles={styles.actionBarModal}
        />
      )}
    </BottomCardModal>
  );
}
