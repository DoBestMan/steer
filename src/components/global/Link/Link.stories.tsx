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
      size={select('Size', LinkSizes, LinkSizes.STANDARD)}
      theme={select('Theme', LinkThemes, LinkThemes.ORANGE)}
    >
      {text('Link Text', 'Link Example')}
    </Link>
  );
}

export function OrangeLink() {
  return (
    <Link href="/" size={LinkSizes.STANDARD} theme={LinkThemes.ORANGE}>
      {text('Link Text', 'Link Example')}
    </Link>
  );
}

export function BlackLink() {
  return (
    <Link href="/" size={LinkSizes.STANDARD} theme={LinkThemes.BLACK}>
      {text('Link Text', 'Link Example')}
    </Link>
  );
}

export function SmallOrangeLink() {
  return (
    <Link href="/" size={LinkSizes.SMALL} theme={LinkThemes.ORANGE}>
      {text('Link Text', 'Link Example')}
    </Link>
  );
}

export function SmallBlackLink() {
  return (
    <Link href="/" size={LinkSizes.SMALL} theme={LinkThemes.BLACK}>
      {text('Link Text', 'Link Example')}
    </Link>
  );
}
