import { SetStateAction } from 'react';

import Toast, { TOAST_TYPE } from '~/components/global/Toast/Toast';

import { styles } from './Location.styles';

interface Props {
  message: JSX.Element | string;
  onDismiss: () => void;
  setToastMessage: (value: SetStateAction<TOAST_TYPE | string>) => void;
  toastMessage: string;
}

function LocationToast({
  toastMessage,
  message,
  onDismiss,
  setToastMessage,
}: Props) {
  const handleOnDismiss = () => {
    setToastMessage('');

    // Don't close the modal if the request errors out
    if (toastMessage === TOAST_TYPE.ERROR) {
      return;
    }

    onDismiss();
  };

  return (
    <Toast
      customStyles={styles.toast}
      isOpen={!!toastMessage}
      onDismiss={handleOnDismiss}
    >
      {message}
    </Toast>
  );
}

export default LocationToast;
