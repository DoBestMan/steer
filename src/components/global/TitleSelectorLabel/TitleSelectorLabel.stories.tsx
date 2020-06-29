import { boolean, number, text } from '@storybook/addon-knobs';

import { default as TitleSelectorComponent } from './TitleSelectorLabel';

export default {
  component: TitleSelectorLabel,
  title: 'Global/Title Selector Label',
};

export function TitleSelectorLabel() {
  return (
    <TitleSelectorComponent
      description={text(
        'Description',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      )}
      flair={text('Flair', 'Flair text')}
      count={number('Results count', 0)}
      label={text('Label text', 'Checkbox label')}
      isDisabled={boolean('Disabled', false)}
    />
  );
}
