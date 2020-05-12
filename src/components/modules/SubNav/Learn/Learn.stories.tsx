import { action } from '@storybook/addon-actions';

import MockSubNav from '~/components/modules/SubNav/SubNav.mocks';

import Learn from './Learn';

export default {
  component: Learn,
  title: 'Nav Learn',
};

export function LearnWithCustomerSupport() {
  return (
    <Learn
      isCustomerServiceEnabled
      siteMenuLearn={MockSubNav.siteMenuLearn}
      handleClearLink={action('handleClearLink')}
      handleCloseSubNav={action('handleCloseSubNav')}
    />
  );
}

export function LearnWithoutCustomerSupport() {
  return (
    <Learn
      isCustomerServiceEnabled={false}
      siteMenuLearn={MockSubNav.siteMenuLearn}
      handleClearLink={action('handleClearLink')}
      handleCloseSubNav={action('handleCloseSubNav')}
    />
  );
}
