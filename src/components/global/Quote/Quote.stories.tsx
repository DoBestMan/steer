import { boolean } from '@storybook/addon-knobs';

import Quote, { QuoteProps } from '~/components/global/Quote/Quote';

import { quoteItemsMock } from './Quote.mock';

export default {
  component: Quote,
  title: 'Global/Quote',
};

export function QuoteWithKnobs() {
  const optionsGroupId = 'options';
  const showByLine = boolean('Show by line', true, optionsGroupId);
  const props: QuoteProps = showByLine
    ? quoteItemsMock.quoteWithByLine
    : quoteItemsMock.quoteWithoutByLine;
  return <Quote {...props} />;
}
