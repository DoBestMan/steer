import { useState } from 'react';

import Button from '~/components/global/Button/Button';

import { CompareContextProvider } from '../Compare.context';
import CompareModal from './CompareModal';

export default {
  component: CompareModal,
  title: 'Compare/CompareModal',
};

export function CompareModalDefault() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <CompareContextProvider>
      <div>
        <Button onClick={toggleModal}>OpenModal</Button>
        <CompareModal />
      </div>
    </CompareContextProvider>
  );
}
