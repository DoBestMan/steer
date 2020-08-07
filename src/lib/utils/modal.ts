import ReactModal from 'react-modal';

import STATIC_MODALS from '../constants/staticModals';

export function bindAppElement() {
  if (typeof document !== 'undefined' && process.env.NODE_ENV !== 'test') {
    // function to bind modal to app element for react-modal http://reactcommunity.org/react-modal/accessibility/
    // #root handles storybook
    const appElId = document.getElementById('__next') ? '#__next' : '#root';
    ReactModal.setAppElement(appElId);
  }
}

export function isValidStaticModal(modalId: string) {
  const isValid = !!STATIC_MODALS[modalId];
  if (!isValid) {
    console.info(`No static modal found for id: ${modalId}`);
  }
  return isValid;
}
