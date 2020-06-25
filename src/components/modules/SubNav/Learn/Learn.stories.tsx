import { action } from '@storybook/addon-actions';

import { siteMenuLearn } from '~/components/modules/SubNav/SubNav.mocks';
import { useBreakpoints } from '~/hooks/useBreakpoints';

import Learn from './Learn';

export default {
  component: Learn,
  title: 'Nav/Learn Subnav Section',
};

const customerServiceNumber = {
  display: '(888) 410 0604',
  value: '18884100604',
};

export function LearnWithCustomerSupport() {
  const { isMobile } = useBreakpoints();
  return (
    <Learn
      customerServiceNumber={customerServiceNumber}
      isOpen
      isMobile={isMobile}
      isCustomerServiceEnabled
      siteMenuLearn={siteMenuLearn}
      handleClearLink={action('handleClearLink')}
      handleCloseSubNav={action('handleCloseSubNav')}
    />
  );
}

export function LearnWithoutCustomerSupport() {
  const { isMobile } = useBreakpoints();
  return (
    <Learn
      customerServiceNumber={customerServiceNumber}
      isOpen
      isMobile={isMobile}
      isCustomerServiceEnabled={false}
      siteMenuLearn={siteMenuLearn}
      handleClearLink={action('handleClearLink')}
      handleCloseSubNav={action('handleCloseSubNav')}
    />
  );
}
