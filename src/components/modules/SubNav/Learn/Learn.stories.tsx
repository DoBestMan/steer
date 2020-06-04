import { action } from '@storybook/addon-actions';

import { siteMenuLearn } from '~/components/modules/SubNav/SubNav.mocks';
import { useBreakpoints } from '~/hooks/useBreakpoints';

import Learn from './Learn';

export default {
  component: Learn,
  title: 'Nav/Learn Subnav Section',
};

export function LearnWithCustomerSupport() {
  const { isMobile } = useBreakpoints();
  return (
    <Learn
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
      isOpen
      isMobile={isMobile}
      isCustomerServiceEnabled={false}
      siteMenuLearn={siteMenuLearn}
      handleClearLink={action('handleClearLink')}
      handleCloseSubNav={action('handleCloseSubNav')}
    />
  );
}
