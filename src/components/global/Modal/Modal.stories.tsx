import { css } from '@emotion/core';
import { boolean, select } from '@storybook/addon-knobs';
import { useState } from 'react';

import { useBreakpoints } from '~/hooks/useBreakpoints';
import {
  COLORS,
  LINK_THEME,
  MODAL_THEME,
  MODAL_TYPE,
  SPACING,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

import Link from '../Link/Link';
import Modal from './Modal';

export default {
  component: Modal,
  title: 'Modal',
};

function ModalButton({ toggleModal }: { toggleModal: () => void }) {
  return (
    <button css={typography.bodyCopy} onClick={toggleModal}>
      Open Modal
    </button>
  );
}

export function ModalWithKnobs() {
  const [isOpen, setIsOpen] = useState(false);
  function toggleModal() {
    setIsOpen(!isOpen);
  }
  const modalType = select(
    'Modal type',
    [MODAL_TYPE.OVERLAY, MODAL_TYPE.FULLSCREEN],
    MODAL_TYPE.OVERLAY,
  );
  const back = boolean('Has back button', false) ? toggleModal : undefined;
  const { bk } = useBreakpoints();
  return (
    <div>
      <ModalButton {...{ toggleModal }} />
      <Modal
        contentLabel="Modal"
        onBack={back}
        type={modalType}
        theme={select(
          'Modal theme',
          [MODAL_THEME.LIGHT, MODAL_THEME.ORANGE],
          MODAL_THEME.LIGHT,
        )}
        hasCloseButton={boolean('Has close button', true)}
        onClose={toggleModal}
        isOpen={isOpen}
      >
        <p css={typography.bodyCopy}>
          {modalType} modal on {bk} breakpoint!
        </p>
      </Modal>
    </div>
  );
}

export function OverlayModal() {
  const [isOpen, setIsOpen] = useState(false);
  function toggleModal() {
    setIsOpen(!isOpen);
  }
  const { bk } = useBreakpoints();
  return (
    <div>
      <ModalButton {...{ toggleModal }} />
      <Modal
        contentLabel="Modal"
        type={MODAL_TYPE.OVERLAY}
        onClose={toggleModal}
        isOpen={isOpen}
      >
        <p css={typography.bodyCopy}>Overlay modal on {bk} breakpoint!</p>
      </Modal>
    </div>
  );
}

export function FullscreenModalDark() {
  const [isOpen, setIsOpen] = useState(false);
  function toggleModal() {
    setIsOpen(!isOpen);
  }
  return (
    <div>
      <ModalButton {...{ toggleModal }} />
      <Modal
        contentLabel="Modal"
        theme={MODAL_THEME.DARK}
        onClose={toggleModal}
        isOpen={isOpen}
      >
        <p css={typography.bodyCopy}>Fullscreen modal content</p>
      </Modal>
    </div>
  );
}

export function FullscreenModalLight() {
  const [isOpen, setIsOpen] = useState(false);
  function toggleModal() {
    setIsOpen(!isOpen);
  }
  return (
    <div>
      <ModalButton {...{ toggleModal }} />
      <Modal contentLabel="Modal" onClose={toggleModal} isOpen={isOpen}>
        <p css={typography.bodyCopy}>Fullscreen modal content</p>
      </Modal>
    </div>
  );
}

export function FullscreenModalOrange() {
  const [isOpen, setIsOpen] = useState(false);
  function toggleModal() {
    setIsOpen(!isOpen);
  }
  return (
    <div>
      <ModalButton {...{ toggleModal }} />
      <Modal
        contentLabel="Modal"
        theme={MODAL_THEME.ORANGE}
        onClose={toggleModal}
        isOpen={isOpen}
      >
        <p css={typography.bodyCopy}>Fullscreen modal content</p>
      </Modal>
    </div>
  );
}

export function ModalWithCustomClose() {
  const [isOpen, setIsOpen] = useState(false);
  function toggleModal() {
    setIsOpen(!isOpen);
  }
  const buttonStyles = css({
    color: COLORS.GLOBAL.WHITE,
    position: 'absolute',
    right: SPACING.SIZE_10,
    top: SPACING.SIZE_10,
  });
  return (
    <div>
      <ModalButton {...{ toggleModal }} />
      <Modal
        contentLabel="Modal"
        hasCloseButton={false}
        theme={MODAL_THEME.ORANGE}
        onClose={toggleModal}
        isOpen={isOpen}
      >
        <Link
          theme={LINK_THEME.DARK}
          as="button"
          css={buttonStyles}
          onClick={toggleModal}
        >
          Cancel
        </Link>
        <p css={typography.bodyCopy}>Fullscreen modal content</p>
      </Modal>
    </div>
  );
}

export function ModalWithBackButton() {
  const [isOpen, setIsOpen] = useState(false);
  function toggleModal() {
    setIsOpen(!isOpen);
  }
  return (
    <div>
      <ModalButton {...{ toggleModal }} />
      <Modal
        contentLabel="Modal"
        onBack={toggleModal}
        onClose={toggleModal}
        isOpen={isOpen}
      >
        <p css={typography.bodyCopy}>Fullscreen modal content</p>
      </Modal>
    </div>
  );
}
