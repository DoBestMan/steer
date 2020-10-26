import { capitalize } from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';

import {
  DAYS,
  REGISTRATION_FIELD_NAMES,
  TOAST_MESSAGE_LABELS,
} from './TireInstallerRegistrationForm.enums';

export const STORE_IMAGE_INPUT_ID = 'store-image';

const inputError = {
  errorMessage: '',
  hasError: false,
};

export const inputErrorEmail = {
  errorMessage: ui('tireInstallerRegistration.form.errors.email'),
  hasError: true,
};

export const inputErrorPhone = {
  errorMessage: ui('tireInstallerRegistration.form.errors.phone'),
  hasError: true,
};

export const TOAST_MESSAGES: Record<string, string> = {
  [TOAST_MESSAGE_LABELS.ATTACH_IMAGE_ERROR]: ui(
    'tireInstallerRegistration.toastMessages.errors.attachImage',
  ),
  [TOAST_MESSAGE_LABELS.ATTACH_IMAGE_SUCCESS]: ui(
    'tireInstallerRegistration.toastMessages.success.attachImage',
  ),
  [TOAST_MESSAGE_LABELS.FORM_ERROR]: ui(
    'tireInstallerRegistration.toastMessages.errors.form',
  ),
  [TOAST_MESSAGE_LABELS.FORM_SUCCESS]: ui(
    'tireInstallerRegistration.toastMessages.success.form',
  ),
};

export const INPUTS_TO_VALIDATE = {
  [REGISTRATION_FIELD_NAMES.CELL_PHONE]: { ...inputError },
  [REGISTRATION_FIELD_NAMES.EMAIL_PRIMARY]: { ...inputError },
  [REGISTRATION_FIELD_NAMES.EMAIL_SERVICE_DESK]: { ...inputError },
  [REGISTRATION_FIELD_NAMES.PHONE_PRIMARY]: { ...inputError },
  [REGISTRATION_FIELD_NAMES.PHONE_SERVICE_DESK]: { ...inputError },
};

export const REGISTRATION_FORM_FIELDS = {
  [REGISTRATION_FIELD_NAMES.ADDRESS_LINE_ONE]: '',
  [REGISTRATION_FIELD_NAMES.ADDRESS_LINE_TWO]: '',
  [REGISTRATION_FIELD_NAMES.AUTO_SERVICES]: '',
  [REGISTRATION_FIELD_NAMES.CELL_PHONE]: '',
  [REGISTRATION_FIELD_NAMES.CITY]: '',
  [REGISTRATION_FIELD_NAMES.COMPANY]: '',
  [REGISTRATION_FIELD_NAMES.EMAIL_PRIMARY]: '',
  [REGISTRATION_FIELD_NAMES.EMAIL_SERVICE_DESK]: '',
  [REGISTRATION_FIELD_NAMES.FIRST_NAME]: '',
  [REGISTRATION_FIELD_NAMES.FRIDAY_CLOSED]: '',
  [REGISTRATION_FIELD_NAMES.FRIDAY_OPEN]: '',
  [REGISTRATION_FIELD_NAMES.INSTALLATION_AGREEMENT]: '',
  [REGISTRATION_FIELD_NAMES.LAST_NAME]: '',
  [REGISTRATION_FIELD_NAMES.MONDAY_CLOSED]: '',
  [REGISTRATION_FIELD_NAMES.MONDAY_OPEN]: '',
  [REGISTRATION_FIELD_NAMES.PHONE_PRIMARY]: '',
  [REGISTRATION_FIELD_NAMES.PHONE_SERVICE_DESK]: '',
  [REGISTRATION_FIELD_NAMES.SATURDAY_CLOSED]: '',
  [REGISTRATION_FIELD_NAMES.SATURDAY_OPEN]: '',
  [REGISTRATION_FIELD_NAMES.STATE]: '',
  [REGISTRATION_FIELD_NAMES.STORE_IMAGE]: '',
  [REGISTRATION_FIELD_NAMES.SUNDAY_CLOSED]: '',
  [REGISTRATION_FIELD_NAMES.SUNDAY_OPEN]: '',
  [REGISTRATION_FIELD_NAMES.THURSDAY_CLOSED]: '',
  [REGISTRATION_FIELD_NAMES.THURSDAY_OPEN]: '',
  [REGISTRATION_FIELD_NAMES.TIRE_SERVICES]: '',
  [REGISTRATION_FIELD_NAMES.TUESDAY_OPEN]: '',
  [REGISTRATION_FIELD_NAMES.TUESDAY_CLOSED]: '',
  [REGISTRATION_FIELD_NAMES.WEBSITE]: '',
  [REGISTRATION_FIELD_NAMES.WEDNESDAY_CLOSED]: '',
  [REGISTRATION_FIELD_NAMES.WEDNESDAY_OPEN]: '',
  [REGISTRATION_FIELD_NAMES.ZIP_CODE]: '',
};

