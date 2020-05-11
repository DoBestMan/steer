import { css } from '@emotion/core';
import { action } from '@storybook/addon-actions';

import { UserPersonalizationProps } from '~/context/UserPersonalization.context';
import { COLORS } from '~/lib/constants';

import Nav from './Nav';
import NavContainer from './Nav.container';

export default {
  component: Nav,
  title: 'Nav',
};

const styles = {
  root: css({
    background: COLORS.LIGHT.OFF_WHITE,
    minHeight: '100vh',
  }),
};

const defaultContextProps: UserPersonalizationProps = {
  locationString: 'Portland, OR',
  updateLocation: action('updateLocation'),
  userPersonalizationData: null,
};

export function NavHomepage() {
  return (
    <div css={styles.root}>
      <NavContainer isHomepage {...defaultContextProps} />
    </div>
  );
}

export function NavOutsideBusinessHours() {
  return (
    <div css={styles.root}>
      <NavContainer
        isHomepage
        isCustomerServiceEnabled={false}
        {...defaultContextProps}
      />
    </div>
  );
}

export function NavBusinessHours() {
  return (
    <div css={styles.root}>
      <NavContainer
        isCustomerServiceEnabled
        isHomepage
        {...defaultContextProps}
      />
    </div>
  );
}

export function NavNotHomepage() {
  return (
    <div css={styles.root}>
      <NavContainer {...defaultContextProps} />
    </div>
  );
}

export function NavNoLocation() {
  return (
    <div css={styles.root}>
      <NavContainer {...defaultContextProps} locationString="" />
    </div>
  );
}
