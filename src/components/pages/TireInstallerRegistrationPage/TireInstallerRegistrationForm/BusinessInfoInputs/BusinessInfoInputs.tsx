import { memo } from 'react';

import Input from '~/components/global/Input/Input';
import Select from '~/components/global/Select/Select';
import { ui } from '~/lib/utils/ui-dictionary';
import { typography } from '~/styles/typography.styles';

import { styles } from '../../TireInstallerRegistrationPage.styles';
import { businessInfoInputs } from '../TireInstallerRegistrationForm.constants';
import { TYPES_OF_INPUTS } from '../TireInstallerRegistrationForm.enums';
import { RegistrationFormFields } from '../TireInstallerRegistrationForm.types';
import { shouldComponentUpdate } from '../TireInstallerRegistrationForm.utils';

export interface BusinessInfoInputsProps {
  formFields: RegistrationFormFields;
  onChangeHandler: (
    key: keyof RegistrationFormFields,
  ) => (value: string | boolean | null) => void;
  toastMessage?: string;
}

function BusinessInfoInputs({
  onChangeHandler,
  formFields,
}: BusinessInfoInputsProps) {
  return (
    <fieldset css={styles.group}>
      <h2 css={[typography.secondaryHeadline, styles.spacingBottom20]}>
        Business information
      </h2>
      {businessInfoInputs.map((input) => (
        <div css={styles.spacingBottom20} key={input.label}>
          {input.isSelect ? (
            <Select
              id={input.label}
              label={ui('tireInstallerRegistration.form.labels.state')}
              onChange={onChangeHandler(input.name)}
              placeholder={input.label}
              list={input.list}
              value={formFields[input.name]}
              {...{ name: input.name }}
            />
          ) : (
            <Input
              label={input.label}
              onChange={onChangeHandler(input.name)}
              value={formFields[input.name]}
              {...{ name: input.name }}
            />
          )}
        </div>
      ))}
    </fieldset>
  );
}

export default memo(
  BusinessInfoInputs,
  shouldComponentUpdate(TYPES_OF_INPUTS.BUSINESS),
);
