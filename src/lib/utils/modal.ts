import ReactModal from 'react-modal';

export function bindAppElement() {
  if (typeof document !== 'undefined') {
    // function to bind modal to app element for react-modal http://reactcommunity.org/react-modal/accessibility/
    // #root handles storybook
    const appElId = document.getElementById('__next') ? '#__next' : '#root';
    ReactModal.setAppElement(appElId);
  }
}
