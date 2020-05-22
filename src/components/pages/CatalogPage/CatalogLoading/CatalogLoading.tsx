import { Transition } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';

import Car from '~/components/global/Car/Car';
import { Cars, CarSizes } from '~/components/global/Car/Car.types';
import { TIME } from '~/lib/constants';

import CatalogMessage from '../CatalogMessage/CatalogMessage';
import { brands } from '../CatalogPage.constants';
import { DEFAULT_SCENERY } from './CatalogLoading.constants';
import styles from './CatalogLoading.styles';

const ENTRY_TIMEOUT = TIME.MS300;

interface Props {
  isSearching: boolean;
}

function CatalogLoading({ isSearching }: Props) {
  const landscapeImg = DEFAULT_SCENERY;
  const backgroundImage = {
    backgroundImage: `url(${landscapeImg})`,
  };

  return (
    <Transition
      appear
      in={isSearching}
      mountOnEnter
      unmountOnExit
      timeout={ENTRY_TIMEOUT}
    >
      {(searchTransitionState: TransitionStatus) => {
        const contentStyles = [
          styles.contentRoot,
          styles[`content_${searchTransitionState}`],
        ];

        const animationBackgroundStyles = [
          styles.backgroundRoot,
          styles[`background_${searchTransitionState}`],
          backgroundImage,
        ];

        const messageStyles = [
          styles.messageRoot,
          styles[`message_${searchTransitionState}`],
        ];

        const vehicleContainerStyles = [
          styles.vehicleContainer,
          styles[`vehicleContainer_${searchTransitionState}`],
        ];

        return (
          <div css={styles.container}>
            <div css={animationBackgroundStyles}></div>
            <div css={contentStyles}>
              <div css={vehicleContainerStyles}>
                <Car carId={Cars['car--sedan']} size={CarSizes.small} />
              </div>
              <div css={messageStyles}>
                <CatalogMessage brands={brands} />
              </div>
            </div>
          </div>
        );
      }}
    </Transition>
  );
}

export default CatalogLoading;
