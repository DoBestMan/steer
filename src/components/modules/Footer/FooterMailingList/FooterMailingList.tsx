import { useState } from 'react';

import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Input from '~/components/global/Input/Input';
import { INPUT_TYPE, KEYCODES } from '~/lib/constants';
import { email } from '~/lib/utils/regex';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './FooterMailingList.styles';

function FooterMailingList() {
  const [isInputValid, setIsInputValid] = useState(false);
  const [emailVal, setEmailVal] = useState('');

  const handleInputChange = (value: string) => {
    setEmailVal(value);

    validateEmail(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.keyCode === KEYCODES.ENTER && isInputValid) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    // TODO integrate with mailing list endpoint (WCS-139)
  };

  const validateEmail = (value: string) => {
    const isValidEmail = email.test(value);
    setIsInputValid(isValidEmail);
  };

  return (
    <div css={styles.container}>
      <p css={styles.heading}>{ui('footer.mailingList.heading')}</p>
      <p css={styles.text}>{ui('footer.mailingList.description')}</p>
      <div css={styles.inputContainer}>
        <Input
          contextualLabel={ui('common.form.yourEmail')}
          css={styles.emailInput}
          error={{
            hasError: !isInputValid,
            errorMessage: ui('common.form.emailError'),
          }}
          label={ui('common.form.email')}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          type={INPUT_TYPE.EMAIL}
          validationFn={validateEmail}
          value={emailVal}
        />
        {isInputValid && (
          <button css={styles.submitButton} onClick={handleSubmit}>
            <Icon name={ICONS.ARROW_RIGHT} />
          </button>
        )}
      </div>
    </div>
  );
}

export default FooterMailingList;
