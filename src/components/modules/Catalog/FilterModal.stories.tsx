import { css } from '@emotion/core';
import { boolean } from '@storybook/addon-knobs';
import { useState } from 'react';

import Link from '~/components/global/Link/Link';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { LINK_THEME, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

import FilterModal from './FilterModal';

export default {
  component: FilterModal,
  title: 'Filter Modal',
};

function ModalButton({ toggleModal }: { toggleModal: () => void }) {
  return (
    <button css={typography.bodyCopy} onClick={toggleModal}>
      Open Modal
    </button>
  );
}

export function FilterModalWithKnobs() {
  const [isOpen, setIsOpen] = useState(false);
  function toggleModal() {
    setIsOpen(!isOpen);
  }
  const back = boolean('Has back button', false) ? toggleModal : undefined;
  const { bk } = useBreakpoints();
  return (
    <div>
      <ModalButton {...{ toggleModal }} />
      <FilterModal
        contentLabel="Modal"
        onBack={back}
        hasCloseButton={boolean('Has close button', true)}
        onClose={toggleModal}
        isOpen={isOpen}
      >
        <p css={typography.bodyCopy}>Default modal on {bk} breakpoint!</p>
      </FilterModal>
    </div>
  );
}

export function DefaultModal() {
  const [isOpen, setIsOpen] = useState(false);
  function toggleModal() {
    setIsOpen(!isOpen);
  }
  const { bk } = useBreakpoints();
  return (
    <div>
      <ModalButton {...{ toggleModal }} />
      <FilterModal contentLabel="Modal" onClose={toggleModal} isOpen={isOpen}>
        <p css={typography.bodyCopy}>Default modal on {bk} breakpoint!</p>
      </FilterModal>
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
    right: SPACING.SIZE_15,
    top: SPACING.SIZE_15,
  });
  return (
    <div>
      <ModalButton {...{ toggleModal }} />
      <FilterModal
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
        <p css={typography.bodyCopy}>Fullscreen modal content</p>
      </FilterModal>
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
      <FilterModal
        contentLabel="Modal"
        onBack={toggleModal}
        onClose={toggleModal}
        isOpen={isOpen}
      >
        <p css={typography.bodyCopy}>Fullscreen modal content</p>
      </FilterModal>
    </div>
  );
}
