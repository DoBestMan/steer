import { css } from '@emotion/core';

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

export function NavHomepage() {
  return (
    <div css={styles.root}>
      <NavContainer isHomepage locationString="Portland, OR" />
    </div>
  );
}

export function NavOutsideBusinessHours() {
  return (
    <div css={styles.root}>
      <NavContainer
        isHomepage
        isCustomerServiceEnabled={false}
        locationString="Portland, OR"
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
        locationString="Portland, OR"
      />
    </div>
  );
}

export function NavNotHomepage() {
  return (
    <div css={styles.root}>
      <NavContainer locationString="Portland, OR" />
    </div>
  );
}

export function NavNoLocation() {
  return (
    <div css={styles.root}>
      <NavContainer locationString="" />
    </div>
  );
}
