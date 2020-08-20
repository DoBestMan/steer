import { action } from '@storybook/addon-actions';
import { boolean, number, text } from '@storybook/addon-knobs';

import { default as CopyCheckboxComponent } from './CopyCheckbox';
import { default as TitleCheckboxComponent } from './TitleCheckbox';

export default {
  component: TitleCheckbox,
  title: 'Global/Checkbox',
};

export function TitleCheckbox() {
  return (
    <TitleCheckboxComponent
      label={text('Label', 'Checkbox label')}
      checked={boolean('Active', true)}
      description={text(
        'Description',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      )}
      flair={text('Flair', 'Flair text')}
      count={number('Results count', 0)}
      handleChange={action('Click checkbox')}
      isDisabled={boolean('Disabled', false)}
    />
  );
}

export function CopyCheckbox() {
  return (
    <CopyCheckboxComponent
      label={text('Label', 'Checkbox label')}
      defaultChecked={boolean('Active', true)}
      handleChange={action('Click checkbox')}
      isDisabled={boolean('Disabled', false)}
    />
  );
}
