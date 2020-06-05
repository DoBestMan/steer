import { css } from '@emotion/core';
import { boolean, select } from '@storybook/addon-knobs';
import { useState } from 'react';

import { useBreakpoints } from '~/hooks/useBreakpoints';
import {
  BUTTON_THEME,
  COLORS,
  LINK_THEME,
  MODAL_THEME,
  SPACING,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

import Button from '../Button/Button';
import Link from '../Link/Link';
import BottomCardModal from './BottomCardModal';
import Modal from './Modal';

export default {
  component: Modal,
  title: 'Modal/Modal',
};

function ModalButton({ toggleModal }: { toggleModal: () => void }) {
  return <Button onClick={toggleModal}>Open Modal</Button>;
}

export function ModalWithKnobs() {
  const [isOpen, setIsOpen] = useState(false);
  function toggleModal() {
    setIsOpen(!isOpen);
  }
  const back = boolean('Has back button', false) ? toggleModal : undefined;
  const { bk } = useBreakpoints();
  return (
    <div>
      <ModalButton {...{ toggleModal }} />
      <Modal
        contentLabel="Modal"
        onBack={back}
        theme={select(
          'Modal theme',
          [MODAL_THEME.LIGHT, MODAL_THEME.ORANGE],
          MODAL_THEME.LIGHT,
        )}
        isFullscreen={boolean('Is fullscreen', false)}
        hasCloseButton={boolean('Has close button', true)}
        onClose={toggleModal}
        isOpen={isOpen}
      >
        <p css={typography.bodyCopy}>Default modal on {bk} breakpoint!</p>
      </Modal>
    </div>
  );
}

export function StackedModals() {
  const [isOpen, setIsOpen] = useState(false);
  const [isNestedOpen, setIsNestedOpen] = useState(false);
  function toggleModal() {
    setIsOpen(!isOpen);
  }
  function toggleNestedModal() {
    setIsNestedOpen(!isNestedOpen);
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
        isFullscreen
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
        <Button
          css={{ marginTop: SPACING.SIZE_40 }}
          theme={BUTTON_THEME.ORANGE}
          onClick={toggleNestedModal}
        >
          Open more modals!
        </Button>
        <Modal contentLabel="Modal" onClose={toggleModal} isOpen={isNestedOpen}>
          <p css={typography.bodyCopy}>Nested modal content</p>
        </Modal>
      </Modal>
    </div>
  );
}

export function DefaultModalLight() {
  const [isOpen, setIsOpen] = useState(false);
  function toggleModal() {
    setIsOpen(!isOpen);
  }
  const { bk } = useBreakpoints();
  return (
    <div>
      <ModalButton {...{ toggleModal }} />
      <Modal contentLabel="Modal" onClose={toggleModal} isOpen={isOpen}>
        <p css={typography.bodyCopy}>Default modal on {bk} breakpoint!</p>
      </Modal>
    </div>
  );
}

export function DefaultModalDark() {
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

export function DefaultModalOrange() {
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

export function BottomCardModalDefault() {
  const [isOpen, setIsOpen] = useState(false);
  function toggleModal() {
    setIsOpen(!isOpen);
  }
  return (
    <div>
      <ModalButton {...{ toggleModal }} />
      <BottomCardModal
        contentLabel="Modal"
        onClose={toggleModal}
        isOpen={isOpen}
      >
        <p css={typography.bodyCopy}>Bottom Card Modal</p>
      </BottomCardModal>
    </div>
  );
}

export function DefaultModalWithCustomClose() {
  const [isOpen, setIsOpen] = useState(false);
  function toggleModal() {
    setIsOpen(!isOpen);
  }
  const buttonStyles = css({
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
        onClose={toggleModal}
        isOpen={isOpen}
      >
        <Link
          theme={LINK_THEME.LIGHT}
          as="button"
          css={buttonStyles}
          onClick={toggleModal}
        >
          Cancel
        </Link>
        <p css={typography.bodyCopy}>Default modal content</p>
      </Modal>
    </div>
  );
}

export function DefaultModalWithBackButton() {
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
        <p css={typography.bodyCopy}>Default modal content</p>
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
        isFullscreen
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
      <Modal
        isFullscreen
        contentLabel="Modal"
        onClose={toggleModal}
        isOpen={isOpen}
      >
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
        isFullscreen
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

export function FullscreenModalWithCustomClose() {
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
        isFullscreen
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
