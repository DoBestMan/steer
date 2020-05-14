import { SetStateAction } from 'react';

import Toast from '~/components/global/Toast/Toast';

import { styles } from './Location.styles';

export enum TOAST_TYPE {
  ERROR = 'error',
  SUCCESS = 'success',
}

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
  if (!toastMessage) {
    return null;
  }

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
