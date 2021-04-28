import React, { useState } from 'react';

import Button from '~/components/global/Button/Button';
import Loading from '~/components/global/Loading/Loading';
import Markdown from '~/components/global/Markdown/Markdown';
import Toast from '~/components/global/Toast/Toast';
import { apiSendCustomerSupportForm } from '~/lib/api/send-tire-installer-form';
import { THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';
import { typography } from '~/styles/typography.styles';

import { styles } from '../TireInstallerRegistrationPage.styles';
import BusinessInfoInputs from './BusinessInfoInputs/BusinessInfoInputs';
import ContactInfoInputs from './ContactInfoInputs/ContactInfoInputs';
import HoursInfoInputs from './HoursInfoInputs/HoursInfoInputs';
import InstallerAgreementInput from './InstallerAgreementInput/InstallerAgreementInput';
import ServicesOfferedInputs from './ServicesOfferedInputs/ServicesOfferedInputs';
import {
  INPUTS_TO_VALIDATE,
  REGISTRATION_FORM_FIELDS,
  STORE_IMAGE_INPUT_ID,
  TOAST_MESSAGES,
} from './TireInstallerRegistrationForm.constants';
import {
  REGISTRATION_FIELD_NAMES,
  TOAST_MESSAGE_LABELS,
} from './TireInstallerRegistrationForm.enums';
import { useForm } from './TireInstallerRegistrationForm.hooks';
import { convertFormToReqObj } from './TireInstallerRegistrationForm.utils';
import TireServicesOfferedInputs from './TireServicesOfferedInputs/TireServicesOfferedInputs';

function TireInstallerRegistrationForm() {
  const {
    btnSubmitEnabled,
    createChangeHandler,
    formFields,
    handleAttachImage,
    inputsToValidate,
    validateInputHandler,
    resetForm,
  } = useForm(REGISTRATION_FORM_FIELDS, INPUTS_TO_VALIDATE);
  const [filename, setFilename] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const onHandleDismiss = () => {
    setToastMessage('');
  };
  const resetStoreImage = () => {
    const storeImageElm = document.getElementById(
      STORE_IMAGE_INPUT_ID,
    ) as HTMLInputElement;

    if (storeImageElm) {
      storeImageElm.value = '';
    }
  };
  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (window.grecaptcha) {
      window.grecaptcha.ready(function () {
        try {
          window.grecaptcha
            .execute(process.env.RECAPTCHA_SITE_KEY || '', { action: 'submit' })
            .then(async function (token: string) {
              setIsLoading(true);
              const reqObj = convertFormToReqObj(token, { ...formFields });
              const apiResponse = await apiSendCustomerSupportForm(reqObj);
              const respActionType = apiResponse.isSuccess
                ? 'success'
                : 'error';
              const respActions = {
                success: () => {
                  setIsLoading(false);
                  setToastMessage(TOAST_MESSAGE_LABELS.FORM_SUCCESS);
                  setFilename('');
                  resetForm();
                  resetStoreImage();
                },
                error: () => {
                  setIsLoading(false);
                  setToastMessage(TOAST_MESSAGE_LABELS.FORM_ERROR);
                },
              };

              respActions[respActionType]();
            });
        } catch (error) {
          setToastMessage(TOAST_MESSAGE_LABELS.FORM_ERROR);
        }
      });
    } else {
      setToastMessage(TOAST_MESSAGE_LABELS.FORM_ERROR);
    }
  };

  const onHandleAttachImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const LIMIT_FILE_SIZE = 5000;
      const file = event?.target?.files[0];
      const fileName = file?.name ? file.name : '';

      setFilename(fileName);

      if (file?.size / 1024 < LIMIT_FILE_SIZE) {
        const reader = new FileReader();

        reader.readAsText(file);

        reader.onerror = function () {
          setToastMessage(TOAST_MESSAGE_LABELS.ATTACH_IMAGE_ERROR);
        };

        reader.onloadend = function () {
          handleAttachImage(
            REGISTRATION_FIELD_NAMES.STORE_IMAGE,
            reader.result as string,
          );
          setToastMessage(TOAST_MESSAGE_LABELS.ATTACH_IMAGE_SUCCESS);
        };
      }
    } else {
      setToastMessage(TOAST_MESSAGE_LABELS.ATTACH_IMAGE_ERROR);
    }
  };

  return (
    <>
      <h2
        css={[
          typography.primaryHeadline,
          styles.spacingTop60,
          styles.spacingBottom40,
        ]}
      >
        Apply today and become our trusted partner!
      </h2>
      <form css={styles.relative} onSubmit={handleSubmit}>
        <BusinessInfoInputs
          onChangeHandler={createChangeHandler}
          formFields={formFields}
        />
        <HoursInfoInputs
          onChangeHandler={createChangeHandler}
          formFields={formFields}
        />
        <ContactInfoInputs
          filename={filename}
          formFields={formFields}
          inputsToValidate={inputsToValidate}
          onChangeHandler={createChangeHandler}
          onValidateInput={validateInputHandler}
          onHandleClearToastMessage={onHandleDismiss}
          onHandleImageInput={onHandleAttachImage}
          onToastMessageDismiss={onHandleDismiss}
          toastMessage={toastMessage}
        />
        <ServicesOfferedInputs
          onChangeHandler={createChangeHandler}
          formFields={formFields}
        />
        <TireServicesOfferedInputs
          onChangeHandler={createChangeHandler}
          formFields={formFields}
        />
        <fieldset
          css={[styles.group, styles.paddingTop60, styles.spacingBottom60]}
        >
          <InstallerAgreementInput
            onChangeHandler={createChangeHandler}
            formFields={formFields}
          />
          <Button
            isDisabled={isLoading || btnSubmitEnabled}
            css={styles.btnSubmit}
            type="submit"
          >
            {isLoading ? (
              <Loading theme={THEME.DARK} />
            ) : (
              ui('tireInstallerRegistration.form.submitButton.label')
            )}
          </Button>
        </fieldset>
        {toastMessage && (
          <Toast
            customContainerStyles={styles.toastMessage}
            isOpen={!!toastMessage}
            onDismiss={onHandleDismiss}
            handleClearMessage={onHandleDismiss}
          >
            <Markdown>{`${TOAST_MESSAGES[toastMessage]}`}</Markdown>
          </Toast>
        )}
      </form>
    </>
  );
}

export default TireInstallerRegistrationForm;
