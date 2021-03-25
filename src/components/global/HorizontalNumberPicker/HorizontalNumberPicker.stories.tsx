import { action } from '@storybook/addon-actions';
import { number, text } from '@storybook/addon-knobs';

import HorizontalNumberPicker from './HorizontalNumberPicker';
import HorizontalNumberPickerWithControls from './HorizontalNumberPickerWithControls';

export default {
  component: HorizontalNumberPicker,
  title: 'Global/Horizontal Number Picker',
};

const decoratorStyles = {
  ':before': {
    padding: '0 2px',
    content: '"•"',
    fontSize: 8,
  },
};

function SubTitle() {
  return (
    <p>
      Total price <span css={decoratorStyles} /> $531.84
    </p>
  );
}

export function HorizontalNumberPickerWithKnobs() {
  const handleSelect = action('number-picker-selection');
  const initialIndex = number('Initial Index', -1);
  const title = text('Title', 'SELECT TIRE QUANTITY');

  return (
    <HorizontalNumberPicker
      numbers={Array.from(Array(10).keys())}
      onSelect={handleSelect}
      initialIndex={initialIndex}
      subTitle={<SubTitle />}
      title={title}
    />
  );
}

export function HorizontalNumberPickerWithControlsWithKnobs() {
  const handleSelect = action('number-picker-selection');
  const initialIndex = number('Initial Index', -1);
  const title = text('Title', 'SELECT TIRE QUANTITY');

  return (
    <HorizontalNumberPickerWithControls
      numbers={Array.from(Array(10).keys())}
      onSelect={handleSelect}
      initialIndex={initialIndex}
      subTitle={<SubTitle />}
      title={title}
    />
  );
}
