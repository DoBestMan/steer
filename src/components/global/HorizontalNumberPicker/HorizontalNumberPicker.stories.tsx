import { CSSObject } from '@emotion/core';
import { action } from '@storybook/addon-actions';
import { number, text } from '@storybook/addon-knobs';

import HorizontalNumberPicker from './HorizontalNumberPicker';

export default {
  component: HorizontalNumberPicker,
  title: 'Global/Horizontal Number Picker',
};

const decoratorStyles: CSSObject = {
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
  const selectedIndex = number('Selected Index', -1);
  const title = text('Title', 'SELECT TIRE QUANTITY');

  return (
    <HorizontalNumberPicker
      numbers={Array.from(Array(10).keys())}
      onSelect={handleSelect}
      selectedIndex={selectedIndex}
      subTitle={<SubTitle />}
      title={title}
    />
  );
}
