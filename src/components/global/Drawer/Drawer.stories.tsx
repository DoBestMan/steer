import { boolean, select } from '@storybook/addon-knobs';
import { useEffect, useState } from 'react';

import Drawer from './Drawer';
import styles from './Drawer.stories.styles';

export default {
  component: Drawer,
  title: 'Global/Drawer/DrawerDefault',
};

export function DrawerDefaultWithKnob() {
  const isOpen = boolean('Open the drawer', false);
  const [state, setState] = useState<boolean>(isOpen);

  useEffect(() => {
    setState(isOpen);
  }, [isOpen]);

  const anchor = select('Anchor', ['bottom', 'top', 'left', 'right'], 'bottom');
  const onClose = () => {
    setState((state) => !state);
  };

  const isSide = anchor === 'left' || anchor === 'right';

  return (
    <div css={styles.root}>
      <h1 css={styles.header}>Drawer example</h1>
      <Drawer
        anchor={anchor}
        open={state}
        onClose={onClose}
        containerStyle={styles.drawer}
      >
        <div css={[styles.container, isSide && styles.side]}>
          <span css={styles.content}>Drawer</span>
        </div>
      </Drawer>
    </div>
  );
}
