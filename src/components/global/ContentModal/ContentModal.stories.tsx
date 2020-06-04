import { boolean } from '@storybook/addon-knobs';
import { useState } from 'react';

import Button from '../Button/Button';
import ContentModal from './ContentModal';

export default {
  component: ContentModal,
  title: 'Modal/Content Modal',
};

const modalData = {
  content:
    '* Estimated delivery in 2-4 business days\n* Tires delivered by Fedex, UPS & Local Drivers\n\nAt SimpleTire, keeping our customers and employees safe is a top priority. As an e-commerce company we’ve taken measures to protect against the spread of COVID-19 (Coronavirus) and ensure that we’re 100% operational and so are our suppliers and distributors.\n\nThere has been no impact to our supply and we’re also delivering almost 100% of our orders in 2-4 days to our customers.',
  image: {
    src: 'https://dummyimage.com/1600x900/000/f00.jpg',
    altText: 'Free shipping',
  },
  title: 'Free shipping',
};

const modalLink = {
  label: 'Link example',
  link: {
    href: '/404',
    isExternal: false,
  },
};

export function ConentModalWithProps() {
  const [isOpen, setIsOpen] = useState(true);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  const hasLink = boolean('Has Link', false);
  const hasSubtitle = boolean('Has Subtitle', false);

  return (
    <>
      <Button onClick={toggleModal}>Open Modal</Button>
      <ContentModal
        {...modalData}
        {...(hasLink && { link: modalLink })}
        {...(hasSubtitle && {
          subtitle: 'Tires shipped for free to anywhere in the U.S.',
        })}
        isOpen={isOpen}
        isCustomerServiceEnabled
        showSupportSection={boolean('Show Support Section', true)}
        onClose={toggleModal}
      />
    </>
  );
}
