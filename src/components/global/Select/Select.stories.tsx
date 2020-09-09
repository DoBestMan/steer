import { boolean, text } from '@storybook/addon-knobs';
import { useState } from 'react';

import { MQ, SPACING, StylesMap } from '~/lib/constants';

import Select, { SelectOption } from './Select';

const list: SelectOption[] = [
  {
    text: 'option1',
    value: '1',
  },
  {
    text: 'option2',
    value: '2',
  },
  {
    text: 'option3',
    value: '3',
  },
  {
    text: 'option4',
    value: '4',
  },
];

const longList: SelectOption[] = Array(50)
  .fill(0)
  .map((_, index) => ({
    text: `Option${index + 1}`,
    value: index + 1 + '',
  }));

const styles: StylesMap = {
  container: {
    padding: SPACING.SIZE_30,
    '> span': { marginBottom: SPACING.SIZE_60 },
    [MQ.M]: {
      padding: SPACING.SIZE_60,
    },
  },
  containerForLongSelect: {
    padding: SPACING.SIZE_30,
  },
};

export default {
  component: Select,
  title: 'Global/Select',
};

interface TInputStates {
  default?: string;
  disabled?: string;
  error?: string;
  long?: string;
}

export function TypicalSelectWithKnob() {
  const [values, setValues] = useState<TInputStates>({});
  const isDisabled = boolean('Is disabled', false);
  const placeholder = text('Placeholder', 'Select an option');

  const onChange = (key: string) => (value: string | null) => {
    setValues({
      ...values,
      [key]: value as string,
    });
  };

  return (
    <div css={styles.container}>
      <Select
        id="default"
        label="label"
        list={list}
        placeholder={placeholder}
        disabled={isDisabled}
        onChange={onChange('default')}
        value={values.default}
      />
    </div>
  );
}

export function SelectWithManyOptions() {
  const [values, setValues] = useState<TInputStates>({});

  const onChange = (key: string) => (value: string | null) => {
    setValues({
      ...values,
      [key]: value as string,
    });
  };

  return (
    <div css={styles.containerForLongSelect}>
      <Select
        id="long-list-select"
        label="label"
        list={longList}
        placeholder="Select an option"
        onChange={onChange('long')}
        value={values.long}
      />
    </div>
  );
}

export function SelectStates() {
  const [values, setValues] = useState<TInputStates>({});

  const onChange = (key: string) => (value: string | null) => {
    setValues({
      ...values,
      [key]: value as string,
    });
  };
  return (
    <div css={styles.container}>
      <Select
        id="default-select"
        label="Label"
        list={list}
        placeholder={'Select an option'}
        onChange={onChange('default')}
        value={values.default}
      />
      <Select
        id="disabled-select"
        label="Label"
        list={list}
        placeholder={'Select an option'}
        onChange={onChange('disabled')}
        disabled
        value={values.disabled}
      />
      <Select
        id="error-select"
        error={{ hasError: true, errorMessage: 'Error message' }}
        label="Label"
        list={list}
        placeholder={'Select an option'}
        onChange={onChange('error')}
        value={values.error}
      />
    </div>
  );
}
