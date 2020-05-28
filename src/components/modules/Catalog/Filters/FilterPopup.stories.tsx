import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import { useState } from 'react';

import Button from '~/components/global/Button/Button';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { typography } from '~/styles/typography.styles';

import FilterPopup from './FilterPopup';

export default {
  component: FilterPopup,
  title: 'Filter Popup',
};

function ModalButton({ toggleModal }: { toggleModal: () => void }) {
  return (
    <Button css={typography.bodyCopy} onClick={toggleModal}>
      Open Popup
    </Button>
  );
}

export function FilterPopupWithKnobs() {
  const [isOpen, setIsOpen] = useState(false);
  function toggleModal() {
    setIsOpen(!isOpen);
  }
  const moreFilters = boolean('More filters view', false);
  const { bk } = useBreakpoints();
  return (
    <div>
      <ModalButton {...{ toggleModal }} />
      <FilterPopup
        isDropdown={!moreFilters}
        onSelectFilter={action('select filter')}
        label={`Popup on ${bk} breakpoint`}
        onClose={toggleModal}
        isOpen={isOpen}
      />
    </div>
  );
}

export function FilterPopupDefault() {
  const [isOpen, setIsOpen] = useState(false);
  function toggleModal() {
    setIsOpen(!isOpen);
  }
  const { bk } = useBreakpoints();
  return (
    <div>
      <ModalButton {...{ toggleModal }} />
      <FilterPopup
        isDropdown
        onSelectFilter={action('select filter')}
        label={`Filter popup on ${bk} breakpoint`}
        onClose={toggleModal}
        isOpen={isOpen}
      />
    </div>
  );
}

export function FilterPopupMoreFilters() {
  const [isOpen, setIsOpen] = useState(false);
  function toggleModal() {
    setIsOpen(!isOpen);
  }
  const { bk } = useBreakpoints();
  return (
    <div>
      <ModalButton {...{ toggleModal }} />
      <FilterPopup
        isDropdown={false}
        onSelectFilter={action('select filter')}
        label={`More filters popup on ${bk} breakpoint`}
        onClose={toggleModal}
        isOpen={isOpen}
      />
    </div>
  );
}
