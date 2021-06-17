import { Fragment, memo } from 'react';

import CopyCheckbox from '~/components/global/Checkbox/CopyCheckbox';
import { ui } from '~/lib/utils/ui-dictionary';
import { typography } from '~/styles/typography.styles';

import { styles } from '../../TireInstallerRegistrationPage.styles';
import { servicesOfferedInputs } from '../TireInstallerRegistrationForm.constants';
import {
  REGISTRATION_FIELD_NAMES,
  TYPES_OF_INPUTS,
} from '../TireInstallerRegistrationForm.enums';
import { RegistrationFormFields } from '../TireInstallerRegistrationForm.types';
import { shouldComponentUpdate } from '../TireInstallerRegistrationForm.utils';

export interface InstallerInfoInputsProps {
  formFields: RegistrationFormFields;
  onChangeHandler: (
    key: keyof RegistrationFormFields,
    serviceType?: string,
  ) => (value: string | boolean | null) => void;
  toastMessage?: string;
}

function InstallerInfoInputs({
  onChangeHandler,
  formFields,
}: InstallerInfoInputsProps) {
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
        {ui('tireInstallerRegistration.form.labels.moreInstallerInfo')}
      </h2>
      <h3 css={[typography.tertiaryHeadline, styles.spacingBottom20]}>
        {ui('tireInstallerRegistration.form.labels.checkAllInfo')}
      </h3>
      {servicesOfferedInputs.installerInfo.map((service) => (
        <Fragment key={service}>
          <CopyCheckbox
            label={service}
            defaultChecked={
              !!formFields[REGISTRATION_FIELD_NAMES.INSTALLER_INFO].includes(
                service,
              )
            }
            handleChange={onChangeHandler(
              REGISTRATION_FIELD_NAMES.INSTALLER_INFO,
              service,
            )}
          />
        </Fragment>
      ))}
    </fieldset>
  );
}

export default memo(
  InstallerInfoInputs,
  shouldComponentUpdate(TYPES_OF_INPUTS.INSTALLER_INFO, true),
);
