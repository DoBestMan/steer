import isStrictEqual from 'fast-deep-equal';

import { email, phone } from '~/lib/utils/regex';

import {
  REGISTRATION_FIELD_NAMES,
  TYPES_OF_INPUTS,
} from './TireInstallerRegistrationForm.enums';
import {
  FormInputsForReactMemoFunc,
  RegistrationFormFields,
  RegistrationFormRequestObj,
  ShouldComponentUpdateProps,
} from './TireInstallerRegistrationForm.types';

function removeCommaFromString(str: string) {
  return str.substring(0, str.length - 1);
}

export function validateInputFields(fields: RegistrationFormFields) {
  const requiredFields = [
    REGISTRATION_FIELD_NAMES.COMPANY,
    REGISTRATION_FIELD_NAMES.ADDRESS_LINE_ONE,
    REGISTRATION_FIELD_NAMES.CITY,
    REGISTRATION_FIELD_NAMES.STATE,
    REGISTRATION_FIELD_NAMES.ZIP_CODE,
    REGISTRATION_FIELD_NAMES.FIRST_NAME,
    REGISTRATION_FIELD_NAMES.LAST_NAME,
    REGISTRATION_FIELD_NAMES.PHONE_PRIMARY,
    REGISTRATION_FIELD_NAMES.AUTO_SERVICES,
    REGISTRATION_FIELD_NAMES.TIRE_SERVICES,
    REGISTRATION_FIELD_NAMES.INSTALLATION_AGREEMENT,
  ];
  let isValidCount = 0;

  requiredFields.forEach((fieldName) => {
    if (fields[fieldName]) {
      isValidCount += 1;
    }
  });

  return !(isValidCount === requiredFields.length);
}

export function validateInput(value: string, inputType: string) {
  const inputMap: Record<string, boolean> = {
    phone: phone.test(value),
    email: email.test(value),
  };

  return inputMap[inputType];
}

export function convertFormToReqObj(
  token: string,
  {
    addressLine1,
    addressLine2,
    autoServices,
    cellPhone,
    city,
    company,
    emailPrimary,
    emailService,
    firstName,
    installationAgreement,
    lastName,
    phonePrimary,
    phoneService,
    state,
    storeImage,
    tireServices,
    website,
    zipCode,
    ...fields
  }: RegistrationFormFields,
): RegistrationFormRequestObj {
  const hours = {
    friday: {
      closed: fields.fridayClosed,
      open: fields.fridayOpen,
    },
    monday: {
      closed: fields.mondayClosed,
      open: fields.mondayOpen,
    },
    saturday: {
      closed: fields.saturdayClosed,
      open: fields.saturdayOpen,
    },
    sunday: {
      closed: fields.sundayClosed,
      open: fields.sundayOpen,
    },
    thursday: {
      closed: fields.thursdayClosed,
      open: fields.thursdayOpen,
    },
    tuesday: {
      closed: fields.tuesdayClosed,
      open: fields.tuesdayOpen,
    },
    wednesday: {
      closed: fields.wednesdayClosed,
      open: fields.wednesdayOpen,
    },
  };
  const servicesOffered = removeCommaFromString(autoServices).split(',');
  const typesOfTiresServices = removeCommaFromString(tireServices).split(',');

  return {
    businessInfo: {
      addressLine1,
      addressLine2,
      city,
      company,
      hours,
      servicesOffered,
      state,
      typesOfTiresServices,
      website,
      zipCode,
    },
    contactInfo: {
      cellPhone,
      emailPrimary,
      emailService,
      firstName,
      lastName,
      phonePrimary,
      phoneService,
      storeImage,
    },
    installationAgreement,
    token,
  };
}