export const businessInfoInputs = [
  {
    isSelect: false,
    label: ui('tireInstallerRegistration.form.labels.company'),
    list: [],
    name: REGISTRATION_FIELD_NAMES.COMPANY,
    value: REGISTRATION_FORM_FIELDS[REGISTRATION_FIELD_NAMES.COMPANY],
  },
  {
    isSelect: false,
    label: ui('tireInstallerRegistration.form.labels.addressLine1'),
    list: [],
    name: REGISTRATION_FIELD_NAMES.ADDRESS_LINE_ONE,
    value: REGISTRATION_FORM_FIELDS[REGISTRATION_FIELD_NAMES.ADDRESS_LINE_ONE],
  },
  {
    isSelect: false,
    label: ui('tireInstallerRegistration.form.labels.addressLine2'),
    list: [],
    name: REGISTRATION_FIELD_NAMES.ADDRESS_LINE_TWO,
    value: REGISTRATION_FORM_FIELDS[REGISTRATION_FIELD_NAMES.ADDRESS_LINE_TWO],
  },
  {
    isSelect: false,
    label: ui('tireInstallerRegistration.form.labels.city'),
    list: [],
    name: REGISTRATION_FIELD_NAMES.CITY,
    value: REGISTRATION_FORM_FIELDS[REGISTRATION_FIELD_NAMES.CITY],
  },
  {
    isSelect: true,
    label: ui('tireInstallerRegistration.form.labels.state'),
    list: [
      {
        text: ui('tireInstallerRegistration.form.labels.state'),
        value: '',
      },
      {
        text: 'AK',
        value: 'AK',
      },
      {
        text: 'AL',
        value: 'AL',
      },
      {
        text: 'AR',
        value: 'AR',
      },
      {
        text: 'AZ',
        value: 'AZ',
      },
      {
        text: 'CA',
        value: 'CA',
      },
      {
        text: 'CO',
        value: 'CO',
      },
      {
        text: 'CT',
        value: 'CT',
      },
      {
        text: 'DC',
        value: 'DC',
      },
      {
        text: 'DE',
        value: 'DE',
      },
      {
        text: 'FL',
        value: 'FL',
      },
      {
        text: 'GA',
        value: 'GA',
      },
      {
        text: 'HI',
        value: 'HI',
      },
      {
        text: 'IA',
        value: 'IA',
      },
      {
        text: 'ID',
        value: 'ID',
      },
      {
        text: 'IL',
        value: 'IL',
      },
      {
        text: 'IN',
        value: 'IN',
      },
      {
        text: 'KS',
        value: 'KS',
      },
      {
        text: 'KY',
        value: 'KY',
      },
      {
        text: 'LA',
        value: 'LA',
      },
      {
        text: 'MA',
        value: 'MA',
      },
      {
        text: 'MD',
        value: 'MD',
      },
      {
        text: 'ME',
        value: 'ME',
      },
      {
        text: 'MI',
        value: 'MI',
      },
      {
        text: 'MN',
        value: 'MN',
      },
      {
        text: 'MO',
        value: 'MO',
      },
      {
        text: 'MS',
        value: 'MS',
      },
      {
        text: 'MT',
        value: 'MT',
      },
      {
        text: 'NC',
        value: 'NC',
      },
      {
        text: 'ND',
        value: 'ND',
      },
      {
        text: 'NE',
        value: 'NE',
      },
      {
        text: 'NH',
        value: 'NH',
      },
      {
        text: 'NJ',
        value: 'NJ',
      },
      {
        text: 'NM',
        value: 'NM',
      },
      {
        text: 'NV',
        value: 'NV',
      },
      {
        text: 'NY',
        value: 'NY',
      },
      {
        text: 'OH',
        value: 'OH',
      },
      {
        text: 'OK',
        value: 'OK',
      },
      {
        text: 'OR',
        value: 'OR',
      },
      {
        text: 'PA',
        value: 'PA',
      },
      {
        text: 'RI',
        value: 'RI',
      },
      {
        text: 'SC',
        value: 'SC',
      },
      {
        text: 'SD',
        value: 'SD',
      },
      {
        text: 'TN',
        value: 'TN',
      },
      {
        text: 'TX',
        value: 'TX',
      },
      {
        text: 'UT',
        value: 'UT',
      },
      {
        text: 'VA',
        value: 'VA',
      },
      {
        text: 'VT',
        value: 'VT',
      },
      {
        text: 'WA',
        value: 'WA',
      },
      {
        text: 'WI',
        value: 'WI',
      },
      {
        text: 'WV',
        value: 'WV',
      },
      {
        text: 'WY',
        value: 'WY',
      },
    ],
    name: REGISTRATION_FIELD_NAMES.STATE,
    value: REGISTRATION_FORM_FIELDS[REGISTRATION_FIELD_NAMES.STATE],
  },
  {
    isSelect: false,
    label: ui('tireInstallerRegistration.form.labels.zipCode'),
    list: [],
    name: REGISTRATION_FIELD_NAMES.ZIP_CODE,
    value: REGISTRATION_FORM_FIELDS[REGISTRATION_FIELD_NAMES.ZIP_CODE],
  },
  {
    isSelect: false,
    label: ui('tireInstallerRegistration.form.labels.website'),
    list: [],
    name: REGISTRATION_FIELD_NAMES.WEBSITE,
    value: REGISTRATION_FORM_FIELDS[REGISTRATION_FIELD_NAMES.WEBSITE],
  },
];

