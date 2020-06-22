import { useState } from 'react';

import Button from '~/components/global/Button/Button';

import RoadHazardModalContainer from './RoadHazardModal.container';

export default {
  component: RoadHazardModalContainer,
  title: 'PDP/Road Hazard Modal',
};

export function RoadHazardModalDefault() {
  const [isOpen, setIsOpen] = useState(true);

  function toggleModal() {
    setIsOpen(!isOpen);
  }
  return (
    <>
      <Button onClick={toggleModal}>Open Modal</Button>
      <RoadHazardModalContainer isOpen={isOpen} onClose={toggleModal} />
    </>
  );
}
