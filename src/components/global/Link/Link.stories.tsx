import Link, { LinkSizes, LinkThemes } from './Link';
import { text, select } from '@storybook/addon-knobs';

export default {
  component: Link,
  title: 'Link',
};

export function LinkWithKnobs() {
  return (
    <Link
      href="/"
      size={select('Size', LinkSizes, LinkSizes.standard)}
      theme={select('Theme', LinkThemes, LinkThemes.orange)}
    >
      {text('Link Text', 'Link Example')}
    </Link>
  );
}

export function OrangeLink() {
  return (
    <Link href="/" size={LinkSizes.standard} theme={LinkThemes.orange}>
      {text('Link Text', 'Link Example')}
    </Link>
  );
}

export function BlackLink() {
  return (
    <Link href="/" size={LinkSizes.standard} theme={LinkThemes.black}>
      {text('Link Text', 'Link Example')}
    </Link>
  );
}

export function SmallOrangeLink() {
  return (
    <Link href="/" size={LinkSizes.small} theme={LinkThemes.orange}>
      {text('Link Text', 'Link Example')}
    </Link>
  );
}

export function SmallBlackLink() {
  return (
    <Link href="/" size={LinkSizes.small} theme={LinkThemes.black}>
      {text('Link Text', 'Link Example')}
    </Link>
  );
}
