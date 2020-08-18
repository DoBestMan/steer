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

const styles: StylesMap = {
  container: {
    padding: SPACING.SIZE_30,
    '> div': { marginBottom: SPACING.SIZE_60 },
    [MQ.M]: {
      padding: SPACING.SIZE_60,
    },
  },
};

export default {
  component: Select,
  title: 'Global/Select',
};

interface TInputStates {
  default?: string;
  error?: string;
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
        list={list}
        placeholder={placeholder}
        disabled={isDisabled}
        onChange={onChange('default')}
        value={values.default}
      />
    </div>
  );
}
