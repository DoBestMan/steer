import { QuoteProps } from '~/components/global/Quote/Quote';

export const quoteItemsMock: { [key: string]: QuoteProps } = {
  quoteWithByLine: {
    quote: 'Maybe we want to highlight a quote or key point on this page',
    byline: 'Optional source name',
  },
  quoteWithoutByLine: {
    quote: 'Maybe we want to highlight a quote or key point on this page',
  },
};