export const shouldComponentUpdate = (
  typeOfInputs: string,
  isCheckBoxInputs?: boolean,
) => (
  prevProps: ShouldComponentUpdateProps,
  nextProps: ShouldComponentUpdateProps,
) => {
  const formFieldsPrev = prevProps.formFields;
  const formFieldsNext = nextProps.formFields;
  const prevToastMessage = prevProps.toastMessage ? prevProps.toastMessage : '';
  const nextToastMessage = nextProps.toastMessage ? nextProps.toastMessage : '';
  const prevBusinessInputs = {
    [REGISTRATION_FIELD_NAMES.COMPANY]:
      formFieldsPrev[REGISTRATION_FIELD_NAMES.COMPANY],
    [REGISTRATION_FIELD_NAMES.ADDRESS_LINE_ONE]:
      formFieldsPrev[REGISTRATION_FIELD_NAMES.ADDRESS_LINE_ONE],
    [REGISTRATION_FIELD_NAMES.ADDRESS_LINE_TWO]:
      formFieldsPrev[REGISTRATION_FIELD_NAMES.ADDRESS_LINE_TWO],
    [REGISTRATION_FIELD_NAMES.CITY]:
      formFieldsPrev[REGISTRATION_FIELD_NAMES.CITY],
    [REGISTRATION_FIELD_NAMES.STATE]:
      formFieldsPrev[REGISTRATION_FIELD_NAMES.STATE],
    [REGISTRATION_FIELD_NAMES.ZIP_CODE]:
      formFieldsPrev[REGISTRATION_FIELD_NAMES.ZIP_CODE],
    [REGISTRATION_FIELD_NAMES.WEBSITE]:
      formFieldsPrev[REGISTRATION_FIELD_NAMES.WEBSITE],
  };
  const nextBusinessInputs = {
    [REGISTRATION_FIELD_NAMES.COMPANY]:
      formFieldsNext[REGISTRATION_FIELD_NAMES.COMPANY],
    [REGISTRATION_FIELD_NAMES.ADDRESS_LINE_ONE]:
      formFieldsNext[REGISTRATION_FIELD_NAMES.ADDRESS_LINE_ONE],
    [REGISTRATION_FIELD_NAMES.ADDRESS_LINE_TWO]:
      formFieldsNext[REGISTRATION_FIELD_NAMES.ADDRESS_LINE_TWO],
    [REGISTRATION_FIELD_NAMES.CITY]:
      formFieldsNext[REGISTRATION_FIELD_NAMES.CITY],
    [REGISTRATION_FIELD_NAMES.STATE]:
      formFieldsNext[REGISTRATION_FIELD_NAMES.STATE],
    [REGISTRATION_FIELD_NAMES.ZIP_CODE]:
      formFieldsNext[REGISTRATION_FIELD_NAMES.ZIP_CODE],
    [REGISTRATION_FIELD_NAMES.WEBSITE]:
      formFieldsNext[REGISTRATION_FIELD_NAMES.WEBSITE],
  };
  const prevContactInputs = {
    [REGISTRATION_FIELD_NAMES.FIRST_NAME]:
      formFieldsPrev[REGISTRATION_FIELD_NAMES.FIRST_NAME],
    [REGISTRATION_FIELD_NAMES.LAST_NAME]:
      formFieldsPrev[REGISTRATION_FIELD_NAMES.LAST_NAME],
    [REGISTRATION_FIELD_NAMES.EMAIL_PRIMARY]:
      formFieldsPrev[REGISTRATION_FIELD_NAMES.EMAIL_PRIMARY],
    [REGISTRATION_FIELD_NAMES.EMAIL_SERVICE_DESK]:
      formFieldsPrev[REGISTRATION_FIELD_NAMES.EMAIL_SERVICE_DESK],
    [REGISTRATION_FIELD_NAMES.PHONE_PRIMARY]:
      formFieldsPrev[REGISTRATION_FIELD_NAMES.PHONE_PRIMARY],
    [REGISTRATION_FIELD_NAMES.PHONE_SERVICE_DESK]:
      formFieldsPrev[REGISTRATION_FIELD_NAMES.PHONE_SERVICE_DESK],
    [REGISTRATION_FIELD_NAMES.CELL_PHONE]:
      formFieldsPrev[REGISTRATION_FIELD_NAMES.CELL_PHONE],
    [REGISTRATION_FIELD_NAMES.STORE_IMAGE]:
      formFieldsPrev[REGISTRATION_FIELD_NAMES.STORE_IMAGE],
    toastMessage: prevToastMessage,
  };
  const nextContactInputs = {
    [REGISTRATION_FIELD_NAMES.FIRST_NAME]:
      formFieldsNext[REGISTRATION_FIELD_NAMES.FIRST_NAME],
    [REGISTRATION_FIELD_NAMES.LAST_NAME]:
      formFieldsNext[REGISTRATION_FIELD_NAMES.LAST_NAME],
    [REGISTRATION_FIELD_NAMES.EMAIL_PRIMARY]:
      formFieldsNext[REGISTRATION_FIELD_NAMES.EMAIL_PRIMARY],
    [REGISTRATION_FIELD_NAMES.EMAIL_SERVICE_DESK]:
      formFieldsNext[REGISTRATION_FIELD_NAMES.EMAIL_SERVICE_DESK],
    [REGISTRATION_FIELD_NAMES.PHONE_PRIMARY]:
      formFieldsNext[REGISTRATION_FIELD_NAMES.PHONE_PRIMARY],
    [REGISTRATION_FIELD_NAMES.PHONE_SERVICE_DESK]:
      formFieldsNext[REGISTRATION_FIELD_NAMES.PHONE_SERVICE_DESK],
    [REGISTRATION_FIELD_NAMES.CELL_PHONE]:
      formFieldsNext[REGISTRATION_FIELD_NAMES.CELL_PHONE],
    [REGISTRATION_FIELD_NAMES.STORE_IMAGE]:
      formFieldsNext[REGISTRATION_FIELD_NAMES.STORE_IMAGE],
    toastMessage: nextToastMessage,
  };
  const prevHoursInputs = {
    [REGISTRATION_FIELD_NAMES.SUNDAY_OPEN]:
      formFieldsPrev[REGISTRATION_FIELD_NAMES.SUNDAY_OPEN],
    [REGISTRATION_FIELD_NAMES.SUNDAY_CLOSED]:
      formFieldsPrev[REGISTRATION_FIELD_NAMES.SUNDAY_CLOSED],
    [REGISTRATION_FIELD_NAMES.MONDAY_OPEN]:
      formFieldsPrev[REGISTRATION_FIELD_NAMES.MONDAY_OPEN],
    [REGISTRATION_FIELD_NAMES.MONDAY_CLOSED]:
      formFieldsPrev[REGISTRATION_FIELD_NAMES.MONDAY_CLOSED],
    [REGISTRATION_FIELD_NAMES.TUESDAY_OPEN]:
      formFieldsPrev[REGISTRATION_FIELD_NAMES.TUESDAY_OPEN],
    [REGISTRATION_FIELD_NAMES.TUESDAY_CLOSED]:
      formFieldsPrev[REGISTRATION_FIELD_NAMES.TUESDAY_CLOSED],
    [REGISTRATION_FIELD_NAMES.WEDNESDAY_OPEN]:
      formFieldsPrev[REGISTRATION_FIELD_NAMES.WEDNESDAY_OPEN],
    [REGISTRATION_FIELD_NAMES.WEDNESDAY_CLOSED]:
      formFieldsPrev[REGISTRATION_FIELD_NAMES.WEDNESDAY_CLOSED],
    [REGISTRATION_FIELD_NAMES.THURSDAY_OPEN]:
      formFieldsPrev[REGISTRATION_FIELD_NAMES.THURSDAY_OPEN],
    [REGISTRATION_FIELD_NAMES.THURSDAY_CLOSED]:
      formFieldsPrev[REGISTRATION_FIELD_NAMES.THURSDAY_CLOSED],
    [REGISTRATION_FIELD_NAMES.FRIDAY_OPEN]:
      formFieldsPrev[REGISTRATION_FIELD_NAMES.FRIDAY_OPEN],
    [REGISTRATION_FIELD_NAMES.FRIDAY_CLOSED]:
      formFieldsPrev[REGISTRATION_FIELD_NAMES.FRIDAY_CLOSED],
    [REGISTRATION_FIELD_NAMES.SATURDAY_OPEN]:
      formFieldsPrev[REGISTRATION_FIELD_NAMES.SATURDAY_OPEN],
    [REGISTRATION_FIELD_NAMES.SATURDAY_CLOSED]:
      formFieldsPrev[REGISTRATION_FIELD_NAMES.SATURDAY_CLOSED],
  };
  const nextHoursInputs = {
    [REGISTRATION_FIELD_NAMES.SUNDAY_OPEN]:
      formFieldsNext[REGISTRATION_FIELD_NAMES.SUNDAY_OPEN],
    [REGISTRATION_FIELD_NAMES.SUNDAY_CLOSED]:
      formFieldsNext[REGISTRATION_FIELD_NAMES.SUNDAY_CLOSED],
    [REGISTRATION_FIELD_NAMES.MONDAY_OPEN]:
      formFieldsNext[REGISTRATION_FIELD_NAMES.MONDAY_OPEN],
    [REGISTRATION_FIELD_NAMES.MONDAY_CLOSED]:
      formFieldsNext[REGISTRATION_FIELD_NAMES.MONDAY_CLOSED],
    [REGISTRATION_FIELD_NAMES.TUESDAY_OPEN]:
      formFieldsNext[REGISTRATION_FIELD_NAMES.TUESDAY_OPEN],
    [REGISTRATION_FIELD_NAMES.TUESDAY_CLOSED]:
      formFieldsNext[REGISTRATION_FIELD_NAMES.TUESDAY_CLOSED],
    [REGISTRATION_FIELD_NAMES.WEDNESDAY_OPEN]:
      formFieldsNext[REGISTRATION_FIELD_NAMES.WEDNESDAY_OPEN],
    [REGISTRATION_FIELD_NAMES.WEDNESDAY_CLOSED]:
      formFieldsNext[REGISTRATION_FIELD_NAMES.WEDNESDAY_CLOSED],
    [REGISTRATION_FIELD_NAMES.THURSDAY_OPEN]:
      formFieldsNext[REGISTRATION_FIELD_NAMES.THURSDAY_OPEN],
    [REGISTRATION_FIELD_NAMES.THURSDAY_CLOSED]:
      formFieldsNext[REGISTRATION_FIELD_NAMES.THURSDAY_CLOSED],
    [REGISTRATION_FIELD_NAMES.FRIDAY_OPEN]:
      formFieldsNext[REGISTRATION_FIELD_NAMES.FRIDAY_OPEN],
    [REGISTRATION_FIELD_NAMES.FRIDAY_CLOSED]:
      formFieldsNext[REGISTRATION_FIELD_NAMES.FRIDAY_CLOSED],
    [REGISTRATION_FIELD_NAMES.SATURDAY_OPEN]:
      formFieldsNext[REGISTRATION_FIELD_NAMES.SATURDAY_OPEN],
    [REGISTRATION_FIELD_NAMES.SATURDAY_CLOSED]:
      formFieldsNext[REGISTRATION_FIELD_NAMES.SATURDAY_CLOSED],
  };
  const prevInstallerInput =
    formFieldsPrev[REGISTRATION_FIELD_NAMES.INSTALLATION_AGREEMENT];
  const nextInstallerInput =
    formFieldsNext[REGISTRATION_FIELD_NAMES.INSTALLATION_AGREEMENT];
  const prevServicesInput =
    formFieldsPrev[REGISTRATION_FIELD_NAMES.AUTO_SERVICES];
  const nextServicesInput =
    formFieldsNext[REGISTRATION_FIELD_NAMES.AUTO_SERVICES];
  const prevTireServicesInput =
    formFieldsPrev[REGISTRATION_FIELD_NAMES.TIRE_SERVICES];
  const nextTireServicesInput =
    formFieldsNext[REGISTRATION_FIELD_NAMES.TIRE_SERVICES];
  const formInputs: FormInputsForReactMemoFunc = {
    [TYPES_OF_INPUTS.BUSINESS]: {
      next: nextBusinessInputs,
      prev: prevBusinessInputs,
    },
    [TYPES_OF_INPUTS.CONTACT]: {
      next: nextContactInputs,
      prev: prevContactInputs,
    },
    [TYPES_OF_INPUTS.HOURS]: {
      next: nextHoursInputs,
      prev: prevHoursInputs,
    },
    [TYPES_OF_INPUTS.INSTALLER]: {
      next: nextInstallerInput,
      prev: prevInstallerInput,
    },
    [TYPES_OF_INPUTS.SERVICES]: {
      next: nextServicesInput,
      prev: prevServicesInput,
    },
    [TYPES_OF_INPUTS.TIRE_SERVICES]: {
      next: nextTireServicesInput,
      prev: prevTireServicesInput,
    },
  };

  if (isCheckBoxInputs) {
    return formInputs[typeOfInputs].prev === formInputs[typeOfInputs].next;
  }

  return isStrictEqual(
    formInputs[typeOfInputs].prev,
    formInputs[typeOfInputs].next,
  );
};
