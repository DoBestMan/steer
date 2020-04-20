import { action } from '@storybook/addon-actions';

import Button from './Button';

export default {
  component: Button,
  title: 'Button',
};

const handleButtonClick = action('button-click');

export function ButtonWithKnobs() {
  return <Button onClick={handleButtonClick}>Button</Button>;
}