export const businessHoursInput = {
  days: [
    {
      label: DAYS.SUNDAY,
      open: {
        label: REGISTRATION_FIELD_NAMES.SUNDAY_OPEN,
      },
      closed: {
        label: REGISTRATION_FIELD_NAMES.SUNDAY_CLOSED,
      },
    },
    {
      label: DAYS.MONDAY,
      open: {
        label: REGISTRATION_FIELD_NAMES.MONDAY_OPEN,
      },
      closed: {
        label: REGISTRATION_FIELD_NAMES.MONDAY_CLOSED,
      },
    },
    {
      label: DAYS.TUESDAY,
      open: {
        label: REGISTRATION_FIELD_NAMES.TUESDAY_OPEN,
      },
      closed: {
        label: REGISTRATION_FIELD_NAMES.TUESDAY_CLOSED,
      },
    },
    {
      label: DAYS.WEDNESDAY,
      open: {
        label: REGISTRATION_FIELD_NAMES.WEDNESDAY_OPEN,
      },
      closed: {
        label: REGISTRATION_FIELD_NAMES.WEDNESDAY_CLOSED,
      },
    },
    {
      label: DAYS.THURSDAY,
      open: {
        label: REGISTRATION_FIELD_NAMES.THURSDAY_OPEN,
      },
      closed: {
        label: REGISTRATION_FIELD_NAMES.THURSDAY_CLOSED,
      },
    },
    {
      label: DAYS.FRIDAY,
      open: {
        label: REGISTRATION_FIELD_NAMES.FRIDAY_OPEN,
      },
      closed: {
        label: REGISTRATION_FIELD_NAMES.FRIDAY_CLOSED,
      },
    },
    {
      label: DAYS.SATURDAY,
      open: {
        label: REGISTRATION_FIELD_NAMES.SATURDAY_OPEN,
      },
      closed: {
        label: REGISTRATION_FIELD_NAMES.SATURDAY_CLOSED,
      },
    },
  ],
  hours: [
    {
      text: capitalize(ui('tireInstallerRegistration.form.labels.closed')),
      value: '',
    },
    {
      text: '12:00 AM',
      value: '00:00',
    },
    {
      text: '12:30 AM',
      value: '00:30',
    },
    {
      text: '01:00 AM',
      value: '01:00',
    },
    {
      text: '01:30 AM',
      value: '01:30',
    },
    {
      text: '02:00 AM',
      value: '02:00',
    },
    {
      text: '02:30 AM',
      value: '02:30',
    },
    {
      text: '03:00 AM',
      value: '03:00',
    },
    {
      text: '03:30 AM',
      value: '03:30',
    },
    {
      text: '04:00 AM',
      value: '04:00',
    },
    {
      text: '04:30 AM',
      value: '04:30',
    },
    {
      text: '05:00 AM',
      value: '05:00',
    },
    {
      text: '05:30 AM',
      value: '05:30',
    },
    {
      text: '06:00 AM',
      value: '06:00',
    },
    {
      text: '06:30 AM',
      value: '06:30',
    },
    {
      text: '07:00 AM',
      value: '07:00',
    },
    {
      text: '07:30 AM',
      value: '07:30',
    },
    {
      text: '08:00 AM',
      value: '08:00',
    },
    {
      text: '08:30 AM',
      value: '08:30',
    },
    {
      text: '09:00 AM',
      value: '09:00',
    },
    {
      text: '09:30 AM',
      value: '09:30',
    },
    {
      text: '10:00 AM',
      value: '10:00',
    },
    {
      text: '10:30 AM',
      value: '10:30',
    },
    {
      text: '11:00 AM',
      value: '11:00',
    },
    {
      text: '11:30 AM',
      value: '11:30',
    },
    {
      text: '12:00 PM',
      value: '12:00',
    },
    {
      text: '12:30 PM',
      value: '12:30',
    },
    {
      text: '01:00 PM',
      value: '13:00',
    },
    {
      text: '01:30 PM',
      value: '13:30',
    },
    {
      text: '02:00 PM',
      value: '14:00',
    },
    {
      text: '02:30 PM',
      value: '14:30',
    },
    {
      text: '03:00 PM',
      value: '15:00',
    },
    {
      text: '03:30 PM',
      value: '15:30',
    },
    {
      text: '04:00 PM',
      value: '16:00',
    },
    {
      text: '04:30 PM',
      value: '16:30',
    },
    {
      text: '05:00 PM',
      value: '17:00',
    },
    {
      text: '05:30 PM',
      value: '17:30',
    },
    {
      text: '06:00 PM',
      value: '18:00',
    },
    {
      text: '06:30 PM',
      value: '18:30',
    },
    {
      text: '07:00 PM',
      value: '19:00',
    },
    {
      text: '07:30 PM',
      value: '19:30',
    },
    {
      text: '08:00 PM',
      value: '20:00',
    },
    {
      text: '08:30 PM',
      value: '20:30',
    },
    {
      text: '09:00 PM',
      value: '21:00',
    },
    {
      text: '09:30 PM',
      value: '21:30',
    },
    {
      text: '10:00 PM',
      value: '22:00',
    },
    {
      text: '10:30 PM',
      value: '22:30',
    },
    {
      text: '11:00 PM',
      value: '23:00',
    },
    {
      text: '11:30 PM',
      value: '23:30',
    },
  ],
};

