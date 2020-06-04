import { action } from '@storybook/addon-actions';
import { select } from '@storybook/addon-knobs';
import { useState } from 'react';

import Button from '~/components/global/Button/Button';
import { typography } from '~/styles/typography.styles';

import { FilterContentTypes } from '../Filter.types';
import { filterTypeMap, filterTypeSelect } from '../Filters.mocks';
import FilterPopup from './FilterPopup';

export default {
  component: FilterPopup,
  title: 'Catalog/Grid/Filters',
};

function ModalButton({ toggleModal }: { toggleModal: () => void }) {
  return (
    <Button css={typography.bodyCopy} onClick={toggleModal}>
      Open Modal
    </Button>
  );
}
// TODO: add filter type content stories

export function FilterPopupWithKnobs() {
  const [isOpen, setIsOpen] = useState(false);
  function toggleModal() {
    setIsOpen(!isOpen);
  }
  const type = select(
    'Filter type',
    filterTypeSelect,
    FilterContentTypes.CatalogFilterChecklist,
  );
  return (
    <div>
      <ModalButton {...{ toggleModal }} />
      <FilterPopup
        filter={filterTypeMap[type]}
        onSelectFilter={action('select filter')}
        onClose={toggleModal}
        isOpen={isOpen}
      />
    </div>
  );
}
