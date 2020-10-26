import { Fragment, memo } from 'react';

import CopyCheckbox from '~/components/global/Checkbox/CopyCheckbox';
import { typography } from '~/styles/typography.styles';

import { styles } from '../../TireInstallerRegistrationPage.styles';
import { servicesOfferedInputs } from '../TireInstallerRegistrationForm.constants';
import {
  REGISTRATION_FIELD_NAMES,
  TYPES_OF_INPUTS,
} from '../TireInstallerRegistrationForm.enums';
import { RegistrationFormFields } from '../TireInstallerRegistrationForm.types';
import { shouldComponentUpdate } from '../TireInstallerRegistrationForm.utils';

export interface ServicesOfferedInputsProps {
  formFields: RegistrationFormFields;
  onChangeHandler: (
    key: keyof RegistrationFormFields,
    serviceType?: string,
  ) => (value: string | boolean | null) => void;
  toastMessage?: string;
}

function ServicesOfferedInputs({
  onChangeHandler,
  formFields,
}: ServicesOfferedInputsProps) {
  return (
    <fieldset
      css={[
        styles.group,
        styles.groupBottomBorder,
        styles.checkBoxSection,
        styles.paddingTop60,
      ]}
    >
      <h2 css={[typography.secondaryHeadline, styles.spacingBottom20]}>
        Services offered
      </h2>
      <h3 css={[typography.tertiaryHeadline, styles.spacingBottom20]}>
        Check all that apply.
      </h3>
      {servicesOfferedInputs.autoServices.map((service) => (
        <Fragment key={service}>
          <CopyCheckbox
            label={service}
            defaultChecked={
              !!formFields[REGISTRATION_FIELD_NAMES.AUTO_SERVICES].includes(
                service,
              )
            }
            handleChange={onChangeHandler(
              REGISTRATION_FIELD_NAMES.AUTO_SERVICES,
              service,
            )}
          />
        </Fragment>
      ))}
    </fieldset>
  );
}

export default memo(
  ServicesOfferedInputs,
  shouldComponentUpdate(TYPES_OF_INPUTS.SERVICES, true),
);
