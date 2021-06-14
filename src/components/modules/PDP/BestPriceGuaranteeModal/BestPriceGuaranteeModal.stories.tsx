import { action } from '@storybook/addon-actions';
import React, { useState } from 'react';

import Button from '~/components/global/Button/Button';
import { THEME } from '~/lib/constants';

import BestPriceGuaranteeModal from './BestPriceGuaranteeModal';
import { BEST_PRICE_MODAL_DATA } from './BestPriceGuaranteeModal.data';

export default {
  compoenent: BestPriceGuaranteeModal,
  title: 'PDP/BestPriceGuaranteeModal',
};

export function BestPriceGuanranteeModalDefault() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Button theme={THEME.LIGHT} onClick={onOpen}>
        {'Open best price guarantee modal'}
      </Button>
      <BestPriceGuaranteeModal
        isOpen={isOpen}
        data={BEST_PRICE_MODAL_DATA}
        onClose={onClose}
        requestPriceMatch={action('request-price-match')}
      />
    </div>
  );
}
