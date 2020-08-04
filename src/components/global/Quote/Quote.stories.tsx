import { boolean } from '@storybook/addon-knobs';

import Quote, { QuoteProps } from '~/components/global/Quote/Quote';
import { QuoteMockItems } from '~/components/global/Quote/Quote.mocks';

export default {
  component: Quote,
  title: 'Global/Quote',
};

export function QuoteWithKnobs() {
  const optionsGroupId = 'options';
  const showByLine = boolean('Show by line', true, optionsGroupId);
  const props: QuoteProps = showByLine
    ? QuoteMockItems.quoteWithByLine
    : QuoteMockItems.quoteWithoutByLine;
  return <Quote {...props} />;
}
