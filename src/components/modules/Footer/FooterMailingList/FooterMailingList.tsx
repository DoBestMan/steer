import { useRef, useState } from 'react';

import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Input from '~/components/global/Input/Input';
import Markdown from '~/components/global/Markdown/Markdown';
import Toast, { TOAST_TYPE } from '~/components/global/Toast/Toast';
import { useToastManager } from '~/components/global/Toast/Toast.hooks';
import { apiSubscribeToNewsletter } from '~/lib/api/subscribe-newsletter';
import { INPUT_TYPE, KEYCODES } from '~/lib/constants';
import { email } from '~/lib/utils/regex';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './FooterMailingList.styles';

const toastMessages: {
  [key in TOAST_TYPE | string]: JSX.Element | string;
} = {
  [TOAST_TYPE.SUCCESS]: <Markdown>{ui('footer.mailingList.success')}</Markdown>,
  [TOAST_TYPE.ERROR]: <Markdown>{ui('footer.mailingList.error')}</Markdown>,
};

function FooterMailingList() {
  const [isInputValid, setIsInputValid] = useState(false);
  const [emailVal, setEmailVal] = useState('');
  const {
    toastMessage,
    setToastMessage,
    handleClearMessage,
    isOpen,
    handleDismiss,
  } = useToastManager();
  const inputEl = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (value: string) => {
    setEmailVal(value);
    validateEmail(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.keyCode === KEYCODES.ENTER) {
      inputEl.current?.blur();
      inputEl.current?.focus();

      if (isInputValid) {
        handleSubmit();
      }
    }
  };

  const handleSubmit = async () => {
    try {
      await apiSubscribeToNewsletter({
        email: emailVal,
        source: 'footer',
        sourceURL: window.location.href,
      });

      setToastMessage(TOAST_TYPE.SUCCESS);
      setEmailVal('');
      setIsInputValid(false);
      inputEl.current?.blur();
    } catch (error) {
      setToastMessage(TOAST_TYPE.ERROR);
    }
  };

  const validateEmail = (value: string) => {
    const isValidEmail = email.test(value);
    setIsInputValid(isValidEmail);
  };

  return (
    <>
      <p css={styles.heading}>{ui('footer.mailingList.heading')}</p>
      <p css={styles.text}>{ui('footer.mailingList.description')}</p>
      <div css={styles.inputContainer}>
        <Input
          containerStyles={styles.inputHeight}
          contextualLabel={ui('common.form.yourEmail')}
          css={styles.emailInput}
          error={{
            hasError: !isInputValid,
            errorMessage: ui('common.form.emailError'),
          }}
          label={ui('common.form.email')}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          ref={inputEl}
          type={INPUT_TYPE.EMAIL}
          validationFn={validateEmail}
          value={emailVal}
        />
        {isInputValid && (
          <button
            aria-label={ui('common.form.submit')}
            css={styles.submitButton}
            onClick={handleSubmit}
          >
            <Icon name={ICONS.ARROW_RIGHT} />
          </button>
        )}
      </div>
      <Toast
        customStyles={styles.toast}
        isOpen={isOpen}
        onDismiss={handleDismiss}
        handleClearMessage={handleClearMessage}
      >
        {toastMessages[toastMessage]}
      </Toast>
    </>
  );
}

export default FooterMailingList;
