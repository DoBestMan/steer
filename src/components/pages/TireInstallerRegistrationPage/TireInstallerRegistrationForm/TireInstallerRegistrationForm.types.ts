import { BusinessInfoInputsProps } from './BusinessInfoInputs/BusinessInfoInputs';
import { ContactInfoInputsProps } from './ContactInfoInputs/ContactInfoInputs';
import { InstallerInfoInputsProps } from './InstallerInfoInputs/InstallerInfoInputs';
import { ManagerInfoInputsProps } from './ManagerInfoInputs/ManagerInfoInputs';
import { ServicesOfferedInputsProps } from './ServicesOfferedInputs/ServicesOfferedInputs';
import { REGISTRATION_FIELD_NAMES } from './TireInstallerRegistrationForm.enums';

export interface RegistrationFormFields {
  [REGISTRATION_FIELD_NAMES.ADDRESS_LINE_ONE]: string;
  [REGISTRATION_FIELD_NAMES.ADDRESS_LINE_TWO]?: string;
  [REGISTRATION_FIELD_NAMES.AUTO_SERVICES]: string;
  [REGISTRATION_FIELD_NAMES.INSTALLER_INFO]: string;
  [REGISTRATION_FIELD_NAMES.CELL_PHONE]?: string;
  [REGISTRATION_FIELD_NAMES.CITY]: string;
  [REGISTRATION_FIELD_NAMES.COMPANY]: string;
  [REGISTRATION_FIELD_NAMES.EMAIL_PRIMARY]: string;
  [REGISTRATION_FIELD_NAMES.EMAIL_SERVICE_DESK]?: string;
  [REGISTRATION_FIELD_NAMES.FIRST_NAME]: string;
  [REGISTRATION_FIELD_NAMES.FRIDAY_CLOSED]: string;
  [REGISTRATION_FIELD_NAMES.FRIDAY_OPEN]: string;
  [REGISTRATION_FIELD_NAMES.INSTALLATION_AGREEMENT]: string;
  [REGISTRATION_FIELD_NAMES.LAST_NAME]: string;
  [REGISTRATION_FIELD_NAMES.MONDAY_CLOSED]: string;
  [REGISTRATION_FIELD_NAMES.MONDAY_OPEN]: string;
  [REGISTRATION_FIELD_NAMES.PHONE_PRIMARY]: string;
  [REGISTRATION_FIELD_NAMES.PHONE_SERVICE_DESK]?: string;
  [REGISTRATION_FIELD_NAMES.SATURDAY_CLOSED]: string;
  [REGISTRATION_FIELD_NAMES.SATURDAY_OPEN]: string;
  [REGISTRATION_FIELD_NAMES.STATE]: string;
  [REGISTRATION_FIELD_NAMES.STORE_IMAGE]?: string;
  [REGISTRATION_FIELD_NAMES.SUNDAY_CLOSED]: string;
  [REGISTRATION_FIELD_NAMES.SUNDAY_OPEN]: string;
  [REGISTRATION_FIELD_NAMES.THURSDAY_CLOSED]: string;
  [REGISTRATION_FIELD_NAMES.THURSDAY_OPEN]: string;
  [REGISTRATION_FIELD_NAMES.TIRE_SERVICES]: string;
  [REGISTRATION_FIELD_NAMES.TUESDAY_OPEN]: string;
  [REGISTRATION_FIELD_NAMES.TUESDAY_CLOSED]: string;
  [REGISTRATION_FIELD_NAMES.WEBSITE]?: string;
  [REGISTRATION_FIELD_NAMES.WEDNESDAY_CLOSED]: string;
  [REGISTRATION_FIELD_NAMES.WEDNESDAY_OPEN]: string;
  [REGISTRATION_FIELD_NAMES.ZIP_CODE]: string;
}

export interface RegistrationFormInputsError {
  errorMessage: string;
  hasError: boolean;
}

export interface RegistrationFormInputsToValidate {
  [index: string]: RegistrationFormInputsError;
}

