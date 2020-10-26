import { memo } from 'react';

import Markdown from '~/components/global/Markdown/Markdown';
import Select from '~/components/global/Select/Select';
import { capitalize } from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';
import { typography } from '~/styles/typography.styles';

import { styles } from '../../TireInstallerRegistrationPage.styles';
import { businessHoursInput } from '../TireInstallerRegistrationForm.constants';
import { TYPES_OF_INPUTS } from '../TireInstallerRegistrationForm.enums';
import { RegistrationFormFields } from '../TireInstallerRegistrationForm.types';
import { shouldComponentUpdate } from '../TireInstallerRegistrationForm.utils';

export interface HoursInfoInputsProps {
  formFields: RegistrationFormFields;
  onChangeHandler: (
    key: keyof RegistrationFormFields,
  ) => (value: string | boolean | null) => void;
}

function HoursInfoInputs({
  onChangeHandler,
  formFields,
}: HoursInfoInputsProps) {
  return (
    <fieldset css={styles.group}>
      <h2 css={[typography.secondaryHeadline, styles.spacingBottom20]}>
        Hours of operation
      </h2>
      {businessHoursInput.days.map((input) => (
        <div css={styles.spacingBottom20} key={input.label}>
          <h2
            css={[
              styles.flexFull,
              typography.tertiaryHeadline,
              styles.spacingBottom20,
            ]}
          >
            {input.label}
          </h2>
          <div css={styles.hourSection}>
            <div css={styles.flex1}>
              <Select
                id={input.open.label}
                label={
                  formFields[input.open.label]
                    ? capitalize(
                        ui('tireInstallerRegistration.form.labels.open'),
                      )
                    : capitalize(
                        ui('tireInstallerRegistration.form.labels.closed'),
                      )
                }
                list={businessHoursInput.hours}
                onChange={onChangeHandler(input.open.label)}
                placeholder={capitalize(
                  ui('tireInstallerRegistration.form.labels.closed'),
                )}
                value={formFields[input.open.label]}
                {...{ name: input.open.label }}
              />
            </div>
            <div css={[styles.spacingSides20, typography.bodyCopy]}>
              <Markdown>
                {ui('tireInstallerRegistration.form.labels.to')}
              </Markdown>
            </div>
            <div css={styles.flex1}>
              <Select
                id={input.closed.label}
                label={capitalize(
                  ui('tireInstallerRegistration.form.labels.closed'),
                )}
                list={businessHoursInput.hours}
                onChange={onChangeHandler(input.closed.label)}
                placeholder={capitalize(
                  ui('tireInstallerRegistration.form.labels.closed'),
                )}
                value={formFields[input.closed.label]}
                {...{ name: input.closed.label }}
              />
            </div>
          </div>
        </div>
      ))}
    </fieldset>
  );
}

export default memo(
  HoursInfoInputs,
  shouldComponentUpdate(TYPES_OF_INPUTS.HOURS),
);
