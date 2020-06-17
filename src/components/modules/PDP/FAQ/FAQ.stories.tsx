import { boolean } from '@storybook/addon-knobs';

import { COLORS } from '~/lib/constants';

import FAQ from './FAQ';
import { mockQuestions } from './FAQ.mock';

export default {
  component: FAQ,
  title: 'PDP/FAQ',
};

export function FAQWithKnobs() {
  const isCustomerServiceEnabled = boolean('Is Business Hours?', true);
  const hasQuestions = boolean('Show FAQ?', true);

  return (
    <div css={{ backgroundColor: COLORS.GLOBAL.BLACK, minHeight: '100vh' }}>
      <FAQ
        questions={hasQuestions ? mockQuestions : undefined}
        isCustomerServiceEnabled={isCustomerServiceEnabled}
      />
    </div>
  );
}
