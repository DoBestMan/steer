import { CSSTransition } from 'react-transition-group';

import { fade } from '~/components/modules/SubNav/SubNav.styles';
import { TIME } from '~/lib/constants';

import styles, { visibility } from './Backdrop.styles';

interface Props {
  isVisible: boolean;
  onClick: () => void;
}

function Backdrop({ onClick, isVisible }: Props) {
  return (
    <CSSTransition
      timeout={{ enter: TIME.MS500, exit: TIME.MS500 }}
      in={isVisible}
    >
      {(state) => (
        <span
          aria-label="true"
          css={[styles.root, visibility[state], fade[state]]}
          onClick={onClick}
        />
      )}
    </CSSTransition>
  );
}

export default Backdrop;
