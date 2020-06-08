import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';

import Radio from './Radio';

export default {
  component: RadioDefault,
  title: 'Global/Radio',
};

export function RadioDefault() {
  const active = boolean('Active', true);
  return (
    <Radio
      activeValue={active ? 'value' : ''}
      value="value"
      onChange={action('Click radio')}
      name="Generic radio"
    />
  );
}
