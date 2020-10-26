import { ChangeEvent, memo } from 'react';

import buttonStyles, { toggle } from '~/components/global/Button/Button.styles';
import Input from '~/components/global/Input/Input';
import Markdown from '~/components/global/Markdown/Markdown';
import Toast from '~/components/global/Toast/Toast';
import { THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';
import { typography } from '~/styles/typography.styles';

import { styles } from '../../TireInstallerRegistrationPage.styles';
import {
  contactInfoInputs,
  STORE_IMAGE_INPUT_ID,
  TOAST_MESSAGES,
} from '../TireInstallerRegistrationForm.constants';
import {
  REGISTRATION_FIELD_NAMES,
  TOAST_MESSAGE_LABELS,
  TYPES_OF_INPUTS,
} from '../TireInstallerRegistrationForm.enums';
import {
  RegistrationFormFields,
  RegistrationFormInputsToValidate,
} from '../TireInstallerRegistrationForm.types';
import { shouldComponentUpdate } from '../TireInstallerRegistrationForm.utils';

export interface ContactInfoInputsProps {
  filename: string;
  formFields: RegistrationFormFields;
  inputsToValidate: RegistrationFormInputsToValidate;
  onChangeHandler: (
    key: keyof RegistrationFormFields,
  ) => (value: string | boolean | null) => void;
  onHandleClearToastMessage: () => void;
  onHandleImageInput: (event: ChangeEvent<HTMLInputElement>) => void;
  onToastMessageDismiss: () => void;
  onValidateInput: (
    key: keyof RegistrationFormFields,
  ) => (value: string) => void;
  toastMessage: string;
}

function ContactInfoInputs({
  filename,
  formFields,
  inputsToValidate,
  onChangeHandler,
  onHandleClearToastMessage,
  onValidateInput,
  onHandleImageInput,
  onToastMessageDismiss,
  toastMessage,
}: ContactInfoInputsProps) {
  return (
    <fieldset css={[styles.group, styles.groupBottomBorder]}>
      <h2 css={[typography.secondaryHeadline, styles.spacingBottom20]}>
        Contact information
      </h2>
      {contactInfoInputs.map((input) => (
        <div css={styles.spacingBottom20} key={input.label}>
          <Input
            {...input}
            error={inputsToValidate[input.name]}
            label={input.label}
            onChange={onChangeHandler(input.name)}
            value={formFields[input.name]}
            validationFn={onValidateInput(input.name)}
          />
        </div>
      ))}
      <div css={styles.relative}>
        <label
          htmlFor={STORE_IMAGE_INPUT_ID}
          css={[
            styles.attachImageStyles,
            buttonStyles.root,
            toggle.inactive[THEME.LIGHT],
          ]}
        >
          <span>
            {filename
              ? filename
              : ui('tireInstallerRegistration.copy.attachedImageInput.label')}
          </span>
        </label>
        <input
          css={styles.attachImageInput}
          id={STORE_IMAGE_INPUT_ID}
          type="file"
          accept=".jpg, .jpeg, .png, .bmp"
          name={REGISTRATION_FIELD_NAMES.STORE_IMAGE}
          onChange={onHandleImageInput}
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
    </fieldset>
  );
}

export default memo(
  ContactInfoInputs,
  shouldComponentUpdate(TYPES_OF_INPUTS.CONTACT),
);