export const contactInfoInputs = [
  {
    label: ui('tireInstallerRegistration.form.labels.firstName'),
    name: REGISTRATION_FIELD_NAMES.FIRST_NAME,
  },
  {
    label: ui('tireInstallerRegistration.form.labels.lastName'),
    name: REGISTRATION_FIELD_NAMES.LAST_NAME,
  },
  {
    label: ui('tireInstallerRegistration.form.labels.emailPrimary'),
    name: REGISTRATION_FIELD_NAMES.EMAIL_PRIMARY,
  },
  {
    label: ui('tireInstallerRegistration.form.labels.emailService'),
    name: REGISTRATION_FIELD_NAMES.EMAIL_SERVICE_DESK,
  },
  {
    label: ui('tireInstallerRegistration.form.labels.phonePrimary'),
    name: REGISTRATION_FIELD_NAMES.PHONE_PRIMARY,
  },
  {
    label: ui('tireInstallerRegistration.form.labels.phoneService'),
    name: REGISTRATION_FIELD_NAMES.PHONE_SERVICE_DESK,
  },
  {
    label: ui('tireInstallerRegistration.form.labels.cell'),
    name: REGISTRATION_FIELD_NAMES.CELL_PHONE,
  },
];

export const servicesOfferedInputs = {
  autoServices: [
    ui('tireInstallerRegistration.form.services.airConditioning'),
    ui('tireInstallerRegistration.form.services.alignments'),
    ui('tireInstallerRegistration.form.services.battery'),
    ui('tireInstallerRegistration.form.services.brakes'),
    ui('tireInstallerRegistration.form.services.coolingSystems'),
    ui('tireInstallerRegistration.form.services.diagnostics'),
    ui('tireInstallerRegistration.form.services.dieselRepair'),
    ui('tireInstallerRegistration.form.services.drivetrain'),
    ui('tireInstallerRegistration.form.services.electrical'),
    ui('tireInstallerRegistration.form.services.emissions'),
    ui('tireInstallerRegistration.form.services.exhaustSystems'),
    ui('tireInstallerRegistration.form.services.fullMechanical'),
    ui('tireInstallerRegistration.form.services.inspections'),
    ui('tireInstallerRegistration.form.services.installationOf20'),
    ui('tireInstallerRegistration.form.services.oilChanges'),
    ui('tireInstallerRegistration.form.services.preventativeMaintenance'),
    ui('tireInstallerRegistration.form.services.shocksAndStruts'),
    ui('tireInstallerRegistration.form.services.shuttleService'),
    ui('tireInstallerRegistration.form.services.towing'),
    ui('tireInstallerRegistration.form.services.tpmsService'),
    ui('tireInstallerRegistration.form.services.wiFi'),
  ],
  tireServices: [
    ui('tireInstallerRegistration.form.tireServices.antique'),
    ui('tireInstallerRegistration.form.tireServices.atvUtv'),
    ui('tireInstallerRegistration.form.tireServices.bicycle'),
    ui('tireInstallerRegistration.form.tireServices.commercial'),
    ui('tireInstallerRegistration.form.tireServices.farm'),
    ui('tireInstallerRegistration.form.tireServices.golf'),
    ui('tireInstallerRegistration.form.tireServices.industrial'),
    ui('tireInstallerRegistration.form.tireServices.lawnAndGarden'),
    ui('tireInstallerRegistration.form.tireServices.lightTruck'),
    ui('tireInstallerRegistration.form.tireServices.motorcycle'),
    ui('tireInstallerRegistration.form.tireServices.otr'),
    ui('tireInstallerRegistration.form.tireServices.passenger'),
    ui('tireInstallerRegistration.form.tireServices.racing'),
    ui('tireInstallerRegistration.form.tireServices.suvCrossover'),
    ui('tireInstallerRegistration.form.tireServices.tempSpare'),
    ui('tireInstallerRegistration.form.tireServices.trailer'),
  ],
};

export const installationAgreement = {
  copy: ui('tireInstallerRegistration.copy.installationAgreement.copy'),
  label: ui('tireInstallerRegistration.copy.installationAgreement.label'),
};