export interface RegistrationFormRequestObj {
  businessInfo: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    company: string;
    hours: {
      friday: {
        closed: string;
        open: string;
      };
      monday: {
        closed: string;
        open: string;
      };
      saturday: {
        closed: string;
        open: string;
      };
      sunday: {
        closed: string;
        open: string;
      };
      thursday: {
        closed: string;
        open: string;
      };
      tuesday: {
        closed: string;
        open: string;
      };
      wednesday: {
        closed: string;
        open: string;
      };
    };
    servicesOffered: string[];
    state: string;
    typesOfInstallerInfo: string[];
    typesOfTiresServices: string[];
    website?: string;
    zipCode: string;
  };
  contactInfo: {
    cellPhone?: string;
    emailPrimary: string;
    emailService?: string;
    firstName: string;
    lastName: string;
    phonePrimary: string;
    phoneService?: string;
    storeImage?: string;
  };
  installationAgreement: boolean | string;
  managerInfo: {
    firstName: string;
    lastName: string;
  };
  token: string;
}

export interface BusinessInputsForReactMemoFunc {
  [REGISTRATION_FIELD_NAMES.COMPANY]: string;
  [REGISTRATION_FIELD_NAMES.ADDRESS_LINE_ONE]: string;
  [REGISTRATION_FIELD_NAMES.ADDRESS_LINE_TWO]?: string;
  [REGISTRATION_FIELD_NAMES.CITY]: string;
  [REGISTRATION_FIELD_NAMES.STATE]: string;
  [REGISTRATION_FIELD_NAMES.ZIP_CODE]: string;
  [REGISTRATION_FIELD_NAMES.WEBSITE]?: string;
}

export interface ContactInputsForReactMemoFunc {
  [REGISTRATION_FIELD_NAMES.FIRST_NAME]: string;
  [REGISTRATION_FIELD_NAMES.LAST_NAME]: string;
  [REGISTRATION_FIELD_NAMES.EMAIL_PRIMARY]: string;
  [REGISTRATION_FIELD_NAMES.EMAIL_SERVICE_DESK]?: string;
  [REGISTRATION_FIELD_NAMES.PHONE_PRIMARY]: string;
  [REGISTRATION_FIELD_NAMES.PHONE_SERVICE_DESK]?: string;
  [REGISTRATION_FIELD_NAMES.CELL_PHONE]?: string;
  [REGISTRATION_FIELD_NAMES.STORE_IMAGE]?: string;
  toastMessage: string;
}

export interface ManagerInputsForReactMemoFunc {
  [REGISTRATION_FIELD_NAMES.FIRST_NAME]: string;
  [REGISTRATION_FIELD_NAMES.LAST_NAME]: string;
}

export interface HoursInputsForReactMemoFunc {
  [REGISTRATION_FIELD_NAMES.SUNDAY_OPEN]: string;
  [REGISTRATION_FIELD_NAMES.SUNDAY_CLOSED]: string;
  [REGISTRATION_FIELD_NAMES.MONDAY_OPEN]: string;
  [REGISTRATION_FIELD_NAMES.MONDAY_CLOSED]: string;
  [REGISTRATION_FIELD_NAMES.TUESDAY_OPEN]: string;
  [REGISTRATION_FIELD_NAMES.TUESDAY_CLOSED]: string;
  [REGISTRATION_FIELD_NAMES.WEDNESDAY_OPEN]: string;
  [REGISTRATION_FIELD_NAMES.WEDNESDAY_CLOSED]: string;
  [REGISTRATION_FIELD_NAMES.THURSDAY_OPEN]: string;
  [REGISTRATION_FIELD_NAMES.THURSDAY_CLOSED]: string;
  [REGISTRATION_FIELD_NAMES.FRIDAY_OPEN]: string;
  [REGISTRATION_FIELD_NAMES.FRIDAY_CLOSED]: string;
  [REGISTRATION_FIELD_NAMES.SATURDAY_OPEN]: string;
  [REGISTRATION_FIELD_NAMES.SATURDAY_CLOSED]: string;
}

export type NextPrevValues =
  | string
  | boolean
  | BusinessInputsForReactMemoFunc
  | ContactInputsForReactMemoFunc
  | ManagerInputsForReactMemoFunc
  | HoursInputsForReactMemoFunc;

export interface FormInputsForReactMemoFunc {
  [index: string]: {
    next: NextPrevValues;
    prev: NextPrevValues;
  };
}

export type ShouldComponentUpdateProps =
  | BusinessInfoInputsProps
  | ServicesOfferedInputsProps
  | InstallerInfoInputsProps
  | ManagerInfoInputsProps
  | ContactInfoInputsProps;
