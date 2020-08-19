import { Transition } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';

import Loading from '~/components/global/Loading/Loading';
import { THEME, TIME } from '~/lib/constants';

import styles from './SearchPageLoading.styles';

interface Props {
  showLoading: boolean;
}

function SearchPageLoading({ showLoading }: Props) {
  return (
    <Transition
      appear
      mountOnEnter
      unmountOnExit
      in={showLoading}
      timeout={{
        enter: TIME.MS300,
        exit: 0,
      }}
    >
      {(searchTransitionState: TransitionStatus) => {
        const animationStyles = [
          styles.container,
          styles[`container_${searchTransitionState}`],
        ];

        return (
          <div css={animationStyles}>
            <Loading theme={THEME.DARK} />
          </div>
        );
      }}
    </Transition>
  );
}

export default SearchPageLoading;
