import LinkComponent from './Link';
import { text, select } from '@storybook/addon-knobs';

export default {
  component: Link,
  title: 'Link',
};

const themes = {
  black: '',
  orange: 'orange',
};

const sizes = {
  small: 'small',
  standard: '',
};

export function Link() {
  return (
    <LinkComponent
      href="/"
      size={select('Size', sizes, sizes.standard)}
      theme={select('Theme', themes, themes.orange)}
    >
      {text('Link Text', 'Link Example')}
    </LinkComponent>
  );
}
