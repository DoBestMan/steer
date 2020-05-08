import { css } from '@emotion/core';

import Nav from '~/components/global/Nav/Nav';
import { COLORS } from '~/lib/constants';

import ConnectedNav from './Nav.container';

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
      <ConnectedNav isHomepage locationString="Portland, OR" />
    </div>
  );
}

export function NavOutsideBusinessHours() {
  return (
    <div css={styles.root}>
      <ConnectedNav
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
      <ConnectedNav
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
      <ConnectedNav locationString="Portland, OR" />
    </div>
  );
}

export function NavNoLocation() {
  return (
    <div css={styles.root}>
      <ConnectedNav locationString="" />
    </div>
  );
}
