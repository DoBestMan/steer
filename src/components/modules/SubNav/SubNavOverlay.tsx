import { CSSTransition } from 'react-transition-group';

import GridItem from '~/components/global/Grid/GridItem';
import { TIME } from '~/lib/constants';

import styles, { fade, visibility } from './SubNav.styles';
import { SUBNAV_TIMEOUT } from './SubNavModal';

/*
 * Because the SubNav uses the `Grid` component, to set subnav contents at a certain width,
 * it spans the width of the browser and therefore blocks click events to the overlay behind
 * As a workaround, we have the actual overlay that includes overlay styles (SubNavOverlay)
 * And a separate `PseudoOverlay` that listens for click events and closes if clicked
 * The pseudo overlay is just a blank div and does not include any styling beyond height and width
 */

export function SubNavOverlay({ isVisible }: { isVisible: boolean }) {
  return (
    <CSSTransition
      timeout={{ ...SUBNAV_TIMEOUT, enter: TIME.MS200 }}
      in={isVisible}
    >
      {(state) => (
        <span css={[styles.overlay, visibility[state], fade[state]]} />
      )}
    </CSSTransition>
  );
}

export function PseudoOverlay({ onClick }: { onClick: () => void }) {
  return (
    <GridItem css={styles.psuedoOverlay} gridColumnL="1/6" gridColumnXL="1/8">
      <div onClick={onClick} css={styles.overlayHitbox} />
    </GridItem>
  );
}
