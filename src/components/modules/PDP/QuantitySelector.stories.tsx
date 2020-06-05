import { useState } from 'react';

import Button from '~/components/global/Button/Button';

import QuantitySelector from './QuantitySelector';

export default {
  component: QuantitySelector,
  title: 'PDP/Quantity Selector',
};

export function QuantitySelectorDefault() {
  const [isOpen, setIsOpen] = useState(true);
  function toggleModal() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <Button onClick={toggleModal}>Open Modal</Button>
      <QuantitySelector
        isOpen={isOpen}
        onClose={toggleModal}
        onConfirm={toggleModal}
      />
    </>
  );
}
