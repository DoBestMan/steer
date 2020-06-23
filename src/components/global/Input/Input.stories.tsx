import { boolean, text } from '@storybook/addon-knobs';
import { useState } from 'react';

import { MQ, SPACING, StylesMap } from '~/lib/constants';

import Input from './Input';

export default {
  component: Input,
  title: 'Global/Form/Input',
};

const styles: StylesMap = {
  container: {
    padding: SPACING.SIZE_30,
    '> span': { marginBottom: SPACING.SIZE_60 },
    [MQ.M]: {
      padding: SPACING.SIZE_60,
    },
  },
};

export function InputWithKnobs() {
  const [value, setValue] = useState('');

  const onChange = (inputValue: string) => {
    setValue(inputValue);
  };

  const label = text('Label', 'Email');
  const contextualLabel = text(
    'Contextual Label (placeholder)',
    'example@email.com',
  );
  const isDisabled = boolean('Is disabled?', false);
  const hasError = boolean('Has error', false);
  const errorMessage = text('Error message', 'Error message');
  const isTextArea = boolean('Is text area?', false);

  return (
    <div css={styles.container}>
      <Input
        contextualLabel={contextualLabel}
        disabled={isDisabled}
        error={{ hasError, errorMessage }}
        isTextArea={isTextArea}
        label={label}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

interface TInputStates {
  area?: string;
  default?: string;
  disabled?: string;
  error?: string;
  long?: string;
}

export function InputStates() {
  const [values, setValues] = useState<TInputStates>({});

  const handleChange = (key: string) => (inputValue: string) => {
    setValues({
      ...values,
      [key]: inputValue,
    });
  };
  return (
    <div css={styles.container}>
      <Input
        contextualLabel="Contextual Label"
        id="default-input"
        label="Label"
        onChange={handleChange('default')}
        value={values.default}
      />
      <Input
        error={{ hasError: true, errorMessage: 'Error message' }}
        id="error-input"
        label="Label"
        onChange={handleChange('error')}
        value={values.error}
      />
      <Input
        disabled
        id="disabled-input"
        label="Label"
        onChange={handleChange('disabled')}
        value={values.disabled}
      />
      <Input
        contextualLabel="This is a text area"
        id="area-input"
        isTextArea
        label="Label"
        onChange={handleChange('area')}
        value={values.area}
      />
      <Input
        id="long-input"
        label="This is a super very long label that is way too long and should never be used but we gotta test it out to know we should never ever think about using it"
        onChange={handleChange('long')}
        value={values.long}
      />
    </div>
  );
}
