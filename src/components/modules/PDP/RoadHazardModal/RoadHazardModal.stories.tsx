import { useState } from 'react';

import Button from '~/components/global/Button/Button';

import RoadHazardModal from './RoadHazardModal';

export default {
  component: RoadHazardModal,
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
      <RoadHazardModal isOpen={isOpen} onClose={toggleModal} />
    </>
  );
}
