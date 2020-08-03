import { useNProgress } from '@tanem/react-nprogress';
import { Transition } from 'react-transition-group';

import { ui } from '~/lib/utils/ui-dictionary';

import styles, {
  ANIMATION_DURATION,
  INCREMENT_DURATION,
} from './LoadingBar.styles';

interface Props {
  isLoading: boolean;
}

function LoadingBar({ isLoading }: Props) {
  const { isFinished, progress } = useNProgress({
    incrementDuration: INCREMENT_DURATION,
    isAnimating: isLoading,
  });

  /**
   * Note: we're only using the Transition ccomponent here to mount and
   * unmount the loading bar. In particular, we delay unmount after the
   * loading is finished until the bar is able to transition to the end.
   */
  return (
    <Transition
      in={!isFinished}
      mountOnEnter
      unmountOnExit
      timeout={{
        enter: 0,
        exit: ANIMATION_DURATION,
      }}
    >
      {() => (
        <div css={styles.container}>
          <span
            aria-label={ui('common.loading.label')}
            css={styles.bar}
            role="alert"
            style={{
              transform: `translate3d(${(progress / 1) * 100 - 100}%, 0, 0)`,
            }}
          />
        </div>
      )}
    </Transition>
  );
}

export default LoadingBar;
