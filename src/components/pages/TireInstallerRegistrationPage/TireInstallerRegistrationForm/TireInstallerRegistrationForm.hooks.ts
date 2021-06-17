import { useEffect, useState } from 'react';

import {
  inputErrorEmail,
  inputErrorPhone,
} from './TireInstallerRegistrationForm.constants';
import { REGISTRATION_FIELD_NAMES } from './TireInstallerRegistrationForm.enums';
import {
  RegistrationFormFields,
  RegistrationFormInputsError,
  RegistrationFormInputsToValidate,
} from './TireInstallerRegistrationForm.types';
import {
  validateInput,
  validateInputFields,
} from './TireInstallerRegistrationForm.utils';

export function useForm(
  initialValues: RegistrationFormFields,
  initialInputsToValidate: RegistrationFormInputsToValidate,
) {
  const [formFields, setFormFields] = useState(initialValues);
  const [btnSubmitEnabled, setBtnSubmitEnabled] = useState(true);
  const [inputsToValidate, setInputsToValidate] = useState(
    initialInputsToValidate,
  );
  const resetForm = () => {
    setFormFields(initialValues);
  };
  const createChangeHandler = (
    key: keyof RegistrationFormFields,
    serviceType?: string,
  ) => (value: boolean | string | null) => {
    if (
      (key === REGISTRATION_FIELD_NAMES.AUTO_SERVICES && serviceType) ||
      (key === REGISTRATION_FIELD_NAMES.TIRE_SERVICES && serviceType) ||
      (key === REGISTRATION_FIELD_NAMES.INSTALLER_INFO && serviceType)
    ) {
      setFormFields((prev: RegistrationFormFields) => {
        const currentFields = JSON.parse(JSON.stringify(prev));
        const service = `${serviceType},`;
        const serviceValue =
          value && !currentFields[key].includes(service)
            ? (currentFields[key] += service)
            : currentFields[key].replace(service, '');

        return {
          ...prev,
          [key]: serviceValue,
        };
      });
    } else {
      setFormFields((prev: RegistrationFormFields) => ({
        ...prev,
        [key]: value,
      }));
    }
  };
  const validateInputHandler = (
    key: keyof RegistrationFormInputsToValidate,
  ) => (value: string) => {
    const inputTypeMap: Record<string, string> = {
      [REGISTRATION_FIELD_NAMES.CELL_PHONE]: 'phone',
      [REGISTRATION_FIELD_NAMES.PHONE_PRIMARY]: 'phone',
      [REGISTRATION_FIELD_NAMES.PHONE_SERVICE_DESK]: 'phone',
      [REGISTRATION_FIELD_NAMES.EMAIL_PRIMARY]: 'email',
      [REGISTRATION_FIELD_NAMES.EMAIL_SERVICE_DESK]: 'email',
    };
    const errorMessages: Record<string, RegistrationFormInputsError> = {
      [REGISTRATION_FIELD_NAMES.CELL_PHONE]: inputErrorPhone,
      [REGISTRATION_FIELD_NAMES.PHONE_PRIMARY]: inputErrorPhone,
      [REGISTRATION_FIELD_NAMES.PHONE_SERVICE_DESK]: inputErrorPhone,
      [REGISTRATION_FIELD_NAMES.EMAIL_PRIMARY]: inputErrorEmail,
      [REGISTRATION_FIELD_NAMES.EMAIL_SERVICE_DESK]: inputErrorEmail,
    };

    if (validateInput(value, inputTypeMap[key])) {
      setInputsToValidate((prev: RegistrationFormInputsToValidate) => ({
        ...prev,
        [key]: initialInputsToValidate[key],
      }));
    } else {
      setInputsToValidate((prev: RegistrationFormInputsToValidate) => ({
        ...prev,
        [key]: { ...errorMessages[key] },
      }));
    }
  };
  const handleAttachImage = (
    key: keyof RegistrationFormFields,
    value: string,
  ) => {
    setFormFields((prev: RegistrationFormFields) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    setBtnSubmitEnabled(validateInputFields(formFields));
  }, [formFields]);

  return {
    btnSubmitEnabled,
    createChangeHandler,
    formFields,
    handleAttachImage,
    inputsToValidate,
    resetForm,
    validateInputHandler,
  };
}
