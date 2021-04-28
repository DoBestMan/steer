import React, { memo } from 'react';

import CopyCheckbox from '~/components/global/Checkbox/CopyCheckbox';
import Markdown from '~/components/global/Markdown/Markdown';
import { typography } from '~/styles/typography.styles';

import { styles } from '../../TireInstallerRegistrationPage.styles';
import { installationAgreement } from '../TireInstallerRegistrationForm.constants';
import {
  REGISTRATION_FIELD_NAMES,
  TYPES_OF_INPUTS,
} from '../TireInstallerRegistrationForm.enums';
import { RegistrationFormFields } from '../TireInstallerRegistrationForm.types';
import { shouldComponentUpdate } from '../TireInstallerRegistrationForm.utils';

export interface InstallerAgreementInputProps {
  formFields: RegistrationFormFields;
  onChangeHandler: (
    key: keyof RegistrationFormFields,
  ) => (value: string | boolean | null) => void;
}

function InstallerAgreementInput({
  onChangeHandler,
  formFields,
}: InstallerAgreementInputProps) {
  return (
    <>
      <h2 css={[typography.secondaryHeadline, styles.spacingBottom20]}>
        Installation price
      </h2>
      <div css={[styles.spacingBottom20, typography.bodyCopy]}>
        <Markdown>{installationAgreement.copy}</Markdown>
      </div>
      <div css={styles.spacingBottom20}>
        <CopyCheckbox
          label={installationAgreement.label}
          defaultChecked={
            !!formFields[REGISTRATION_FIELD_NAMES.INSTALLATION_AGREEMENT]
          }
          handleChange={onChangeHandler(
            REGISTRATION_FIELD_NAMES.INSTALLATION_AGREEMENT,
          )}
          {...{ name: REGISTRATION_FIELD_NAMES.INSTALLATION_AGREEMENT }}
        />
      </div>
    </>
  );
}

export default memo(
  InstallerAgreementInput,
  shouldComponentUpdate(TYPES_OF_INPUTS.INSTALLER, true),
);
