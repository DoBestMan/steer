import { css } from '@emotion/core';
import { action } from '@storybook/addon-actions';
import { select } from '@storybook/addon-knobs';
import { ReactChild } from 'react';

import { COLORS, MQ, SPACING } from '~/lib/constants';

import { default as BrowseTiresComponent } from './BrowseTires/BrowseTires';
import { default as SubNavComponent } from './SubNav';
import subnav from './SubNav.mocks';

export default {
  component: SubNavComponent,
  title: 'Sub Nav',
};

const styles = {
  container: {
    [MQ.S]: {
      background: COLORS.LIGHT.OFF_WHITE,
    },
    [MQ.M]: {
      background: COLORS.GLOBAL.WHITE,
    },
    height: '100%',
    padding: SPACING.SIZE_50,
  },
  root: css({
    height: '100vh',
    [MQ.L]: {
      background: COLORS.LIGHT.OFF_WHITE,
    },
  }),
};

function Container({ children }: { children: ReactChild }) {
  return <div css={styles.root}>{children}</div>;
}

export function SubNav() {
  return (
    <Container>
      <SubNavComponent {...subnav} />
    </Container>
  );
}

export function BrowseTires() {
  const categories = subnav.siteMenuBrowseList.map((item) => item.title);
  const category = select('Category', categories, categories[0]);
  return (
    <Container>
      <div css={styles.container}>
        <BrowseTiresComponent
          siteMenuBrowseList={subnav.siteMenuBrowseList}
          selectedLink={category}
          onClearSelectedLink={action('Close')}
        />
      </div>
    </Container>
  );
}
