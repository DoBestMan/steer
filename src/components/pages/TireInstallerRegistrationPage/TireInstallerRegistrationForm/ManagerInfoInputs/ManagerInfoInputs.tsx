import { memo } from 'react';

import Input from '~/components/global/Input/Input';
import Markdown from '~/components/global/Markdown/Markdown';
import Toast from '~/components/global/Toast/Toast';
import { ui } from '~/lib/utils/ui-dictionary';
import { typography } from '~/styles/typography.styles';

import { styles } from '../../TireInstallerRegistrationPage.styles';
import {
  serviceManagerInfoInputs,
  TOAST_MESSAGES,
} from '../TireInstallerRegistrationForm.constants';
import {
  TOAST_MESSAGE_LABELS,
  TYPES_OF_INPUTS,
} from '../TireInstallerRegistrationForm.enums';
import {
  RegistrationFormFields,
  RegistrationFormInputsToValidate,
} from '../TireInstallerRegistrationForm.types';
import { shouldComponentUpdate } from '../TireInstallerRegistrationForm.utils';

export interface ManagerInfoInputsProps {
  formFields: RegistrationFormFields;
  inputsToValidate: RegistrationFormInputsToValidate;
  onChangeHandler: (
    key: keyof RegistrationFormFields,
  ) => (value: string | boolean | null) => void;
  onHandleClearToastMessage: () => void;
  onToastMessageDismiss: () => void;
  onValidateInput: (
    key: keyof RegistrationFormFields,
  ) => (value: string) => void;
  toastMessage: string;
}

function ManagerInfoInputs({
  formFields,
  inputsToValidate,
  onChangeHandler,
  onHandleClearToastMessage,
  onValidateInput,
  onToastMessageDismiss,
  toastMessage,
}: ManagerInfoInputsProps) {
  return (
    <fieldset css={[styles.group, styles.groupBottomBorder]}>
      <h2 css={[typography.secondaryHeadline, styles.spacingBottom20]}>
        {ui('tireInstallerRegistration.form.labels.management')}
      </h2>
      {serviceManagerInfoInputs.map((input) => (
        <div css={styles.spacingBottom20} key={input.label}>
          <Input
            {...input}
            error={inputsToValidate[input.name]}
            label={input.label}
            onChange={onChangeHandler(input.name)}
            value={formFields[input.name]}
            validationFn={onValidateInput(input.name)}
          />
          {!!(
            toastMessage === TOAST_MESSAGE_LABELS.ATTACH_IMAGE_SUCCESS ||
            toastMessage === TOAST_MESSAGE_LABELS.ATTACH_IMAGE_ERROR
          ) && (
            <Toast
              customContainerStyles={styles.attachImageToastMessage}
              isOpen={!!toastMessage}
              onDismiss={onToastMessageDismiss}
              handleClearMessage={onHandleClearToastMessage}
            >
              <Markdown>{`${TOAST_MESSAGES[toastMessage]}`}</Markdown>
            </Toast>
          )}
        </div>
      ))}
    </fieldset>
  );
}

export default memo(
  ManagerInfoInputs,
  shouldComponentUpdate(TYPES_OF_INPUTS.MANAGER),
);
