import { ReactNode } from 'react';
import ReactModal from 'react-modal';

import { ICONS } from '~/components/global/Icon/Icon.constants';
import Link from '~/components/global/Link/Link';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { COLORS, LINK_THEME, TIME, Z_INDEX } from '~/lib/constants';
import { bindAppElement } from '~/lib/utils/modal';
import { ui } from '~/lib/utils/ui-dictionary';

import { PopupProps } from './FilterPopup';
import styles, { overlayBkStyles } from './Popup/FilterModal.styles';

bindAppElement();

interface Props extends PopupProps {
  children: ReactNode;
  contentLabel: string;
}

function FilterModal({ children, contentLabel, isOpen, onClose }: Props) {
  const { bk } = useBreakpoints();
  return (
    <ReactModal
      contentLabel={contentLabel}
      isOpen={isOpen}
      onRequestClose={onClose}
      closeTimeoutMS={TIME.MS350}
      style={{
        overlay: {
          // react-modal library can't take serialized styles
          backgroundColor: COLORS.LIGHT.GRAY_70,
          opacity: isOpen ? 1 : 0,
          transition: `opacity ${TIME.MS350}ms ease-in-out ${TIME.MS100}ms`,
          zIndex: Z_INDEX.TOP,
        },
      }}
      css={[
        styles.root,
        overlayBkStyles[bk].default,
        isOpen && overlayBkStyles[bk].open,
      ]}
    >
      <div css={styles.actions}>
        <Link
          as="button"
          icon={ICONS.CLOSE}
          aria-label={`${ui('modal.close')} ${contentLabel}`}
          onClick={onClose}
          theme={LINK_THEME.LIGHT}
          // this will allow modal content to start where padding begins rather than pushed down from actions bar
          css={styles.close}
        />
      </div>
      {children}
    </ReactModal>
  );
}

export default FilterModal;
